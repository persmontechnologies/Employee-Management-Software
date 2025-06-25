import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreatePayrollDto, 
  UpdatePayrollDto, 
  UpdatePayrollStatusDto, 
  PayrollFilterDto,
  GeneratePayrollDto
} from './dto/payroll.dto';
import { Payroll, PayrollStatus, AttendanceStatus } from 'shared';

@Injectable()
export class PayrollsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new payroll record
   * @param createPayrollDto - Payroll creation data
   * @returns Newly created payroll record
   */
  async create(createPayrollDto: CreatePayrollDto): Promise<Payroll> {
    // Check if employee exists
    const employee = await this.prisma.employee.findUnique({
      where: { id: createPayrollDto.employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${createPayrollDto.employeeId} not found`);
    }

    // Check if a payroll record already exists for this employee, month, and year
    const existingPayroll = await this.prisma.payroll.findFirst({
      where: {
        employeeId: createPayrollDto.employeeId,
        month: createPayrollDto.month,
        year: createPayrollDto.year,
      },
    });

    if (existingPayroll) {
      throw new ConflictException(
        `Payroll record already exists for employee ID ${createPayrollDto.employeeId} for ${createPayrollDto.month}/${createPayrollDto.year}`
      );
    }

    // Create payroll
    const payroll = await this.prisma.payroll.create({
      data: {
        employeeId: createPayrollDto.employeeId,
        month: createPayrollDto.month,
        year: createPayrollDto.year,
        baseSalary: createPayrollDto.baseSalary,
        allowances: createPayrollDto.allowances,
        deductions: createPayrollDto.deductions,
        tax: createPayrollDto.tax,
        netSalary: createPayrollDto.netSalary,
        status: createPayrollDto.status || PayrollStatus.DRAFT,
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

    return this.mapPayrollToDto(payroll);
  }

  /**
   * Find all payroll records with optional filtering
   * @param filter - Optional filter criteria
   * @returns List of payroll records
   */
  async findAll(filter?: PayrollFilterDto): Promise<Payroll[]> {
    const where: any = {};

    // Apply filters if provided
    if (filter?.employeeId) {
      where.employeeId = filter.employeeId;
    }

    if (filter?.month) {
      where.month = filter.month;
    }

    if (filter?.year) {
      where.year = filter.year;
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    const payrolls = await this.prisma.payroll.findMany({
      where,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
      orderBy: [
        { year: 'desc' },
        { month: 'desc' },
      ],
    });

    return payrolls.map(payroll => this.mapPayrollToDto(payroll));
  }

  /**
   * Find a payroll record by ID
   * @param id - Payroll ID
   * @returns Payroll record
   * @throws NotFoundException if payroll not found
   */
  async findOne(id: string): Promise<Payroll> {
    const payroll = await this.prisma.payroll.findUnique({
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

    if (!payroll) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }

    return this.mapPayrollToDto(payroll);
  }

  /**
   * Update a payroll record
   * @param id - Payroll ID
   * @param updatePayrollDto - Payroll update data
   * @returns Updated payroll record
   * @throws NotFoundException if payroll not found
   */
  async update(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll> {
    // Check if payroll exists
    const payrollExists = await this.prisma.payroll.findUnique({
      where: { id },
    });

    if (!payrollExists) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }

    // Check if payroll is already paid
    if (payrollExists.status === PayrollStatus.PAID) {
      throw new BadRequestException(`Cannot update a payroll record that is already paid`);
    }

    // Calculate netSalary if components are updated but netSalary is not provided
    let netSalary = updatePayrollDto.netSalary;
    if (!netSalary && (updatePayrollDto.baseSalary || updatePayrollDto.allowances || updatePayrollDto.deductions || updatePayrollDto.tax)) {
      const baseSalary = updatePayrollDto.baseSalary || payrollExists.baseSalary;
      const allowances = updatePayrollDto.allowances || payrollExists.allowances;
      const deductions = updatePayrollDto.deductions || payrollExists.deductions;
      const tax = updatePayrollDto.tax || payrollExists.tax;
      
      netSalary = baseSalary + allowances - deductions - tax;
    }

    // Update payroll
    const payroll = await this.prisma.payroll.update({
      where: { id },
      data: {
        ...updatePayrollDto,
        netSalary,
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

    return this.mapPayrollToDto(payroll);
  }

  /**
   * Update payroll status
   * @param id - Payroll ID
   * @param updatePayrollStatusDto - Status update data
   * @returns Updated payroll record
   * @throws NotFoundException if payroll not found
   */
  async updateStatus(id: string, updatePayrollStatusDto: UpdatePayrollStatusDto): Promise<Payroll> {
    // Check if payroll exists
    const payrollExists = await this.prisma.payroll.findUnique({
      where: { id },
    });

    if (!payrollExists) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }

    // Validate status transition
    if (payrollExists.status === PayrollStatus.PAID && updatePayrollStatusDto.status !== PayrollStatus.PAID) {
      throw new BadRequestException(`Cannot change status of a paid payroll record`);
    }

    // Update payroll status
    const payroll = await this.prisma.payroll.update({
      where: { id },
      data: {
        status: updatePayrollStatusDto.status,
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

    return this.mapPayrollToDto(payroll);
  }

  /**
   * Delete a payroll record
   * @param id - Payroll ID
   * @returns Deleted payroll record
   * @throws NotFoundException if payroll not found
   */
  async remove(id: string): Promise<Payroll> {
    // Check if payroll exists
    const payrollExists = await this.prisma.payroll.findUnique({
      where: { id },
    });

    if (!payrollExists) {
      throw new NotFoundException(`Payroll record with ID ${id} not found`);
    }

    // Check if payroll is already paid or processed
    if (payrollExists.status !== PayrollStatus.DRAFT) {
      throw new BadRequestException(`Cannot delete a payroll record that is already ${payrollExists.status.toLowerCase()}`);
    }

    // Delete payroll
    const payroll = await this.prisma.payroll.delete({
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

    return this.mapPayrollToDto(payroll);
  }

  /**
   * Generate payroll records for a specific month and year
   * @param generatePayrollDto - Generation criteria
   * @returns Generated payroll records
   */
  async generatePayrolls(generatePayrollDto: GeneratePayrollDto): Promise<Payroll[]> {
    const { month, year, departmentId, employeeId } = generatePayrollDto;

    // Find all employees to generate payroll for
    const whereEmployee: any = {};
    if (departmentId) {
      whereEmployee.departmentId = departmentId;
    }
    if (employeeId) {
      whereEmployee.id = employeeId;
    }

    const employees = await this.prisma.employee.findMany({
      where: whereEmployee,
      include: {
        user: true,
        department: true,
      },
    });

    if (employees.length === 0) {
      throw new NotFoundException('No employees found matching the criteria');
    }

    // Get the start and end dates for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month

    // Create payroll records for each employee
    const results = [];

    for (const employee of employees) {
      // Check if payroll already exists for this employee and month
      const existingPayroll = await this.prisma.payroll.findFirst({
        where: {
          employeeId: employee.id,
          month,
          year,
        },
      });

      if (existingPayroll) {
        // Skip this employee if payroll already exists
        continue;
      }

      // Get attendance records for this employee for the month
      const attendanceRecords = await this.prisma.attendance.findMany({
        where: {
          employeeId: employee.id,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });

      // Calculate work days and leave days
      const workDays = attendanceRecords.filter(record => 
        record.status === AttendanceStatus.PRESENT || 
        record.status === AttendanceStatus.LATE
      ).length;

      const leaveDays = attendanceRecords.filter(record => 
        record.status === AttendanceStatus.LEAVE
      ).length;

      const absentDays = attendanceRecords.filter(record => 
        record.status === AttendanceStatus.ABSENT
      ).length;

      // Calculate total working days in the month (excluding weekends)
      let totalWorkingDays = 0;
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
          totalWorkingDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const joinDate = new Date(employee.dateOfJoining);
      if (joinDate > endDate) {
        // Employee hasn't started yet; skip payroll generation for this month
        continue;
      }

      // Calculate base salary, prorating if the employee joined mid-month
      const dailyRate = employee.salary / totalWorkingDays;
      let payableDays = totalWorkingDays;
      if (joinDate > startDate) {
        payableDays = this.countWorkingDays(joinDate, endDate);
      }
      let baseSalary = Math.round(dailyRate * payableDays);

      // Calculate allowances (e.g., 10% of base salary)
      const allowances = Math.round(baseSalary * 0.1);

      // Calculate deductions based on absent days
      const deductions = Math.round(absentDays * dailyRate);

      // Calculate tax (e.g., 15% of taxable income)
      const taxableIncome = baseSalary + allowances;
      const tax = Math.round(taxableIncome * 0.15);

      // Calculate net salary
      const netSalary = baseSalary + allowances - deductions - tax;

      // Create payroll record
      const payroll = await this.prisma.payroll.create({
        data: {
          employeeId: employee.id,
          month,
          year,
          baseSalary,
          allowances,
          deductions,
          tax,
          netSalary,
          status: PayrollStatus.DRAFT,
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

      results.push(this.mapPayrollToDto(payroll));
    }

    return results;
  }

  /**
   * Generate payroll statistics
   * @param month - Optional month filter
   * @param year - Optional year filter
   * @returns Payroll statistics
   */
  async getStatistics(month?: number, year?: number): Promise<any> {
    // Define the filter
    const where: any = {};
    
    if (month) {
      where.month = month;
    }
    
    if (year) {
      where.year = year;
    }

    // Get all payroll records matching the filter
    const payrolls = await this.prisma.payroll.findMany({
      where,
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });

    // Calculate statistics
    const totalPayrolls = payrolls.length;
    
    // Count by status
    const statusCount: Record<string, number> = {};
    Object.values(PayrollStatus).forEach((status: string) => {
      statusCount[status] = 0;
    });

    // Calculate total amounts
    let totalBaseSalary = 0;
    let totalAllowances = 0;
    let totalDeductions = 0;
    let totalTax = 0;
    let totalNetSalary = 0;

    payrolls.forEach(payroll => {
      statusCount[payroll.status as string]++;
      
      totalBaseSalary += payroll.baseSalary;
      totalAllowances += payroll.allowances;
      totalDeductions += payroll.deductions;
      totalTax += payroll.tax;
      totalNetSalary += payroll.netSalary;
    });

    // Group by department
    const departmentStats: Record<string, any> = {};
    
    payrolls.forEach(payroll => {
      const deptName = payroll.employee.department.name;
      
      if (!departmentStats[deptName]) {
        departmentStats[deptName] = {
          count: 0,
          totalBaseSalary: 0,
          totalAllowances: 0,
          totalDeductions: 0,
          totalTax: 0,
          totalNetSalary: 0,
        };
      }
      
      departmentStats[deptName].count++;
      departmentStats[deptName].totalBaseSalary += payroll.baseSalary;
      departmentStats[deptName].totalAllowances += payroll.allowances;
      departmentStats[deptName].totalDeductions += payroll.deductions;
      departmentStats[deptName].totalTax += payroll.tax;
      departmentStats[deptName].totalNetSalary += payroll.netSalary;
    });

    return {
      totalPayrolls,
      byStatus: statusCount,
      totalBaseSalary,
      totalAllowances,
      totalDeductions,
      totalTax,
      totalNetSalary,
      byDepartment: departmentStats,
      period: {
        month: month || 'All months',
        year: year || 'All years',
      },
    };
  }

  /**
   * Map Prisma payroll object to DTO format
   * @param payroll - Prisma payroll object
   * @returns Payroll DTO object
   */
  private mapPayrollToDto(payroll: any): Payroll {
    return {
      id: payroll.id,
      employeeId: payroll.employeeId,
      employee: payroll.employee ? {
        id: payroll.employee.id,
        userId: payroll.employee.userId,
        user: payroll.employee.user ? {
          id: payroll.employee.user.id,
          email: payroll.employee.user.email,
          firstName: payroll.employee.user.firstName,
          lastName: payroll.employee.user.lastName,
          role: payroll.employee.user.role,
          createdAt: payroll.employee.user.createdAt,
          updatedAt: payroll.employee.user.updatedAt,
        } : undefined,
        departmentId: payroll.employee.departmentId,
        department: payroll.employee.department ? {
          id: payroll.employee.department.id,
          name: payroll.employee.department.name,
          createdAt: payroll.employee.department.createdAt,
          updatedAt: payroll.employee.department.updatedAt,
        } : undefined,
        position: payroll.employee.position,
        dateOfJoining: payroll.employee.dateOfJoining,
        salary: payroll.employee.salary,
        createdAt: payroll.employee.createdAt,
        updatedAt: payroll.employee.updatedAt,
      } : undefined,
      month: payroll.month,
      year: payroll.year,
      baseSalary: payroll.baseSalary,
      allowances: payroll.allowances,
      deductions: payroll.deductions,
      tax: payroll.tax,
      netSalary: payroll.netSalary,
      status: payroll.status,
      createdAt: payroll.createdAt,
      updatedAt: payroll.updatedAt,
    };
  }

  /**
   * Count the number of working days (Mon-Fri) between two dates
   * @param from - Start date
   * @param to - End date
   * @returns Number of working days in the range
   */
  private countWorkingDays(from: Date, to: Date): number {
    let count = 0;
    const current = new Date(from);
    while (current <= to) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  }
}