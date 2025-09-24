export interface ItineraryDay {
  title: string;
  activities: string[];
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
  createdAt: Date;
}