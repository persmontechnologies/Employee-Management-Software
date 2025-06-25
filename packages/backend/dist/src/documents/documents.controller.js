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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const shared_1 = require("shared");
const documents_service_1 = require("./documents.service");
const prisma_service_1 = require("../prisma/prisma.service");
const document_dto_1 = require("./dto/document.dto");
let DocumentsController = class DocumentsController {
    constructor(documentsService, prisma) {
        this.documentsService = documentsService;
        this.prisma = prisma;
    }
    async create(createDocumentDto) {
        return this.documentsService.create(createDocumentDto);
    }
    async findAll(filter) {
        return this.documentsService.findAll(filter);
    }
    async getStatistics() {
        return this.documentsService.getStatistics();
    }
    async findByEmployee(employeeId, user) {
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (employee.id !== employeeId) {
                throw new common_1.NotFoundException(`Documents not found`);
            }
        }
        return this.documentsService.findByEmployee(employeeId);
    }
    async findOne(id, user) {
        const document = await this.documentsService.findOne(id);
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (document.employeeId !== employee.id) {
                throw new common_1.NotFoundException(`Document not found`);
            }
        }
        return document;
    }
    async update(id, updateDocumentDto) {
        return this.documentsService.update(id, updateDocumentDto);
    }
    async remove(id) {
        return this.documentsService.remove(id);
    }
    async getMyDocuments(user) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee record not found for current user`);
        }
        return this.documentsService.findByEmployee(employee.id);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new document' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Document created successfully', type: document_dto_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [document_dto_1.CreateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Get all documents' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documents retrieved successfully', type: [document_dto_1.DocumentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['CONTRACT', 'CERTIFICATE', 'IDENTIFICATION', 'PERFORMANCE_REVIEW', 'OTHER'] }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [document_dto_1.DocumentFilterDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Get document statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get documents for a specific employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documents retrieved successfully', type: [document_dto_1.DocumentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get a document by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document retrieved successfully', type: document_dto_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Update a document' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document updated successfully', type: document_dto_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, document_dto_1.UpdateDocumentDto]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a document' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document deleted successfully', type: document_dto_1.DocumentResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('my/documents'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s documents' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Documents retrieved successfully', type: [document_dto_1.DocumentResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getMyDocuments", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiTags)('Documents'),
    (0, common_1.Controller)('documents'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService,
        prisma_service_1.PrismaService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map