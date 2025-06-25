import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeavesModule } from './leaves/leaves.module';
import { PayrollsModule } from './payrolls/payrolls.module';
import { PerformanceReviewsModule } from './performance-reviews/performance-reviews.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    EmployeesModule,
    DepartmentsModule,
    AttendanceModule,
    LeavesModule,
    PayrollsModule,
    PerformanceReviewsModule,
    DocumentsModule, // Add the DocumentsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}