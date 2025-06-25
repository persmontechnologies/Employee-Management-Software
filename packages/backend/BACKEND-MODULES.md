# 🔧 Backend Module Documentation

## 📋 Module Overview

The backend is built with NestJS and follows a modular architecture. Each module handles a specific business domain with its own controllers, services, and DTOs.

## 🏗️ Module Structure

### Authentication Module (`src/auth/`)

**Purpose**: Handles user authentication and authorization

**Files**:

- `auth.controller.ts` - Authentication endpoints
- `auth.service.ts` - Authentication business logic
- `auth.service.spec.ts` - Unit tests
- `strategies/jwt.strategy.ts` - JWT validation strategy
- `strategies/local.strategy.ts` - Local login strategy
- `guards/jwt-auth.guard.ts` - JWT route protection
- `guards/roles.guard.ts` - Role-based access control
- `decorators/roles.decorator.ts` - Role decorator
- `dto/auth.dto.ts` - Authentication data transfer objects

**Key Endpoints**:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get current user profile

**Usage Example**:

```typescript
// Login request
{
  "email": "admin@persmon.com",
  "password": "admin123"
}

// Response
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "admin@persmon.com",
    "role": "ADMIN"
  }
}
```

### Users Module (`src/users/`)

**Purpose**: User management and profile operations

**Files**:

- `users.service.ts` - User CRUD operations
- `users.module.ts` - Module configuration

**Key Methods**:

- `findByEmail()` - Find user by email
- `create()` - Create new user
- `findById()` - Find user by ID

### Employees Module (`src/employees/`)

**Purpose**: Employee information management

**Files**:

- `employees.controller.ts` - Employee API endpoints
- `employees.service.ts` - Employee business logic
- `employees.module.ts` - Module configuration
- `dto/employee.dto.ts` - Employee data validation

**Key Endpoints**:

- `GET /employees` - List all employees (paginated)
- `POST /employees` - Create new employee
- `GET /employees/:id` - Get employee by ID
- `GET /employees/user/:userId` - Get employee by user ID
- `PATCH /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

**Usage Example**:

```typescript
// Create employee
{
  "userId": "user_id_here",
  "departmentId": "dept_id_here",
  "position": "Software Developer",
  "dateOfJoining": "2024-01-15",
  "salary": 65000
}
```

### Departments Module (`src/departments/`)

**Purpose**: Organizational structure management

**Files**:

- `departments.controller.ts` - Department endpoints
- `departments.service.ts` - Department operations
- `dto/department.dto.ts` - Department validation

**Key Endpoints**:

- `GET /departments` - List all departments
- `POST /departments` - Create department
- `GET /departments/statistics` - Department statistics
- `GET /departments/:id` - Get department details
- `PATCH /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department

### Attendance Module (`src/attendance/`)

**Purpose**: Time tracking and attendance management

**Files**:

- `attendance.controller.ts` - Attendance endpoints
- `attendance.service.ts` - Attendance business logic
- `dto/attendance.dto.ts` - Attendance validation

**Key Endpoints**:

- `POST /attendance/my/clock-in` - Employee clock in
- `POST /attendance/my/clock-out` - Employee clock out
- `GET /attendance/my/history` - Get personal attendance history
- `GET /attendance` - List all attendance records (admin)
- `GET /attendance/statistics` - Attendance statistics
- `GET /attendance/employee/:employeeId` - Employee-specific records
- `POST /attendance/clock-in` - Admin clock-in for employee
- `POST /attendance/clock-out/:employeeId` - Admin clock-out

**Usage Example**:

```typescript
// Clock in
POST /attendance/my/clock-in
{
  "location": "Office", // optional
  "notes": "Starting work" // optional
}

// Response
{
  "id": "attendance_id",
  "clockIn": "2024-06-24T08:00:00Z",
  "status": "PRESENT"
}
```

### Leaves Module (`src/leaves/`)

**Purpose**: Leave request and approval system

**Files**:

- `leaves.controller.ts` - Leave management endpoints
- `leaves.service.ts` - Leave business logic
- `dto/leave.dto.ts` - Leave validation

**Key Endpoints**:

- `POST /leaves` - Create leave request
- `GET /leaves` - List all leave requests (admin/HR)
- `GET /leaves/my/requests` - Personal leave requests
- `GET /leaves/my/balance` - Personal leave balance
- `GET /leaves/balance/:employeeId` - Employee leave balance
- `PATCH /leaves/:id/status` - Approve/reject leave
- `GET /leaves/statistics` - Leave statistics

**Usage Example**:

```typescript
// Create leave request
{
  "startDate": "2024-07-01",
  "endDate": "2024-07-05",
  "leaveType": "ANNUAL",
  "reason": "Family vacation"
}
```

### Payrolls Module (`src/payrolls/`)

**Purpose**: Payroll processing and salary management

**Files**:

