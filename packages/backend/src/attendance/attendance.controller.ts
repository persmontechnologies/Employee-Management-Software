import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserRole, User } from 'shared';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateAttendanceDto, 
  UpdateAttendanceDto, 
  AttendanceResponseDto, 
  AttendanceFilterDto,
  ClockInDto,
  ClockOutDto 
} from './dto/attendance.dto';

@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Create a new attendance record' })
  @ApiResponse({ status: 201, description: 'Attendance record created successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Attendance record already exists' })
  async create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get all attendance records' })
  @ApiResponse({ status: 200, description: 'Attendance records retrieved successfully', type: [AttendanceResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'employeeId', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiQuery({ name: 'status', required: false, enum: ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] })
  async findAll(@Query() filter: AttendanceFilterDto) {
    return this.attendanceService.findAll(filter);
  }

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get attendance statistics' })
  @ApiResponse({ status: 200, description: 'Attendance statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  async getStatistics(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.attendanceService.getStatistics(startDate, endDate);
  }

  @Get('employee/:employeeId')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get attendance records for a specific employee' })
  @ApiResponse({ status: 200, description: 'Attendance records retrieved successfully', type: [AttendanceResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'employeeId', description: 'Employee ID' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiQuery({ name: 'status', required: false, enum: ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] })
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('status') status?: string,
  ) {
    const filter: AttendanceFilterDto = { 
      employeeId,
      startDate,
      endDate,
      status: status as any,
    };
    
    return this.attendanceService.findAll(filter);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get an attendance record by ID' })
  @ApiResponse({ status: 200, description: 'Attendance record retrieved successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Attendance record not found' })
  @ApiParam({ name: 'id', description: 'Attendance ID' })
  async findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Update an attendance record' })
  @ApiResponse({ status: 200, description: 'Attendance record updated successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Attendance record not found' })
  @ApiParam({ name: 'id', description: 'Attendance ID' })
  async update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Delete an attendance record' })
  @ApiResponse({ status: 200, description: 'Attendance record deleted successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Attendance record not found' })
  @ApiParam({ name: 'id', description: 'Attendance ID' })
  async remove(@Param('id') id: string) {
    return this.attendanceService.remove(id);
  }

  @Post('clock-in')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Clock in an employee' })
  @ApiResponse({ status: 201, description: 'Employee clocked in successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Already clocked in today' })
  async clockIn(@Body() clockInDto: ClockInDto) {
    return this.attendanceService.clockIn(clockInDto);
  }

  @Post('clock-out/:employeeId')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Clock out an employee' })
  @ApiResponse({ status: 200, description: 'Employee clocked out successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'No clock-in record found for today' })
  @ApiResponse({ status: 409, description: 'Conflict - Already clocked out today' })
  @ApiParam({ name: 'employeeId', description: 'Employee ID' })
  async clockOut(
    @Param('employeeId') employeeId: string,
    @Body() clockOutDto: ClockOutDto,
  ) {
    return this.attendanceService.clockOut(employeeId, clockOutDto);
  }

  @Post('my/clock-in')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Clock in current user' })
  @ApiResponse({ status: 201, description: 'Clocked in successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Already clocked in today' })
  async clockInSelf(@CurrentUser() user: User, @Body() clockOutDto: ClockOutDto) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    return this.attendanceService.clockIn({ employeeId: employee.id, notes: clockOutDto.notes });
  }

  @Post('my/clock-out')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Clock out current user' })
  @ApiResponse({ status: 200, description: 'Clocked out successfully', type: AttendanceResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'No clock-in record found for today' })
  @ApiResponse({ status: 409, description: 'Conflict - Already clocked out today' })
  async clockOutSelf(@CurrentUser() user: User, @Body() clockOutDto: ClockOutDto) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    return this.attendanceService.clockOut(employee.id, clockOutDto);
  }

  @Get('my/history')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get current user\'s attendance history' })
  @ApiResponse({ status: 200, description: 'Attendance history retrieved successfully', type: [AttendanceResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiQuery({ name: 'status', required: false, enum: ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'] })
  async getMyHistory(
    @CurrentUser() user: User,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('status') status?: string,
  ) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    const filter: AttendanceFilterDto = {
      employeeId: employee.id,
      startDate,
      endDate,
      status: status as any,
    };

    return this.attendanceService.findAll(filter);
  }
}