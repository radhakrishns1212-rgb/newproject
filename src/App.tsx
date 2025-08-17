import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import OtpVerification from './components/OtpVerification';
import Dashboard from './components/Dashboard';
import Invoice from './components/Invoice';
import GenerateInvoice from './components/GenerateInvoice';
import OldInvoice from './components/OldInvoice';
import Orders from './components/Orders';
import Works from './components/Works';
import Materials from './components/Materials';
import InputBills from './components/InputBills';
import TaxFiling from './components/TaxFiling';
import EWayBill from './components/EWayBill';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/invoice/generate" element={<GenerateInvoice />} />
            <Route path="/invoice/old" element={<OldInvoice />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/works" element={<Works />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/input-bills" element={<InputBills />} />
            <Route path="/tax-filing" element={<TaxFiling />} />
            <Route path="/eway-bill" element={<EWayBill />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;