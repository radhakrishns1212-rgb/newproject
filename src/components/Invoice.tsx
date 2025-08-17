import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, Plus } from 'lucide-react';
import Layout from './Layout';

const Invoice = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Invoice Management">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate('/invoice/generate')}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-blue-200"
          >
            <div className="bg-blue-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Generate New Invoice
            </h3>
            <p className="text-gray-600 mb-4">
              Create a new invoice with our Excel-like editor. Upload PO documents for automatic filling.
            </p>
            <div className="flex items-center text-blue-600 font-medium">
              <span>Start Creating</span>
              <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button
            onClick={() => navigate('/invoice/old')}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 text-left border border-gray-100 hover:border-green-200"
          >
            <div className="bg-green-600 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
              Old Invoices
            </h3>
            <p className="text-gray-600 mb-4">
              View and manage your previously generated invoices organized by month and company.
            </p>
            <div className="flex items-center text-green-600 font-medium">
              <span>View History</span>
              <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Invoice #INV-2025-001</p>
                  <p className="text-sm text-gray-600">ABC Corp - ₹45,000</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Invoice #INV-2025-002</p>
                  <p className="text-sm text-gray-600">XYZ Ltd - ₹32,500</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Invoice;