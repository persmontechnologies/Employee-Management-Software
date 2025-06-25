import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService], // Export the service so it can be used by other modules
})
export class AttendanceModule {}