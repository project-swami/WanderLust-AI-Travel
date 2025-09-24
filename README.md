# WanderLens 📷✈️

AI-powered travel planning from photos. Upload images of dream destinations and get personalized itineraries with flights, stays, and activities.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start planning!

## Demo Script

1. **Upload Media**: Drag & drop travel photos or paste URLs
2. **AI Analysis**: Watch as AI detects destinations and activities
3. **Confirm Location**: Review detected place with confidence score
4. **Browse Bundles**: Explore 3 personalized travel packages
5. **Refine Options**: Try "Cheaper dupes" or "Eco-first" alternatives
6. **Book Trip**: Complete checkout flow to reservation confirmation
7. **Share Plans**: Generate shareable links with social proof

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **AI Integration**: OpenAI API (mocked)
- **State Management**: React hooks, optimistic updates
- **Deployment**: Static export ready

## API Integration Points

Replace mock implementations with real services:

### Vision & Analysis
- **File**: `app/api/analyze/route.ts`
- **Replace with**: OpenAI Vision API, Google Vision, or AWS Rekognition
- **Purpose**: Detect destinations, activities, season from photos

### Flight Data
- **File**: `lib/fixtures.ts` → `Bundle.flight`
- **Replace with**: Amadeus, Skyscanner, or Google Flights API
- **Data**: Prices, routes, carriers, CO₂ emissions

### Hotel & Stays
- **File**: `lib/fixtures.ts` → `Bundle.stay`
- **Replace with**: Booking.com, Expedia, or Airbnb API
- **Data**: Availability, pricing, ratings, accessibility features

### Activities & Experiences
- **File**: `lib/fixtures.ts` → `Bundle.activities`
- **Replace with**: GetYourGuide, Viator, or TripAdvisor API
- **Data**: Local experiences, tours, restaurant recommendations

### Travel Intelligence
- **File**: `lib/fixtures.ts` → Bundle notes
- **Replace with**:
  - **Weather**: OpenWeatherMap API
  - **Holidays**: Calendarific API
  - **Visa Requirements**: VisaHQ API
  - **CO₂ Data**: MyClimate API

### LLM Orchestration
- **File**: `lib/planner.ts`
- **Replace with**: OpenAI GPT-4, Claude, or custom LLM
- **Purpose**: Generate personalized itineraries from analysis results

## Project Structure

```
app/
├── api/           # Mock API endpoints
├── checkout/      # Booking confirmation
└── page.tsx       # Main application

components/
├── TopBar.tsx     # Navigation header
├── MediaUploader.tsx  # File upload & analysis
├── ItineraryCard.tsx  # Travel bundle display
├── ChatComposer.tsx   # Refinement interface
└── EmptyState.tsx     # Landing experience

lib/
├── fixtures.ts    # Mock travel data
├── planner.ts     # Orchestration logic
└── types.ts       # TypeScript definitions
```

## Development

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run typecheck  # Check TypeScript
npm run lint       # Run ESLint
```

## Deployment

The app exports as static files and can be deployed to:
- Vercel, Netlify, GitHub Pages
- Any static hosting service
- CDN with Next.js static export

---

**Ready to transform travel planning with AI? Start uploading photos! 🌍**