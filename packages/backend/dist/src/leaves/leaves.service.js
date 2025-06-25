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
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const shared_1 = require("shared");
let LeavesService = class LeavesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLeaveDto) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id: createLeaveDto.employeeId },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${createLeaveDto.employeeId} not found`);
        }
        if (new Date(createLeaveDto.startDate) > new Date(createLeaveDto.endDate)) {
            throw new common_1.BadRequestException('Start date cannot be after end date');
        }
        const overlappingLeave = await this.prisma.leave.findFirst({
            where: {
                employeeId: createLeaveDto.employeeId,
                status: { in: [shared_1.LeaveStatus.PENDING, shared_1.LeaveStatus.APPROVED] },
                OR: [
                    {
                        startDate: {
                            lte: new Date(createLeaveDto.endDate),
                        },
                        endDate: {
                            gte: new Date(createLeaveDto.startDate),
                        },
                    },
                ],
            },
        });
        if (overlappingLeave) {
            throw new common_1.ConflictException(`Employee already has an overlapping ${overlappingLeave.status.toLowerCase()} leave request from ${new Date(overlappingLeave.startDate).toLocaleDateString()} to ${new Date(overlappingLeave.endDate).toLocaleDateString()}`);
        }
        const leave = await this.prisma.leave.create({
            data: {
                employeeId: createLeaveDto.employeeId,
                type: createLeaveDto.type,
                startDate: new Date(createLeaveDto.startDate),
                endDate: new Date(createLeaveDto.endDate),
                reason: createLeaveDto.reason,
                status: shared_1.LeaveStatus.PENDING,
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
        return this.mapLeaveToDto(leave);
    }
    async findAll(filter) {
        const where = {};
        if (filter === null || filter === void 0 ? void 0 : filter.employeeId) {
            where.employeeId = filter.employeeId;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.type) {
            where.type = filter.type;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.status) {
            where.status = filter.status;
        }
        if ((filter === null || filter === void 0 ? void 0 : filter.startDate) || (filter === null || filter === void 0 ? void 0 : filter.endDate)) {
            if (filter === null || filter === void 0 ? void 0 : filter.startDate) {
                where.endDate = { gte: new Date(filter.startDate) };
            }
            if (filter === null || filter === void 0 ? void 0 : filter.endDate) {
                where.startDate = { lte: new Date(filter.endDate) };
            }
        }
        const leaves = await this.prisma.leave.findMany({
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
                { status: 'asc' },
                { startDate: 'desc' }
            ],
        });
        return leaves.map(leave => this.mapLeaveToDto(leave));
    }
    async findOne(id) {
        const leave = await this.prisma.leave.findUnique({
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
        if (!leave) {
            throw new common_1.NotFoundException(`Leave request with ID ${id} not found`);
        }
        return this.mapLeaveToDto(leave);
    }
    async update(id, updateLeaveDto) {
        const leaveExists = await this.prisma.leave.findUnique({
            where: { id },
        });
        if (!leaveExists) {
            throw new common_1.NotFoundException(`Leave request with ID ${id} not found`);
        }
        if (leaveExists.status !== shared_1.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException(`Cannot update a leave request that is already ${leaveExists.status.toLowerCase()}`);
        }
        let startDate = leaveExists.startDate;
        let endDate = leaveExists.endDate;
        if (updateLeaveDto.startDate) {
            startDate = new Date(updateLeaveDto.startDate);
        }
        if (updateLeaveDto.endDate) {
            endDate = new Date(updateLeaveDto.endDate);
        }
        if (startDate > endDate) {
            throw new common_1.BadRequestException('Start date cannot be after end date');
        }
        if (updateLeaveDto.startDate || updateLeaveDto.endDate) {
            const overlappingLeave = await this.prisma.leave.findFirst({
                where: {
                    id: { not: id },
                    employeeId: leaveExists.employeeId,
                    status: { in: [shared_1.LeaveStatus.PENDING, shared_1.LeaveStatus.APPROVED] },
                    OR: [
                        {
                            startDate: {
                                lte: endDate,
                            },
                            endDate: {
                                gte: startDate,
                            },
                        },
                    ],
                },
            });
            if (overlappingLeave) {
                throw new common_1.ConflictException(`Employee already has an overlapping ${overlappingLeave.status.toLowerCase()} leave request from ${new Date(overlappingLeave.startDate).toLocaleDateString()} to ${new Date(overlappingLeave.endDate).toLocaleDateString()}`);
            }
        }
        const leave = await this.prisma.leave.update({
            where: { id },
            data: updateLeaveDto,
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapLeaveToDto(leave);
    }
    async updateStatus(id, updateLeaveStatusDto) {
        const leaveExists = await this.prisma.leave.findUnique({
            where: { id },
        });
        if (!leaveExists) {
            throw new common_1.NotFoundException(`Leave request with ID ${id} not found`);
        }
        if (leaveExists.status !== shared_1.LeaveStatus.PENDING) {
            throw new common_1.BadRequestException(`Leave request is already ${leaveExists.status.toLowerCase()}`);
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedLeave = await tx.leave.update({
                where: { id },
                data: {
                    status: updateLeaveStatusDto.status,
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
            if (updateLeaveStatusDto.status === shared_1.LeaveStatus.APPROVED) {
                const startDate = new Date(updatedLeave.startDate);
                const endDate = new Date(updatedLeave.endDate);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);
                const dates = [];
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    const dayOfWeek = currentDate.getDay();
                    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                        dates.push(new Date(currentDate));
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                for (const date of dates) {
                    const existingAttendance = await tx.attendance.findFirst({
                        where: {
                            employeeId: updatedLeave.employeeId,
                            date: {
                                gte: new Date(date.setHours(0, 0, 0, 0)),
                                lt: new Date(date.setHours(24, 0, 0, 0)),
                            },
                        },
                    });
                    if (!existingAttendance) {
                        await tx.attendance.create({
                            data: {
                                employeeId: updatedLeave.employeeId,
                                date: new Date(date),
                                clockIn: new Date(date.setHours(9, 0, 0, 0)),
                                status: shared_1.AttendanceStatus.LEAVE,
                            },
                        });
                    }
                    else {
                        await tx.attendance.update({
                            where: { id: existingAttendance.id },
                            data: {
                                status: shared_1.AttendanceStatus.LEAVE,
                            },
                        });
                    }
                }
            }
            return updatedLeave;
        });
        return this.mapLeaveToDto(result);
    }
    async remove(id) {
        const leaveExists = await this.prisma.leave.findUnique({
            where: { id },
        });
        if (!leaveExists) {
            throw new common_1.NotFoundException(`Leave request with ID ${id} not found`);
        }
        if (leaveExists.status === shared_1.LeaveStatus.APPROVED) {
            throw new common_1.BadRequestException('Cannot delete an approved leave request');
        }
        const leave = await this.prisma.leave.delete({
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
        return this.mapLeaveToDto(leave);
    }
    async getStatistics(startDate, endDate) {
        const where = {};
        if (startDate || endDate) {
            if (startDate) {
                where.startDate = { gte: new Date(startDate) };
            }
            if (endDate) {
                where.endDate = { lte: new Date(endDate) };
            }
        }
        const leaves = await this.prisma.leave.findMany({
            where,
            include: {
                employee: {
                    include: {
                        department: true,
                    },
                },
            },
        });
        const totalLeaves = leaves.length;
        const typeCount = {};
        Object.values(shared_1.LeaveType).forEach((type) => {
            typeCount[type] = 0;
        });
        const statusCount = {};
        Object.values(shared_1.LeaveStatus).forEach((status) => {
            statusCount[status] = 0;
        });
        let totalDays = 0;
        leaves.forEach(leave => {
            typeCount[leave.type]++;
            statusCount[leave.status]++;
            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);
            let days = 0;
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    days++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            totalDays += days;
        });
        const departmentStats = {};
        leaves.forEach(leave => {
            const deptName = leave.employee.department.name;
            if (!departmentStats[deptName]) {
                departmentStats[deptName] = {
                    total: 0,
                    approved: 0,
                    pending: 0,
                    rejected: 0,
                    days: 0,
                };
            }
            departmentStats[deptName].total++;
            departmentStats[deptName][leave.status.toLowerCase()]++;
            if (leave.status === shared_1.LeaveStatus.APPROVED) {
                const startDate = new Date(leave.startDate);
                const endDate = new Date(leave.endDate);
                let days = 0;
                let currentDate = new Date(startDate);
                while (currentDate <= endDate) {
                    const dayOfWeek = currentDate.getDay();
                    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                        days++;
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                departmentStats[deptName].days += days;
            }
        });
        return {
            totalLeaves,
            totalDays,
            byType: typeCount,
            byStatus: statusCount,
            byDepartment: departmentStats,
            timeRange: {
                startDate: startDate || 'All time',
                endDate: endDate || 'All time',
            },
        };
    }
    async getLeaveBalance(employeeId, year) {
        const employee = await this.prisma.employee.findUnique({
            where: { id: employeeId },
            include: {
                user: true,
            },
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${employeeId} not found`);
        }
        const targetYear = year || new Date().getFullYear();
        const startOfYear = new Date(targetYear, 0, 1);
        const endOfYear = new Date(targetYear, 11, 31);
        const leaves = await this.prisma.leave.findMany({
            where: {
                employeeId,
                status: shared_1.LeaveStatus.APPROVED,
                startDate: { gte: startOfYear },
                endDate: { lte: endOfYear },
            },
        });
        const usedDays = {};
        Object.values(shared_1.LeaveType).forEach((type) => {
            usedDays[type] = 0;
        });
        leaves.forEach(leave => {
            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);
            let days = 0;
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    days++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            usedDays[leave.type] += days;
        });
        const allocation = {
            'ANNUAL': 20,
            'SICK': 10,
            'MATERNITY': 90,
            'PATERNITY': 10,
            'UNPAID': 30,
        };
        const remainingDays = {};
        Object.entries(allocation).forEach(([type, alloc]) => {
            remainingDays[type] = alloc - (usedDays[type] || 0);
        });
        return {
            employee: {
                id: employee.id,
                name: `${employee.user.firstName} ${employee.user.lastName}`,
                position: employee.position,
            },
            year: targetYear,
            allocation,
            usedDays,
            remainingDays,
        };
    }
    mapLeaveToDto(leave) {
        return {
            id: leave.id,
            employeeId: leave.employeeId,
            employee: leave.employee ? {
                id: leave.employee.id,
                userId: leave.employee.userId,
                user: leave.employee.user ? {
                    id: leave.employee.user.id,
                    email: leave.employee.user.email,
                    firstName: leave.employee.user.firstName,
                    lastName: leave.employee.user.lastName,
                    role: leave.employee.user.role,
                    createdAt: leave.employee.user.createdAt,
                    updatedAt: leave.employee.user.updatedAt,
                } : undefined,
                departmentId: leave.employee.departmentId,
                department: leave.employee.department ? {
                    id: leave.employee.department.id,
                    name: leave.employee.department.name,
                    createdAt: leave.employee.department.createdAt,
                    updatedAt: leave.employee.department.updatedAt,
                } : undefined,
                position: leave.employee.position,
                dateOfJoining: leave.employee.dateOfJoining,
                salary: leave.employee.salary,
                createdAt: leave.employee.createdAt,
                updatedAt: leave.employee.updatedAt,
            } : undefined,
            type: leave.type,
            startDate: leave.startDate,
            endDate: leave.endDate,
            reason: leave.reason,
            status: leave.status,
            createdAt: leave.createdAt,
            updatedAt: leave.updatedAt,
        };
    }
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map