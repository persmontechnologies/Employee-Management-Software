// src/pages/dashboard/DashboardPage.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserRole } from "../../types/local-types";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

// Component for displaying metric cards with glassmorphism design
const MetricCard = ({
  title,
  value,
  icon,
  change,
  changeType = "neutral",
  linkTo,
}: {
  title: string;
  value: string | number;
  icon: JSX.Element;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  linkTo?: string;
}) => {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (linkTo) {
      return (
        <Link
          to={linkTo}
          className="block transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <CardWrapper>
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
          </div>
          <div
            className={`p-3 rounded-full 
            ${
              changeType === "positive"
                ? "bg-green-100 text-green-600"
                : changeType === "negative"
                ? "bg-red-100 text-red-600"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {icon}
          </div>
        </div>
        {change && (
          <div className="mt-2">
            <span
              className={`text-xs font-medium 
              ${
                changeType === "positive"
                  ? "text-green-600"
                  : changeType === "negative"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {changeType === "positive" && "↑ "}
              {changeType === "negative" && "↓ "}
              {change}
            </span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

// Component for displaying upcoming events
const EventCard = ({
  title,
  date,
  type,
  status,
}: {
  title: string;
  date: string;
  type: string;
  status: "pending" | "approved" | "rejected" | "completed";
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <span className="px-3 py-1 text-xs rounded-xl bg-yellow-100/80 text-yellow-700 font-medium border border-yellow-200/50">
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="px-3 py-1 text-xs rounded-xl bg-green-100/80 text-green-700 font-medium border border-green-200/50">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 text-xs rounded-xl bg-red-100/80 text-red-700 font-medium border border-red-200/50">
            Rejected
          </span>
        );
      case "completed":
        return (
          <span className="px-3 py-1 text-xs rounded-xl bg-blue-100/80 text-blue-700 font-medium border border-blue-200/50">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex items-center p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      <div className="relative flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
        {type === "leave" && (
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
        {type === "meeting" && (
          <svg
            className="h-6 w-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        )}
        {type === "task" && (
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        )}
        {type === "review" && (
          <svg
            className="h-6 w-6 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </div>
      <div className="relative ml-4 flex-1">
        <p className="text-sm font-bold text-gray-800 mb-1">{title}</p>
        <p className="text-xs text-gray-600 bg-gray-100/80 px-2 py-1 rounded-lg inline-block">
          {date}
        </p>
      </div>
      <div className="relative ml-auto">{getStatusBadge()}</div>
    </div>
  );
};

// Component for displaying announcements
const AnnouncementCard = ({
  title,
  content,
  date,
  author,
}: {
  title: string;
  content: string;
  date: string;
  author: string;
}) => {
  return (
    <div className="relative bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/30 hover:bg-white/60 transition-all duration-300 group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl group-hover:blur-lg transition-all duration-300"></div>
      <div className="relative">
        <h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-2 mb-4">
          {content}
        </p>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500 bg-gray-100/80 px-3 py-1 rounded-full">
            {date}
          </span>
          <span className="text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full font-medium">
            By: {author}
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard component
const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch user data
  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userData = localStorage.getItem("persmon_user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    // Update date every minute
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Format the current date
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Functions to render role-specific content
  const renderAdminMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Total Employees"
        value={124}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        }
        change="↑ 6% from last month"
        changeType="positive"
        linkTo="/employees"
      />
      <MetricCard
        title="Departments"
        value={8}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        }
        linkTo="/departments"
      />
      <MetricCard
        title="Leave Requests"
        value={15}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
        change="5 pending approvals"
        linkTo="/leaves"
      />
      <MetricCard
        title="Performance Reviews"
        value={28}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        }
        change="Due this quarter"
        linkTo="/performance"
      />
    </div>
  );

  const renderHRMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Total Employees"
        value={124}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        }
        linkTo="/employees"
      />
      <MetricCard
        title="Leave Requests"
        value={15}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
        change="5 pending approvals"
        changeType="positive"
        linkTo="/leaves"
      />
      <MetricCard
        title="Today's Attendance"
        value="92%"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        change="↑ 3% from yesterday"
        changeType="positive"
        linkTo="/attendance"
      />
      <MetricCard
        title="Open Positions"
        value={7}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        }
        change="2 in final stage"
        linkTo="#"
      />
    </div>
  );

  const renderCFOMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Total Payroll"
        value="$387,250"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        change="↑ 2.4% from last month"
        changeType="positive"
        linkTo="/payroll"
      />
      <MetricCard
        title="Pending Approvals"
        value={8}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        change="Needs attention"
        changeType="negative"
        linkTo="/payroll"
      />
      <MetricCard
        title="Budget Utilized"
        value="68%"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            />
          </svg>
        }
        change="On track for Q2"
        linkTo="/finance/reports"
      />
      <MetricCard
        title="Expense Reports"
        value={15}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        }
        change="5 pending approval"
        linkTo="#"
      />
    </div>
  );

  const renderEmployeeMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="My Attendance"
        value="94%"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        change="This month"
        linkTo="/attendance/me"
      />
      <MetricCard
        title="Leave Balance"
        value="14 days"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        }
        change="Annual leave remaining"
        linkTo="/leaves/me"
      />
      <MetricCard
        title="Documents"
        value={8}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        }
        change="2 require attention"
        linkTo="/documents"
      />
      <MetricCard
        title="Next Review"
        value="42 days"
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        change="Quarterly review"
        linkTo="/profile"
      />
    </div>
  );

  // Get role-specific metrics
  const getRoleSpecificMetrics = () => {
    if (!user) return null;

    switch (user.role) {
      case UserRole.ADMIN:
        return renderAdminMetrics();
      case UserRole.HR:
        return renderHRMetrics();
      case UserRole.CFO:
        return renderCFOMetrics();
      case UserRole.EMPLOYEE:
      case UserRole.SYSTEM_ADMIN:
      default:
        return renderEmployeeMetrics();
    }
  };

  // Sample data for demonstration
  const announcements = [
    {
      id: 1,
      title: "Company Holiday Schedule Updated",
      content:
        "The holiday schedule for this year has been updated to include an additional company-wide day off on July 3rd. Please adjust your project timelines accordingly.",
      date: "April 2, 2025",
      author: "HR Department",
    },
    {
      id: 2,
      title: "New Health Insurance Benefits",
      content:
        "We're excited to announce improvements to our health insurance package starting next month. All employees will receive details via email this week.",
      date: "March 30, 2025",
      author: "Benefits Team",
    },
    {
      id: 3,
      title: "Quarterly All-Hands Meeting",
      content:
        "Our Q2 all-hands meeting is scheduled for April 15th at 10:00 AM. Please submit any questions or topics you'd like to discuss by April 10th.",
      date: "March 28, 2025",
      author: "Executive Team",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Team Building Workshop",
      date: "April 12, 2025",
      type: "meeting",
      status: "approved" as const,
    },
    {
      id: 2,
      title: "Project Milestone Review",
      date: "April 8, 2025",
      type: "task",
      status: "pending" as const,
    },
    {
      id: 3,
      title: "Annual Leave - John Smith",
      date: "April 10-15, 2025",
      type: "leave",
      status: "approved" as const,
    },
    {
      id: 4,
      title: "Performance Review",
      date: "April 20, 2025",
      type: "review",
      status: "pending" as const,
    },
    {
      id: 5,
      title: "Department Budget Meeting",
      date: "April 7, 2025",
      type: "meeting",
      status: "pending" as const,
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-20 w-60 h-60 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="mt-2 text-gray-600 font-medium">
                  {formattedDate}
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-white/30">
                  <div className="mr-4">
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      Welcome back,
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {user?.firstName} {user?.lastName}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {user?.firstName.charAt(0)}
                      {user?.lastName.charAt(0)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific metrics */}
        {getRoleSpecificMetrics()}

        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Announcements */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 border-b border-white/30 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Company Announcements
                </h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all duration-200">
                  View All
                </button>
              </div>
              <div className="p-6 space-y-4">
                {announcements.map((announcement) => (
                  <AnnouncementCard
                    key={announcement.id}
                    title={announcement.title}
                    content={announcement.content}
                    date={announcement.date}
                    author={announcement.author}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden">
              {" "}
              <div className="p-6 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-b border-white/30 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 text-purple-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Upcoming Events
                </h2>
                <button className="text-sm font-medium text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-all duration-200">
                  View Calendar
                </button>
              </div>
              <div className="p-6">
                {" "}
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      date={event.date}
                      type={event.type}
                      status={event.status}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
