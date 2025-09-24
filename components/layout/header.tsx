import { MapPin, Compass } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-white/20 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="wanderlens-gradient p-2 rounded-lg">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                WanderLens
              </h1>
              <p className="text-sm text-gray-600">AI Travel Planning</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>Discover • Plan • Explore</span>
          </div>
        </div>
      </div>
    </header>
  );
}