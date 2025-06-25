"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const users_service_1 = require("../users/users.service");
const shared_1 = require("shared");
describe('AuthService', () => {
    let service;
    let usersService;
    let jwtService;
    const mockUser = {
        id: 'test-id',
        email: 'test@example.com',
        password: 'hashed-password',
        firstName: 'Test',
        lastName: 'User',
        role: shared_1.UserRole.EMPLOYEE,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                auth_service_1.AuthService,
                {
                    provide: users_service_1.UsersService,
                    useValue: {
                        findByEmail: jest.fn(),
                        verifyPassword: jest.fn(),
                        create: jest.fn(),
                    },
                },
                {
                    provide: jwt_1.JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('test-token'),
                    },
                },
            ],
        }).compile();
        service = module.get(auth_service_1.AuthService);
        usersService = module.get(users_service_1.UsersService);
        jwtService = module.get(jwt_1.JwtService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('validateUser', () => {
        it('should throw UnauthorizedException for non-existent user', async () => {
            jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(null);
            await expect(service.validateUser('nonexistent@example.com', 'password')).rejects.toThrow(common_1.UnauthorizedException);
            expect(usersService.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
        });
        it('should throw UnauthorizedException for invalid password', async () => {
            jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(mockUser);
            jest.spyOn(usersService, 'verifyPassword').mockResolvedValueOnce(false);
            await expect(service.validateUser('test@example.com', 'wrong-password')).rejects.toThrow(common_1.UnauthorizedException);
            expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
            expect(usersService.verifyPassword).toHaveBeenCalledWith('wrong-password', mockUser.password);
        });
        it('should return user without password for valid credentials', async () => {
            jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(mockUser);
            jest.spyOn(usersService, 'verifyPassword').mockResolvedValueOnce(true);
            const result = await service.validateUser('test@example.com', 'correct-password');
            const { password } = mockUser, expectedUser = __rest(mockUser, ["password"]);
            expect(result).toEqual(expectedUser);
            expect(usersService.findByEmail).toHaveBeenCalledWith('test@example.com');
            expect(usersService.verifyPassword).toHaveBeenCalledWith('correct-password', mockUser.password);
        });
    });
    describe('login', () => {
        it('should return token and user information', async () => {
            const { password } = mockUser, userWithoutPassword = __rest(mockUser, ["password"]);
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
//# sourceMappingURL=auth.service.spec.js.map