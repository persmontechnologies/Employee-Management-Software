import { Module } from '@nestjs/common';
import { PayrollsService } from './payrolls.service';
import { PayrollsController } from './payrolls.controller';

@Module({
  controllers: [PayrollsController],
  providers: [PayrollsService],
  exports: [PayrollsService], // Export the service so it can be used by other modules
})
export class PayrollsModule {}