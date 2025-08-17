import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Calendar, User, IndianRupee } from 'lucide-react';
import Layout from './Layout';

interface Worker {
  id: string;
  name: string;
  weeklySalary: number;
  department: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

const Works = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
  
  const [workers, setWorkers] = useState<Worker[]>([
    { id: '1', name: 'Rajesh Kumar', weeklySalary: 2500, department: 'Production', joinDate: '2024-06-15', status: 'Active' },
    { id: '2', name: 'Priya Sharma', weeklySalary: 3000, department: 'Quality Control', joinDate: '2024-07-01', status: 'Active' },
    { id: '3', name: 'Amit Patel', weeklySalary: 2200, department: 'Packaging', joinDate: '2024-08-10', status: 'Active' },
    { id: '4', name: 'Sunita Singh', weeklySalary: 2800, department: 'Maintenance', joinDate: '2024-09-05', status: 'Active' },
    { id: '5', name: 'Vikash Yadav', weeklySalary: 2400, department: 'Production', joinDate: '2024-10-12', status: 'Inactive' },
  ]);

  const [newWorker, setNewWorker] = useState({
    name: '',
    weeklySalary: 0,
    department: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active' as const
  });

  const getWeeksInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = lastDay.getDate();
    return Math.ceil(days / 7);
  };

  const selectedDate = new Date(selectedMonth + '-01');
  const weeksInMonth = getWeeksInMonth(selectedDate.getFullYear(), selectedDate.getMonth());

  const calculateMonthlyTotal = (weeklySalary: number) => {
    return weeklySalary * weeksInMonth;
  };

  const totalMonthlySalary = workers
    .filter(worker => worker.status === 'Active')
    .reduce((sum, worker) => sum + calculateMonthlyTotal(worker.weeklySalary), 0);

  const addWorker = () => {
    if (newWorker.name && newWorker.weeklySalary && newWorker.department) {
      const worker: Worker = {
        ...newWorker,
        id: (workers.length + 1).toString()
      };
      setWorkers([...workers, worker]);
      setNewWorker({ name: '', weeklySalary: 0, department: '', joinDate: new Date().toISOString().split('T')[0], status: 'Active' });
      setShowAddWorker(false);
    }
  };

  const deleteWorker = (id: string) => {
    if (confirm('Are you sure you want to delete this worker?')) {
      setWorkers(workers.filter(worker => worker.id !== id));
    }
  };

  const startEdit = (worker: Worker) => {
    setEditingWorker({ ...worker });
  };

  const saveEdit = () => {
    if (editingWorker) {
      setWorkers(workers.map(worker => 
        worker.id === editingWorker.id ? editingWorker : worker
      ));
      setEditingWorker(null);
    }
  };

  return (
    <Layout title="Workers Management">
      <div className="max-w-6xl mx-auto">
        {/* Header with Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Workers & Salaries</h2>
                <p className="text-gray-600 mt-1">Manage your workforce and track monthly salaries</p>
              </div>
              <button
                onClick={() => setShowAddWorker(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors mt-4 md:mt-0"
              >
                <Plus className="h-5 w-5" />
                <span>Add Worker</span>
              </button>
            </div>

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

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-600 font-semibold text-sm">Active Workers</p>
                <p className="text-2xl font-bold text-green-800">{workers.filter(w => w.status === 'Active').length}</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-600 font-semibold text-sm">Weeks in Month</p>
                <p className="text-2xl font-bold text-blue-800">{weeksInMonth}</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-600 font-semibold text-sm">Monthly Total</p>
                <p className="text-2xl font-bold text-purple-800">₹{totalMonthlySalary.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Workers List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Workers List - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Worker Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weekly Salary
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Total
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
                {workers.map((worker) => (
                  <tr key={worker.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                          <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          {editingWorker?.id === worker.id ? (
                            <input
                              type="text"
                              value={editingWorker.name}
                              onChange={(e) => setEditingWorker({...editingWorker, name: e.target.value})}
                              className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                            />
                          ) : (
                            <div className="font-medium text-gray-900">{worker.name}</div>
                          )}
                          <div className="text-sm text-gray-600">Joined: {new Date(worker.joinDate).toLocaleDateString('en-IN')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingWorker?.id === worker.id ? (
                        <input
                          type="text"
                          value={editingWorker.department}
                          onChange={(e) => setEditingWorker({...editingWorker, department: e.target.value})}
                          className="text-gray-900 border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <div className="text-gray-900">{worker.department}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-gray-500 mr-1" />
                        {editingWorker?.id === worker.id ? (
                          <input
                            type="number"
                            value={editingWorker.weeklySalary}
                            onChange={(e) => setEditingWorker({...editingWorker, weeklySalary: Number(e.target.value)})}
                            className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-24"
                          />
                        ) : (
                          <span className="font-medium text-gray-900">{worker.weeklySalary.toLocaleString()}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-green-600 mr-1" />
                        <span className="font-bold text-green-800">
                          {calculateMonthlyTotal(editingWorker?.id === worker.id ? editingWorker.weeklySalary : worker.weeklySalary).toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        worker.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {editingWorker?.id === worker.id ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-all"
                              title="Save Changes"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => setEditingWorker(null)}
                              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all"
                              title="Cancel"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(worker)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
                              title="Edit Worker"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteWorker(worker.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Worker"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Worker Modal */}
        {showAddWorker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 m-4 max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Add New Worker</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newWorker.name}
                    onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter worker name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={newWorker.department}
                    onChange={(e) => setNewWorker({...newWorker, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter department"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Salary (₹)</label>
                  <input
                    type="number"
                    value={newWorker.weeklySalary}
                    onChange={(e) => setNewWorker({...newWorker, weeklySalary: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter weekly salary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={newWorker.joinDate}
                    onChange={(e) => setNewWorker({...newWorker, joinDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowAddWorker(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addWorker}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Add Worker
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Works;