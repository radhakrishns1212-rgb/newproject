import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ShoppingCart, 
  Users, 
  Package, 
  Receipt, 
  FileBarChart, 
  Truck,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, userEmail } = useAuth();

  const menuItems = [
    { 
      title: 'Invoice', 
      icon: FileText, 
      color: 'bg-blue-600 hover:bg-blue-700', 
      path: '/invoice',
      description: 'Generate and manage invoices'
    },
    { 
      title: 'Orders', 
      icon: ShoppingCart, 
      color: 'bg-green-600 hover:bg-green-700', 
      path: '/orders',
      description: 'Track and manage orders'
    },
    { 
      title: 'Works', 
      icon: Users, 
      color: 'bg-purple-600 hover:bg-purple-700', 
      path: '/works',
      description: 'Manage workers and salaries'
    },
    { 
      title: 'Materials', 
      icon: Package, 
      color: 'bg-orange-600 hover:bg-orange-700', 
      path: '/materials',
      description: 'Raw and dispatch materials'
    },
    { 
      title: 'Input Bills', 
      icon: Receipt, 
      color: 'bg-red-600 hover:bg-red-700', 
      path: '/input-bills',
      description: 'Upload documents and GST'
    },
    { 
      title: 'Tax Filing', 
      icon: FileBarChart, 
      color: 'bg-indigo-600 hover:bg-indigo-700', 
      path: '/tax-filing',
      description: 'Manage tax filings'
    },
    { 
      title: 'E-Way Bill', 
      icon: Truck, 
      color: 'bg-teal-600 hover:bg-teal-700', 
      path: '/eway-bill',
      description: 'Upload and manage E-Way Bills'
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AX</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Aetheris X</h1>
                <p className="text-gray-600">Business Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-medium text-gray-900">{userEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Choose a module to get started</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border border-gray-100 hover:border-blue-200"
              >
                <div className={`${item.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-600 font-semibold">Total Invoices</p>
              <p className="text-2xl font-bold text-blue-800">127</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-600 font-semibold">Active Orders</p>
              <p className="text-2xl font-bold text-green-800">43</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-purple-600 font-semibold">Workers</p>
              <p className="text-2xl font-bold text-purple-800">28</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-orange-600 font-semibold">This Month</p>
              <p className="text-2xl font-bold text-orange-800">₹2.4L</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;