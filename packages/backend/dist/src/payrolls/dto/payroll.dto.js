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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratePayrollDto = exports.PayrollFilterDto = exports.PayrollResponseDto = exports.UpdatePayrollStatusDto = exports.UpdatePayrollDto = exports.CreatePayrollDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const shared_1 = require("shared");
class CreatePayrollDto {
    constructor() {
        this.status = shared_1.PayrollStatus.DRAFT;
    }
}
exports.CreatePayrollDto = CreatePayrollDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employee ID is required' }),
    __metadata("design:type", String)
], CreatePayrollDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Month (1-12)',
        example: 4
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, class_validator_1.IsNotEmpty)({ message: 'Month is required' }),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Year',
        example: 2023
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(2100),
    (0, class_validator_1.IsNotEmpty)({ message: 'Year is required' }),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Base salary amount',
        example: 5000
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Base salary is required' }),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "baseSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Allowances amount',
        example: 500
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Allowances is required' }),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "allowances", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Deductions amount',
        example: 300
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Deductions is required' }),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "deductions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tax amount',
        example: 800
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tax is required' }),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Net salary amount',
        example: 4400
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Net salary is required' }),
    __metadata("design:type", Number)
], CreatePayrollDto.prototype, "netSalary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Payroll status',
        enum: shared_1.PayrollStatus,
        default: shared_1.PayrollStatus.DRAFT,
        example: shared_1.PayrollStatus.DRAFT
    }),
    (0, class_validator_1.IsEnum)(shared_1.PayrollStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof shared_1.PayrollStatus !== "undefined" && shared_1.PayrollStatus) === "function" ? _a : Object)
], CreatePayrollDto.prototype, "status", void 0);
class UpdatePayrollDto {
}
exports.UpdatePayrollDto = UpdatePayrollDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Base salary amount',
        example: 5200
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "baseSalary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Allowances amount',
        example: 550
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "allowances", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Deductions amount',
        example: 320
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "deductions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tax amount',
        example: 850
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Net salary amount',
        example: 4580
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdatePayrollDto.prototype, "netSalary", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Payroll status',
        enum: shared_1.PayrollStatus,
        example: shared_1.PayrollStatus.PROCESSED
    }),
    (0, class_validator_1.IsEnum)(shared_1.PayrollStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof shared_1.PayrollStatus !== "undefined" && shared_1.PayrollStatus) === "function" ? _b : Object)
], UpdatePayrollDto.prototype, "status", void 0);
class UpdatePayrollStatusDto {
}
exports.UpdatePayrollStatusDto = UpdatePayrollStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payroll status',
        enum: shared_1.PayrollStatus,
        example: shared_1.PayrollStatus.PROCESSED
    }),
    (0, class_validator_1.IsEnum)(shared_1.PayrollStatus),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is required' }),
    __metadata("design:type", typeof (_c = typeof shared_1.PayrollStatus !== "undefined" && shared_1.PayrollStatus) === "function" ? _c : Object)
], UpdatePayrollStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional notes/comments',
        example: 'Processed after overtime adjustment'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePayrollStatusDto.prototype, "notes", void 0);
class PayrollResponseDto {
}
exports.PayrollResponseDto = PayrollResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payroll ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], PayrollResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], PayrollResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Month (1-12)',
        example: 4
    }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Year',
        example: 2023
    }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Base salary amount',
        example: 5000
    }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "baseSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Allowances amount',
        example: 500
    }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "allowances", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Deductions amount',
        example: 300
    }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "deductions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tax amount',
        example: 800
    }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "tax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Net salary amount',
        example: 4400
    }),
    __metadata("design:type", Number)
], PayrollResponseDto.prototype, "netSalary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Payroll status',
        enum: shared_1.PayrollStatus,
        example: shared_1.PayrollStatus.DRAFT
    }),
    __metadata("design:type", typeof (_d = typeof shared_1.PayrollStatus !== "undefined" && shared_1.PayrollStatus) === "function" ? _d : Object)
], PayrollResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-04-01T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], PayrollResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-04-01T17:00:00.000Z'
    }),
    __metadata("design:type", Date)
], PayrollResponseDto.prototype, "updatedAt", void 0);
class PayrollFilterDto {
}
exports.PayrollFilterDto = PayrollFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee ID filter',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PayrollFilterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Month filter (1-12)',
        example: 4
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PayrollFilterDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Year filter',
        example: 2023
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(2100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PayrollFilterDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status filter',
        enum: shared_1.PayrollStatus,
        example: shared_1.PayrollStatus.PROCESSED
    }),
    (0, class_validator_1.IsEnum)(shared_1.PayrollStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_e = typeof shared_1.PayrollStatus !== "undefined" && shared_1.PayrollStatus) === "function" ? _e : Object)
], PayrollFilterDto.prototype, "status", void 0);
class GeneratePayrollDto {
}
exports.GeneratePayrollDto = GeneratePayrollDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Month to generate payroll for (1-12)',
        example: 4
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, class_validator_1.IsNotEmpty)({ message: 'Month is required' }),
    __metadata("design:type", Number)
], GeneratePayrollDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Year to generate payroll for',
        example: 2023
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(2100),
    (0, class_validator_1.IsNotEmpty)({ message: 'Year is required' }),
    __metadata("design:type", Number)
], GeneratePayrollDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Department ID filter (optional)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GeneratePayrollDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee ID filter (optional)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GeneratePayrollDto.prototype, "employeeId", void 0);
//# sourceMappingURL=payroll.dto.js.map