import { Module } from '@nestjs/common';
import { PerformanceReviewsService } from './performance-reviews.service';
import { PerformanceReviewsController } from './performance-reviews.controller';

@Module({
  controllers: [PerformanceReviewsController],
  providers: [PerformanceReviewsService],
  exports: [PerformanceReviewsService], // Export the service so it can be used by other modules
})
export class PerformanceReviewsModule {}