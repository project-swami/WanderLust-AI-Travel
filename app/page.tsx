'use client';

import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { EmptyState } from '@/components/EmptyState';
import { ItineraryCard } from '@/components/ItineraryCard';
import { ChatComposer } from '@/components/ChatComposer';
import { mockBundlesSantorini, mockBundlesTokyo, mockBundlesBali, mockAnalyzeSantorini } from '@/lib/fixtures';
import { sleep } from '@/lib/utils';
import type { AnalyzeResult, Bundle } from '@/lib/types';

export default function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResult | null>(null);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = async (result: AnalyzeResult) => {
    console.log('Analysis completed:', result);
    setAnalysisResult(result);
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await sleep(800);
      
      // Use mock data based on analysis result
      const primaryPoi = result.pois[0];
      let mockBundles = mockBundlesSantorini;
      
      if (primaryPoi?.name.toLowerCase().includes('tokyo')) {
        mockBundles = mockBundlesTokyo;
      } else if (primaryPoi?.name.toLowerCase().includes('bali')) {
        mockBundles = mockBundlesBali;
      }
      
      setBundles(mockBundles);
    } catch (error) {
      console.error('Failed to synthesize bundles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatMessage = async (message: string) => {
    if (!analysisResult) return;
    
    console.log('Chat message:', message);
    setIsLoading(true);
    
    try {
      await sleep(600);
      
      // Handle different chat commands with mock alternatives
      if (message.toLowerCase().includes('cheaper')) {
        const cheaperBundle: Bundle = {
          id: `alt_cheaper_${Date.now()}`,
          title: 'Budget-Friendly Alternative',
          pricePP: 890,
          dates: { start: "2025-10-12", end: "2025-10-15" },
          flight: { from: "JFK", to: "ATH", stops: 1, price: 520, co2kg: 380, carrier: "Olympic Air" },
          stay: { name: 'Cozy Island Inn', rating: 4.3, pricePerNight: 95, nights: 3 },
          activities: [
            { name: 'Self-Guided Walking Tour' },
            { name: 'Local Beach Access' }
          ],
          badges: ['Budget', 'Local'],
        };
        setBundles(prev => [cheaperBundle, ...prev]);
      } else if (message.toLowerCase().includes('eco')) {
        const ecoBundle: Bundle = {
          id: `alt_eco_${Date.now()}`,
          title: 'Eco-Conscious Alternative',
          pricePP: 1150,
          dates: { start: "2025-10-12", end: "2025-10-15" },
          flight: { from: "JFK", to: "ATH", stops: 1, price: 680, co2kg: 320, carrier: "Olympic Air" },
          stay: { name: 'Green Retreat Hotel', rating: 4.5, pricePerNight: 140, nights: 3 },
          activities: [
            { name: 'Sustainable Farm Visit' },
            { name: 'Eco Beach Cleanup' }
          ],
          ecoNote: 'Carbon-neutral accommodation with solar power',
          badges: ['Eco', 'Sustainable'],
        };
        setBundles(prev => [ecoBundle, ...prev]);
      }
    } catch (error) {
      console.error('Chat request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookBundle = async (bundleId: string) => {
    try {
      console.log('Booking bundle:', bundleId);
      await sleep(400);
      
      // Generate booking reference and redirect
      const bookingRef = `ref_${Date.now()}_${bundleId}`;
      window.location.href = `/checkout/success/?ref=${bookingRef}`;
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  const handleCheaperDupes = async (bundleId: string) => {
    try {
      await sleep(400);
      const cheaperBundle: Bundle = {
        id: `alt_cheaper_${bundleId}_${Date.now()}`,
        title: 'Budget-Friendly Alternative',
        pricePP: 890,
        dates: { start: "2025-10-12", end: "2025-10-15" },
        flight: { from: "JFK", to: "ATH", stops: 1, price: 520, co2kg: 380, carrier: "Olympic Air" },
        stay: { name: 'Cozy Island Inn', rating: 4.3, pricePerNight: 95, nights: 3 },
        activities: [
          { name: 'Self-Guided Walking Tour' },
          { name: 'Local Beach Access' }
        ],
        badges: ['Budget', 'Local'],
      };
      setBundles(prev => [cheaperBundle, ...prev]);
    } catch (error) {
      console.error('Failed to get alternatives:', error);
    }
  };

  const handleEcoFirst = async (bundleId: string) => {
    try {
      await sleep(400);
      const ecoBundle: Bundle = {
        id: `alt_eco_${bundleId}_${Date.now()}`,
        title: 'Eco-Conscious Alternative',
        pricePP: 1150,
        dates: { start: "2025-10-12", end: "2025-10-15" },
        flight: { from: "JFK", to: "ATH", stops: 1, price: 680, co2kg: 320, carrier: "Olympic Air" },
        stay: { name: 'Green Retreat Hotel', rating: 4.5, pricePerNight: 140, nights: 3 },
        activities: [
          { name: 'Sustainable Farm Visit' },
          { name: 'Eco Beach Cleanup' }
        ],
        ecoNote: 'Carbon-neutral accommodation with solar power',
        badges: ['Eco', 'Sustainable'],
      };
      setBundles(prev => [ecoBundle, ...prev]);
    } catch (error) {
      console.error('Failed to get alternatives:', error);
    }
  };

  const handleShare = async (bundleId: string) => {
    const shareUrl = `${window.location.origin}/share/${bundleId}/`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy share link:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <TopBar />
      
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {!analysisResult ? (
            <EmptyState onAnalysisComplete={handleAnalysisComplete} />
          ) : (
            <div className="space-y-8">
              {/* Analysis Summary */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-sans font-bold tracking-tight text-gray-900 mb-2">
                      Analysis Complete
                    </h2>
                    <p className="text-gray-600">
                      Found {analysisResult.pois.length} destination{analysisResult.pois.length !== 1 ? 's' : ''} with {Math.round(analysisResult.confidence * 100)}% confidence
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Ready
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysisResult.pois.map((poi, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-sans font-semibold tracking-tight text-gray-900 mb-1">
                        {poi.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Confidence: {Math.round(poi.confidence * 100)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Bundles */}
              {bundles.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-sans font-bold tracking-tight text-gray-900">
                      Your Travel Options
                    </h2>
                    <span className="text-sm text-gray-500">
                      {bundles.length} bundle{bundles.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {bundles.map((bundle) => (
                      <ItineraryCard
                        key={bundle.id}
                        bundle={bundle}
                        onBook={handleBookBundle}
                        onCheaperDupes={handleCheaperDupes}
                        onEcoFirst={handleEcoFirst}
                        onShare={handleShare}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center space-x-2 text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                </div>
              )}

              {/* Chat Interface */}
              <div className="max-w-3xl mx-auto">
                <ChatComposer
                  onSend={handleChatMessage}
                  isLoading={isLoading}
                  hasResults={bundles.length > 0}
                  placeholder="Try: 'Cheaper dupes', 'Eco-first', 'Make it accessible', or ask about your trip..."
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}