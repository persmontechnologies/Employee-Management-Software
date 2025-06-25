import { PrismaService } from '../prisma/prisma.service';
import { CreatePayrollDto, UpdatePayrollDto, UpdatePayrollStatusDto, PayrollFilterDto, GeneratePayrollDto } from './dto/payroll.dto';
import { Payroll } from 'shared';
export declare class PayrollsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPayrollDto: CreatePayrollDto): Promise<Payroll>;
    findAll(filter?: PayrollFilterDto): Promise<Payroll[]>;
    findOne(id: string): Promise<Payroll>;
    update(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll>;
    updateStatus(id: string, updatePayrollStatusDto: UpdatePayrollStatusDto): Promise<Payroll>;
    remove(id: string): Promise<Payroll>;
    generatePayrolls(generatePayrollDto: GeneratePayrollDto): Promise<Payroll[]>;
    getStatistics(month?: number, year?: number): Promise<any>;
    private mapPayrollToDto;
    private countWorkingDays;
}
