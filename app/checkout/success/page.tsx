'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Calendar, MapPin, Plane, Bed, Activity, Share2, ArrowLeft } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import type { Bundle } from '@/lib/types';
import { mockBundlesSantorini, mockBundlesTokyo, mockBundlesBali } from '@/lib/fixtures';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const ref = searchParams.get('ref');

  useEffect(() => {
    // Extract bundle ID from reference and find matching bundle
    if (ref) {
      const bundleId = ref.split('_')[2]; // Extract from ref_timestamp_bundleId format
      
      // Search through all mock bundles to find the matching one
      const allBundles = [...mockBundlesSantorini, ...mockBundlesTokyo, ...mockBundlesBali];
      const foundBundle = allBundles.find(b => b.id === bundleId);
      
      if (foundBundle) {
        setBundle(foundBundle);
      } else {
        // Fallback to first Santorini bundle if not found
        setBundle(mockBundlesSantorini[0]);
      }
    }
  }, [ref]);

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startFormatted} - ${endFormatted}`;
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/share/${bundle?.id}`;
    navigator.clipboard.writeText(shareUrl);
    if (typeof window !== 'undefined') {
      // Simple feedback - in a real app you'd show a toast
      alert('Link copied to clipboard!');
    }
  };

  if (!bundle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <TopBar />
        <main className="pt-20">
          <div className="max-w-2xl mx-auto px-6 py-12 text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <TopBar />
      
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6 animate-bounce-subtle">🎉</div>
            <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 mb-4 leading-tight">
              Your itinerary is reserved!
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We've sent confirmation details to your email. Get ready for an amazing trip!
            </p>
            {ref && (
              <div className="mt-4 inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                <span className="text-sm font-sans font-semibold tracking-tight text-green-800">
                  Booking Reference: {ref}
                </span>
              </div>
            )}
          </div>

          {/* Bundle Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden mb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-sans font-bold tracking-tight leading-relaxed mb-2">
                    {bundle.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDateRange(bundle.dates.start, bundle.dates.end)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-sans font-bold tracking-tight">${bundle.pricePP}</div>
                  <div className="text-sm opacity-90">per person</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Flight Summary */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-semibold tracking-tight text-gray-900 mb-1">Flight</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {bundle.flight.from} → {bundle.flight.to} • {bundle.flight.carrier}
                  </p>
                  <p className="text-xs text-gray-500">
                    {bundle.flight.stops === 0 ? 'Direct flight' : `${bundle.flight.stops} stop${bundle.flight.stops > 1 ? 's' : ''}`}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-sans font-semibold tracking-tight text-gray-900">${bundle.flight.price}</span>
                </div>
              </div>

              {/* Stay Summary */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-xl">
                  <Bed className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-semibold tracking-tight text-gray-900 mb-1">Accommodation</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{bundle.stay.name}</p>
                  <p className="text-xs text-gray-500">
                    ⭐ {bundle.stay.rating} • {bundle.stay.nights} nights
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-sans font-semibold tracking-tight text-gray-900">
                    ${bundle.stay.pricePerNight}/night
                  </span>
                </div>
              </div>

              {/* Activities Summary */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <Activity className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans font-semibold tracking-tight text-gray-900 mb-2">Activities</h3>
                  <div className="space-y-1">
                    {bundle.activities.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                        <span>{activity.name}</span>
                      </div>
                    ))}
                    {bundle.activities.length > 3 && (
                      <div className="text-xs text-gray-500 ml-3.5">
                        +{bundle.activities.length - 3} more activities
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-sans font-bold tracking-tight px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span>Go to Trips</span>
              </span>
            </button>
            
            <button
              onClick={handleShare}
              className="bg-white text-gray-700 border border-gray-300 font-sans font-bold tracking-tight px-8 py-4 rounded-2xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <span className="flex items-center justify-center space-x-2">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-xl animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-sans font-semibold tracking-tight text-gray-900">
                Share Your Trip
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-sans font-semibold tracking-tight text-gray-700 mb-2">
                  Share Link
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`${window.location.origin}/share/${bundle.id}`}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="bg-blue-500 text-white font-sans font-semibold tracking-tight px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      👤
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      👥
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">2 people viewing</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-green-600">
                    <span>👍</span>
                    <span>2</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <span>👎</span>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}