import React from 'react';
import { Toaster } from 'sonner';
import ThemeSwitch from '@/components/MoonToggle';
import Link from 'next/link';

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-left" />
      <header className="w-full p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          OurReadingList
        </Link>
        <ThemeSwitch />
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 bg-white dark:bg-gray-900">
        <div className="w-full max-w-3xl bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          {children}
        </div>
      </main>
      <footer className="w-full p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} OurReadingList. All rights reserved.
      </footer>
    </div>
  );
}
