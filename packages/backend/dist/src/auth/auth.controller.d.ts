import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, TokenResponseDto } from './dto/auth.dto';
import { User } from 'shared';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<TokenResponseDto>;
    register(registerDto: RegisterDto): Promise<TokenResponseDto>;
    getProfile(user: Omit<User, 'password'>): Promise<Omit<User, "password">>;
}
