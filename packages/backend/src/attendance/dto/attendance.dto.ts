import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceStatus } from 'shared';

// DTO for creating a new attendance record
export class CreateAttendanceDto {
  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  @ApiProperty({
    description: 'Date of attendance',
    example: '2023-04-01T08:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Date is required' })
  date: Date;

  @ApiProperty({
    description: 'Clock-in time',
    example: '2023-04-01T08:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty({ message: 'Clock-in time is required' })
  clockIn: Date;

  @ApiPropertyOptional({
    description: 'Clock-out time',
    example: '2023-04-01T17:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  clockOut?: Date;

  @ApiProperty({
    description: 'Attendance status',
    enum: AttendanceStatus,
    example: AttendanceStatus.PRESENT
  })
  @IsEnum(AttendanceStatus)
  @IsNotEmpty({ message: 'Status is required' })
  status: AttendanceStatus;
}

// DTO for updating an existing attendance record
export class UpdateAttendanceDto {
  @ApiPropertyOptional({
    description: 'Clock-out time',
    example: '2023-04-01T17:00:00.000Z'
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  clockOut?: Date;

  @ApiPropertyOptional({
    description: 'Attendance status',
    enum: AttendanceStatus,
    example: AttendanceStatus.PRESENT
  })
  @IsEnum(AttendanceStatus)
  @IsOptional()
  status?: AttendanceStatus;
}

// DTO for attendance response
export class AttendanceResponseDto {
  @ApiProperty({
    description: 'Attendance ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  employeeId: string;

  @ApiProperty({
    description: 'Date of attendance',
    example: '2023-04-01T00:00:00.000Z'
  })
  date: Date;

  @ApiProperty({
    description: 'Clock-in time',
    example: '2023-04-01T08:00:00.000Z'
  })
  clockIn: Date;

  @ApiPropertyOptional({
    description: 'Clock-out time',
    example: '2023-04-01T17:00:00.000Z'
  })
  clockOut?: Date;

  @ApiProperty({
    description: 'Attendance status',
    enum: AttendanceStatus,
    example: AttendanceStatus.PRESENT
  })
  status: AttendanceStatus;

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

// DTO for filtering attendance records
export class AttendanceFilterDto {
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
    description: 'Attendance status filter',
    enum: AttendanceStatus,
    example: AttendanceStatus.PRESENT
  })
  @IsEnum(AttendanceStatus)
  @IsOptional()
  status?: AttendanceStatus;
}

// DTO for clock-in operation
export class ClockInDto {
  @ApiProperty({
    description: 'Employee ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Employee ID is required' })
  employeeId: string;

  @ApiPropertyOptional({
    description: 'Clock-in notes',
    example: 'Working from office today'
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

// DTO for clock-out operation
export class ClockOutDto {
  @ApiPropertyOptional({
    description: 'Clock-out notes',
    example: 'Completed all tasks for today'
  })
  @IsString()
  @IsOptional()
  notes?: string;
}