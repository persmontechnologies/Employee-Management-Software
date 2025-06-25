import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from 'shared';
import { LoginDto, RegisterDto, TokenResponseDto } from './dto/auth.dto';
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
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<Omit<UserWithPassword, 'password'>>;
    login(loginDto: LoginDto): Promise<TokenResponseDto>;
    register(registerDto: RegisterDto): Promise<TokenResponseDto>;
    private generateToken;
}
export {};
