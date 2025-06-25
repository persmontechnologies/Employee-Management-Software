import React from "react";
import { Link } from "react-router-dom";

const DocumentsPage: React.FC = () => {
  // This is a placeholder implementation
  // You can expand this with actual document management functionality
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Document Management</h1>
        <Link
          to="/documents/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Upload New Document
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500 italic mb-4">No documents available yet.</p>

        {/* You can replace this with a real document list component */}
        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* You'll map through your documents here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
