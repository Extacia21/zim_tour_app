import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Users, 
  Camera, 
  Plane,
  Sparkles,
  Mountain,
  TreePine,
  Binoculars,
  Compass,
  Waves,
  Fish,
  Camera as CameraIcon,
  Crown
} from 'lucide-react';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedFooter from '@/components/EnhancedFooter';

const destinations = [
  {
    name: 'Victoria Falls',
    slug: 'victoria-falls',
    tagline: 'The Smoke That Thunders',
    image: '/lovable-uploads/d03937c6-7997-45c8-872a-4b2fa9022a07.png',
    rating: 4.9,
    reviews: 2847,
    unesco: true,
    description: 'Experience the raw power of one of the Seven Natural Wonders',
    icon: Mountain
  },
  {
    name: 'Hwange National Park',
    slug: 'hwange',
    tagline: 'Giants of the Savanna',
    image: '/lovable-uploads/bc57d6ad-4055-4d57-9112-57f8c856f2e8.png',
    rating: 4.8,
    reviews: 1923,
    unesco: false,
    description: 'Home to Africa\'s largest elephant population',
    icon: Binoculars
  },
  {
    name: 'Great Zimbabwe',
    slug: 'great-zimbabwe',
    tagline: 'Ancient African Kingdom',
    image: '/lovable-uploads/f5b7c9ff-098f-4495-ac5d-011d1dfce65f.png',
    rating: 4.7,
    reviews: 1456,
    unesco: true,
    description: 'The ancient stone city that gave Zimbabwe its name',
    icon: Crown
  },
  {
    name: 'Mana Pools',
    slug: 'mana-pools',
    tagline: 'Pristine Wilderness',
    image: '/lovable-uploads/b3711832-269a-472f-b0f3-f0af5a0e0f43.png',
    rating: 4.9,
    reviews: 987,
    unesco: true,
    description: 'UNESCO World Heritage Site with pristine wilderness',
    icon: TreePine
  },
  {
    name: 'Eastern Highlands',
    slug: 'eastern-highlands',
    tagline: 'Misty Mountains',
    image: '/lovable-uploads/e1646cba-0cda-4d34-a90f-a3cd73555f04.png',
    rating: 4.6,
    reviews: 743,
    unesco: false,
    description: 'Cool mountain climate and scenic tea plantations',
    icon: Mountain
  },
  {
    name: 'Matobo Hills',
    slug: 'matobo',
    tagline: 'Stone Sanctuary',
    image: '/lovable-uploads/99d20328-4c15-485a-b03a-79ccbf64477a.png',
    rating: 4.8,
    reviews: 1234,
    unesco: true,
    description: 'Ancient granite formations and spiritual heritage',
    icon: Compass
  },
  {
    name: 'Lake Kariba',
    slug: 'lake-kariba',
    tagline: 'Africa\'s Paradise Lake',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    rating: 4.7,
    reviews: 892,
    unesco: false,
    description: 'World\'s largest man-made lake by volume',
    icon: Waves
  },
  {
    name: 'Chinhoyi Caves',
    slug: 'chinhoyi-caves',
    tagline: 'Crystal Blue Pools',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop',
    rating: 4.5,
    reviews: 567,
    unesco: false,
    description: 'Underground limestone caves with crystal-clear pools',
    icon: Compass
  },
  {
    name: 'Gonarezhou National Park',
    slug: 'gonarezhou',
    tagline: 'Land of the Giants',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 421,
    unesco: false,
    description: 'Remote wilderness with red cliffs and baobab trees',
    icon: TreePine
  },
  {
    name: 'Antelope Park',
    slug: 'antelope-park',
    tagline: 'Walk with Lions',
    image: 'https://images.unsplash.com/photo-1544943871-6ad0fc82a69e?w=800&h=600&fit=crop',
    rating: 4.4,
    reviews: 678,
    unesco: false,
    description: 'Lion conservation and wildlife rehabilitation center',
    icon: CameraIcon
  },
  {
    name: 'Matusadona National Park',
    slug: 'matusadona',
    tagline: 'Kariba\'s Wildlife Haven',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
    rating: 4.5,
    reviews: 334,
    unesco: false,
    description: 'Game viewing along the shores of Lake Kariba',
    icon: Fish
  },
  {
    name: 'Chizarira National Park',
    slug: 'chizarira',
    tagline: 'Rugged Wilderness',
    image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
    rating: 4.3,
    reviews: 189,
    unesco: false,
    description: 'Remote and rugged landscape with diverse wildlife',
    icon: Mountain
  }
];

const experiences = [
  {
    title: 'Wildlife Safari',
    description: 'Discover Zimbabwe\'s incredible wildlife',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=400&h=300&fit=crop',
    link: '/wildlife'
  },
  {
    title: 'Luxury Lodges',
    description: 'Premium accommodations in stunning locations',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    link: '/hotels/all'
  },
  {
    title: 'Adventure Activities',
    description: 'Thrilling adventures and cultural experiences',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
    link: '/activities/all'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <EnhancedNavigation />
      
      {/* Hero Section with Sparkling Effects */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
        </div>

        {/* Sparkling Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            >
              <Sparkles 
                className="text-yellow-300 opacity-70" 
                size={Math.random() * 20 + 10}
              />
            </div>
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            Zimbabwe
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Wanderlust
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the breathtaking beauty and rich culture of Zimbabwe through immersive experiences 
            and cutting-edge AI technology
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-black/60 backdrop-blur-xl rounded-lg px-6 py-3 border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">{destinations.length}</div>
              <div className="text-white/80 text-sm">Destinations</div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-lg px-6 py-3 border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">4.8</div>
              <div className="text-white/80 text-sm">Average Rating</div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-lg px-6 py-3 border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">15k+</div>
              <div className="text-white/80 text-sm">Happy Travelers</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg"
            >
              <Plane className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/10 backdrop-blur-xl border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              Virtual Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Experiences</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Immerse yourself in Zimbabwe's most captivating adventures
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <Link key={index} to={experience.link} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{experience.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600">{experience.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Discover Zimbabwe</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From thundering waterfalls to ancient ruins, explore the wonders that make Zimbabwe unforgettable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {destinations.map((destination, index) => {
              const IconComponent = destination.icon;
              return (
                <Link key={index} to={`/destination/${destination.slug}`} className="group">
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105 bg-white/80 backdrop-blur-sm">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* UNESCO Badge */}
                      {destination.unesco && (
                        <Badge className="absolute top-4 left-4 bg-blue-600 text-white">
                          UNESCO Site
                        </Badge>
                      )}
                      
                      {/* Rating */}
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center gap-1 text-white text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{destination.rating}</span>
                        </div>
                      </div>
                      
                      {/* Icon overlay */}
                      <div className="absolute bottom-4 left-4">
                        <IconComponent className="h-8 w-8 text-white/80" />
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {destination.name}
                        </h3>
                        <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                      </div>
                      
                      <p className="text-orange-600 font-medium text-sm mb-2">{destination.tagline}</p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Users className="h-4 w-4" />
                          <span>{destination.reviews.toLocaleString()} reviews</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-orange-600 hover:bg-orange-700 group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600"
                        >
                          Explore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Index;
