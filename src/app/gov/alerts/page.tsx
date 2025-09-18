'use client';

import React, { useState } from 'react';
import { Send, BellRing, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast'; // For notifications

// --- ADD-ON: Notifications (react-hot-toast) ---
// 1. Install: npm install react-hot-toast
// 2. Add <Toaster /> component to your layout.tsx or a root provider.

// --- MOCK DATA ---
const districts = [
    'Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod', 'Kollam',
    'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Pathanamthitta',
    'Thiruvananthapuram', 'Thrissur', 'Wayanad'
];

// --- MAIN COMPONENT ---
export default function BroadcastAlertPage() {
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('Informational'); // e.g., Informational, Urgent, Critical
  const [targetDistricts, setTargetDistricts] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);

  const handleDistrictChange = (district: string) => {
    setTargetDistricts(prev =>
      prev.includes(district)
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  const handleSendAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!alertTitle || !alertMessage || targetDistricts.length === 0) {
        toast.error('Please fill all fields and select at least one district.');
        setIsSending(false);
        return;
    }

    console.log({
      alertTitle,
      alertMessage,
      alertType,
      targetDistricts,
      timestamp: new Date().toISOString(),
    });

    toast.success('Health alert successfully broadcasted!');
    // Reset form
    setAlertTitle('');
    setAlertMessage('');
    setAlertType('Informational');
    setTargetDistricts([]);
    setIsSending(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <Toaster /> {/* Required for react-hot-toast notifications */}
      <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
        
        {/* Header */}
        <header className="mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800">Broadcast Health Alert</h1>
          <p className="text-gray-500 mt-1">Send important health notifications to relevant areas.</p>
        </header>

        <form onSubmit={handleSendAlert} className="space-y-6">
          {/* Alert Title */}
          <div>
            <label htmlFor="alertTitle" className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
            <input
              type="text"
              id="alertTitle"
              value={alertTitle}
              onChange={(e) => setAlertTitle(e.target.value)}
              placeholder="e.g., Dengue Fever Outbreak Warning"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Alert Message */}
          <div>
            <label htmlFor="alertMessage" className="block text-sm font-medium text-gray-700 mb-1">Alert Message</label>
            <textarea
              id="alertMessage"
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              rows={6}
              placeholder="Provide detailed information about the alert, necessary precautions, etc."
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>

          {/* Alert Type & Target Districts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alert Type */}
            <div>
              <label htmlFor="alertType" className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
              <select
                id="alertType"
                value={alertType}
                onChange={(e) => setAlertType(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Informational">Informational (Low Urgency)</option>
                <option value="Urgent">Urgent (Medium Urgency)</option>
                <option value="Critical">Critical (High Urgency)</option>
              </select>
            </div>

            {/* Target Districts */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Districts</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded-lg bg-gray-50">
                {districts.map((district) => (
                  <label key={district} className="flex items-center text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={targetDistricts.includes(district)}
                      onChange={() => handleDistrictChange(district)}
                      className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700">{district}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t mt-6">
            <button
              type="submit"
              className="flex items-center bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <BellRing className="w-5 h-5 mr-2 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Broadcast Alert
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
