# Contributing to WanderLens

Thank you for your interest in contributing to WanderLens! This document provides guidelines for contributing to the project.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlens-ai-travel.git
   cd wanderlens-ai-travel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes (disabled for static export)
│   ├── checkout/          # Booking confirmation pages
│   ├── share/             # Shared itinerary pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── ChatComposer.tsx  # Chat interface
│   ├── EmptyState.tsx    # Landing page
│   ├── ItineraryCard.tsx # Travel bundle display
│   ├── MediaUploader.tsx # File upload component
│   └── TopBar.tsx        # Navigation header
├── lib/                  # Utilities and data
│   ├── fixtures.ts       # Mock travel data
│   ├── planner.ts        # Travel planning logic
│   ├── types.ts          # TypeScript definitions
│   └── utils.ts          # Helper functions
└── styles/               # Additional styles
```

## Key Features to Understand

### 1. Media Analysis Simulation
- `MediaUploader.tsx` handles file uploads and URL inputs
- `mockAnalyzeSantorini` in `fixtures.ts` provides sample analysis results
- Real implementation would integrate with OpenAI Vision API

### 2. Travel Bundle Generation
- `planFromAnalyze()` in `planner.ts` orchestrates bundle creation
- Mock data in `fixtures.ts` provides sample bundles for different destinations
- Real implementation would integrate with flight/hotel APIs

### 3. Static Export Configuration
- `next.config.js` configured for static export
- All API routes are disabled for static hosting
- Images are unoptimized for static deployment

## Contributing Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Use Tailwind CSS for styling
- Maintain responsive design principles

### Component Guidelines
- Keep components focused and single-purpose
- Use proper TypeScript types
- Include accessibility attributes
- Follow the existing design system

### Adding New Features

1. **Mock Data First**: Add mock data to `fixtures.ts`
2. **Component Development**: Build UI components with mock data
3. **Integration Points**: Document where real APIs would integrate
4. **Testing**: Test with different screen sizes and scenarios

### API Integration Points

When implementing real APIs, replace these mock implementations:

- **Vision Analysis**: `app/api/analyze/route.ts`
- **Flight Data**: `Bundle.flight` in `fixtures.ts`
- **Hotel Data**: `Bundle.stay` in `fixtures.ts`
- **Activities**: `Bundle.activities` in `fixtures.ts`

### Deployment

The project is configured for static export and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

```bash
npm run build  # Generates static files in /out directory
```

## Questions?

Feel free to open an issue for any questions about the codebase or contributing process.