// src/components/layout/AuthLayout.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

/**
 * AuthLayout - Layout for authentication pages (login, register)
 * 
 * Features:
 * - Redirects to dashboard if user is already authenticated
 * - Provides consistent styling for auth pages
 * - Renders the current auth page using Outlet from react-router
 */
const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      <div className="w-full max-w-md">
        {/* Auth pages will be rendered here via Outlet */}
        <Outlet />
        
        {/* Footer */}
        <p className="mt-6 text-center text-gray-200 text-sm">
          &copy; {new Date().getFullYear()} Persmon EMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;