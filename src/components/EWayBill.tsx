import React, { useState } from 'react';
import { Upload, Truck, Calendar, Search, FileText, Download, Eye } from 'lucide-react';
import Layout from './Layout';

interface EWayBill {
  id: string;
  billNumber: string;
  vehicleNumber: string;
  destination: string;
  amount: number;
  distance: number;
  date: string;
  documentName: string;
  status: 'Active' | 'Completed' | 'Cancelled';
}

const EWayBill = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [searchTerm, setSearchTerm] = useState('');

  const [eWayBills, setEWayBills] = useState<EWayBill[]>([
    { id: '1', billNumber: 'EWB001234567890', vehicleNumber: 'MH12AB1234', destination: 'Mumbai to Delhi', amount: 125000, distance: 1400, date: '2025-01-15', documentName: 'eway_001.pdf', status: 'Completed' },
    { id: '2', billNumber: 'EWB001234567891', vehicleNumber: 'GJ05CD5678', destination: 'Ahmedabad to Pune', amount: 89000, distance: 600, date: '2025-01-18', documentName: 'eway_002.pdf', status: 'Active' },
    { id: '3', billNumber: 'EWB001234567892', vehicleNumber: 'KA03EF9012', destination: 'Bangalore to Chennai', amount: 156000, distance: 350, date: '2025-01-20', documentName: 'eway_003.pdf', status: 'Completed' },
    { id: '4', billNumber: 'EWB001234567893', vehicleNumber: 'TN09GH3456', destination: 'Chennai to Hyderabad', amount: 67500, distance: 450, date: '2025-01-22', documentName: 'eway_004.pdf', status: 'Active' },
  ]);

  const filteredBills = eWayBills.filter(bill => {
    const matchesMonth = bill.date.slice(0, 7) === selectedMonth;
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
  const totalDistance = filteredBills.reduce((sum, bill) => sum + bill.distance, 0);
  const activeBills = filteredBills.filter(bill => bill.status === 'Active').length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate E-Way Bill processing
      const newBill: EWayBill = {
        id: (eWayBills.length + 1).toString(),
        billNumber: `EWB${String(Math.floor(Math.random() * 1000000000000)).padStart(12, '0')}`,
        vehicleNumber: `MH12XY${Math.floor(Math.random() * 9000) + 1000}`,
        destination: 'Auto-detected destination',
        amount: Math.floor(Math.random() * 200000) + 50000,
        distance: Math.floor(Math.random() * 1500) + 100,
        date: new Date().toISOString().split('T')[0],
        documentName: file.name,
        status: 'Active'
      };
      setEWayBills([...eWayBills, newBill]);
      alert(`E-Way Bill "${file.name}" uploaded successfully! Bill number: ${newBill.billNumber}`);
    }
  };

  return (
    <Layout title="E-Way Bill Management">
      <div className="max-w-6xl mx-auto">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload E-Way Bill</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-400 transition-colors">
              <label className="cursor-pointer">
                <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-teal-600" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">Upload E-Way Bill PDF</p>
                <p className="text-gray-600 mb-4">Drag and drop your E-Way Bill document or click to browse</p>
                <div className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Choose File</span>
                </div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf"
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Supported format: PDF</p>
            </div>
          </div>
        </div>

        {/* Filters and Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                    placeholder="Search E-Way Bills..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-4">
                <p className="text-teal-600 font-semibold text-sm">Total Bills</p>
                <p className="text-2xl font-bold text-teal-800">{filteredBills.length}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-600 font-semibold text-sm">Active Bills</p>
                <p className="text-2xl font-bold text-green-800">{activeBills}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-600 font-semibold text-sm">Total Value</p>
                <p className="text-2xl font-bold text-blue-800">₹{totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* E-Way Bills List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              E-Way Bills - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-gray-600 mt-1">{filteredBills.length} bill(s) found</p>
          </div>

          {filteredBills.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No E-Way Bills found</h3>
              <p className="text-gray-600">Upload your first E-Way Bill document to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      E-Way Bill Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle & Route
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Distance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
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
                  {filteredBills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-teal-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                            <FileText className="h-5 w-5 text-teal-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{bill.billNumber}</div>
                            <div className="text-sm text-gray-600">{bill.documentName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center text-gray-900 font-medium">
                            <Truck className="h-4 w-4 text-gray-500 mr-2" />
                            {bill.vehicleNumber}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{bill.destination}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">{bill.distance} km</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900 font-medium">₹{bill.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(bill.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            className="p-2 text-gray-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
                            title="View E-Way Bill"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
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

        {/* Summary Stats */}
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Distance:</span>
                <span className="font-medium text-gray-900">{totalDistance.toLocaleString()} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Distance:</span>
                <span className="font-medium text-gray-900">{filteredBills.length > 0 ? Math.round(totalDistance / filteredBills.length) : 0} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Amount:</span>
                <span className="font-medium text-gray-900">₹{filteredBills.length > 0 ? Math.round(totalAmount / filteredBills.length).toLocaleString() : 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Active</span>
                </div>
                <span className="font-medium text-gray-900">{eWayBills.filter(b => b.status === 'Active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Completed</span>
                </div>
                <span className="font-medium text-gray-900">{eWayBills.filter(b => b.status === 'Completed').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Cancelled</span>
                </div>
                <span className="font-medium text-gray-900">{eWayBills.filter(b => b.status === 'Cancelled').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Upload className="h-4 w-4" />
                <span>Generate New E-Way Bill</span>
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Download className="h-4 w-4" />
                <span>Download Monthly Report</span>
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <FileText className="h-4 w-4" />
                <span>View All Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EWayBill;