import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// DTO for creating a new employee
export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Associated user ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @ApiProperty({
    description: 'Department ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Department ID is required' })
  departmentId: string;

  @ApiProperty({
    description: 'Employee position/job title',
    example: 'Software Engineer'
  })
  @IsString()
  @IsNotEmpty({ message: 'Position is required' })
  position: string;

  @ApiProperty({
    description: 'Date of joining',
    example: '2023-01-15T00:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Date of joining is required' })
  dateOfJoining: Date;

  @ApiProperty({
    description: 'Employee salary',
    example: 75000
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Salary is required' })
  salary: number;
}

// DTO for updating an existing employee
export class UpdateEmployeeDto {
  @ApiPropertyOptional({
    description: 'Department ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({
    description: 'Employee position/job title',
    example: 'Senior Software Engineer'
  })
  @IsString()
  @IsOptional()
  position?: string;

  @ApiPropertyOptional({
    description: 'Employee salary',
    example: 85000
  })
  @IsNumber()
  @IsOptional()
  salary?: number;
}

// DTO for employee response
export class EmployeeResponseDto {
  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Associated user ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  userId: string;

  @ApiProperty({
    description: 'Department ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  departmentId: string;

  @ApiProperty({
    description: 'Employee position/job title',
    example: 'Software Engineer'
  })
  position: string;

  @ApiProperty({
    description: 'Date of joining',
    example: '2023-01-15T00:00:00.000Z'
  })
  dateOfJoining: Date;

  @ApiProperty({
    description: 'Employee salary',
    example: 75000
  })
  salary: number;

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

// DTO for filtering employees
export class EmployeeFilterDto {
  @ApiPropertyOptional({
    description: 'Department ID filter',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({
    description: 'Position filter',
    example: 'Software Engineer'
  })
  @IsString()
  @IsOptional()
  position?: string;
}