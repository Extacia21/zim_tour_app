
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, MapPin, Users, Clock, Star } from 'lucide-react';

const destinations = [
  {
    name: 'Victoria Falls',
    slug: 'victoria-falls',
    duration: '2-3 days',
    activities: ['Devil\'s Pool', 'Bungee Jumping', 'Helicopter Tours'],
    accommodation: 'Victoria Falls Hotel',
    highlights: 'One of Seven Natural Wonders'
  },
  {
    name: 'Hwange National Park',
    slug: 'hwange',
    duration: '3-4 days',
    activities: ['Game Drives', 'Walking Safaris', 'Photography'],
    accommodation: 'Singita Pamushana',
    highlights: 'Largest elephant population'
  },
  {
    name: 'Great Zimbabwe',
    slug: 'great-zimbabwe',
    duration: '1-2 days',
    activities: ['Archaeological Tours', 'Cultural Shows', 'Hill Complex'],
    accommodation: 'Great Zimbabwe Hotel',
    highlights: 'Ancient stone city'
  },
  {
    name: 'Mana Pools',
    slug: 'mana-pools',
    duration: '3-5 days',
    activities: ['Canoe Safaris', 'Walking Safaris', 'Fishing'],
    accommodation: 'Ruckomechi Camp',
    highlights: 'UNESCO wilderness site'
  },
  {
    name: 'Eastern Highlands',
    slug: 'eastern-highlands',
    duration: '2-3 days',
    activities: ['Mountain Hiking', 'Coffee Tours', 'Waterfall Visits'],
    accommodation: 'Leopard Rock Hotel',
    highlights: 'Highest peak & tea plantations'
  },
  {
    name: 'Matobo Hills',
    slug: 'matobo',
    duration: '1-2 days',
    activities: ['Rhino Tracking', 'Rock Art Tours', 'Cecil Rhodes Grave'],
    accommodation: 'Amalinda Lodge',
    highlights: 'Ancient rock formations'
  }
];

const TripBuilder = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [tripDuration, setTripDuration] = useState(0);

  const handleDestinationToggle = (slug: string, duration: string) => {
    const days = parseInt(duration.split('-')[0]);
    
    if (selectedDestinations.includes(slug)) {
      setSelectedDestinations(prev => prev.filter(d => d !== slug));
      setTripDuration(prev => prev - days);
    } else {
      setSelectedDestinations(prev => [...prev, slug]);
      setTripDuration(prev => prev + days);
    }
  };

  const selectedDestinationData = destinations.filter(dest => 
    selectedDestinations.includes(dest.slug)
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-orange-600" />
            Custom Trip Builder
          </CardTitle>
          <p className="text-gray-600">Select destinations to create your perfect Zimbabwe adventure</p>
        </CardHeader>
        <CardContent>
          {/* Trip Summary */}
          {selectedDestinations.length > 0 && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2">Your Trip Summary</h3>
              <div className="flex items-center gap-4 text-sm text-orange-700">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedDestinations.length} destinations
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {tripDuration}+ days
                </div>
              </div>
            </div>
          )}

          {/* Destination Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {destinations.map((destination) => {
              const isSelected = selectedDestinations.includes(destination.slug);
              return (
                <Card 
                  key={destination.slug} 
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-orange-500 bg-orange-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => handleDestinationToggle(destination.slug, destination.duration)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{destination.name}</h4>
                      <Checkbox 
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {destination.duration}
                    </Badge>
                    <p className="text-sm text-gray-600 mb-2">{destination.highlights}</p>
                    <div className="text-xs text-gray-500">
                      <strong>Activities:</strong> {destination.activities.slice(0, 2).join(', ')}
                      {destination.activities.length > 2 && '...'}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Generated Itinerary */}
          {selectedDestinationData.length > 0 && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Your Custom Itinerary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedDestinationData.map((destination, index) => (
                    <div key={destination.slug} className="border-l-4 border-orange-500 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Day {index === 0 ? '1' : `${index * 3 + 1}`}-{index * 3 + parseInt(destination.duration.split('-')[0])}: {destination.name}</h4>
                        <Badge>{destination.duration}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{destination.highlights}</p>
                      <div className="text-sm">
                        <p><strong>Activities:</strong> {destination.activities.join(', ')}</p>
                        <p><strong>Accommodation:</strong> {destination.accommodation}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Total Trip Duration: {tripDuration}+ days</p>
                      <p className="text-sm text-gray-600">Estimated cost varies by accommodation choice</p>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Star className="h-4 w-4 mr-2" />
                      Save Itinerary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TripBuilder;
