// src/pages/departments/DepartmentFormPage.tsx
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useDepartment,
  useCreateDepartment,
  useUpdateDepartment,
} from "../../lib/api-hooks";

// Form validation schema
const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters"),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

const DepartmentFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  // React Query hooks
  const { data: department, isLoading: isLoadingDepartment } = useDepartment(
    id || ""
  );
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();

  // Form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
    },
  });

  // Reset form when department data is loaded
  useEffect(() => {
    if (isEditMode && department) {
      setValue("name", department.name);
    }
  }, [isEditMode, department, setValue]);

  // Form submission handler
  const onSubmit = async (data: DepartmentFormData) => {
    try {
      if (isEditMode) {
        // Update existing department
        await updateDepartment.mutateAsync({
          id: id!,
          data: {
            name: data.name,
          },
        });
      } else {
        // Create new department
        await createDepartment.mutateAsync({
          name: data.name,
        });
      }

      // Redirect to departments list
      navigate("/departments");
    } catch (error) {
      console.error("Error submitting department form:", error);
    }
  };

  // Loading state
  if (isEditMode && isLoadingDepartment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Department" : "Add Department"}
        </h1>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          onClick={() => navigate("/departments")}
        >
          Cancel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              {...register("name")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Form actions */}
          <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-600 transition"
              disabled={
                createDepartment.isPending || updateDepartment.isPending
              }
            >
              {createDepartment.isPending || updateDepartment.isPending
                ? "Saving..."
                : isEditMode
                ? "Update Department"
                : "Create Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentFormPage;
