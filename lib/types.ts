export type POI = { 
  name: string; 
  lat: number; 
  lng: number; 
  confidence: number; 
};

export type Activity = { 
  name: string; 
  durationHrs?: number; 
  notes?: string; 
};

export type Stay = { 
  name: string; 
  rating: number; 
  accessibility?: string[]; 
  pricePerNight?: number; 
  nights?: number; 
};

export type Flight = { 
  from: string; 
  to: string; 
  stops: number; 
  price: number; 
  co2kg?: number; 
  carrier?: string; 
};

export type Bundle = {
  id: string;
  title: string;
  pricePP: number;
  dates: { start: string; end: string };
  flight: Flight;
  stay: Stay;
  activities: Activity[];
  ecoNote?: string;
  visaNote?: string;
  surgeNote?: string;
  badges?: string[];
};

export type AnalyzeResult = {
  pois: POI[];
  activities: string[];
  season: string;
  vibe: string[];
  confidence: number;
  mediaId: string;
};

export interface ItineraryDay {
  title: string;
  activities: string[];
  meals?: string[];
  accommodation?: string;
  transportation?: string;
  budget?: string;
}

export interface Itinerary {
  id: string;
  destination: string;
  duration: string;
  travelers: string;
  description: string;
  highlights: string[];
  days: ItineraryDay[];
  budget: string;
  bestTime: string;
  image: string;
  rating: number;
  createdAt: Date;
  totalCost?: number;
  currency?: string;
}

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface UserPreferences {
  budget?: 'budget' | 'mid-range' | 'luxury';
  travelStyle?: 'relaxed' | 'active' | 'cultural' | 'adventure';
  accommodation?: 'hostel' | 'hotel' | 'resort' | 'airbnb';
  transportation?: 'public' | 'rental' | 'walking' | 'mixed';
  dietary?: string[];
  interests?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ProcessingStatus {
  stage: 'intake' | 'analysis' | 'synthesis' | 'complete';
  progress: number;
  message: string;
  estimatedTime?: number;
}