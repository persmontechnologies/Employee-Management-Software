import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PayrollProcessPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("2025-04");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Mock processing with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success navigation
      navigate("/payroll");
    } catch (error) {
      console.error("Error processing payroll:", error);
      alert("Failed to process payroll");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Process New Payroll</h1>

      <div className="bg-white shadow rounded-lg p-6 max-w-3xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="payrollPeriod"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Payroll Period
              </label>
              <input
                type="month"
                id="payrollPeriod"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <select
                id="department"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                required
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="hr">Human Resources</option>
                <option value="sales">Sales</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="includeOvertime"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label
                htmlFor="includeOvertime"
                className="ml-2 block text-sm text-gray-700"
              >
                Include overtime calculations
              </label>
            </div>

            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="includeDeductions"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                defaultChecked
              />
              <label
                htmlFor="includeDeductions"
                className="ml-2 block text-sm text-gray-700"
              >
                Apply standard deductions (taxes, benefits, etc.)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeBonus"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="includeBonus"
                className="ml-2 block text-sm text-gray-700"
              >
                Include quarterly bonus (if applicable)
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-gray-700 mb-2">
              Processing Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Estimated Employees:</p>
                <p className="font-semibold">
                  {selectedDepartment === "all" ? "48" : "12"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Estimated Total:</p>
                <p className="font-semibold">
                  {selectedDepartment === "all" ? "$245,320.00" : "$62,480.00"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Processing Duration:</p>
                <p className="font-semibold">~2 minutes</p>
              </div>
              <div>
                <p className="text-gray-500">Approval Required:</p>
                <p className="font-semibold">Yes</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/payroll")}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? "Processing..." : "Process Payroll"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PayrollProcessPage;
