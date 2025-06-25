import React, { useState } from "react";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Persmon EMS",
    companyLogo: "/logo.png",
    timezone: "UTC+3",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    fiscalYearStart: "January",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@persmon-ems.com",
    smtpPassword: "********",
    senderName: "Persmon EMS",
    senderEmail: "notifications@persmon-ems.com",
    enableSSL: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    employeeOnboarding: true,
    employeeOffboarding: true,
    leaveRequests: true,
    leaveApprovals: true,
    performanceReviewDue: true,
    payrollProcessing: true,
    systemUpdates: false,
    emailNotifications: true,
    inAppNotifications: true,
  });

  const handleGeneralChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setEmailSettings({
      ...emailSettings,
      [e.target.name]: value,
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: (e.target as HTMLInputElement).checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the settings
    alert("Settings saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">System Settings</h1>

      {/* Settings Tabs */}
      <div className="border-b mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "general"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            General Settings
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "email"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Email Settings
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "notifications"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "security"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("backups")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "backups"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Backups
          </button>
        </nav>
      </div>

      {/* Settings Content */}
      <div className="bg-white shadow rounded-lg p-6">
        {/* General Settings */}
        {activeTab === "general" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">
                General Settings
              </h2>
              <p className="text-sm text-gray-500">
                Configure basic system settings and preferences.
              </p>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={generalSettings.companyName}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="companyLogo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Logo
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={generalSettings.companyLogo}
                        alt="Company logo"
                        className="h-10 w-10 object-contain"
                      />
                    </span>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={generalSettings.timezone}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="UTC-12">UTC-12</option>
                    <option value="UTC-11">UTC-11</option>
                    <option value="UTC-10">UTC-10</option>
                    <option value="UTC-9">UTC-9</option>
                    <option value="UTC-8">UTC-8 (PST)</option>
                    <option value="UTC-7">UTC-7 (MST)</option>
                    <option value="UTC-6">UTC-6 (CST)</option>
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC-4">UTC-4</option>
                    <option value="UTC-3">UTC-3</option>
                    <option value="UTC-2">UTC-2</option>
                    <option value="UTC-1">UTC-1</option>
                    <option value="UTC+0">UTC+0</option>
                    <option value="UTC+1">UTC+1 (CET)</option>
                    <option value="UTC+2">UTC+2</option>
                    <option value="UTC+3">UTC+3</option>
                    <option value="UTC+4">UTC+4</option>
                    <option value="UTC+5">UTC+5</option>
                    <option value="UTC+5:30">UTC+5:30 (IST)</option>
                    <option value="UTC+6">UTC+6</option>
                    <option value="UTC+7">UTC+7</option>
                    <option value="UTC+8">UTC+8</option>
                    <option value="UTC+9">UTC+9 (JST)</option>
                    <option value="UTC+10">UTC+10</option>
                    <option value="UTC+11">UTC+11</option>
                    <option value="UTC+12">UTC+12</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dateFormat"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    name="dateFormat"
                    value={generalSettings.dateFormat}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY (04/05/2025)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (05/04/2025)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (2025-04-05)</option>
                    <option value="DD.MM.YYYY">DD.MM.YYYY (05.04.2025)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="timeFormat"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time Format
                  </label>
                  <div className="mt-1">
                    <select
                      id="timeFormat"
                      name="timeFormat"
                      value={generalSettings.timeFormat}
                      onChange={handleGeneralChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="12h">12-hour (1:30 PM)</option>
                      <option value="24h">24-hour (13:30)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fiscalYearStart"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fiscal Year Start
                  </label>
                  <select
                    id="fiscalYearStart"
                    name="fiscalYearStart"
                    value={generalSettings.fiscalYearStart}
                    onChange={handleGeneralChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </form>
        )}

        {/* Email Settings */}
        {activeTab === "email" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">
                Email Settings
              </h2>
              <p className="text-sm text-gray-500">
                Configure email server settings for system notifications.
              </p>

              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="smtpServer"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SMTP Server
                  </label>
                  <input
                    type="text"
                    name="smtpServer"
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="smtpPort"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SMTP Port
                  </label>
                  <input
                    type="text"
                    name="smtpPort"
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="smtpUsername"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    name="smtpUsername"
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="smtpPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    name="smtpPassword"
                    id="smtpPassword"
                    value={emailSettings.smtpPassword}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="senderName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sender Name
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="senderEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sender Email
                  </label>
                  <input
                    type="email"
                    name="senderEmail"
                    id="senderEmail"
                    value={emailSettings.senderEmail}
                    onChange={handleEmailChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <div className="flex items-center">
                    <input
                      id="enableSSL"
                      name="enableSSL"
                      type="checkbox"
                      checked={emailSettings.enableSSL as boolean}
                      onChange={handleEmailChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="enableSSL"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Enable SSL/TLS
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      You can test your email configuration before saving.
                    </p>
                    <p className="mt-3 text-sm md:mt-0 md:ml-6">
                      <button
                        type="button"
                        className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                      >
                        Send Test Email <span aria-hidden="true">&rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </form>
        )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">
                Notification Settings
              </h2>
              <p className="text-sm text-gray-500">
                Configure which events trigger notifications and how they are
                delivered.
              </p>

              <div className="bg-white border border-gray-200 rounded-md">
                <div className="divide-y divide-gray-200">
                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1 font-medium">Event</div>
                    <div className="col-span-2 font-medium">Notification</div>
                  </div>

                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1">Employee Onboarding</div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <input
                          id="employeeOnboarding"
                          name="employeeOnboarding"
                          type="checkbox"
                          checked={notificationSettings.employeeOnboarding}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="employeeOnboarding"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Notify HR when a new employee is added
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1">Employee Offboarding</div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <input
                          id="employeeOffboarding"
                          name="employeeOffboarding"
                          type="checkbox"
                          checked={notificationSettings.employeeOffboarding}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="employeeOffboarding"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Notify relevant departments when an employee is
                          offboarded
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1">Leave Requests</div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <input
                          id="leaveRequests"
                          name="leaveRequests"
                          type="checkbox"
                          checked={notificationSettings.leaveRequests}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="leaveRequests"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Notify managers when leave is requested
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1">Leave Approvals</div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <input
                          id="leaveApprovals"
                          name="leaveApprovals"
                          type="checkbox"
                          checked={notificationSettings.leaveApprovals}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="leaveApprovals"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Notify employees when leave is approved or rejected
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1">Performance Reviews</div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <input
                          id="performanceReviewDue"
                          name="performanceReviewDue"
                          type="checkbox"
                          checked={notificationSettings.performanceReviewDue}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="performanceReviewDue"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Notify managers and employees about upcoming reviews
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1">Payroll Processing</div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <input
                          id="payrollProcessing"
                          name="payrollProcessing"
                          type="checkbox"
                          checked={notificationSettings.payrollProcessing}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="payrollProcessing"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Notify finance team before and after payroll
                          processing
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 py-4 px-4">
                    <div className="col-span-1">System Updates</div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <input
                          id="systemUpdates"
                          name="systemUpdates"
                          type="checkbox"
                          checked={notificationSettings.systemUpdates}
                          onChange={handleNotificationChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="systemUpdates"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Notify administrators about system updates and
                          maintenance
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Delivery Methods
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="emailNotifications"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="inAppNotifications"
                      name="inAppNotifications"
                      type="checkbox"
                      checked={notificationSettings.inAppNotifications}
                      onChange={handleNotificationChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="inAppNotifications"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      In-app notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </form>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Security Settings
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Configure security policies and access controls.
            </p>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-md font-medium text-gray-900">
                    Password Policy
                  </h3>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="minLength"
                        name="minLength"
                        type="checkbox"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="minLength"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Require minimum password length (8 characters)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="specialChars"
                        name="specialChars"
                        type="checkbox"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="specialChars"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Require special characters
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="expiry"
                        name="expiry"
                        type="checkbox"
                        checked={true}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="expiry"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Password expires after 90 days
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-md font-medium text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Enable two-factor authentication for all users or specific
                      user roles.
                    </p>
                  </div>
                  <div className="mt-4">
                    <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="disabled">Disabled</option>
                      <option value="admins">
                        Required for Administrators only
                      </option>
                      <option value="optional">Optional for all users</option>
                      <option value="required">Required for all users</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-md font-medium text-gray-900">
                    Session Management
                  </h3>
                  <div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="sessionTimeout"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Session Timeout (minutes)
                      </label>
                      <select
                        id="sessionTimeout"
                        name="sessionTimeout"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>15</option>
                        <option>30</option>
                        <option selected>60</option>
                        <option>120</option>
                        <option>240</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-md font-medium text-gray-900">
                    Login Attempts
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                      Configure account lockout policy for failed login
                      attempts.
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="maxAttempts"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Maximum Failed Attempts
                      </label>
                      <select
                        id="maxAttempts"
                        name="maxAttempts"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>3</option>
                        <option selected>5</option>
                        <option>10</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="lockoutDuration"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lockout Duration (minutes)
                      </label>
                      <select
                        id="lockoutDuration"
                        name="lockoutDuration"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>5</option>
                        <option>10</option>
                        <option selected>15</option>
                        <option>30</option>
                        <option>60</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Security Settings
              </button>
            </div>
          </div>
        )}

        {/* Backup Settings */}
        {activeTab === "backups" && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Database Backups
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Configure automatic backups and manage existing backup files.
            </p>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-md font-medium text-gray-900">
                    Automatic Backup Schedule
                  </h3>
                  <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Configure when automatic backups should be performed.</p>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div>
                      <label
                        htmlFor="backupFrequency"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Backup Frequency
                      </label>
                      <select
                        id="backupFrequency"
                        name="backupFrequency"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>Hourly</option>
                        <option selected>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="backupTime"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Backup Time (for daily backups)
                      </label>
                      <input
                        type="time"
                        id="backupTime"
                        name="backupTime"
                        defaultValue="01:00"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="retentionPeriod"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Retention Period (days)
                      </label>
                      <input
                        type="number"
                        id="retentionPeriod"
                        name="retentionPeriod"
                        defaultValue="30"
                        min="1"
                        max="365"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between">
                    <h3 className="text-md font-medium text-gray-900">
                      Manual Backup
                    </h3>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Create Backup Now
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Recent Backups
                </h3>
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Backup Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Size
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          2025-04-05 01:00:00
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          125 MB
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Automatic
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">
                            Download
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          2025-04-04 01:00:00
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          123 MB
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Automatic
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">
                            Download
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          2025-04-03 01:00:00
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          121 MB
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          Automatic
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Completed
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button className="text-blue-600 hover:text-blue-900 mr-2">
                            Download
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Backup Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
