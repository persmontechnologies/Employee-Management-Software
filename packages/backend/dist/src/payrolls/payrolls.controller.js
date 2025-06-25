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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const shared_1 = require("shared");
const payrolls_service_1 = require("./payrolls.service");
const payroll_dto_1 = require("./dto/payroll.dto");
let PayrollsController = class PayrollsController {
    constructor(payrollsService) {
        this.payrollsService = payrollsService;
    }
    async create(createPayrollDto) {
        return this.payrollsService.create(createPayrollDto);
    }
    async generatePayrolls(generatePayrollDto) {
        return this.payrollsService.generatePayrolls(generatePayrollDto);
    }
    async findAll(filter) {
        return this.payrollsService.findAll(filter);
    }
    async getStatistics(month, year) {
        return this.payrollsService.getStatistics(month, year);
    }
    async findByEmployee(employeeId, month, year, status) {
        const filter = {
            employeeId,
            month,
            year,
            status: status,
        };
        return this.payrollsService.findAll(filter);
    }
    async findOne(id) {
        return this.payrollsService.findOne(id);
    }
    async update(id, updatePayrollDto) {
        return this.payrollsService.update(id, updatePayrollDto);
    }
    async updateStatus(id, updatePayrollStatusDto) {
        return this.payrollsService.updateStatus(id, updatePayrollStatusDto);
    }
    async remove(id) {
        return this.payrollsService.remove(id);
    }
    async getMyPayslips(month, year) {
        const employeeId = 'current-user-employee-id';
        const filter = {
            employeeId,
            month,
            year,
            status: 'PAID',
        };
        return this.payrollsService.findAll(filter);
    }
};
exports.PayrollsController = PayrollsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new payroll record' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payroll record created successfully', type: payroll_dto_1.PayrollResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Payroll already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_dto_1.CreatePayrollDto]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Generate payroll records for a specific month and year' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payroll records generated successfully', type: [payroll_dto_1.PayrollResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No employees found matching criteria' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_dto_1.GeneratePayrollDto]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "generatePayrolls", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payroll records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payroll records retrieved successfully', type: [payroll_dto_1.PayrollResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'employeeId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'PROCESSED', 'PAID'] }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_dto_1.PayrollFilterDto]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payroll statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('employee/:employeeId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll records for a specific employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payroll records retrieved successfully', type: [payroll_dto_1.PayrollResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId', description: 'Employee ID' }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['DRAFT', 'PROCESSED', 'PAID'] }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "findByEmployee", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get a payroll record by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payroll record retrieved successfully', type: payroll_dto_1.PayrollResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payroll record not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payroll ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Update a payroll record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payroll record updated successfully', type: payroll_dto_1.PayrollResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payroll record not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payroll ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_dto_1.UpdatePayrollDto]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Update payroll status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payroll status updated successfully', type: payroll_dto_1.PayrollResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payroll record not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payroll ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payroll_dto_1.UpdatePayrollStatusDto]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a payroll record' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payroll record deleted successfully', type: payroll_dto_1.PayrollResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - Cannot delete a processed or paid payroll' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Payroll record not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Payroll ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('my/payslips'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s payslips' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payslips retrieved successfully', type: [payroll_dto_1.PayrollResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee record not found' }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false, type: Number }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PayrollsController.prototype, "getMyPayslips", null);
exports.PayrollsController = PayrollsController = __decorate([
    (0, swagger_1.ApiTags)('Payrolls'),
    (0, common_1.Controller)('payrolls'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [payrolls_service_1.PayrollsService])
], PayrollsController);
//# sourceMappingURL=payrolls.controller.js.map