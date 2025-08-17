import React, { useState } from 'react';
import { Calendar, FileBarChart, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from './Layout';

interface TaxReturn {
  id: string;
  period: string;
  type: 'GSTR-1' | 'GSTR-3B' | 'ITR' | 'TDS';
  status: 'Filed' | 'Pending' | 'Draft';
  dueDate: string;
  filedDate?: string;
  amount: number;
}

const TaxFiling = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(new Date().toISOString().slice(0, 7));

  const taxReturns: TaxReturn[] = [
    { id: '1', period: '2025-01', type: 'GSTR-1', status: 'Filed', dueDate: '2025-02-11', filedDate: '2025-02-08', amount: 45000 },
    { id: '2', period: '2025-01', type: 'GSTR-3B', status: 'Pending', dueDate: '2025-02-20', amount: 32000 },
    { id: '3', period: '2024-12', type: 'GSTR-1', status: 'Filed', dueDate: '2025-01-11', filedDate: '2025-01-10', amount: 38000 },
    { id: '4', period: '2024-12', type: 'GSTR-3B', status: 'Filed', dueDate: '2025-01-20', filedDate: '2025-01-18', amount: 28000 },
    { id: '5', period: '2024-FY', type: 'ITR', status: 'Draft', dueDate: '2025-07-31', amount: 125000 },
  ];

  const filteredReturns = taxReturns.filter(taxReturn => 
    taxReturn.period.startsWith(selectedPeriod) || taxReturn.period.includes('FY')
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Filed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Filed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Draft': return <FileBarChart className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const totalTax = filteredReturns.reduce((sum, taxReturn) => sum + taxReturn.amount, 0);
  const filedCount = filteredReturns.filter(t => t.status === 'Filed').length;
  const pendingCount = filteredReturns.filter(t => t.status === 'Pending').length;

  return (
    <Layout title="Tax Filing">
      <div className="max-w-6xl mx-auto">
        {/* Header Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Period</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="month"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-600 font-semibold text-sm">Filed Returns</p>
                <p className="text-2xl font-bold text-green-800">{filedCount}</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-yellow-600 font-semibold text-sm">Pending Returns</p>
                <p className="text-2xl font-bold text-yellow-800">{pendingCount}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-600 font-semibold text-sm">Total Returns</p>
                <p className="text-2xl font-bold text-blue-800">{filteredReturns.length}</p>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-indigo-600 font-semibold text-sm">Total Tax</p>
                <p className="text-2xl font-bold text-indigo-800">₹{totalTax.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex flex-col items-center space-y-2 transition-colors">
                <FileBarChart className="h-8 w-8" />
                <span className="font-medium">File GSTR-1</span>
              </button>
              
              <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg flex flex-col items-center space-y-2 transition-colors">
                <FileBarChart className="h-8 w-8" />
                <span className="font-medium">File GSTR-3B</span>
              </button>
              
              <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex flex-col items-center space-y-2 transition-colors">
                <Upload className="h-8 w-8" />
                <span className="font-medium">Upload Documents</span>
              </button>
              
              <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg flex flex-col items-center space-y-2 transition-colors">
                <Download className="h-8 w-8" />
                <span className="font-medium">Download Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tax Returns List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Tax Returns - {new Date(selectedPeriod + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-gray-600 mt-1">{filteredReturns.length} return(s) found</p>
          </div>

          {filteredReturns.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileBarChart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tax returns found</h3>
              <p className="text-gray-600">Select a different period to view tax returns.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Return Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filed Date
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
                  {filteredReturns.map((taxReturn) => (
                    <tr key={taxReturn.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                            <FileBarChart className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{taxReturn.type}</div>
                            <div className="text-sm text-gray-600">Tax Return</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {taxReturn.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{new Date(taxReturn.dueDate).toLocaleDateString('en-IN')}</div>
                        <div className={`text-xs ${
                          new Date(taxReturn.dueDate) < new Date() && taxReturn.status !== 'Filed' 
                            ? 'text-red-600' 
                            : 'text-gray-500'
                        }`}>
                          {new Date(taxReturn.dueDate) < new Date() && taxReturn.status !== 'Filed' 
                            ? 'Overdue' 
                            : 'Due'
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {taxReturn.filedDate 
                          ? new Date(taxReturn.filedDate).toLocaleDateString('en-IN')
                          : '-'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">₹{taxReturn.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(taxReturn.status)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(taxReturn.status)}`}>
                            {taxReturn.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {taxReturn.status === 'Filed' ? (
                            <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all" title="Download">
                              <Download className="h-4 w-4" />
                            </button>
                          ) : (
                            <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all" title="File Return">
                              <Upload className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Compliance Calendar */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Upcoming Deadlines</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">GSTR-3B for January 2025</p>
                    <p className="text-sm text-gray-600">Due: February 20, 2025</p>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                  5 days left
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <FileBarChart className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">ITR Filing for FY 2024-25</p>
                    <p className="text-sm text-gray-600">Due: July 31, 2025</p>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  Draft ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TaxFiling;