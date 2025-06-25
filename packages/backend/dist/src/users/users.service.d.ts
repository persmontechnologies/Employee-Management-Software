import { PrismaService } from '../prisma/prisma.service';
import { User } from 'shared';
import { RegisterDto } from '../auth/dto/auth.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: RegisterDto): Promise<User>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
