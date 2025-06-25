// Local types for application
// This duplicates the shared package types to avoid build issues

export enum UserRole {
  ADMIN = "Admin",
  HR = "HR Manager",
  CFO = "CFO",
  EMPLOYEE = "Employee",
  SYSTEM_ADMIN = "System Admin",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  avatar?: string;
  joinDate?: string;
  skills?: string[];
}

export interface Employee {
  id: string;
  userId: string;
  user: User;
  departmentId?: string;
  department?: Department;
  position: string;
  dateOfJoining: Date;
  salary: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export enum AttendanceStatus {
  PRESENT = "PRESENT",
  ABSENT = "ABSENT",
  LATE = "LATE",
  HALF_DAY = "HALF_DAY",
  LEAVE = "LEAVE",
}

export interface Attendance {
  id: string;
  employeeId: string;
  employee?: Employee;
  date: Date;
  clockIn: Date;
  clockOut: Date | null;
  status: AttendanceStatus;
  workHours: number;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum LeaveType {
  ANNUAL = "ANNUAL",
  SICK = "SICK",
  MATERNITY = "MATERNITY",
  PATERNITY = "PATERNITY",
  BEREAVEMENT = "BEREAVEMENT",
  UNPAID = "UNPAID",
  OTHER = "OTHER",
}

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export interface Leave {
  id: string;
  employeeId: string;
  employee?: Employee;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  reviewerId?: string;
  reviewer?: Employee;
  reviewNote?: string;
  duration: number;
  contactInfo?: string;
  attachmentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum PayrollStatus {
  DRAFT = "DRAFT",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export enum DocumentType {
  CONTRACT = "CONTRACT",
  ID = "ID",
  CERTIFICATE = "CERTIFICATE",
  RESUME = "RESUME",
  OTHER = "OTHER",
}
