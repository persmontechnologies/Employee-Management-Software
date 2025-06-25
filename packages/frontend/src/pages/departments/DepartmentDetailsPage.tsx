// src/pages/departments/DepartmentDetailsPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useDepartment } from '../../lib/api-hooks';

const DepartmentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch department data
  const { data: department, isLoading, error } = useDepartment(id || '');
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !department) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
        Error loading department details. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Department Details</h1>
        <div className="flex gap-3">
          <button 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600 transition"
            onClick={() => navigate(`/departments/${id}/edit`)}
          >
            Edit Department
          </button>
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => navigate('/departments')}
          >
            Back to List
          </button>
        </div>
      </div>
      
      {/* Department info card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{department.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Created On</p>
            <p className="font-medium">{new Date(department.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="font-medium">{new Date(department.updatedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department ID</p>
            <p className="font-medium">{department.id.slice(0, 8)}</p>
          </div>
        </div>
      </div>
      
      {/* Department statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Employees</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">24</p>
            <p className="text-sm text-gray-500 mt-1">Total Employees</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Attendance</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">92%</p>
            <p className="text-sm text-gray-500 mt-1">Average Attendance</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Budget</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">$120,000</p>
            <p className="text-sm text-gray-500 mt-1">Annual Budget</p>
          </div>
        </div>
      </div>
      
      {/* Employee listing */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Department Employees</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Mock employee data - would be replaced with real data in production */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                      JD
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        John Doe
                      </div>
                      <div className="text-sm text-gray-500">john.doe@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Software Engineer</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Jan 15, 2022</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => navigate(`/employees/1`)}
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                      JS
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Jane Smith
                      </div>
                      <div className="text-sm text-gray-500">jane.smith@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Senior Developer</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Mar 8, 2021</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => navigate(`/employees/2`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetailsPage;