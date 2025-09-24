import { Bundle, AnalyzeResult } from "./types";

export const mockAnalyzeSantorini: AnalyzeResult = {
  pois: [{ name: "Oia, Santorini", lat: 36.461, lng: 25.376, confidence: 0.91 }],
  activities: ["sunset", "sailing", "photo-walk"],
  season: "late-summer",
  vibe: ["sunset", "coastal", "white-blue domes"],
  confidence: 0.91,
  mediaId: "media_santorini_001",
};

export const mockBundlesSantorini: Bundle[] = [
  {
    id: "b1",
    title: "Classic Oia Sunset",
    pricePP: 1240,
    dates: { start: "2025-10-08", end: "2025-10-11" },
    flight: { from: "JFK", to: "JTR", stops: 1, price: 720, co2kg: 410, carrier: "Aegean" },
    stay: { name: "Astra Cave Suites", rating: 4.7, accessibility: ["step-free access"], pricePerNight: 210, nights: 3 },
    activities: [{ name: "Caldera Sail" }, { name: "Blue Domes Photo Walk" }],
    ecoNote: "Rail+ferry alt reduces CO₂ by ~38%, adds 6h",
    surgeNote: "Nearby holiday dates +15%",
    badges: ["Eco", "Accessible"],
  },
  {
    id: "b2",
    title: "Relaxed Caldera Escape",
    pricePP: 980,
    dates: { start: "2025-10-15", end: "2025-10-18" },
    flight: { from: "JFK", to: "JTR", stops: 1, price: 650, co2kg: 395, carrier: "SkyExpress" },
    stay: { name: "Cave Serenity Inn", rating: 4.5, accessibility: ["quiet zones"], pricePerNight: 140, nights: 3 },
    activities: [{ name: "Akrotiri Highlights" }, { name: "Sunset Lookouts" }],
    visaNote: "US passport: visa-free ≤90 days",
    badges: ["Budget"],
  },
  {
    id: "b3",
    title: "Premium Cliff Views",
    pricePP: 1680,
    dates: { start: "2025-09-30", end: "2025-10-03" },
    flight: { from: "JFK", to: "JTR", stops: 1, price: 860, co2kg: 430, carrier: "Delta" },
    stay: { name: "Cliffside Boutique Hotel", rating: 4.8, accessibility: ["elevator"], pricePerNight: 260, nights: 3 },
    activities: [{ name: "Private Sunset Sail" }, { name: "Wine Tasting" }],
    surgeNote: "Peak weekend pricing",
    badges: ["Premium"],
  },
];

export const mockAlternateDupes: Bundle[] = [
  {
    id: "d1",
    title: "Paros Look-Alike Escape",
    pricePP: 920,
    dates: { start: "2025-10-10", end: "2025-10-13" },
    flight: { from: "JFK", to: "PAS", stops: 1, price: 610, co2kg: 380, carrier: "Olympic" },
    stay: { name: "Naoussa Bay Suites", rating: 4.6, accessibility: ["step-free"], pricePerNight: 130, nights: 3 },
    activities: [{ name: "Harbor Promenade" }, { name: "Beach Day" }],
    badges: ["Cheaper", "Lower CO₂"],
  },
];

export const mockAnalyzeTokyo: AnalyzeResult = {
  pois: [
    { name: "Shibuya Crossing, Tokyo", lat: 35.6598, lng: 139.7006, confidence: 0.89 },
    { name: "Senso-ji Temple, Asakusa", lat: 35.7148, lng: 139.7967, confidence: 0.85 }
  ],
  activities: ["temple-visit", "street-food", "shopping", "cherry-blossom"],
  season: "spring",
  vibe: ["urban", "traditional", "neon-lights", "cherry-blossoms"],
  confidence: 0.87,
  mediaId: "media_tokyo_002",
};

