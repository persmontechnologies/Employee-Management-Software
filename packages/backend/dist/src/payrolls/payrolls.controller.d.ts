import { PayrollsService } from './payrolls.service';
import { CreatePayrollDto, UpdatePayrollDto, UpdatePayrollStatusDto, PayrollFilterDto, GeneratePayrollDto } from './dto/payroll.dto';
export declare class PayrollsController {
    private readonly payrollsService;
    constructor(payrollsService: PayrollsService);
    create(createPayrollDto: CreatePayrollDto): Promise<Payroll>;
    generatePayrolls(generatePayrollDto: GeneratePayrollDto): Promise<Payroll[]>;
    findAll(filter: PayrollFilterDto): Promise<Payroll[]>;
    getStatistics(month?: number, year?: number): Promise<any>;
    findByEmployee(employeeId: string, month?: number, year?: number, status?: string): Promise<Payroll[]>;
    findOne(id: string): Promise<Payroll>;
    update(id: string, updatePayrollDto: UpdatePayrollDto): Promise<Payroll>;
    updateStatus(id: string, updatePayrollStatusDto: UpdatePayrollStatusDto): Promise<Payroll>;
    remove(id: string): Promise<Payroll>;
    getMyPayslips(month?: number, year?: number): Promise<Payroll[]>;
}
