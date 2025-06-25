import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateLeaveDto, 
  UpdateLeaveDto, 
  UpdateLeaveStatusDto, 
  LeaveFilterDto 
} from './dto/leave.dto';
import { Leave, LeaveStatus, LeaveType, AttendanceStatus } from 'shared';

@Injectable()
export class LeavesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new leave request
   * @param createLeaveDto - Leave request creation data
   * @returns Newly created leave request
   */
  async create(createLeaveDto: CreateLeaveDto): Promise<Leave> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id: createLeaveDto.employeeId },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${createLeaveDto.employeeId} not found`);
    }

    // Validate date range
    if (new Date(createLeaveDto.startDate) > new Date(createLeaveDto.endDate)) {
      throw new BadRequestException('Start date cannot be after end date');
    }

    // Check for overlapping leave requests
    const overlappingLeave = await this.prisma.leave.findFirst({
      where: {
        employeeId: createLeaveDto.employeeId,
        status: { in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
        OR: [
          {
            // New leave starts during existing leave
            startDate: {
              lte: new Date(createLeaveDto.endDate),
            },
            endDate: {
              gte: new Date(createLeaveDto.startDate),
            },
          },
        ],
      },
    });

    if (overlappingLeave) {
      throw new ConflictException(
        `Employee already has an overlapping ${overlappingLeave.status.toLowerCase()} leave request from ${new Date(overlappingLeave.startDate).toLocaleDateString()} to ${new Date(overlappingLeave.endDate).toLocaleDateString()}`
      );
    }

    // Create leave request
    const leave = await this.prisma.leave.create({
      data: {
        employeeId: createLeaveDto.employeeId,
        type: createLeaveDto.type,
        startDate: new Date(createLeaveDto.startDate),
        endDate: new Date(createLeaveDto.endDate),
        reason: createLeaveDto.reason,
        status: LeaveStatus.PENDING,
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

    return this.mapLeaveToDto(leave);
  }

  /**
   * Find all leave requests with optional filtering
   * @param filter - Optional filter criteria
   * @returns List of leave requests
   */
  async findAll(filter?: LeaveFilterDto): Promise<Leave[]> {
    const where: any = {};

    // Apply filters if provided
    if (filter?.employeeId) {
      where.employeeId = filter.employeeId;
    }

    if (filter?.type) {
      where.type = filter.type;
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.startDate || filter?.endDate) {
      // For date range filtering, we want to find leaves that overlap with the given range
      if (filter?.startDate) {
        where.endDate = { gte: new Date(filter.startDate) };
      }
      
      if (filter?.endDate) {
        where.startDate = { lte: new Date(filter.endDate) };
      }
    }

    const leaves = await this.prisma.leave.findMany({
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
        { status: 'asc' },
        { startDate: 'desc' }
      ],
    });

    return leaves.map(leave => this.mapLeaveToDto(leave));
  }

  /**
   * Find a leave request by ID
   * @param id - Leave request ID
   * @returns Leave request
   * @throws NotFoundException if leave request not found
   */
  async findOne(id: string): Promise<Leave> {
    const leave = await this.prisma.leave.findUnique({
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

    if (!leave) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }

    return this.mapLeaveToDto(leave);
  }

  /**
   * Update a leave request
   * @param id - Leave request ID
   * @param updateLeaveDto - Leave request update data
   * @returns Updated leave request
   * @throws NotFoundException if leave request not found
   */
  async update(id: string, updateLeaveDto: UpdateLeaveDto): Promise<Leave> {
    // Check if leave request exists
    const leaveExists = await this.prisma.leave.findUnique({
      where: { id },
    });

    if (!leaveExists) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }

    // Check if leave request is not already approved or rejected
    if (leaveExists.status !== LeaveStatus.PENDING) {
      throw new BadRequestException(`Cannot update a leave request that is already ${leaveExists.status.toLowerCase()}`);
    }

    let startDate = leaveExists.startDate;
    let endDate = leaveExists.endDate;

    // Update dates if provided
    if (updateLeaveDto.startDate) {
      startDate = new Date(updateLeaveDto.startDate);
    }

    if (updateLeaveDto.endDate) {
      endDate = new Date(updateLeaveDto.endDate);
    }

    // Validate date range
    if (startDate > endDate) {
      throw new BadRequestException('Start date cannot be after end date');
    }

    // Check for overlapping leave requests (excluding the current one)
    if (updateLeaveDto.startDate || updateLeaveDto.endDate) {
      const overlappingLeave = await this.prisma.leave.findFirst({
        where: {
          id: { not: id },
          employeeId: leaveExists.employeeId,
          status: { in: [LeaveStatus.PENDING, LeaveStatus.APPROVED] },
          OR: [
            {
              // Leave starts during updated leave
              startDate: {
                lte: endDate,
              },
              endDate: {
                gte: startDate,
              },
            },
          ],
        },
      });

      if (overlappingLeave) {
        throw new ConflictException(
          `Employee already has an overlapping ${overlappingLeave.status.toLowerCase()} leave request from ${new Date(overlappingLeave.startDate).toLocaleDateString()} to ${new Date(overlappingLeave.endDate).toLocaleDateString()}`
        );
      }
    }

    // Update leave request
    const leave = await this.prisma.leave.update({
      where: { id },
      data: updateLeaveDto,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapLeaveToDto(leave);
  }

  /**
   * Update leave request status (approve/reject)
   * @param id - Leave request ID
   * @param updateLeaveStatusDto - Status update data
   * @returns Updated leave request
   * @throws NotFoundException if leave request not found
   */
  async updateStatus(id: string, updateLeaveStatusDto: UpdateLeaveStatusDto): Promise<Leave> {
    // Check if leave request exists
    const leaveExists = await this.prisma.leave.findUnique({
      where: { id },
    });

    if (!leaveExists) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }

    // Check if leave request is not already approved or rejected
    if (leaveExists.status !== LeaveStatus.PENDING) {
      throw new BadRequestException(`Leave request is already ${leaveExists.status.toLowerCase()}`);
    }

    // Using a transaction to update leave and create attendance records for approved leave
    const result = await this.prisma.$transaction(async (tx) => {
      // Update leave status
      const updatedLeave = await tx.leave.update({
        where: { id },
        data: {
          status: updateLeaveStatusDto.status,
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

      // If leave is approved, create attendance records for the leave period
      if (updateLeaveStatusDto.status === LeaveStatus.APPROVED) {
        // Create a range of dates from startDate to endDate (inclusive)
        const startDate = new Date(updatedLeave.startDate);
        const endDate = new Date(updatedLeave.endDate);
        
        // Set time to 00:00:00 for proper date comparison
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        
        // Create array of days between start and end dates
        const dates = [];
        let currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
          // Skip weekends (0 = Sunday, 6 = Saturday)
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            dates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Create attendance records for each work day
        for (const date of dates) {
          // Check if an attendance record already exists for this date
          const existingAttendance = await tx.attendance.findFirst({
            where: {
              employeeId: updatedLeave.employeeId,
              date: {
                gte: new Date(date.setHours(0, 0, 0, 0)),
                lt: new Date(date.setHours(24, 0, 0, 0)),
              },
            },
          });
          
          // If no attendance record exists, create one with LEAVE status
          if (!existingAttendance) {
            await tx.attendance.create({
              data: {
                employeeId: updatedLeave.employeeId,
                date: new Date(date),
                clockIn: new Date(date.setHours(9, 0, 0, 0)), // Use company start time
                status: AttendanceStatus.LEAVE,
              },
            });
          } else {
            // Update existing attendance to LEAVE status
            await tx.attendance.update({
              where: { id: existingAttendance.id },
              data: {
                status: AttendanceStatus.LEAVE,
              },
            });
          }
        }
      }

      return updatedLeave;
    });

    return this.mapLeaveToDto(result);
  }

  /**
   * Delete a leave request
   * @param id - Leave request ID
   * @returns Deleted leave request
   * @throws NotFoundException if leave request not found
   */
  async remove(id: string): Promise<Leave> {
    // Check if leave request exists
    const leaveExists = await this.prisma.leave.findUnique({
      where: { id },
    });

    if (!leaveExists) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }

    // Check if leave request is not already approved
    if (leaveExists.status === LeaveStatus.APPROVED) {
      throw new BadRequestException('Cannot delete an approved leave request');
    }

    // Delete leave request
    const leave = await this.prisma.leave.delete({
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

    return this.mapLeaveToDto(leave);
  }

  /**
   * Calculate leave statistics
   * @param startDate - Optional start date for statistics
   * @param endDate - Optional end date for statistics
   * @returns Leave statistics
   */
  async getStatistics(startDate?: Date, endDate?: Date): Promise<any> {
    // Define the date range
    const where: any = {};
    
    if (startDate || endDate) {
      if (startDate) {
        where.startDate = { gte: new Date(startDate) };
      }
      
      if (endDate) {
        where.endDate = { lte: new Date(endDate) };
      }
    }

    // Get leave requests
    const leaves = await this.prisma.leave.findMany({
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
    const totalLeaves = leaves.length;
    
    // Count by type
    const typeCount: Record<string, number> = {};
    Object.values(LeaveType).forEach((type: string) => {
      typeCount[type] = 0;
    });

    // Count by status
    const statusCount: Record<string, number> = {};
    Object.values(LeaveStatus).forEach((status: string) => {
      statusCount[status] = 0;
    });

    // Count total leave days
    let totalDays = 0;

    leaves.forEach(leave => {
      typeCount[leave.type]++;
      statusCount[leave.status]++;
      
      // Calculate days (excluding weekends)
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      let days = 0;
      
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        // Skip weekends (0 = Sunday, 6 = Saturday)
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          days++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      totalDays += days;
    });

    // Group by department
    const departmentStats: Record<string, any> = {};
    
    leaves.forEach(leave => {
      const deptName = leave.employee.department.name;
      
      if (!departmentStats[deptName]) {
        departmentStats[deptName] = {
          total: 0,
          approved: 0,
          pending: 0,
          rejected: 0,
          days: 0,
        };
      }
      
      departmentStats[deptName].total++;
      departmentStats[deptName][leave.status.toLowerCase()]++;
      
      // Calculate days for department (excluding weekends)
      if (leave.status === LeaveStatus.APPROVED) {
        const startDate = new Date(leave.startDate);
        const endDate = new Date(leave.endDate);
        let days = 0;
        
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          // Skip weekends (0 = Sunday, 6 = Saturday)
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            days++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        departmentStats[deptName].days += days;
      }
    });

    return {
      totalLeaves,
      totalDays,
      byType: typeCount,
      byStatus: statusCount,
      byDepartment: departmentStats,
      timeRange: {
        startDate: startDate || 'All time',
        endDate: endDate || 'All time',
      },
    };
  }

  /**
   * Calculate leave balance for an employee
   * @param employeeId - Employee ID
   * @param year - Year for calculation (defaults to current year)
   * @returns Leave balance
   */
  async getLeaveBalance(employeeId: string, year?: number): Promise<any> {
    // Check if employee exists
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        user: true,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);
    }

    // Default to current year if not specified
    const targetYear = year || new Date().getFullYear();
    
    // Define start and end dates for the year
    const startOfYear = new Date(targetYear, 0, 1); // January 1st
    const endOfYear = new Date(targetYear, 11, 31); // December 31st

    // Get approved leaves for the employee in the specified year
    const leaves = await this.prisma.leave.findMany({
      where: {
        employeeId,
        status: LeaveStatus.APPROVED,
        startDate: { gte: startOfYear },
        endDate: { lte: endOfYear },
      },
    });

    // Calculate used leave days by type
    const usedDays: Record<string, number> = {};
    Object.values(LeaveType).forEach((type: string) => {
      usedDays[type] = 0;
    });

    leaves.forEach(leave => {
      // Calculate business days for each leave
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      let days = 0;
      
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        // Skip weekends (0 = Sunday, 6 = Saturday)
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          days++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      usedDays[leave.type] += days;
    });

    // Define standard leave allocation
    // Note: This should come from configuration or be based on employee's tenure
    const allocation: Record<string, number> = {
      'ANNUAL': 20,
      'SICK': 10,
      'MATERNITY': 90,
      'PATERNITY': 10,
      'UNPAID': 30,
    };

    // Calculate remaining days
    const remainingDays: Record<string, number> = {};
    Object.entries(allocation).forEach(([type, alloc]) => {
      remainingDays[type] = alloc - (usedDays[type] || 0);
    });

    return {
      employee: {
        id: employee.id,
        name: `${employee.user.firstName} ${employee.user.lastName}`,
        position: employee.position,
      },
      year: targetYear,
      allocation,
      usedDays,
      remainingDays,
    };
  }

  /**
   * Map Prisma leave object to DTO format
   * @param leave - Prisma leave object
   * @returns Leave DTO object
   */
  private mapLeaveToDto(leave: any): Leave {
    return {
      id: leave.id,
      employeeId: leave.employeeId,
      employee: leave.employee ? {
        id: leave.employee.id,
        userId: leave.employee.userId,
        user: leave.employee.user ? {
          id: leave.employee.user.id,
          email: leave.employee.user.email,
          firstName: leave.employee.user.firstName,
          lastName: leave.employee.user.lastName,
          role: leave.employee.user.role,
          createdAt: leave.employee.user.createdAt,
          updatedAt: leave.employee.user.updatedAt,
        } : undefined,
        departmentId: leave.employee.departmentId,
        department: leave.employee.department ? {
          id: leave.employee.department.id,
          name: leave.employee.department.name,
          createdAt: leave.employee.department.createdAt,
          updatedAt: leave.employee.department.updatedAt,
        } : undefined,
        position: leave.employee.position,
        dateOfJoining: leave.employee.dateOfJoining,
        salary: leave.employee.salary,
        createdAt: leave.employee.createdAt,
        updatedAt: leave.employee.updatedAt,
      } : undefined,
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
      status: leave.status,
      createdAt: leave.createdAt,
      updatedAt: leave.updatedAt,
    };
  }
}