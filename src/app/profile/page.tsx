'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { User, ShieldHalf, Building2, LogOut, Edit, Mail, Phone, MapPin, X, Camera } from 'lucide-react';

// --- TYPE DEFINITIONS ---
type GovProfile = { role: 'gov'; name: string; email: string; employeeId: string; department: string; };
type HospitalProfile = { role: 'hospital'; name: string; email: string; hospitalName: string; registrationNumber: string; };
type WorkerProfile = { role: 'worker'; name: string; mobile: string; id: string; homeState: string; };
type UserProfile = GovProfile | HospitalProfile | WorkerProfile;

// --- MOCK DATA ---
const userProfileData: Record<'gov' | 'hospital' | 'worker', UserProfile> = {
  gov: { role: 'gov', name: 'Dr. Anitha Sharma', email: 'anitha.s@kerala.gov.in', employeeId: 'GOV54321', department: 'Health Service Department' },
  hospital: { role: 'hospital', name: 'Mr. Rajan Nair', email: 'admin@gh-ernakulam.in', hospitalName: 'General Hospital, Ernakulam', registrationNumber: 'HOS12345' },
  worker: { role: 'worker', name: 'Ravi Verma', mobile: '9876543210', id: 'MW101', homeState: 'Uttar Pradesh' },
};
const loggedInUserRole: 'gov' | 'hospital' | 'worker' = 'worker';


// --- MAIN PROFILE PAGE COMPONENT ---
export default function ProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<UserProfile>(userProfileData[loggedInUserRole]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    toast.success('You have been logged out.');
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };
  
  const handleSaveProfile = (updatedData: UserProfile) => {
    setProfileData(updatedData);
    setIsEditModalOpen(false);
    toast.success('Profile updated successfully!');
  };

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handlePictureSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSavePicture = async () => {
    if (!selectedFile) {
      toast.error("Please select a picture first.");
      return;
    }
    toast.loading("Uploading picture...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.dismiss();
    toast.success("Profile picture updated!");
    setSelectedFile(null);
  };
  
  const renderProfileDetails = () => {
    switch (profileData.role) {
      case 'gov':
        return (
          <>
            <ProfileDetail icon={<Mail />} label="Official Email" value={profileData.email} />
            <ProfileDetail icon={<ShieldHalf />} label="Employee ID" value={profileData.employeeId} />
            <ProfileDetail icon={<Building2 />} label="Department" value={profileData.department} />
          </>
        );
      case 'hospital':
        return (
          <>
            <ProfileDetail icon={<Mail />} label="Admin Email" value={profileData.email} />
            <ProfileDetail icon={<Building2 />} label="Hospital Name" value={profileData.hospitalName} />
            <ProfileDetail icon={<ShieldHalf />} label="Registration No." value={profileData.registrationNumber} />
          </>
        );
      case 'worker':
        return (
          <>
            <ProfileDetail icon={<Phone />} label="Registered Mobile" value={profileData.mobile} />
            <ProfileDetail icon={<User />} label="Health ID" value={profileData.id} />
            <ProfileDetail icon={<MapPin />} label="Home State" value={profileData.homeState} />
          </>
        );
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-end mb-4">
            <button onClick={handleLogout} className="flex items-center text-sm text-red-600 hover:text-red-800 font-semibold">
              <LogOut className="w-4 h-4 mr-1" />
              Log Out
            </button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative">
              <input type="file" ref={fileInputRef} onChange={handlePictureSelect} accept="image/*" className="hidden" />
              <div className="w-24 h-24 bg-green-600 text-white rounded-full flex items-center justify-center mb-2 overflow-hidden">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold">{getInitials(profileData.name)}</span>
                )}
              </div>
              <button onClick={handleUploadClick} className="absolute bottom-2 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            {selectedFile && (
                <button onClick={handleSavePicture} className="text-sm bg-blue-500 text-white font-semibold px-3 py-1 rounded-full hover:bg-blue-600 transition-colors mb-4">
                    Save Picture
                </button>
            )}

            <div className="text-center w-full">
              <h1 className="text-3xl font-bold text-gray-800">{profileData.name}</h1>
              <p className="text-gray-500 capitalize">{profileData.role} Account</p>
              
              <div className="mt-6 space-y-4 border-t pt-6 text-left">
                {renderProfileDetails()}
              </div>

              <div className="mt-8 w-full">
                <button 
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center justify-center w-full bg-green-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        userData={profileData}
        onSave={handleSaveProfile}
      />
    </>
  );
}

// --- HELPER COMPONENTS ---
function ProfileDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string; }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-8 text-gray-500">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-md font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function EditProfileModal({ isOpen, onClose, userData, onSave }: { isOpen: boolean; onClose: () => void; userData: UserProfile; onSave: (data: UserProfile) => void; }) {
  const [localData, setLocalData] = useState(userData);

  useEffect(() => {
    setLocalData(userData);
  }, [userData]);
  
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const renderEditFields = () => {
    switch (localData.role) {
      case 'gov':
        return (
          <>
            <EditField label="Full Name" name="name" value={localData.name} onChange={handleChange} />
            <EditField label="Official Email" name="email" value={localData.email} onChange={handleChange} />
          </>
        );
      case 'hospital':
        return (
          <>
            <EditField label="Admin Name" name="name" value={localData.name} onChange={handleChange} />
            <EditField label="Admin Email" name="email" value={localData.email} onChange={handleChange} />
          </>
        );
      case 'worker':
        return (
          <>
            <EditField label="Full Name" name="name" value={localData.name} onChange={handleChange} />
            <EditField label="Registered Mobile" name="mobile" value={localData.mobile} onChange={handleChange} />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4"><X className="w-6 h-6 text-gray-500 hover:text-gray-800" /></button>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <div className="space-y-4">
          {renderEditFields()}
        </div>
        <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
          <button onClick={() => onSave(localData)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function EditField({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input 
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded-lg mt-1"
      />
    </div>
  );
}