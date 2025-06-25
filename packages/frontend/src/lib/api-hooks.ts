import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, post, put, patch, del } from "./api-client";
import {
  User,
  Employee,
  Department,
  Attendance,
  Leave,
  // Removed unused imports: Payroll, PerformanceReview, Document
} from "shared";

// Authentication API types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

// ===== Authentication Hooks =====

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      post<AuthResponse>("/auth/login", credentials),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) =>
      post<AuthResponse>("/auth/register", data),
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => get<User>("/auth/profile"),
  });
};

// ===== Employees Hooks =====

export const useEmployees = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ["employees", filters],
    queryFn: () => get<Employee[]>("/employees", { params: filters }),
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => get<Employee>(`/employees/${id}`),
    enabled: !!id, // Only run query if ID exists
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => post<Employee>("/employees", data),
    onSuccess: () => {
      // Invalidate employees list query to refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      put<Employee>(`/employees/${id}`, data),
    onSuccess: (_, variables) => {
      // Changed 'data' to '_' to mark as unused
      // Invalidate specific employee and list
      queryClient.invalidateQueries({ queryKey: ["employees", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => del<Employee>(`/employees/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

// ===== Departments Hooks =====

export const useDepartments = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ["departments", filters],
    queryFn: () => get<Department[]>("/departments", { params: filters }),
  });
};

export const useDepartment = (id: string) => {
  return useQuery({
    queryKey: ["departments", id],
    queryFn: () => get<Department>(`/departments/${id}`),
    enabled: !!id, // Only run query if ID exists
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => post<Department>("/departments", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      put<Department>(`/departments/${id}`, data),
    onSuccess: (_, variables) => {
      // Changed 'data' to '_' to mark as unused
      queryClient.invalidateQueries({
        queryKey: ["departments", variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => del<Department>(`/departments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

// ===== Attendance Hooks =====

export const useAttendances = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ["attendances", filters],
    queryFn: () => get<Attendance[]>("/attendance", { params: filters }),
  });
};

export const useAttendance = (id: string) => {
  return useQuery({
    queryKey: ["attendances", id],
    queryFn: () => get<Attendance>(`/attendance/${id}`),
    enabled: !!id,
  });
};

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => post<Attendance>("/attendance", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
    },
  });
};

export const useClockIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => post<Attendance>("/attendance/clock-in", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
    },
  });
};

export const useClockOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ employeeId, data }: { employeeId: string; data?: any }) =>
      post<Attendance>(`/attendance/clock-out/${employeeId}`, data || {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
    },
  });
};

// ===== Leaves Hooks =====

export const useLeaves = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ["leaves", filters],
    queryFn: () => get<Leave[]>("/leaves", { params: filters }),
  });
};

export const useLeave = (id: string) => {
  return useQuery({
    queryKey: ["leaves", id],
    queryFn: () => get<Leave>(`/leaves/${id}`),
    enabled: !!id,
  });
};

export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => post<Leave>("/leaves", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};

export const useUpdateLeaveStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      patch<Leave>(`/leaves/${id}/status`, data),
    onSuccess: (_, variables) => {
      // Changed 'data' to '_' to mark as unused
      queryClient.invalidateQueries({ queryKey: ["leaves", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};

export const useUpdateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      patch<Leave>(`/leaves/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["leaves", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
  });
};

export const useMyLeaves = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: ["my-leaves", filters],
    queryFn: () => get<Leave[]>("/leaves/my/requests", { params: filters }),
  });
};

// We'll continue with payroll, performance reviews, and documents
// hooks as needed in subsequent phases

// Export all hooks for use in components
