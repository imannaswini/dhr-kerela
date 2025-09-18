'use client';

import React, { useRef } from 'react'; // 1. Import useRef
import { toPng } from 'html-to-image'; // 2. Import the library
import { QrCode, User, ShieldCheck, Stethoscope, MapPin, Phone } from 'lucide-react';

// --- MOCK DATA ---
const workerData = {
  id: 'MW101',
  name: 'Ravi Verma',
  dob: '1990-05-15',
  bloodGroup: 'O+',
  contact: '9876543210',
  emergencyContact: '8765432109',
};

const medicalHistory = [
  { date: '2025-09-01', hospital: 'General Hospital, Ernakulam', diagnosis: 'Viral Fever', notes: 'Prescribed Paracetamol. Advised rest for 3 days.' },
  { date: '2025-07-15', hospital: 'PHC Edappally', diagnosis: 'Routine Checkup', notes: 'Vitals are normal. Tetanus shot administered.' },
  { date: '2024-12-10', hospital: 'General Hospital, Ernakulam', diagnosis: 'Minor Injury', notes: 'Dressing applied to a small laceration on the left arm.' },
];

const nearbyClinics = [
    { name: 'PHC Edappally', distance: '2.5 km', contact: '0484-2805678', type: 'Primary Health Centre' },
    { name: 'Sunrise Hospital', distance: '4.1 km', contact: '0484-2428999', type: 'Private Hospital' },
    { name: 'General Hospital, Ernakulam', distance: '6.8 km', contact: '0484-2351234', type: 'Government Hospital' },
];

// --- MAIN COMPONENT ---
export default function WorkerDashboardPage() {
  // 3. Create a ref to target the ID card element
  const idCardRef = useRef<HTMLDivElement>(null);

  // 4. Create the function to handle the download
  const handleDownload = async () => {
    if (idCardRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(idCardRef.current, { cacheBust: true });
      // Create a link element, set its href to the image data, and trigger a click to download
      const link = document.createElement('a');
      link.download = `health-id-card-${workerData.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Oops, something went wrong!', err);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">My Health Portal</h1>
          <p className="text-gray-600 mt-1">Welcome back, {workerData.name}!</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Health ID Card */}
          <div className="lg:col-span-1">
            {/* 5. Attach the ref to the div you want to download */}
            <div ref={idCardRef} className="bg-white p-6 rounded-lg shadow-lg text-center sticky top-8">
              <h2 className="text-xl font-bold text-green-700 mb-4">My Health ID Card</h2>
              <div className="flex justify-center mb-4">
                <QrCode className="w-32 h-32 text-gray-800" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{workerData.name}</p>
              <p className="text-gray-600 font-medium">ID: {workerData.id}</p>
              <div className="text-left mt-6 space-y-2 border-t pt-4">
                <p><strong>Date of Birth:</strong> {workerData.dob}</p>
                <p><strong>Blood Group:</strong> {workerData.bloodGroup}</p>
                <p><strong>Contact:</strong> {workerData.contact}</p>
                <p><strong>Emergency:</strong> {workerData.emergencyContact}</p>
              </div>
            </div>
            {/* 6. Connect the handleDownload function to the button's onClick event */}
            <button
              onClick={handleDownload}
              className="mt-6 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Download Card
            </button>
          </div>
          
          {/* Right Column: Medical History & Nearby Clinics */}
          <div className="lg:col-span-2 space-y-8">
            {/* ... (rest of the code is unchanged) ... */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Stethoscope className="w-7 h-7 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">My Medical History</h2>
              </div>
              <div className="space-y-4">
                {medicalHistory.map((record, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-md">
                    <p className="font-bold text-blue-800">{record.diagnosis}</p>
                    <p className="text-sm font-medium text-gray-700">{record.hospital}</p>
                    <p className="text-sm text-gray-500">{record.date}</p>
                    <p className="mt-1 text-sm text-gray-600">{record.notes}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <MapPin className="w-7 h-7 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Nearby Health Centers</h2>
              </div>
              <div className="space-y-3">
                {nearbyClinics.map((clinic, index) => (
                  <div key={index} className="border p-3 rounded-lg flex items-start space-x-4 hover:bg-gray-50">
                    <div className="bg-red-100 p-2 rounded-full mt-1">
                        <MapPin className="w-5 h-5 text-red-600"/>
                    </div>
                    <div>
                        <p className="font-bold">{clinic.name}</p>
                        <p className="text-sm text-gray-600">{clinic.type} ({clinic.distance})</p>
                        <p className="text-sm text-gray-500 flex items-center"><Phone className="w-3 h-3 mr-1.5"/>{clinic.contact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}