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
exports.DepartmentFilterDto = exports.DepartmentResponseDto = exports.UpdateDepartmentDto = exports.CreateDepartmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDepartmentDto {
}
exports.CreateDepartmentDto = CreateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department name',
        example: 'Engineering'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Department name is required' }),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "name", void 0);
class UpdateDepartmentDto {
}
exports.UpdateDepartmentDto = UpdateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department name',
        example: 'Engineering'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Department name is required' }),
    __metadata("design:type", String)
], UpdateDepartmentDto.prototype, "name", void 0);
class DepartmentResponseDto {
}
exports.DepartmentResponseDto = DepartmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Department name',
        example: 'Engineering'
    }),
    __metadata("design:type", String)
], DepartmentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-01-15T12:00:00.000Z'
    }),
    __metadata("design:type", Date)
], DepartmentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-01-15T12:00:00.000Z'
    }),
    __metadata("design:type", Date)
], DepartmentResponseDto.prototype, "updatedAt", void 0);
class DepartmentFilterDto {
}
exports.DepartmentFilterDto = DepartmentFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Department name filter (case insensitive, partial match)',
        example: 'Eng'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DepartmentFilterDto.prototype, "name", void 0);
//# sourceMappingURL=department.dto.js.map