import React, { useState } from 'react';
import { Upload, Calculator, FileText, Calendar, Search, IndianRupee } from 'lucide-react';
import Layout from './Layout';

interface InputBill {
  id: string;
  type: 'Document' | 'Manual';
  description: string;
  gstAmount: number;
  date: string;
  documentName?: string;
  vendor: string;
}

const InputBills = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [showManualEntry, setShowManualEntry] = useState(false);

  const [bills, setBills] = useState<InputBill[]>([
    { id: '1', type: 'Document', description: 'Raw material purchase', gstAmount: 8100, date: '2025-01-15', documentName: 'bill_001.pdf', vendor: 'Steel Corp' },
    { id: '2', type: 'Manual', description: 'Service charges', gstAmount: 2160, date: '2025-01-18', vendor: 'Logistics Ltd' },
    { id: '3', type: 'Document', description: 'Equipment maintenance', gstAmount: 5400, date: '2025-01-20', documentName: 'maintenance_bill.pdf', vendor: 'Service Center' },
    { id: '4', type: 'Manual', description: 'Utility bills', gstAmount: 3240, date: '2025-01-22', vendor: 'Power Company' },
  ]);

  const [manualEntry, setManualEntry] = useState({
    description: '',
    gstAmount: 0,
    vendor: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = bill.date.slice(0, 7) === selectedMonth;
    const matchesTab = activeTab === 'upload' ? bill.type === 'Document' : bill.type === 'Manual';
    return matchesSearch && matchesMonth && matchesTab;
  });

  const totalGST = filteredBills.reduce((sum, bill) => sum + bill.gstAmount, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newBill: InputBill = {
        id: (bills.length + 1).toString(),
        type: 'Document',
        description: `Document upload - ${file.name}`,
        gstAmount: Math.floor(Math.random() * 10000) + 1000, // Simulated GST extraction
        date: new Date().toISOString().split('T')[0],
        documentName: file.name,
        vendor: 'Auto-detected vendor'
      };
      setBills([...bills, newBill]);
      alert(`Document "${file.name}" uploaded successfully! GST amount auto-detected: ₹${newBill.gstAmount}`);
    }
  };

  const addManualEntry = () => {
    if (manualEntry.description && manualEntry.gstAmount && manualEntry.vendor) {
      const newBill: InputBill = {
        id: (bills.length + 1).toString(),
        type: 'Manual',
        description: manualEntry.description,
        gstAmount: manualEntry.gstAmount,
        date: manualEntry.date,
        vendor: manualEntry.vendor
      };
      setBills([...bills, newBill]);
      setManualEntry({
        description: '',
        gstAmount: 0,
        vendor: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowManualEntry(false);
    }
  };

  return (
    <Layout title="Input Bills Management">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'upload' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Document</span>
                </button>
                <button
                  onClick={() => setActiveTab('manual')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'manual' 
                      ? 'bg-white text-green-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calculator className="h-5 w-5" />
                  <span>Manual Entry</span>
                </button>
              </div>

              {activeTab === 'manual' && (
                <button
                  onClick={() => setShowManualEntry(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Calculator className="h-5 w-5" />
                  <span>Add Manual Entry</span>
                </button>
              )}
            </div>

            {/* Upload Section for Documents */}
            {activeTab === 'upload' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors mb-6">
                <label className="cursor-pointer">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload Bill Document</p>
                  <p className="text-gray-600 mb-4">Upload your bill document and we'll automatically extract the GST amount</p>
                  <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center space-x-2 transition-colors">
                    <Upload className="h-4 w-4" />
                    <span>Choose File</span>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG</p>
              </div>
            )}

            {/* Filters and Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Bills</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search bills..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

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

              <div className={`${activeTab === 'upload' ? 'bg-blue-50' : 'bg-green-50'} rounded-lg p-4`}>
                <p className={`${activeTab === 'upload' ? 'text-blue-600' : 'text-green-600'} font-semibold text-sm`}>
                  Total Bills
                </p>
                <p className={`text-2xl font-bold ${activeTab === 'upload' ? 'text-blue-800' : 'text-green-800'}`}>
                  {filteredBills.length}
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-orange-600 font-semibold text-sm">Total GST</p>
                <p className="text-2xl font-bold text-orange-800">₹{totalGST.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bills List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {activeTab === 'upload' ? 'Uploaded Documents' : 'Manual Entries'} - {' '}
              {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-gray-600 mt-1">{filteredBills.length} bill(s) found</p>
          </div>

          {filteredBills.length === 0 ? (
            <div className="p-12 text-center">
              <div className={`${activeTab === 'upload' ? 'bg-blue-100' : 'bg-green-100'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {activeTab === 'upload' ? 
                  <Upload className="h-8 w-8 text-blue-600" /> : 
                  <Calculator className="h-8 w-8 text-green-600" />
                }
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bills found</h3>
              <p className="text-gray-600">
                {activeTab === 'upload' 
                  ? 'Upload your first bill document to get started.' 
                  : 'Add your first manual GST entry to get started.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bill Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GST Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`${bill.type === 'Document' ? 'bg-blue-100' : 'bg-green-100'} w-10 h-10 rounded-full flex items-center justify-center mr-4`}>
                            {bill.type === 'Document' ? 
                              <FileText className="h-5 w-5 text-blue-600" /> : 
                              <Calculator className="h-5 w-5 text-green-600" />
                            }
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{bill.description}</div>
                            {bill.documentName && (
                              <div className="text-sm text-gray-600">{bill.documentName}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {bill.vendor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <IndianRupee className="h-4 w-4 text-orange-600 mr-1" />
                          <span className="font-bold text-orange-800">{bill.gstAmount.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(bill.date).toLocaleDateString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          bill.type === 'Document' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {bill.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Manual Entry Modal */}
        {showManualEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 m-4 max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Add Manual GST Entry</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={manualEntry.description}
                    onChange={(e) => setManualEntry({...manualEntry, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter bill description"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                  <input
                    type="text"
                    value={manualEntry.vendor}
                    onChange={(e) => setManualEntry({...manualEntry, vendor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter vendor name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Amount (₹)</label>
                  <input
                    type="number"
                    value={manualEntry.gstAmount}
                    onChange={(e) => setManualEntry({...manualEntry, gstAmount: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter GST amount"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={manualEntry.date}
                    onChange={(e) => setManualEntry({...manualEntry, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowManualEntry(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addManualEntry}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InputBills;