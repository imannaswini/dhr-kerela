import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast'; // <-- 1. Import Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kerala Migrant Health Record System',
  description: 'A digital platform for managing the health records of migrant workers in Kerala.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" /> {/* <-- 2. Add the Toaster component */}
        <Navbar />
        <main className="pt-16">
            {children}
        </main>
      </body>
    </html>
  );
}