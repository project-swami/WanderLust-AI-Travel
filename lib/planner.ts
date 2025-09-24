import type { AnalyzeResult, Bundle } from './types';
import { mockBundlesSantorini, mockBundlesTokyo, mockBundlesBali } from './fixtures';
import { sleep } from './utils';

export interface PlanningConstraints {
  budget?: 'budget' | 'mid-range' | 'luxury';
  travelStyle?: 'relaxed' | 'active' | 'cultural' | 'adventure';
  accessibility?: boolean;
  ecoFriendly?: boolean;
  groupSize?: number;
  duration?: string;
  interests?: string[];
  dietaryRestrictions?: string[];
}

/**
 * Main orchestration function that takes analysis results and constraints
 * to generate personalized travel bundles.
 * 
 * Currently returns mock data but designed for future LLM integration.
 */
export async function planFromAnalyze(
  analyze: AnalyzeResult,
  constraints: PlanningConstraints = {}
): Promise<Bundle[]> {
  // Simulate processing time
  await sleep(800);
  
  // TODO: Replace with actual LLM/tool orchestration
  // This is where we would:
  // 1. Analyze the POIs, activities, season, and vibe from the analyze result
  // 2. Consider user constraints (budget, style, accessibility, etc.)
  // 3. Call LLM with structured prompts to generate personalized itineraries
  // 4. Use tool calls to fetch real flight prices, hotel availability, activity bookings
  // 5. Validate and rank the generated bundles
  // 6. Return optimized travel packages
  
  // For now, return appropriate mock data based on detected destination
  const primaryPoi = analyze.pois[0];
  if (!primaryPoi) {
    return mockBundlesSantorini;
  }
  
  const destination = primaryPoi.name.toLowerCase();
  
  if (destination.includes('tokyo') || destination.includes('japan')) {
    return applyConstraints(mockBundlesTokyo, constraints);
  }
  
  if (destination.includes('bali') || destination.includes('ubud')) {
    return applyConstraints(mockBundlesBali, constraints);
  }
  
  // Default to Santorini
  return applyConstraints(mockBundlesSantorini, constraints);
}

/**
 * Apply user constraints to filter and modify bundles.
 * This is a simplified version - the real implementation would be more sophisticated.
 */
function applyConstraints(bundles: Bundle[], constraints: PlanningConstraints): Bundle[] {
  let filteredBundles = [...bundles];
  
  // Filter by budget preference
  if (constraints.budget) {
    filteredBundles = filteredBundles.filter(bundle => {
      const price = bundle.pricePP;
      switch (constraints.budget) {
        case 'budget':
          return price < 1200;
        case 'mid-range':
          return price >= 1200 && price <= 2000;
        case 'luxury':
          return price > 2000;
        default:
          return true;
      }
    });
  }
  
  // Filter by accessibility requirements
  if (constraints.accessibility) {
    filteredBundles = filteredBundles.filter(bundle => 
      bundle.stay.accessibility && bundle.stay.accessibility.length > 0
    );
  }
  
  // Filter by eco-friendly preference
  if (constraints.ecoFriendly) {
    filteredBundles = filteredBundles.filter(bundle => 
      bundle.badges?.includes('Eco') || bundle.ecoNote
    );
  }
  
  // Ensure we always return at least one bundle
  if (filteredBundles.length === 0) {
    return bundles.slice(0, 1);
  }
  
  return filteredBundles;
}

/**
 * Generate alternative bundles based on a specific mode.
 * Future implementation would use LLM to generate creative alternatives.
 */
export async function generateAlternatives(
  bundleId: string,
  mode: 'cheaper' | 'eco' | 'luxury' | 'accessible',
  originalBundles: Bundle[]
): Promise<Bundle[]> {
  await sleep(600);
  
  // TODO: Replace with LLM-generated alternatives
  // This would:
  // 1. Analyze the original bundle characteristics
  // 2. Generate alternatives based on the requested mode
  // 3. Use real-time pricing and availability APIs
  // 4. Return ranked alternatives with explanations
  
  // For now, return mock alternatives
  const mockAlternatives: Bundle[] = [
    {
      id: `alt_${bundleId}_${mode}`,
      title: `${mode === 'cheaper' ? 'Budget-Friendly' : 'Eco-Conscious'} Alternative`,
      pricePP: mode === 'cheaper' ? 890 : 1150,
      dates: { start: "2025-10-12", end: "2025-10-15" },
      flight: { 
        from: "JFK", 
        to: "ATH", 
        stops: 1, 
        price: mode === 'cheaper' ? 520 : 680, 
        co2kg: mode === 'eco' ? 320 : 380, 
        carrier: "Olympic Air" 
      },
      stay: { 
        name: mode === 'cheaper' ? 'Cozy Island Inn' : 'Green Retreat Hotel', 
        rating: 4.3, 
        accessibility: mode === 'accessible' ? ['wheelchair access', 'elevator'] : undefined,
        pricePerNight: mode === 'cheaper' ? 95 : 140, 
        nights: 3 
      },
      activities: [
        { name: mode === 'cheaper' ? 'Self-Guided Walking Tour' : 'Sustainable Farm Visit' },
        { name: 'Local Beach Access' }
      ],
      ecoNote: mode === 'eco' ? 'Carbon-neutral accommodation with solar power' : undefined,
      badges: mode === 'cheaper' ? ['Budget', 'Local'] : ['Eco', 'Sustainable'],
    }
  ];
  
  return mockAlternatives;
}