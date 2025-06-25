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
exports.PerformanceReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PerformanceReviewsService = class PerformanceReviewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPerformanceReviewDto) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id: createPerformanceReviewDto.employeeId },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${createPerformanceReviewDto.employeeId} not found`);
        }
        const reviewerExists = await this.prisma.employee.findUnique({
            where: { id: createPerformanceReviewDto.reviewerId },
        });
        if (!reviewerExists) {
            throw new common_1.NotFoundException(`Reviewer with ID ${createPerformanceReviewDto.reviewerId} not found`);
        }
        if (createPerformanceReviewDto.employeeId === createPerformanceReviewDto.reviewerId) {
            throw new common_1.BadRequestException('Employee cannot review themselves');
        }
        for (const [category, rating] of Object.entries(createPerformanceReviewDto.ratings)) {
            if (rating < 1 || rating > 5) {
                throw new common_1.BadRequestException(`Rating for ${category} must be between 1 and 5`);
            }
        }
        const existingReview = await this.prisma.performanceReview.findFirst({
            where: {
                employeeId: createPerformanceReviewDto.employeeId,
                reviewerId: createPerformanceReviewDto.reviewerId,
                reviewPeriod: createPerformanceReviewDto.reviewPeriod,
            },
        });
        if (existingReview) {
            throw new common_1.ConflictException(`A review already exists for this employee by this reviewer for ${createPerformanceReviewDto.reviewPeriod}`);
        }
        const review = await this.prisma.performanceReview.create({
            data: {
                employeeId: createPerformanceReviewDto.employeeId,
                reviewerId: createPerformanceReviewDto.reviewerId,
                reviewPeriod: createPerformanceReviewDto.reviewPeriod,
                ratings: createPerformanceReviewDto.ratings,
                comments: createPerformanceReviewDto.comments,
                goals: createPerformanceReviewDto.goals,
            },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapReviewToDto(review);
    }
    async findAll(filter) {
        const where = {};
        if (filter === null || filter === void 0 ? void 0 : filter.employeeId) {
            where.employeeId = filter.employeeId;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.reviewerId) {
            where.reviewerId = filter.reviewerId;
        }
        if (filter === null || filter === void 0 ? void 0 : filter.reviewPeriod) {
            where.reviewPeriod = filter.reviewPeriod;
        }
        const reviews = await this.prisma.performanceReview.findMany({
            where,
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reviews.map(review => this.mapReviewToDto(review));
    }
    async findOne(id) {
        const review = await this.prisma.performanceReview.findUnique({
            where: { id },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        if (!review) {
            throw new common_1.NotFoundException(`Performance review with ID ${id} not found`);
        }
        return this.mapReviewToDto(review);
    }
    async update(id, updatePerformanceReviewDto) {
        const reviewExists = await this.prisma.performanceReview.findUnique({
            where: { id },
        });
        if (!reviewExists) {
            throw new common_1.NotFoundException(`Performance review with ID ${id} not found`);
        }
        if (updatePerformanceReviewDto.ratings) {
            for (const [category, rating] of Object.entries(updatePerformanceReviewDto.ratings)) {
                if (rating < 1 || rating > 5) {
                    throw new common_1.BadRequestException(`Rating for ${category} must be between 1 and 5`);
                }
            }
        }
        const review = await this.prisma.performanceReview.update({
            where: { id },
            data: updatePerformanceReviewDto,
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapReviewToDto(review);
    }
    async remove(id) {
        const reviewExists = await this.prisma.performanceReview.findUnique({
            where: { id },
        });
        if (!reviewExists) {
            throw new common_1.NotFoundException(`Performance review with ID ${id} not found`);
        }
        const review = await this.prisma.performanceReview.delete({
            where: { id },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
        });
        return this.mapReviewToDto(review);
    }
    async getEmployeeReviews(employeeId) {
        const employeeExists = await this.prisma.employee.findUnique({
            where: { id: employeeId },
        });
        if (!employeeExists) {
            throw new common_1.NotFoundException(`Employee with ID ${employeeId} not found`);
        }
        const reviews = await this.prisma.performanceReview.findMany({
            where: {
                employeeId,
            },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reviews.map(review => this.mapReviewToDto(review));
    }
    async getReviewerReviews(reviewerId) {
        const reviewerExists = await this.prisma.employee.findUnique({
            where: { id: reviewerId },
        });
        if (!reviewerExists) {
            throw new common_1.NotFoundException(`Reviewer with ID ${reviewerId} not found`);
        }
        const reviews = await this.prisma.performanceReview.findMany({
            where: {
                reviewerId,
            },
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return reviews.map(review => this.mapReviewToDto(review));
    }
    async getStatistics(departmentId) {
        const where = {};
        if (departmentId) {
            where.employee = {
                departmentId,
            };
        }
        const reviews = await this.prisma.performanceReview.findMany({
            where,
            include: {
                employee: {
                    include: {
                        user: true,
                        department: true,
                    },
                },
                reviewer: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        const totalReviews = reviews.length;
        const reviewPeriods = [...new Set(reviews.map(review => review.reviewPeriod))];
        const allCategories = new Set();
        reviews.forEach(review => {
            Object.keys(review.ratings).forEach(category => {
                allCategories.add(category);
            });
        });
        const categories = Array.from(allCategories);
        const categoryAverages = {};
        categories.forEach(category => {
            const ratings = reviews
                .filter(review => review.ratings[category] !== undefined)
                .map(review => review.ratings[category]);
            const sum = ratings.reduce((total, rating) => total + rating, 0);
            categoryAverages[category] = ratings.length > 0 ? parseFloat((sum / ratings.length).toFixed(2)) : 0;
        });
        const departmentAverages = {};
        reviews.forEach(review => {
            const deptName = review.employee.department.name;
            if (!departmentAverages[deptName]) {
                departmentAverages[deptName] = {
                    count: 0,
                    totalRating: 0,
                    categories: {},
                };
                categories.forEach(category => {
                    departmentAverages[deptName].categories[category] = {
                        sum: 0,
                        count: 0,
                    };
                });
            }
            departmentAverages[deptName].count++;
            let reviewAverage = 0;
            let reviewCount = 0;
            Object.entries(review.ratings).forEach(([category, rating]) => {
                if (categories.includes(category)) {
                    departmentAverages[deptName].categories[category].sum += rating;
                    departmentAverages[deptName].categories[category].count++;
                    reviewAverage += rating;
                    reviewCount++;
                }
            });
            if (reviewCount > 0) {
                departmentAverages[deptName].totalRating += (reviewAverage / reviewCount);
            }
        });
        Object.keys(departmentAverages).forEach(deptName => {
            const dept = departmentAverages[deptName];
            dept.average = dept.count > 0 ? parseFloat((dept.totalRating / dept.count).toFixed(2)) : 0;
            const categoryAverages = {};
            Object.entries(dept.categories).forEach(([category, data]) => {
                categoryAverages[category] = data.count > 0 ? parseFloat((data.sum / data.count).toFixed(2)) : 0;
            });
            dept.categoryAverages = categoryAverages;
            delete dept.totalRating;
            delete dept.categories;
        });
        return {
            totalReviews,
            reviewPeriods,
            categories,
            categoryAverages,
            departmentAverages,
            filter: {
                departmentId: departmentId || 'All departments',
            },
        };
    }
    mapReviewToDto(review) {
        return {
            id: review.id,
            employeeId: review.employeeId,
            employee: review.employee ? {
                id: review.employee.id,
                userId: review.employee.userId,
                user: review.employee.user ? {
                    id: review.employee.user.id,
                    email: review.employee.user.email,
                    firstName: review.employee.user.firstName,
                    lastName: review.employee.user.lastName,
                    role: review.employee.user.role,
                    createdAt: review.employee.user.createdAt,
                    updatedAt: review.employee.user.updatedAt,
                } : undefined,
                departmentId: review.employee.departmentId,
                department: review.employee.department ? {
                    id: review.employee.department.id,
                    name: review.employee.department.name,
                    createdAt: review.employee.department.createdAt,
                    updatedAt: review.employee.department.updatedAt,
                } : undefined,
                position: review.employee.position,
                dateOfJoining: review.employee.dateOfJoining,
                salary: review.employee.salary,
                createdAt: review.employee.createdAt,
                updatedAt: review.employee.updatedAt,
            } : undefined,
            reviewerId: review.reviewerId,
            reviewer: review.reviewer ? {
                id: review.reviewer.id,
                userId: review.reviewer.userId,
                user: review.reviewer.user ? {
                    id: review.reviewer.user.id,
                    email: review.reviewer.user.email,
                    firstName: review.reviewer.user.firstName,
                    lastName: review.reviewer.user.lastName,
                    role: review.reviewer.user.role,
                    createdAt: review.reviewer.user.createdAt,
                    updatedAt: review.reviewer.user.updatedAt,
                } : undefined,
                departmentId: review.reviewer.departmentId,
                department: review.reviewer.department ? {
                    id: review.reviewer.department.id,
                    name: review.reviewer.department.name,
                    createdAt: review.reviewer.department.createdAt,
                    updatedAt: review.reviewer.department.updatedAt,
                } : undefined,
                position: review.reviewer.position,
                dateOfJoining: review.reviewer.dateOfJoining,
                salary: review.reviewer.salary,
                createdAt: review.reviewer.createdAt,
                updatedAt: review.reviewer.updatedAt,
            } : undefined,
            reviewPeriod: review.reviewPeriod,
            ratings: review.ratings,
            comments: review.comments,
            goals: review.goals,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        };
    }
};
exports.PerformanceReviewsService = PerformanceReviewsService;
exports.PerformanceReviewsService = PerformanceReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PerformanceReviewsService);
//# sourceMappingURL=performance-reviews.service.js.map