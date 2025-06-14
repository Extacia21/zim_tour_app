
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroLocation {
  id: string;
  name: string;
  tagline: string;
  backgroundVideo: string;
  backgroundImage: string;
  ambientSound: string;
  description: string;
  keyHighlight: string;
  bestTime: string;
}

const heroLocations: HeroLocation[] = [
  {
    id: 'victoria-falls',
    name: 'Victoria Falls',
    tagline: 'Where Thunder Meets Rainbow',
    backgroundVideo: 'https://player.vimeo.com/external/342394285.hd.mp4?s=1234',
    backgroundImage: '/lovable-uploads/d03937c6-7997-45c8-872a-4b2fa9022a07.png',
    ambientSound: '/sounds/waterfall.mp3',
    description: 'Experience the raw power of one of the Seven Natural Wonders',
    keyHighlight: 'Best helicopter views in Africa',
    bestTime: 'Peak flow: March - May'
  },
  {
    id: 'hwange',
    name: 'Hwange National Park',
    tagline: 'Giants of the Savanna',
    backgroundVideo: 'https://player.vimeo.com/external/elephants.hd.mp4',
    backgroundImage: '/lovable-uploads/bc57d6ad-4055-4d57-9112-57f8c856f2e8.png',
    ambientSound: '/sounds/savanna.mp3',
    description: 'Home to 40,000+ elephants and diverse wildlife',
    keyHighlight: '400+ bird species',
    bestTime: 'Dry season: May - October'
  },
  {
    id: 'great-zimbabwe',
    name: 'Great Zimbabwe',
    tagline: 'Ancient Stone City Under Stars',
    backgroundVideo: 'https://player.vimeo.com/external/ruins.hd.mp4',
    backgroundImage: '/lovable-uploads/f5b7c9ff-098f-4495-ac5d-011d1dfce65f.png',
    ambientSound: '/sounds/night-sounds.mp3',
    description: 'UNESCO World Heritage Site with 900-year-old mysteries',
    keyHighlight: 'Largest ancient structures south of Sahara',
    bestTime: 'Cool season: April - August'
  }
];

const DynamicHeroSection = () => {
  const [currentLocation, setCurrentLocation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');

  const location = heroLocations[currentLocation];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % heroLocations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate day/night cycle for Great Zimbabwe
    if (location.id === 'great-zimbabwe') {
      const dayNightInterval = setInterval(() => {
        setTimeOfDay(prev => prev === 'day' ? 'night' : 'day');
      }, 4000);
      return () => clearInterval(dayNightInterval);
    }
  }, [location.id]);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // In a real app, this would control audio playback
  };

  const handleExploreLocation = () => {
    // Navigate to the specific destination page
    window.location.href = `/destination/${location.id}`;
  };

  const handleBookExperience = () => {
    // Navigate to planning page
    window.location.href = '/planning';
  };

  const handleStartJourney = () => {
    const element = document.getElementById('destinations-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVirtualTour = () => {
    window.open('https://www.google.com/maps/@-17.9245,25.8566,3a,75y,90t,0h/data=!3m7!1e1!3m5!1sAF1QipOtO9_8B-RV-V-V4V4V4V4V4V4V4V4V4V!2e10!3e11!7i8192!8i4096', '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${location.backgroundImage})` }}
        >
          {/* Dynamic overlays based on location */}
          {location.id === 'victoria-falls' && (
            <div className="absolute inset-0">
              {/* Mist effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/20 via-blue-200/10 to-transparent animate-pulse"></div>
              {/* Rainbow effect */}
              <div className="absolute top-1/3 right-1/4 w-32 h-16 bg-gradient-to-r from-red-400/30 via-yellow-400/30 via-green-400/30 via-blue-400/30 to-purple-400/30 rounded-full blur-sm animate-pulse"></div>
            </div>
          )}
          
          {location.id === 'hwange' && (
            <div className="absolute inset-0">
              {/* Dust particles */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-300/40 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          )}

          {location.id === 'great-zimbabwe' && (
            <div className={`absolute inset-0 transition-all duration-2000 ${
              timeOfDay === 'night' 
                ? 'bg-gradient-to-b from-purple-900/70 to-black/80' 
                : 'bg-gradient-to-b from-orange-200/30 to-yellow-100/20'
            }`}>
              {/* Stars for night mode */}
              {timeOfDay === 'night' && (
                <>
                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 50}%`,
                        animationDelay: `${Math.random() * 3}s`
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Main overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          {/* Location badges */}
          <div className="flex justify-center gap-2 mb-6">
            {heroLocations.map((loc, index) => (
              <button
                key={loc.id}
                onClick={() => setCurrentLocation(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  index === currentLocation
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'bg-black/50 text-white/70 hover:bg-black/70 backdrop-blur-sm'
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl">
              {location.name}
            </h1>
            
            <p className="text-2xl md:text-3xl text-orange-200 font-light max-w-4xl mx-auto">
              {location.tagline}
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {location.description}
            </p>

            {/* Key highlights */}
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 px-4 py-2">
                {location.keyHighlight}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2">
                {location.bestTime}
              </Badge>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                onClick={handleExploreLocation}
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8 py-4 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Explore {location.name}
              </Button>
              
              <Button 
                onClick={handleBookExperience}
                size="lg" 
                variant="outline" 
                className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:scale-105 transition-all duration-300"
              >
                Book Experience
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Audio controls */}
            <div className="flex justify-center gap-4 pt-4">
              <Button
                onClick={toggleSound}
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white backdrop-blur-sm hover:bg-white/10"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                Ambient Sounds
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default DynamicHeroSection;
