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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveFilterDto = exports.LeaveResponseDto = exports.UpdateLeaveStatusDto = exports.UpdateLeaveDto = exports.CreateLeaveDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const shared_1 = require("shared");
class CreateLeaveDto {
}
exports.CreateLeaveDto = CreateLeaveDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employee ID is required' }),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Leave type',
        enum: shared_1.LeaveType,
        example: shared_1.LeaveType.ANNUAL
    }),
    (0, class_validator_1.IsEnum)(shared_1.LeaveType),
    (0, class_validator_1.IsNotEmpty)({ message: 'Leave type is required' }),
    __metadata("design:type", typeof (_a = typeof shared_1.LeaveType !== "undefined" && shared_1.LeaveType) === "function" ? _a : Object)
], CreateLeaveDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of leave',
        example: '2023-04-15T00:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Start date is required' }),
    __metadata("design:type", Date)
], CreateLeaveDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of leave',
        example: '2023-04-20T00:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'End date is required' }),
    __metadata("design:type", Date)
], CreateLeaveDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for leave',
        example: 'Family vacation'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Reason is required' }),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "reason", void 0);
class UpdateLeaveDto {
}
exports.UpdateLeaveDto = UpdateLeaveDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Leave type',
        enum: shared_1.LeaveType,
        example: shared_1.LeaveType.ANNUAL
    }),
    (0, class_validator_1.IsEnum)(shared_1.LeaveType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof shared_1.LeaveType !== "undefined" && shared_1.LeaveType) === "function" ? _b : Object)
], UpdateLeaveDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start date of leave',
        example: '2023-04-15T00:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateLeaveDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'End date of leave',
        example: '2023-04-20T00:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateLeaveDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Reason for leave',
        example: 'Family vacation'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeaveDto.prototype, "reason", void 0);
class UpdateLeaveStatusDto {
}
exports.UpdateLeaveStatusDto = UpdateLeaveStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Leave status',
        enum: shared_1.LeaveStatus,
        example: shared_1.LeaveStatus.APPROVED
    }),
    (0, class_validator_1.IsEnum)(shared_1.LeaveStatus),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is required' }),
    __metadata("design:type", typeof (_c = typeof shared_1.LeaveStatus !== "undefined" && shared_1.LeaveStatus) === "function" ? _c : Object)
], UpdateLeaveStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Comments about the decision',
        example: 'Approved as requested'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateLeaveStatusDto.prototype, "comments", void 0);
class LeaveResponseDto {
}
exports.LeaveResponseDto = LeaveResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Leave ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Leave type',
        enum: shared_1.LeaveType,
        example: shared_1.LeaveType.ANNUAL
    }),
    __metadata("design:type", typeof (_d = typeof shared_1.LeaveType !== "undefined" && shared_1.LeaveType) === "function" ? _d : Object)
], LeaveResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Start date of leave',
        example: '2023-04-15T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'End date of leave',
        example: '2023-04-20T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reason for leave',
        example: 'Family vacation'
    }),
    __metadata("design:type", String)
], LeaveResponseDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Leave status',
        enum: shared_1.LeaveStatus,
        example: shared_1.LeaveStatus.PENDING
    }),
    __metadata("design:type", typeof (_e = typeof shared_1.LeaveStatus !== "undefined" && shared_1.LeaveStatus) === "function" ? _e : Object)
], LeaveResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-04-01T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-04-01T17:00:00.000Z'
    }),
    __metadata("design:type", Date)
], LeaveResponseDto.prototype, "updatedAt", void 0);
class LeaveFilterDto {
}
exports.LeaveFilterDto = LeaveFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee ID filter',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveFilterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start date for filtering (inclusive)',
        example: '2023-04-01T00:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], LeaveFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'End date for filtering (inclusive)',
        example: '2023-04-30T23:59:59.999Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], LeaveFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Leave type filter',
        enum: shared_1.LeaveType,
        example: shared_1.LeaveType.ANNUAL
    }),
    (0, class_validator_1.IsEnum)(shared_1.LeaveType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_f = typeof shared_1.LeaveType !== "undefined" && shared_1.LeaveType) === "function" ? _f : Object)
], LeaveFilterDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Leave status filter',
        enum: shared_1.LeaveStatus,
        example: shared_1.LeaveStatus.PENDING
    }),
    (0, class_validator_1.IsEnum)(shared_1.LeaveStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_g = typeof shared_1.LeaveStatus !== "undefined" && shared_1.LeaveStatus) === "function" ? _g : Object)
], LeaveFilterDto.prototype, "status", void 0);
//# sourceMappingURL=leave.dto.js.map