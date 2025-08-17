import React, { useState } from 'react';
import { Upload, Download, Save, Plus, Trash2 } from 'lucide-react';
import Layout from './Layout';

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

const GenerateInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2025-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    clientName: '',
    clientAddress: '',
    clientGST: '',
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 1, description: '', quantity: 0, rate: 0, amount: 0 }
  ]);

  const [totals, setTotals] = useState({
    subtotal: 0,
    gst: 0,
    total: 0
  });

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      description: '',
      quantity: 0,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.amount = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const gst = subtotal * 0.18; // 18% GST
    const total = subtotal + gst;
    
    setTotals({ subtotal, gst, total });
  };

  React.useEffect(() => {
    calculateTotals();
  }, [items]);

  const handlePOUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate PO processing
      alert('PO uploaded successfully! Invoice details will be auto-filled.');
      setInvoiceData(prev => ({
        ...prev,
        clientName: 'Sample Client Corp',
        clientAddress: '123 Business Street, City, State - 123456',
        clientGST: 'GST123456789'
      }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout title="Generate New Invoice">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header Controls */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">New Invoice</h2>
            <div className="flex items-center space-x-3">
              <label className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-2 transition-colors">
                <Upload className="h-4 w-4" />
                <span>Upload PO</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePOUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Print</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Save className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Invoice Form */}
          <div className="p-6">
            {/* Company Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-600">Aetheris X</h1>
              <p className="text-gray-600">Business Management Solutions</p>
              <p className="text-sm text-gray-500">GST: 123456789 | PAN: ABCDE1234F</p>
            </div>

            {/* Invoice Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Invoice Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                    <input
                      type="text"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={invoiceData.date}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Bill To</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={invoiceData.clientName}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={invoiceData.clientAddress}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, clientAddress: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                    <input
                      type="text"
                      value={invoiceData.clientGST}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, clientGST: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Invoice Items</h3>
                <button
                  onClick={addItem}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg flex items-center space-x-2 text-sm transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">#</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Description</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Qty</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Rate</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Amount</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-3 text-center">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-3">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="w-full px-2 py-1 border-none focus:ring-0 focus:outline-none"
                            placeholder="Enter description"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                            className="w-full px-2 py-1 border-none focus:ring-0 focus:outline-none text-center"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                            className="w-full px-2 py-1 border-none focus:ring-0 focus:outline-none text-right"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                          ₹{item.amount.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-4 py-3 text-center">
                          {items.length > 1 && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-80">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%):</span>
                      <span className="font-medium">₹{totals.gst.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GenerateInvoice;