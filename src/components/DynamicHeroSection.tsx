
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';

const DynamicHeroSection = () => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    // In a real app, this would control audio playback
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image - Victoria Falls */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center transition-all duration-1000 animate-scale-in"
          style={{ backgroundImage: `url(/lovable-uploads/d03937c6-7997-45c8-872a-4b2fa9022a07.png)` }}
        >
          {/* Victoria Falls specific effects */}
          <div className="absolute inset-0">
            {/* Mist effect with enhanced animation */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-white/30 via-blue-200/20 to-transparent animate-pulse"></div>
            
            {/* Rainbow effect with movement */}
            <div className="absolute top-1/3 right-1/4 w-40 h-20 bg-gradient-to-r from-red-400/40 via-yellow-400/40 via-green-400/40 via-blue-400/40 to-purple-400/40 rounded-full blur-sm animate-pulse"></div>
            
            {/* Floating water droplets */}
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-200/60 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${60 + Math.random() * 40}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`
                }}
              />
            ))}
            
            {/* Sparkling water effects */}
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${0.8 + Math.random() * 1.5}s`
                }}
              >
                <Sparkles 
                  className="text-blue-200 opacity-60" 
                  size={Math.random() * 15 + 8}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced overlay with depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
      </div>

      {/* Hero Content with enhanced animations */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <div className="space-y-8">
            {/* Main heading with staggered animation */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white drop-shadow-2xl animate-scale-in">
                <span className="block animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Victoria
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Falls
                </span>
              </h1>
              
              <p className="text-2xl md:text-4xl text-blue-200 font-light max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
                Where Thunder Meets Rainbow
              </p>
            </div>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
              Experience the raw power of one of the Seven Natural Wonders of the World
            </p>

            {/* Enhanced highlights with staggered animations */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '1s' }}>
              <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-6 py-3 text-lg hover:scale-105 transition-transform duration-300">
                UNESCO World Heritage Site
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-6 py-3 text-lg hover:scale-105 transition-transform duration-300">
                Best helicopter views in Africa
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-6 py-3 text-lg hover:scale-105 transition-transform duration-300">
                Peak flow: March - May
              </Badge>
            </div>

            {/* Enhanced action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-10 py-5 text-xl font-semibold shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
              >
                <Sparkles className="h-6 w-6 mr-3" />
                Explore Victoria Falls
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/60 text-white hover:bg-white/20 px-10 py-5 text-xl font-semibold backdrop-blur-sm hover:scale-110 transition-all duration-300"
              >
                Book Experience
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
            </div>

            {/* Audio controls with animation */}
            <div className="flex justify-center gap-6 pt-6 animate-fade-in" style={{ animationDelay: '1.4s' }}>
              <Button
                onClick={toggleSound}
                variant="ghost"
                size="lg"
                className="text-white/80 hover:text-white backdrop-blur-sm hover:bg-white/20 px-6 py-3 hover:scale-105 transition-all duration-300"
              >
                {soundEnabled ? <Volume2 className="h-5 w-5 mr-3" /> : <VolumeX className="h-5 w-5 mr-3" />}
                Waterfall Sounds
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center hover:border-white transition-colors duration-300">
          <div className="w-1 h-4 bg-white/80 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>

      {/* Floating action elements */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 hidden lg:block animate-fade-in" style={{ animationDelay: '1.6s' }}>
        <div className="flex flex-col gap-4">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer">
            <Play className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicHeroSection;
