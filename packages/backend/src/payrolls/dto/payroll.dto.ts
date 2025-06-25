import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsNumber, IsInt, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PayrollStatus } from 'shared';

// DTO for creating a new payroll record
export class CreatePayrollDto {
  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  @ApiProperty({
    description: 'Month (1-12)',
    example: 4
  })
  @IsInt()
  @Min(1)
  @Max(12)
  @IsNotEmpty({ message: 'Month is required' })
  month: number;

  @ApiProperty({
    description: 'Year',
    example: 2023
  })
  @IsInt()
  @Min(2000)
  @Max(2100)
  @IsNotEmpty({ message: 'Year is required' })
  year: number;

  @ApiProperty({
    description: 'Base salary amount',
    example: 5000
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Base salary is required' })
  baseSalary: number;

  @ApiProperty({
    description: 'Allowances amount',
    example: 500
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Allowances is required' })
  allowances: number;

  @ApiProperty({
    description: 'Deductions amount',
    example: 300
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Deductions is required' })
  deductions: number;

  @ApiProperty({
    description: 'Tax amount',
    example: 800
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Tax is required' })
  tax: number;

  @ApiProperty({
    description: 'Net salary amount',
    example: 4400
  })
  @IsNumber()
  @IsNotEmpty({ message: 'Net salary is required' })
  netSalary: number;

  @ApiPropertyOptional({
    description: 'Payroll status',
    enum: PayrollStatus,
    default: PayrollStatus.DRAFT,
    example: PayrollStatus.DRAFT
  })
  @IsEnum(PayrollStatus)
  @IsOptional()
  status?: PayrollStatus = PayrollStatus.DRAFT;
}

// DTO for updating an existing payroll record
export class UpdatePayrollDto {
  @ApiPropertyOptional({
    description: 'Base salary amount',
    example: 5200
  })
  @IsNumber()
  @IsOptional()
  baseSalary?: number;

  @ApiPropertyOptional({
    description: 'Allowances amount',
    example: 550
  })
  @IsNumber()
  @IsOptional()
  allowances?: number;

  @ApiPropertyOptional({
    description: 'Deductions amount',
    example: 320
  })
  @IsNumber()
  @IsOptional()
  deductions?: number;

  @ApiPropertyOptional({
    description: 'Tax amount',
    example: 850
  })
  @IsNumber()
  @IsOptional()
  tax?: number;

  @ApiPropertyOptional({
    description: 'Net salary amount',
    example: 4580
  })
  @IsNumber()
  @IsOptional()
  netSalary?: number;

  @ApiPropertyOptional({
    description: 'Payroll status',
    enum: PayrollStatus,
    example: PayrollStatus.PROCESSED
  })
  @IsEnum(PayrollStatus)
  @IsOptional()
  status?: PayrollStatus;
}

// DTO for updating payroll status
export class UpdatePayrollStatusDto {
  @ApiProperty({
    description: 'Payroll status',
    enum: PayrollStatus,
    example: PayrollStatus.PROCESSED
  })
  @IsEnum(PayrollStatus)
  @IsNotEmpty({ message: 'Status is required' })
  status: PayrollStatus;

  @ApiPropertyOptional({
    description: 'Additional notes/comments',
    example: 'Processed after overtime adjustment'
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

// DTO for payroll response
export class PayrollResponseDto {
  @ApiProperty({
    description: 'Payroll ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  employeeId: string;

  @ApiProperty({
    description: 'Month (1-12)',
    example: 4
  })
  month: number;

  @ApiProperty({
    description: 'Year',
    example: 2023
  })
  year: number;

  @ApiProperty({
    description: 'Base salary amount',
    example: 5000
  })
  baseSalary: number;

  @ApiProperty({
    description: 'Allowances amount',
    example: 500
  })
  allowances: number;

  @ApiProperty({
    description: 'Deductions amount',
    example: 300
  })
  deductions: number;

  @ApiProperty({
    description: 'Tax amount',
    example: 800
  })
  tax: number;

  @ApiProperty({
    description: 'Net salary amount',
    example: 4400
  })
  netSalary: number;

  @ApiProperty({
    description: 'Payroll status',
    enum: PayrollStatus,
    example: PayrollStatus.DRAFT
  })
  status: PayrollStatus;

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

// DTO for filtering payroll records
export class PayrollFilterDto {
  @ApiPropertyOptional({
    description: 'Employee ID filter',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  employeeId?: string;

  @ApiPropertyOptional({
    description: 'Month filter (1-12)',
    example: 4
  })
  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  month?: number;

  @ApiPropertyOptional({
    description: 'Year filter',
    example: 2023
  })
  @IsInt()
  @Min(2000)
  @Max(2100)
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({
    description: 'Status filter',
    enum: PayrollStatus,
    example: PayrollStatus.PROCESSED
  })
  @IsEnum(PayrollStatus)
  @IsOptional()
  status?: PayrollStatus;
}

// DTO for generating a new payroll
export class GeneratePayrollDto {
  @ApiProperty({
    description: 'Month to generate payroll for (1-12)',
    example: 4
  })
  @IsInt()
  @Min(1)
  @Max(12)
  @IsNotEmpty({ message: 'Month is required' })
  month: number;

  @ApiProperty({
    description: 'Year to generate payroll for',
    example: 2023
  })
  @IsInt()
  @Min(2000)
  @Max(2100)
  @IsNotEmpty({ message: 'Year is required' })
  year: number;

  @ApiPropertyOptional({
    description: 'Department ID filter (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  departmentId?: string;

  @ApiPropertyOptional({
    description: 'Employee ID filter (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  employeeId?: string;
}