
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Menu, 
  X, 
  MapPin, 
  Phone,
  Globe,
  User,
  Heart,
  Calendar
} from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Hotels', href: '#hotels' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'AR Tours', href: '#ar-tours', badge: 'New' },
  { label: 'Safety', href: '#safety' }
];

const quickSearchSuggestions = [
  'Victoria Falls',
  'Hwange National Park',
  'Great Zimbabwe',
  'Mana Pools',
  'Eastern Highlands',
  'Lake Kariba'
];

const NavigationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = quickSearchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSearchBlur = () => {
    // Delay to allow click on suggestions
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setShowSuggestions(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-orange-500/30">
      {/* Zimbabwean flag accent bar */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-yellow-400 via-red-500 to-green-500"></div>
      
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Zimbabwe
            </div>
            <Badge className="bg-green-500/20 text-green-400 text-xs">
              Wanderlust
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-300 hover:text-orange-400 transition-colors relative group flex items-center gap-2"
              >
                {item.label}
                {item.badge && (
                  <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                    {item.badge}
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </a>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search destinations..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="pl-10 w-64 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-orange-500"
              />
            </div>

            {/* Search Suggestions */}
            {showSuggestions && (searchValue.length > 0 || true) && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-10">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-orange-400 transition-colors flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      {suggestion}
                    </button>
                  ))
                ) : searchValue.length > 0 ? (
                  <div className="px-4 py-2 text-gray-500">No destinations found</div>
                ) : (
                  <div className="px-4 py-2 text-gray-500">Popular destinations</div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20">
              <User className="h-4 w-4 mr-1" />
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search destinations..."
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-gray-300 hover:text-orange-400 transition-colors flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  {item.badge && (
                    <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1 border-orange-500/30 text-orange-400">
                Sign In
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                Book Now
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavigationHeader;
