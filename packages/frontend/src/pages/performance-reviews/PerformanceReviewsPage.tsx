import React, { useState } from "react";
import { Link } from "react-router-dom";

const PerformanceReviewsPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("pending");

  const [pendingReviews] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      employee: "John Smith",
      position: "Frontend Developer",
      department: "Engineering",
      reviewType: "Annual",
      dueDate: "2025-04-15",
      status: "Pending",
      manager: "Sarah Johnson",
    },
    {
      id: 2,
      employeeId: "EMP032",
      employee: "Emily Davis",
      position: "Marketing Specialist",
      department: "Marketing",
      reviewType: "Annual",
      dueDate: "2025-04-18",
      status: "Pending",
      manager: "Michael Chen",
    },
    {
      id: 3,
      employeeId: "EMP045",
      employee: "Robert Wilson",
      position: "Backend Developer",
      department: "Engineering",
      reviewType: "Probation",
      dueDate: "2025-04-20",
      status: "Pending",
      manager: "Sarah Johnson",
    },
    {
      id: 4,
      employeeId: "EMP023",
      employee: "Lisa Thompson",
      position: "HR Coordinator",
      department: "Human Resources",
      reviewType: "Quarterly",
      dueDate: "2025-04-22",
      status: "Pending",
      manager: "David Williams",
    },
    {
      id: 5,
      employeeId: "EMP078",
      employee: "Michael Rogers",
      position: "Sales Associate",
      department: "Sales",
      reviewType: "Annual",
      dueDate: "2025-04-25",
      status: "Pending",
      manager: "Jennifer Lee",
    },
  ]);

  const [completedReviews] = useState([
    {
      id: 101,
      employeeId: "EMP012",
      employee: "Jessica Brown",
      position: "Product Manager",
      department: "Product",
      reviewType: "Annual",
      completionDate: "2025-03-15",
      status: "Completed",
      overallRating: 4.5,
      manager: "Thomas Anderson",
    },
    {
      id: 102,
      employeeId: "EMP056",
      employee: "Daniel Kim",
      position: "DevOps Engineer",
      department: "Engineering",
      reviewType: "Annual",
      completionDate: "2025-03-10",
      status: "Completed",
      overallRating: 4.2,
      manager: "Sarah Johnson",
    },
    {
      id: 103,
      employeeId: "EMP089",
      employee: "Laura Martinez",
      position: "Customer Support Specialist",
      department: "Customer Support",
      reviewType: "Probation",
      completionDate: "2025-03-05",
      status: "Completed",
      overallRating: 3.8,
      manager: "Kevin White",
    },
    {
      id: 104,
      employeeId: "EMP034",
      employee: "Alex Johnson",
      position: "Graphic Designer",
      department: "Marketing",
      reviewType: "Annual",
      completionDate: "2025-02-28",
      status: "Completed",
      overallRating: 4.0,
      manager: "Michael Chen",
    },
    {
      id: 105,
      employeeId: "EMP067",
      employee: "Samantha Wilson",
      position: "Financial Analyst",
      department: "Finance",
      reviewType: "Quarterly",
      completionDate: "2025-02-20",
      status: "Completed",
      overallRating: 4.7,
      manager: "Patricia Taylor",
    },
  ]);

  const [draftReviews] = useState([
    {
      id: 201,
      employeeId: "EMP015",
      employee: "Christopher Lee",
      position: "Project Manager",
      department: "Project Management",
      reviewType: "Annual",
      lastUpdated: "2025-04-01",
      status: "Draft",
      manager: "Thomas Anderson",
    },
    {
      id: 202,
      employeeId: "EMP042",
      employee: "Olivia Garcia",
      position: "Content Writer",
      department: "Marketing",
      reviewType: "Quarterly",
      lastUpdated: "2025-04-02",
      status: "Draft",
      manager: "Michael Chen",
    },
    {
      id: 203,
      employeeId: "EMP051",
      employee: "William Turner",
      position: "Software Engineer",
      department: "Engineering",
      reviewType: "Probation",
      lastUpdated: "2025-04-03",
      status: "Draft",
      manager: "Sarah Johnson",
    },
  ]);

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100 text-green-800";
    if (rating >= 3.5) return "bg-blue-100 text-blue-800";
    if (rating >= 2.5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Performance Reviews</h1>
          <p className="text-gray-500 mt-1">
            Manage employee performance evaluations
          </p>
        </div>
        <div>
          <Link
            to="/performance-reviews/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Review
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[250px]">
            <input
              type="text"
              placeholder="Search by employee name, ID, or department..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-auto">
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div className="w-auto">
            <select className="block w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Review Types</option>
              <option value="annual">Annual</option>
              <option value="quarterly">Quarterly</option>
              <option value="probation">Probation</option>
              <option value="performance-improvement">
                Performance Improvement
              </option>
            </select>
          </div>
          <div className="w-auto">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex border-b">
          <button
            onClick={() => setCurrentTab("pending")}
            className={`px-4 py-2 text-sm font-medium ${
              currentTab === "pending"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pending Reviews
          </button>
          <button
            onClick={() => setCurrentTab("draft")}
            className={`ml-8 px-4 py-2 text-sm font-medium ${
              currentTab === "draft"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Draft Reviews
          </button>
          <button
            onClick={() => setCurrentTab("completed")}
            className={`ml-8 px-4 py-2 text-sm font-medium ${
              currentTab === "completed"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Completed Reviews
          </button>
          <button
            onClick={() => setCurrentTab("all")}
            className={`ml-8 px-4 py-2 text-sm font-medium ${
              currentTab === "all"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            All Reviews
          </button>
        </nav>
      </div>

      {/* Pending Reviews Table */}
      {(currentTab === "pending" || currentTab === "all") &&
        pendingReviews.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">
                Pending Reviews
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position & Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {review.employee.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {review.employee}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.employeeId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {review.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {review.reviewType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.manager}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/performance-reviews/edit/${review.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Start Review
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900">
                            Reassign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* Draft Reviews Table */}
      {(currentTab === "draft" || currentTab === "all") &&
        draftReviews.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">
                Draft Reviews
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position & Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {draftReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {review.employee.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {review.employee}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.employeeId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {review.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          {review.reviewType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.lastUpdated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.manager}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/performance-reviews/edit/${review.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Continue
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900">
                            Discard
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* Completed Reviews Table */}
      {(currentTab === "completed" || currentTab === "all") &&
        completedReviews.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">
                Completed Reviews
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position & Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Overall Rating
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {review.employee.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {review.employee}
                            </div>
                            <div className="text-sm text-gray-500">
                              {review.employeeId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {review.position}
                        </div>
                        <div className="text-sm text-gray-500">
                          {review.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {review.reviewType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {review.completionDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingBadgeColor(
                            review.overallRating
                          )}`}
                        >
                          {review.overallRating} / 5
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/performance-reviews/view/${review.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                          <button className="text-gray-600 hover:text-gray-900">
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviewsPage;
