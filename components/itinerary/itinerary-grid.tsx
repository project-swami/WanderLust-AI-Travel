'use client';

import { Loader2 } from 'lucide-react';
import { ItineraryCard } from './itinerary-card';
import type { Itinerary } from '@/types/itinerary';

interface ItineraryGridProps {
  itineraries: Itinerary[];
  isGenerating: boolean;
}

export function ItineraryGrid({ itineraries, isGenerating }: ItineraryGridProps) {
  if (itineraries.length === 0 && !isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-gray-500 mb-2">No itineraries yet</div>
        <div className="text-sm text-gray-400">
          Start chatting to generate your first travel plan!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 h-full overflow-y-auto">
      {isGenerating && (
        <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Creating your perfect itinerary...</p>
          </div>
        </div>
      )}
      
      <div className="grid gap-6">
        {itineraries.map((itinerary) => (
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
}