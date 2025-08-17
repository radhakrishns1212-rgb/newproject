import React, { useState } from 'react';
import { Upload, Calendar, Search, Package, Eye, Download } from 'lucide-react';
import Layout from './Layout';

interface Order {
  id: string;
  orderNumber: string;
  supplier: string;
  amount: number;
  date: string;
  items: number;
  status: 'Received' | 'Pending' | 'Processing';
}

const Orders = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [searchTerm, setSearchTerm] = useState('');

  const orders: Order[] = [
    { id: '1', orderNumber: 'ORD-2025-001', supplier: 'Steel Industries Ltd', amount: 125000, date: '2025-01-10', items: 15, status: 'Received' },
    { id: '2', orderNumber: 'ORD-2025-002', supplier: 'Raw Materials Corp', amount: 89000, date: '2025-01-18', items: 8, status: 'Processing' },
    { id: '3', orderNumber: 'ORD-2025-003', supplier: 'Global Supplies Inc', amount: 156000, date: '2025-01-22', items: 22, status: 'Pending' },
    { id: '4', orderNumber: 'ORD-2025-004', supplier: 'Industrial Solutions', amount: 67500, date: '2025-01-26', items: 12, status: 'Received' },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesMonth = order.date.slice(0, 7) === selectedMonth;
    const matchesSearch = order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalItems = filteredOrders.reduce((sum, order) => sum + order.items, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Order document "${file.name}" uploaded successfully!`);
    }
  };

  return (
    <Layout title="Orders Management">
      <div className="max-w-6xl mx-auto">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Order</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <label className="cursor-pointer">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">Upload Order Document</p>
                <p className="text-gray-600 mb-4">Drag and drop your order file or click to browse</p>
                <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Choose File</span>
                </div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xlsx"
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX, XLSX</p>
            </div>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
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
                    placeholder="Search orders..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-600 font-semibold text-sm">Total Value</p>
                <p className="text-2xl font-bold text-green-800">₹{totalAmount.toLocaleString()}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-600 font-semibold text-sm">Total Items</p>
                <p className="text-2xl font-bold text-blue-800">{totalItems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Orders for {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="text-gray-600 mt-1">{filteredOrders.length} order(s) found</p>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Upload your first order document to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
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
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{order.orderNumber}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <Package className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="text-gray-900">{order.supplier}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(order.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {order.items} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 font-medium">₹{order.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Order"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            title="Download"
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

export default Orders;