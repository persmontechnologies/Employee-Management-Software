import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

// Interface for the JWT payload
interface JwtPayload {
  sub: string; // User ID
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      // Extract JWT from the Authorization header (Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Allow ignoring expiration for development (should be false in production)
      ignoreExpiration: false,
      // Get JWT secret from environment variables
      secretOrKey: configService.get('JWT_SECRET') || 'super-secret-fallback-key-do-not-use-in-production',
    });
  }

  // Validate the JWT payload and return the user
  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);

    // If user doesn't exist, throw an error
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    // Return the user (password is not included in the shared User type)
    return user;
  }
}