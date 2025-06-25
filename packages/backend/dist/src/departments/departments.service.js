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
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DepartmentsService = class DepartmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDepartmentDto) {
        const departmentExists = await this.prisma.department.findFirst({
            where: {
                name: {
                    equals: createDepartmentDto.name,
                    mode: 'insensitive',
                },
            },
        });
        if (departmentExists) {
            throw new common_1.ConflictException(`Department with name '${createDepartmentDto.name}' already exists`);
        }
        const department = await this.prisma.department.create({
            data: {
                name: createDepartmentDto.name,
            },
        });
        return department;
    }
    async findAll(filter) {
        const where = {};
        if (filter === null || filter === void 0 ? void 0 : filter.name) {
            where['name'] = {
                contains: filter.name,
                mode: 'insensitive',
            };
        }
        const departments = await this.prisma.department.findMany({
            where,
            orderBy: {
                name: 'asc',
            },
        });
        return departments;
    }
    async findOne(id) {
        const department = await this.prisma.department.findUnique({
            where: { id },
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async update(id, updateDepartmentDto) {
        const departmentExists = await this.prisma.department.findUnique({
            where: { id },
        });
        if (!departmentExists) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        if (updateDepartmentDto.name && updateDepartmentDto.name !== departmentExists.name) {
            const nameExists = await this.prisma.department.findFirst({
                where: {
                    name: {
                        equals: updateDepartmentDto.name,
                        mode: 'insensitive',
                    },
                    id: { not: id },
                },
            });
            if (nameExists) {
                throw new common_1.ConflictException(`Department with name '${updateDepartmentDto.name}' already exists`);
            }
        }
        const department = await this.prisma.department.update({
            where: { id },
            data: updateDepartmentDto,
        });
        return department;
    }
    async remove(id) {
        try {
            const departmentExists = await this.prisma.department.findUnique({
                where: { id },
            });
            if (!departmentExists) {
                throw new common_1.NotFoundException(`Department with ID ${id} not found`);
            }
            const employeesCount = await this.prisma.employee.count({
                where: { departmentId: id },
            });
            if (employeesCount > 0) {
                throw new common_1.ConflictException(`Cannot delete department with ID ${id} because it has ${employeesCount} employees assigned to it`);
            }
            const department = await this.prisma.department.delete({
                where: { id },
            });
            return department;
        }
        catch (error) {
            throw error;
        }
    }
    async getStatistics() {
        const departments = await this.prisma.department.findMany();
        const departmentStats = await Promise.all(departments.map(async (department) => {
            const employeeCount = await this.prisma.employee.count({
                where: { departmentId: department.id },
            });
            return {
                id: department.id,
                name: department.name,
                employeeCount,
            };
        }));
        const totalEmployees = await this.prisma.employee.count();
        return {
            departments: departmentStats,
            totalDepartments: departments.length,
            totalEmployees,
        };
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map