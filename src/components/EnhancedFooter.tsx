
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: 'sun' | 'cloud' | 'rain';
}

interface EmergencyContact {
  title: string;
  number: string;
  description: string;
  icon: any;
}

const safariWeatherData: WeatherData[] = [
  {
    location: 'Victoria Falls',
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    icon: 'sun'
  },
  {
    location: 'Hwange NP',
    temperature: 32,
    condition: 'Clear',
    humidity: 45,
    windSpeed: 8,
    icon: 'sun'
  },
  {
    location: 'Eastern Highlands',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 78,
    windSpeed: 15,
    icon: 'cloud'
  }
];

const emergencyContacts: EmergencyContact[] = [
  {
    title: 'Police Emergency',
    number: '995',
    description: '24/7 Emergency Response',
    icon: Phone
  },
  {
    title: 'Medical Emergency',
    number: '994',
    description: 'Ambulance & Hospital',
    icon: Phone
  },
  {
    title: 'Tourist Helpline',
    number: '+263-4-793701',
    description: 'Zimbabwe Tourism Authority',
    icon: Globe
  },
  {
    title: 'Parks Emergency',
    number: '+263-4-706077',
    description: 'National Parks Authority',
    icon: MapPin
  }
];

const EnhancedFooter = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeatherIndex((prev) => (prev + 1) % safariWeatherData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sun': return <Sun className="h-6 w-6 text-yellow-400" />;
      case 'cloud': return <Cloud className="h-6 w-6 text-gray-400" />;
      case 'rain': return <CloudRain className="h-6 w-6 text-blue-400" />;
      default: return <Sun className="h-6 w-6 text-yellow-400" />;
    }
  };

  const currentWeather = safariWeatherData[currentWeatherIndex];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-orange-500/30 mt-16">
      {/* Live Safari Weather Widget */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Live Safari Weather</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(currentWeather.icon)}
                    <div>
                      <div className="text-2xl font-bold text-white">{currentWeather.temperature}°C</div>
                      <div className="text-orange-300 text-sm">{currentWeather.condition}</div>
                    </div>
                  </div>
                  <div className="text-white">
                    <div className="font-medium">{currentWeather.location}</div>
                    <div className="text-gray-300 text-sm flex items-center gap-4">
                      <span>💧 {currentWeather.humidity}%</span>
                      <span className="flex items-center gap-1">
                        <Wind className="h-3 w-3" />
                        {currentWeather.windSpeed} km/h
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400">
                Perfect Safari Weather
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts Section */}
        <Card className="bg-black/90 backdrop-blur-xl border border-red-500/30 mb-8">
          <CardContent className="p-6">
            <button
              onClick={() => toggleSection('emergency')}
              className="w-full flex items-center justify-between text-white hover:text-red-400 transition-colors"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-400" />
                Emergency Contacts
              </h3>
              {expandedSection === 'emergency' ? 
                <ChevronUp className="h-5 w-5" /> : 
                <ChevronDown className="h-5 w-5" />
              }
            </button>
            
            {expandedSection === 'emergency' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="bg-red-900/20 rounded-lg p-4 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <contact.icon className="h-4 w-4 text-red-400" />
                      <h4 className="text-white font-medium text-sm">{contact.title}</h4>
                    </div>
                    <div className="text-red-300 font-bold text-lg mb-1">{contact.number}</div>
                    <div className="text-gray-400 text-xs">{contact.description}</div>
                    <Button
                      size="sm"
                      className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => window.open(`tel:${contact.number}`, '_self')}
                    >
                      Call Now
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-300">
          {/* About Section */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Zimbabwe Wanderlust</h3>
            <p className="text-sm mb-4">
              Your AI-powered gateway to discovering the breathtaking beauty and rich culture of Zimbabwe through immersive experiences and cutting-edge technology.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-orange-400">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#victoria-falls" className="hover:text-orange-400 transition-colors">Victoria Falls</a></li>
              <li><a href="#hwange" className="hover:text-orange-400 transition-colors">Hwange National Park</a></li>
              <li><a href="#great-zimbabwe" className="hover:text-orange-400 transition-colors">Great Zimbabwe</a></li>
              <li><a href="#mana-pools" className="hover:text-orange-400 transition-colors">Mana Pools</a></li>
              <li><a href="#eastern-highlands" className="hover:text-orange-400 transition-colors">Eastern Highlands</a></li>
              <li><a href="#lake-kariba" className="hover:text-orange-400 transition-colors">Lake Kariba</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#ar-tours" className="hover:text-orange-400 transition-colors">AR Tours</a></li>
              <li><a href="#ai-concierge" className="hover:text-orange-400 transition-colors">AI Travel Concierge</a></li>
              <li><a href="#hotel-booking" className="hover:text-orange-400 transition-colors">Hotel Booking</a></li>
              <li><a href="#safari-packages" className="hover:text-orange-400 transition-colors">Safari Packages</a></li>
              <li><a href="#cultural-tours" className="hover:text-orange-400 transition-colors">Cultural Tours</a></li>
              <li><a href="#safety-toolkit" className="hover:text-orange-400 transition-colors">Safety Toolkit</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-orange-400" />
                <span>info@zimbabwewanderlust.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-orange-400" />
                <span>+263 4 793 701</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-orange-400" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Feeds Placeholder */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <button
            onClick={() => toggleSection('social')}
            className="w-full flex items-center justify-between text-white hover:text-orange-400 transition-colors mb-4"
          >
            <h3 className="text-lg font-semibold">Latest from Zimbabwe Tourism Authority</h3>
            {expandedSection === 'social' ? 
              <ChevronUp className="h-5 w-5" /> : 
              <ChevronDown className="h-5 w-5" />
            }
          </button>
          
          {expandedSection === 'social' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="text-blue-400 text-sm mb-2">@ZimbabweTourism</div>
                  <p className="text-gray-300 text-sm">Victoria Falls at sunset - nature's most spectacular light show! 🌅 #VisitZimbabwe</p>
                  <div className="text-gray-500 text-xs mt-2">2 hours ago</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="text-pink-400 text-sm mb-2">@ExplorZimbabwe</div>
                  <p className="text-gray-300 text-sm">Elephant families gathering at Hwange's waterholes. Perfect safari season! 🐘 #WildlifePhotography</p>
                  <div className="text-gray-500 text-xs mt-2">4 hours ago</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800/50 border-gray-600">
                <CardContent className="p-4">
                  <div className="text-red-400 text-sm mb-2">YouTube</div>
                  <p className="text-gray-300 text-sm">New documentary: "Discovering Great Zimbabwe" premieres this weekend! 🎬</p>
                  <div className="text-gray-500 text-xs mt-2">1 day ago</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            © 2024 Zimbabwe Wanderlust Guide. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
