import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'shared';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentResponseDto, DepartmentFilterDto } from './dto/department.dto';

@ApiTags('Departments')
@Controller('departments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({ status: 201, description: 'Department created successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 409, description: 'Conflict - Department already exists' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get all departments' })
  @ApiResponse({ status: 200, description: 'Departments retrieved successfully', type: [DepartmentResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiQuery({ name: 'name', required: false, type: String })
  async findAll(@Query() filter: DepartmentFilterDto) {
    return this.departmentsService.findAll(filter);
  }

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get department statistics' })
  @ApiResponse({ status: 200, description: 'Department statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  async getStatistics() {
    return this.departmentsService.getStatistics();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get a department by ID' })
  @ApiResponse({ status: 200, description: 'Department retrieved successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  @ApiParam({ name: 'id', description: 'Department ID' })
  async findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Update a department' })
  @ApiResponse({ status: 200, description: 'Department updated successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Department name already exists' })
  @ApiParam({ name: 'id', description: 'Department ID' })
  async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Delete a department' })
  @ApiResponse({ status: 200, description: 'Department deleted successfully', type: DepartmentResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Department has employees assigned to it' })
  @ApiParam({ name: 'id', description: 'Department ID' })
  async remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}