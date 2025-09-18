'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Search, Hospital, MapPin, Phone, X } from 'lucide-react';

// --- MOCK DATA ---
const initialHospitals = [
  { id: 1, name: 'General Hospital, Ernakulam', location: 'Ernakulam', type: 'General Hospital', contact: '0484-2351234', status: 'Active' },
  { id: 2, name: 'PHC Edappally', location: 'Ernakulam', type: 'Primary Health Centre', contact: '0484-2805678', status: 'Active' },
  { id: 3, name: 'Medical College, Kozhikode', location: 'Kozhikode', type: 'Medical College', contact: '0495-2350216', status: 'Active' },
  { id: 4, name: 'Taluk Hospital, Alappuzha', location: 'Alappuzha', type: 'Taluk Hospital', contact: '0477-2253324', status: 'Inactive' },
  { id: 5, name: 'General Hospital, Trivandrum', location: 'Thiruvananthapuram', type: 'General Hospital', contact: '0471-2307890', status: 'Active' },
];

// --- MAIN COMPONENT ---
export default function ManageHospitalsPage() {
  const [hospitals, setHospitals] = useState(initialHospitals);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHospital, setNewHospital] = useState({ name: '', location: '', type: '', contact: '' });

  const filteredHospitals = useMemo(() =>
    hospitals.filter(h =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.location.toLowerCase().includes(searchTerm.toLowerCase())
    ), [hospitals, searchTerm]);

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
        id: hospitals.length + 1,
        ...newHospital,
        status: 'Active',
    };
    setHospitals([...hospitals, newEntry]);
    setIsModalOpen(false);
    setNewHospital({ name: '', location: '', type: '', contact: '' }); // Reset form
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="container mx-auto bg-white rounded-lg shadow-md p-6">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-6 pb-4 border-b">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Health Centers</h1>
            <p className="text-gray-500 mt-1">View, add, or edit registered health facilities.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Center
          </button>
        </header>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Hospitals Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Location</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Contact</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.map((hospital) => (
                <tr key={hospital.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{hospital.name}</td>
                  <td className="p-3">{hospital.location}</td>
                  <td className="p-3">{hospital.type}</td>
                  <td className="p-3">{hospital.contact}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${hospital.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {hospital.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Hospital Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Health Center</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-6 h-6 text-gray-500 hover:text-gray-800" /></button>
            </div>
            <form onSubmit={handleAddHospital}>
              <div className="space-y-4">
                <input type="text" placeholder="Health Center Name" value={newHospital.name} onChange={(e) => setNewHospital({...newHospital, name: e.target.value})} className="w-full p-2 border rounded-lg" required />
                <input type="text" placeholder="Location (e.g., District)" value={newHospital.location} onChange={(e) => setNewHospital({...newHospital, location: e.target.value})} className="w-full p-2 border rounded-lg" required />
                <input type="text" placeholder="Type (e.g., PHC, General Hospital)" value={newHospital.type} onChange={(e) => setNewHospital({...newHospital, type: e.target.value})} className="w-full p-2 border rounded-lg" required />
                <input type="text" placeholder="Contact Number" value={newHospital.contact} onChange={(e) => setNewHospital({...newHospital, contact: e.target.value})} className="w-full p-2 border rounded-lg" required />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Add Center</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}