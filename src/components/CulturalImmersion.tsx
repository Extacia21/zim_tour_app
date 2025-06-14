
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  Calendar, 
  Camera, 
  Gift, 
  Heart,
  Play,
  Pause,
  RotateCcw,
  Moon,
  Sun,
  Users,
  MapPin
} from 'lucide-react';

interface Phrase {
  id: string;
  english: string;
  shona: string;
  pronunciation: string;
  category: 'greetings' | 'courtesy' | 'travel' | 'emergency';
  audioUrl?: string;
}

interface EtiquetteRule {
  id: string;
  category: 'photography' | 'gifts' | 'sacred-sites' | 'general';
  title: string;
  dos: string[];
  donts: string[];
  explanation: string;
}

interface CulturalEvent {
  id: string;
  name: string;
  type: 'festival' | 'ceremony' | 'market';
  date: string;
  location: string;
  description: string;
  significance: string;
  whenToVisit: string;
  lunarBased: boolean;
}

const phrases: Phrase[] = [
  {
    id: '1',
    english: 'Hello / Good morning',
    shona: 'Mangwanani',
    pronunciation: 'mahn-gwah-NAH-nee',
    category: 'greetings'
  },
  {
    id: '2',
    english: 'How are you?',
    shona: 'Makadii?',
    pronunciation: 'mah-kah-DEE',
    category: 'greetings'
  },
  {
    id: '3',
    english: 'Thank you',
    shona: 'Ndatenda',
    pronunciation: 'ndah-TEN-dah',
    category: 'courtesy'
  },
  {
    id: '4',
    english: 'Please',
    shona: 'Ndapota',
    pronunciation: 'ndah-POH-tah',
    category: 'courtesy'
  },
  {
    id: '5',
    english: 'Excuse me',
    shona: 'Pamusoroi',
    pronunciation: 'pah-moo-soh-ROH-ee',
    category: 'courtesy'
  },
  {
    id: '6',
    english: 'Where is...?',
    shona: 'Kuripiko...?',
    pronunciation: 'koo-ree-PEE-koh',
    category: 'travel'
  },
  {
    id: '7',
    english: 'How much?',
    shona: 'Marii?',
    pronunciation: 'mah-REE',
    category: 'travel'
  },
  {
    id: '8',
    english: 'Help me',
    shona: 'Ndibatsirei',
    pronunciation: 'ndee-baht-see-REH-ee',
    category: 'emergency'
  }
];

const etiquetteRules: EtiquetteRule[] = [
  {
    id: '1',
    category: 'photography',
    title: 'Photography Guidelines',
    dos: [
      'Ask permission before photographing people',
      'Respect "no photography" signs',
      'Offer to share photos with locals',
      'Learn basic phrases before asking'
    ],
    donts: [
      'Photograph without permission',
      'Take photos during ceremonies without consent',
      'Use flash in sacred spaces',
      'Photograph military or government buildings'
    ],
    explanation: 'Photography is generally welcomed, but respect and permission are paramount in Zimbabwean culture.'
  },
  {
    id: '2',
    category: 'gifts',
    title: 'Gift-Giving Customs',
    dos: [
      'Bring gifts for village chief if visiting',
      'Offer gifts with both hands',
      'Choose practical items (soap, tea, sugar)',
      'Present gifts before asking for anything'
    ],
    donts: [
      'Give expensive gifts that create obligation',
      'Hand gifts with left hand only',
      'Expect immediate reciprocation',
      'Give alcohol without understanding local customs'
    ],
    explanation: 'Gift-giving strengthens relationships and shows respect for community hierarchy.'
  },
  {
    id: '3',
    category: 'sacred-sites',
    title: 'Sacred Site Protocols',
    dos: [
      'Remove shoes when asked',
      'Follow guide instructions exactly',
      'Maintain quiet, respectful demeanor',
      'Ask about specific taboos before entering'
    ],
    donts: [
      'Touch ancient rock art',
      'Make loud noises or play music',
      'Bring food into sacred caves',
      'Visit during prohibited times or ceremonies'
    ],
    explanation: 'Sacred sites connect communities to ancestors and require utmost respect and proper protocol.'
  }
];

const culturalEvents: CulturalEvent[] = [
  {
    id: '1',
    name: 'Kurova Guva Ceremony',
    type: 'ceremony',
    date: 'Year-round (family dependent)',
    location: 'Rural communities',
    description: 'Traditional ceremony to bring ancestors home',
    significance: 'Spiritual connection between living and deceased family members',
    whenToVisit: 'Only by invitation - very sacred',
    lunarBased: true
  },
  {
    id: '2',
    name: 'Mukwerera Festival',
    type: 'festival',
    date: 'August annually',
    location: 'Domboshava',
    description: 'Traditional music and dance celebration',
    significance: 'Celebrates Shona culture and traditional arts',
    whenToVisit: 'Open to respectful visitors',
    lunarBased: false
  },
  {
    id: '3',
    name: 'Mbare Musika',
    type: 'market',
    date: 'Daily',
    location: 'Harare',
    description: 'Largest traditional market in Zimbabwe',
    significance: 'Cultural and economic hub for traditional goods',
    whenToVisit: 'Best in morning hours',
    lunarBased: false
  },
  {
    id: '4',
    name: 'Rain Ceremony (Mukwerera)',
    type: 'ceremony',
    date: 'October-November',
    location: 'Various sacred sites',
    description: 'Traditional ceremony to ask ancestors for rain',
    significance: 'Agricultural and spiritual importance',
    whenToVisit: 'Sacred - observation only with permission',
    lunarBased: true
  }
];

