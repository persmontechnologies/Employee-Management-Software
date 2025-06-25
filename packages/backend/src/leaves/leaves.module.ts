import { Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';

@Module({
  controllers: [LeavesController],
  providers: [LeavesService],
  exports: [LeavesService], // Export the service so it can be used by other modules
})
export class LeavesModule {}