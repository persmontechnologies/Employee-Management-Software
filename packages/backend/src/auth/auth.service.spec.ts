import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRole } from 'shared';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    id: 'test-id',
    email: 'test@example.com',
    password: 'hashed-password',
    firstName: 'Test',
    lastName: 'User',
    role: UserRole.EMPLOYEE,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            verifyPassword: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('test-token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should throw UnauthorizedException for non-existent user', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(null);

      await expect(service.validateUser('nonexistent@example.com', 'password')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(mockUser);
      jest.spyOn(usersService, 'verifyPassword').mockResolvedValueOnce(false);

      await expect(service.validateUser('test@example.com', 'wrong-password')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.verifyPassword).toHaveBeenCalledWith('wrong-password', mockUser.password);
    });

    it('should return user without password for valid credentials', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(mockUser);
      jest.spyOn(usersService, 'verifyPassword').mockResolvedValueOnce(true);

      const result = await service.validateUser('test@example.com', 'correct-password');
      const { password, ...expectedUser } = mockUser;
      
      expect(result).toEqual(expectedUser);
      expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(usersService.verifyPassword).toHaveBeenCalledWith('correct-password', mockUser.password);
    });
  });

  describe('login', () => {
    it('should return token and user information', async () => {
      const { password, ...userWithoutPassword } = mockUser;
      
      jest.spyOn(service, 'validateUser').mockResolvedValueOnce(userWithoutPassword);
      
      const result = await service.login({ email: 'test@example.com', password: 'password' });
      
      expect(result).toEqual({
        accessToken: 'test-token',
        user: {
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          role: mockUser.role,
        },
      });
    });
  });

  describe('register', () => {
    it('should create a new user and return token and user information', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValueOnce(mockUser);
      
      const result = await service.register({
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
      });
      
      expect(usersService.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
      });
      
      expect(result).toEqual({
        accessToken: 'test-token',
        user: {
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          role: mockUser.role,
        },
      });
    });
  });
});