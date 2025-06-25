import { LeaveType, LeaveStatus } from 'shared';
export declare class CreateLeaveDto {
    employeeId: string;
    type: LeaveType;
    startDate: Date;
    endDate: Date;
    reason: string;
}
export declare class UpdateLeaveDto {
    type?: LeaveType;
    startDate?: Date;
    endDate?: Date;
    reason?: string;
}
export declare class UpdateLeaveStatusDto {
    status: LeaveStatus;
    comments?: string;
}
export declare class LeaveResponseDto {
    id: string;
    employeeId: string;
    type: LeaveType;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: LeaveStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class LeaveFilterDto {
    employeeId?: string;
    startDate?: Date;
    endDate?: Date;
    type?: LeaveType;
    status?: LeaveStatus;
}
