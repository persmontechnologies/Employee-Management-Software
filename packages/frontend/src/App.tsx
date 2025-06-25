import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginPage from "./pages/auth/LoginPage";

// Dashboard Pages
import DashboardPage from "./pages/dashboard/DashboardPage";

// Employee Management Pages
import EmployeesPage from "./pages/employees/EmployeesPage";
import EmployeeFormPage from "./pages/employees/EmployeeFormPage";
import EmployeeDetailsPage from "./pages/employees/EmployeeDetailsPage";

// Department Management Pages
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import DepartmentFormPage from "./pages/departments/DepartmentFormPage";

// Attendance Management Pages
import AttendancePage from "./pages/attendance/AttendancePage";
import AttendanceReportPage from "./pages/attendance/AttendanceReportPage";
import MyAttendancePage from "./pages/attendance/MyAttendancePage";

// Leave Management Pages
import LeavesPage from "./pages/leaves/LeavesPage";
import LeaveFormPage from "./pages/leaves/LeaveFormPage";
import MyLeavesPage from "./pages/leaves/MyLeavesPage";

// Document Management Pages
import DocumentsPage from "./pages/documents/DocumentsPage";
import DocumentUploadPage from "./pages/documents/DocumentUploadPage";

// Payroll Management Pages
import PayrollsPage from "./pages/payrolls/PayrollsPage";
import PayrollProcessPage from "./pages/payrolls/PayrollProcessPage";
import PayrollReportsPage from "./pages/payrolls/PayrollReportsPage";

// Performance Review Pages
import PerformanceReviewsPage from "./pages/performance-reviews/PerformanceReviewsPage";
import PerformanceReviewFormPage from "./pages/performance-reviews/PerformanceReviewFormPage";

// Finance Pages
import FinanceReportsPage from "./pages/finance/FinanceReportsPage";

// System Admin Pages
import UsersPage from "./pages/system/UsersPage";
import SettingsPage from "./pages/system/SettingsPage";
import SystemLogsPage from "./pages/system/SystemLogsPage";

// User Profile Pages
import ProfilePage from "./pages/profile/ProfilePage";

// Not Found Page
import NotFoundPage from "./pages/NotFoundPage";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {" "}
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route
            path="/login"
            element={<Navigate to="/auth/login" replace />}
          />

          {/* Main Layout - Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />

            {/* Employee Management */}
            <Route path="employees">
              <Route index element={<EmployeesPage />} />
              <Route path="new" element={<EmployeeFormPage />} />
              <Route path=":id/edit" element={<EmployeeFormPage />} />
              <Route path=":id" element={<EmployeeDetailsPage />} />
            </Route>

            {/* Department Management */}
            <Route path="departments">
              <Route index element={<DepartmentsPage />} />
              <Route path="new" element={<DepartmentFormPage />} />
              <Route path=":id/edit" element={<DepartmentFormPage />} />
            </Route>

            {/* Attendance Management */}
            <Route path="attendance">
              <Route index element={<AttendancePage />} />
              <Route path="me" element={<MyAttendancePage />} />
              <Route path="report" element={<AttendanceReportPage />} />
            </Route>

            {/* Leave Management */}
            <Route path="leaves">
              <Route index element={<LeavesPage />} />
              <Route path="me" element={<MyLeavesPage />} />
              <Route path="request" element={<LeaveFormPage />} />
              <Route path=":id/edit" element={<LeaveFormPage />} />
            </Route>

            {/* Document Management */}
            <Route path="documents">
              <Route index element={<DocumentsPage />} />
              <Route path="upload" element={<DocumentUploadPage />} />
            </Route>

            {/* Payroll Management */}
            <Route path="payroll">
              <Route index element={<PayrollsPage />} />
              <Route path="process" element={<PayrollProcessPage />} />
              <Route path="reports" element={<PayrollReportsPage />} />
            </Route>

            {/* Performance Reviews */}
            <Route path="performance">
              <Route index element={<PerformanceReviewsPage />} />
              <Route path="new" element={<PerformanceReviewFormPage />} />
              <Route path=":id/edit" element={<PerformanceReviewFormPage />} />
            </Route>

            {/* Finance */}
            <Route path="finance">
              <Route path="reports" element={<FinanceReportsPage />} />
            </Route>

            {/* System Admin */}
            <Route path="users" element={<UsersPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="logs" element={<SystemLogsPage />} />

            {/* User Profile */}
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>{" "}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
