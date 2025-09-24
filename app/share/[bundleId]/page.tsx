import { Calendar, MapPin, Plane, Bed, Activity } from 'lucide-react';
import { TopBar } from '@/components/TopBar';
import { GoHomeButton } from './go-home-button';
import type { Bundle } from '@/lib/types';
import { mockBundlesSantorini, mockBundlesTokyo, mockBundlesBali } from '@/lib/fixtures';

export async function generateStaticParams() {
  // Collect all bundle IDs from mock data for static generation
  const allBundles = [...mockBundlesSantorini, ...mockBundlesTokyo, ...mockBundlesBali];
  
  return allBundles.map((bundle) => ({
    bundleId: bundle.id,
  }));
}

interface ShareBundlePageProps {
  params: {
    bundleId: string;
  };
}

function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${startFormatted} - ${endFormatted}`;
}

export default function ShareBundlePage({ params }: ShareBundlePageProps) {
  const { bundleId } = params;
  
  // Search through all mock bundles to find the matching one
  const allBundles = [...mockBundlesSantorini, ...mockBundlesTokyo, ...mockBundlesBali];
  let bundle = allBundles.find(b => b.id === bundleId);
  
  if (!bundle) {
    // Fallback to first Santorini bundle if not found
    bundle = mockBundlesSantorini[0];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <TopBar />
      
      <main className="pt-20">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">🌍</div>
            <h1 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-gray-900 mb-4 leading-tight">
              Shared Travel Itinerary
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Check out this amazing travel plan created with WanderLens AI
            </p>
          </div>

          {/* Bundle Details */}
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
              
              {/* Badges */}
              {bundle.badges && bundle.badges.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {bundle.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
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
                    {bundle.activities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full flex-shrink-0" />
                        <span>{activity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {(bundle.ecoNote || bundle.visaNote || bundle.surgeNote) && (
                <div className="space-y-2">
                  {bundle.ecoNote && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800 leading-relaxed">{bundle.ecoNote}</p>
                    </div>
                  )}
                  {bundle.visaNote && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800 leading-relaxed">{bundle.visaNote}</p>
                    </div>
                  )}
                  {bundle.surgeNote && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-sm text-orange-800 leading-relaxed">{bundle.surgeNote}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoHomeButton />
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                      👤
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
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
      </main>
    </div>
  );
}