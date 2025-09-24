# API Integration Guide

This document outlines how to integrate real APIs to replace the mock data in WanderLens.

## Overview

WanderLens currently uses mock data for demonstration. To create a production-ready application, you'll need to integrate with real travel and AI services.

## Required API Integrations

### 1. Image Analysis API

**Current**: Mock analysis in `lib/fixtures.ts`
**Replace with**: OpenAI Vision API, Google Vision, or AWS Rekognition

```typescript
// app/api/analyze/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { imageUrl } = await request.json();
  
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this travel photo and identify the destination, activities, and travel preferences."
          },
          {
            type: "image_url",
            image_url: { url: imageUrl }
          }
        ]
      }
    ],
    max_tokens: 300,
  });
  
  // Parse response and return structured data
  return Response.json({
    pois: [/* extracted points of interest */],
    activities: [/* detected activities */],
    season: "spring",
    confidence: 0.85
  });
}
```

### 2. Flight Search API

**Current**: Mock flight data in `Bundle.flight`
**Replace with**: Amadeus, Skyscanner, or Google Flights API

```typescript
// lib/flight-api.ts
import { Amadeus } from 'amadeus';

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET
});

export async function searchFlights(origin: string, destination: string, departureDate: string) {
  const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: origin,
    destinationLocationCode: destination,
    departureDate: departureDate,
    adults: '1'
  });
  
  return response.data.map(offer => ({
    from: origin,
    to: destination,
    price: parseFloat(offer.price.total),
    carrier: offer.validatingAirlineCodes[0],
    stops: offer.itineraries[0].segments.length - 1,
    co2kg: calculateCO2Emissions(offer)
  }));
}
```

### 3. Hotel Search API

**Current**: Mock hotel data in `Bundle.stay`
**Replace with**: Booking.com, Expedia, or Airbnb API

```typescript
// lib/hotel-api.ts
export async function searchHotels(destination: string, checkIn: string, checkOut: string) {
  const response = await fetch(`https://api.booking.com/v1/hotels/search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.BOOKING_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      destination,
      checkin: checkIn,
      checkout: checkOut,
      adults: 2
    })
  });
  
  const data = await response.json();
  
  return data.hotels.map(hotel => ({
    name: hotel.name,
    rating: hotel.rating,
    pricePerNight: hotel.price.amount,
    accessibility: hotel.accessibility_features || []
  }));
}
```

### 4. Activities API

**Current**: Mock activities in `Bundle.activities`
**Replace with**: GetYourGuide, Viator, or TripAdvisor API

```typescript
// lib/activities-api.ts
export async function searchActivities(destination: string, interests: string[]) {
  const response = await fetch(`https://api.getyourguide.com/v1/activities`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.GETYOURGUIDE_API_KEY}`
    },
    params: {
      location: destination,
      categories: interests.join(',')
    }
  });
  
  const data = await response.json();
  
  return data.activities.map(activity => ({
    name: activity.title,
    durationHrs: activity.duration / 60,
    notes: activity.description
  }));
}
```

### 5. LLM Orchestration

**Current**: Mock bundle generation in `lib/planner.ts`
**Replace with**: OpenAI GPT-4, Claude, or custom LLM

```typescript
// lib/planner.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function planFromAnalyze(analyze: AnalyzeResult, constraints: PlanningConstraints) {
  const flights = await searchFlights(constraints.origin, analyze.pois[0].name, constraints.departureDate);
  const hotels = await searchHotels(analyze.pois[0].name, constraints.checkIn, constraints.checkOut);
  const activities = await searchActivities(analyze.pois[0].name, analyze.activities);
  
  const prompt = `
    Create a personalized travel itinerary based on:
    - Destination: ${analyze.pois[0].name}
    - Detected activities: ${analyze.activities.join(', ')}
    - Season: ${analyze.season}
    - Budget: ${constraints.budget}
    - Travel style: ${constraints.travelStyle}
    
    Available flights: ${JSON.stringify(flights.slice(0, 3))}
    Available hotels: ${JSON.stringify(hotels.slice(0, 3))}
    Available activities: ${JSON.stringify(activities.slice(0, 5))}
    
    Generate 3 different travel bundles with varying price points and styles.
  `;
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
  
  // Parse LLM response and structure as Bundle[]
  return parseLLMResponse(response.choices[0].message.content);
}
```

## Additional APIs

### Weather Data
```typescript
// OpenWeatherMap API
const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${process.env.WEATHER_API_KEY}`);
```

### Visa Requirements
```typescript
// VisaHQ API
const visaInfo = await fetch(`https://api.visahq.com/v1/visa-requirements?from=${origin}&to=${destination}`);
```

### Currency Exchange
```typescript
// ExchangeRate API
const rates = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
```

## Environment Variables

Create a `.env.local` file:

```env
# AI Services
OPENAI_API_KEY=sk-...
GOOGLE_VISION_API_KEY=...

# Travel APIs
AMADEUS_API_KEY=...
AMADEUS_API_SECRET=...
BOOKING_API_KEY=...
GETYOURGUIDE_API_KEY=...

# Additional Services
WEATHER_API_KEY=...
EXCHANGERATE_API_KEY=...
GOOGLE_MAPS_API_KEY=...
```

## Rate Limiting & Caching

Implement rate limiting and caching for production:

```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getCachedData(key: string, fetchFn: () => Promise<any>, ttl = 3600) {
  const cached = await redis.get(key);
  if (cached) return cached;
  
  const data = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(data));
  return data;
}
```

## Error Handling

Implement robust error handling:

```typescript
// lib/api-client.ts
export async function apiCall(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, {
      ...options,
      timeout: 10000, // 10 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    // Return fallback data or throw user-friendly error
    throw new Error('Service temporarily unavailable');
  }
}
```

## Testing

Test API integrations with mock data:

```typescript
// __tests__/api.test.ts
import { searchFlights } from '../lib/flight-api';

jest.mock('../lib/flight-api');

test('should return flight results', async () => {
  const mockFlights = [{ from: 'JFK', to: 'ATH', price: 650 }];
  (searchFlights as jest.Mock).mockResolvedValue(mockFlights);
  
  const results = await searchFlights('JFK', 'ATH', '2025-06-01');
  expect(results).toEqual(mockFlights);
});
```

This integration guide provides the foundation for converting WanderLens from a demo application to a production-ready travel planning platform.