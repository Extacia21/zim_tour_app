
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Eye, 
  Star,
  Info,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface WildlifeSpecies {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  habitat: string;
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR';
  bestViewingTime: string;
  bestLocations: string[];
  behavior: string;
  folklore: string;
  recentSightings: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  funFact: string;
}

const wildlifeSpecies: WildlifeSpecies[] = [
  {
    id: 'elephant',
    name: 'African Elephant',
    scientificName: 'Loxodonta africana',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop',
    habitat: 'Savanna, grasslands, forests',
    conservationStatus: 'EN',
    bestViewingTime: 'Early morning and late afternoon',
    bestLocations: ['Hwange National Park', 'Mana Pools', 'Chobe border'],
    behavior: 'Highly social animals living in family herds led by matriarch',
    folklore: 'Shona tradition believes elephants carry the wisdom of ancestors',
    recentSightings: 1247,
    difficulty: 1,
    funFact: 'Can consume up to 300kg of vegetation daily'
  },
  {
    id: 'lion',
    name: 'African Lion',
    scientificName: 'Panthera leo',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
    habitat: 'Grasslands, savannas, woodland',
    conservationStatus: 'VU',
    bestViewingTime: 'Dawn and dusk hunting periods',
    bestLocations: ['Hwange National Park', 'Matobo Hills', 'Zambezi Valley'],
    behavior: 'Live in prides of 10-15 individuals with complex social structure',
    folklore: 'Known as "Shumba" - symbol of strength and leadership in Shona culture',
    recentSightings: 342,
    difficulty: 3,
    funFact: 'A lion\'s roar can be heard up to 8 kilometers away'
  },
  {
    id: 'rhino',
    name: 'Black Rhinoceros',
    scientificName: 'Diceros bicornis',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop',
    habitat: 'Thick bush, woodland edges',
    conservationStatus: 'CR',
    bestViewingTime: 'Early morning before heat',
    bestLocations: ['Matobo Hills', 'Bubye Valley Conservancy'],
    behavior: 'Solitary and territorial, excellent hearing and smell',
    folklore: 'Considered sacred by local communities as guardians of ancient wisdom',
    recentSightings: 23,
    difficulty: 5,
    funFact: 'Horn is made of keratin, same material as human fingernails'
  },
  {
    id: 'leopard',
    name: 'African Leopard',
    scientificName: 'Panthera pardus',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    habitat: 'Rocky areas, woodland, riverine forests',
    conservationStatus: 'VU',
    bestViewingTime: 'Night drives and early morning',
    bestLocations: ['Matobo Hills', 'Eastern Highlands', 'Mana Pools'],
    behavior: 'Solitary, excellent climbers, often rest in trees during day',
    folklore: 'Symbol of stealth and cunning in traditional Zimbabwean stories',
    recentSightings: 89,
    difficulty: 4,
    funFact: 'Can leap horizontally up to 6 meters and vertically up to 3 meters'
  },
  {
    id: 'buffalo',
    name: 'Cape Buffalo',
    scientificName: 'Syncerus caffer',
    image: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
    habitat: 'Grasslands near water sources',
    conservationStatus: 'LC',
    bestViewingTime: 'Morning and evening near water',
    bestLocations: ['Hwange National Park', 'Mana Pools', 'Chizarira'],
    behavior: 'Form large herds, very protective of young and injured',
    folklore: 'Represents determination and resilience in local traditions',
    recentSightings: 856,
    difficulty: 2,
    funFact: 'Adult bulls can weigh up to 900kg and are considered one of Africa\'s "Big Five"'
  },
  {
    id: 'wild-dog',
    name: 'African Wild Dog',
    scientificName: 'Lycaon pictus',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
    habitat: 'Open savannas, semi-desert regions',
    conservationStatus: 'EN',
    bestViewingTime: 'Early morning pack hunts',
    bestLocations: ['Hwange National Park', 'Mana Pools'],
    behavior: 'Highly social pack hunters with 80% hunting success rate',
    folklore: 'Known as "Mhumhi" - respected for their teamwork and loyalty',
    recentSightings: 67,
    difficulty: 4,
    funFact: 'Each individual has unique coat patterns like human fingerprints'
  }
];

