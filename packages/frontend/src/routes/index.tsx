// src/routes/index.tsx
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { UserRole } from 'shared';

// Layouts
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

// Dashboard
import DashboardPage from '../pages/dashboard/DashboardPage';

// Employees
import EmployeesPage from '../pages/employees/EmployeesPage';
import EmployeeDetailsPage from '../pages/employees/EmployeeDetailsPage';
import EmployeeFormPage from '../pages/employees/EmployeeFormPage';

// Departments
import DepartmentsPage from '../pages/departments/DepartmentsPage';
import DepartmentDetailsPage from '../pages/departments/DepartmentDetailsPage';
import DepartmentFormPage from '../pages/departments/DepartmentFormPage';

// Define the roles that can access each route
type RouteRoles = UserRole[] | 'all' | 'auth';

// Interface for route definitions
interface AppRoute {
  path: string;
  element: React.ReactNode;
  roles: RouteRoles;
  children?: AppRoute[];
}

// Routes configuration
const routes: AppRoute[] = [
  // Public routes (no authentication required)
  {
    path: '/auth',
    element: <AuthLayout />,
    roles: 'all',
    children: [
      { path: 'login', element: <LoginPage />, roles: 'all' },
      { path: 'register', element: <RegisterPage />, roles: 'all' },
      { path: '', element: <Navigate to="/auth/login" replace />, roles: 'all' },
    ],
  },
  
  // Protected routes (authentication required)
  {
    path: '/',
    element: <MainLayout />,
    roles: 'auth', // Any authenticated user
    children: [
      // Dashboard
      { path: 'dashboard', element: <DashboardPage />, roles: 'auth' },
      
      // Employees - restricted to admin, HR, CFO
      { 
        path: 'employees', 
        element: <EmployeesPage />, 
        roles: [UserRole.ADMIN, UserRole.HR, UserRole.CFO] 
      },
      { 
        path: 'employees/:id', 
        element: <EmployeeDetailsPage />, 
        roles: [UserRole.ADMIN, UserRole.HR, UserRole.CFO] 
      },
      { 
        path: 'employees/new', 
        element: <EmployeeFormPage />, 
        roles: [UserRole.ADMIN, UserRole.HR] 
      },
      { 
        path: 'employees/:id/edit', 
        element: <EmployeeFormPage />, 
        roles: [UserRole.ADMIN, UserRole.HR] 
      },
      
      // Departments
      { 
        path: 'departments', 
        element: <DepartmentsPage />, 
        roles: [UserRole.ADMIN, UserRole.HR, UserRole.CFO] 
      },
      { 
        path: 'departments/:id', 
        element: <DepartmentDetailsPage />, 
        roles: [UserRole.ADMIN, UserRole.HR, UserRole.CFO] 
      },
      { 
        path: 'departments/new', 
        element: <DepartmentFormPage />, 
        roles: [UserRole.ADMIN, UserRole.HR] 
      },
      { 
        path: 'departments/:id/edit', 
        element: <DepartmentFormPage />, 
        roles: [UserRole.ADMIN, UserRole.HR] 
      },
      
      // Redirect root to dashboard
      { path: '', element: <Navigate to="/dashboard" replace />, roles: 'auth' },
    ],
  },
  
  // Fallback route for any unmatched paths
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />,
    roles: 'all',
  },
];

// Wrapper component for protected routes
interface ProtectedRouteProps {
  element: React.ReactNode;
  roles: RouteRoles;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // For routes accessible to any authenticated user
  if (roles === 'auth') {
    return <>{element}</>;
  }
  
  // For role-specific routes, check if user has permission
  if (Array.isArray(roles) && user?.role && roles.includes(user.role)) {
    return <>{element}</>;
  }
  
  // User doesn't have permission, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};

// Create protected versions of all routes
const getProtectedRoutes = (routes: AppRoute[]): AppRoute[] => {
  return routes.map(route => ({
    ...route,
    element: 
      route.roles === 'all' ? (
        route.element
      ) : (
        <ProtectedRoute element={route.element} roles={route.roles} />
      ),
    ...(route.children && { children: getProtectedRoutes(route.children) }),
  }));
};

// Apply protection to routes
const protectedRoutes = getProtectedRoutes(routes);

// Create router with protected routes
const router = createBrowserRouter(protectedRoutes);

// Router Provider component
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;