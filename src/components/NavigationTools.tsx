
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Car, 
  Plane, 
  Download, 
  Navigation, 
  Fuel, 
  Phone, 
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Map
} from 'lucide-react';

interface Route {
  id: string;
  type: 'self-drive' | 'guided' | 'air';
  from: string;
  to: string;
  duration: string;
  distance?: string;
  price: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  description: string;
  highlights: string[];
  tips: string[];
  warnings?: string[];
}

interface POI {
  id: string;
  name: string;
  type: 'gate' | 'fuel' | 'medical' | 'lodge' | 'scenic';
  coordinates: [number, number];
  description: string;
  services: string[];
  openHours?: string;
}

const routes: Route[] = [
  {
    id: '1',
    type: 'self-drive',
    from: 'Harare',
    to: 'Victoria Falls',
    duration: '4.5 hours',
    distance: '440km',
    price: 0,
    difficulty: 'easy',
    description: 'Scenic route through rural Zimbabwe with good tar roads',
    highlights: ['Chinhoyi Caves stopover', 'Rural villages', 'Baobab trees'],
    tips: ['Fill up in Chinhoyi', 'Best lunch stop at Kariba Lodge', 'Avoid night driving'],
    warnings: ['Road work near Karoi']
  },
  {
    id: '2',
    type: 'guided',
    from: 'Harare Airport',
    to: 'Victoria Falls',
    duration: '6 hours',
    price: 180,
    difficulty: 'easy',
    description: 'Comfortable transfer with experienced driver and cultural commentary',
    highlights: ['Cultural commentary', 'Comfort stops', 'Wildlife spotting'],
    tips: ['Includes lunch stop', 'Air-conditioned vehicle', 'Pick-up from hotel'],
    warnings: []
  },
  {
    id: '3',
    type: 'air',
    from: 'Harare (HRE)',
    to: 'Victoria Falls (VFA)',
    duration: '1.5 hours',
    price: 320,
    difficulty: 'easy',
    description: 'Quick domestic flight with spectacular aerial views',
    highlights: ['Aerial views of Zambezi', 'No road travel', 'Fastest option'],
    tips: ['Book early for better prices', 'Weight restrictions apply', 'Daily flights available'],
    warnings: ['Weather dependent']
  }
];

const pois: POI[] = [
  {
    id: '1',
    name: 'Victoria Falls National Park Gate',
    type: 'gate',
    coordinates: [-17.9243, 25.8572],
    description: 'Main entrance to Victoria Falls National Park',
    services: ['Park permits', 'Guides', 'Information'],
    openHours: '6:00 AM - 6:00 PM'
  },
  {
    id: '2',
    name: 'Puma Energy Livingstone',
    type: 'fuel',
    coordinates: [-17.8419, 25.8561],
    description: 'Last major fuel stop before the falls',
    services: ['Fuel', 'Convenience store', 'ATM', 'Toilets'],
    openHours: '24 hours'
  },
  {
    id: '3',
    name: 'Victoria Falls Hospital',
    type: 'medical',
    coordinates: [-17.9311, 25.8206],
    description: 'Main medical facility in Victoria Falls',
    services: ['Emergency care', 'Pharmacy', 'Ambulance'],
    openHours: '24 hours emergency'
  },
  {
    id: '4',
    name: 'Victoria Falls Safari Lodge',
    type: 'lodge',
    coordinates: [-17.9156, 25.7394],
    description: 'Premium lodge with elephant viewing deck',
    services: ['Accommodation', 'Restaurant', 'Game viewing', 'Spa'],
    openHours: 'Check-in: 2:00 PM'
  },
  {
    id: '5',
    name: 'Sunset Point',
    type: 'scenic',
    coordinates: [-17.9244, 25.8533],
    description: 'Perfect viewpoint for sunset photography',
    services: ['Photography', 'Parking', 'Safety barriers'],
    openHours: 'Dawn to dusk'
  }
];

