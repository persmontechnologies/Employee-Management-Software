// src/pages/departments/DepartmentsPage.tsx (Updated)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDepartments, useDeleteDepartment } from '../../lib/api-hooks';
import { Card, Button, Alert, Modal, ModalFooter } from '../../components/ui';

const DepartmentsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Fetch departments data
  const { data: departments, isLoading, error } = useDepartments();
  
  // Delete department mutation
  const deleteDepartment = useDeleteDepartment();
  
  // Filter departments based on search term
  const filteredDepartments = departments?.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle department deletion
  const handleDelete = async () => {
    if (!confirmDelete) return;
    
    try {
      await deleteDepartment.mutateAsync(confirmDelete);
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Departments</h1>
        <Button 
          variant="primary"
          onClick={() => navigate('/departments/new')}
        >
          Add Department
        </Button>
      </div>
      
      {/* Search box */}
      <Card className="mb-6">
        <input
          type="text"
          placeholder="Search departments..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>
      
      {/* Error state */}
      {error && (
        <Alert 
          variant="error" 
          message="Error loading departments. Please try again." 
        />
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Departments grid */}
      {!isLoading && !error && filteredDepartments && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department) => (
              <Card 
                key={department.id} 
                title={department.name}
                subtitle={`Created on ${new Date(department.createdAt).toLocaleDateString()}`}
                className="hover:shadow-md transition"
              >
                <div className="flex justify-end space-x-2 mt-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/departments/${department.id}`)}
                  >
                    View
                  </Button>
                  <Button 
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/departments/${department.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger"
                    size="sm"
                    onClick={() => setConfirmDelete(department.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3">
              <Card>
                <p className="text-gray-500 text-center">No departments found matching your search.</p>
              </Card>
            </div>
          )}
        </div>
      )}
      
      {/* Delete confirmation modal */}
      <Modal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirm Deletion"
        footer={
          <ModalFooter
            onCancel={() => setConfirmDelete(null)}
            onConfirm={handleDelete}
            confirmText="Delete"
            confirmVariant="danger"
            isConfirmLoading={deleteDepartment.isPending}
          />
        }
      >
        <p className="text-gray-600">
          Are you sure you want to delete this department? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default DepartmentsPage;