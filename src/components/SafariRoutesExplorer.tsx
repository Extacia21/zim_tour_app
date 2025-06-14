
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Camera, 
  Binoculars, 
  Clock, 
  AlertTriangle,
  Coffee,
  Fuel,
  Wifi
} from 'lucide-react';

interface SafariRoute {
  id: string;
  name: string;
  park: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  duration: string;
  distance: string;
  image: string;
  animalSpottings: {
    species: string;
    likelihood: number;
    bestTime: string;
    icon: string;
  }[];
  photographyPoints: {
    name: string;
    coordinates: [number, number];
    description: string;
    bestTime: string;
  }[];
  restStops: {
    name: string;
    amenities: string[];
    coordinates: [number, number];
  }[];
}

const safariRoutes: SafariRoute[] = [
  {
    id: 'hwange-main',
    name: 'Main Camp Circle',
    park: 'Hwange National Park',
    difficulty: 'Easy',
    duration: '4-6 hours',
    distance: '45km',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=400&fit=crop',
    animalSpottings: [
      { species: 'African Elephant', likelihood: 95, bestTime: '6-8 AM', icon: '🐘' },
      { species: 'Lion', likelihood: 70, bestTime: '5-7 PM', icon: '🦁' },
      { species: 'Leopard', likelihood: 30, bestTime: '6-8 PM', icon: '🐆' },
      { species: 'Buffalo', likelihood: 85, bestTime: '7-9 AM', icon: '🐃' }
    ],
    photographyPoints: [
      {
        name: 'Nyamandlovu Platform',
        coordinates: [-18.6297, 26.1612],
        description: 'Elevated viewing platform overlooking permanent waterhole',
        bestTime: 'Golden hour (5-7 PM)'
      },
      {
        name: 'Guvalala Picnic Site',
        coordinates: [-18.6500, 26.1800],
        description: 'Wide plains perfect for herd photography',
        bestTime: 'Early morning (6-8 AM)'
      }
    ],
    restStops: [
      {
        name: 'Main Camp',
        amenities: ['Fuel', 'Restaurant', 'Shop', 'WiFi'],
        coordinates: [-18.6297, 26.1612]
      }
    ]
  },
  {
    id: 'mana-canoe',
    name: 'Zambezi Canoe Trail',
    park: 'Mana Pools',
    difficulty: 'Moderate',
    duration: '6-8 hours',
    distance: '25km river',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=400&fit=crop',
    animalSpottings: [
      { species: 'Hippo', likelihood: 98, bestTime: 'All day', icon: '🦛' },
      { species: 'Crocodile', likelihood: 90, bestTime: 'Midday', icon: '🐊' },
      { species: 'Elephant', likelihood: 80, bestTime: '3-5 PM', icon: '🐘' },
      { species: 'Wild Dog', likelihood: 40, bestTime: '6-8 AM', icon: '🐕' }
    ],
    photographyPoints: [
      {
        name: 'Long Pool',
        coordinates: [-15.8000, 29.4000],
        description: 'Reflective waters with mountain backdrop',
        bestTime: 'Sunrise (6-7 AM)'
      }
    ],
    restStops: [
      {
        name: 'Nyamepi Camp',
        amenities: ['Restaurant', 'Shop', 'First Aid'],
        coordinates: [-15.8000, 29.4000]
      }
    ]
  }
];

