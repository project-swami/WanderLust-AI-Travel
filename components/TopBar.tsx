'use client';

import { Compass, ExternalLink } from 'lucide-react';

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-xl">
              <Compass className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-sans font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WanderLens
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block font-sans font-medium">AI Travel Planning</p>
            </div>
          </div>
          
          <a
            href="/pitch-deck"
            className="flex items-center space-x-3 text-base font-sans font-bold tracking-tight text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl px-6 py-3"
            aria-label="View pitch deck"
          >
            <ExternalLink className="h-5 w-5" />
            <span className="hidden sm:inline">Pitch Deck</span>
          </a>
        </div>
      </div>
    </header>
  );
}