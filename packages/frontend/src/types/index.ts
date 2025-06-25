// packages/frontend/src/types/index.ts
// Import from shared package
import {
  User,
  UserRole,
  Department,
  Employee,
  Attendance,
  AttendanceStatus,
  Leave,
  LeaveType,
  LeaveStatus,
  Payroll,
  PayrollStatus,
  PerformanceReview,
  Document,
  DocumentType,
} from "shared";

// Re-export the types with "export type" to fix TS1205 errors
export {
  UserRole,
  AttendanceStatus,
  LeaveType,
  LeaveStatus,
  PayrollStatus,
  DocumentType,
};
export type {
  User,
  Department,
  Employee,
  Attendance,
  Leave,
  Payroll,
  PerformanceReview,
  Document,
};

// Additional frontend-specific types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
