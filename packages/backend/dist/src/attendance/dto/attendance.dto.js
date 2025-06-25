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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClockOutDto = exports.ClockInDto = exports.AttendanceFilterDto = exports.AttendanceResponseDto = exports.UpdateAttendanceDto = exports.CreateAttendanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const shared_1 = require("shared");
class CreateAttendanceDto {
}
exports.CreateAttendanceDto = CreateAttendanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employee ID is required' }),
    __metadata("design:type", String)
], CreateAttendanceDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of attendance',
        example: '2023-04-01T08:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Date is required' }),
    __metadata("design:type", Date)
], CreateAttendanceDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clock-in time',
        example: '2023-04-01T08:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Clock-in time is required' }),
    __metadata("design:type", Date)
], CreateAttendanceDto.prototype, "clockIn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Clock-out time',
        example: '2023-04-01T17:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateAttendanceDto.prototype, "clockOut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attendance status',
        enum: shared_1.AttendanceStatus,
        example: shared_1.AttendanceStatus.PRESENT
    }),
    (0, class_validator_1.IsEnum)(shared_1.AttendanceStatus),
    (0, class_validator_1.IsNotEmpty)({ message: 'Status is required' }),
    __metadata("design:type", typeof (_a = typeof shared_1.AttendanceStatus !== "undefined" && shared_1.AttendanceStatus) === "function" ? _a : Object)
], CreateAttendanceDto.prototype, "status", void 0);
class UpdateAttendanceDto {
}
exports.UpdateAttendanceDto = UpdateAttendanceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Clock-out time',
        example: '2023-04-01T17:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateAttendanceDto.prototype, "clockOut", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Attendance status',
        enum: shared_1.AttendanceStatus,
        example: shared_1.AttendanceStatus.PRESENT
    }),
    (0, class_validator_1.IsEnum)(shared_1.AttendanceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof shared_1.AttendanceStatus !== "undefined" && shared_1.AttendanceStatus) === "function" ? _b : Object)
], UpdateAttendanceDto.prototype, "status", void 0);
class AttendanceResponseDto {
}
exports.AttendanceResponseDto = AttendanceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attendance ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], AttendanceResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date of attendance',
        example: '2023-04-01T00:00:00.000Z'
    }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Clock-in time',
        example: '2023-04-01T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "clockIn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Clock-out time',
        example: '2023-04-01T17:00:00.000Z'
    }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "clockOut", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Attendance status',
        enum: shared_1.AttendanceStatus,
        example: shared_1.AttendanceStatus.PRESENT
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.AttendanceStatus !== "undefined" && shared_1.AttendanceStatus) === "function" ? _c : Object)
], AttendanceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-04-01T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-04-01T17:00:00.000Z'
    }),
    __metadata("design:type", Date)
], AttendanceResponseDto.prototype, "updatedAt", void 0);
class AttendanceFilterDto {
}
exports.AttendanceFilterDto = AttendanceFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee ID filter',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AttendanceFilterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Start date for filtering (inclusive)',
        example: '2023-04-01T00:00:00.000Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AttendanceFilterDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'End date for filtering (inclusive)',
        example: '2023-04-30T23:59:59.999Z'
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AttendanceFilterDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Attendance status filter',
        enum: shared_1.AttendanceStatus,
        example: shared_1.AttendanceStatus.PRESENT
    }),
    (0, class_validator_1.IsEnum)(shared_1.AttendanceStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof shared_1.AttendanceStatus !== "undefined" && shared_1.AttendanceStatus) === "function" ? _d : Object)
], AttendanceFilterDto.prototype, "status", void 0);
class ClockInDto {
}
exports.ClockInDto = ClockInDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employee ID is required' }),
    __metadata("design:type", String)
], ClockInDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Clock-in notes',
        example: 'Working from office today'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClockInDto.prototype, "notes", void 0);
class ClockOutDto {
}
exports.ClockOutDto = ClockOutDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Clock-out notes',
        example: 'Completed all tasks for today'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClockOutDto.prototype, "notes", void 0);
//# sourceMappingURL=attendance.dto.js.map