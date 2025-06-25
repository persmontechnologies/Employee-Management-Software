import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsUrl, IsEnum, IsOptional } from 'class-validator';
import { DocumentType } from 'shared';

// DTO for creating a new document
export class CreateDocumentDto {
  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  @ApiProperty({
    description: 'Document type',
    enum: DocumentType,
    example: DocumentType.CONTRACT
  })
  @IsEnum(DocumentType)
  @IsNotEmpty({ message: 'Document type is required' })
  type: DocumentType;

  @ApiProperty({
    description: 'Document name/title',
    example: 'Employment Contract'
  })
  @IsString()
  @IsNotEmpty({ message: 'Document name is required' })
  name: string;

  @ApiProperty({
    description: 'Document URL/file path',
    example: 'https://storage.example.com/documents/contract-123.pdf'
  })
  @IsUrl()
  @IsNotEmpty({ message: 'Document URL is required' })
  url: string;
}

// DTO for updating an existing document
export class UpdateDocumentDto {
  @ApiPropertyOptional({
    description: 'Document type',
    enum: DocumentType,
    example: DocumentType.CONTRACT
  })
  @IsEnum(DocumentType)
  @IsOptional()
  type?: DocumentType;

  @ApiPropertyOptional({
    description: 'Document name/title',
    example: 'Updated Employment Contract'
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Document URL/file path',
    example: 'https://storage.example.com/documents/contract-123-updated.pdf'
  })
  @IsUrl()
  @IsOptional()
  url?: string;
}

// DTO for document response
export class DocumentResponseDto {
  @ApiProperty({
    description: 'Document ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  employeeId: string;

  @ApiProperty({
    description: 'Document type',
    enum: DocumentType,
    example: DocumentType.CONTRACT
  })
  type: DocumentType;

  @ApiProperty({
    description: 'Document name/title',
    example: 'Employment Contract'
  })
  name: string;

  @ApiProperty({
    description: 'Document URL/file path',
    example: 'https://storage.example.com/documents/contract-123.pdf'
  })
  url: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-04-01T08:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-04-01T17:00:00.000Z'
  })
  updatedAt: Date;
}

// DTO for filtering documents
export class DocumentFilterDto {
  @ApiPropertyOptional({
    description: 'Employee ID filter',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  employeeId?: string;

  @ApiPropertyOptional({
    description: 'Document type filter',
    enum: DocumentType,
    example: DocumentType.CONTRACT
  })
  @IsEnum(DocumentType)
  @IsOptional()
  type?: DocumentType;

  @ApiPropertyOptional({
    description: 'Search term for document name',
    example: 'contract'
  })
  @IsString()
  @IsOptional()
  search?: string;
}