const SafariRoutesExplorer = () => {
  const [selectedRoute, setSelectedRoute] = useState<SafariRoute | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'wildlife' | 'photography' | 'stops'>('overview');

  const getLikelihoodColor = (likelihood: number) => {
    if (likelihood >= 80) return 'bg-green-500/20 text-green-400';
    if (likelihood >= 50) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400';
      case 'Moderate': return 'bg-yellow-500/20 text-yellow-400';
      case 'Challenging': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'fuel': return <Fuel className="h-4 w-4" />;
      case 'restaurant': return <Coffee className="h-4 w-4" />;
      case 'wifi': return <Wifi className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Interactive Safari Routes</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Explore detailed trail maps with animal spotting heatmaps and photography viewpoints
        </p>
      </div>

      {!selectedRoute ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safariRoutes.map((route) => (
            <Card 
              key={route.id} 
              className="group bg-black/90 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/50 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedRoute(route)}
            >
              <div className="relative">
                <img
                  src={route.image}
                  alt={route.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className={getDifficultyColor(route.difficulty)}>
                    {route.difficulty}
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-xl mb-1">{route.name}</h3>
                  <p className="text-orange-300 text-sm">{route.park}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {route.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {route.distance}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {route.animalSpottings.slice(0, 4).map((animal) => (
                    <span key={animal.species} className="text-sm">
                      {animal.icon}
                    </span>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Explore Route
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <Button
            onClick={() => setSelectedRoute(null)}
            variant="outline"
            className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
          >
            ← Back to Routes
          </Button>
          
          <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
            <div className="relative">
              <img
                src={selectedRoute.image}
                alt={selectedRoute.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl font-bold text-white mb-2">{selectedRoute.name}</h1>
                <p className="text-orange-300 text-lg">{selectedRoute.park}</p>
              </div>
            </div>
          </Card>

          <div className="flex gap-2 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: MapPin },
              { id: 'wildlife', label: 'Wildlife Heatmap', icon: Binoculars },
              { id: 'photography', label: 'Photo Points', icon: Camera },
              { id: 'stops', label: 'Rest Stops', icon: Coffee }
            ].map((tab) => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={activeTab === tab.id 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'border-gray-600 text-gray-400 hover:bg-gray-800'
                }
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/20">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-orange-400 font-semibold">Difficulty</h3>
                    <Badge className={getDifficultyColor(selectedRoute.difficulty)}>
                      {selectedRoute.difficulty}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-orange-400 font-semibold">Duration</h3>
                    <p className="text-white">{selectedRoute.duration}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-orange-400 font-semibold">Distance</h3>
                    <p className="text-white">{selectedRoute.distance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'wildlife' && (
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/20">
              <CardContent className="p-6">
                <h3 className="text-orange-400 font-semibold mb-4">Animal Spotting Likelihood</h3>
                <div className="space-y-4">
                  {selectedRoute.animalSpottings.map((animal) => (
                    <div key={animal.species} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{animal.icon}</span>
                        <div>
                          <h4 className="text-white font-medium">{animal.species}</h4>
                          <p className="text-sm text-gray-400">Best time: {animal.bestTime}</p>
                        </div>
                      </div>
                      <Badge className={getLikelihoodColor(animal.likelihood)}>
                        {animal.likelihood}% chance
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'photography' && (
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/20">
              <CardContent className="p-6">
                <h3 className="text-orange-400 font-semibold mb-4">Photography Viewpoints</h3>
                <div className="space-y-4">
                  {selectedRoute.photographyPoints.map((point, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Camera className="h-5 w-5 text-orange-400 mt-1" />
                        <div>
                          <h4 className="text-white font-medium">{point.name}</h4>
                          <p className="text-gray-300 text-sm mb-2">{point.description}</p>
                          <p className="text-orange-300 text-sm">Best time: {point.bestTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'stops' && (
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/20">
              <CardContent className="p-6">
                <h3 className="text-orange-400 font-semibold mb-4">Rest Stops & Amenities</h3>
                <div className="space-y-4">
                  {selectedRoute.restStops.map((stop, index) => (
                    <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-2">{stop.name}</h4>
                          <div className="flex flex-wrap gap-2">
                            {stop.amenities.map((amenity) => (
                              <div key={amenity} className="flex items-center gap-1 text-sm text-gray-300 bg-gray-700/50 px-2 py-1 rounded">
                                {getAmenityIcon(amenity)}
                                {amenity}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SafariRoutesExplorer;
