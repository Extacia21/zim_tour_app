
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mountain, 
  Binoculars, 
  Users, 
  Clock, 
  Star, 
  Plus,
  Calendar,
  MapPin,
  AlertTriangle,
  Backpack
} from 'lucide-react';

interface Activity {
  id: string;
  name: string;
  category: 'adventure' | 'wildlife' | 'cultural';
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration: string;
  minAge: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  highlights: string[];
  packingList: string[];
  location: string;
  availability: 'high' | 'medium' | 'low';
}

const activities: Activity[] = [
  {
    id: '1',
    name: 'Victoria Falls Bungee Jump',
    category: 'adventure',
    difficulty: 5,
    duration: '2 hours',
    minAge: 14,
    price: 160,
    rating: 4.9,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=250&fit=crop',
    description: 'Take the ultimate leap from the Victoria Falls Bridge',
    highlights: ['111m drop', 'Bridge location', 'Certificate included'],
    packingList: ['Comfortable clothes', 'Closed shoes', 'Camera'],
    location: 'Victoria Falls Bridge',
    availability: 'high'
  },
  {
    id: '2',
    name: 'Hwange Game Drive',
    category: 'wildlife',
    difficulty: 1,
    duration: 'Full day',
    minAge: 0,
    price: 180,
    rating: 4.8,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=400&h=250&fit=crop',
    description: 'Explore Zimbabwe\'s largest national park with expert guides',
    highlights: ['Big 5 viewing', 'Professional guide', 'Lunch included'],
    packingList: ['Hat', 'Sunscreen', 'Binoculars', 'Camera'],
    location: 'Hwange National Park',
    availability: 'medium'
  },
  {
    id: '3',
    name: 'Traditional Village Experience',
    category: 'cultural',
    difficulty: 2,
    duration: '4 hours',
    minAge: 5,
    price: 85,
    rating: 4.7,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=250&fit=crop',
    description: 'Immerse yourself in Shona culture and traditions',
    highlights: ['Traditional cooking', 'Craft making', 'Storytelling'],
    packingList: ['Comfortable walking shoes', 'Respectful clothing', 'Small gift'],
    location: 'Local Village',
    availability: 'high'
  },
  {
    id: '4',
    name: 'Zambezi River Rafting',
    category: 'adventure',
    difficulty: 4,
    duration: 'Full day',
    minAge: 15,
    price: 145,
    rating: 4.6,
    reviews: 1543,
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=250&fit=crop',
    description: 'Navigate Class III-V rapids on the mighty Zambezi',
    highlights: ['Grade 5 rapids', 'Safety equipment', 'Lunch provided'],
    packingList: ['Swimwear', 'Quick-dry clothes', 'Waterproof camera'],
    location: 'Zambezi River',
    availability: 'medium'
  },
  {
    id: '5',
    name: 'Walking Safari',
    category: 'wildlife',
    difficulty: 3,
    duration: '3 hours',
    minAge: 12,
    price: 95,
    rating: 4.5,
    reviews: 756,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=250&fit=crop',
    description: 'Get up close with nature on foot with armed guides',
    highlights: ['Armed ranger', 'Track animals', 'Small groups'],
    packingList: ['Walking boots', 'Long pants', 'Water bottle'],
    location: 'Matobo Hills',
    availability: 'low'
  },
  {
    id: '6',
    name: 'Rock Art Tour',
    category: 'cultural',
    difficulty: 2,
    duration: '2 hours',
    minAge: 8,
    price: 45,
    rating: 4.4,
    reviews: 634,
    image: 'https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=400&h=250&fit=crop',
    description: 'Discover ancient San rock paintings in granite caves',
    highlights: ['5000+ year old art', 'Expert guide', 'Cave exploration'],
    packingList: ['Comfortable shoes', 'Flashlight', 'Water'],
    location: 'Matobo Hills',
    availability: 'high'
  }
];

const ActivitiesDatabase = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'adventure' | 'wildlife' | 'cultural'>('all');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [itinerary, setItinerary] = useState<Activity[]>([]);

  const filteredActivities = activities.filter(activity => 
    selectedCategory === 'all' || activity.category === selectedCategory
  );

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600';
    if (difficulty <= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyText = (difficulty: number) => {
    const levels = ['', 'Easy', 'Moderate', 'Challenging', 'Difficult', 'Extreme'];
    return levels[difficulty];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'adventure': return Mountain;
      case 'wildlife': return Binoculars;
      case 'cultural': return Users;
      default: return Mountain;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const addToItinerary = (activity: Activity) => {
    if (!itinerary.find(item => item.id === activity.id)) {
      setItinerary([...itinerary, activity]);
    }
    setSelectedActivity(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Activities & Experiences</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Choose from adventure activities, wildlife encounters, and cultural experiences
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { id: 'all', label: 'All Activities' },
          { id: 'adventure', label: 'Adventure' },
          { id: 'wildlife', label: 'Wildlife' },
          { id: 'cultural', label: 'Cultural' }
        ].map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={selectedCategory === category.id ? 'bg-orange-600 hover:bg-orange-700' : ''}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => {
          const CategoryIcon = getCategoryIcon(activity.category);
          
          return (
            <Card 
              key={activity.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedActivity(activity)}
            >
              <div className="relative">
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-orange-600">
                    <CategoryIcon className="h-3 w-3 mr-1" />
                    {activity.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white text-sm font-semibold">{activity.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{activity.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`h-4 w-4 ${getDifficultyColor(activity.difficulty)}`} />
                      <span className={getDifficultyColor(activity.difficulty)}>
                        {getDifficultyText(activity.difficulty)}
                      </span>
                    </div>
                    <div className={getAvailabilityColor(activity.availability)}>
                      {activity.availability} availability
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {activity.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {activity.minAge}+ years
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-orange-600">${activity.price}</div>
                    <Button 
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Itinerary Sidebar */}
      {itinerary.length > 0 && (
        <Card className="fixed bottom-4 right-4 w-80 max-h-96 overflow-y-auto bg-white shadow-2xl z-40">
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Your Itinerary ({itinerary.length})</h3>
            <div className="space-y-2">
              {itinerary.map((activity, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span>{activity.name}</span>
                  <span className="text-orange-600">${activity.price}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-orange-600">
                  ${itinerary.reduce((sum, activity) => sum + activity.price, 0)}
                </span>
              </div>
              <Button className="w-full mt-2 bg-orange-600 hover:bg-orange-700">
                Book Itinerary
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={selectedActivity.image}
                  alt={selectedActivity.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedActivity.name}</h2>
                  <p className="text-gray-600">{selectedActivity.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Activity Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className={getDifficultyColor(selectedActivity.difficulty)}>
                          {getDifficultyText(selectedActivity.difficulty)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{selectedActivity.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min Age:</span>
                        <span>{selectedActivity.minAge} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span>{selectedActivity.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">What's Included</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedActivity.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Backpack className="h-4 w-4" />
                    Packing Recommendations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivity.packingList.map((item, index) => (
                      <Badge key={index} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">${selectedActivity.price}</div>
                    <div className="text-sm text-gray-600">per person</div>
                  </div>
                  <Button
                    onClick={() => addToItinerary(selectedActivity)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Itinerary
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ActivitiesDatabase;
