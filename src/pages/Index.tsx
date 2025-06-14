
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  Camera,
  Phone,
  Mail,
  Globe,
  Clock,
  Heart,
  X
} from "lucide-react";

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
    price: "$250",
    duration: "Full Day"
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
    price: "$120",
    duration: "Half Day"
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
    price: "$180",
    duration: "2 Days"
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
    price: "$320",
    duration: "3 Days"
  },
  {
    id: 5,
    name: "Eastern Highlands",
    location: "Manicaland Province",
    rating: 4.6,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Scenic mountains and cool climate retreat",
    category: "Natural Wonder",
    price: "$200",
    duration: "2 Days"
  },
  {
    id: 6,
    name: "Matobo Hills",
    location: "Bulawayo",
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=800&h=600&fit=crop",
    description: "Ancient rock formations and cultural heritage",
    category: "Historical",
    price: "$150",
    duration: "Full Day"
  }
];

const categories = ["All", "Natural Wonder", "Historical", "Wildlife", "Adventure"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteDestinations, setFavoriteDestinations] = useState<number[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const { toast } = useToast();

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (destinationId: number) => {
    setFavoriteDestinations(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
    
    toast({
      title: favoriteDestinations.includes(destinationId) ? "Removed from favorites" : "Added to favorites",
      description: "Check your favorites list to see saved destinations",
    });
  };

  const handleBookNow = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBookingModal(false);
    toast({
      title: "Booking Request Sent!",
      description: `We'll contact you soon about your ${selectedDestination?.name} trip.`,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-xl border-b border-orange-500/30 sticky top-0 z-50">
        <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-400 via-red-500 to-green-500"></div>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Zimbabwe Wanderlust
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('destinations')}
                className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Destinations
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Tours
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Book Now
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/50 to-red-900/50"></div>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Zimbabwe</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the natural wonders, rich culture, and incredible wildlife of Zimbabwe with our expertly crafted tours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('destinations')}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 text-lg"
            >
              Explore Destinations
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection('features')}
              className="border-orange-400 text-orange-400 hover:bg-orange-400/10 px-8 py-4 text-lg"
            >
              View Tours
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-orange-500/30 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-orange-400" />
              <Input
                placeholder="Search destinations..."
                className="pl-10 pr-10 h-12 text-lg bg-gray-800/50 border-orange-500/30 text-white placeholder:text-gray-400 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" 
                    : "border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredDestinations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No destinations found matching your search criteria.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 bg-orange-600 hover:bg-orange-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {filteredDestinations.length > 0 && (
          <div className="mb-6 text-center">
            <p className="text-gray-300">
              Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="group overflow-hidden border-0 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 bg-black/90 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/50"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-white">{destination.rating}</span>
                </div>
                <button 
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm rounded-full p-2 text-white hover:bg-orange-500/80 transition-colors"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favoriteDestinations.includes(destination.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-white'
                    }`} 
                  />
                </button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-1">{destination.name}</h3>
                <div className="flex items-center text-orange-300 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="text-xs">{destination.location}</span>
                </div>
                <p className="text-gray-300 text-xs mb-3 line-clamp-2">{destination.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-orange-400 font-bold">{destination.price}</div>
                  <Button 
                    size="sm" 
                    onClick={() => handleBookNow(destination)}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-r from-orange-900/20 to-red-900/20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Zimbabwe Wanderlust?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We provide authentic, expertly guided experiences that showcase the best of Zimbabwe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/20 p-6 text-center hover:border-orange-500/50 transition-colors">
              <Camera className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Expert Photography</h3>
              <p className="text-gray-300 text-sm">Capture stunning memories with our professional photography services</p>
            </Card>
            
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/20 p-6 text-center hover:border-orange-500/50 transition-colors">
              <Users className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">Local Guides</h3>
              <p className="text-gray-300 text-sm">Learn from passionate locals who know every hidden gem</p>
            </Card>
            
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/20 p-6 text-center hover:border-orange-500/50 transition-colors">
              <Star className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-white font-bold mb-2">5-Star Service</h3>
              <p className="text-gray-300 text-sm">Luxury accommodations and premium service throughout your journey</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Start Your Adventure?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Phone className="h-5 w-5 text-orange-400" />
              <span>+263 4 123 456</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Mail className="h-5 w-5 text-orange-400" />
              <span>info@zimwanderlust.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Globe className="h-5 w-5 text-orange-400" />
              <span>Zimbabwe</span>
            </div>
          </div>
          <Button 
            size="lg" 
            onClick={() => setShowBookingModal(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 text-lg"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Plan Your Trip
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-orange-500/30 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Zimbabwe Wanderlust
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Zimbabwe Wanderlust. All rights reserved. Experience the magic of Zimbabwe.
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-black/95 backdrop-blur-xl border border-orange-500/30 max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  {selectedDestination ? `Book ${selectedDestination.name}` : 'Plan Your Trip'}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <Input 
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <Input 
                    type="email"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                  <Input 
                    type="tel"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Date</label>
                  <Input 
                    type="date"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Number of Travelers</label>
                  <Input 
                    type="number"
                    min="1"
                    defaultValue="2"
                    required
                    className="bg-gray-800/50 border-gray-600 text-white"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    Send Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
