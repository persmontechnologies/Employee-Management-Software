import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateDocumentDto, 
  UpdateDocumentDto, 
  DocumentFilterDto
} from './dto/document.dto';
import { Document, DocumentType } from 'shared';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new document
   * @param createDocumentDto - Document creation data
   * @returns Newly created document
   */
  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id: createDocumentDto.employeeId },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${createDocumentDto.employeeId} not found`);
    }

    // Create document
    const document = await this.prisma.document.create({
      data: {
        employeeId: createDocumentDto.employeeId,
        type: createDocumentDto.type,
        name: createDocumentDto.name,
        url: createDocumentDto.url,
      },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapDocumentToDto(document);
  }

  /**
   * Find all documents with optional filtering
   * @param filter - Optional filter criteria
   * @returns List of documents
   */
  async findAll(filter?: DocumentFilterDto): Promise<Document[]> {
    const where: any = {};

    // Apply filters if provided
    if (filter?.employeeId) {
      where.employeeId = filter.employeeId;
    }

    if (filter?.type) {
      where.type = filter.type;
    }

    if (filter?.search) {
      where.name = {
        contains: filter.search,
        mode: 'insensitive', // Case-insensitive search
      };
    }

    const documents = await this.prisma.document.findMany({
      where,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return documents.map(document => this.mapDocumentToDto(document));
  }

  /**
   * Find a document by ID
   * @param id - Document ID
   * @returns Document
   * @throws NotFoundException if document not found
   */
  async findOne(id: string): Promise<Document> {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return this.mapDocumentToDto(document);
  }

  /**
   * Find documents for an employee
   * @param employeeId - Employee ID
   * @returns Documents for the employee
   */
  async findByEmployee(employeeId: string): Promise<Document[]> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    // Get documents for the employee
    const documents = await this.prisma.document.findMany({
      where: {
        employeeId,
      },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return documents.map(document => this.mapDocumentToDto(document));
  }

  /**
   * Update a document
   * @param id - Document ID
   * @param updateDocumentDto - Document update data
   * @returns Updated document
   * @throws NotFoundException if document not found
   */
  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    // Check if document exists
    const documentExists = await this.prisma.document.findUnique({
      where: { id },
    });

    if (!documentExists) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    // Update document
    const document = await this.prisma.document.update({
      where: { id },
      data: updateDocumentDto,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapDocumentToDto(document);
  }

  /**
   * Delete a document
   * @param id - Document ID
   * @returns Deleted document
   * @throws NotFoundException if document not found
   */
  async remove(id: string): Promise<Document> {
    // Check if document exists
    const documentExists = await this.prisma.document.findUnique({
      where: { id },
    });

    if (!documentExists) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    // Delete document
    const document = await this.prisma.document.delete({
      where: { id },
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapDocumentToDto(document);
  }

  /**
   * Get document statistics
   * @returns Document statistics
   */
  async getStatistics(): Promise<any> {
    // Get all documents
    const documents = await this.prisma.document.findMany({
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });

    // Calculate statistics
    const totalDocuments = documents.length;
    
    // Count by type
    const typeCount: Record<string, number> = {};
    // Use the shared enum DocumentType instead of trying to access it from Prisma
    const documentTypes = Object.values(DocumentType);
    
    documentTypes.forEach((type: string) => {
      typeCount[type] = 0;
    });

    documents.forEach(document => {
      typeCount[document.type as string]++;
    });

    // Count by department
    const departmentStats: Record<string, any> = {};
    
    documents.forEach(document => {
      const deptName = document.employee.department.name;
      
      if (!departmentStats[deptName]) {
        departmentStats[deptName] = {
          total: 0,
          types: {},
        };
        
        documentTypes.forEach((type: string) => {
          departmentStats[deptName].types[type] = 0;
        });
      }
      
      departmentStats[deptName].total++;
      departmentStats[deptName].types[document.type as string]++;
    });

    // Calculate employee coverage
    const employeeCount = await this.prisma.employee.count();
    const employeesWithDocuments = await this.prisma.employee.count({
      where: {
        documents: {
          some: {},
        },
      },
    });
    
    const coveragePercentage = employeeCount > 0
      ? ((employeesWithDocuments / employeeCount) * 100).toFixed(2)
      : 0;

    return {
      totalDocuments,
      byType: typeCount,
      byDepartment: departmentStats,
      employeeCoverage: {
        total: employeeCount,
        withDocuments: employeesWithDocuments,
        percentage: coveragePercentage,
      },
    };
  }

  /**
   * Map Prisma document object to DTO format
   * @param document - Prisma document object
   * @returns Document DTO object
   */
  private mapDocumentToDto(document: any): Document {
    return {
      id: document.id,
      employeeId: document.employeeId,
      employee: document.employee ? {
        id: document.employee.id,
        userId: document.employee.userId,
        user: document.employee.user ? {
          id: document.employee.user.id,
          email: document.employee.user.email,
          firstName: document.employee.user.firstName,
          lastName: document.employee.user.lastName,
          role: document.employee.user.role,
          createdAt: document.employee.user.createdAt,
          updatedAt: document.employee.user.updatedAt,
        } : undefined,
        departmentId: document.employee.departmentId,
        department: document.employee.department ? {
          id: document.employee.department.id,
          name: document.employee.department.name,
          createdAt: document.employee.department.createdAt,
          updatedAt: document.employee.department.updatedAt,
        } : undefined,
        position: document.employee.position,
        dateOfJoining: document.employee.dateOfJoining,
        salary: document.employee.salary,
        createdAt: document.employee.createdAt,
        updatedAt: document.employee.updatedAt,
      } : undefined,
      type: document.type,
      name: document.name,
      url: document.url,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    };
  }
}