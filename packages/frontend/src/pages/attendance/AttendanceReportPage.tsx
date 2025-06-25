import { useState } from "react";
import { Link } from "react-router-dom";
import { useAttendances } from "../../lib/api-hooks";
import { AttendanceStatus } from "../../types/local-types";

const AttendanceReportPage = () => {
  const [reportParams, setReportParams] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    departmentId: "",
    employeeId: "",
    groupBy: "employee", // 'employee', 'department', 'date'
  });

  // Report data fetching - in real implementation, this would call a specialized report endpoint
  const { data: attendanceData, isLoading } = useAttendances({
    startDate: reportParams.startDate,
    endDate: reportParams.endDate,
    departmentId: reportParams.departmentId || undefined,
    employeeId: reportParams.employeeId || undefined,
  });

  // Summary statistics (simulated for this example)
  const reportStats = attendanceData
    ? {
        totalDays: 22, // Working days in the period
        presentCount: attendanceData.filter(
          (a) => a.status === AttendanceStatus.PRESENT
        ).length,
        absentCount: attendanceData.filter(
          (a) => a.status === AttendanceStatus.ABSENT
        ).length,
        lateCount: attendanceData.filter(
          (a) => a.status === AttendanceStatus.LATE
        ).length,
        leaveCount: attendanceData.filter(
          (a) => a.status === AttendanceStatus.LEAVE
        ).length,
        averageAttendance: Math.round(
          (attendanceData.filter(
            (a) =>
              a.status === AttendanceStatus.PRESENT ||
              a.status === AttendanceStatus.LATE
          ).length /
            (attendanceData.length || 1)) *
            100
        ),
      }
    : null;

  // Export report function
  const exportReport = () => {
    // In a real implementation, this would generate a PDF or Excel file
    alert("Report export functionality would be implemented here");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance Reports</h1>
        <Link
          to="/attendance"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Back to Attendance
        </Link>
      </div>

      {/* Report Parameters */}
      <div className="bg-white rounded-lg shadow mb-6 p-6">
        <h2 className="font-medium text-lg mb-4">Report Parameters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={reportParams.startDate}
              onChange={(e) =>
                setReportParams((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={reportParams.endDate}
              onChange={(e) =>
                setReportParams((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              value={reportParams.departmentId}
              onChange={(e) =>
                setReportParams((prev) => ({
                  ...prev,
                  departmentId: e.target.value,
                }))
              }
              className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Departments</option>
              <option value="1">Engineering</option>
              <option value="2">Marketing</option>
              <option value="3">Sales</option>
              <option value="4">Human Resources</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee
            </label>
            <select
              value={reportParams.employeeId}
              onChange={(e) =>
                setReportParams((prev) => ({
                  ...prev,
                  employeeId: e.target.value,
                }))
              }
              className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Employees</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
              <option value="3">Michael Johnson</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group By
            </label>
            <select
              value={reportParams.groupBy}
              onChange={(e) =>
                setReportParams((prev) => ({
                  ...prev,
                  groupBy: e.target.value,
                }))
              }
              className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="employee">Employee</option>
              <option value="department">Department</option>
              <option value="date">Date</option>
            </select>
          </div>

          <div className="self-end">
            <button
              onClick={() => {}}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Summary */}
      {reportStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Working Days</p>
            <p className="text-xl font-bold">{reportStats.totalDays}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Present</p>
            <p className="text-xl font-bold text-green-600">
              {reportStats.presentCount}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Absent</p>
            <p className="text-xl font-bold text-red-600">
              {reportStats.absentCount}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Late</p>
            <p className="text-xl font-bold text-yellow-600">
              {reportStats.lateCount}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">On Leave</p>
            <p className="text-xl font-bold text-blue-600">
              {reportStats.leaveCount}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-500 mb-1">Avg. Attendance</p>
            <p className="text-xl font-bold">
              {reportStats.averageAttendance}%
            </p>
          </div>
        </div>
      )}

      {/* Report Results */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-lg">Report Results</h2>
          <button
            onClick={exportReport}
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
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Export Report
          </button>
        </div>

        {isLoading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : attendanceData && attendanceData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {reportParams.groupBy === "employee"
                      ? "Employee"
                      : reportParams.groupBy === "department"
                      ? "Department"
                      : "Date"}
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Present
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Absent
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Late
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Leave
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Attendance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample report data - in a real app this would be dynamically generated */}
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reportParams.groupBy === "employee"
                      ? "John Doe"
                      : reportParams.groupBy === "department"
                      ? "Engineering"
                      : "Apr 1, 2025"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    18
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    91%
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reportParams.groupBy === "employee"
                      ? "Jane Smith"
                      : reportParams.groupBy === "department"
                      ? "Marketing"
                      : "Apr 2, 2025"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    20
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    0
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    95%
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reportParams.groupBy === "employee"
                      ? "Michael Johnson"
                      : reportParams.groupBy === "department"
                      ? "Sales"
                      : "Apr 3, 2025"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    82%
                  </td>
                </tr>
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
              No report data available
            </h3>
            <p className="mt-1 text-sm">
              Adjust your parameters and generate a report.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceReportPage;
