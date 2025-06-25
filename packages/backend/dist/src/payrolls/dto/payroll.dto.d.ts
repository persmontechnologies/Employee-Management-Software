import { PayrollStatus } from 'shared';
export declare class CreatePayrollDto {
    employeeId: string;
    month: number;
    year: number;
    baseSalary: number;
    allowances: number;
    deductions: number;
    tax: number;
    netSalary: number;
    status?: PayrollStatus;
}
export declare class UpdatePayrollDto {
    baseSalary?: number;
    allowances?: number;
    deductions?: number;
    tax?: number;
    netSalary?: number;
    status?: PayrollStatus;
}
export declare class UpdatePayrollStatusDto {
    status: PayrollStatus;
    notes?: string;
}
export declare class PayrollResponseDto {
    id: string;
    employeeId: string;
    month: number;
    year: number;
    baseSalary: number;
    allowances: number;
    deductions: number;
    tax: number;
    netSalary: number;
    status: PayrollStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PayrollFilterDto {
    employeeId?: string;
    month?: number;
    year?: number;
    status?: PayrollStatus;
}
export declare class GeneratePayrollDto {
    month: number;
    year: number;
    departmentId?: string;
    employeeId?: string;
}
