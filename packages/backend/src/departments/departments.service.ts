import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto, DepartmentFilterDto } from './dto/department.dto';
import { Department } from 'shared';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new department
   * @param createDepartmentDto - Department creation data
   * @returns Newly created department
   */
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    // Check if department with the same name already exists
    const departmentExists = await this.prisma.department.findFirst({
      where: {
        name: {
          equals: createDepartmentDto.name,
          mode: 'insensitive', // Case-insensitive comparison
        },
      },
    });

    if (departmentExists) {
      throw new ConflictException(`Department with name '${createDepartmentDto.name}' already exists`);
    }

    // Create department
    const department = await this.prisma.department.create({
      data: {
        name: createDepartmentDto.name,
      },
    });

    return department;
  }

  /**
   * Find all departments with optional filtering
   * @param filter - Optional filter criteria
   * @returns List of departments
   */
  async findAll(filter?: DepartmentFilterDto): Promise<Department[]> {
    const where = {};

    // Apply filters if provided
    if (filter?.name) {
      where['name'] = {
        contains: filter.name,
        mode: 'insensitive', // Case-insensitive search
      };
    }

    const departments = await this.prisma.department.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });

    return departments;
  }

  /**
   * Find a department by ID
   * @param id - Department ID
   * @returns Department object
   * @throws NotFoundException if department not found
   */
  async findOne(id: string): Promise<Department> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  /**
   * Update a department
   * @param id - Department ID
   * @param updateDepartmentDto - Department update data
   * @returns Updated department
   * @throws NotFoundException if department not found
   * @throws ConflictException if new name already exists
   */
  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    // Check if department exists
    const departmentExists = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!departmentExists) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    // Check if department with the new name already exists (unless it's the same department)
    if (updateDepartmentDto.name && updateDepartmentDto.name !== departmentExists.name) {
      const nameExists = await this.prisma.department.findFirst({
        where: {
          name: {
            equals: updateDepartmentDto.name,
            mode: 'insensitive', // Case-insensitive comparison
          },
          id: { not: id }, // Exclude the current department
        },
      });

      if (nameExists) {
        throw new ConflictException(`Department with name '${updateDepartmentDto.name}' already exists`);
      }
    }

    // Update department
    const department = await this.prisma.department.update({
      where: { id },
      data: updateDepartmentDto,
    });

    return department;
  }

  /**
   * Delete a department
   * @param id - Department ID
   * @returns Deleted department
   * @throws NotFoundException if department not found
   */
  async remove(id: string): Promise<Department> {
    try {
      // Check if department exists
      const departmentExists = await this.prisma.department.findUnique({
        where: { id },
      });

      if (!departmentExists) {
        throw new NotFoundException(`Department with ID ${id} not found`);
      }

      // Check if there are employees in this department
      const employeesCount = await this.prisma.employee.count({
        where: { departmentId: id },
      });

      if (employeesCount > 0) {
        throw new ConflictException(`Cannot delete department with ID ${id} because it has ${employeesCount} employees assigned to it`);
      }

      // Delete department
      const department = await this.prisma.department.delete({
        where: { id },
      });

      return department;
    } catch (error) {
      // Re-throw the error to be handled by the controller
      throw error;
    }
  }

  /**
   * Get department statistics
   * @returns Department statistics including counts
   */
  async getStatistics(): Promise<any> {
    // Get all departments
    const departments = await this.prisma.department.findMany();
    
    // Get employee counts for each department
    const departmentStats = await Promise.all(
      departments.map(async (department) => {
        const employeeCount = await this.prisma.employee.count({
          where: { departmentId: department.id },
        });
        
        return {
          id: department.id,
          name: department.name,
          employeeCount,
        };
      })
    );
    
    // Get total employee count
    const totalEmployees = await this.prisma.employee.count();
    
    return {
      departments: departmentStats,
      totalDepartments: departments.length,
      totalEmployees,
    };
  }
}