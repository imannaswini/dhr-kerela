'use client'; // This must be a client component because it uses hooks (useState).

import React, { useState } from 'react';
import Link from 'next/link';
import { HeartPulse, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/#features', label: 'Features' },
    { href: '/#about', label: 'About' },
    // You can add more links here later, e.g., for different portals
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Branding */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <HeartPulse className="text-green-600 w-8 h-8" />
              <span className="text-xl font-bold text-gray-800">Kerala Migrant Health</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-gray-600 hover:text-green-600 transition-colors font-medium">
                {link.label}
              </Link>
            ))}
            <Link href="/auth/login" className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
               Login
            </Link>
             <Link href="/auth/signup" className="text-green-600 font-semibold hover:text-green-700 transition-colors">
                Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md  to-blue-400 hover:text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu on link click
                className="text-gray-700 hover:bg-green-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              onClick={() => setIsOpen(false)}
              className="bg-green-600 text-white block w-full text-left mt-2 px-3 py-2 rounded-md text-base font-medium"
            >
               Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}