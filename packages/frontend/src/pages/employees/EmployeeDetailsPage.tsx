// src/pages/employees/EmployeeDetailsPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployee } from '../../lib/api-hooks';
import { format } from 'date-fns';

const EmployeeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Fetch employee data
  const { data: employee, isLoading, error } = useEmployee(id || '');
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !employee) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
        Error loading employee details. Please try again.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <div className="flex gap-3">
          <button 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600 transition"
            onClick={() => navigate(`/employees/${id}/edit`)}
          >
            Edit Employee
          </button>
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => navigate('/employees')}
          >
            Back to List
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee profile card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-primary text-white flex items-center justify-center text-xl mb-4">
              {employee.user.firstName[0]}{employee.user.lastName[0]}
            </div>
            <h2 className="text-xl font-bold">{employee.user.firstName} {employee.user.lastName}</h2>
            <p className="text-gray-600 mb-2">{employee.position}</p>
            <p className="text-gray-500">{employee.department.name} Department</p>
            
            <div className="w-full mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{employee.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium">{employee.id.slice(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Joined</p>
                  <p className="font-medium">{format(new Date(employee.dateOfJoining), 'MMM dd, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{employee.user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Employment and salary information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Employment Information</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Position</p>
              <p className="font-medium">{employee.position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{employee.department.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Joining</p>
              <p className="font-medium">{format(new Date(employee.dateOfJoining), 'MMMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Employment Status</p>
              <p className="font-medium">Full-time</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-medium">${employee.salary.toLocaleString()}/year</p>
            </div>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-left">
              View Attendance Records
            </button>
            <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-left">
              View Leave History
            </button>
            <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition text-left">
              View Payroll Information
            </button>
            <button className="w-full px-4 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition text-left">
              View Performance Reviews
            </button>
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-left">
              View Documents
            </button>
          </div>
        </div>
      </div>
      
      {/* Additional employee information sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Attendance summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Attendance Summary</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Present Days</p>
              <p className="text-2xl font-bold text-green-600">85%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Absent Days</p>
              <p className="text-2xl font-bold text-red-600">5%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Late Days</p>
              <p className="text-2xl font-bold text-yellow-600">10%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Leave Days</p>
              <p className="text-2xl font-bold text-blue-600">12</p>
            </div>
          </div>
        </div>
        
        {/* Recent leaves */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Recent Leaves</h3>
          
          <ul className="divide-y divide-gray-200">
            <li className="py-3 flex justify-between">
              <div>
                <p className="text-sm font-medium">Annual Leave</p>
                <p className="text-xs text-gray-500">Jan 15 - Jan 20, 2023</p>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Approved
              </span>
            </li>
            <li className="py-3 flex justify-between">
              <div>
                <p className="text-sm font-medium">Sick Leave</p>
                <p className="text-xs text-gray-500">Mar 8 - Mar 9, 2023</p>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Approved
              </span>
            </li>
            <li className="py-3 flex justify-between">
              <div>
                <p className="text-sm font-medium">Annual Leave</p>
                <p className="text-xs text-gray-500">Jun 5 - Jun 9, 2023</p>
              </div>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;