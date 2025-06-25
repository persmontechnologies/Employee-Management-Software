import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAttendances, useClockIn, useClockOut } from "../../lib/api-hooks";
import { AttendanceStatus } from "../../types/local-types";
import { useAuthStore } from "../../store/auth";

// Date formatting utilities
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatTime = (dateString: string | null | undefined) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const MyAttendancePage = () => {
  const user = useAuthStore((state) => state.user);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);

  // API hooks
  const clockInMutation = useClockIn();
  const clockOutMutation = useClockOut();
  const {
    data: attendances,
    isLoading,
    refetch,
  } = useAttendances({
    employeeId: user?.id,
    month: currentMonth + 1, // API expects 1-12
    year: currentYear,
  });

  // Determine today's attendance record
  useEffect(() => {
    if (!attendances) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecord = attendances.find((attendance) => {
      const recordDate = new Date(attendance.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });

    setTodayAttendance(todayRecord || null);

    // Disable clock-in button if we already clocked in
    // Disable clock-out button if we didn't clock in or already clocked out
    setIsButtonDisabled(false); // Reset first
    if (todayRecord) {
      if (!todayRecord.clockIn) {
        // Unusual state - we have a record but no clock in
        setIsButtonDisabled(true);
      } else if (!todayRecord.clockOut) {
        // We've clocked in but not out - can't clock in again
        document.getElementById("clockInBtn")?.setAttribute("disabled", "true");
      } else {
        // We've clocked in and out - can't do either again
        setIsButtonDisabled(true);
      }
    }
  }, [attendances]);

  // Month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Clock in/out functions
  const handleClockIn = async () => {
    if (!user?.id || todayAttendance?.clockIn) return;

    try {
      await clockInMutation.mutateAsync({ employeeId: user.id });
      // Refetch to update UI
      refetch();
    } catch (error) {
      console.error("Error clocking in:", error);
      // Show error message
    }
  };

  const handleClockOut = async () => {
    if (!user?.id || !todayAttendance || todayAttendance.clockOut) return;

    try {
      await clockOutMutation.mutateAsync({ employeeId: user.id });
      // Refetch to update UI
      refetch();
    } catch (error) {
      console.error("Error clocking out:", error);
      // Show error message
    }
  };

  // Status badge color mapping
  const getStatusBadgeClass = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return "bg-green-100 text-green-800";
      case AttendanceStatus.ABSENT:
        return "bg-red-100 text-red-800";
      case AttendanceStatus.LATE:
        return "bg-yellow-100 text-yellow-800";
      case AttendanceStatus.HALF_DAY:
        return "bg-orange-100 text-orange-800";
      case AttendanceStatus.LEAVE:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Current month name
  const currentMonthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Attendance</h1>
        <Link
          to="/attendance"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Back to Attendance Management
        </Link>
      </div>

      {/* Today's attendance card */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-medium text-lg mb-4">Today's Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Date</p>
            <p className="text-xl font-medium">
              {formatDate(new Date().toISOString())}
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Clock In</p>
            <p className="text-xl font-medium">
              {todayAttendance?.clockIn
                ? formatTime(todayAttendance.clockIn)
                : "-"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Clock Out</p>
            <p className="text-xl font-medium">
              {todayAttendance?.clockOut
                ? formatTime(todayAttendance.clockOut)
                : "-"}
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            {todayAttendance?.status ? (
              <span
                className={`px-2 py-1 text-sm rounded-full ${getStatusBadgeClass(
                  todayAttendance.status
                )}`}
              >
                {todayAttendance.status}
              </span>
            ) : (
              <span className="text-gray-500">Not yet recorded</span>
            )}
          </div>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            id="clockInBtn"
            onClick={handleClockIn}
            disabled={
              isButtonDisabled ||
              !!todayAttendance?.clockIn ||
              clockInMutation.isPending
            }
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {clockInMutation.isPending ? "Processing..." : "Clock In"}
          </button>

          <button
            id="clockOutBtn"
            onClick={handleClockOut}
            disabled={
              isButtonDisabled ||
              !todayAttendance?.clockIn ||
              !!todayAttendance?.clockOut ||
              clockOutMutation.isPending
            }
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {clockOutMutation.isPending ? "Processing..." : "Clock Out"}
          </button>
        </div>
      </div>

      {/* Monthly attendance record */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-medium text-lg">Monthly Attendance Record</h2>

          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <span className="mx-2 text-gray-700 font-medium">
              {currentMonthName} {currentYear}
            </span>

            <button
              onClick={goToNextMonth}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : attendances && attendances.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Clock In
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Clock Out
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Work Hours
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendances.map((attendance) => (
                  <tr key={attendance.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(attendance.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(attendance.date).toLocaleDateString("en-US", {
                        weekday: "long",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(attendance.clockIn)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(attendance.clockOut)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {attendance.workHours
                        ? `${attendance.workHours} hrs`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          attendance.status
                        )}`}
                      >
                        {attendance.status}
                      </span>
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
              No attendance records found
            </h3>
            <p className="mt-1 text-sm">
              There are no attendance records for this month.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAttendancePage;
