import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from 'shared';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Find a user by email (used for authentication)
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) return null;
    
    // Convert Prisma Role to shared UserRole enum
    return {
      ...user,
      role: user.role as unknown as UserRole,
    };
  }

  // Find a user by ID (used for authentication and user management)
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) return null;
    
    // Convert Prisma Role to shared UserRole enum
    return {
      ...user,
      role: user.role as unknown as UserRole,
    };
  }

  // Create a new user (used for registration)
  async create(data: RegisterDto): Promise<User> {
    // Check if a user with this email already exists
    const userExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new ConflictException('A user with this email already exists');
    }

    // Hash the password before storing it
    const hashedPassword = await this.hashPassword(data.password);

    // Create the user with the hashed password
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role as unknown as any || 'EMPLOYEE',
      },
    });
    
    // Convert Prisma Role to shared UserRole enum
    return {
      ...user,
      role: user.role as unknown as UserRole,
    };
  }

  // Helper method to hash passwords
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Helper method to verify passwords
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}