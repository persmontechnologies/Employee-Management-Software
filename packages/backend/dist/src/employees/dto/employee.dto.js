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
exports.EmployeeFilterDto = exports.EmployeeResponseDto = exports.UpdateEmployeeDto = exports.CreateEmployeeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateEmployeeDto {
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated user ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'User ID is required' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Department ID is required' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee position/job title',
        example: 'Software Engineer'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Position is required' }),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of joining',
        example: '2023-01-15T00:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Date of joining is required' }),
    __metadata("design:type", Date)
], CreateEmployeeDto.prototype, "dateOfJoining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee salary',
        example: 75000
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Salary is required' }),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "salary", void 0);
class UpdateEmployeeDto {
}
exports.UpdateEmployeeDto = UpdateEmployeeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Department ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee position/job title',
        example: 'Senior Software Engineer'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEmployeeDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee salary',
        example: 85000
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateEmployeeDto.prototype, "salary", void 0);
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Associated user ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee position/job title',
        example: 'Software Engineer'
    }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of joining',
        example: '2023-01-15T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "dateOfJoining", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee salary',
        example: 75000
    }),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "salary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-01-15T12:00:00.000Z'
    }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-01-15T12:00:00.000Z'
    }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "updatedAt", void 0);
class EmployeeFilterDto {
}
exports.EmployeeFilterDto = EmployeeFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Department ID filter',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EmployeeFilterDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Position filter',
        example: 'Software Engineer'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EmployeeFilterDto.prototype, "position", void 0);
//# sourceMappingURL=employee.dto.js.map