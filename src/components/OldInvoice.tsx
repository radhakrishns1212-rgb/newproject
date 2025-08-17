import React, { useState } from 'react';
import { Calendar, Building, Eye, Download, Search, Filter } from 'lucide-react';
import Layout from './Layout';

interface Invoice {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

const OldInvoice = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [searchTerm, setSearchTerm] = useState('');

  const invoices: Invoice[] = [
    { id: '1', invoiceNumber: 'INV-2025-001', company: 'ABC Corporation Ltd', amount: 45000, date: '2025-01-15', status: 'Paid' },
    { id: '2', invoiceNumber: 'INV-2025-002', company: 'XYZ Industries', amount: 32500, date: '2025-01-20', status: 'Pending' },
    { id: '3', invoiceNumber: 'INV-2025-003', company: 'Tech Solutions Inc', amount: 67800, date: '2025-01-25', status: 'Paid' },
    { id: '4', invoiceNumber: 'INV-2025-004', company: 'Global Enterprises', amount: 28900, date: '2025-01-28', status: 'Overdue' },
    { id: '5', invoiceNumber: 'INV-2024-089', company: 'Smart Systems Pvt Ltd', amount: 54200, date: '2024-12-15', status: 'Paid' },
    { id: '6', invoiceNumber: 'INV-2024-090', company: 'Digital Solutions', amount: 41600, date: '2024-12-20', status: 'Paid' },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesMonth = invoice.date.slice(0, 7) === selectedMonth;
    const matchesSearch = invoice.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <Layout title="Invoice History">
      <div className="max-w-6xl mx-auto">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by company or invoice number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <div className="bg-blue-50 rounded-lg p-4 w-full">
                  <p className="text-blue-600 font-semibold text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-blue-800">₹{totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Invoices for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-gray-600 mt-1">{filteredInvoices.length} invoice(s) found</p>
          </div>

          {filteredInvoices.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{invoice.invoiceNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <Building className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-gray-900">{invoice.company}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(invoice.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 font-medium">₹{invoice.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Invoice"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            title="Download PDF"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OldInvoice;