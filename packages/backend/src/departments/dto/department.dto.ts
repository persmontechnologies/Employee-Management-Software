import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

// DTO for creating a new department
export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Department name',
    example: 'Engineering'
  })
  @IsString()
  @IsNotEmpty({ message: 'Department name is required' })
  name: string;
}

// DTO for updating an existing department
export class UpdateDepartmentDto {
  @ApiProperty({
    description: 'Department name',
    example: 'Engineering'
  })
  @IsString()
  @IsNotEmpty({ message: 'Department name is required' })
  name: string;
}

// DTO for department response
export class DepartmentResponseDto {
  @ApiProperty({
    description: 'Department ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Department name',
    example: 'Engineering'
  })
  name: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-01-15T12:00:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-01-15T12:00:00.000Z'
  })
  updatedAt: Date;
}

// DTO for filtering departments
export class DepartmentFilterDto {
  @ApiPropertyOptional({
    description: 'Department name filter (case insensitive, partial match)',
    example: 'Eng'
  })
  @IsString()
  @IsOptional()
  name?: string;
}