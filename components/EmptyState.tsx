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
      <div className="text-center py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Hero Icon */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6">
              <div className="text-6xl sm:text-7xl animate-bounce-subtle">📷</div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4" />
              <span>Powered by AI Vision & Travel Intelligence</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            Turn Your Travel Photos Into
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2 font-sans tracking-tight">
              Perfect Itineraries
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed px-4">
            Upload photos, videos, or URLs from your dream destinations and let our AI create 
            personalized travel bundles with flights, stays, activities, and local insights.
          </p>
        </div>
      </div>

      {/* Media Uploader */}
      <div className="max-w-3xl mx-auto">
        <MediaUploader onAnalysisComplete={onAnalysisComplete} />
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <div className="text-2xl">⚡</div>
            </div>
            <h3 className="font-sans font-semibold tracking-tight text-gray-900 mb-3 leading-relaxed">Smart Analysis</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI identifies destinations, activities, and travel preferences from your photos and videos
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <div className="text-2xl">🗺️</div>
            </div>
            <h3 className="font-sans font-semibold tracking-tight text-gray-900 mb-3 leading-relaxed">Complete Bundles</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Get flights, accommodations, activities, and local experiences in one package
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <div className="text-2xl">🌍</div>
            </div>
            <h3 className="font-sans font-semibold tracking-tight text-gray-900 mb-3 leading-relaxed">Instant Booking</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Book your entire trip with one click, including eco-friendly and accessible options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}