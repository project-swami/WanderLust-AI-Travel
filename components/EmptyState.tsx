'use client';

import { Sparkles } from 'lucide-react';
import { MediaUploader } from './MediaUploader';

interface EmptyStateProps {
  onAnalysisComplete?: (result: any) => void;
}

export function EmptyState({ onAnalysisComplete }: EmptyStateProps) {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Icon */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 mb-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl">
              <div className="text-7xl sm:text-8xl">📷</div>
            </div>
            <div className="flex items-center justify-center space-x-3 text-lg text-gray-600">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <span className="font-sans font-semibold tracking-tight">Powered by AI Vision & Travel Intelligence</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-black tracking-tight text-gray-900 mb-8 leading-tight">
            Turn Your Travel Photos Into
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mt-4 font-sans tracking-tight">
              Perfect Itineraries
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-600 mb-16 leading-relaxed px-4 max-w-3xl mx-auto font-sans">
            Upload photos, videos, or URLs from your dream destinations and let our AI create 
            personalized travel bundles with flights, stays, activities, and local insights.
          </p>
        </div>
      </div>

      {/* Media Uploader */}
      <div className="max-w-4xl mx-auto">
        <MediaUploader onAnalysisComplete={onAnalysisComplete} />
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
              <div className="text-3xl">⚡</div>
            </div>
            <h3 className="font-sans font-bold tracking-tight text-gray-900 mb-4 leading-relaxed text-xl">Smart Analysis</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              AI identifies destinations, activities, and travel preferences from your photos and videos
            </p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-6 shadow-lg">
              <div className="text-3xl">🗺️</div>
            </div>
            <h3 className="font-sans font-bold tracking-tight text-gray-900 mb-4 leading-relaxed text-xl">Complete Bundles</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Get flights, accommodations, activities, and local experiences in one package
            </p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-2 border-gray-100 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-6 shadow-lg">
              <div className="text-3xl">🌍</div>
            </div>
            <h3 className="font-sans font-bold tracking-tight text-gray-900 mb-4 leading-relaxed text-xl">Instant Booking</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Book your entire trip with one click, including eco-friendly and accessible options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}