const NavigationTools = () => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [activeTab, setActiveTab] = useState<'routes' | 'map' | 'emergency'>('routes');

  const getRouteIcon = (type: string) => {
    switch (type) {
      case 'self-drive': return Car;
      case 'guided': return Users;
      case 'air': return Plane;
      default: return Navigation;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPOIIcon = (type: string) => {
    switch (type) {
      case 'gate': return MapPin;
      case 'fuel': return Fuel;
      case 'medical': return Phone;
      case 'lodge': return Users;
      case 'scenic': return Camera;
      default: return MapPin;
    }
  };

  const getPOIColor = (type: string) => {
    switch (type) {
      case 'gate': return 'bg-blue-500';
      case 'fuel': return 'bg-yellow-500';
      case 'medical': return 'bg-red-500';
      case 'lodge': return 'bg-green-500';
      case 'scenic': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Navigation & Travel Tools</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Multi-modal direction finder with local insights and safety information
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { id: 'routes', label: 'Routes & Transport', icon: Navigation },
          { id: 'map', label: 'Interactive Map', icon: Map },
          { id: 'emergency', label: 'Emergency Info', icon: Phone }
        ].map((tab) => {
          const TabIcon = tab.icon;
          return (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${activeTab === tab.id ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
            >
              <TabIcon className="h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Routes Tab */}
      {activeTab === 'routes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => {
              const RouteIcon = getRouteIcon(route.type);
              
              return (
                <Card 
                  key={route.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedRoute(route)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <RouteIcon className="h-6 w-6 text-orange-600" />
                        <div>
                          <h3 className="font-bold capitalize">{route.type.replace('-', ' ')}</h3>
                          <p className="text-sm text-gray-500">{route.from} → {route.to}</p>
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(route.difficulty)}>
                        {route.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{route.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{route.duration}</span>
                        </div>
                        {route.distance && (
                          <span className="text-gray-500">{route.distance}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">
                            {route.price === 0 ? 'Free' : `$${route.price}`}
                          </span>
                        </div>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Map Tab */}
      {activeTab === 'map' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Interactive Map</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
            
            {/* Map Placeholder with POI Legend */}
            <div className="relative bg-gray-100 rounded-lg h-96 mb-6 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <Map className="h-16 w-16 mx-auto mb-4" />
                <h4 className="text-lg font-semibold mb-2">Interactive Map View</h4>
                <p>Detailed map with POI markers coming soon...</p>
              </div>
            </div>
            
            {/* POI Legend */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <h4 className="col-span-full text-lg font-semibold mb-2">Points of Interest</h4>
              {pois.map((poi) => {
                const POIIcon = getPOIIcon(poi.type);
                
                return (
                  <Card key={poi.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getPOIColor(poi.type)}`}>
                        <POIIcon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-sm">{poi.name}</h5>
                        <p className="text-xs text-gray-600 mb-2">{poi.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {poi.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        {poi.openHours && (
                          <p className="text-xs text-green-600 mt-1">{poi.openHours}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Tab */}
      {activeTab === 'emergency' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                Emergency Contacts
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-semibold text-red-800">Emergency Services</h4>
                  <p className="text-red-700">Police: 995</p>
                  <p className="text-red-700">Fire: 993</p>
                  <p className="text-red-700">Ambulance: 994</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Tourist Police</h4>
                  <p className="text-blue-700">Victoria Falls: +263 13 44321</p>
                  <p className="text-blue-700">24/7 Tourist Hotline</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800">Medical Centers</h4>
                  <p className="text-green-700">Victoria Falls Hospital</p>
                  <p className="text-green-700">+263 13 44274</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Local Safety Tips
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800">Driving Tips</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Avoid night driving in rural areas</li>
                    <li>• Always carry extra water</li>
                    <li>• Keep fuel tank above half</li>
                    <li>• Download offline maps</li>
                  </ul>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800">Weather Warnings</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Rainy season: Nov - Mar</li>
                    <li>• Flash floods possible</li>
                    <li>• Some roads impassable</li>
                    <li>• Check conditions daily</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800">Wildlife Safety</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• Stay in vehicle during game drives</li>
                    <li>• Never feed animals</li>
                    <li>• Keep food sealed</li>
                    <li>• Follow guide instructions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Route Detail Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold capitalize">
                  {selectedRoute.type.replace('-', ' ')} Route
                </h2>
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Route Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>From:</span>
                        <span>{selectedRoute.from}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>To:</span>
                        <span>{selectedRoute.to}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{selectedRoute.duration}</span>
                      </div>
                      {selectedRoute.distance && (
                        <div className="flex justify-between">
                          <span>Distance:</span>
                          <span>{selectedRoute.distance}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Cost:</span>
                        <span className="font-semibold text-green-600">
                          {selectedRoute.price === 0 ? 'Free' : `$${selectedRoute.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Highlights</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedRoute.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></div>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Local Tips</h4>
                  <ul className="space-y-2">
                    {selectedRoute.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {selectedRoute.warnings && selectedRoute.warnings.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-red-700">Warnings</h4>
                    <ul className="space-y-2">
                      {selectedRoute.warnings.map((warning, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-red-700 bg-red-50 p-2 rounded">
                          <AlertTriangle className="h-4 w-4 mt-0.5" />
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    onClick={() => setSelectedRoute(null)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Route PDF
                  </Button>
                  {selectedRoute.type === 'guided' && (
                    <Button variant="outline" className="flex-1">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Get Quote
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NavigationTools;
