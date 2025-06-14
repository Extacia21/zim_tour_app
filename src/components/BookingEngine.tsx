
import React, { useState } from 'react';
import { Calendar, Users, MapPin, Star, Clock, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface BookingItem {
  id: string;
  type: 'hotel' | 'experience' | 'guide';
  title: string;
  description: string;
  price: number;
  currency: string;
  rating: number;
  location: string;
  image: string;
  availability: 'high' | 'medium' | 'low';
  duration?: string;
}

const BookingEngine = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hotel' | 'experience' | 'guide'>('all');

  const bookingItems: BookingItem[] = [
    {
      id: '1',
      type: 'hotel',
      title: 'Victoria Falls Safari Lodge',
      description: 'Luxury lodge overlooking the Zambezi River with elephant views',
      price: 450,
      currency: 'USD',
      rating: 4.8,
      location: 'Victoria Falls',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop',
      availability: 'medium'
    },
    {
      id: '2',
      type: 'experience',
      title: 'Helicopter Flight Over Victoria Falls',
      description: 'Breathtaking aerial views of the falls and Zambezi River',
      price: 180,
      currency: 'USD',
      rating: 4.9,
      location: 'Victoria Falls',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop',
      availability: 'high',
      duration: '15 minutes'
    },
    {
      id: '3',
      type: 'guide',
      title: 'Shona Culture Expert Guide',
      description: 'Local historian specializing in Great Zimbabwe and Shona heritage',
      price: 85,
      currency: 'USD',
      rating: 4.7,
      location: 'Harare',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=250&fit=crop',
      availability: 'high',
      duration: 'Half day'
    },
    {
      id: '4',
      type: 'hotel',
      title: 'Bvumba Mountains Treehouse',
      description: 'Unique treehouse accommodation in the Eastern Highlands',
      price: 220,
      currency: 'USD',
      rating: 4.6,
      location: 'Eastern Highlands',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      availability: 'low'
    }
  ];

  const filteredItems = bookingItems.filter(item => 
    selectedCategory === 'all' || item.type === selectedCategory
  );

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleBooking = (item: BookingItem) => {
    // Simulate booking process
    alert(`Booking ${item.title} for ${guests} guests on ${selectedDate || 'selected date'}`);
  };

  return (
    <div className="space-y-6">
      {/* Booking Filters */}
      <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Check-in Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Guests</label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white"
                >
                  -
                </Button>
                <span className="text-white px-3">{guests}</span>
                <Button
                  onClick={() => setGuests(guests + 1)}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-white"
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Category</label>
              <div className="flex gap-2">
                {['all', 'hotel', 'experience', 'guide'].map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category as any)}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    className={selectedCategory === category 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : 'border-gray-600 text-white hover:bg-gray-800'
                    }
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-black/90 backdrop-blur-xl border border-orange-500/30 overflow-hidden hover:scale-105 transition-transform duration-300">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className={getAvailabilityColor(item.availability)}>
                  {item.availability} availability
                </Badge>
              </div>
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-sm font-semibold">{item.rating}</span>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white text-lg font-bold">{item.title}</h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="h-4 w-4" />
                    {item.location}
                    {item.duration && (
                      <>
                        <Clock className="h-4 w-4 ml-2" />
                        {item.duration}
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-orange-400">
                    ${item.price}
                  </div>
                  <div className="text-gray-400 text-sm">{item.currency}</div>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{item.description}</p>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleBooking(item)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                >
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookingEngine;
