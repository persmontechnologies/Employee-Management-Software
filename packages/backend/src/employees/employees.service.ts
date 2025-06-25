import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto, EmployeeFilterDto } from './dto/employee.dto';
import { Employee } from 'shared';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new employee
   * @param createEmployeeDto - Employee creation data
   * @returns Newly created employee
   */
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Check if user exists
    const userExists = await this.prisma.user.findUnique({
      where: { id: createEmployeeDto.userId },
    });

    if (!userExists) {
      throw new NotFoundException(`User with ID ${createEmployeeDto.userId} not found`);
    }

    // Check if department exists
    const departmentExists = await this.prisma.department.findUnique({
      where: { id: createEmployeeDto.departmentId },
    });

    if (!departmentExists) {
      throw new NotFoundException(`Department with ID ${createEmployeeDto.departmentId} not found`);
    }

    // Check if employee already exists for this user
    const employeeExists = await this.prisma.employee.findUnique({
      where: { userId: createEmployeeDto.userId },
    });

    if (employeeExists) {
      throw new ConflictException(`Employee already exists for user with ID ${createEmployeeDto.userId}`);
    }

    // Create employee record
    const employee = await this.prisma.employee.create({
      data: {
        userId: createEmployeeDto.userId,
        departmentId: createEmployeeDto.departmentId,
        position: createEmployeeDto.position,
        dateOfJoining: createEmployeeDto.dateOfJoining,
        salary: createEmployeeDto.salary,
      },
      include: {
        user: true,
        department: true,
      },
    });

    return this.mapEmployeeToDto(employee);
  }

  /**
   * Find all employees with optional filtering
   * @param filter - Optional filter criteria
   * @returns List of employees
   */
  async findAll(filter?: EmployeeFilterDto): Promise<Employee[]> {
    const where = {};

    // Apply filters if provided
    if (filter?.departmentId) {
      where['departmentId'] = filter.departmentId;
    }

    if (filter?.position) {
      where['position'] = { contains: filter.position, mode: 'insensitive' };
    }

    const employees = await this.prisma.employee.findMany({
      where,
      include: {
        user: true,
        department: true,
      },
      orderBy: {
        user: {
          lastName: 'asc',
        },
      },
    });

    return employees.map(employee => this.mapEmployeeToDto(employee));
  }

  /**
   * Find an employee by ID
   * @param id - Employee ID
   * @returns Employee object
   * @throws NotFoundException if employee not found
   */
  async findOne(id: string): Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        user: true,
        department: true,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.mapEmployeeToDto(employee);
  }

  /**
   * Find an employee by user ID
   * @param userId - User ID
   * @returns Employee object
   * @throws NotFoundException if employee not found
   */
  async findByUserId(userId: string): Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({
      where: { userId },
      include: {
        user: true,
        department: true,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with user ID ${userId} not found`);
    }

    return this.mapEmployeeToDto(employee);
  }

  /**
   * Update an employee
   * @param id - Employee ID
   * @param updateEmployeeDto - Employee update data
   * @returns Updated employee
   * @throws NotFoundException if employee not found
   */
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Check if department exists if updating department
    if (updateEmployeeDto.departmentId) {
      const departmentExists = await this.prisma.department.findUnique({
        where: { id: updateEmployeeDto.departmentId },
      });

      if (!departmentExists) {
        throw new NotFoundException(`Department with ID ${updateEmployeeDto.departmentId} not found`);
      }
    }

    // Update employee
    const employee = await this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
      include: {
        user: true,
        department: true,
      },
    });

    return this.mapEmployeeToDto(employee);
  }

  /**
   * Delete an employee
   * @param id - Employee ID
   * @returns Deleted employee
   * @throws NotFoundException if employee not found
   */
  async remove(id: string): Promise<Employee> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    // Delete employee
    const employee = await this.prisma.employee.delete({
      where: { id },
      include: {
        user: true,
        department: true,
      },
    });

    return this.mapEmployeeToDto(employee);
  }

  /**
   * Map Prisma employee object to DTO format
   * @param employee - Prisma employee object
   * @returns Employee DTO object
   */
  private mapEmployeeToDto(employee: any): Employee {
    return {
      id: employee.id,
      userId: employee.userId,
      user: {
        id: employee.user.id,
        email: employee.user.email,
        firstName: employee.user.firstName,
        lastName: employee.user.lastName,
        role: employee.user.role,
        createdAt: employee.user.createdAt,
        updatedAt: employee.user.updatedAt,
      },
      departmentId: employee.departmentId,
      department: {
        id: employee.department.id,
        name: employee.department.name,
        createdAt: employee.department.createdAt,
        updatedAt: employee.department.updatedAt,
      },
      position: employee.position,
      dateOfJoining: employee.dateOfJoining,
      salary: employee.salary,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    };
  }
}