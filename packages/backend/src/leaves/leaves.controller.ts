import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserRole, User } from 'shared';
import { LeavesService } from './leaves.service';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateLeaveDto, 
  UpdateLeaveDto, 
  UpdateLeaveStatusDto, 
  LeaveResponseDto, 
  LeaveFilterDto 
} from './dto/leave.dto';

@ApiTags('Leaves')
@Controller('leaves')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class LeavesController {
  constructor(
    private readonly leavesService: LeavesService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Create a new leave request' })
  @ApiResponse({ status: 201, description: 'Leave request created successfully', type: LeaveResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Overlapping leave exists' })
  async create(@Body() createLeaveDto: CreateLeaveDto, @CurrentUser() user: User) {
    // If employee is creating their own leave request, get their employee ID
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      // Override employeeId with the current user's employee ID
      createLeaveDto.employeeId = employee.id;
    }

    return this.leavesService.create(createLeaveDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get all leave requests' })
  @ApiResponse({ status: 200, description: 'Leave requests retrieved successfully', type: [LeaveResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'employeeId', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiQuery({ name: 'type', required: false, enum: ['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID'] })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'] })
  async findAll(@Query() filter: LeaveFilterDto) {
    return this.leavesService.findAll(filter);
  }

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get leave statistics' })
  @ApiResponse({ status: 200, description: 'Leave statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  async getStatistics(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.leavesService.getStatistics(startDate, endDate);
  }

  @Get('employee/:employeeId')
@Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
@ApiOperation({ summary: 'Get leave requests for a specific employee' })
@ApiResponse({ status: 200, description: 'Leave requests retrieved successfully', type: [LeaveResponseDto] })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 404, description: 'Employee not found' })
@ApiParam({ name: 'employeeId', description: 'Employee ID' })
@ApiQuery({ name: 'startDate', required: false, type: Date })
@ApiQuery({ name: 'endDate', required: false, type: Date })
@ApiQuery({ name: 'type', required: false, enum: ['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID'] })
@ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'] })
async findByEmployee(
  @Param('employeeId') employeeId: string,
  @CurrentUser() user: User,
  @Query('startDate') startDate?: Date,
  @Query('endDate') endDate?: Date,
  @Query('type') type?: string,
  @Query('status') status?: string,
) {
    // If an employee is trying to access someone else's leave records, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (employee.id !== employeeId) {
        throw new NotFoundException(`Leave records not found`); // Purposely vague for security
      }
    }

    const filter: LeaveFilterDto = { 
      employeeId,
      startDate,
      endDate,
      type: type as any,
      status: status as any,
    };
    
    return this.leavesService.findAll(filter);
  }

  @Get('balance/:employeeId')
@Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
@ApiOperation({ summary: 'Get leave balance for an employee' })
@ApiResponse({ status: 200, description: 'Leave balance retrieved successfully' })
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 404, description: 'Employee not found' })
@ApiParam({ name: 'employeeId', description: 'Employee ID' })
@ApiQuery({ name: 'year', required: false, type: Number, description: 'Year for calculation (defaults to current year)' })
async getLeaveBalance(
  @Param('employeeId') employeeId: string,
  @CurrentUser() user: User,
  @Query('year') year?: number,
) {
    // If an employee is trying to access someone else's leave balance, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (employee.id !== employeeId) {
        throw new NotFoundException(`Leave balance not found`); // Purposely vague for security
      }
    }

    return this.leavesService.getLeaveBalance(employeeId, year);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get a leave request by ID' })
  @ApiResponse({ status: 200, description: 'Leave request retrieved successfully', type: LeaveResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    const leave = await this.leavesService.findOne(id);

    // If an employee is trying to access someone else's leave, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (leave.employeeId !== employee.id) {
        throw new NotFoundException(`Leave request not found`); // Purposely vague for security
      }
    }

    return leave;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Update a leave request' })
  @ApiResponse({ status: 200, description: 'Leave request updated successfully', type: LeaveResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Cannot update an approved leave' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  async update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto, @CurrentUser() user: User) {
    // Check if leave exists
    const leave = await this.leavesService.findOne(id);

    // If an employee is trying to update someone else's leave, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (leave.employeeId !== employee.id) {
        throw new NotFoundException(`Leave request not found`); // Purposely vague for security
      }
    }

    return this.leavesService.update(id, updateLeaveDto);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Approve or reject a leave request' })
  @ApiResponse({ status: 200, description: 'Leave request status updated successfully', type: LeaveResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  async updateStatus(@Param('id') id: string, @Body() updateLeaveStatusDto: UpdateLeaveStatusDto) {
    return this.leavesService.updateStatus(id, updateLeaveStatusDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Delete a leave request' })
  @ApiResponse({ status: 200, description: 'Leave request deleted successfully', type: LeaveResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request - Cannot delete an approved leave' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  @ApiParam({ name: 'id', description: 'Leave ID' })
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    // Check if leave exists
    const leave = await this.leavesService.findOne(id);

    // If an employee is trying to delete someone else's leave, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (leave.employeeId !== employee.id) {
        throw new NotFoundException(`Leave request not found`); // Purposely vague for security
      }
    }

    return this.leavesService.remove(id);
  }

  @Get('my/requests')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get current user\'s leave requests' })
  @ApiResponse({ status: 200, description: 'Leave requests retrieved successfully', type: [LeaveResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiQuery({ name: 'type', required: false, enum: ['ANNUAL', 'SICK', 'MATERNITY', 'PATERNITY', 'UNPAID'] })
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'APPROVED', 'REJECTED'] })
  async getMyRequests(
    @CurrentUser() user: User,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    const filter: LeaveFilterDto = {
      employeeId: employee.id,
      startDate,
      endDate,
      type: type as any,
      status: status as any,
    };

    return this.leavesService.findAll(filter);
  }

  @Get('my/balance')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get current user\'s leave balance' })
  @ApiResponse({ status: 200, description: 'Leave balance retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  @ApiQuery({ name: 'year', required: false, type: Number, description: 'Year for calculation (defaults to current year)' })
  async getMyBalance(
    @CurrentUser() user: User,
    @Query('year') year?: number,
  ) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    return this.leavesService.getLeaveBalance(employee.id, year);
  }
}