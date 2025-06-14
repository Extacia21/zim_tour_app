
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Calendar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

const destinations = [
  {
    id: 1,
    name: "Victoria Falls",
    location: "Livingstone Border",
    rating: 4.9,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    description: "One of the Seven Natural Wonders of the World",
    category: "Natural Wonder",
    activities: ["Helicopter Tours", "Bungee Jumping", "River Rafting"]
  },
  {
    id: 2,
    name: "Great Zimbabwe",
    location: "Masvingo Province",
    rating: 4.7,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
    description: "Ancient city ruins and UNESCO World Heritage Site",
    category: "Historical",
    activities: ["Guided Tours", "Archaeological Walks", "Cultural Shows"]
  },
  {
    id: 3,
    name: "Hwange National Park",
    location: "Matabeleland North",
    rating: 4.8,
    reviews: 1856,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop",
    description: "Largest national park with diverse wildlife",
    category: "Wildlife",
    activities: ["Game Drives", "Walking Safaris", "Bird Watching"]
  },
  {
    id: 4,
    name: "Mana Pools",
    location: "Mashonaland Central",
    rating: 4.9,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop",
    description: "UNESCO site known for canoeing and wildlife",
    category: "Adventure",
    activities: ["Canoeing", "Walking Safaris", "Fishing"]
  },
  {
    id: 5,
    name: "Eastern Highlands",
    location: "Manicaland Province",
    rating: 4.6,
    reviews: 756,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Mountain ranges with cool climate and scenic beauty",
    category: "Mountains",
    activities: ["Hiking", "Tea Plantations", "Scenic Drives"]
  },
  {
    id: 6,
    name: "Lake Kariba",
    location: "Northern Zimbabwe",
    rating: 4.5,
    reviews: 632,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
    description: "Largest artificial lake in the world by volume",
    category: "Water Sports",
    activities: ["Boat Cruises", "Fishing", "Houseboat Stays"]
  }
];

const categories = ["All", "Natural Wonder", "Historical", "Wildlife", "Adventure", "Mountains", "Water Sports"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-orange-100 bg-clip-text text-transparent">
              Discover Zimbabwe
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Explore the heart of Africa through breathtaking landscapes, rich culture, and unforgettable adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
                Start Exploring
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
                Plan Your Trip
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 -mt-10 relative z-10 border border-orange-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search destinations, activities..."
                className="pl-10 h-12 text-lg border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-orange-600 hover:bg-orange-700" 
                    : "border-orange-200 text-orange-700 hover:bg-orange-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <Card key={destination.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white/80 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-orange-600 hover:bg-orange-700 text-white">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{destination.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{destination.reviews} reviews</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Popular Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.activities.map((activity, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                      View Details
                    </Button>
                    <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Zimbabwe Adventure?</h2>
          <p className="text-xl mb-8 text-orange-100">Join thousands of travelers who have discovered the magic of Zimbabwe</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
              Download App
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold">
              Contact Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
