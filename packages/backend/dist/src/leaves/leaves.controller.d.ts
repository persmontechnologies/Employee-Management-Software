import { User } from 'shared';
import { LeavesService } from './leaves.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveDto, UpdateLeaveDto, UpdateLeaveStatusDto, LeaveFilterDto } from './dto/leave.dto';
export declare class LeavesController {
    private readonly leavesService;
    private readonly prisma;
    constructor(leavesService: LeavesService, prisma: PrismaService);
    create(createLeaveDto: CreateLeaveDto, user: User): Promise<Leave>;
    findAll(filter: LeaveFilterDto): Promise<Leave[]>;
    getStatistics(startDate?: Date, endDate?: Date): Promise<any>;
    findByEmployee(employeeId: string, user: User, startDate?: Date, endDate?: Date, type?: string, status?: string): Promise<Leave[]>;
    getLeaveBalance(employeeId: string, user: User, year?: number): Promise<any>;
    findOne(id: string, user: User): Promise<Leave>;
    update(id: string, updateLeaveDto: UpdateLeaveDto, user: User): Promise<Leave>;
    updateStatus(id: string, updateLeaveStatusDto: UpdateLeaveStatusDto): Promise<Leave>;
    remove(id: string, user: User): Promise<Leave>;
    getMyRequests(user: User, startDate?: Date, endDate?: Date, type?: string, status?: string): Promise<Leave[]>;
    getMyBalance(user: User, year?: number): Promise<any>;
}
