// User roles for role-based access control
export enum UserRole {
  ADMIN = "ADMIN",
  HR = "HR",
  CFO = "CFO",
  EMPLOYEE = "EMPLOYEE",
  SYSTEM_ADMIN = "SYSTEM_ADMIN"
}

// User account information
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Department information
export interface Department {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Employee information
export interface Employee {
  id: string;
  userId: string;
  user: User;
  departmentId: string;
  department: Department;
  position: string;
  dateOfJoining: Date;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}

// Attendance status options
export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  LEAVE = "LEAVE"
}

// Attendance record
export interface Attendance {
  id: string;
  employeeId: string;
  employee: Employee;
  date: Date;
  clockIn: Date;
  clockOut: Date | null;
  status: AttendanceStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Leave types
export enum LeaveType {
  ANNUAL = "ANNUAL",
  SICK = "SICK",
  MATERNITY = "MATERNITY",
  PATERNITY = "PATERNITY",
  UNPAID = "UNPAID"
}

// Leave status options
export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

// Leave request
export interface Leave {
  id: string;
  employeeId: string;
  employee: Employee;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Payroll status options
export enum PayrollStatus {
  DRAFT = "DRAFT",
  PROCESSED = "PROCESSED",
  PAID = "PAID"
}

// Payroll record
export interface Payroll {
  id: string;
  employeeId: string;
  employee: Employee;
  month: number;
  year: number;
  baseSalary: number;
  allowances: number;
  deductions: number;
  tax: number;
  netSalary: number;
  status: PayrollStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Performance review
export interface PerformanceReview {
  id: string;
  employeeId: string;
  employee: Employee;
  reviewerId: string;
  reviewer: Employee;
  reviewPeriod: string;
  ratings: {
    [key: string]: number;
  };
  comments: string;
  goals: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Document type options
export enum DocumentType {
  CONTRACT = "CONTRACT",
  CERTIFICATE = "CERTIFICATE",
  IDENTIFICATION = "IDENTIFICATION",
  PERFORMANCE_REVIEW = "PERFORMANCE_REVIEW",
  OTHER = "OTHER"
}

// Document record
export interface Document {
  id: string;
  employeeId: string;
  employee: Employee;
  type: DocumentType;
  name: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}