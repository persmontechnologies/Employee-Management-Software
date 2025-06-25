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
exports.PerformanceReviewFilterDto = exports.PerformanceReviewResponseDto = exports.UpdatePerformanceReviewDto = exports.CreatePerformanceReviewDto = exports.RatingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RatingDto {
}
exports.RatingDto = RatingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Category name',
        example: 'Communication'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Category is required' }),
    __metadata("design:type", String)
], RatingDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rating value (1-5)',
        example: 4
    }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsNotEmpty)({ message: 'Rating value is required' }),
    __metadata("design:type", Number)
], RatingDto.prototype, "value", void 0);
class CreatePerformanceReviewDto {
}
exports.CreatePerformanceReviewDto = CreatePerformanceReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID being reviewed',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employee ID is required' }),
    __metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reviewer\'s employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Reviewer ID is required' }),
    __metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "reviewerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Review period (e.g., Q1 2023, 2023 Annual)',
        example: 'Q2 2023'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Review period is required' }),
    __metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "reviewPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ratings for different categories',
        example: {
            'Communication': 4,
            'Teamwork': 5,
            'Technical Skills': 4,
            'Problem Solving': 3,
            'Adaptability': 4
        }
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Ratings are required' }),
    __metadata("design:type", Object)
], CreatePerformanceReviewDto.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Overall comments and feedback',
        example: 'John has shown excellent progress in technical skills and communication.'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Comments are required' }),
    __metadata("design:type", String)
], CreatePerformanceReviewDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Goals for the next period',
        example: [
            'Improve project management skills',
            'Complete AWS certification',
            'Mentor a junior team member'
        ]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePerformanceReviewDto.prototype, "goals", void 0);
class UpdatePerformanceReviewDto {
}
exports.UpdatePerformanceReviewDto = UpdatePerformanceReviewDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Ratings for different categories',
        example: {
            'Communication': 4,
            'Teamwork': 5,
            'Technical Skills': 4,
            'Problem Solving': 3,
            'Adaptability': 4
        }
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePerformanceReviewDto.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Overall comments and feedback',
        example: 'John has shown excellent progress in technical skills and communication.'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePerformanceReviewDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Goals for the next period',
        example: [
            'Improve project management skills',
            'Complete AWS certification',
            'Mentor a junior team member'
        ]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdatePerformanceReviewDto.prototype, "goals", void 0);
class PerformanceReviewResponseDto {
}
exports.PerformanceReviewResponseDto = PerformanceReviewResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Performance review ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], PerformanceReviewResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID being reviewed',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], PerformanceReviewResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reviewer\'s employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], PerformanceReviewResponseDto.prototype, "reviewerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Review period (e.g., Q1 2023, 2023 Annual)',
        example: 'Q2 2023'
    }),
    __metadata("design:type", String)
], PerformanceReviewResponseDto.prototype, "reviewPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ratings for different categories',
        example: {
            'Communication': 4,
            'Teamwork': 5,
            'Technical Skills': 4,
            'Problem Solving': 3,
            'Adaptability': 4
        }
    }),
    __metadata("design:type", Object)
], PerformanceReviewResponseDto.prototype, "ratings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Overall comments and feedback',
        example: 'John has shown excellent progress in technical skills and communication.'
    }),
    __metadata("design:type", String)
], PerformanceReviewResponseDto.prototype, "comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Goals for the next period',
        example: [
            'Improve project management skills',
            'Complete AWS certification',
            'Mentor a junior team member'
        ]
    }),
    __metadata("design:type", Array)
], PerformanceReviewResponseDto.prototype, "goals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-04-01T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], PerformanceReviewResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-04-01T17:00:00.000Z'
    }),
    __metadata("design:type", Date)
], PerformanceReviewResponseDto.prototype, "updatedAt", void 0);
class PerformanceReviewFilterDto {
}
exports.PerformanceReviewFilterDto = PerformanceReviewFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee ID filter',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PerformanceReviewFilterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Reviewer ID filter',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PerformanceReviewFilterDto.prototype, "reviewerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Review period filter',
        example: 'Q2 2023'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PerformanceReviewFilterDto.prototype, "reviewPeriod", void 0);
//# sourceMappingURL=performance-review.dto.js.map