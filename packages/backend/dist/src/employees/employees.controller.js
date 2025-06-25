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
exports.EmployeesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const shared_1 = require("shared");
const employees_service_1 = require("./employees.service");
const employee_dto_1 = require("./dto/employee.dto");
let EmployeesController = class EmployeesController {
    constructor(employeesService) {
        this.employeesService = employeesService;
    }
    async create(createEmployeeDto) {
        return this.employeesService.create(createEmployeeDto);
    }
    async findAll(filter) {
        return this.employeesService.findAll(filter);
    }
    async findOne(id) {
        return this.employeesService.findOne(id);
    }
    async findByUserId(userId) {
        return this.employeesService.findByUserId(userId);
    }
    async update(id, updateEmployeeDto) {
        return this.employeesService.update(id, updateEmployeeDto);
    }
    async remove(id) {
        return this.employeesService.remove(id);
    }
};
exports.EmployeesController = EmployeesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new employee' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Employee created successfully', type: employee_dto_1.EmployeeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Conflict - Employee already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get all employees' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employees retrieved successfully', type: [employee_dto_1.EmployeeResponseDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiQuery)({ name: 'departmentId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'position', required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.EmployeeFilterDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO),
    (0, swagger_1.ApiOperation)({ summary: 'Get an employee by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee retrieved successfully', type: employee_dto_1.EmployeeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR, shared_1.UserRole.CFO, shared_1.UserRole.EMPLOYEE),
    (0, swagger_1.ApiOperation)({ summary: 'Get an employee by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee retrieved successfully', type: employee_dto_1.EmployeeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Update an employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee updated successfully', type: employee_dto_1.EmployeeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(shared_1.UserRole.ADMIN, shared_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an employee' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee deleted successfully', type: employee_dto_1.EmployeeResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Employee ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeesController.prototype, "remove", null);
exports.EmployeesController = EmployeesController = __decorate([
    (0, swagger_1.ApiTags)('Employees'),
    (0, common_1.Controller)('employees'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [employees_service_1.EmployeesService])
], EmployeesController);
//# sourceMappingURL=employees.controller.js.map