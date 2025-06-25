import { PrismaService } from '../prisma/prisma.service';
import { CreatePerformanceReviewDto, UpdatePerformanceReviewDto, PerformanceReviewFilterDto } from './dto/performance-review.dto';
import { PerformanceReview } from 'shared';
export declare class PerformanceReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPerformanceReviewDto: CreatePerformanceReviewDto): Promise<PerformanceReview>;
    findAll(filter?: PerformanceReviewFilterDto): Promise<PerformanceReview[]>;
    findOne(id: string): Promise<PerformanceReview>;
    update(id: string, updatePerformanceReviewDto: UpdatePerformanceReviewDto): Promise<PerformanceReview>;
    remove(id: string): Promise<PerformanceReview>;
    getEmployeeReviews(employeeId: string): Promise<PerformanceReview[]>;
    getReviewerReviews(reviewerId: string): Promise<PerformanceReview[]>;
    getStatistics(departmentId?: string): Promise<any>;
    private mapReviewToDto;
}
