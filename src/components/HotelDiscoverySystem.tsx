
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Wifi, 
  Car, 
  Coffee,
  Grid3X3,
  Map,
  Filter,
  Heart,
  Eye
} from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  type: 'safari-tent' | 'hotel' | 'lodge' | 'treehouse';
  location: string;
  coordinates: [number, number];
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  lastBooked: number; // minutes ago
  image: string;
  amenities: string[];
  nearbyAttractions: string[];
  category: 'budget' | 'mid-range' | 'luxury';
  specialFeature: string;
  availability: 'high' | 'medium' | 'low';
}

const sampleHotels: Hotel[] = [
  {
    id: '1',
    name: 'Victoria Falls Safari Lodge',
    type: 'lodge',
    location: 'Victoria Falls',
    coordinates: [-17.9243, 25.8572],
    rating: 4.8,
    reviews: 2847,
    price: 450,
    currency: 'USD',
    lastBooked: 12,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
    amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa'],
    nearbyAttractions: ['Victoria Falls', 'Zambezi River'],
    category: 'luxury',
    specialFeature: 'Elephant viewing deck',
    availability: 'medium'
  },
  {
    id: '2',
    name: 'Bvumba Treehouse',
    type: 'treehouse',
    location: 'Eastern Highlands',
    coordinates: [-18.5, 32.5],
    rating: 4.6,
    reviews: 456,
    price: 180,
    currency: 'USD',
    lastBooked: 35,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    amenities: ['Wifi', 'Fireplace', 'Hiking'],
    nearbyAttractions: ['Tea Plantations', 'Mountain Trails'],
    category: 'mid-range',
    specialFeature: 'Canopy dining experience',
    availability: 'high'
  },
  {
    id: '3',
    name: 'Hwange Safari Camp',
    type: 'safari-tent',
    location: 'Hwange National Park',
    coordinates: [-18.6297, 26.1612],
    rating: 4.9,
    reviews: 1203,
    price: 320,
    currency: 'USD',
    lastBooked: 8,
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=400&h=250&fit=crop',
    amenities: ['Game Drives', 'Bush Dinner', 'Guide'],
    nearbyAttractions: ['Elephant Waterholes', 'Walking Trails'],
    category: 'luxury',
    specialFeature: 'Private waterhole viewing',
    availability: 'low'
  },
  {
    id: '4',
    name: 'Kariba Houseboat Resort',
    type: 'hotel',
    location: 'Lake Kariba',
    coordinates: [-16.5167, 28.8667],
    rating: 4.4,
    reviews: 678,
    price: 220,
    currency: 'USD',
    lastBooked: 18,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=250&fit=crop',
    amenities: ['Boat Tours', 'Fishing', 'Restaurant'],
    nearbyAttractions: ['Tiger Fish', 'Sunset Cruises'],
    category: 'mid-range',
    specialFeature: 'Floating accommodation',
    availability: 'high'
  }
];

const HotelDiscoverySystem = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'distance' | 'ai'>('ai');
  const [filterCategory, setFilterCategory] = useState<'all' | 'budget' | 'mid-range' | 'luxury'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHotels, setFilteredHotels] = useState(sampleHotels);

  useEffect(() => {
    let filtered = sampleHotels.filter(hotel => {
      const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || hotel.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'distance':
          // Simulate distance sorting
          return a.id.localeCompare(b.id);
        case 'ai':
          // AI-powered sorting based on user preferences
          return b.rating * (b.reviews / 1000) - a.rating * (a.reviews / 1000);
        default:
          return 0;
      }
    });

    setFilteredHotels(filtered);
  }, [searchTerm, filterCategory, sortBy]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'safari-tent': return '🏕️';
      case 'hotel': return '🏨';
      case 'lodge': return '🏡';
      case 'treehouse': return '🌳';
      default: return '🏨';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'budget': return 'bg-green-500/20 text-green-400';
      case 'mid-range': return 'bg-yellow-500/20 text-yellow-400';
      case 'luxury': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Discover Your Perfect Stay</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          From luxury safari lodges to unique treehouses, find accommodations that match your adventure
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <Input
                placeholder="Search hotels, locations, experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 h-12"
              />
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-600 rounded-lg overflow-hidden">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className={viewMode === 'grid' ? 'bg-orange-600' : 'text-gray-400'}
              >
                <Grid3X3 className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                onClick={() => setViewMode('map')}
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                className={viewMode === 'map' ? 'bg-orange-600' : 'text-gray-400'}
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-800 border border-gray-600 text-white rounded-lg px-4 py-2"
            >
              <option value="ai">🤖 AI Recommended</option>
              <option value="price">💰 Price: Low to High</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="distance">📍 Distance</option>
            </select>

            {/* Category Filter */}
            <div className="flex gap-2">
              {['all', 'budget', 'mid-range', 'luxury'].map((category) => (
                <Button
                  key={category}
                  onClick={() => setFilterCategory(category as any)}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className={filterCategory === category 
                    ? 'bg-orange-600' 
                    : 'border-gray-600 text-gray-400 hover:bg-gray-800'
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <Card 
              key={hotel.id} 
              className="group bg-black/90 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/50 overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlays */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className={getCategoryColor(hotel.category)}>
                    {hotel.category}
                  </Badge>
                  <span className="text-2xl">{getTypeIcon(hotel.type)}</span>
                </div>
                
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white text-sm font-semibold">{hotel.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 text-orange-300 text-sm mb-1">
                    <MapPin className="h-4 w-4" />
                    {hotel.location}
                  </div>
                  <h3 className="text-white font-bold text-lg">{hotel.name}</h3>
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Special Feature */}
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300 text-sm">{hotel.specialFeature}</span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                {/* Pricing and Booking */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-400">${hotel.price}</div>
                    <div className="text-gray-400 text-sm">per night</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${getAvailabilityColor(hotel.availability)}`}>
                      {hotel.availability} availability
                    </div>
                    <div className="text-gray-500 text-xs">
                      Last booked {hotel.lastBooked}m ago
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Book Now
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:bg-gray-800">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Map View Placeholder
        <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30 h-96">
          <CardContent className="p-6 h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Map className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interactive Map View</h3>
              <p>Map integration with Mapbox coming soon...</p>
              <p className="text-sm mt-2">Color-coded clusters: 🟢 Budget • 🟡 Mid-range • 🟣 Luxury</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HotelDiscoverySystem;
