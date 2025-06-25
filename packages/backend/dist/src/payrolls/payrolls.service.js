"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_1 = require("shared");
let PayrollsService = class PayrollsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPayrollDto) {
        const employee = await this.prisma.employee.findUnique({
            where: { id: createPayrollDto.employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${createPayrollDto.employeeId} not found`);
        }
        const existingPayroll = await this.prisma.payroll.findFirst({
            where: {
                employeeId: createPayrollDto.employeeId,
                month: createPayrollDto.month,
                year: createPayrollDto.year,
            },
        });
        if (existingPayroll) {
            throw new common_1.ConflictException(`Payroll record already exists for employee ID ${createPayrollDto.employeeId} for ${createPayrollDto.month}/${createPayrollDto.year}`);
        }
        const payroll = await this.prisma.payroll.create({
            data: {
                employeeId: createPayrollDto.employeeId,
                month: createPayrollDto.month,
                year: createPayrollDto.year,
                baseSalary: createPayrollDto.baseSalary,
                allowances: createPayrollDto.allowances,
                deductions: createPayrollDto.deductions,
                tax: createPayrollDto.tax,
                netSalary: createPayrollDto.netSalary,
                status: createPayrollDto.status || shared_1.PayrollStatus.DRAFT,
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
        return this.mapPayrollToDto(payroll);
    }
    async findAll(filter) {
        const where = {};
        if (filter === null || filter === void 0 ? void 0 : filter.employeeId) {
            where.employeeId = filter.employeeId;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.month) {
            where.month = filter.month;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.year) {
            where.year = filter.year;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.status) {
            where.status = filter.status;
        }
        const payrolls = await this.prisma.payroll.findMany({
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
                { year: 'desc' },
                { month: 'desc' },
            ],
        });
        return payrolls.map(payroll => this.mapPayrollToDto(payroll));
    }
    async findOne(id) {
        const payroll = await this.prisma.payroll.findUnique({
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
        if (!payroll) {
            throw new common_1.NotFoundException(`Payroll record with ID ${id} not found`);
        }
        return this.mapPayrollToDto(payroll);
    }
    async update(id, updatePayrollDto) {
        const payrollExists = await this.prisma.payroll.findUnique({
            where: { id },
        });
        if (!payrollExists) {
            throw new common_1.NotFoundException(`Payroll record with ID ${id} not found`);
        }
        if (payrollExists.status === shared_1.PayrollStatus.PAID) {
            throw new common_1.BadRequestException(`Cannot update a payroll record that is already paid`);
        }
        let netSalary = updatePayrollDto.netSalary;
        if (!netSalary && (updatePayrollDto.baseSalary || updatePayrollDto.allowances || updatePayrollDto.deductions || updatePayrollDto.tax)) {
            const baseSalary = updatePayrollDto.baseSalary || payrollExists.baseSalary;
            const allowances = updatePayrollDto.allowances || payrollExists.allowances;
            const deductions = updatePayrollDto.deductions || payrollExists.deductions;
            const tax = updatePayrollDto.tax || payrollExists.tax;
            netSalary = baseSalary + allowances - deductions - tax;
        }
        const payroll = await this.prisma.payroll.update({
            where: { id },
            data: Object.assign(Object.assign({}, updatePayrollDto), { netSalary }),
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapPayrollToDto(payroll);
    }
    async updateStatus(id, updatePayrollStatusDto) {
        const payrollExists = await this.prisma.payroll.findUnique({
            where: { id },
        });
        if (!payrollExists) {
            throw new common_1.NotFoundException(`Payroll record with ID ${id} not found`);
        }
        if (payrollExists.status === shared_1.PayrollStatus.PAID && updatePayrollStatusDto.status !== shared_1.PayrollStatus.PAID) {
            throw new common_1.BadRequestException(`Cannot change status of a paid payroll record`);
        }
        const payroll = await this.prisma.payroll.update({
            where: { id },
            data: {
                status: updatePayrollStatusDto.status,
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
        return this.mapPayrollToDto(payroll);
    }
    async remove(id) {
        const payrollExists = await this.prisma.payroll.findUnique({
            where: { id },
        });
        if (!payrollExists) {
            throw new common_1.NotFoundException(`Payroll record with ID ${id} not found`);
        }
        if (payrollExists.status !== shared_1.PayrollStatus.DRAFT) {
            throw new common_1.BadRequestException(`Cannot delete a payroll record that is already ${payrollExists.status.toLowerCase()}`);
        }
        const payroll = await this.prisma.payroll.delete({
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
        return this.mapPayrollToDto(payroll);
    }
    async generatePayrolls(generatePayrollDto) {
        const { month, year, departmentId, employeeId } = generatePayrollDto;
        const whereEmployee = {};
        if (departmentId) {
            whereEmployee.departmentId = departmentId;
        }
        if (employeeId) {
            whereEmployee.id = employeeId;
        }
        const employees = await this.prisma.employee.findMany({
            where: whereEmployee,
            include: {
                user: true,
                department: true,
            },
        });
        if (employees.length === 0) {
            throw new common_1.NotFoundException('No employees found matching the criteria');
        }
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const results = [];
        for (const employee of employees) {
            const existingPayroll = await this.prisma.payroll.findFirst({
                where: {
                    employeeId: employee.id,
                    month,
                    year,
                },
            });
            if (existingPayroll) {
                continue;
            }
            const attendanceRecords = await this.prisma.attendance.findMany({
                where: {
                    employeeId: employee.id,
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            });
            const workDays = attendanceRecords.filter(record => record.status === shared_1.AttendanceStatus.PRESENT ||
                record.status === shared_1.AttendanceStatus.LATE).length;
            const leaveDays = attendanceRecords.filter(record => record.status === shared_1.AttendanceStatus.LEAVE).length;
            const absentDays = attendanceRecords.filter(record => record.status === shared_1.AttendanceStatus.ABSENT).length;
            let totalWorkingDays = 0;
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    totalWorkingDays++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            const joinDate = new Date(employee.dateOfJoining);
            if (joinDate > endDate) {
                continue;
            }
            const dailyRate = employee.salary / totalWorkingDays;
            let payableDays = totalWorkingDays;
            if (joinDate > startDate) {
                payableDays = this.countWorkingDays(joinDate, endDate);
            }
            let baseSalary = Math.round(dailyRate * payableDays);
            const allowances = Math.round(baseSalary * 0.1);
            const deductions = Math.round(absentDays * dailyRate);
            const taxableIncome = baseSalary + allowances;
            const tax = Math.round(taxableIncome * 0.15);
            const netSalary = baseSalary + allowances - deductions - tax;
            const payroll = await this.prisma.payroll.create({
                data: {
                    employeeId: employee.id,
                    month,
                    year,
                    baseSalary,
                    allowances,
                    deductions,
                    tax,
                    netSalary,
                    status: shared_1.PayrollStatus.DRAFT,
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
            results.push(this.mapPayrollToDto(payroll));
        }
        return results;
    }
    async getStatistics(month, year) {
        const where = {};
        if (month) {
            where.month = month;
        }
        if (year) {
            where.year = year;
        }
        const payrolls = await this.prisma.payroll.findMany({
            where,
            include: {
                employee: {
                    include: {
                        department: true,
                    },
                },
            },
        });
        const totalPayrolls = payrolls.length;
        const statusCount = {};
        Object.values(shared_1.PayrollStatus).forEach((status) => {
            statusCount[status] = 0;
        });
        let totalBaseSalary = 0;
        let totalAllowances = 0;
        let totalDeductions = 0;
        let totalTax = 0;
        let totalNetSalary = 0;
        payrolls.forEach(payroll => {
            statusCount[payroll.status]++;
            totalBaseSalary += payroll.baseSalary;
            totalAllowances += payroll.allowances;
            totalDeductions += payroll.deductions;
            totalTax += payroll.tax;
            totalNetSalary += payroll.netSalary;
        });
        const departmentStats = {};
        payrolls.forEach(payroll => {
            const deptName = payroll.employee.department.name;
            if (!departmentStats[deptName]) {
                departmentStats[deptName] = {
                    count: 0,
                    totalBaseSalary: 0,
                    totalAllowances: 0,
                    totalDeductions: 0,
                    totalTax: 0,
                    totalNetSalary: 0,
                };
            }
            departmentStats[deptName].count++;
            departmentStats[deptName].totalBaseSalary += payroll.baseSalary;
            departmentStats[deptName].totalAllowances += payroll.allowances;
            departmentStats[deptName].totalDeductions += payroll.deductions;
            departmentStats[deptName].totalTax += payroll.tax;
            departmentStats[deptName].totalNetSalary += payroll.netSalary;
        });
        return {
            totalPayrolls,
            byStatus: statusCount,
            totalBaseSalary,
            totalAllowances,
            totalDeductions,
            totalTax,
            totalNetSalary,
            byDepartment: departmentStats,
            period: {
                month: month || 'All months',
                year: year || 'All years',
            },
        };
    }
    mapPayrollToDto(payroll) {
        return {
            id: payroll.id,
            employeeId: payroll.employeeId,
            employee: payroll.employee ? {
                id: payroll.employee.id,
                userId: payroll.employee.userId,
                user: payroll.employee.user ? {
                    id: payroll.employee.user.id,
                    email: payroll.employee.user.email,
                    firstName: payroll.employee.user.firstName,
                    lastName: payroll.employee.user.lastName,
                    role: payroll.employee.user.role,
                    createdAt: payroll.employee.user.createdAt,
                    updatedAt: payroll.employee.user.updatedAt,
                } : undefined,
                departmentId: payroll.employee.departmentId,
                department: payroll.employee.department ? {
                    id: payroll.employee.department.id,
                    name: payroll.employee.department.name,
                    createdAt: payroll.employee.department.createdAt,
                    updatedAt: payroll.employee.department.updatedAt,
                } : undefined,
                position: payroll.employee.position,
                dateOfJoining: payroll.employee.dateOfJoining,
                salary: payroll.employee.salary,
                createdAt: payroll.employee.createdAt,
                updatedAt: payroll.employee.updatedAt,
            } : undefined,
            month: payroll.month,
            year: payroll.year,
            baseSalary: payroll.baseSalary,
            allowances: payroll.allowances,
            deductions: payroll.deductions,
            tax: payroll.tax,
            netSalary: payroll.netSalary,
            status: payroll.status,
            createdAt: payroll.createdAt,
            updatedAt: payroll.updatedAt,
        };
    }
    countWorkingDays(from, to) {
        let count = 0;
        const current = new Date(from);
        while (current <= to) {
            const day = current.getDay();
            if (day !== 0 && day !== 6) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        return count;
    }
};
exports.PayrollsService = PayrollsService;
exports.PayrollsService = PayrollsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayrollsService);
//# sourceMappingURL=payrolls.service.js.map