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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeavesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const shared_1 = require("shared");
const leaves_service_1 = require("./leaves.service");
const prisma_service_1 = require("../prisma/prisma.service");
const leave_dto_1 = require("./dto/leave.dto");
let LeavesController = class LeavesController {
    constructor(leavesService, prisma) {
        this.leavesService = leavesService;
        this.prisma = prisma;
    }
    async create(createLeaveDto, user) {
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            createLeaveDto.employeeId = employee.id;
        }
        return this.leavesService.create(createLeaveDto);
    }
    async findAll(filter) {
        return this.leavesService.findAll(filter);
    }
    async getStatistics(startDate, endDate) {
        return this.leavesService.getStatistics(startDate, endDate);
    }
    async findByEmployee(employeeId, user, startDate, endDate, type, status) {
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (employee.id !== employeeId) {
                throw new common_1.NotFoundException(`Leave records not found`);
            }
        }
        const filter = {
            employeeId,
            startDate,
            endDate,
            type: type,
            status: status,
        };
        return this.leavesService.findAll(filter);
    }
    async getLeaveBalance(employeeId, user, year) {
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (employee.id !== employeeId) {
                throw new common_1.NotFoundException(`Leave balance not found`);
            }
        }
        return this.leavesService.getLeaveBalance(employeeId, year);
    }
    async findOne(id, user) {
        const leave = await this.leavesService.findOne(id);
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (leave.employeeId !== employee.id) {
                throw new common_1.NotFoundException(`Leave request not found`);
            }
        }
        return leave;
    }
    async update(id, updateLeaveDto, user) {
        const leave = await this.leavesService.findOne(id);
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (leave.employeeId !== employee.id) {
                throw new common_1.NotFoundException(`Leave request not found`);
            }
        }
        return this.leavesService.update(id, updateLeaveDto);
    }
    async updateStatus(id, updateLeaveStatusDto) {
        return this.leavesService.updateStatus(id, updateLeaveStatusDto);
    }
    async remove(id, user) {
        const leave = await this.leavesService.findOne(id);
        if (user.role === shared_1.UserRole.EMPLOYEE) {
            const employee = await this.prisma.employee.findUnique({
                where: { userId: user.id },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee record not found for current user`);
            }
            if (leave.employeeId !== employee.id) {
                throw new common_1.NotFoundException(`Leave request not found`);
            }
        }
        return this.leavesService.remove(id);
    }
    async getMyRequests(user, startDate, endDate, type, status) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee record not found for current user`);
        }
        const filter = {
            employeeId: employee.id,
            startDate,
            endDate,
            type: type,
            status: status,
        };
        return this.leavesService.findAll(filter);
    }
    async getMyBalance(user, year) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee record not found for current user`);
        }
        return this.leavesService.getLeaveBalance(employee.id, year);
    }
};
exports.LeavesController = LeavesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new leave request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Leave request created successfully', type: leave_dto_1.LeaveResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Overlapping leave exists' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leave_dto_1.CreateLeaveDto, typeof (_a = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get all leave requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave requests retrieved successfully', type: [leave_dto_1.LeaveResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leave_dto_1.LeaveFilterDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave requests for a specific employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave requests retrieved successfully', type: [leave_dto_1.LeaveResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'Employee ID' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'] }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('type')),
    __param(5, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _b : Object, Date,
        Date, String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)('balance/:employeeId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave balance for an employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave balance retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'Employee ID' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number, description: 'Year for calculation (defaults to current year)' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _c : Object, Number]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getLeaveBalance", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get a leave request by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave request retrieved successfully', type: leave_dto_1.LeaveResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave request not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Update a leave request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave request updated successfully', type: leave_dto_1.LeaveResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave request not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Cannot update an approved leave' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, leave_dto_1.UpdateLeaveDto, typeof (_e = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Approve or reject a leave request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave request status updated successfully', type: leave_dto_1.LeaveResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave request not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, leave_dto_1.UpdateLeaveStatusDto]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a leave request' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave request deleted successfully', type: leave_dto_1.LeaveResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Cannot delete an approved leave' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave request not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Leave ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('my/requests'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s leave requests' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave requests retrieved successfully', type: [leave_dto_1.LeaveResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'type', required: false, enum: ['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID'] }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'] }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('type')),
    __param(4, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _g : Object, Date,
        Date, String, String]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getMyRequests", null);
__decorate([
    (0, common_1.Get)('my/balance'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s leave balance' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave balance retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number, description: 'Year for calculation (defaults to current year)' }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _h : Object, Number]),
    __metadata("design:returntype", Promise)
], LeavesController.prototype, "getMyBalance", null);
exports.LeavesController = LeavesController = __decorate([
    (0, swagger_1.ApiTags)('Leaves'),
    (0, common_1.Controller)('leaves'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [leaves_service_1.LeavesService,
        prisma_service_1.PrismaService])
], LeavesController);
//# sourceMappingURL=leaves.controller.js.map