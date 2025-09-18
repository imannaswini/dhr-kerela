'use client'; 

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ShieldAlert, Users, Hospital, Stethoscope, FileText, Send, Building2, Search } from 'lucide-react';
import React from 'react';
import Link from 'next/link'; // <-- 1. Import the Link component

// --- MOCK DATA ---
const dailyRegistrations = [
  { day: 'Sep 11', count: 34 }, { day: 'Sep 12', count: 45 }, { day: 'Sep 13', count: 62 },
  { day: 'Sep 14', count: 51 }, { day: 'Sep 15', count: 75 }, { day: 'Sep 16', count: 82 },
  { day: 'Sep 17', count: 91 },
];

const recentAlerts = [
    { id: 1, type: 'High Fever Cluster', location: 'Ernakulam', date: '2025-09-16', status: 'Under Investigation' },
    { id: 2, type: 'Contagious Skin Rash', location: 'Kozhikode', date: '2025-09-15', status: 'Action Required' },
    { id: 3, type: 'Respiratory Illness Spike', location: 'Thiruvananthapuram', date: '2025-09-14', status: 'Contained' },
];

// --- MAIN COMPONENT ---
export default function GovernmentDashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Government Dashboard</h1>
          <p className="text-gray-500 mt-1">Wednesday, September 17, 2025</p>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Users className="w-8 h-8 text-blue-500" />} title="Total Workers Registered" value="1,25,430" />
          <StatCard icon={<ShieldAlert className="w-8 h-8 text-red-500" />} title="Active Health Alerts" value="12" />
          <StatCard icon={<Hospital className="w-8 h-8 text-green-500" />} title="Registered Health Centers" value="87" />
          <StatCard icon={<Stethoscope className="w-8 h-8 text-indigo-500" />} title="Screenings This Month" value="14,208" />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">New Registrations (Last 7 Days)</h2>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={dailyRegistrations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#10B981" name="New Workers" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              {/* --- 3. Add the 'href' property to each card --- */}
              <ActionCard icon={<Send className="w-6 h-6 text-white"/>} title="Broadcast Health Alert" description="Send notifications to health centers." href="/gov/alerts" />
              <ActionCard icon={<FileText className="w-6 h-6 text-white"/>} title="Generate Reports" description="Create public health and activity reports." href="/gov/reports" />
              <ActionCard icon={<Building2 className="w-6 h-6 text-white"/>} title="Manage Hospitals" description="View and update registered facilities." href="/gov/hospitals" />
              <ActionCard icon={<Search className="w-6 h-6 text-white"/>} title="Worker Directory" description="Search for a registered worker." href="/gov/workers" />
            </div>
          </div>
        </div>

        {/* Recent Alerts Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Health Alerts</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-semibold">Alert Type</th>
                            <th className="p-3 font-semibold">Location</th>
                            <th className="p-3 font-semibold">Date</th>
                            <th className="p-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentAlerts.map((alert) => (
                            <tr key={alert.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{alert.type}</td>
                                <td className="p-3">{alert.location}</td>
                                <td className="p-3">{alert.date}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-sm font-semibold rounded-full ${
                                        alert.status === 'Action Required' ? 'bg-red-100 text-red-700' :
                                        alert.status === 'Under Investigation' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                        {alert.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---
function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string; }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// --- 2. Update the ActionCard component to use Link ---
function ActionCard({ icon, title, description, href }: { icon: React.ReactNode; title: string; description: string; href: string; }) {
  return (
    <Link href={href} className="w-full text-left p-4 rounded-lg flex items-center space-x-4 bg-green-600 hover:bg-green-700 transition-colors text-white shadow-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-green-100">{description}</p>
      </div>
    </Link>
  );
}