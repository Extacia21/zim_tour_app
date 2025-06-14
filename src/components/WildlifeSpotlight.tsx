
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  MapPin, 
  Clock, 
  AlertCircle, 
  Users,
  Camera,
  Volume2,
  Star
} from 'lucide-react';

interface Animal {
  id: string;
  name: string;
  scientificName: string;
  category: 'big5' | 'endangered' | 'common';
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  image: string;
  description: string;
  behavior: string[];
  bestLocations: string[];
  bestTime: string;
  folklore: string;
  facts: string[];
  recentSightings: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

const animals: Animal[] = [
  {
    id: '1',
    name: 'African Elephant',
    scientificName: 'Loxodonta africana',
    category: 'big5',
    conservationStatus: 'EN',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=400&h=300&fit=crop',
    description: 'The largest land mammal, these gentle giants are the architects of the African landscape.',
    behavior: ['Social herds led by matriarch', 'Communicate through infrasound', 'Daily water visits'],
    bestLocations: ['Hwange National Park', 'Mana Pools', 'Chobe Border'],
    bestTime: 'Dry season (May - October) at waterholes',
    folklore: 'Shona believe elephants carry the spirits of ancestral chiefs',
    facts: ['Can drink 300L water daily', 'Pregnancy lasts 22 months', 'Live 60-80 years'],
    recentSightings: 47,
    difficulty: 1
  },
  {
    id: '2',
    name: 'African Lion',
    scientificName: 'Panthera leo',
    category: 'big5',
    conservationStatus: 'VU',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    description: 'The king of beasts, these apex predators live in complex social structures.',
    behavior: ['Hunt in coordinated groups', 'Active during dawn and dusk', 'Territorial roaring'],
    bestLocations: ['Hwange National Park', 'Matobo Hills', 'Gonarezhou'],
    bestTime: 'Early morning and late afternoon',
    folklore: 'Lions represent courage and leadership in Shona culture',
    facts: ['Roar can be heard 8km away', 'Sleep 20 hours daily', 'Females do most hunting'],
    recentSightings: 23,
    difficulty: 3
  },
  {
    id: '3',
    name: 'Black Rhinoceros',
    scientificName: 'Diceros bicornis',
    category: 'endangered',
    conservationStatus: 'CR',
    image: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop',
    description: 'Critically endangered browsers with excellent hearing and smell but poor eyesight.',
    behavior: ['Solitary except mothers with calves', 'Browsers not grazers', 'Charge when threatened'],
    bestLocations: ['Matobo Hills', 'Lowveld Conservancies'],
    bestTime: 'Early morning near water sources',
    folklore: 'Rhino horn powder believed to have medicinal properties (myth)',
    facts: ['Horn made of keratin', 'Can run 55km/h', 'Live 35-40 years'],
    recentSightings: 3,
    difficulty: 5
  },
  {
    id: '4',
    name: 'African Leopard',
    scientificName: 'Panthera pardus',
    category: 'big5',
    conservationStatus: 'NT',
    image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=400&h=300&fit=crop',
    description: 'The most elusive of the big cats, perfectly adapted for stealth and climbing.',
    behavior: ['Solitary and nocturnal', 'Hoist prey into trees', 'Excellent swimmers'],
    bestLocations: ['Matobo Hills rocky areas', 'Mana Pools riverine forest'],
    bestTime: 'Night drives and early morning',
    folklore: 'Leopard spots represent the stars in Shona mythology',
    facts: ['Can carry 3x body weight up trees', 'Strongest big cat', 'Live 15-20 years'],
    recentSightings: 8,
    difficulty: 4
  },
  {
    id: '5',
    name: 'Cape Buffalo',
    scientificName: 'Syncerus caffer',
    category: 'big5',
    conservationStatus: 'LC',
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop',
    description: 'Known as "Black Death" by hunters, these are Africa\'s most dangerous animals.',
    behavior: ['Large herds in wet season', 'Protective of young', 'Wallow in mud daily'],
    bestLocations: ['Hwange waterholes', 'Mana Pools floodplains'],
    bestTime: 'Morning and evening at water',
    folklore: 'Buffalo horns used in traditional ceremonies',
    facts: ['Never fully domesticated', 'Can weigh 900kg', 'Excellent memory'],
    recentSightings: 34,
    difficulty: 2
  },
  {
    id: '6',
    name: 'Wild Dog',
    scientificName: 'Lycaon pictus',
    category: 'endangered',
    conservationStatus: 'EN',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
    description: 'Africa\'s most efficient predator with unique painted coat patterns.',
    behavior: ['Pack hunters with 80% success rate', 'Social hierarchy', 'Regurgitate food for pups'],
    bestLocations: ['Hwange National Park', 'Mana Pools'],
    bestTime: 'Early morning hunting time',
    folklore: 'Painted patterns believed to confuse evil spirits',
    facts: ['Only 7000 left in wild', 'No two have same markings', 'Can run 60km/h'],
    recentSightings: 12,
    difficulty: 4
  }
];

const WildlifeSpotlight = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'big5' | 'endangered' | 'common'>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showMyths, setShowMyths] = useState(false);

  const filteredAnimals = animals.filter(animal => 
    selectedCategory === 'all' || animal.category === selectedCategory
  );

  const getConservationColor = (status: string) => {
    switch (status) {
      case 'LC': return 'bg-green-100 text-green-800';
      case 'NT': return 'bg-yellow-100 text-yellow-800';
      case 'VU': return 'bg-orange-100 text-orange-800';
      case 'EN': return 'bg-red-100 text-red-800';
      case 'CR': return 'bg-red-600 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConservationText = (status: string) => {
    const statuses = {
      'LC': 'Least Concern',
      'NT': 'Near Threatened',
      'VU': 'Vulnerable',
      'EN': 'Endangered',
      'CR': 'Critically Endangered'
    };
    return statuses[status as keyof typeof statuses];
  };

  const getDifficultyText = (difficulty: number) => {
    const levels = ['', 'Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Rare'];
    return levels[difficulty];
  };

  const getSightingIntensity = (sightings: number) => {
    if (sightings > 30) return 'high';
    if (sightings > 15) return 'medium';
    if (sightings > 5) return 'low';
    return 'rare';
  };

  const getSightingColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-orange-500';
      case 'rare': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Wildlife Spotlight</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover Zimbabwe's incredible wildlife with expert insights and real-time sighting data
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { id: 'all', label: 'All Animals' },
          { id: 'big5', label: 'Big 5' },
          { id: 'endangered', label: 'Endangered' },
          { id: 'common', label: 'Common' }
        ].map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={selectedCategory === category.id ? 'bg-orange-600 hover:bg-orange-700' : ''}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimals.map((animal) => {
          const sightingIntensity = getSightingIntensity(animal.recentSightings);
          
          return (
            <Card 
              key={animal.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedAnimal(animal)}
            >
              <div className="relative">
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className={animal.category === 'big5' ? 'bg-gold-600' : animal.category === 'endangered' ? 'bg-red-600' : 'bg-green-600'}>
                    {animal.category === 'big5' ? 'Big 5' : animal.category}
                  </Badge>
                </div>
                
                {/* Sighting Heatmap */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getSightingColor(sightingIntensity)} animate-pulse`}></div>
                  <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                    {animal.recentSightings} sightings
                  </span>
                </div>
                
                {/* Conservation Status */}
                <div className="absolute bottom-3 left-3">
                  <Badge className={getConservationColor(animal.conservationStatus)}>
                    {getConservationText(animal.conservationStatus)}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{animal.name}</h3>
                <p className="text-sm text-gray-500 italic mb-3">{animal.scientificName}</p>
                <p className="text-gray-600 text-sm mb-4">{animal.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-orange-600" />
                      <span>Difficulty: {getDifficultyText(animal.difficulty)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">30 days</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{animal.bestLocations[0]}</span>
                  </div>
                  
                  <Button 
                    size="sm"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Animal Detail Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={selectedAnimal.image}
                  alt={selectedAnimal.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedAnimal(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                >
                  ×
                </button>
                
                {/* Live Sighting Data */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getSightingColor(getSightingIntensity(selectedAnimal.recentSightings))} animate-pulse`}></div>
                    <span className="text-sm font-semibold">Live Sighting Data</span>
                  </div>
                  <p className="text-xs">{selectedAnimal.recentSightings} reports in last 30 days</p>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedAnimal.name}</h2>
                    <p className="text-gray-500 italic">{selectedAnimal.scientificName}</p>
                  </div>
                  <Badge className={getConservationColor(selectedAnimal.conservationStatus)}>
                    {getConservationText(selectedAnimal.conservationStatus)}
                  </Badge>
                </div>
                
                <p className="text-gray-600 leading-relaxed">{selectedAnimal.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Behavior Patterns
                    </h4>
                    <ul className="space-y-2">
                      {selectedAnimal.behavior.map((behavior, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2"></div>
                          {behavior}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Best Viewing Locations
                    </h4>
                    <ul className="space-y-2">
                      {selectedAnimal.bestLocations.map((location, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {location}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="font-medium">Best Time:</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{selectedAnimal.bestTime}</p>
                    </div>
                  </div>
                </div>
                
                {/* Myth vs Fact Toggle */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Cultural & Scientific Insights</h4>
                    <Button
                      onClick={() => setShowMyths(!showMyths)}
                      variant="outline"
                      size="sm"
                    >
                      {showMyths ? 'Show Facts' : 'Show Folklore'}
                    </Button>
                  </div>
                  
                  {showMyths ? (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h5 className="font-medium text-purple-800 mb-2">Shona Folklore</h5>
                      <p className="text-sm text-purple-700">{selectedAnimal.folklore}</p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium text-blue-800 mb-2">Scientific Facts</h5>
                      <ul className="space-y-1">
                        {selectedAnimal.facts.map((fact, index) => (
                          <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
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

export default WildlifeSpotlight;