- `payrolls.controller.ts` - Payroll endpoints
- `payrolls.service.ts` - Payroll calculations
- `dto/payroll.dto.ts` - Payroll validation

**Key Endpoints**:

- `POST /payrolls/generate` - Generate payroll for period
- `GET /payrolls` - List all payrolls
- `GET /payrolls/my/payslips` - Personal payslips
- `GET /payrolls/employee/:employeeId` - Employee payrolls
- `PATCH /payrolls/:id/status` - Update payroll status
- `GET /payrolls/statistics` - Payroll statistics

### Performance Reviews Module (`src/performance-reviews/`)

**Purpose**: Employee performance evaluation

**Files**:

- `performance-reviews.controller.ts` - Review endpoints
- `performance-reviews.service.ts` - Review management
- `dto/performance-review.dto.ts` - Review validation

**Key Endpoints**:

- `POST /performance-reviews` - Create performance review
- `GET /performance-reviews` - List all reviews
- `GET /performance-reviews/my/reviews` - Personal reviews (as reviewee)
- `GET /performance-reviews/my/performed-reviews` - Reviews conducted
- `GET /performance-reviews/employee/:employeeId` - Employee reviews
- `PATCH /performance-reviews/:id` - Update review

### Documents Module (`src/documents/`)

**Purpose**: Document storage and management

**Files**:

- `documents.controller.ts` - Document endpoints
- `documents.service.ts` - Document operations
- `dto/document.dto.ts` - Document validation

**Key Endpoints**:

- `POST /documents` - Upload document
- `GET /documents` - List all documents
- `GET /documents/my/documents` - Personal documents
- `GET /documents/employee/:employeeId` - Employee documents
- `GET /documents/:id` - Get document details
- `DELETE /documents/:id` - Delete document

## 🗄️ Database Schema (Prisma)

### Core Models

```prisma
model User {
  id          String      @id @default(uuid())
  email       String      @unique
  password    String
  firstName   String
  lastName    String
  role        Role        @default(EMPLOYEE)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  employee    Employee?
}

model Employee {
  id                String              @id @default(uuid())
  userId            String              @unique
  user              User                @relation(fields: [userId], references: [id])
  departmentId      String
  department        Department          @relation(fields: [departmentId], references: [id])
  position          String
  dateOfJoining     DateTime
  salary            Float
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
  attendances       Attendance[]
  leaves            Leave[]
  payrolls          Payroll[]
  performanceReviews PerformanceReview[] @relation("reviewee")
  reviewsGiven      PerformanceReview[] @relation("reviewer")
  documents         Document[]
}
```

## 🔐 Security Implementation

### Authentication Flow

1. User submits credentials to `/auth/login`
2. `LocalStrategy` validates credentials
3. JWT token generated and returned
4. Subsequent requests include JWT in Authorization header
5. `JwtStrategy` validates token on protected routes

### Role-Based Access Control

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.HR)
@Get()
async findAll() {
  // Only ADMIN and HR can access
}
```

### Permission Matrix

- **ADMIN**: Full system access
- **HR**: Employee management, attendance, leaves
- **CFO**: Payroll, financial reports
- **EMPLOYEE**: Personal data only
- **SYSTEM_ADMIN**: System configuration

## 🔧 Common Patterns

### Error Handling

```typescript
try {
  const result = await this.service.operation();
  return result;
} catch (error) {
  throw new HttpException("Operation failed", HttpStatus.INTERNAL_SERVER_ERROR);
}
```

### Validation with DTOs

```typescript
export class CreateEmployeeDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsNumber()
  @Min(0)
  salary: number;
}
```

### Database Queries with Prisma

```typescript
async findAll(page: number = 1, limit: number = 10) {
  return this.prisma.employee.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      user: true,
      department: true
    }
  });
}
```

## 🧪 Testing Patterns

### Controller Testing

```typescript
describe("EmployeesController", () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
```

## 📝 API Response Formats

### Success Response

```typescript
{
  "data": {
    "id": "uuid",
    "name": "John Doe",
    // ... other fields
  },
  "message": "Operation successful"
}
```

### Error Response

```typescript
{
  "message": "Validation failed",
  "error": "Bad Request",
  "statusCode": 400,
  "details": [
    {
      "field": "email",
      "message": "must be a valid email"
    }
  ]
}
```

### Paginated Response

```typescript
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🚀 Performance Optimizations

### Database Queries

- Use `select` to limit returned fields
- Use `include` for related data
- Implement pagination for large datasets
- Add database indexes for frequently queried fields

### Caching Strategy

- Cache static data (departments, roles)
- Cache user sessions
- Cache computed statistics

### API Optimization

- Implement request/response compression
- Use connection pooling for database
- Implement rate limiting
- Add request logging and monitoring

---

**Module Documentation Updated**: June 24, 2025  
**Backend Version**: 1.0.0  
**NestJS Version**: 10.x
