'use client';

import React, { useState } from 'react';
import { Building2, ShieldHalf, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import SignUpForm from '@/components/auth/SignUpForm';

// --- MAIN SIGNUP COMPONENT ---
export default function SignUpPage() {
  const router = useRouter(); // Initialize the router
  const [step, setStep] = useState('selection'); 
  const [role, setRole] = useState<'gov' | 'hospital' | 'worker' | null>(null);

  const handleRoleSelect = (selectedRole: 'gov' | 'hospital' | 'worker') => {
    setRole(selectedRole);
    setStep('details'); // Move to the next step
  };

  const handleBack = () => {
      setStep('selection');
      setRole(null);
  };

  // This function will be called on successful sign-up to handle the redirection
  const handleSignUpSuccess = (redirectUrl: string) => {
      router.push(redirectUrl);
  };

  if (step === 'selection') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xl p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Join the Health Network</h1>
            <p className="mt-2 text-gray-600">First, please select your role to get started.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RoleCard 
              icon={<ShieldHalf className="w-12 h-12 text-blue-600"/>} 
              title="Government Official" 
              description="For authorized health department officials." 
              onClick={() => handleRoleSelect('gov')}
            />
            <RoleCard 
              icon={<Building2 className="w-12 h-12 text-green-600"/>} 
              title="Hospital / Center" 
              description="Register your health facility on the network." 
              onClick={() => handleRoleSelect('hospital')}
            />
            <RoleCard 
              icon={<User className="w-12 h-12 text-red-600"/>} 
              title="Migrant Worker" 
              description="Create your personal digital health account." 
              onClick={() => handleRoleSelect('worker')}
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-green-600 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'details' && role) {
    return <SignUpForm role={role} onBack={handleBack} onSignUpSuccess={handleSignUpSuccess} />;
  }

  return null;
}

// --- HELPER COMPONENT for the role selection cards ---
function RoleCard({ icon, title, description, onClick }: { icon: React.ReactNode; title: string; description: string; onClick: () => void; }) {
  return (
    <button 
      onClick={onClick} 
      className="p-6 text-center border rounded-lg hover:shadow-lg hover:border-green-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </button>
  );
}