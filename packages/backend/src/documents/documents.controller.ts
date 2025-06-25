import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserRole, User } from 'shared';
import { DocumentsService } from './documents.service';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateDocumentDto, 
  UpdateDocumentDto, 
  DocumentResponseDto, 
  DocumentFilterDto 
} from './dto/document.dto';

@ApiTags('Documents')
@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly prisma: PrismaService
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Create a new document' })
  @ApiResponse({ status: 201, description: 'Document created successfully', type: DocumentResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({ status: 200, description: 'Documents retrieved successfully', type: [DocumentResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiQuery({ name: 'employeeId', required: false, type: String })
  @ApiQuery({ name: 'type', required: false, enum: ['CONTRACT', 'CERTIFICATE', 'IDENTIFICATION', 'PERFORMANCE_REVIEW', 'OTHER'] })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAll(@Query() filter: DocumentFilterDto) {
    return this.documentsService.findAll(filter);
  }

  @Get('statistics')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Get document statistics' })
  @ApiResponse({ status: 200, description: 'Document statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  async getStatistics() {
    return this.documentsService.getStatistics();
  }

  @Get('employee/:employeeId')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get documents for a specific employee' })
  @ApiResponse({ status: 200, description: 'Documents retrieved successfully', type: [DocumentResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @ApiParam({ name: 'employeeId', description: 'Employee ID' })
  async findByEmployee(
    @Param('employeeId') employeeId: string,
    @CurrentUser() user: User
  ) {
    // If an employee is trying to access someone else's documents, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (employee.id !== employeeId) {
        throw new NotFoundException(`Documents not found`); // Purposely vague for security
      }
    }

    return this.documentsService.findByEmployee(employeeId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.HR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiResponse({ status: 200, description: 'Document retrieved successfully', type: DocumentResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  async findOne(@Param('id') id: string, @CurrentUser() user: User) {
    const document = await this.documentsService.findOne(id);

    // If an employee is trying to access a document that is not theirs, block it
    if (user.role === UserRole.EMPLOYEE) {
      const employee = await this.prisma.employee.findUnique({
        where: { userId: user.id },
      });

      if (!employee) {
        throw new NotFoundException(`Employee record not found for current user`);
      }

      if (document.employeeId !== employee.id) {
        throw new NotFoundException(`Document not found`); // Purposely vague for security
      }
    }

    return document;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Update a document' })
  @ApiResponse({ status: 200, description: 'Document updated successfully', type: DocumentResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  async update(@Param('id') id: string, @Body() updateDocumentDto: UpdateDocumentDto) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.HR)
  @ApiOperation({ summary: 'Delete a document' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully', type: DocumentResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  async remove(@Param('id') id: string) {
    return this.documentsService.remove(id);
  }

  @Get('my/documents')
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get current user\'s documents' })
  @ApiResponse({ status: 200, description: 'Documents retrieved successfully', type: [DocumentResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Employee record not found' })
  async getMyDocuments(@CurrentUser() user: User) {
    // Get the employee record for the current user
    const employee = await this.prisma.employee.findUnique({
      where: { userId: user.id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee record not found for current user`);
    }

    return this.documentsService.findByEmployee(employee.id);
  }
}