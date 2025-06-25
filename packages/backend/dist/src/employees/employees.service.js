"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EmployeesService = class EmployeesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEmployeeDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { id: createEmployeeDto.userId },
        });
        if (!userExists) {
            throw new common_1.NotFoundException(`User with ID ${createEmployeeDto.userId} not found`);
        }
        const departmentExists = await this.prisma.department.findUnique({
            where: { id: createEmployeeDto.departmentId },
        });
        if (!departmentExists) {
            throw new common_1.NotFoundException(`Department with ID ${createEmployeeDto.departmentId} not found`);
        }
        const employeeExists = await this.prisma.employee.findUnique({
            where: { userId: createEmployeeDto.userId },
        });
        if (employeeExists) {
            throw new common_1.ConflictException(`Employee already exists for user with ID ${createEmployeeDto.userId}`);
        }
        const employee = await this.prisma.employee.create({
            data: {
                userId: createEmployeeDto.userId,
                departmentId: createEmployeeDto.departmentId,
                position: createEmployeeDto.position,
                dateOfJoining: createEmployeeDto.dateOfJoining,
                salary: createEmployeeDto.salary,
            },
            include: {
                user: true,
                department: true,
            },
        });
        return this.mapEmployeeToDto(employee);
    }
    async findAll(filter) {
        const where = {};
        if (filter === null || filter === void 0 ? void 0 : filter.departmentId) {
            where['departmentId'] = filter.departmentId;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.position) {
            where['position'] = { contains: filter.position, mode: 'insensitive' };
        }
        const employees = await this.prisma.employee.findMany({
            where,
            include: {
                user: true,
                department: true,
            },
            orderBy: {
                user: {
                    lastName: 'asc',
                },
            },
        });
        return employees.map(employee => this.mapEmployeeToDto(employee));
    }
    async findOne(id) {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
            include: {
                user: true,
                department: true,
            },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return this.mapEmployeeToDto(employee);
    }
    async findByUserId(userId) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId },
            include: {
                user: true,
                department: true,
            },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with user ID ${userId} not found`);
        }
        return this.mapEmployeeToDto(employee);
    }
    async update(id, updateEmployeeDto) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        if (updateEmployeeDto.departmentId) {
            const departmentExists = await this.prisma.department.findUnique({
                where: { id: updateEmployeeDto.departmentId },
            });
            if (!departmentExists) {
                throw new common_1.NotFoundException(`Department with ID ${updateEmployeeDto.departmentId} not found`);
            }
        }
        const employee = await this.prisma.employee.update({
            where: { id },
            data: updateEmployeeDto,
            include: {
                user: true,
                department: true,
            },
        });
        return this.mapEmployeeToDto(employee);
    }
    async remove(id) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        const employee = await this.prisma.employee.delete({
            where: { id },
            include: {
                user: true,
                department: true,
            },
        });
        return this.mapEmployeeToDto(employee);
    }
    mapEmployeeToDto(employee) {
        return {
            id: employee.id,
            userId: employee.userId,
            user: {
                id: employee.user.id,
                email: employee.user.email,
                firstName: employee.user.firstName,
                lastName: employee.user.lastName,
                role: employee.user.role,
                createdAt: employee.user.createdAt,
                updatedAt: employee.user.updatedAt,
            },
            departmentId: employee.departmentId,
            department: {
                id: employee.department.id,
                name: employee.department.name,
                createdAt: employee.department.createdAt,
                updatedAt: employee.department.updatedAt,
            },
            position: employee.position,
            dateOfJoining: employee.dateOfJoining,
            salary: employee.salary,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedAt,
        };
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map