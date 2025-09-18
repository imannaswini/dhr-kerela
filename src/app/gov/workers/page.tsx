'use client';

import React, { useState, useMemo } from 'react';
import { Search, User, ClipboardList, Calendar, MapPin, Mail, Phone, Info } from 'lucide-react';

// --- MOCK DATA ---
const initialWorkers = [
  { id: 'MW001', name: 'Raju Kumar', dob: '1990-05-15', gender: 'Male', contact: '9876543210', current_district: 'Ernakulam', primary_language: 'Hindi', recent_visit: '2025-09-01' },
  { id: 'MW002', name: 'Priya Devi', dob: '1992-11-22', gender: 'Female', contact: '9876512345', current_district: 'Kozhikode', primary_language: 'Bengali', recent_visit: '2025-08-20' },
  { id: 'MW003', name: 'Mohammed Ali', dob: '1988-03-01', gender: 'Male', contact: '9876598765', current_district: 'Thiruvananthapuram', primary_language: 'Urdu', recent_visit: '2025-09-10' },
  { id: 'MW004', name: 'Sanju Sharma', dob: '1995-07-04', gender: 'Male', contact: '9876567890', current_district: 'Ernakulam', primary_language: 'Oriya', recent_visit: '2025-07-15' },
  { id: 'MW005', name: 'Asha Rani', dob: '1993-01-30', gender: 'Female', contact: '9876509876', current_district: 'Kollam', primary_language: 'Tamil', recent_visit: '2025-09-05' },
];

// --- MAIN COMPONENT ---
export default function WorkerDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<typeof initialWorkers[0] | null>(null);

  const filteredWorkers = useMemo(() =>
    initialWorkers.filter(worker =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.current_district.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        {/* Header */}
        <header className="mb-6 pb-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800">Migrant Worker Directory</h1>
          <p className="text-gray-500 mt-1">Search and view registered migrant worker profiles.</p>
        </header>

        {/* Search Bar */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Worker ID, Name, or District..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Worker List */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-semibold p-4 border-b">Search Results</h2>
                {filteredWorkers.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">No workers found matching your criteria.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 font-semibold">Worker ID</th>
                                    <th className="p-3 font-semibold">Name</th>
                                    <th className="p-3 font-semibold">District</th>
                                    <th className="p-3 font-semibold">Recent Visit</th>
                                    <th className="p-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWorkers.map((worker) => (
                                    <tr key={worker.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{worker.id}</td>
                                        <td className="p-3">{worker.name}</td>
                                        <td className="p-3">{worker.current_district}</td>
                                        <td className="p-3">{worker.recent_visit}</td>
                                        <td className="p-3">
                                            <button onClick={() => setSelectedWorker(worker)} className="text-blue-600 hover:underline flex items-center">
                                                <Info className="w-4 h-4 mr-1"/> View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Worker Profile / Details */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 border-b pb-3">Worker Profile</h2>
                {selectedWorker ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <User className="w-8 h-8 text-gray-600" />
                            <div>
                                <p className="text-lg font-bold">{selectedWorker.name}</p>
                                <p className="text-sm text-gray-500">ID: {selectedWorker.id}</p>
                            </div>
                        </div>
                        <p className="flex items-center text-gray-700"><ClipboardList className="w-5 h-5 mr-2 text-green-600" /> Gender: {selectedWorker.gender}</p>
                        <p className="flex items-center text-gray-700"><Calendar className="w-5 h-5 mr-2 text-green-600" /> DOB: {selectedWorker.dob}</p>
                        <p className="flex items-center text-gray-700"><MapPin className="w-5 h-5 mr-2 text-green-600" /> Current District: {selectedWorker.current_district}</p>
                        <p className="flex items-center text-gray-700"><Phone className="w-5 h-5 mr-2 text-green-600" /> Contact: {selectedWorker.contact}</p>
                        <p className="flex items-center text-gray-700"><Mail className="w-5 h-5 mr-2 text-green-600" /> Primary Language: {selectedWorker.primary_language}</p>
                        <p className="text-sm text-gray-500 italic mt-6">
                            *This view is read-only for public health surveillance purposes.
                        </p>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 p-8">
                        Select a worker from the list to view their profile.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}