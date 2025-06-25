export declare class RatingDto {
    category: string;
    value: number;
}
export declare class CreatePerformanceReviewDto {
    employeeId: string;
    reviewerId: string;
    reviewPeriod: string;
    ratings: Record<string, number>;
    comments: string;
    goals: string[];
}
export declare class UpdatePerformanceReviewDto {
    ratings?: Record<string, number>;
    comments?: string;
    goals?: string[];
}
export declare class PerformanceReviewResponseDto {
    id: string;
    employeeId: string;
    reviewerId: string;
    reviewPeriod: string;
    ratings: Record<string, number>;
    comments: string;
    goals: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class PerformanceReviewFilterDto {
    employeeId?: string;
    reviewerId?: string;
    reviewPeriod?: string;
}
