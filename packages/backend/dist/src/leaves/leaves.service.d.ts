import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveDto, UpdateLeaveDto, UpdateLeaveStatusDto, LeaveFilterDto } from './dto/leave.dto';
import { Leave } from 'shared';
export declare class LeavesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLeaveDto: CreateLeaveDto): Promise<Leave>;
    findAll(filter?: LeaveFilterDto): Promise<Leave[]>;
    findOne(id: string): Promise<Leave>;
    update(id: string, updateLeaveDto: UpdateLeaveDto): Promise<Leave>;
    updateStatus(id: string, updateLeaveStatusDto: UpdateLeaveStatusDto): Promise<Leave>;
    remove(id: string): Promise<Leave>;
    getStatistics(startDate?: Date, endDate?: Date): Promise<any>;
    getLeaveBalance(employeeId: string, year?: number): Promise<any>;
    private mapLeaveToDto;
}
