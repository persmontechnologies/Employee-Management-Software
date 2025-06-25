import { UserRole } from 'shared';
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto extends LoginDto {
    firstName: string;
    lastName: string;
    password: string;
    role?: UserRole;
}
export declare class TokenResponseDto {
    accessToken: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
}
