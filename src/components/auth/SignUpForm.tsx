'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

// The props now include an onSignUpSuccess function
interface SignUpFormProps {
  role: 'gov' | 'hospital' | 'worker';
  onBack: () => void;
  onSignUpSuccess: (redirectUrl: string) => void; 
}

// --- MAIN FORM COMPONENT ---
export default function SignUpForm({ role, onBack, onSignUpSuccess }: SignUpFormProps) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading('Submitting registration...');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form Submitted for role:", role, "with data:", formData);
    toast.dismiss();
    toast.success('Registration successful! Redirecting...');
    
    // Determine the correct dashboard URL based on the role
    let redirectUrl = '/'; // Default fallback
    if (role === 'gov') redirectUrl = '/gov';
    if (role === 'hospital') redirectUrl = '/hospital';
    if (role === 'worker') redirectUrl = '/worker';

    // Call the success function with the URL
    onSignUpSuccess(redirectUrl);
  };
  
  // Render the correct form fields based on the role
  const renderFormFields = () => {
    switch (role) {
      case 'gov':
        return (
          <>
            <input name="officialEmail" type="email" placeholder="Official Email (@kerala.gov.in)" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="employeeId" type="text" placeholder="Employee ID" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="verificationCode" type="text" placeholder="Department Verification Code" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
          </>
        );
      case 'hospital':
        return (
          <>
            <input name="hospitalName" type="text" placeholder="Hospital / Center Name" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="registrationNumber" type="text" placeholder="Hospital Registration Number" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="adminContact" type="tel" placeholder="Administrator Contact Number" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
          </>
        );
      case 'worker':
        return (
          <>
            <input name="name" type="text" placeholder="Full Name" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="mobileNumber" type="tel" placeholder="Mobile Number (for OTP)" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input name="aadhaarNumber" type="text" placeholder="Aadhaar Number" onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
          </>
        );
      default:
        return <p>Invalid role selected.</p>;
    }
  };

  const getTitle = () => {
      if (role === 'gov') return 'Government Official Registration';
      if (role === 'hospital') return 'Hospital / Center Registration';
      return 'Worker Registration';
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
                {isSubmitting ? 'Submitting...' : 'Create Account'}
            </button>
        </form>
      </div>
    </div>
  );
}