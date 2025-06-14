import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import CulturalImmersion from "@/components/CulturalImmersion";
import EnhancedNavigation from "@/components/EnhancedNavigation";
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
  Mountain,
  Compass,
  TreePine,
  Sunset,
  MapIcon
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
    description: "One of the Seven Natural Wonders of the World - witness the thundering 'Smoke that Thunders'",
    category: "Natural Wonder",
    price: "$250",
    duration: "Full Day",
    highlight: "UNESCO World Heritage Site"
  },
  {
    id: 2,
    slug: "great-zimbabwe",
    name: "Great Zimbabwe",
    location: "Masvingo Province",
    rating: 4.7,
    reviews: 1243,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
    description: "Ancient stone city and UNESCO World Heritage Site - birthplace of modern Zimbabwe",
    category: "Historical",
    price: "$120",
    duration: "Half Day",
    highlight: "900+ years old"
  },
  {
    id: 3,
    slug: "hwange",
    name: "Hwange National Park",
    location: "Matabeleland North",
    rating: 4.8,
    reviews: 1856,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop",
    description: "Zimbabwe's largest national park with 40,000+ elephants and incredible wildlife diversity",
    category: "Wildlife",
    price: "$180",
    duration: "2 Days",
    highlight: "Big 5 Safari"
  },
  {
    id: 4,
    slug: "mana-pools",
    name: "Mana Pools",
    location: "Mashonaland Central",
    rating: 4.9,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop",
    description: "UNESCO wilderness area known for walking safaris and canoe expeditions on the Zambezi",
    category: "Adventure",
    price: "$320",
    duration: "3 Days",
    highlight: "Walking Safari Paradise"
  },
  {
    id: 5,
    slug: "eastern-highlands",
    name: "Eastern Highlands",
    location: "Manicaland Province",
    rating: 4.6,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Scenic mountain ranges with cool climate, coffee plantations, and stunning vistas",
    category: "Natural Wonder",
    price: "$200",
    duration: "2 Days",
    highlight: "Coffee & Mountain Views"
  },
  {
    id: 6,
    slug: "matobo",
    name: "Matobo Hills",
    location: "Bulawayo",
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=800&h=600&fit=crop",
    description: "Ancient granite rock formations with world's highest density of rock art and spiritual significance",
    category: "Historical",
    price: "$150",
    duration: "Full Day",
    highlight: "Ancient Rock Art"
  }
];

const featuredExperiences = [
  {
    title: "Victoria Falls Helicopter Flight",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
    price: "$180",
    duration: "15 mins"
  },
  {
    title: "Hwange Elephant Safari",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=400&h=300&fit=crop",
    price: "$220",
    duration: "Full Day"
  },
  {
    title: "Great Zimbabwe Cultural Tour",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
    price: "$85",
    duration: "Half Day"
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
      <EnhancedNavigation />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background with multiple layers */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop)` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              Discover
              <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Zimbabwe
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-200 mb-8 max-w-4xl mx-auto font-light">
              Experience the thundering Victoria Falls, witness Africa's Big Five, explore ancient ruins, 
              and immerse yourself in authentic Zimbabwean culture
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30">
                <div className="text-3xl font-bold text-orange-400">7</div>
                <div className="text-white text-sm">UNESCO Sites</div>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30">
                <div className="text-3xl font-bold text-orange-400">40,000+</div>
                <div className="text-white text-sm">Elephants</div>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30">
                <div className="text-3xl font-bold text-orange-400">100+</div>
                <div className="text-white text-sm">Activities</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('destinations')}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 text-lg shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Binoculars className="h-5 w-5 mr-2" />
                Explore Destinations
              </Button>
              <Link to="/wildlife">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm hover:scale-105 transition-all duration-300 w-full"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Wildlife Safari
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Experiences Section */}
      <section className="py-20 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Signature Experiences</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked adventures that showcase the very best of Zimbabwe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredExperiences.map((experience, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{experience.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-orange-300 font-semibold">{experience.price}</span>
                      <span className="text-white/80 text-sm">{experience.duration}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
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

        {/* Enhanced Destinations Grid */}
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
                <div className="absolute bottom-4 left-4">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-orange-600 border-orange-600">
                    {destination.highlight}
                  </Badge>
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{destination.description}</p>
                
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

                <div className="flex items-center justify-between mb-4">
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
              
                {/* Quick Links */}
                <div className="flex gap-1 pt-2 border-t">
                  <Link to={`/hotels/${destination.slug}`}>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      Hotels
                    </Button>
                  </Link>
                  <Link to={`/activities/${destination.slug}`}>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      Activities
                    </Button>
                  </Link>
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
              We provide authentic, expertly guided experiences that showcase the best of Zimbabwe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Camera className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h3 className="text-gray-900 font-bold text-xl mb-4">Immersive Experiences</h3>
              <p className="text-gray-600">Professional photography tours, cultural immersion programs, and exclusive access to hidden gems</p>
            </Card>
            
            <Card className="bg-white shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Users className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h3 className="text-gray-900 font-bold text-xl mb-4">Expert Local Guides</h3>
              <p className="text-gray-600">Passionate Zimbabwean guides with deep cultural knowledge and wildlife expertise</p>
            </Card>
            
            <Card className="bg-white shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Compass className="h-16 w-16 text-orange-600 mx-auto mb-6" />
              <h3 className="text-gray-900 font-bold text-xl mb-4">Sustainable Tourism</h3>
              <p className="text-gray-600">Supporting local communities and conservation efforts throughout Zimbabwe</p>
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
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                Zimbabwe Wanderlust
              </div>
              <p className="text-gray-400 mb-4">
                Discover the heart of Africa through authentic experiences and unforgettable adventures.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/destination/victoria-falls" className="hover:text-orange-400">Victoria Falls</Link></li>
                <li><Link to="/destination/hwange" className="hover:text-orange-400">Hwange National Park</Link></li>
                <li><Link to="/destination/great-zimbabwe" className="hover:text-orange-400">Great Zimbabwe</Link></li>
                <li><Link to="/destination/mana-pools" className="hover:text-orange-400">Mana Pools</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Experiences</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/wildlife" className="hover:text-orange-400">Wildlife Safari</Link></li>
                <li><Link to="/hotels/all" className="hover:text-orange-400">Luxury Lodges</Link></li>
                <li><Link to="/activities/all" className="hover:text-orange-400">Adventure Activities</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+263 4 123 456</li>
                <li>info@zimwanderlust.com</li>
                <li>Harare, Zimbabwe</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Zimbabwe Wanderlust. All rights reserved. Experience the magic of Zimbabwe.</p>
          </div>
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
