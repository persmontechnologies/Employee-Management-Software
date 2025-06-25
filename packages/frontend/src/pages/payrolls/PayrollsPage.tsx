import React from "react";
import { Link } from "react-router-dom";

const PayrollsPage: React.FC = () => {
  // This is a placeholder implementation
  // You can expand this with actual payroll management functionality
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Payroll Management</h1>
        <div className="space-x-3">
          <Link
            to="/payroll/process"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Process Payroll
          </Link>
          <Link
            to="/payroll/reports"
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            View Reports
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Recent Payrolls</h2>
          <div className="flex space-x-2">
            <select className="border rounded px-3 py-1 text-sm">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>HR</option>
            </select>
            <input
              type="month"
              className="border rounded px-3 py-1 text-sm"
              defaultValue="2025-04"
            />
          </div>
        </div>

        {/* Sample payroll data table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">April 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">All</td>
                <td className="px-6 py-4 whitespace-nowrap">48</td>
                <td className="px-6 py-4 whitespace-nowrap">$245,320.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">March 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">All</td>
                <td className="px-6 py-4 whitespace-nowrap">47</td>
                <td className="px-6 py-4 whitespace-nowrap">$241,580.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Download
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">February 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">All</td>
                <td className="px-6 py-4 whitespace-nowrap">47</td>
                <td className="px-6 py-4 whitespace-nowrap">$239,450.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PayrollsPage;
