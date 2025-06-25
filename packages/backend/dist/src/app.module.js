"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const employees_module_1 = require("./employees/employees.module");
const departments_module_1 = require("./departments/departments.module");
const attendance_module_1 = require("./attendance/attendance.module");
const leaves_module_1 = require("./leaves/leaves.module");
const payrolls_module_1 = require("./payrolls/payrolls.module");
const performance_reviews_module_1 = require("./performance-reviews/performance-reviews.module");
const documents_module_1 = require("./documents/documents.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            employees_module_1.EmployeesModule,
            departments_module_1.DepartmentsModule,
            attendance_module_1.AttendanceModule,
            leaves_module_1.LeavesModule,
            payrolls_module_1.PayrollsModule,
            performance_reviews_module_1.PerformanceReviewsModule,
            documents_module_1.DocumentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map