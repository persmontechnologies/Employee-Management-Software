// src/pages/employees/EmployeeFormPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  useEmployee, 
  useCreateEmployee, 
  useUpdateEmployee, 
  useDepartments 
} from '../../lib/api-hooks';

// Form validation schema
const employeeSchema = z.object({
  userId: z.string().optional(), // For existing user
  email: z.string().email('Please enter a valid email'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  departmentId: z.string().min(1, 'Please select a department'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  dateOfJoining: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Please enter a valid date',
  }),
  salary: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Salary must be a positive number',
  }),
  password: z.string().min(8, 'Password must be at least 8 characters').optional(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

const EmployeeFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  // React Query hooks
  const { data: employee, isLoading: isLoadingEmployee } = useEmployee(id || '');
  const { data: departments, isLoading: isLoadingDepartments } = useDepartments();
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  
  // Form validation
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      departmentId: '',
      position: '',
      dateOfJoining: new Date().toISOString().split('T')[0],
      salary: '',
      password: isEditMode ? undefined : '',
    },
  });
  
  // Reset form when employee data is loaded
  useEffect(() => {
    if (isEditMode && employee) {
      setValue('userId', employee.userId);
      setValue('email', employee.user.email);
      setValue('firstName', employee.user.firstName);
      setValue('lastName', employee.user.lastName);
      setValue('departmentId', employee.departmentId);
      setValue('position', employee.position);
      setValue('dateOfJoining', new Date(employee.dateOfJoining).toISOString().split('T')[0]);
      setValue('salary', employee.salary.toString());
    }
  }, [isEditMode, employee, setValue]);
  
  // Form submission handler
  const onSubmit = async (data: EmployeeFormData) => {
    try {
      if (isEditMode) {
        // Update existing employee
        await updateEmployee.mutateAsync({
          id: id!,
          data: {
            userId: employee!.userId,
            departmentId: data.departmentId,
            position: data.position,
            dateOfJoining: new Date(data.dateOfJoining),
            salary: parseFloat(data.salary),
            user: {
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              // Password only included if provided
              ...(data.password ? { password: data.password } : {})
            }
          }
        });
      } else {
        // Create new employee
        await createEmployee.mutateAsync({
          departmentId: data.departmentId,
          position: data.position,
          dateOfJoining: new Date(data.dateOfJoining),
          salary: parseFloat(data.salary),
          user: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            role: 'EMPLOYEE'
          }
        });
      }
      
      // Redirect to employees list
      navigate('/employees');
    } catch (error) {
      console.error('Error submitting employee form:', error);
    }
  };
  
  // Loading state
  if ((isEditMode && isLoadingEmployee) || isLoadingDepartments) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Employee' : 'Add Employee'}</h1>
        <button 
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          onClick={() => navigate('/employees')}
        >
          Cancel
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                  )}
                </div>
                
                {!isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                )}
                
                {isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password (leave blank to keep current)
                    </label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Employment Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Employment Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    {...register('departmentId')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.departmentId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a department</option>
                    {departments?.map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && (
                    <p className="mt-1 text-sm text-red-600">{errors.departmentId.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    {...register('position')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    {...register('dateOfJoining')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.dateOfJoining ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfJoining && (
                    <p className="mt-1 text-sm text-red-600">{errors.dateOfJoining.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary (per year)
                  </label>
                  <input
                    type="number"
                    {...register('salary')}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.salary ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.salary && (
                    <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Form actions */}
          <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-600 transition"
              disabled={createEmployee.isPending || updateEmployee.isPending}
            >
              {createEmployee.isPending || updateEmployee.isPending
                ? 'Saving...'
                : isEditMode ? 'Update Employee' : 'Create Employee'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormPage;