
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Star, 
  Clock, 
  Thermometer,
  Camera,
  Play,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import HotelDiscoverySystem from '@/components/HotelDiscoverySystem';
import ActivitiesDatabase from '@/components/ActivitiesDatabase';
import WildlifeSpotlight from '@/components/WildlifeSpotlight';
import NavigationTools from '@/components/NavigationTools';

const destinations = {
  'victoria-falls': {
    name: 'Victoria Falls',
    tagline: 'The Smoke That Thunders',
    videoUrl: 'https://player.vimeo.com/external/342394285.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop',
    unesco: true,
    usp: 'Largest waterfall by volume in the world',
    bestSeason: 'Peak flow: March - May',
    temperature: '25-30°C',
    description: 'Experience the raw power of one of the Seven Natural Wonders of the World',
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&h=600&fit=crop'
    ]
  },
  'hwange': {
    name: 'Hwange National Park',
    tagline: 'Giants of the Savanna',
    videoUrl: 'https://player.vimeo.com/external/elephants.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=1920&h=1080&fit=crop',
    unesco: false,
    usp: 'Home to 40,000+ elephants',
    bestSeason: 'Dry season: May - October',
    temperature: '20-35°C',
    description: 'Zimbabwe\'s largest national park with diverse wildlife',
    gallery: [
      'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&h=600&fit=crop'
    ]
  },
  'matobo': {
    name: 'Matobo Hills',
    tagline: 'Ancient Stone Sanctuary',
    videoUrl: 'https://player.vimeo.com/external/ruins.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=1920&h=1080&fit=crop',
    unesco: true,
    usp: 'Largest concentration of rock art in Southern Africa',
    bestSeason: 'Cool season: April - August',
    temperature: '15-25°C',
    description: 'Ancient granite formations and spiritual heritage',
    gallery: [
      'https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop'
    ]
  }
};

const DestinationPage = () => {
  const { slug } = useParams();
  const destination = destinations[slug as keyof typeof destinations];
  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!destination) {
    return <div>Destination not found</div>;
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % destination.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section with Video */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
          
          {/* Particle Effects */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            {destination.name}
          </h1>
          <p className="text-2xl md:text-3xl text-orange-200 mb-8">{destination.tagline}</p>
          
          {/* Key Facts Panel */}
          <Card className="bg-black/80 backdrop-blur-xl border border-orange-500/30 p-6 max-w-2xl">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                <div className="text-center">
                  {destination.unesco && (
                    <Badge className="bg-blue-600 mb-2">UNESCO World Heritage</Badge>
                  )}
                  <p className="text-sm text-gray-300">Status</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-orange-400" />
                    <span className="text-orange-400">{destination.bestSeason}</span>
                  </div>
                  <p className="text-sm text-gray-300">Best Season</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4 text-red-400" />
                    <span className="text-red-400">{destination.temperature}</span>
                  </div>
                  <p className="text-sm text-gray-300">Temperature</p>
                </div>
              </div>
              <div className="border-t border-gray-600 pt-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                  {destination.usp}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'hotels', label: 'Hotels' },
              { id: 'activities', label: 'Activities' },
              { id: 'wildlife', label: 'Wildlife' },
              { id: 'navigation', label: 'Navigation' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">About {destination.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{destination.description}</p>
              </CardContent>
            </Card>

            {/* Quick Gallery Preview */}
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Photo Gallery</h3>
                  <Button
                    onClick={() => setShowGallery(true)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    View All Photos
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {destination.gallery.slice(0, 6).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => {
                        setCurrentImage(index);
                        setShowGallery(true);
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'gallery' && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Media Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setCurrentImage(index);
                      setShowGallery(true);
                    }}
                  >
                    <img
                      src={image}
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'hotels' && <HotelDiscoverySystem />}
        {activeTab === 'activities' && <ActivitiesDatabase />}
        {activeTab === 'wildlife' && <WildlifeSpotlight />}
        {activeTab === 'navigation' && <NavigationTools />}
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-orange-400 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-orange-400 z-10"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
            
            <img
              src={destination.gallery[currentImage]}
              alt={`${destination.name} ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-orange-400 z-10"
            >
              <ChevronRight className="h-12 w-12" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentImage + 1} / {destination.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationPage;
