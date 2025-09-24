import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WanderLens - AI Travel Planning',
  description: 'Turn your travel photos into perfect itineraries with AI-powered travel planning',
  keywords: 'travel, AI, itinerary, planning, photos, destinations',
  authors: [{ name: 'WanderLens Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'WanderLens - AI Travel Planning',
    description: 'Turn your travel photos into perfect itineraries with AI-powered travel planning',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WanderLens - AI Travel Planning',
    description: 'Turn your travel photos into perfect itineraries with AI-powered travel planning',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}