'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  role: 'gov' | 'hospital' | 'worker';
  onBack: () => void;
  onLoginSuccess: (redirectUrl: string) => void; 
}

export default function LoginForm({ role, onBack, onLoginSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading('Logging in...');
    
    // Simulate API call for login verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Login attempt for role:", role, "with data:", formData);
    toast.dismiss();
    toast.success('Login successful! Redirecting...');
    
    let redirectUrl = '/';
    if (role === 'gov') redirectUrl = '/gov';
    if (role === 'hospital') redirectUrl = '/hospital';
    if (role === 'worker') redirectUrl = '/worker';

    onLoginSuccess(redirectUrl);
  };
  
  const renderFormFields = () => {
    switch (role) {
      case 'gov':
        return (
          <>
            <input name="employeeId" type="text" placeholder="Employee ID" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="password" type="password" placeholder="Password" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
          </>
        );
      case 'hospital':
        return (
          <>
            <input name="registrationNumber" type="text" placeholder="Hospital Registration Number" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="password" type="password" placeholder="Password" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
          </>
        );
      case 'worker':
        return (
          <>
            <input name="mobileNumber" type="tel" placeholder="Mobile Number" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <div className="flex gap-2">
                <input name="otp" type="text" placeholder="Enter OTP" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
                <button type="button" className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 whitespace-nowrap">Send OTP</button>
            </div>
          </>
        );
      default:
        return <p>Invalid role selected.</p>;
    }
  };

  const getTitle = () => {
      if (role === 'gov') return 'Government Portal Login';
      if (role === 'hospital') return 'Hospital Portal Login';
      return 'Worker Portal Login';
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <button onClick={onBack} className="flex items-center text-sm text-gray-600 hover:text-green-600">
          <ArrowLeft className="w-4 h-4 mr-1"/>
          Back to role selection
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            {renderFormFields()}
            <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60">
                {isSubmitting ? 'Verifying...' : 'Log In'}
            </button>
        </form>
      </div>
    </div>
  );
}