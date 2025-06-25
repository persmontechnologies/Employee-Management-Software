import React, { useState } from "react";

const SystemLogsPage: React.FC = () => {
  const [logs] = useState([
    {
      id: 1,
      timestamp: "2025-04-05 10:23:45",
      level: "ERROR",
      source: "Authentication Service",
      message:
        "Failed login attempt for user john.doe@example.com from IP 192.168.1.105",
      user: "john.doe@example.com",
    },
    {
      id: 2,
      timestamp: "2025-04-05 10:15:22",
      level: "INFO",
      source: "Employee Service",
      message: "Employee record updated: ID #1045 (Sarah Johnson)",
      user: "admin@persmon-ems.com",
    },
    {
      id: 3,
      timestamp: "2025-04-05 09:58:11",
      level: "WARNING",
      source: "Payroll Service",
      message: "Duplicate tax entry detected for employee ID #892",
      user: "finance@persmon-ems.com",
    },
    {
      id: 4,
      timestamp: "2025-04-05 09:45:30",
      level: "INFO",
      source: "System",
      message: "Scheduled backup completed successfully",
      user: "system",
    },
    {
      id: 5,
      timestamp: "2025-04-05 09:30:12",
      level: "ERROR",
      source: "Document Service",
      message: "Failed to generate PDF for employee ID #721",
      user: "hr.manager@persmon-ems.com",
    },
    {
      id: 6,
      timestamp: "2025-04-05 09:22:05",
      level: "INFO",
      source: "Authentication Service",
      message: "User richard.smith@example.com logged in successfully",
      user: "richard.smith@example.com",
    },
    {
      id: 7,
      timestamp: "2025-04-05 09:15:45",
      level: "INFO",
      source: "Leave Service",
      message: "Leave request approved for employee ID #348",
      user: "department.head@persmon-ems.com",
    },
    {
      id: 8,
      timestamp: "2025-04-05 09:10:33",
      level: "WARNING",
      source: "Performance Service",
      message: "Review deadline approaching for 12 employees",
      user: "system",
    },
    {
      id: 9,
      timestamp: "2025-04-05 09:02:18",
      level: "INFO",
      source: "System",
      message: "Daily system health check completed",
      user: "system",
    },
    {
      id: 10,
      timestamp: "2025-04-05 08:55:27",
      level: "ERROR",
      source: "Email Service",
      message:
        "Failed to send notification email to user lisa.wong@example.com",
      user: "system",
    },
  ]);

  const [filterLevel, setFilterLevel] = useState("all");
  const [filterSource, setFilterSource] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const filteredLogs = logs.filter((log) => {
    const levelMatch = filterLevel === "all" || log.level === filterLevel;
    const sourceMatch = filterSource === "all" || log.source === filterSource;
    const searchMatch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());

    return levelMatch && sourceMatch && searchMatch;
  });

  // Get unique sources for filter dropdown
  const sources = Array.from(new Set(logs.map((log) => log.source)));

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case "ERROR":
        return "bg-red-100 text-red-800";
      case "WARNING":
        return "bg-yellow-100 text-yellow-800";
      case "INFO":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">System Logs</h1>
        <p className="text-gray-500 mt-1">
          View and filter system activity logs
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search logs..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-auto">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="INFO">Info</option>
              <option value="WARNING">Warning</option>
              <option value="ERROR">Error</option>
            </select>
          </div>

          <div className="w-auto">
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Sources</option>
              {sources.map((source, index) => (
                <option key={index} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div className="w-auto">
            <input
              type="date"
              placeholder="Start date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>

          <div className="w-auto">
            <input
              type="date"
              placeholder="End date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>

          <div className="w-auto">
            <button
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              onClick={() => {
                setFilterLevel("all");
                setFilterSource("all");
                setSearchQuery("");
                setDateRange({ start: "", end: "" });
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLevelBadgeClass(
                        log.level
                      )}`}
                    >
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.source}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-md truncate">{log.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <button className="text-blue-600 hover:text-blue-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No logs found matching your filters.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg mt-4">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredLogs.length}</span> of{" "}
              <span className="font-medium">{filteredLogs.length}</span> results
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
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Export Option */}
      <div className="mt-6 flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Export Logs
        </button>
      </div>
    </div>
  );
};

export default SystemLogsPage;
