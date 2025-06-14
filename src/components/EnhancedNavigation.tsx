
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { 
  MapPin, 
  Camera, 
  Binoculars, 
  Mountain, 
  TreePine, 
  Compass,
  Phone,
  Menu,
  X
} from 'lucide-react';

const destinations = [
  { name: 'Victoria Falls', slug: 'victoria-falls', icon: Mountain },
  { name: 'Hwange National Park', slug: 'hwange', icon: Binoculars },
  { name: 'Great Zimbabwe', slug: 'great-zimbabwe', icon: Camera },
  { name: 'Mana Pools', slug: 'mana-pools', icon: TreePine },
  { name: 'Eastern Highlands', slug: 'eastern-highlands', icon: Mountain },
  { name: 'Matobo Hills', slug: 'matobo', icon: Compass }
];

const EnhancedNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-orange-200 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Zimbabwe Wanderlust
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    Destinations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {destinations.map((destination) => {
                        const IconComponent = destination.icon;
                        return (
                          <Link
                            key={destination.slug}
                            to={`/destination/${destination.slug}`}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600"
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <div className="text-sm font-medium leading-none">
                                {destination.name}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-700 hover:text-orange-600">
                    <Binoculars className="h-4 w-4 mr-2" />
                    Experiences
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1">
                      <Link
                        to="/wildlife"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600"
                      >
                        <div className="text-sm font-medium leading-none">Wildlife Safari</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Discover Zimbabwe's incredible wildlife and conservation efforts
                        </p>
                      </Link>
                      <Link
                        to="/hotels/all"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600"
                      >
                        <div className="text-sm font-medium leading-none">Luxury Lodges</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Premium accommodations in stunning locations
                        </p>
                      </Link>
                      <Link
                        to="/activities/all"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600"
                      >
                        <div className="text-sm font-medium leading-none">Adventure Activities</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Thrilling adventures and cultural experiences
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              to="/wildlife" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${
                isActive('/wildlife') ? 'text-orange-600 font-medium' : ''
              }`}
            >
              Wildlife
            </Link>
            <Link 
              to="/hotels/all" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${
                isActive('/hotels/all') ? 'text-orange-600 font-medium' : ''
              }`}
            >
              Hotels
            </Link>
            <Link 
              to="/activities/all" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${
                isActive('/activities/all') ? 'text-orange-600 font-medium' : ''
              }`}
            >
              Activities
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              <Phone className="h-4 w-4 mr-2" />
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-orange-200 py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Destinations</h3>
                <div className="grid grid-cols-2 gap-2">
                  {destinations.map((destination) => {
                    const IconComponent = destination.icon;
                    return (
                      <Link
                        key={destination.slug}
                        to={`/destination/${destination.slug}`}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-orange-50 text-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <IconComponent className="h-4 w-4" />
                        {destination.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  to="/wildlife"
                  className="block p-2 rounded-md hover:bg-orange-50 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Wildlife Safari
                </Link>
                <Link
                  to="/hotels/all"
                  className="block p-2 rounded-md hover:bg-orange-50 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hotels & Lodges
                </Link>
                <Link
                  to="/activities/all"
                  className="block p-2 rounded-md hover:bg-orange-50 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Activities
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default EnhancedNavigation;
