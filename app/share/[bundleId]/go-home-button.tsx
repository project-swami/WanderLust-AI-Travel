'use client';

import { ArrowLeft } from 'lucide-react';

export function GoHomeButton() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleGoHome}
      className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-sans font-bold tracking-tight px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <span className="flex items-center justify-center space-x-2">
        <ArrowLeft className="h-5 w-5" />
        <span>Create Your Own</span>
      </span>
    </button>
  );
}