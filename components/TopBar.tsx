'use client';

import { Compass, ExternalLink } from 'lucide-react';

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/95 to-blue-50/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-sans font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WanderLens
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">AI Travel Planning</p>
            </div>
          </div>
          
          <a
            href="/pitch-deck"
            className="flex items-center space-x-2 text-sm font-sans font-medium tracking-tight text-gray-600 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-2"
            aria-label="View pitch deck"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">Pitch Deck</span>
          </a>
        </div>
      </div>
    </header>
  );
}