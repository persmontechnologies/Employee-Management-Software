import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Mock data for initial display
const defaultStats = {
  totalEmployees: 0,
  totalDepartments: 0,
  attendanceRate: 0,
  pendingLeaves: 0,
};

const defaultChartData = [
  { month: "Jan", present: 0, absent: 0, late: 0 },
  { month: "Feb", present: 0, absent: 0, late: 0 },
  { month: "Mar", present: 0, absent: 0, late: 0 },
  { month: "Apr", present: 0, absent: 0, late: 0 },
  { month: "May", present: 0, absent: 0, late: 0 },
  { month: "Jun", present: 0, absent: 0, late: 0 },
];

// Default activity data
const defaultActivityData = [
  {
    id: 1,
    user: "...",
    action: "...",
    time: "...",
    icon: "user",
  },
];

// Default department data
const defaultDepartmentData = [{ name: "No Data", count: 1 }];

const defaultChartColors = ["#4E77A3", "#FF6384", "#FFCE56"];

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(defaultStats);
  const [chartData, setChartData] = useState(defaultChartData);
  const [activityData, setActivityData] = useState(defaultActivityData);
  const [departmentData, setDepartmentData] = useState(defaultDepartmentData);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Simulated API call with timeout
        setTimeout(() => {
          const mockStats = {
            totalEmployees: 128,
            totalDepartments: 8,
            attendanceRate: 92,
            pendingLeaves: 14,
          };

          const mockChartData = [
            { month: "Jan", present: 85, absent: 5, late: 10 },
            { month: "Feb", present: 88, absent: 7, late: 5 },
            { month: "Mar", present: 90, absent: 3, late: 7 },
            { month: "Apr", present: 92, absent: 4, late: 4 },
            { month: "May", present: 91, absent: 6, late: 3 },
            { month: "Jun", present: 93, absent: 2, late: 5 },
          ];

          const mockActivityData = [
            {
              id: 1,
              user: "John Doe",
              action: "Submitted a leave request",
              time: "2 hours ago",
              icon: "user",
            },
            {
              id: 2,
              user: "Jane Smith",
              action: "Completed performance review",
              time: "5 hours ago",
              icon: "check",
            },
            {
              id: 3,
              user: "Mike Johnson",
              action: "Clocked in",
              time: "8 hours ago",
              icon: "calendar",
            },
            {
              id: 4,
              user: "Sarah Williams",
              action: "Updated profile",
              time: "1 day ago",
              icon: "user",
            },
            {
              id: 5,
              user: "Alex Brown",
              action: "Uploaded a document",
              time: "2 days ago",
              icon: "document",
            },
          ];

          const mockDepartmentData = [
            { name: "IT", count: 45 },
            { name: "HR", count: 12 },
            { name: "Finance", count: 18 },
            { name: "Marketing", count: 25 },
            { name: "Operations", count: 28 },
          ];

          setStats(mockStats);
          setChartData(mockChartData);
          setActivityData(mockActivityData);
          setDepartmentData(mockDepartmentData);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Icon components
  const icons = {
    user: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    check: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    calendar: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    document: (
      <svg
        className="h-5 w-5"
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
    ),
  };

  // Get icon based on type
  const getIcon = (iconType: string) => {
    return icons[iconType as keyof typeof icons] || icons.user;
  };

  // Get background color for icon
  const getIconBg = (iconType: string) => {
    const bgColors = {
      user: "bg-indigo-100 text-indigo-500",
      check: "bg-green-100 text-green-500",
      calendar: "bg-blue-100 text-blue-500",
      document: "bg-yellow-100 text-yellow-500",
    };

    return (
      bgColors[iconType as keyof typeof bgColors] || "bg-gray-100 text-gray-500"
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Activity Skeleton */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="p-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center py-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Total Employees
          </h3>
          <p className="text-3xl font-bold">{stats.totalEmployees}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Departments
          </h3>
          <p className="text-3xl font-bold">{stats.totalDepartments}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Today's Attendance
          </h3>
          <p className="text-3xl font-bold">{stats.attendanceRate}%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-500 mb-2">
            Pending Leaves
          </h3>
          <p className="text-3xl font-bold">{stats.pendingLeaves}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Attendance Bar Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Monthly Attendance</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#4E77A3" />
                <Bar dataKey="absent" stackId="a" fill="#FF6384" />
                <Bar dataKey="late" stackId="a" fill="#FFCE56" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Composition Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Department Composition</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({
                    name,
                    percent,
                  }: {
                    name: string;
                    percent: number;
                  }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        defaultChartColors[index % defaultChartColors.length]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Recent Activity</h3>
        </div>

        <div className="p-6">
          <ul className="divide-y divide-gray-200">
            {activityData.map((activity) => (
              <li key={activity.id} className="py-3">
                <div className="flex items-center">
                  <div
                    className={`mr-3 h-8 w-8 rounded-full flex items-center justify-center ${getIconBg(
                      activity.icon
                    )}`}
                  >
                    {getIcon(activity.icon)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Quick Access</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/employees"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-600 transition text-center"
          >
            Manage Employees
          </Link>
          <Link
            to="/attendance"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-600 transition text-center"
          >
            Attendance Reports
          </Link>
          <Link
            to="/payroll"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-600 transition text-center"
          >
            Process Payroll
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
