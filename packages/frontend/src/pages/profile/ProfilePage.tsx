// src/pages/profile/ProfilePage.tsx
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserRole } from "../../types/local-types";

// Form validation schema
const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .endsWith("@persmon.com", {
      message: "Email must be a Persmon company email",
    }),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, "Bio cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  department: z.string().min(2, "Please select a department"),
  location: z.string().min(2, "Please enter your location"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  jobTitle?: string;
  department?: string;
  location?: string;
  avatar?: string;
  joinDate?: string;
  skills?: string[];
  managerName?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // Fetch user data (from localStorage for demo)
  useEffect(() => {
    const fetchUser = () => {
      try {
        // In a real app, we would fetch this from an API
        const userData = localStorage.getItem("persmon_user");
        if (userData) {
          // Parse the stored user data
          const parsedUser = JSON.parse(userData);
          // In this demo, we'll add some mock additional fields
          const enhancedUser: User = {
            ...parsedUser,
            phone: parsedUser.phone || "+1 (555) 123-4567",
            bio:
              parsedUser.bio ||
              "Software developer with expertise in front-end technologies and a passion for creating intuitive user experiences.",
            jobTitle:
              parsedUser.jobTitle ||
              (parsedUser.role === UserRole.ADMIN
                ? "Director"
                : parsedUser.role === UserRole.HR
                ? "HR Manager"
                : parsedUser.role === UserRole.CFO
                ? "Chief Financial Officer"
                : parsedUser.role === UserRole.SYSTEM_ADMIN
                ? "System Administrator"
                : "Software Engineer"),
            department:
              parsedUser.department ||
              (parsedUser.role === UserRole.HR
                ? "Human Resources"
                : parsedUser.role === UserRole.CFO
                ? "Finance"
                : parsedUser.role === UserRole.SYSTEM_ADMIN
                ? "IT"
                : "Engineering"),
            location: parsedUser.location || "New York Office",
            joinDate: parsedUser.joinDate || "2024-01-15",
            managerName:
              parsedUser.managerName ||
              (parsedUser.role === UserRole.ADMIN ||
              parsedUser.role === UserRole.CFO
                ? "N/A"
                : "Alex Johnson"),
            skills: parsedUser.skills || [
              "JavaScript",
              "React",
              "TypeScript",
              "UI/UX Design",
            ],
          };
          setUser(enhancedUser);

          // Set form values
          Object.entries(enhancedUser).forEach(([key, value]) => {
            if (typeof value === "string" && key !== "id" && key !== "role") {
              setValue(key as keyof ProfileFormData, value);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [setValue]);

  // Submit form handler
  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSaving(true);
      setSaveError(null);
      setSaveSuccess(false);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        // Update user data
        const updatedUser = {
          ...user,
          ...data,
        };

        // Save to localStorage (in a real app, this would be an API call)
        localStorage.setItem("persmon_user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        setSaveSuccess(true);
        setTimeout(() => {
          setIsEditing(false);
          setSaveSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel edit mode
  const handleCancel = () => {
    if (user) {
      // Reset form with original values
      Object.entries(user).forEach(([key, value]) => {
        if (typeof value === "string" && key !== "id" && key !== "role") {
          setValue(key as keyof ProfileFormData, value);
        }
      });
    }
    setIsEditing(false);
    setSaveError(null);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Format join date
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="pb-5 border-b border-gray-200 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-secondary-700 text-white px-6 py-8 rounded-t-lg">
          <div className="flex flex-col md:flex-row items-center">
            {/* Profile Avatar */}
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center relative overflow-hidden border-4 border-white/30">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold">
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            {/* Profile Info */}
            <div className="md:ml-8 text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-lg opacity-90">{user.jobTitle}</p>
              <p className="text-white/75">
                {user.department} | {user.location}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  {user.role}
                </span>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                  <svg
                    className="-ml-1 mr-1.5 h-2 w-2 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="p-6">
          {/* Display Profile */}
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Full Name
                    </p>
                    <p className="text-base text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Email Address
                    </p>
                    <p className="text-base text-gray-900">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Phone Number
                    </p>
                    <p className="text-base text-gray-900">
                      {user.phone || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Bio</p>
                    <p className="text-base text-gray-900">{user.bio || "-"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Work Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Department
                    </p>
                    <p className="text-base text-gray-900">{user.department}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Job Title
                    </p>
                    <p className="text-base text-gray-900">{user.jobTitle}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Location
                    </p>
                    <p className="text-base text-gray-900">{user.location}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Manager</p>
                    <p className="text-base text-gray-900">
                      {user.managerName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Join Date
                    </p>
                    <p className="text-base text-gray-900">
                      {formatJoinDate(user.joinDate || "")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Skills & Expertise
                </h3>

                <div className="flex flex-wrap gap-2">
                  {user.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-primary-50 text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Edit Profile Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Success Message */}
              {saveSuccess && (
                <div className="p-4 mb-4 bg-green-50 border-l-4 border-green-400 text-green-700 flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Profile updated successfully!
                </div>
              )}

              {/* Error Message */}
              {saveError && (
                <div className="p-4 mb-4 bg-red-50 border-l-4 border-red-400 text-red-700 flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {saveError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.firstName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.lastName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    {...register("phone")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    {...register("jobTitle")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.jobTitle
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <select
                    id="department"
                    {...register("department")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.department
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Finance">Finance</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    {...register("location")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.location
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={3}
                    {...register("bio")}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${
                      errors.bio
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end space-x-3 border-t pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
