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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_1 = require("shared");
let AttendanceService = class AttendanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAttendanceDto) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id: createAttendanceDto.employeeId },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${createAttendanceDto.employeeId} not found`);
        }
        const existingRecord = await this.prisma.attendance.findFirst({
            where: {
                employeeId: createAttendanceDto.employeeId,
                date: {
                    gte: new Date(new Date(createAttendanceDto.date).setHours(0, 0, 0, 0)),
                    lt: new Date(new Date(createAttendanceDto.date).setHours(24, 0, 0, 0)),
                },
            },
        });
        if (existingRecord) {
            throw new common_1.ConflictException(`Attendance record already exists for employee on ${new Date(createAttendanceDto.date).toISOString().split('T')[0]}`);
        }
        const attendance = await this.prisma.attendance.create({
            data: {
                employeeId: createAttendanceDto.employeeId,
                date: createAttendanceDto.date,
                clockIn: createAttendanceDto.clockIn,
                clockOut: createAttendanceDto.clockOut,
                status: createAttendanceDto.status,
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
        return this.mapAttendanceToDto(attendance);
    }
    async findAll(filter) {
        const where = {};
        if (filter === null || filter === void 0 ? void 0 : filter.employeeId) {
            where.employeeId = filter.employeeId;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.status) {
            where.status = filter.status;
        }
        if ((filter === null || filter === void 0 ? void 0 : filter.startDate) || (filter === null || filter === void 0 ? void 0 : filter.endDate)) {
            where.date = {};
            if (filter === null || filter === void 0 ? void 0 : filter.startDate) {
                where.date.gte = new Date(filter.startDate);
            }
            if (filter === null || filter === void 0 ? void 0 : filter.endDate) {
                where.date.lte = new Date(filter.endDate);
            }
        }
        const attendances = await this.prisma.attendance.findMany({
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
                { date: 'desc' },
                { clockIn: 'desc' }
            ],
        });
        return attendances.map(attendance => this.mapAttendanceToDto(attendance));
    }
    async findOne(id) {
        const attendance = await this.prisma.attendance.findUnique({
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
        if (!attendance) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
        return this.mapAttendanceToDto(attendance);
    }
    async update(id, updateAttendanceDto) {
        const attendanceExists = await this.prisma.attendance.findUnique({
            where: { id },
        });
        if (!attendanceExists) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
        if (updateAttendanceDto.clockOut) {
            const clockOutTime = new Date(updateAttendanceDto.clockOut).getTime();
            const clockInTime = new Date(attendanceExists.clockIn).getTime();
            if (clockOutTime <= clockInTime) {
                throw new common_1.BadRequestException('Clock-out time must be after clock-in time');
            }
        }
        const attendance = await this.prisma.attendance.update({
            where: { id },
            data: updateAttendanceDto,
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapAttendanceToDto(attendance);
    }
    async remove(id) {
        const attendanceExists = await this.prisma.attendance.findUnique({
            where: { id },
        });
        if (!attendanceExists) {
            throw new common_1.NotFoundException(`Attendance record with ID ${id} not found`);
        }
        const attendance = await this.prisma.attendance.delete({
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
        return this.mapAttendanceToDto(attendance);
    }
    async clockIn(clockInDto) {
        const employee = await this.prisma.employee.findUnique({
            where: { id: clockInDto.employeeId },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${clockInDto.employeeId} not found`);
        }
        const currentDate = new Date();
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const existingRecord = await this.prisma.attendance.findFirst({
            where: {
                employeeId: clockInDto.employeeId,
                date: {
                    gte: today,
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                },
            },
        });
        if (existingRecord) {
            throw new common_1.ConflictException(`Employee has already clocked in today at ${existingRecord.clockIn.toLocaleTimeString()}`);
        }
        const now = new Date();
        const companyStartHour = 9;
        const status = now.getHours() >= companyStartHour ? shared_1.AttendanceStatus.LATE : shared_1.AttendanceStatus.PRESENT;
        const attendance = await this.prisma.attendance.create({
            data: {
                employeeId: clockInDto.employeeId,
                date: today,
                clockIn: now,
                status,
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
        return this.mapAttendanceToDto(attendance);
    }
    async clockOut(employeeId, clockOutDto) {
        const currentDate = new Date();
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const existingRecord = await this.prisma.attendance.findFirst({
            where: {
                employeeId,
                date: {
                    gte: today,
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                },
            },
        });
        if (!existingRecord) {
            throw new common_1.NotFoundException(`No clock-in record found for today`);
        }
        if (existingRecord.clockOut) {
            throw new common_1.ConflictException(`Employee has already clocked out today at ${existingRecord.clockOut.toLocaleTimeString()}`);
        }
        const now = new Date();
        const attendance = await this.prisma.attendance.update({
            where: { id: existingRecord.id },
            data: {
                clockOut: now,
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
        return this.mapAttendanceToDto(attendance);
    }
    async getStatistics(startDate, endDate) {
        const where = {};
        if (startDate || endDate) {
            where.date = {};
            if (startDate) {
                where.date.gte = new Date(startDate);
            }
            if (endDate) {
                where.date.lte = new Date(endDate);
            }
        }
        const attendances = await this.prisma.attendance.findMany({
            where,
            include: {
                employee: {
                    include: {
                        department: true,
                    },
                },
            },
        });
        const totalEmployees = await this.prisma.employee.count();
        const totalRecords = attendances.length;
        const statusCounts = {
            [shared_1.AttendanceStatus.PRESENT]: 0,
            [shared_1.AttendanceStatus.ABSENT]: 0,
            [shared_1.AttendanceStatus.LATE]: 0,
            [shared_1.AttendanceStatus.LEAVE]: 0,
        };
        attendances.forEach(record => {
            statusCounts[record.status]++;
        });
        const presentRate = totalRecords > 0
            ? ((statusCounts[shared_1.AttendanceStatus.PRESENT] / totalRecords) * 100).toFixed(2)
            : 0;
        const lateRate = totalRecords > 0
            ? ((statusCounts[shared_1.AttendanceStatus.LATE] / totalRecords) * 100).toFixed(2)
            : 0;
        const departmentStats = {};
        attendances.forEach(record => {
            const deptName = record.employee.department.name;
            if (!departmentStats[deptName]) {
                departmentStats[deptName] = {
                    total: 0,
                    present: 0,
                    late: 0,
                    absent: 0,
                    leave: 0,
                };
            }
            departmentStats[deptName].total++;
            departmentStats[deptName][record.status.toLowerCase()]++;
        });
        return {
            totalRecords,
            statusCounts,
            presentRate,
            lateRate,
            departmentStats,
            timeRange: {
                startDate: startDate || 'All time',
                endDate: endDate || 'All time',
            },
        };
    }
    mapAttendanceToDto(attendance) {
        return {
            id: attendance.id,
            employeeId: attendance.employeeId,
            employee: attendance.employee ? {
                id: attendance.employee.id,
                userId: attendance.employee.userId,
                user: attendance.employee.user ? {
                    id: attendance.employee.user.id,
                    email: attendance.employee.user.email,
                    firstName: attendance.employee.user.firstName,
                    lastName: attendance.employee.user.lastName,
                    role: attendance.employee.user.role,
                    createdAt: attendance.employee.user.createdAt,
                    updatedAt: attendance.employee.user.updatedAt,
                } : undefined,
                departmentId: attendance.employee.departmentId,
                department: attendance.employee.department ? {
                    id: attendance.employee.department.id,
                    name: attendance.employee.department.name,
                    createdAt: attendance.employee.department.createdAt,
                    updatedAt: attendance.employee.department.updatedAt,
                } : undefined,
                position: attendance.employee.position,
                dateOfJoining: attendance.employee.dateOfJoining,
                salary: attendance.employee.salary,
                createdAt: attendance.employee.createdAt,
                updatedAt: attendance.employee.updatedAt,
            } : undefined,
            date: attendance.date,
            clockIn: attendance.clockIn,
            clockOut: attendance.clockOut,
            status: attendance.status,
            createdAt: attendance.createdAt,
            updatedAt: attendance.updatedAt,
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map