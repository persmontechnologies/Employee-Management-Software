import React, { useState } from "react";

const PayrollReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState("summary");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-04-30");
  const [department, setDepartment] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Mock report generation with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowReport(true);
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Payroll Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report generation form */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Generate Report</h2>
            <form onSubmit={handleGenerateReport}>
              <div className="mb-4">
                <label
                  htmlFor="reportType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Report Type
                </label>
                <select
                  id="reportType"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="summary">Payroll Summary</option>
                  <option value="detailed">Detailed Payroll</option>
                  <option value="tax">Tax Withholdings</option>
                  <option value="department">Department Breakdown</option>
                  <option value="ytd">Year-to-Date</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  id="department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 
                    ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isGenerating ? "Generating..." : "Generate Report"}
                </button>
              </div>
            </form>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Saved Reports
              </h3>
              <ul className="text-sm">
                <li className="py-1 border-b">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Q1 2025 Summary Report
                  </a>
                </li>
                <li className="py-1 border-b">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    March 2025 - Tax Report
                  </a>
                </li>
                <li className="py-1 border-b">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    YTD Report - April 2025
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Report display area */}
        <div className="lg:col-span-2">
          {!showReport ? (
            <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg">Generate a report to view it here</p>
                <p className="text-sm mt-2">
                  Select the report type and date range from the form
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">
                  {reportType === "summary"
                    ? "Payroll Summary Report"
                    : reportType === "detailed"
                    ? "Detailed Payroll Report"
                    : reportType === "tax"
                    ? "Tax Withholdings Report"
                    : reportType === "department"
                    ? "Department Breakdown Report"
                    : "Year-to-Date Report"}
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                    <span className="mr-1">📥</span> Download CSV
                  </button>
                  <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                    <span className="mr-1">📄</span> PDF
                  </button>
                  <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                    <span className="mr-1">🖨️</span> Print
                  </button>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm">
                <span className="font-medium">Report Period:</span>{" "}
                {new Date(startDate).toLocaleDateString()} -{" "}
                {new Date(endDate).toLocaleDateString()} |
                <span className="font-medium ml-3">Department:</span>{" "}
                {department === "all"
                  ? "All Departments"
                  : department.charAt(0).toUpperCase() +
                    department.slice(1)}{" "}
                |<span className="font-medium ml-3">Generated:</span>{" "}
                {new Date().toLocaleString()}
              </div>

              {/* Sample report content - this would be dynamic based on the selected report type */}
              {reportType === "summary" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Payroll</p>
                      <p className="text-xl font-bold">$726,350.00</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Employees</p>
                      <p className="text-xl font-bold">48</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Avg. Per Employee</p>
                      <p className="text-xl font-bold">$15,132.29</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Month
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Payroll
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Basic Salary
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Overtime
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bonuses
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tax Withholding
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            January 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $238,450.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $215,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $12,450.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $11,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $47,690.00
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            February 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $239,450.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $215,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $13,450.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $11,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $47,890.00
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            March 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $241,580.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $215,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $15,580.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $11,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            $48,316.00
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            Total
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $726,350.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $645,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $41,480.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $33,000.00
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            $143,896.00
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollReportsPage;
