
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Activity,
  Mountain,
  Camera,
  Heart,
  Calendar,
  DollarSign
} from 'lucide-react';

interface ActivityItem {
  id: string;
  name: string;
  category: 'adventure' | 'wildlife' | 'cultural';
  description: string;
  image: string;
  price: number;
  duration: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  minAge: number;
  maxGroupSize: number;
  rating: number;
  reviews: number;
  packingList: string[];
  location: string;
}

const activitiesByDestination: Record<string, ActivityItem[]> = {
  'victoria-falls': [
    {
      id: 'vf-act1',
      name: 'Bungee Jumping from Victoria Falls Bridge',
      category: 'adventure',
      description: 'Take the ultimate leap of faith from the historic Victoria Falls Bridge',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      price: 160,
      duration: '2 hours',
      difficulty: 5,
      minAge: 14,
      maxGroupSize: 8,
      rating: 4.9,
      reviews: 2847,
      packingList: ['Comfortable clothes', 'Closed shoes', 'GoPro camera'],
      location: 'Victoria Falls Bridge'
    },
    {
      id: 'vf-act2',
      name: 'Helicopter Flight over the Falls',
      category: 'adventure',
      description: 'Breathtaking aerial views of Victoria Falls and Zambezi River',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      price: 180,
      duration: '15 minutes',
      difficulty: 1,
      minAge: 3,
      maxGroupSize: 6,
      rating: 4.8,
      reviews: 1654,
      packingList: ['Camera', 'Sunglasses', 'Light jacket'],
      location: 'Victoria Falls Airport'
    },
    {
      id: 'vf-act3',
      name: 'Traditional Village Tour',
      category: 'cultural',
      description: 'Experience authentic Zimbabwean culture and traditions',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop',
      price: 45,
      duration: '3 hours',
      difficulty: 2,
      minAge: 5,
      maxGroupSize: 15,
      rating: 4.6,
      reviews: 892,
      packingList: ['Comfortable walking shoes', 'Hat', 'Water bottle', 'Respectful clothing'],
      location: 'Mukuni Village'
    }
  ],
  'hwange': [
    {
      id: 'hw-act1',
      name: 'Big Five Safari Drive',
      category: 'wildlife',
      description: 'Professional guided safari to spot elephants, lions, leopards, rhinos, and buffalo',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop',
      price: 120,
      duration: '6 hours',
      difficulty: 2,
      minAge: 8,
      maxGroupSize: 8,
      rating: 4.7,
      reviews: 1456,
      packingList: ['Binoculars', 'Camera with zoom lens', 'Neutral colored clothing', 'Hat'],
      location: 'Hwange Main Camp'
    },
    {
      id: 'hw-act2',
      name: 'Walking Safari with Rangers',
      category: 'wildlife',
      description: 'Get up close with nature on foot with experienced park rangers',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      price: 85,
      duration: '4 hours',
      difficulty: 4,
      minAge: 16,
      maxGroupSize: 6,
      rating: 4.8,
      reviews: 567,
      packingList: ['Sturdy walking boots', 'Long pants', 'Insect repellent', 'Quiet clothing'],
      location: 'Sinamatella Camp'
    }
  ],
  'matobo': [
    {
      id: 'mt-act1',
      name: 'Ancient Rock Art Tour',
      category: 'cultural',
      description: 'Explore 20,000-year-old San rock paintings with expert guides',
      image: 'https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=800&h=600&fit=crop',
      price: 65,
      duration: '4 hours',
      difficulty: 3,
      minAge: 10,
      maxGroupSize: 12,
      rating: 4.5,
      reviews: 345,
      packingList: ['Comfortable hiking shoes', 'Water bottle', 'Sun protection', 'Camera'],
      location: 'Nswatugi Cave'
    },
    {
      id: 'mt-act2',
      name: 'Black Eagle Tracking',
      category: 'wildlife',
      description: 'Spot the rare Verreaux\'s black eagle in their natural habitat',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      price: 75,
      duration: '5 hours',
      difficulty: 3,
      minAge: 12,
      maxGroupSize: 8,
      rating: 4.4,
      reviews: 234,
      packingList: ['Binoculars', 'Telephoto camera lens', 'Hiking boots', 'Patience!'],
      location: 'World\'s View'
    }
  ]
};

const ActivitiesPage = () => {
  const { destination } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const activities = destination ? activitiesByDestination[destination] || [] : [];

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || 
      (selectedDifficulty === 'easy' && activity.difficulty <= 2) ||
      (selectedDifficulty === 'moderate' && activity.difficulty === 3) ||
      (selectedDifficulty === 'hard' && activity.difficulty >= 4);
    return matchesCategory && matchesDifficulty;
  });

  const getDifficultyBadge = (difficulty: number) => {
    if (difficulty <= 2) return <Badge className="bg-green-500">Easy</Badge>;
    if (difficulty === 3) return <Badge className="bg-yellow-500">Moderate</Badge>;
    return <Badge className="bg-red-500">Challenging</Badge>;
  };

  const getDifficultyMeter = (difficulty: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`w-2 h-4 rounded ${
              level <= difficulty ? 'bg-orange-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Activities in {destination?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="flex gap-2">
                  {['all', 'adventure', 'wildlife', 'cultural'].map((category) => (
                    <Button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      className={selectedCategory === category 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : ''
                      }
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <div className="flex gap-2">
                  {['all', 'easy', 'moderate', 'hard'].map((difficulty) => (
                    <Button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                      size="sm"
                      className={selectedDifficulty === difficulty 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : ''
                      }
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={
                    activity.category === 'adventure' ? 'bg-red-600' :
                    activity.category === 'wildlife' ? 'bg-green-600' : 'bg-blue-600'
                  }>
                    {activity.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-semibold">{activity.rating}</span>
                </div>
                <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">{activity.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{activity.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Max {activity.maxGroupSize}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Difficulty</div>
                    {getDifficultyMeter(activity.difficulty)}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Minimum Age: {activity.minAge}+</div>
                  {getDifficultyBadge(activity.difficulty)}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">${activity.price}</div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      Add to Itinerary
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No activities found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
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

export default ActivitiesPage;
