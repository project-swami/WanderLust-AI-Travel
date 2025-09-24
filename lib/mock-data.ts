import type { Itinerary } from '@/types/itinerary';

const destinations = [
  {
    destination: 'Tokyo, Japan',
    duration: '5 days',
    travelers: '2 adults',
    description: 'Experience the perfect blend of traditional culture and modern innovation in Japan\'s bustling capital.',
    highlights: ['Cherry Blossoms', 'Sushi', 'Temples', 'Shopping', 'Technology'],
    days: [
      {
        title: 'Arrival & Shibuya',
        activities: [
          'Land at Narita Airport and take the train to Shibuya',
          'Check into hotel and explore Shibuya Crossing',
          'Visit Meiji Shrine at sunset',
          'Dinner at an authentic izakaya'
        ]
      },
      {
        title: 'Asakusa & Traditional Tokyo',
        activities: [
          'Morning visit to Senso-ji Temple',
          'Explore Nakamise Shopping Street',
          'Traditional lunch in Asakusa',
          'Afternoon boat cruise on Sumida River',
          'Evening in Ginza district'
        ]
      },
      {
        title: 'Modern Tokyo & Tech',
        activities: [
          'Visit teamLab Borderless digital art museum',
          'Explore Akihabara electronics district',
          'Lunch at Robot Restaurant',
          'Shopping in Harajuku',
          'Tokyo Skytree observation deck'
        ]
      }
    ],
    budget: '$1,500-2,000',
    bestTime: 'Spring (Mar-May)',
    image: 'https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg'
  },
  {
    destination: 'Santorini, Greece',
    duration: '4 days',
    travelers: '2 adults',
    description: 'Romantic getaway featuring stunning sunsets, white-washed buildings, and crystal-clear Aegean waters.',
    highlights: ['Sunsets', 'Wine Tasting', 'Beaches', 'Architecture', 'Mediterranean Cuisine'],
    days: [
      {
        title: 'Arrival & Fira',
        activities: [
          'Arrive at Santorini Airport',
          'Check into cliffside hotel in Fira',
          'Explore Fira town and cable car',
          'Sunset dinner with caldera views'
        ]
      },
      {
        title: 'Oia Village',
        activities: [
          'Morning bus to Oia village',
          'Explore narrow streets and blue domes',
          'Visit Maritime Museum',
          'Famous Oia sunset viewing',
          'Romantic dinner at local taverna'
        ]
      },
      {
        title: 'Beaches & Wineries',
        activities: [
          'Red Beach exploration',
          'Wine tasting at Santo Wines',
          'Perissa Black Beach relaxation',
          'Traditional Greek cooking class',
          'Evening stroll in Kamari'
        ]
      }
    ],
    budget: '$1,200-1,800',
    bestTime: 'Late Spring (Apr-Jun)',
    image: 'https://images.pexels.com/photos/161901/santorini-greece-island-sunset-161901.jpeg'
  },
  {
    destination: 'Costa Rica',
    duration: '7 days',
    travelers: '4 adults',
    description: 'Adventure-packed eco-tourism experience featuring rainforests, wildlife, and pristine beaches.',
    highlights: ['Wildlife', 'Zip-lining', 'Beaches', 'Volcanoes', 'Adventure Sports'],
    days: [
      {
        title: 'San José & Arenal',
        activities: [
          'Arrive in San José',
          'Drive to Arenal Volcano region',
          'Check into eco-lodge',
          'Hot springs relaxation',
          'Traditional Costa Rican dinner'
        ]
      },
      {
        title: 'Adventure Day',
        activities: [
          'Zip-lining through cloud forest canopy',
          'Wildlife spotting tour',
          'Arenal Volcano hike',
          'Visit to local coffee plantation',
          'Evening nature walk'
        ]
      },
      {
        title: 'Manuel Antonio',
        activities: [
          'Drive to Manuel Antonio',
          'Beach relaxation at Playa Espadilla',
          'Manuel Antonio National Park',
          'Monkey and sloth spotting',
          'Sunset at Cathedral Point'
        ]
      }
    ],
    budget: '$2,000-2,800',
    bestTime: 'Dry Season (Dec-Apr)',
    image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg'
  }
];

export function generateMockItinerary(): Itinerary {
  const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
  
  return {
    id: Date.now().toString(),
    ...randomDestination,
    createdAt: new Date(),
  };
}