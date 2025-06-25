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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const shared_1 = require("shared");
const performance_reviews_service_1 = require("./performance-reviews.service");
const prisma_service_1 = require("../prisma/prisma.service");
const performance_review_dto_1 = require("./dto/performance-review.dto");
let PerformanceReviewsController = class PerformanceReviewsController {
    constructor(performanceReviewsService, prisma) {
        this.performanceReviewsService = performanceReviewsService;
        this.prisma = prisma;
    }
    async create(createPerformanceReviewDto) {
        return this.performanceReviewsService.create(createPerformanceReviewDto);
    }
    async findAll(filter) {
        return this.performanceReviewsService.findAll(filter);
    }
    async getStatistics(departmentId) {
        return this.performanceReviewsService.getStatistics(departmentId);
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
                throw new common_1.NotFoundException(`Performance reviews not found`);
            }
        }
        return this.performanceReviewsService.getEmployeeReviews(employeeId);
    }
    async findByReviewer(reviewerId, user) {
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (employee.id !== reviewerId) {
                throw new common_1.NotFoundException(`Performance reviews not found`);
            }
        }
        return this.performanceReviewsService.getReviewerReviews(reviewerId);
    }
    async findOne(id, user) {
        const review = await this.performanceReviewsService.findOne(id);
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (review.employeeId !== employee.id && review.reviewerId !== employee.id) {
                throw new common_1.NotFoundException(`Performance review not found`);
            }
        }
        return review;
    }
    async update(id, updatePerformanceReviewDto) {
        return this.performanceReviewsService.update(id, updatePerformanceReviewDto);
    }
    async remove(id) {
        return this.performanceReviewsService.remove(id);
    }
    async getMyReviews(user) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee record not found for current user`);
        }
        return this.performanceReviewsService.getEmployeeReviews(employee.id);
    }
    async getMyPerformedReviews(user) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee record not found for current user`);
        }
        return this.performanceReviewsService.getReviewerReviews(employee.id);
    }
};
exports.PerformanceReviewsController = PerformanceReviewsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new performance review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Performance review created successfully', type: performance_review_dto_1.PerformanceReviewResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee or reviewer not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Review already exists for this period' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [performance_review_dto_1.CreatePerformanceReviewDto]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Get all performance reviews' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance reviews retrieved successfully', type: [performance_review_dto_1.PerformanceReviewResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'reviewerId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'reviewPeriod', required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [performance_review_dto_1.PerformanceReviewFilterDto]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get performance review statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance review statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'departmentId', required: false, type: String }),
    __param(0, (0, common_1.Query)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get performance reviews for a specific employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance reviews retrieved successfully', type: [performance_review_dto_1.PerformanceReviewResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_a = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)('reviewer/:reviewerId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get performance reviews by a specific reviewer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance reviews retrieved successfully', type: [performance_review_dto_1.PerformanceReviewResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Reviewer not found' }),
    (0, swagger_1.ApiParam)({ name: 'reviewerId', description: 'Reviewer ID' }),
    __param(0, (0, common_1.Param)('reviewerId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "findByReviewer", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get a performance review by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance review retrieved successfully', type: performance_review_dto_1.PerformanceReviewResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Performance review not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Performance review ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Update a performance review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance review updated successfully', type: performance_review_dto_1.PerformanceReviewResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Performance review not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Performance review ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, performance_review_dto_1.UpdatePerformanceReviewDto]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a performance review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance review deleted successfully', type: performance_review_dto_1.PerformanceReviewResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Performance review not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Performance review ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('my/reviews'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s performance reviews' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance reviews retrieved successfully', type: [performance_review_dto_1.PerformanceReviewResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "getMyReviews", null);
__decorate([
    (0, common_1.Get)('my/performed-reviews'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews performed by the current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Performance reviews retrieved successfully', type: [performance_review_dto_1.PerformanceReviewResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], PerformanceReviewsController.prototype, "getMyPerformedReviews", null);
exports.PerformanceReviewsController = PerformanceReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Performance Reviews'),
    (0, common_1.Controller)('performance-reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [performance_reviews_service_1.PerformanceReviewsService,
        prisma_service_1.PrismaService])
], PerformanceReviewsController);
//# sourceMappingURL=performance-reviews.controller.js.map