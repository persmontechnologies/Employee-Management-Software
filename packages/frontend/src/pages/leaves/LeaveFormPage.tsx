import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLeave, useCreateLeave, useUpdateLeave } from "../../lib/api-hooks";
import { LeaveType } from "../../types/local-types";
import { useAuthStore } from "../../store/auth";

// Form validation schema
const leaveFormSchema = z
  .object({
    type: z.string().min(1, "Leave type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z
      .string()
      .min(5, "Reason must be at least 5 characters")
      .max(500, "Reason cannot exceed 500 characters"),
    attachment: z.any().optional(),
    contactInfo: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end >= start;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

type LeaveFormData = z.infer<typeof leaveFormSchema>;

const LeaveFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isEditMode = !!id;

  // For file upload preview
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // API hooks
  const { data: leaveData, isLoading: isLoadingLeave } = useLeave(
    isEditMode ? id! : "",
    { enabled: isEditMode }
  );
  const createLeaveMutation = useCreateLeave();
  const updateLeaveMutation = useUpdateLeave();

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      type: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      reason: "",
      contactInfo: "",
    },
  });

  // Update form with existing leave data
  useEffect(() => {
    if (isEditMode && leaveData) {
      setValue("type", leaveData.type);
      setValue(
        "startDate",
        new Date(leaveData.startDate).toISOString().split("T")[0]
      );
      setValue(
        "endDate",
        new Date(leaveData.endDate).toISOString().split("T")[0]
      );
      setValue("reason", leaveData.reason || "");
      setValue("contactInfo", leaveData.contactInfo || "");

      // If attachment exists, we would set the preview here
      if (leaveData.attachmentUrl) {
        setFilePreview(leaveData.attachmentUrl);
      }
    }
  }, [isEditMode, leaveData, setValue]);

  // Watch for date changes to calculate duration
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Calculate leave duration (excluding weekends)
  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // If end date is before start date, return 0
    if (end < start) return 0;

    let days = 0;
    const current = new Date(start);
    current.setHours(0, 0, 0, 0);

    while (current <= end) {
      // Skip weekends (Saturday = 6, Sunday = 0)
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days++;
      }
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  // Calculate leave duration
  const leaveDuration = calculateDuration();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the file
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);

    // Update form with file
    setValue("attachment", file);
  };

  // Form submission handler
  const onSubmit = async (data: LeaveFormData) => {
    try {
      if (isEditMode) {
        // Update existing leave
        await updateLeaveMutation.mutateAsync({
          id: id!,
          data: {
            type: data.type as LeaveType,
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
            contactInfo: data.contactInfo || undefined,
            // Attachment would be handled by file upload service
          },
        });
      } else {
        // Create new leave request
        await createLeaveMutation.mutateAsync({
          employeeId: user?.id!,
          type: data.type as LeaveType,
          startDate: data.startDate,
          endDate: data.endDate,
          reason: data.reason,
          contactInfo: data.contactInfo || undefined,
          // Attachment would be handled by file upload service
        });
      }

      // Navigate back to leaves page
      navigate("/leaves/me");
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  // Loading state
  if (isEditMode && isLoadingLeave) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Leave Request" : "Request Leave"}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leave Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type*
              </label>
              <select
                {...register("type")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Leave Type</option>
                <option value={LeaveType.ANNUAL}>Annual Leave</option>
                <option value={LeaveType.SICK}>Sick Leave</option>
                <option value={LeaveType.MATERNITY}>Maternity Leave</option>
                <option value={LeaveType.PATERNITY}>Paternity Leave</option>
                <option value={LeaveType.BEREAVEMENT}>Bereavement Leave</option>
                <option value={LeaveType.UNPAID}>Unpaid Leave</option>
                <option value={LeaveType.OTHER}>Other</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Empty col for grid alignment */}
            <div className="hidden md:block"></div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date*
              </label>
              <input
                type="date"
                {...register("startDate")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date*
              </label>
              <input
                type="date"
                {...register("endDate")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
                min={startDate}
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            {/* Leave Duration (Calculated) */}
            <div className="bg-gray-50 p-4 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Duration (Working Days)
              </label>
              <div className="text-2xl font-bold text-indigo-700">
                {leaveDuration} {leaveDuration === 1 ? "day" : "days"}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Excludes weekends and holidays
              </p>
            </div>

            {/* Available Leave Balance */}
            <div className="bg-gray-50 p-4 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Leave Balance
              </label>
              <div className="text-2xl font-bold text-indigo-700">
                21 days {/* This would come from API in a real app */}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Annual leave remaining this year
              </p>
            </div>

            {/* Reason */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason*
              </label>
              <textarea
                {...register("reason")}
                rows={4}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.reason ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Please provide a detailed reason for your leave request"
              ></textarea>
              <div className="flex justify-between">
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.reason.message}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {watch("reason")?.length || 0}/500 characters
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact Information (Optional)
              </label>
              <input
                type="text"
                {...register("contactInfo")}
                placeholder="Phone number or email where you can be reached during leave"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Attachment */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supporting Documents (Optional)
              </label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition">
                  <span className="text-sm text-gray-700">Upload Document</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
                {filePreview && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 text-sm">Document attached</span>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                For sick leave, please attach a medical certificate if the leave
                is longer than 2 days.
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-5 border-t border-gray-200 mt-6">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  createLeaveMutation.isPending || updateLeaveMutation.isPending
                }
                className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {createLeaveMutation.isPending || updateLeaveMutation.isPending
                  ? "Submitting..."
                  : isEditMode
                  ? "Update Leave Request"
                  : "Submit Leave Request"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveFormPage;
