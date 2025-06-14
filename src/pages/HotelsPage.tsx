
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Wifi, 
  Car, 
  Utensils, 
  Waves,
  Search,
  Filter,
  Heart,
  Phone,
  Mail
} from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  image: string;
  amenities: string[];
  description: string;
  distance: string;
  ecoRating: number;
  lastAvailabilityCheck: string;
  type: 'safari-tent' | 'lodge' | 'hotel';
}

const hotelsByDestination: Record<string, Hotel[]> = {
  'victoria-falls': [
    {
      id: 'vf1',
      name: 'Victoria Falls Safari Lodge',
      location: 'Victoria Falls, Zimbabwe',
      rating: 4.8,
      reviews: 2847,
      price: 450,
      originalPrice: 520,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      amenities: ['wifi', 'restaurant', 'pool', 'parking'],
      description: 'Luxury safari lodge overlooking the Zambezi River with stunning elephant views',
      distance: '2.5km from Victoria Falls',
      ecoRating: 4.5,
      lastAvailabilityCheck: '2 hours ago',
      type: 'lodge'
    },
    {
      id: 'vf2',
      name: 'The Victoria Falls Hotel',
      location: 'Victoria Falls, Zimbabwe',
      rating: 4.9,
      reviews: 1654,
      price: 680,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      amenities: ['wifi', 'restaurant', 'spa', 'bar'],
      description: 'Historic colonial hotel with panoramic views of the falls',
      distance: '1.2km from Victoria Falls',
      ecoRating: 4.2,
      lastAvailabilityCheck: '1 hour ago',
      type: 'hotel'
    },
    {
      id: 'vf3',
      name: 'Gorges Lodge',
      location: 'Victoria Falls, Zimbabwe',
      rating: 4.7,
      reviews: 892,
      price: 320,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
      amenities: ['wifi', 'restaurant', 'pool'],
      description: 'Boutique lodge perched on the edge of the Batoka Gorge',
      distance: '5km from Victoria Falls',
      ecoRating: 4.8,
      lastAvailabilityCheck: '3 hours ago',
      type: 'lodge'
    }
  ],
  'hwange': [
    {
      id: 'hw1',
      name: 'Hwange Safari Lodge',
      location: 'Hwange National Park, Zimbabwe',
      rating: 4.6,
      reviews: 1234,
      price: 380,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      amenities: ['wifi', 'restaurant', 'pool', 'game-drives'],
      description: 'Premier safari lodge in the heart of Hwange National Park',
      distance: '0.5km from Main Camp',
      ecoRating: 4.7,
      lastAvailabilityCheck: '1 hour ago',
      type: 'lodge'
    },
    {
      id: 'hw2',
      name: 'Elephant Express Safari Tents',
      location: 'Hwange National Park, Zimbabwe',
      rating: 4.3,
      reviews: 567,
      price: 180,
      image: 'https://images.unsplash.com/photo-1602391833977-358a52198938?w=800&h=600&fit=crop',
      amenities: ['restaurant', 'campfire', 'guided-tours'],
      description: 'Authentic safari tents with close wildlife encounters',
      distance: '2km from Sinamatella Gate',
      ecoRating: 4.9,
      lastAvailabilityCheck: '30 minutes ago',
      type: 'safari-tent'
    }
  ],
  'matobo': [
    {
      id: 'mt1',
      name: 'Matobo Hills Lodge',
      location: 'Matobo Hills, Zimbabwe',
      rating: 4.5,
      reviews: 456,
      price: 250,
      image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop',
      amenities: ['wifi', 'restaurant', 'hiking', 'cultural-tours'],
      description: 'Scenic lodge among the ancient granite formations',
      distance: '1km from World\'s View',
      ecoRating: 4.4,
      lastAvailabilityCheck: '2 hours ago',
      type: 'lodge'
    }
  ]
};

const HotelsPage = () => {
  const { destination } = useParams();
  const [searchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const hotels = destination ? hotelsByDestination[destination] || [] : [];

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
    const matchesType = selectedType === 'all' || hotel.type === selectedType;
    return matchesSearch && matchesPrice && matchesType;
  });

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'restaurant': return <Utensils className="h-4 w-4" />;
      case 'pool': return <Waves className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Hotels in {destination?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
            <Button onClick={() => window.history.back()}>
              Back to Destinations
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search Hotels</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Hotel name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="hotel">Hotel</option>
                  <option value="lodge">Lodge</option>
                  <option value="safari-tent">Safari Tent</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-600">{hotel.type.replace('-', ' ')}</Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-semibold">{hotel.rating}</span>
                </div>
                <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">{hotel.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.distance}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{hotel.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  {hotel.amenities.slice(0, 4).map((amenity) => (
                    <div key={amenity} className="text-gray-500">
                      {getAmenityIcon(amenity)}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Eco Rating</div>
                    <div className="text-green-600 font-semibold">{hotel.ecoRating}/5</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Last checked</div>
                    <div className="text-sm">{hotel.lastAvailabilityCheck}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    {hotel.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">${hotel.originalPrice}</span>
                    )}
                    <div className="text-2xl font-bold text-orange-600">${hotel.price}</div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hotels found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setPriceRange([0, 1000]);
                setSelectedType('all');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
