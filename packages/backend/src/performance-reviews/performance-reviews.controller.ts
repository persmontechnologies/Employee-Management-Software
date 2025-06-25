import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserRole, User } from 'shared';
import { PerformanceReviewsService } from './performance-reviews.service';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreatePerformanceReviewDto, 
  UpdatePerformanceReviewDto, 
  PerformanceReviewResponseDto, 
  PerformanceReviewFilterDto 
} from './dto/performance-review.dto';

@ApiTags('Performance Reviews')
@Controller('performance-reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PerformanceReviewsController {
  constructor(
    private readonly performanceReviewsService: PerformanceReviewsService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Create a new performance review' })
  @ApiResponse({ status: 201, description: 'Performance review created successfully', type: PerformanceReviewResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee or reviewer not found' })
  @ApiResponse({ status: 409, description: 'Conflict - Review already exists for this period' })
  async create(@Body() createPerformanceReviewDto: CreatePerformanceReviewDto) {
    return this.performanceReviewsService.create(createPerformanceReviewDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Get all performance reviews' })
  @ApiResponse({ status: 200, description: 'Performance reviews retrieved successfully', type: [PerformanceReviewResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'employeeId', required: false, type: String })
  @ApiQuery({ name: 'reviewerId', required: false, type: String })
  @ApiQuery({ name: 'reviewPeriod', required: false, type: String })
  async findAll(@Query() filter: PerformanceReviewFilterDto) {
    return this.performanceReviewsService.findAll(filter);
  }

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.CFO)
  @ApiOperation({ summary: 'Get performance review statistics' })
  @ApiResponse({ status: 200, description: 'Performance review statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'departmentId', required: false, type: String })
  async getStatistics(@Query('departmentId') departmentId?: string) {
    return this.performanceReviewsService.getStatistics(departmentId);
  }

  @Get('employee/:employeeId')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get performance reviews for a specific employee' })
  @ApiResponse({ status: 200, description: 'Performance reviews retrieved successfully', type: [PerformanceReviewResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'employeeId', description: 'Employee ID' })
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @CurrentUser() user: User
  ) {
    // If an employee is trying to access someone else's reviews, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (employee.id !== employeeId) {
        throw new NotFoundException(`Performance reviews not found`); // Purposely vague for security
      }
    }

    return this.performanceReviewsService.getEmployeeReviews(employeeId);
  }

  @Get('reviewer/:reviewerId')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get performance reviews by a specific reviewer' })
  @ApiResponse({ status: 200, description: 'Performance reviews retrieved successfully', type: [PerformanceReviewResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Reviewer not found' })
  @ApiParam({ name: 'reviewerId', description: 'Reviewer ID' })
  async findByReviewer(
    @Param('reviewerId') reviewerId: string,
    @CurrentUser() user: User
  ) {
    // If an employee is trying to access reviews not made by them, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (employee.id !== reviewerId) {
        throw new NotFoundException(`Performance reviews not found`); // Purposely vague for security
      }
    }

    return this.performanceReviewsService.getReviewerReviews(reviewerId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get a performance review by ID' })
  @ApiResponse({ status: 200, description: 'Performance review retrieved successfully', type: PerformanceReviewResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Performance review not found' })
  @ApiParam({ name: 'id', description: 'Performance review ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    const review = await this.performanceReviewsService.findOne(id);

    // If an employee is trying to access a review that is not about them or by them, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (review.employeeId !== employee.id && review.reviewerId !== employee.id) {
        throw new NotFoundException(`Performance review not found`); // Purposely vague for security
      }
    }

    return review;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Update a performance review' })
  @ApiResponse({ status: 200, description: 'Performance review updated successfully', type: PerformanceReviewResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Performance review not found' })
  @ApiParam({ name: 'id', description: 'Performance review ID' })
  async update(@Param('id') id: string, @Body() updatePerformanceReviewDto: UpdatePerformanceReviewDto) {
    return this.performanceReviewsService.update(id, updatePerformanceReviewDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Delete a performance review' })
  @ApiResponse({ status: 200, description: 'Performance review deleted successfully', type: PerformanceReviewResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Performance review not found' })
  @ApiParam({ name: 'id', description: 'Performance review ID' })
  async remove(@Param('id') id: string) {
    return this.performanceReviewsService.remove(id);
  }

  @Get('my/reviews')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get current user\'s performance reviews' })
  @ApiResponse({ status: 200, description: 'Performance reviews retrieved successfully', type: [PerformanceReviewResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  async getMyReviews(@CurrentUser() user: User) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    return this.performanceReviewsService.getEmployeeReviews(employee.id);
  }

  @Get('my/performed-reviews')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get reviews performed by the current user' })
  @ApiResponse({ status: 200, description: 'Performance reviews retrieved successfully', type: [PerformanceReviewResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  async getMyPerformedReviews(@CurrentUser() user: User) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    return this.performanceReviewsService.getReviewerReviews(employee.id);
  }
}