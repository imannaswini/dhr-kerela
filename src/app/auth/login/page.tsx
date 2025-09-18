'use client';

import React, { useState } from 'react';
import { Building2, ShieldHalf, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState('selection'); 
  const [role, setRole] = useState<'gov' | 'hospital' | 'worker' | null>(null);

  const handleRoleSelect = (selectedRole: 'gov' | 'hospital' | 'worker') => {
    setRole(selectedRole);
    setStep('details');
  };

  const handleBack = () => {
      setStep('selection');
      setRole(null);
  };

  const handleLoginSuccess = (redirectUrl: string) => {
      router.push(redirectUrl);
  };

  if (step === 'selection') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-xl p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Please select your portal to log in.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RoleCard 
              icon={<ShieldHalf className="w-12 h-12 text-blue-600"/>} 
              title="Government Official" 
              description="Log in to the administrative dashboard." 
              onClick={() => handleRoleSelect('gov')}
            />
            <RoleCard 
              icon={<Building2 className="w-12 h-12 text-green-600"/>} 
              title="Hospital / Center" 
              description="Access your facility's portal." 
              onClick={() => handleRoleSelect('hospital')}
            />
            <RoleCard 
              icon={<User className="w-12 h-12 text-red-600"/>} 
              title="Migrant Worker" 
              description="View your personal health account." 
              onClick={() => handleRoleSelect('worker')}
            />
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Dont have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-green-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'details' && role) {
    return <LoginForm role={role} onBack={handleBack} onLoginSuccess={handleLoginSuccess} />;
  }

  return null;
}

// Helper component for role cards
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