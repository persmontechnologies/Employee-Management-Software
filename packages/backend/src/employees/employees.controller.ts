import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'shared';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto, EmployeeResponseDto, EmployeeFilterDto } from './dto/employee.dto';

@ApiTags('Employees')
@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'Employee created successfully', type: EmployeeResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 409, description: 'Conflict - Employee already exists' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'Employees retrieved successfully', type: [EmployeeResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'departmentId', required: false, type: String })
  @ApiQuery({ name: 'position', required: false, type: String })
  async findAll(@Query() filter: EmployeeFilterDto) {
    return this.employeesService.findAll(filter);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee retrieved successfully', type: EmployeeResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'id', description: 'Employee ID' })
  async findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Get('user/:userId')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get an employee by user ID' })
  @ApiResponse({ status: 200, description: 'Employee retrieved successfully', type: EmployeeResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  async findByUserId(@Param('userId') userId: string) {
    return this.employeesService.findByUserId(userId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Update an employee' })
  @ApiResponse({ status: 200, description: 'Employee updated successfully', type: EmployeeResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'id', description: 'Employee ID' })
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully', type: EmployeeResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'id', description: 'Employee ID' })
  async remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}