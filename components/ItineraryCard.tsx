'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Star, Plane, Bed, Activity, Share, Loader2, DollarSign, Leaf } from 'lucide-react';
import type { Bundle } from '@/lib/types';

interface ItineraryCardProps {
  bundle: Bundle;
  onBook?: (bundleId: string) => void;
  onCheaperDupes?: (bundleId: string) => void;
  onEcoFirst?: (bundleId: string) => void;
  onShare?: (bundleId: string) => void;
}

export function ItineraryCard({ 
  bundle, 
  onBook, 
  onCheaperDupes, 
  onEcoFirst, 
  onShare 
}: ItineraryCardProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleAction = async (action: string, callback?: (bundleId: string) => void) => {
    if (!callback) return;
    
    setLoadingStates(prev => ({ ...prev, [action]: true }));
    try {
      await callback(bundle.id);
    } finally {
      setLoadingStates(prev => ({ ...prev, [action]: false }));
    }
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startFormatted} - ${endFormatted}`;
  };

  const getBadgeStyle = (badge: string) => {
    const styles = {
      'Eco': 'bg-green-100 text-green-700 border-green-200',
      'Accessible': 'bg-blue-100 text-blue-700 border-blue-200',
      'Budget': 'bg-orange-100 text-orange-700 border-orange-200',
      'Premium': 'bg-purple-100 text-purple-700 border-purple-200',
      'Cheaper': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'Lower CO₂': 'bg-teal-100 text-teal-700 border-teal-200',
      'Tech': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Cultural': 'bg-amber-100 text-amber-700 border-amber-200',
      'Wellness': 'bg-pink-100 text-pink-700 border-pink-200',
      'Spiritual': 'bg-violet-100 text-violet-700 border-violet-200',
    };
    return styles[badge as keyof typeof styles] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-sans font-bold tracking-tight leading-relaxed mb-2">{bundle.title}</h3>
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
            <div className="flex flex-wrap gap-2">
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
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Flight Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-sans font-semibold tracking-tight text-gray-900 flex items-center space-x-2 mb-3">
              <Plane className="h-4 w-4 text-blue-500" />
              <span>Flight</span>
            </h4>
            <div className="text-sm text-gray-700 leading-relaxed">
              <div className="flex items-center justify-between mb-1">
                <span>{bundle.flight.from} → {bundle.flight.to}</span>
                <span className="font-sans font-semibold tracking-tight">${bundle.flight.price}</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{bundle.flight.stops === 0 ? 'Direct' : `${bundle.flight.stops} stop${bundle.flight.stops > 1 ? 's' : ''}`}</span>
                <span>{bundle.flight.carrier}</span>
                {bundle.flight.co2kg && <span>{bundle.flight.co2kg}kg CO₂</span>}
              </div>
            </div>
          </div>

          {/* Stay Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-sans font-semibold tracking-tight text-gray-900 flex items-center space-x-2 mb-3">
              <Bed className="h-4 w-4 text-green-500" />
              <span>Stay</span>
            </h4>
            <div className="text-sm text-gray-700 leading-relaxed">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans font-semibold tracking-tight">{bundle.stay.name}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs">{bundle.stay.rating}</span>
                </div>
              </div>
              {bundle.stay.accessibility && bundle.stay.accessibility.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {bundle.stay.accessibility.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 border border-blue-200 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500">
                ${bundle.stay.pricePerNight}/night • {bundle.stay.nights} nights
              </div>
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            <h4 className="font-sans font-semibold tracking-tight text-gray-900 flex items-center space-x-2">
              <Activity className="h-4 w-4 text-purple-500" />
              <span>Activities</span>
            </h4>
            <div className="space-y-2">
              {bundle.activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <div className="leading-relaxed">
                    <span className="font-sans font-semibold tracking-tight">{activity.name}</span>
                    {activity.durationHrs && (
                      <span className="text-gray-500 ml-2">({activity.durationHrs}h)</span>
                    )}
                    {activity.notes && (
                      <div className="text-xs text-gray-500 mt-1">{activity.notes}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {(bundle.ecoNote || bundle.visaNote || bundle.surgeNote) && (
            <div className="space-y-2">
              {bundle.ecoNote && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Leaf className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800 leading-relaxed">{bundle.ecoNote}</p>
                  </div>
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

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => handleAction('book', onBook)}
              disabled={loadingStates.book}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-sans font-semibold tracking-tight px-4 py-3 rounded-xl hover:shadow-md transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loadingStates.book ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Booking...</span>
                </span>
              ) : (
                'Book Now'
              )}
            </button>
            
            <button
              onClick={() => handleAction('share', onShare)}
              disabled={loadingStates.share}
              className="bg-gray-100 text-gray-700 font-sans font-semibold tracking-tight px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {loadingStates.share ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleAction('cheaper', onCheaperDupes)}
              disabled={loadingStates.cheaper}
              className="bg-emerald-100 text-emerald-700 border border-emerald-200 font-sans font-semibold tracking-tight px-4 py-3 rounded-xl hover:bg-emerald-200 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              {loadingStates.cheaper ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <DollarSign className="h-4 w-4" />
                  <span>Cheaper</span>
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleAction('eco', onEcoFirst)}
              disabled={loadingStates.eco}
              className="bg-green-100 text-green-700 border border-green-200 font-sans font-semibold tracking-tight px-4 py-3 rounded-xl hover:bg-green-200 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {loadingStates.eco ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <Leaf className="h-4 w-4" />
                  <span>Eco-First</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}