export const mockBundlesTokyo: Bundle[] = [
  {
    id: "t1",
    title: "Tokyo Culture & Tech",
    pricePP: 1850,
    dates: { start: "2025-04-15", end: "2025-04-22" },
    flight: { from: "LAX", to: "NRT", stops: 0, price: 980, co2kg: 520, carrier: "JAL" },
    stay: { name: "Shibuya Sky Hotel", rating: 4.6, accessibility: ["elevator", "braille"], pricePerNight: 180, nights: 7 },
    activities: [
      { name: "TeamLab Borderless", durationHrs: 3, notes: "Digital art museum" },
      { name: "Tsukiji Fish Market", durationHrs: 2, notes: "Early morning visit" },
      { name: "Meiji Shrine", durationHrs: 1.5, notes: "Traditional ceremony" }
    ],
    visaNote: "US passport: visa-free ≤90 days",
    badges: ["Tech", "Cultural"],
  },
  {
    id: "t2",
    title: "Budget Tokyo Explorer",
    pricePP: 1320,
    dates: { start: "2025-05-01", end: "2025-05-08" },
    flight: { from: "LAX", to: "NRT", stops: 1, price: 750, co2kg: 480, carrier: "ANA" },
    stay: { name: "Capsule Pod Shibuya", rating: 4.2, accessibility: ["compact design"], pricePerNight: 85, nights: 7 },
    activities: [
      { name: "Free Temple Tours", durationHrs: 2 },
      { name: "Harajuku Street Walk", durationHrs: 3 },
      { name: "Ueno Park Hanami", durationHrs: 2, notes: "Cherry blossom viewing" }
    ],
    ecoNote: "JR Pass reduces local transport CO₂",
    badges: ["Budget", "Eco-Friendly"],
  }
];

export const mockAnalyzeBali: AnalyzeResult = {
  pois: [
    { name: "Ubud Rice Terraces", lat: -8.4095, lng: 115.1889, confidence: 0.93 },
    { name: "Tanah Lot Temple", lat: -8.6212, lng: 115.0869, confidence: 0.88 }
  ],
  activities: ["yoga", "temple-visit", "rice-terrace", "spa", "volcano-hike"],
  season: "dry-season",
  vibe: ["tropical", "spiritual", "rice-terraces", "temple-culture"],
  confidence: 0.90,
  mediaId: "media_bali_003",
};

export const mockBundlesBali: Bundle[] = [
  {
    id: "ba1",
    title: "Ubud Wellness Retreat",
    pricePP: 1450,
    dates: { start: "2025-07-20", end: "2025-07-27" },
    flight: { from: "SFO", to: "DPS", stops: 1, price: 820, co2kg: 650, carrier: "Singapore Airlines" },
    stay: { name: "Bamboo Eco Lodge", rating: 4.8, accessibility: ["nature paths"], pricePerNight: 120, nights: 7 },
    activities: [
      { name: "Daily Yoga Sessions", durationHrs: 1.5, notes: "Morning and evening" },
      { name: "Rice Terrace Trek", durationHrs: 4, notes: "Guided walk through Jatiluwih" },
      { name: "Traditional Spa Treatment", durationHrs: 2, notes: "Balinese massage" }
    ],
    ecoNote: "Solar-powered accommodation, local sourcing",
    visaNote: "Visa on arrival $35 USD",
    badges: ["Wellness", "Eco", "Spiritual"],
  }
];

// Helper function to generate random bundles
export function generateRandomBundle(destination: string): Bundle {
  const destinations = {
    santorini: mockBundlesSantorini,
    tokyo: mockBundlesTokyo,
    bali: mockBundlesBali,
  };
  
  const bundles = destinations[destination.toLowerCase() as keyof typeof destinations] || mockBundlesSantorini;
  return bundles[Math.floor(Math.random() * bundles.length)];
}

// Helper function to get analyze result by destination
export function getAnalyzeResult(destination: string): AnalyzeResult {
  const results = {
    santorini: mockAnalyzeSantorini,
    tokyo: mockAnalyzeTokyo,
    bali: mockAnalyzeBali,
  };
  
  return results[destination.toLowerCase() as keyof typeof results] || mockAnalyzeSantorini;
}