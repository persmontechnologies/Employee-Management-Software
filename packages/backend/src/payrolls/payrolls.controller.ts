import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'shared';
import { PayrollsService } from './payrolls.service';
import { 
  CreatePayrollDto, 
  UpdatePayrollDto, 
  UpdatePayrollStatusDto, 
  PayrollResponseDto, 
  PayrollFilterDto,
  GeneratePayrollDto
} from './dto/payroll.dto';

@ApiTags('Payrolls')
@Controller('payrolls')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PayrollsController {
  constructor(private readonly payrollsService: PayrollsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Create a new payroll record' })
  @ApiResponse({ status: 201, description: 'Payroll record created successfully', type: PayrollResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Payroll already exists' })
  async create(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollsService.create(createPayrollDto);
  }

  @Post('generate')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Generate payroll records for a specific month and year' })
  @ApiResponse({ status: 201, description: 'Payroll records generated successfully', type: [PayrollResponseDto] })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'No employees found matching criteria' })
  async generatePayrolls(@Body() generatePayrollDto: GeneratePayrollDto) {
    return this.payrollsService.generatePayrolls(generatePayrollDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get all payroll records' })
  @ApiResponse({ status: 200, description: 'Payroll records retrieved successfully', type: [PayrollResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'employeeId', required: false, type: String })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'PROCESSED', 'PAID'] })
  async findAll(@Query() filter: PayrollFilterDto) {
    return this.payrollsService.findAll(filter);
  }

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get payroll statistics' })
  @ApiResponse({ status: 200, description: 'Payroll statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  async getStatistics(
    @Query('month') month?: number,
    @Query('year') year?: number,
  ) {
    return this.payrollsService.getStatistics(month, year);
  }

  @Get('employee/:employeeId')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get payroll records for a specific employee' })
  @ApiResponse({ status: 200, description: 'Payroll records retrieved successfully', type: [PayrollResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'employeeId', description: 'Employee ID' })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['DRAFT', 'PROCESSED', 'PAID'] })
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @Query('month') month?: number,
    @Query('year') year?: number,
    @Query('status') status?: string,
  ) {
    const filter: PayrollFilterDto = { 
      employeeId,
      month,
      year,
      status: status as any,
    };
    
    return this.payrollsService.findAll(filter);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get a payroll record by ID' })
  @ApiResponse({ status: 200, description: 'Payroll record retrieved successfully', type: PayrollResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Payroll record not found' })
  @ApiParam({ name: 'id', description: 'Payroll ID' })
  async findOne(@Param('id') id: string) {
    return this.payrollsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Update a payroll record' })
  @ApiResponse({ status: 200, description: 'Payroll record updated successfully', type: PayrollResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Payroll record not found' })
  @ApiParam({ name: 'id', description: 'Payroll ID' })
  async update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollsService.update(id, updatePayrollDto);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Update payroll status' })
  @ApiResponse({ status: 200, description: 'Payroll status updated successfully', type: PayrollResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Payroll record not found' })
  @ApiParam({ name: 'id', description: 'Payroll ID' })
  async updateStatus(@Param('id') id: string, @Body() updatePayrollStatusDto: UpdatePayrollStatusDto) {
    return this.payrollsService.updateStatus(id, updatePayrollStatusDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Delete a payroll record' })
  @ApiResponse({ status: 200, description: 'Payroll record deleted successfully', type: PayrollResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request - Cannot delete a processed or paid payroll' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Payroll record not found' })
  @ApiParam({ name: 'id', description: 'Payroll ID' })
  async remove(@Param('id') id: string) {
    return this.payrollsService.remove(id);
  }

  @Get('my/payslips')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get current user\'s payslips' })
  @ApiResponse({ status: 200, description: 'Payslips retrieved successfully', type: [PayrollResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  async getMyPayslips(
    @Query('month') month?: number,
    @Query('year') year?: number,
  ) {
    // This needs to be implemented with more logic to check current user
    // We're just showing the API design here
    const employeeId = 'current-user-employee-id'; // This should be obtained from the current user
    
    const filter: PayrollFilterDto = { 
      employeeId,
      month,
      year,
      status: 'PAID' as any, // Only show paid payrolls to employees
    };
    
    return this.payrollsService.findAll(filter);
  }
}