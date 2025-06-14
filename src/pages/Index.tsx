
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Calendar, Users, ArrowRight, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import AITravelConcierge from "@/components/AITravelConcierge";
import SafetyToolkit from "@/components/SafetyToolkit";
import Interactive3DGlobe from "@/components/Interactive3DGlobe";
import BookingEngine from "@/components/BookingEngine";

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
  const [activeSection, setActiveSection] = useState<'explore' | 'booking' | 'globe'>('explore');

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Safety Toolkit */}
      <SafetyToolkit />

      {/* AI Travel Concierge */}
      <AITravelConcierge />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-900/90 via-red-900/90 to-pink-900/90 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-200 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Zimbabwe
              </h1>
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-2xl md:text-3xl mb-8 text-orange-100 max-w-4xl mx-auto font-light">
              Experience Africa's hidden gem through <span className="text-yellow-300 font-semibold">AI-powered exploration</span>, 
              <span className="text-blue-300 font-semibold"> AR adventures</span>, and 
              <span className="text-green-300 font-semibold"> immersive experiences</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start AR Adventure
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                Explore with AI Guide
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <div className="bg-black/90 backdrop-blur-xl rounded-2xl p-2 border border-orange-500/30">
            <div className="flex gap-2">
              {[
                { id: 'explore', label: 'Explore Destinations', icon: Search },
                { id: 'globe', label: '3D Globe View', icon: MapPin },
                { id: 'booking', label: 'Book Experiences', icon: Calendar }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as any)}
                  variant={activeSection === tab.id ? 'default' : 'ghost'}
                  className={`px-6 py-3 ${
                    activeSection === tab.id
                      ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Globe Section */}
        {activeSection === 'globe' && (
          <div className="flex justify-center mb-8">
            <Interactive3DGlobe />
          </div>
        )}

        {/* Booking Engine Section */}
        {activeSection === 'booking' && (
          <BookingEngine />
        )}

        {/* Explore Destinations Section */}
        {activeSection === 'explore' && (
          <>
            {/* Search and Filter Section */}
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 -mt-10 relative z-10 border border-orange-500/30 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
                  <Input
                    placeholder="Search destinations, experiences, adventures..."
                    className="pl-10 h-12 text-lg bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/50"
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
                        ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg" 
                        : "border-orange-500/30 text-orange-400 hover:bg-orange-500/20 backdrop-blur-sm"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination, index) => (
                <Card 
                  key={destination.id} 
                  className="group overflow-hidden border-0 shadow-2xl hover:shadow-orange-500/25 transition-all duration-700 hover:scale-105 bg-black/90 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
                        {destination.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 border border-orange-500/30">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-white">{destination.rating}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                      <div className="flex items-center text-orange-300">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{destination.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 bg-gradient-to-b from-gray-900 to-black">
                    <div className="space-y-4">
                      <p className="text-gray-300 text-sm leading-relaxed">{destination.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{destination.reviews} reviews</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-orange-300">Popular Activities:</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.activities.map((activity, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-orange-500/20 text-orange-300 border border-orange-500/30">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg">
                          Launch AR View
                        </Button>
                        <Button variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Enhanced Call to Action */}
      <div className="bg-gradient-to-r from-orange-900 via-red-900 to-pink-900 text-white py-20 mt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
            Ready for Your AI-Powered Zimbabwe Adventure?
          </h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Join thousands of travelers discovering Zimbabwe through cutting-edge AR experiences, AI-guided tours, and seamless booking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-8 py-4 text-lg font-semibold text-black shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Download AI Travel App
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              Contact AR Guide
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
