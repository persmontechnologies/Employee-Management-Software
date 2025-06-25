// src/pages/employees/EmployeesPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees, useDeleteEmployee } from '../../lib/api-hooks';
import { Employee } from 'shared';

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Fetch employees data
  const { data: employees, isLoading, error } = useEmployees();
  
  // Delete employee mutation
  const deleteEmployee = useDeleteEmployee();
  
  // Filter employees based on search term
  const filteredEmployees = employees?.filter(employee => 
    employee.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle employee deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee.mutateAsync(id);
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button 
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600 transition"
          onClick={() => navigate('/employees/new')}
        >
          Add Employee
        </button>
      </div>
      
      {/* Search and filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/4">
            <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          Error loading employees. Please try again.
        </div>
      )}
      
      {/* Employees table */}
      {!isLoading && !error && filteredEmployees && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
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
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                            {employee.user.firstName[0]}{employee.user.lastName[0]}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {employee.user.firstName} {employee.user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{employee.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.department.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(employee.dateOfJoining).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => navigate(`/employees/${employee.id}`)}
                        >
                          View
                        </button>
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={() => navigate(`/employees/${employee.id}/edit`)}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => setConfirmDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No employees found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this employee? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={() => handleDelete(confirmDelete)}
                disabled={deleteEmployee.isPending}
              >
                {deleteEmployee.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;