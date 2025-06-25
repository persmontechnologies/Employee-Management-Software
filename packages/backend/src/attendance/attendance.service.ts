import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { 
  CreateAttendanceDto, 
  UpdateAttendanceDto, 
  AttendanceFilterDto,
  ClockInDto,
  ClockOutDto 
} from './dto/attendance.dto';
import { Attendance, AttendanceStatus } from 'shared';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new attendance record
   * @param createAttendanceDto - Attendance creation data
   * @returns Newly created attendance record
   */
  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    // Check if employee exists
    const employeeExists = await this.prisma.employee.findUnique({
      where: { id: createAttendanceDto.employeeId },
    });

    if (!employeeExists) {
      throw new NotFoundException(`Employee with ID ${createAttendanceDto.employeeId} not found`);
    }

    // Check if there's already an attendance record for this employee on this date
    const existingRecord = await this.prisma.attendance.findFirst({
      where: {
        employeeId: createAttendanceDto.employeeId,
        date: {
          gte: new Date(new Date(createAttendanceDto.date).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(createAttendanceDto.date).setHours(24, 0, 0, 0)),
        },
      },
    });

    if (existingRecord) {
      throw new ConflictException(`Attendance record already exists for employee on ${new Date(createAttendanceDto.date).toISOString().split('T')[0]}`);
    }

    // Create attendance record
    const attendance = await this.prisma.attendance.create({
      data: {
        employeeId: createAttendanceDto.employeeId,
        date: createAttendanceDto.date,
        clockIn: createAttendanceDto.clockIn,
        clockOut: createAttendanceDto.clockOut,
        status: createAttendanceDto.status,
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

    return this.mapAttendanceToDto(attendance);
  }

  /**
   * Find all attendance records with optional filtering
   * @param filter - Optional filter criteria
   * @returns List of attendance records
   */
  async findAll(filter?: AttendanceFilterDto): Promise<Attendance[]> {
    const where: any = {};

    // Apply filters if provided
    if (filter?.employeeId) {
      where.employeeId = filter.employeeId;
    }

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.startDate || filter?.endDate) {
      where.date = {};
      
      if (filter?.startDate) {
        where.date.gte = new Date(filter.startDate);
      }
      
      if (filter?.endDate) {
        where.date.lte = new Date(filter.endDate);
      }
    }

    const attendances = await this.prisma.attendance.findMany({
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
        { date: 'desc' },
        { clockIn: 'desc' }
      ],
    });

    return attendances.map(attendance => this.mapAttendanceToDto(attendance));
  }

  /**
   * Find an attendance record by ID
   * @param id - Attendance ID
   * @returns Attendance record
   * @throws NotFoundException if attendance record not found
   */
  async findOne(id: string): Promise<Attendance> {
    const attendance = await this.prisma.attendance.findUnique({
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

    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }

    return this.mapAttendanceToDto(attendance);
  }

  /**
   * Update an attendance record
   * @param id - Attendance ID
   * @param updateAttendanceDto - Attendance update data
   * @returns Updated attendance record
   * @throws NotFoundException if attendance record not found
   */
  async update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance> {
    // Check if attendance record exists
    const attendanceExists = await this.prisma.attendance.findUnique({
      where: { id },
    });

    if (!attendanceExists) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }

    // If updating clock-out time, ensure it's after clock-in time
    if (updateAttendanceDto.clockOut) {
      const clockOutTime = new Date(updateAttendanceDto.clockOut).getTime();
      const clockInTime = new Date(attendanceExists.clockIn).getTime();
      
      if (clockOutTime <= clockInTime) {
        throw new BadRequestException('Clock-out time must be after clock-in time');
      }
    }

    // Update attendance record
    const attendance = await this.prisma.attendance.update({
      where: { id },
      data: updateAttendanceDto,
      include: {
        employee: {
          include: {
            user: true,
            department: true,
          },
        },
      },
    });

    return this.mapAttendanceToDto(attendance);
  }

  /**
   * Remove an attendance record
   * @param id - Attendance ID
   * @returns Removed attendance record
   * @throws NotFoundException if attendance record not found
   */
  async remove(id: string): Promise<Attendance> {
    // Check if attendance record exists
    const attendanceExists = await this.prisma.attendance.findUnique({
      where: { id },
    });

    if (!attendanceExists) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }

    // Delete attendance record
    const attendance = await this.prisma.attendance.delete({
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

    return this.mapAttendanceToDto(attendance);
  }

  /**
   * Clock in an employee
   * @param clockInDto - Clock-in data
   * @returns New attendance record
   */
  async clockIn(clockInDto: ClockInDto): Promise<Attendance> {
    // Check if employee exists
    const employee = await this.prisma.employee.findUnique({
      where: { id: clockInDto.employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${clockInDto.employeeId} not found`);
    }

    // Get current date (without time)
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Check if there's already an attendance record for today
    const existingRecord = await this.prisma.attendance.findFirst({
      where: {
        employeeId: clockInDto.employeeId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (existingRecord) {
      throw new ConflictException(`Employee has already clocked in today at ${existingRecord.clockIn.toLocaleTimeString()}`);
    }

    // Create new attendance record with current time as clock-in
    const now = new Date();
    
    // Determine status based on company start time (e.g., 9:00 AM)
    // This is a simple example - you might want to make this configurable
    const companyStartHour = 9;
    const status = now.getHours() >= companyStartHour ? AttendanceStatus.LATE : AttendanceStatus.PRESENT;

    const attendance = await this.prisma.attendance.create({
      data: {
        employeeId: clockInDto.employeeId,
        date: today,
        clockIn: now,
        status,
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

    return this.mapAttendanceToDto(attendance);
  }

  /**
   * Clock out an employee
   * @param employeeId - Employee ID
   * @param clockOutDto - Clock-out data
   * @returns Updated attendance record
   */
  async clockOut(employeeId: string, clockOutDto: ClockOutDto): Promise<Attendance> {
    // Get current date (without time)
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Find today's attendance record
    const existingRecord = await this.prisma.attendance.findFirst({
      where: {
        employeeId,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (!existingRecord) {
      throw new NotFoundException(`No clock-in record found for today`);
    }

    if (existingRecord.clockOut) {
      throw new ConflictException(`Employee has already clocked out today at ${existingRecord.clockOut.toLocaleTimeString()}`);
    }

    // Update record with clock-out time
    const now = new Date();
    
    const attendance = await this.prisma.attendance.update({
      where: { id: existingRecord.id },
      data: {
        clockOut: now,
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

    return this.mapAttendanceToDto(attendance);
  }

  /**
   * Get attendance statistics
   * @param startDate - Optional start date for statistics
   * @param endDate - Optional end date for statistics
   * @returns Attendance statistics
   */
  async getStatistics(startDate?: Date, endDate?: Date): Promise<any> {
    // Define the date range
    const where: any = {};
    
    if (startDate || endDate) {
      where.date = {};
      
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    // Get all attendance records within the date range
    const attendances = await this.prisma.attendance.findMany({
      where,
      include: {
        employee: {
          include: {
            department: true,
          },
        },
      },
    });

    // Get total employees
    const totalEmployees = await this.prisma.employee.count();

    // Calculate statistics
    const totalRecords = attendances.length;
    
    // Count by status
    const statusCounts = {
      [AttendanceStatus.PRESENT]: 0,
      [AttendanceStatus.ABSENT]: 0,
      [AttendanceStatus.LATE]: 0,
      [AttendanceStatus.LEAVE]: 0,
    };

    attendances.forEach(record => {
      statusCounts[record.status]++;
    });

    // Calculate present rate
    const presentRate = totalRecords > 0 
      ? ((statusCounts[AttendanceStatus.PRESENT] / totalRecords) * 100).toFixed(2)
      : 0;

    // Calculate late rate
    const lateRate = totalRecords > 0 
      ? ((statusCounts[AttendanceStatus.LATE] / totalRecords) * 100).toFixed(2)
      : 0;

    // Group by department
    const departmentStats = {};
    
    attendances.forEach(record => {
      const deptName = record.employee.department.name;
      
      if (!departmentStats[deptName]) {
        departmentStats[deptName] = {
          total: 0,
          present: 0,
          late: 0,
          absent: 0,
          leave: 0,
        };
      }
      
      departmentStats[deptName].total++;
      departmentStats[deptName][record.status.toLowerCase()]++;
    });

    return {
      totalRecords,
      statusCounts,
      presentRate,
      lateRate,
      departmentStats,
      timeRange: {
        startDate: startDate || 'All time',
        endDate: endDate || 'All time',
      },
    };
  }

  /**
   * Map Prisma attendance object to DTO format
   * @param attendance - Prisma attendance object
   * @returns Attendance DTO object
   */
  private mapAttendanceToDto(attendance: any): Attendance {
    return {
      id: attendance.id,
      employeeId: attendance.employeeId,
      employee: attendance.employee ? {
        id: attendance.employee.id,
        userId: attendance.employee.userId,
        user: attendance.employee.user ? {
          id: attendance.employee.user.id,
          email: attendance.employee.user.email,
          firstName: attendance.employee.user.firstName,
          lastName: attendance.employee.user.lastName,
          role: attendance.employee.user.role,
          createdAt: attendance.employee.user.createdAt,
          updatedAt: attendance.employee.user.updatedAt,
        } : undefined,
        departmentId: attendance.employee.departmentId,
        department: attendance.employee.department ? {
          id: attendance.employee.department.id,
          name: attendance.employee.department.name,
          createdAt: attendance.employee.department.createdAt,
          updatedAt: attendance.employee.department.updatedAt,
        } : undefined,
        position: attendance.employee.position,
        dateOfJoining: attendance.employee.dateOfJoining,
        salary: attendance.employee.salary,
        createdAt: attendance.employee.createdAt,
        updatedAt: attendance.employee.updatedAt,
      } : undefined,
      date: attendance.date,
      clockIn: attendance.clockIn,
      clockOut: attendance.clockOut,
      status: attendance.status,
      createdAt: attendance.createdAt,
      updatedAt: attendance.updatedAt,
    };
  }
}