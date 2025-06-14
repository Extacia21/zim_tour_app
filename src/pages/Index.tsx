
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import CulturalImmersion from "@/components/CulturalImmersion";
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
  X,
  ArrowRight,
  Binoculars,
  Mountain
} from "lucide-react";

const destinations = [
  {
    id: 1,
    slug: "victoria-falls",
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
    slug: "great-zimbabwe",
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
    slug: "hwange",
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
    slug: "mana-pools",
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
    slug: "eastern-highlands",
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
    slug: "matobo",
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-orange-200 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Zimbabwe Wanderlust
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('destinations')}
                className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                Destinations
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('culture')}
                className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                Culture
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-orange-600 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
            
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              Plan Your Journey
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center bg-gradient-to-br from-orange-100 to-red-100">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Discover
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> Zimbabwe</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Experience the natural wonders, rich culture, and incredible wildlife of Zimbabwe with our expertly crafted immersive tours and authentic local experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('destinations')}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 text-lg"
            >
              <Binoculars className="h-5 w-5 mr-2" />
              Explore Destinations
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => scrollToSection('culture')}
              className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Cultural Experiences
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Iconic Destinations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From thundering waterfalls to ancient ruins, discover Zimbabwe's most spectacular locations
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-orange-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-orange-500" />
              <Input
                placeholder="Search destinations, experiences, wildlife..."
                className="pl-10 pr-10 h-12 text-lg border-orange-200 focus:border-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
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
                    : "border-orange-300 text-orange-600 hover:bg-orange-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredDestinations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No destinations found matching your search criteria.</p>
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
            <p className="text-gray-600">
              Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        )}

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white"
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                </div>
                <button 
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 text-gray-700 hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      favoriteDestinations.includes(destination.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-700'
                    }`} 
                  />
                </button>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                <div className="flex items-center text-orange-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{destination.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-orange-600 font-bold text-lg">{destination.price}</div>
                  <div className="flex gap-2">
                    <Link to={`/destination/${destination.slug}`}>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-orange-600 text-orange-600 hover:bg-orange-50"
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        Explore
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      onClick={() => handleBookNow(destination)}
                      className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-r from-orange-100 to-red-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Zimbabwe Wanderlust?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              We provide authentic, expertly guided experiences that showcase the best of Zimbabwe with cutting-edge features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Camera className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h3 className="text-gray-900 font-bold text-xl mb-4">Immersive Experiences</h3>
              <p className="text-gray-600">HD video showcases, interactive galleries, and real-time wildlife tracking for unforgettable memories</p>
            </Card>
            
            <Card className="bg-white shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Users className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h3 className="text-gray-900 font-bold text-xl mb-4">Expert Local Guides</h3>
              <p className="text-gray-600">Learn from passionate locals with cultural insights, folklore, and hidden gems only they know</p>
            </Card>
            
            <Card className="bg-white shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Mountain className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h3 className="text-gray-900 font-bold text-xl mb-4">Smart Travel Tools</h3>
              <p className="text-gray-600">Multi-modal navigation, hotel discovery system, and activities database for seamless planning</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Cultural Immersion Section */}
      <section id="culture" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <CulturalImmersion />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Ready to Start Your Adventure?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Phone className="h-6 w-6 text-orange-600" />
              <span className="text-lg">+263 4 123 456</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Mail className="h-6 w-6 text-orange-600" />
              <span className="text-lg">info@zimwanderlust.com</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <Globe className="h-6 w-6 text-orange-600" />
              <span className="text-lg">Zimbabwe</span>
            </div>
          </div>
          <Button 
            size="lg" 
            onClick={() => setShowBookingModal(true)}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 text-lg"
          >
            <Calendar className="h-6 w-6 mr-2" />
            Plan Your Trip Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Zimbabwe Wanderlust
          </div>
          <p className="text-gray-400">
            © 2024 Zimbabwe Wanderlust. All rights reserved. Experience the magic of Zimbabwe with authentic cultural immersion.
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedDestination ? `Book ${selectedDestination.name}` : 'Plan Your Trip'}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input 
                    required
                    className="border-gray-300"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    type="email"
                    required
                    className="border-gray-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input 
                    type="tel"
                    required
                    className="border-gray-300"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <Input 
                    type="date"
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <Input 
                    type="number"
                    min="1"
                    defaultValue="2"
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1"
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
