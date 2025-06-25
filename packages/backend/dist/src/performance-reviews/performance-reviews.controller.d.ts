import { User } from 'shared';
import { PerformanceReviewsService } from './performance-reviews.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePerformanceReviewDto, UpdatePerformanceReviewDto, PerformanceReviewFilterDto } from './dto/performance-review.dto';
export declare class PerformanceReviewsController {
    private readonly performanceReviewsService;
    private readonly prisma;
    constructor(performanceReviewsService: PerformanceReviewsService, prisma: PrismaService);
    create(createPerformanceReviewDto: CreatePerformanceReviewDto): Promise<PerformanceReview>;
    findAll(filter: PerformanceReviewFilterDto): Promise<PerformanceReview[]>;
    getStatistics(departmentId?: string): Promise<any>;
    findByEmployee(employeeId: string, user: User): Promise<PerformanceReview[]>;
    findByReviewer(reviewerId: string, user: User): Promise<PerformanceReview[]>;
    findOne(id: string, user: User): Promise<PerformanceReview>;
    update(id: string, updatePerformanceReviewDto: UpdatePerformanceReviewDto): Promise<PerformanceReview>;
    remove(id: string): Promise<PerformanceReview>;
    getMyReviews(user: User): Promise<PerformanceReview[]>;
    getMyPerformedReviews(user: User): Promise<PerformanceReview[]>;
}
