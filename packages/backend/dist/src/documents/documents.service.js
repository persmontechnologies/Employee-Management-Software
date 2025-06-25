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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_1 = require("shared");
let DocumentsService = class DocumentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDocumentDto) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id: createDocumentDto.employeeId },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${createDocumentDto.employeeId} not found`);
        }
        const document = await this.prisma.document.create({
            data: {
                employeeId: createDocumentDto.employeeId,
                type: createDocumentDto.type,
                name: createDocumentDto.name,
                url: createDocumentDto.url,
            },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapDocumentToDto(document);
    }
    async findAll(filter) {
        const where = {};
        if (filter === null || filter === void 0 ? void 0 : filter.employeeId) {
            where.employeeId = filter.employeeId;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.type) {
            where.type = filter.type;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.search) {
            where.name = {
                contains: filter.search,
                mode: 'insensitive',
            };
        }
        const documents = await this.prisma.document.findMany({
            where,
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return documents.map(document => this.mapDocumentToDto(document));
    }
    async findOne(id) {
        const document = await this.prisma.document.findUnique({
            where: { id },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        if (!document) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
        return this.mapDocumentToDto(document);
    }
    async findByEmployee(employeeId) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id: employeeId },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${employeeId} not found`);
        }
        const documents = await this.prisma.document.findMany({
            where: {
                employeeId,
            },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return documents.map(document => this.mapDocumentToDto(document));
    }
    async update(id, updateDocumentDto) {
        const documentExists = await this.prisma.document.findUnique({
            where: { id },
        });
        if (!documentExists) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
        const document = await this.prisma.document.update({
            where: { id },
            data: updateDocumentDto,
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapDocumentToDto(document);
    }
    async remove(id) {
        const documentExists = await this.prisma.document.findUnique({
            where: { id },
        });
        if (!documentExists) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
        const document = await this.prisma.document.delete({
            where: { id },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapDocumentToDto(document);
    }
    async getStatistics() {
        const documents = await this.prisma.document.findMany({
            include: {
                employee: {
                    include: {
                        department: true,
                    },
                },
            },
        });
        const totalDocuments = documents.length;
        const typeCount = {};
        const documentTypes = Object.values(shared_1.DocumentType);
        documentTypes.forEach((type) => {
            typeCount[type] = 0;
        });
        documents.forEach(document => {
            typeCount[document.type]++;
        });
        const departmentStats = {};
        documents.forEach(document => {
            const deptName = document.employee.department.name;
            if (!departmentStats[deptName]) {
                departmentStats[deptName] = {
                    total: 0,
                    types: {},
                };
                documentTypes.forEach((type) => {
                    departmentStats[deptName].types[type] = 0;
                });
            }
            departmentStats[deptName].total++;
            departmentStats[deptName].types[document.type]++;
        });
        const employeeCount = await this.prisma.employee.count();
        const employeesWithDocuments = await this.prisma.employee.count({
            where: {
                documents: {
                    some: {},
                },
            },
        });
        const coveragePercentage = employeeCount > 0
            ? ((employeesWithDocuments / employeeCount) * 100).toFixed(2)
            : 0;
        return {
            totalDocuments,
            byType: typeCount,
            byDepartment: departmentStats,
            employeeCoverage: {
                total: employeeCount,
                withDocuments: employeesWithDocuments,
                percentage: coveragePercentage,
            },
        };
    }
    mapDocumentToDto(document) {
        return {
            id: document.id,
            employeeId: document.employeeId,
            employee: document.employee ? {
                id: document.employee.id,
                userId: document.employee.userId,
                user: document.employee.user ? {
                    id: document.employee.user.id,
                    email: document.employee.user.email,
                    firstName: document.employee.user.firstName,
                    lastName: document.employee.user.lastName,
                    role: document.employee.user.role,
                    createdAt: document.employee.user.createdAt,
                    updatedAt: document.employee.user.updatedAt,
                } : undefined,
                departmentId: document.employee.departmentId,
                department: document.employee.department ? {
                    id: document.employee.department.id,
                    name: document.employee.department.name,
                    createdAt: document.employee.department.createdAt,
                    updatedAt: document.employee.department.updatedAt,
                } : undefined,
                position: document.employee.position,
                dateOfJoining: document.employee.dateOfJoining,
                salary: document.employee.salary,
                createdAt: document.employee.createdAt,
                updatedAt: document.employee.updatedAt,
            } : undefined,
            type: document.type,
            name: document.name,
            url: document.url,
            createdAt: document.createdAt,
            updatedAt: document.updatedAt,
        };
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map