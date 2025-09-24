import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Itinerary } from '@/types/itinerary';

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export function ItineraryCard({ itinerary }: ItineraryCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 animate-slide-up">
      <div 
        className="h-32 bg-gradient-to-r from-blue-400 to-teal-400 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(20, 184, 166, 0.8)), url(${itinerary.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-semibold">{itinerary.destination}</h3>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{itinerary.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{itinerary.travelers}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-700 leading-relaxed">
              {itinerary.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {itinerary.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Daily Itinerary</span>
            </h4>
            <div className="space-y-3">
              {itinerary.days.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="font-medium text-sm text-gray-900 mb-2">
                    Day {index + 1}: {day.title}
                  </div>
                  <div className="space-y-1">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
            <span>Budget: {itinerary.budget}</span>
            <span>Best time: {itinerary.bestTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}