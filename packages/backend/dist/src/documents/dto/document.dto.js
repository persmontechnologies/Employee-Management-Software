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
exports.DocumentFilterDto = exports.DocumentResponseDto = exports.UpdateDocumentDto = exports.CreateDocumentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const shared_1 = require("shared");
class CreateDocumentDto {
}
exports.CreateDocumentDto = CreateDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Employee ID is required' }),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document type',
        enum: shared_1.DocumentType,
        example: shared_1.DocumentType.CONTRACT
    }),
    (0, class_validator_1.IsEnum)(shared_1.DocumentType),
    (0, class_validator_1.IsNotEmpty)({ message: 'Document type is required' }),
    __metadata("design:type", typeof (_a = typeof shared_1.DocumentType !== "undefined" && shared_1.DocumentType) === "function" ? _a : Object)
], CreateDocumentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document name/title',
        example: 'Employment Contract'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Document name is required' }),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document URL/file path',
        example: 'https://storage.example.com/documents/contract-123.pdf'
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Document URL is required' }),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "url", void 0);
class UpdateDocumentDto {
}
exports.UpdateDocumentDto = UpdateDocumentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Document type',
        enum: shared_1.DocumentType,
        example: shared_1.DocumentType.CONTRACT
    }),
    (0, class_validator_1.IsEnum)(shared_1.DocumentType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof shared_1.DocumentType !== "undefined" && shared_1.DocumentType) === "function" ? _b : Object)
], UpdateDocumentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Document name/title',
        example: 'Updated Employment Contract'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDocumentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Document URL/file path',
        example: 'https://storage.example.com/documents/contract-123-updated.pdf'
    }),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDocumentDto.prototype, "url", void 0);
class DocumentResponseDto {
}
exports.DocumentResponseDto = DocumentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Employee ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document type',
        enum: shared_1.DocumentType,
        example: shared_1.DocumentType.CONTRACT
    }),
    __metadata("design:type", typeof (_c = typeof shared_1.DocumentType !== "undefined" && shared_1.DocumentType) === "function" ? _c : Object)
], DocumentResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document name/title',
        example: 'Employment Contract'
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document URL/file path',
        example: 'https://storage.example.com/documents/contract-123.pdf'
    }),
    __metadata("design:type", String)
], DocumentResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Creation timestamp',
        example: '2023-04-01T08:00:00.000Z'
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last update timestamp',
        example: '2023-04-01T17:00:00.000Z'
    }),
    __metadata("design:type", Date)
], DocumentResponseDto.prototype, "updatedAt", void 0);
class DocumentFilterDto {
}
exports.DocumentFilterDto = DocumentFilterDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Employee ID filter',
        example: '123e4567-e89b-12d3-a456-426614174000'
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DocumentFilterDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Document type filter',
        enum: shared_1.DocumentType,
        example: shared_1.DocumentType.CONTRACT
    }),
    (0, class_validator_1.IsEnum)(shared_1.DocumentType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof shared_1.DocumentType !== "undefined" && shared_1.DocumentType) === "function" ? _d : Object)
], DocumentFilterDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search term for document name',
        example: 'contract'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DocumentFilterDto.prototype, "search", void 0);
//# sourceMappingURL=document.dto.js.map