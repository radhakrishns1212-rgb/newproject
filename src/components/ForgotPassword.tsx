import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      navigate('/otp-verification', { state: { email } });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <Link to="/login" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>

          <div className="text-center mb-8">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-gray-600 mt-2">Enter your email to receive an OTP</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 transition-all font-medium disabled:opacity-50"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;