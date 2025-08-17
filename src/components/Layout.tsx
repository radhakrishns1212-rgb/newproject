import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, ArrowLeft, Home, HelpCircle, Mail, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
}

const Layout = ({ children, title, showBackButton = true }: LayoutProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();

  const handleMenuClick = (action: string) => {
    setShowMenu(false);
    switch (action) {
      case 'back':
        navigate(-1);
        break;
      case 'home':
        navigate('/dashboard');
        break;
      case 'support':
        // In a real app, this would open a support ticket or chat
        alert('Support: Please contact us at support@aetherisx.com');
        break;
      case 'email':
        alert(`Your email: ${userEmail}`);
        break;
      case 'logout':
        logout();
        navigate('/login');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">Aetheris X</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-2">
                    <button
                      onClick={() => handleMenuClick('back')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Go Back</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick('home')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Home className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Go Home</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick('support')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Support</span>
                    </button>
                    <button
                      onClick={() => handleMenuClick('email')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700">My Email</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={() => handleMenuClick('logout')}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    >
                      <X className="h-4 w-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;