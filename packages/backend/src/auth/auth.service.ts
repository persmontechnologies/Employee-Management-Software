import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from 'shared';
import { LoginDto, RegisterDto, TokenResponseDto } from './dto/auth.dto';

// Extending the shared User type to include password for internal use
interface UserWithPassword {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user during login
   * @param email - User's email
   * @param password - User's password
   * @returns The user object without the password if validation is successful
   * @throws UnauthorizedException if validation fails
   */
  async validateUser(email: string, password: string): Promise<Omit<UserWithPassword, 'password'>> {
    // Find the user by email
    const user = await this.usersService.findByEmail(email) as UserWithPassword | null;
    
    // If user doesn't exist or password is incorrect, throw an error
    if (!user || !(await this.usersService.verifyPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    
    // Remove the password from the user object before returning it
    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Handles user login
   * @param loginDto - Login credentials
   * @returns JWT token and user information
   */
  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    // Validate the user
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    // Generate a JWT token
    const accessToken = this.generateToken(user);
    
    // Return the token and user information
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * Registers a new user
   * @param registerDto - Registration data
   * @returns JWT token and user information
   */
  async register(registerDto: RegisterDto): Promise<TokenResponseDto> {
    // Create a new user
    const newUser = await this.usersService.create(registerDto) as UserWithPassword;
    
    // Generate a JWT token
    const accessToken = this.generateToken(newUser);
    
    // Return the token and user information
    return {
      accessToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    };
  }

  /**
   * Generates a JWT token for a user
   * @param user - User object
   * @returns JWT token string
   */
  private generateToken(user: Omit<UserWithPassword, 'password'>): string {
    const payload = {
      sub: user.id, // Subject (user ID)
      email: user.email,
      role: user.role,
    };
    
    return this.jwtService.sign(payload);
  }
}