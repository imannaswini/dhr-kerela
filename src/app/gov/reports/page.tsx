'use client';

import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Calendar, MapPin, Download } from 'lucide-react';

// --- MOCK DATA ---
const registrationData = [
  { month: 'Jan', count: 1200 }, { month: 'Feb', count: 1800 }, { month: 'Mar', count: 1500 },
  { month: 'Apr', count: 2100 }, { month: 'May', count: 2500 }, { month: 'Jun', count: 2300 },
];
const diseaseData = [
  { name: 'Fever', value: 400 }, { name: 'Respiratory', value: 300 },
  { name: 'Dermatological', value: 300 }, { name: 'Other', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// --- MAIN COMPONENT ---
export default function GenerateReportsPage() {
  const [reportType, setReportType] = useState('monthly_registrations');
  const [dateRange, setDateRange] = useState({ start: '2025-01-01', end: '2025-06-30' });
  const [district, setDistrict] = useState('all');
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would fetch data here based on the state.
    // For now, we just set the report type to be displayed.
    setGeneratedReport(reportType);
  };

  const renderReportContent = () => {
    if (!generatedReport) {
      return <div className="text-center text-gray-500 p-12 bg-gray-50 rounded-lg">Please configure and generate a report to see the results.</div>;
    }

    switch (generatedReport) {
      case 'monthly_registrations':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Monthly Registrations</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#10B981" name="New Registrations" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case 'disease_prevalence':
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Disease Prevalence</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={diseaseData} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value" nameKey="name" label>
                    {diseaseData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      default:
        return <div className="text-center text-gray-500 p-12">Report type not found.</div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Health Reports</h1>
          <p className="text-gray-500 mt-1">Generate and view public health and activity reports.</p>
        </header>

        {/* Configuration Panel */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleGenerateReport} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Report Type */}
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select id="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="monthly_registrations">Monthly Registrations</option>
                <option value="disease_prevalence">Disease Prevalence</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" id="startDate" value={dateRange.start} onChange={(e) => setDateRange({...dateRange, start: e.target.value})} className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input type="date" id="endDate" value={dateRange.end} onChange={(e) => setDateRange({...dateRange, end: e.target.value})} className="w-full p-2 border rounded-lg" />
            </div>

            {/* Generate Button */}
            <button type="submit" className="w-full bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors h-10">
              Generate Report
            </button>
          </form>
        </div>

        {/* Report Display Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Report Results</h2>
            {generatedReport && (
              <button className="flex items-center text-green-600 font-semibold px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </button>
            )}
          </div>
          {renderReportContent()}
        </div>
      </div>
    </div>
  );
}