import React, { useState } from 'react';
import { Package, Truck, Plus, Search, Calendar } from 'lucide-react';
import Layout from './Layout';

interface Material {
  id: string;
  name: string;
  type: 'Raw' | 'Dispatch';
  quantity: number;
  unit: string;
  price: number;
  supplier: string;
  date: string;
}

const Materials = () => {
  const [activeTab, setActiveTab] = useState<'raw' | 'dispatch'>('raw');
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const [materials, setMaterials] = useState<Material[]>([
    { id: '1', name: 'Steel Sheets', type: 'Raw', quantity: 500, unit: 'kg', price: 45000, supplier: 'Steel Corp', date: '2025-01-15' },
    { id: '2', name: 'Aluminum Rods', type: 'Raw', quantity: 200, unit: 'pieces', price: 25000, supplier: 'Metal Works', date: '2025-01-18' },
    { id: '3', name: 'Finished Product A', type: 'Dispatch', quantity: 100, unit: 'units', price: 80000, supplier: 'Self', date: '2025-01-20' },
    { id: '4', name: 'Copper Wire', type: 'Raw', quantity: 1000, unit: 'meters', price: 15000, supplier: 'Wire Solutions', date: '2025-01-22' },
    { id: '5', name: 'Finished Product B', type: 'Dispatch', quantity: 75, unit: 'units', price: 60000, supplier: 'Self', date: '2025-01-25' },
  ]);

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    type: 'Raw' as 'Raw' | 'Dispatch',
    quantity: 0,
    unit: 'kg',
    price: 0,
    supplier: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredMaterials = materials.filter(material => {
    const matchesTab = activeTab === 'raw' ? material.type === 'Raw' : material.type === 'Dispatch';
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = material.date.slice(0, 7) === selectedMonth;
    return matchesTab && matchesSearch && matchesMonth;
  });

  const addMaterial = () => {
    if (newMaterial.name && newMaterial.quantity && newMaterial.price) {
      const material: Material = {
        ...newMaterial,
        type: activeTab === 'raw' ? 'Raw' : 'Dispatch',
        id: (materials.length + 1).toString()
      };
      setMaterials([...materials, material]);
      setNewMaterial({
        name: '', type: 'Raw', quantity: 0, unit: 'kg', price: 0, supplier: '', 
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddMaterial(false);
    }
  };

  const totalValue = filteredMaterials.reduce((sum, material) => sum + material.price, 0);
  const totalQuantity = filteredMaterials.reduce((sum, material) => sum + material.quantity, 0);

  return (
    <Layout title="Materials Management">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('raw')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'raw' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Raw Material</span>
                </button>
                <button
                  onClick={() => setActiveTab('dispatch')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === 'dispatch' 
                      ? 'bg-white text-orange-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Truck className="h-5 w-5" />
                  <span>Dispatch Material</span>
                </button>
              </div>

              <button
                onClick={() => setShowAddMaterial(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add {activeTab === 'raw' ? 'Raw' : 'Dispatch'} Material</span>
              </button>
            </div>

            {/* Filters and Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Materials</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search materials..."
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

              <div className={`${activeTab === 'raw' ? 'bg-blue-50' : 'bg-orange-50'} rounded-lg p-4`}>
                <p className={`${activeTab === 'raw' ? 'text-blue-600' : 'text-orange-600'} font-semibold text-sm`}>
                  Total Items
                </p>
                <p className={`text-2xl font-bold ${activeTab === 'raw' ? 'text-blue-800' : 'text-orange-800'}`}>
                  {filteredMaterials.length}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-600 font-semibold text-sm">Total Value</p>
                <p className="text-2xl font-bold text-green-800">₹{totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Materials List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {activeTab === 'raw' ? 'Raw Materials' : 'Dispatch Materials'} - {' '}
              {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-gray-600 mt-1">{filteredMaterials.length} item(s) found</p>
          </div>

          {filteredMaterials.length === 0 ? (
            <div className="p-12 text-center">
              <div className={`${activeTab === 'raw' ? 'bg-blue-100' : 'bg-orange-100'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                {activeTab === 'raw' ? 
                  <Package className="h-8 w-8 text-blue-600" /> : 
                  <Truck className="h-8 w-8 text-orange-600" />
                }
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
              <p className="text-gray-600">Add your first {activeTab} material to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`${activeTab === 'raw' ? 'bg-blue-100' : 'bg-orange-100'} w-10 h-10 rounded-full flex items-center justify-center mr-4`}>
                            {activeTab === 'raw' ? 
                              <Package className="h-5 w-5 text-blue-600" /> : 
                              <Truck className="h-5 w-5 text-orange-600" />
                            }
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{material.name}</div>
                            <div className="text-sm text-gray-600">{material.type} Material</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {material.supplier}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">{material.quantity}</span>
                        <span className="text-sm text-gray-600 ml-1">{material.unit}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">₹{material.price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(material.date).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Material Modal */}
        {showAddMaterial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 m-4 max-w-md w-full">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Add New {activeTab === 'raw' ? 'Raw' : 'Dispatch'} Material
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material Name</label>
                  <input
                    type="text"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter material name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                  <input
                    type="text"
                    value={newMaterial.supplier}
                    onChange={(e) => setNewMaterial({...newMaterial, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter supplier name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={newMaterial.quantity}
                      onChange={(e) => setNewMaterial({...newMaterial, quantity: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={newMaterial.unit}
                      onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="kg">kg</option>
                      <option value="pieces">pieces</option>
                      <option value="meters">meters</option>
                      <option value="units">units</option>
                      <option value="tons">tons</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={newMaterial.price}
                    onChange={(e) => setNewMaterial({...newMaterial, price: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter price"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newMaterial.date}
                    onChange={(e) => setNewMaterial({...newMaterial, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowAddMaterial(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addMaterial}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Add Material
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Materials;