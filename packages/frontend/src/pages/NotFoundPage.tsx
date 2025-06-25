// src/pages/NotFoundPage.tsx
import { useNavigate } from 'react-router-dom';

/**
 * NotFoundPage - Displayed when a user accesses a non-existent route
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-2 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)} // Go back
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')} // Go to dashboard
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;