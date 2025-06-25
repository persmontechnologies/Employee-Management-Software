import React, { useState } from "react";

const FinanceReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState("income");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-04-30");
  const [viewMode, setViewMode] = useState("chart");
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
      <h1 className="text-2xl font-semibold mb-6">Finance Reports</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report generation sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-20">
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
                  <option value="income">Income Statement</option>
                  <option value="balance">Balance Sheet</option>
                  <option value="cash-flow">Cash Flow</option>
                  <option value="expense">Expense Report</option>
                  <option value="payroll">Payroll Summary</option>
                  <option value="tax">Tax Report</option>
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

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  View Mode
                </label>
                <div className="flex border rounded-md overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode("chart")}
                    className={`flex-1 px-4 py-2 text-sm ${
                      viewMode === "chart"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("table")}
                    className={`flex-1 px-4 py-2 text-sm border-l ${
                      viewMode === "table"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Table
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Options
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="compare-prev-period"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="compare-prev-period"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Compare to previous period
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="include-projections"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="include-projections"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Include projections
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="include-taxes"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <label
                      htmlFor="include-taxes"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Include taxes
                    </label>
                  </div>
                </div>
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
              <ul className="text-sm space-y-1">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Q1 2025 Income Statement
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    March 2025 Expense Report
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    YTD Payroll Summary
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    Annual Tax Projection
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Report display area */}
        <div className="lg:col-span-3">
          {!showReport ? (
            <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-96">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-lg">
                  Generate a finance report to view it here
                </p>
                <p className="text-sm mt-2">
                  Select report type and date range from the form
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white shadow rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-medium">
                      {reportType === "income"
                        ? "Income Statement"
                        : reportType === "balance"
                        ? "Balance Sheet"
                        : reportType === "cash-flow"
                        ? "Cash Flow Statement"
                        : reportType === "expense"
                        ? "Expense Report"
                        : reportType === "payroll"
                        ? "Payroll Summary"
                        : "Tax Report"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Period: {new Date(startDate).toLocaleDateString()} -{" "}
                      {new Date(endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                      <span className="mr-1">📥</span> Export
                    </button>
                    <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                      <span className="mr-1">📄</span> PDF
                    </button>
                    <button className="px-3 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                      <span className="mr-1">🖨️</span> Print
                    </button>
                  </div>
                </div>

                {/* Sample report content for Income Statement */}
                {reportType === "income" && viewMode === "chart" && (
                  <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                      Income Statement Chart Visualization
                    </p>
                  </div>
                )}

                {reportType === "income" && viewMode === "table" && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Q1 2025
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Q2 2025
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            YTD
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="font-medium">
                          <td className="px-6 py-4 whitespace-nowrap">
                            Revenue
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,450,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,580,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $3,030,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Product Sales
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $950,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,020,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,970,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Service Revenue
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $500,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $560,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,060,000
                          </td>
                        </tr>
                        <tr className="font-medium">
                          <td className="px-6 py-4 whitespace-nowrap">
                            Cost of Revenue
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $580,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $632,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,212,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Product Costs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $380,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $408,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $788,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Service Costs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $200,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $224,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $424,000
                          </td>
                        </tr>
                        <tr className="bg-gray-50 font-medium">
                          <td className="px-6 py-4 whitespace-nowrap">
                            Gross Profit
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $870,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $948,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,818,000
                          </td>
                        </tr>

                        <tr className="font-medium">
                          <td className="px-6 py-4 whitespace-nowrap">
                            Operating Expenses
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $650,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $685,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $1,335,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Salaries & Benefits
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $450,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $465,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $915,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Rent & Utilities
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $75,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $75,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $150,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Marketing
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $85,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $95,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $180,000
                          </td>
                        </tr>
                        <tr>
                          <td className="pl-10 px-6 py-4 whitespace-nowrap">
                            Other Expenses
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $40,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $50,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $90,000
                          </td>
                        </tr>
                        <tr className="bg-gray-50 font-medium">
                          <td className="px-6 py-4 whitespace-nowrap">
                            Operating Income
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $220,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $263,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $483,000
                          </td>
                        </tr>

                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            Tax Expense (25%)
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $55,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $65,750
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $120,750
                          </td>
                        </tr>
                        <tr className="bg-blue-50 font-semibold">
                          <td className="px-6 py-4 whitespace-nowrap">
                            Net Income
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $165,000
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $197,250
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            $362,250
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-md font-medium mb-4">Key Metrics</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Gross Profit Margin</p>
                    <p className="text-xl font-bold">60.0%</p>
                    <p className="text-xs text-green-600">
                      ↑ 2.3% from previous period
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Net Profit Margin</p>
                    <p className="text-xl font-bold">12.0%</p>
                    <p className="text-xs text-green-600">
                      ↑ 1.5% from previous period
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      Operating Expenses Ratio
                    </p>
                    <p className="text-xl font-bold">44.1%</p>
                    <p className="text-xs text-red-600">
                      ↑ 0.8% from previous period
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Notes & Analysis</h4>
                  <p className="text-sm text-gray-600">
                    The company shows strong performance in Q2 2025 with a 9%
                    increase in revenue compared to Q1. Gross profit margin
                    improved by 2.3 percentage points due to improved efficiency
                    in service delivery. Operating expenses increased slightly
                    as a percentage of revenue due to new marketing initiatives,
                    but the overall impact on net income remains positive with a
                    19.5% increase from Q1 to Q2.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceReportsPage;
