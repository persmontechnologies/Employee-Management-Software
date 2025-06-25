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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const shared_1 = require("shared");
const attendance_service_1 = require("./attendance.service");
const prisma_service_1 = require("../prisma/prisma.service");
const attendance_dto_1 = require("./dto/attendance.dto");
let AttendanceController = class AttendanceController {
    constructor(attendanceService, prisma) {
        this.attendanceService = attendanceService;
        this.prisma = prisma;
    }
    async create(createAttendanceDto) {
        return this.attendanceService.create(createAttendanceDto);
    }
    async findAll(filter) {
        return this.attendanceService.findAll(filter);
    }
    async getStatistics(startDate, endDate) {
        return this.attendanceService.getStatistics(startDate, endDate);
    }
    async findByEmployee(employeeId, startDate, endDate, status) {
        const filter = {
            employeeId,
            startDate,
            endDate,
            status: status,
        };
        return this.attendanceService.findAll(filter);
    }
    async findOne(id) {
        return this.attendanceService.findOne(id);
    }
    async update(id, updateAttendanceDto) {
        return this.attendanceService.update(id, updateAttendanceDto);
    }
    async remove(id) {
        return this.attendanceService.remove(id);
    }
    async clockIn(clockInDto) {
        return this.attendanceService.clockIn(clockInDto);
    }
    async clockOut(employeeId, clockOutDto) {
        return this.attendanceService.clockOut(employeeId, clockOutDto);
    }
    async clockInSelf(user, clockOutDto) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee record not found for current user`);
        }
        return this.attendanceService.clockIn({ employeeId: employee.id, notes: clockOutDto.notes });
    }
    async clockOutSelf(user, clockOutDto) {
        const employee = await this.prisma.employee.findUnique({
            where: { userId: user.id },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee record not found for current user`);
        }
        return this.attendanceService.clockOut(employee.id, clockOutDto);
    }
    async getMyHistory(user, startDate, endDate, status) {
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
            status: status,
        };
        return this.attendanceService.findAll(filter);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Attendance record created successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Attendance record already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get all attendance records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance records retrieved successfully', type: [attendance_dto_1.AttendanceResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.AttendanceFilterDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance statistics retrieved successfully' }),
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
], AttendanceController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get attendance records for a specific employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance records retrieved successfully', type: [attendance_dto_1.AttendanceResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'Employee ID' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Date,
        Date, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get an attendance record by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record retrieved successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Attendance record not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attendance ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Update an attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record updated successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Attendance record not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attendance ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an attendance record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance record deleted successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Attendance record not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Attendance ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('clock-in'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Clock in an employee' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Employee clocked in successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Already clocked in today' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attendance_dto_1.ClockInDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "clockIn", null);
__decorate([
    (0, common_1.Post)('clock-out/:employeeId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Clock out an employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee clocked out successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No clock-in record found for today' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Already clocked out today' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, attendance_dto_1.ClockOutDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "clockOut", null);
__decorate([
    (0, common_1.Post)('my/clock-in'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Clock in current user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Clocked in successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Already clocked in today' }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _a : Object, attendance_dto_1.ClockOutDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "clockInSelf", null);
__decorate([
    (0, common_1.Post)('my/clock-out'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Clock out current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Clocked out successfully', type: attendance_dto_1.AttendanceResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No clock-in record found for today' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Already clocked out today' }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _b : Object, attendance_dto_1.ClockOutDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "clockOutSelf", null);
__decorate([
    (0, common_1.Get)('my/history'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s attendance history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Attendance history retrieved successfully', type: [attendance_dto_1.AttendanceResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof shared_1.User !== "undefined" && shared_1.User) === "function" ? _c : Object, Date,
        Date, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getMyHistory", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('Attendance'),
    (0, common_1.Controller)('attendance'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService,
        prisma_service_1.PrismaService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map