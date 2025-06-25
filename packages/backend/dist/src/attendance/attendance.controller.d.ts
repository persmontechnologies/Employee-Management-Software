import { User } from 'shared';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto, UpdateAttendanceDto, AttendanceFilterDto, ClockInDto, ClockOutDto } from './dto/attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    private readonly prisma;
    constructor(attendanceService: AttendanceService, prisma: PrismaService);
    create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    findAll(filter: AttendanceFilterDto): Promise<Attendance[]>;
    getStatistics(startDate?: Date, endDate?: Date): Promise<any>;
    findByEmployee(employeeId: string, startDate?: Date, endDate?: Date, status?: string): Promise<Attendance[]>;
    findOne(id: string): Promise<Attendance>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance>;
    remove(id: string): Promise<Attendance>;
    clockIn(clockInDto: ClockInDto): Promise<Attendance>;
    clockOut(employeeId: string, clockOutDto: ClockOutDto): Promise<Attendance>;
    clockInSelf(user: User, clockOutDto: ClockOutDto): Promise<Attendance>;
    clockOutSelf(user: User, clockOutDto: ClockOutDto): Promise<Attendance>;
    getMyHistory(user: User, startDate?: Date, endDate?: Date, status?: string): Promise<Attendance[]>;
}
