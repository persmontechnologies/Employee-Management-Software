import { AttendanceStatus } from 'shared';
export declare class CreateAttendanceDto {
    employeeId: string;
    date: Date;
    clockIn: Date;
    clockOut?: Date;
    status: AttendanceStatus;
}
export declare class UpdateAttendanceDto {
    clockOut?: Date;
    status?: AttendanceStatus;
}
export declare class AttendanceResponseDto {
    id: string;
    employeeId: string;
    date: Date;
    clockIn: Date;
    clockOut?: Date;
    status: AttendanceStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class AttendanceFilterDto {
    employeeId?: string;
    startDate?: Date;
    endDate?: Date;
    status?: AttendanceStatus;
}
export declare class ClockInDto {
    employeeId: string;
    notes?: string;
}
export declare class ClockOutDto {
    notes?: string;
}