const CulturalImmersion = () => {
  const [activeTab, setActiveTab] = useState<'language' | 'etiquette' | 'events'>('language');
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPhrases = phrases.filter(phrase => 
    selectedCategory === 'all' || phrase.category === selectedCategory
  );

  const playPronunciation = (phrase: Phrase) => {
    // Simulate audio playback
    setPlayingAudio(phrase.id);
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'greetings': return 'bg-blue-100 text-blue-800';
      case 'courtesy': return 'bg-green-100 text-green-800';
      case 'travel': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEtiquetteIcon = (category: string) => {
    switch (category) {
      case 'photography': return Camera;
      case 'gifts': return Gift;
      case 'sacred-sites': return Heart;
      default: return Users;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'festival': return Users;
      case 'ceremony': return Heart;
      case 'market': return MapPin;
      default: return Calendar;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Cultural Immersion Guide</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Prepare for authentic cultural experiences with language guides, etiquette tips, and event calendars
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { id: 'language', label: 'Language Guide', icon: Volume2 },
          { id: 'etiquette', label: 'Cultural Etiquette', icon: Users },
          { id: 'events', label: 'Events Calendar', icon: Calendar }
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

      {/* Language Guide Tab */}
      {activeTab === 'language' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex justify-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Phrases' },
              { id: 'greetings', label: 'Greetings' },
              { id: 'courtesy', label: 'Courtesy' },
              { id: 'travel', label: 'Travel' },
              { id: 'emergency', label: 'Emergency' }
            ].map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                className={selectedCategory === category.id ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Phrases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPhrases.map((phrase) => (
              <Card 
                key={phrase.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedPhrase(phrase)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={getCategoryColor(phrase.category)}>
                      {phrase.category}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        playPronunciation(phrase);
                      }}
                      className="h-8 w-8 p-0"
                    >
                      {playingAudio === phrase.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900">{phrase.english}</p>
                    <p className="text-lg text-orange-600 font-bold">{phrase.shona}</p>
                    <p className="text-sm text-gray-600 italic">{phrase.pronunciation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Audio Learning Section */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio Pronunciation Guide
              </h3>
              <p className="text-gray-600 mb-4">
                Click the speaker icon on any phrase to hear native pronunciation. Practice makes perfect!
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Play All Greetings
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Repeat Last Phrase
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cultural Etiquette Tab */}
      {activeTab === 'etiquette' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {etiquetteRules.map((rule) => {
            const EtiquetteIcon = getEtiquetteIcon(rule.category);
            
            return (
              <Card key={rule.id} className="h-fit">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <EtiquetteIcon className="h-6 w-6 text-orange-600" />
                    <h3 className="text-xl font-bold">{rule.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{rule.explanation}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                        ✓ Do's
                      </h4>
                      <ul className="space-y-2">
                        {rule.dos.map((item, index) => (
                          <li key={index} className="text-sm text-green-700 bg-green-50 p-2 rounded">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                        ✗ Don'ts
                      </h4>
                      <ul className="space-y-2">
                        {rule.donts.map((item, index) => (
                          <li key={index} className="text-sm text-red-700 bg-red-50 p-2 rounded">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Events Calendar Tab */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Cultural Events & Festivals</h3>
            <p className="text-gray-600">Experience authentic Zimbabwean culture through traditional events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {culturalEvents.map((event) => {
              const EventIcon = getEventIcon(event.type);
              
              return (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <EventIcon className="h-6 w-6 text-orange-600" />
                        <div>
                          <h3 className="font-bold text-lg">{event.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{event.type}</p>
                        </div>
                      </div>
                      {event.lunarBased && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Moon className="h-3 w-3 mr-1" />
                          Lunar-based
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{event.location}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm">{event.description}</p>
                      
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 text-sm mb-1">Cultural Significance</h4>
                        <p className="text-orange-700 text-sm">{event.significance}</p>
                      </div>
                      
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 text-sm mb-1">Visitor Information</h4>
                        <p className="text-blue-700 text-sm">{event.whenToVisit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Phrase Detail Modal */}
      {selectedPhrase && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Pronunciation Practice</h2>
                <button
                  onClick={() => setSelectedPhrase(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="text-center space-y-4">
                <Badge className={getCategoryColor(selectedPhrase.category)}>
                  {selectedPhrase.category}
                </Badge>
                
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">{selectedPhrase.english}</p>
                  <p className="text-2xl text-orange-600 font-bold mb-2">{selectedPhrase.shona}</p>
                  <p className="text-gray-600 italic">{selectedPhrase.pronunciation}</p>
                </div>
                
                <div className="flex gap-3 justify-center pt-4">
                  <Button
                    onClick={() => playPronunciation(selectedPhrase)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    {playingAudio === selectedPhrase.id ? 'Playing...' : 'Listen'}
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Repeat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CulturalImmersion;