const WildlifePage = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<WildlifeSpecies | null>(null);
  const [showFolklore, setShowFolklore] = useState<{ [key: string]: boolean }>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LC': return 'bg-green-500';
      case 'NT': return 'bg-yellow-500';
      case 'VU': return 'bg-orange-500';
      case 'EN': return 'bg-red-500';
      case 'CR': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'LC': return 'Least Concern';
      case 'NT': return 'Near Threatened';
      case 'VU': return 'Vulnerable';
      case 'EN': return 'Endangered';
      case 'CR': return 'Critically Endangered';
      default: return 'Unknown';
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < difficulty ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`} 
      />
    ));
  };

  const toggleFolklore = (speciesId: string) => {
    setShowFolklore(prev => ({
      ...prev,
      [speciesId]: !prev[speciesId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Zimbabwe Wildlife Guide</h1>
            <Button onClick={() => window.history.back()}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Wildlife Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wildlifeSpecies.map((species) => (
            <Card key={species.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={species.image}
                  alt={species.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getStatusColor(species.conservationStatus)}>
                    {getStatusText(species.conservationStatus)}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold">{species.recentSightings}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-1">{species.name}</h3>
                <p className="text-sm text-gray-500 italic mb-3">{species.scientificName}</p>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Viewing Difficulty</div>
                    <div className="flex gap-1 mt-1">
                      {getDifficultyStars(species.difficulty)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Best Time</div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      {species.bestViewingTime}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Recent Sightings (30 days)</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      {species.recentSightings} reports
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-1">Best Locations</div>
                    <div className="flex flex-wrap gap-1">
                      {species.bestLocations.slice(0, 2).map((location) => (
                        <Badge key={location} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => toggleFolklore(species.id)}
                      className="flex-1"
                    >
                      <Info className="h-4 w-4 mr-1" />
                      {showFolklore[species.id] ? 'Hide' : 'Show'} Folklore
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedSpecies(species)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      Full Profile
                    </Button>
                  </div>
                  
                  {showFolklore[species.id] && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border">
                      <div className="text-sm font-medium text-amber-800 mb-1">Traditional Belief</div>
                      <p className="text-sm text-amber-700">{species.folklore}</p>
                    </div>
                  )}
                  
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 mb-1">Fun Fact</div>
                    <p className="text-sm text-blue-700">{species.funFact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Species Detail Modal */}
      {selectedSpecies && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedSpecies.name}</h3>
                <Button
                  onClick={() => setSelectedSpecies(null)}
                  variant="outline"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
              
              <img
                src={selectedSpecies.image}
                alt={selectedSpecies.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Scientific Name:</strong> {selectedSpecies.scientificName}</div>
                    <div><strong>Habitat:</strong> {selectedSpecies.habitat}</div>
                    <div><strong>Conservation Status:</strong> 
                      <Badge className={`ml-2 ${getStatusColor(selectedSpecies.conservationStatus)}`}>
                        {getStatusText(selectedSpecies.conservationStatus)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Viewing Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Best Time:</strong> {selectedSpecies.bestViewingTime}</div>
                    <div><strong>Difficulty:</strong> 
                      <div className="flex gap-1 mt-1">
                        {getDifficultyStars(selectedSpecies.difficulty)}
                      </div>
                    </div>
                    <div><strong>Recent Sightings:</strong> {selectedSpecies.recentSightings}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Behavior</h4>
                <p className="text-sm text-gray-600">{selectedSpecies.behavior}</p>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Best Viewing Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecies.bestLocations.map((location) => (
                    <Badge key={location} variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WildlifePage;
