import { useState } from "react";
import { Link } from "react-router-dom";
import { useLeaves } from "../../lib/api-hooks";
import { LeaveStatus, LeaveType, UserRole } from "../../types/local-types";
import { useAuthStore } from "../../store/auth";

// Date formatting utility
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const LeavesPage = () => {
  const user = useAuthStore((state) => state.user);
  const isManagerialRole =
    user?.role === UserRole.ADMIN || user?.role === UserRole.HR;

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [employeeFilter, setEmployeeFilter] = useState<string>("");

  // Fetch leaves with filters
  const {
    data: leaves,
    isLoading,
    refetch,
  } = useLeaves({
    status: statusFilter !== "all" ? statusFilter : undefined,
    employeeId: employeeFilter || undefined,
  });

  // Status badge color mapping
  const getStatusBadgeClass = (status: LeaveStatus) => {
    switch (status) {
      case LeaveStatus.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case LeaveStatus.APPROVED:
        return "bg-green-100 text-green-800";
      case LeaveStatus.REJECTED:
        return "bg-red-100 text-red-800";
      case LeaveStatus.CANCELLED:
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Leave type badge color mapping
  const getLeaveTypeBadgeClass = (leaveType: LeaveType) => {
    switch (leaveType) {
      case LeaveType.ANNUAL:
        return "bg-blue-100 text-blue-800";
      case LeaveType.SICK:
        return "bg-red-100 text-red-800";
      case LeaveType.MATERNITY:
      case LeaveType.PATERNITY:
        return "bg-purple-100 text-purple-800";
      case LeaveType.BEREAVEMENT:
        return "bg-gray-100 text-gray-800";
      case LeaveType.UNPAID:
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle leave approval
  const handleApproveLeave = async (id: string) => {
    try {
      // This would be replaced with actual API call
      alert(`Approving leave ${id}`);
      // After approval, refetch data
      refetch();
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  // Handle leave rejection
  const handleRejectLeave = async (id: string) => {
    try {
      // This would be replaced with actual API call
      alert(`Rejecting leave ${id}`);
      // After rejection, refetch data
      refetch();
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <div className="flex space-x-3 mt-2 sm:mt-0">
          {isManagerialRole && (
            <Link
              to="/leaves/report"
              className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 transition flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm4-1a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-2-7a1 1 0 00-1 1v3a1 1 0 102 0V5a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Leave Reports
            </Link>
          )}
          <Link
            to="/leaves/me"
            className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100 transition flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            My Leaves
          </Link>
          <Link
            to="/leaves/request"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Request Leave
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <h2 className="font-medium text-lg mb-3">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value={LeaveStatus.PENDING}>Pending</option>
              <option value={LeaveStatus.APPROVED}>Approved</option>
              <option value={LeaveStatus.REJECTED}>Rejected</option>
              <option value={LeaveStatus.CANCELLED}>Cancelled</option>
            </select>
          </div>

          {isManagerialRole && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee
              </label>
              <select
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Employees</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                <option value="3">Michael Brown</option>
              </select>
            </div>
          )}

          <div className="self-end">
            <button
              onClick={() => refetch()}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-medium text-lg">
            {isManagerialRole ? "Leave Requests" : "My Leave Requests"}
          </h2>
        </div>

        {isLoading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : leaves && leaves.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {isManagerialRole && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Employee
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Leave Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    {isManagerialRole && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {leave.employee?.firstName?.[0]}
                            {leave.employee?.lastName?.[0]}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {leave.employee?.firstName}{" "}
                              {leave.employee?.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {leave.employee?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getLeaveTypeBadgeClass(
                          leave.type
                        )}`}
                      >
                        {leave.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(leave.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(leave.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {leave.duration} {leave.duration === 1 ? "day" : "days"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          leave.status
                        )}`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {isManagerialRole &&
                      leave.status === LeaveStatus.PENDING ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveLeave(leave.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectLeave(leave.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : !isManagerialRole &&
                        leave.status === LeaveStatus.PENDING ? (
                        <Link
                          to={`/leaves/${leave.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </Link>
                      ) : (
                        <Link
                          to={`/leaves/${leave.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium">
              No leave requests found
            </h3>
            <p className="mt-1 text-sm">
              Get started by making a new leave request.
            </p>
            <div className="mt-6">
              <Link
                to="/leaves/request"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                New Leave Request
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeavesPage;
