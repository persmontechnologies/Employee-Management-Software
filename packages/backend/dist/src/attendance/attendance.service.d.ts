import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto, UpdateAttendanceDto, AttendanceFilterDto, ClockInDto, ClockOutDto } from './dto/attendance.dto';
import { Attendance } from 'shared';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance>;
    findAll(filter?: AttendanceFilterDto): Promise<Attendance[]>;
    findOne(id: string): Promise<Attendance>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<Attendance>;
    remove(id: string): Promise<Attendance>;
    clockIn(clockInDto: ClockInDto): Promise<Attendance>;
    clockOut(employeeId: string, clockOutDto: ClockOutDto): Promise<Attendance>;
    getStatistics(startDate?: Date, endDate?: Date): Promise<any>;
    private mapAttendanceToDto;
}
