import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { LeaveType, LeaveStatus } from 'shared';

// DTO for creating a new leave request
export class CreateLeaveDto {
  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  @ApiProperty({
    description: 'Leave type',
    enum: LeaveType,
    example: LeaveType.ANNUAL
  })
  @IsEnum(LeaveType)
  @IsNotEmpty({ message: 'Leave type is required' })
  type: LeaveType;

  @ApiProperty({
    description: 'Start date of leave',
    example: '2023-04-15T00:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Start date is required' })
  startDate: Date;

  @ApiProperty({
    description: 'End date of leave',
    example: '2023-04-20T00:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'End date is required' })
  endDate: Date;

  @ApiProperty({
    description: 'Reason for leave',
    example: 'Family vacation'
  })
  @IsString()
  @IsNotEmpty({ message: 'Reason is required' })
  reason: string;
}

// DTO for updating a leave request
export class UpdateLeaveDto {
  @ApiPropertyOptional({
    description: 'Leave type',
    enum: LeaveType,
    example: LeaveType.ANNUAL
  })
  @IsEnum(LeaveType)
  @IsOptional()
  type?: LeaveType;

  @ApiPropertyOptional({
    description: 'Start date of leave',
    example: '2023-04-15T00:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date of leave',
    example: '2023-04-20T00:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Reason for leave',
    example: 'Family vacation'
  })
  @IsString()
  @IsOptional()
  reason?: string;
}

// DTO for approving/rejecting leave requests
export class UpdateLeaveStatusDto {
  @ApiProperty({
    description: 'Leave status',
    enum: LeaveStatus,
    example: LeaveStatus.APPROVED
  })
  @IsEnum(LeaveStatus)
  @IsNotEmpty({ message: 'Status is required' })
  status: LeaveStatus;

  @ApiPropertyOptional({
    description: 'Comments about the decision',
    example: 'Approved as requested'
  })
  @IsString()
  @IsOptional()
  comments?: string;
}

// DTO for leave response
export class LeaveResponseDto {
  @ApiProperty({
    description: 'Leave ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  employeeId: string;

  @ApiProperty({
    description: 'Leave type',
    enum: LeaveType,
    example: LeaveType.ANNUAL
  })
  type: LeaveType;

  @ApiProperty({
    description: 'Start date of leave',
    example: '2023-04-15T00:00:00.000Z'
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date of leave',
    example: '2023-04-20T00:00:00.000Z'
  })
  endDate: Date;

  @ApiProperty({
    description: 'Reason for leave',
    example: 'Family vacation'
  })
  reason: string;

  @ApiProperty({
    description: 'Leave status',
    enum: LeaveStatus,
    example: LeaveStatus.PENDING
  })
  status: LeaveStatus;

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

// DTO for filtering leave requests
export class LeaveFilterDto {
  @ApiPropertyOptional({
    description: 'Employee ID filter',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsOptional()
  employeeId?: string;

  @ApiPropertyOptional({
    description: 'Start date for filtering (inclusive)',
    example: '2023-04-01T00:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'End date for filtering (inclusive)',
    example: '2023-04-30T23:59:59.999Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Leave type filter',
    enum: LeaveType,
    example: LeaveType.ANNUAL
  })
  @IsEnum(LeaveType)
  @IsOptional()
  type?: LeaveType;

  @ApiPropertyOptional({
    description: 'Leave status filter',
    enum: LeaveStatus,
    example: LeaveStatus.PENDING
  })
  @IsEnum(LeaveStatus)
  @IsOptional()
  status?: LeaveStatus;
}