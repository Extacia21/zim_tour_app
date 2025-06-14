import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  BookOpen,
  Utensils,
  MapPin,
  Star,
  Users,
  Trophy,
  ChefHat
} from 'lucide-react';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  speakers: string;
  region: string;
  flag: string;
}

interface Phrase {
  english: string;
  shona: string;
  ndebele: string;
  pronunciation: string;
  context: string;
  audioUrl?: string;
}

interface Dish {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  region: string;
  image: string;
  preparationTime: string;
  culturalSignificance: string;
  whereToFind: string[];
}

const languages: Language[] = [
  {
    id: 'shona',
    name: 'Shona',
    nativeName: 'chiShona',
    speakers: '10.8 million',
    region: 'Eastern & Central Zimbabwe',
    flag: '🇿🇼'
  },
  {
    id: 'ndebele',
    name: 'Ndebele',
    nativeName: 'isiNdebele',
    speakers: '1.6 million',
    region: 'Western Zimbabwe',
    flag: '🇿🇼'
  }
];

const essentialPhrases: Phrase[] = [
  {
    english: 'Hello',
    shona: 'Mhoro',
    ndebele: 'Sawubona',
    pronunciation: 'Mho-ro / Sa-wu-bo-na',
    context: 'General greeting, used any time of day'
  },
  {
    english: 'How are you?',
    shona: 'Makadii?',
    ndebele: 'Unjani?',
    pronunciation: 'Ma-ka-dee / Un-ja-ni',
    context: 'Asking about someone\'s wellbeing'
  },
  {
    english: 'Thank you',
    shona: 'Maita basa',
    ndebele: 'Ngiyabonga',
    pronunciation: 'Mai-ta ba-sa / Ngi-ya-bo-nga',
    context: 'Expressing gratitude'
  },
  {
    english: 'Please',
    shona: 'Ndapota',
    ndebele: 'Ngiyacela',
    pronunciation: 'Nda-po-ta / Ngi-ya-ce-la',
    context: 'Making a polite request'
  },
  {
    english: 'Excuse me',
    shona: 'Pamusoroi',
    ndebele: 'Uxolo',
    pronunciation: 'Pa-mu-so-roi / U-xo-lo',
    context: 'Getting attention or apologizing'
  },
  {
    english: 'Where is...?',
    shona: 'Kuripi...?',
    ndebele: 'Kuphi...?',
    pronunciation: 'Ku-ri-pi / Ku-phi',
    context: 'Asking for directions'
  },
  {
    english: 'How much?',
    shona: 'Zvakawanda sei?',
    ndebele: 'Malini?',
    pronunciation: 'Zva-ka-wan-da sei / Ma-li-ni',
    context: 'Asking about price'
  },
  {
    english: 'I don\'t understand',
    shona: 'Handisi kunzwisisa',
    ndebele: 'Angiqondi',
    pronunciation: 'Han-di-si kun-zwi-si-sa / An-gi-qo-ndi',
    context: 'When you need clarification'
  }
];

const traditionalDishes: Dish[] = [
  {
    id: 'sadza',
    name: 'Sadza',
    description: 'Zimbabwe\'s staple food made from maize meal, similar to polenta',
    ingredients: ['Maize meal', 'Water', 'Salt'],
    difficulty: 'Easy',
    region: 'Nationwide',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop',
    preparationTime: '30 minutes',
    culturalSignificance: 'The foundation of every Zimbabwean meal, often eaten with hands',
    whereToFind: ['Local restaurants', 'Street vendors', 'Hotel buffets']
  },
  {
    id: 'bota',
    name: 'Bota',
    description: 'Traditional porridge made from various grains, often served for breakfast',
    ingredients: ['Sorghum', 'Millet', 'Maize', 'Water'],
    difficulty: 'Medium',
    region: 'Rural areas',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    preparationTime: '45 minutes',
    culturalSignificance: 'Traditional breakfast that connects to ancestral cooking methods',
    whereToFind: ['Rural lodges', 'Cultural villages', 'Traditional restaurants']
  },
  {
    id: 'mufushwa',
    name: 'Mufushwa',
    description: 'Dried vegetables (usually pumpkin leaves) prepared as a traditional side dish',
    ingredients: ['Dried pumpkin leaves', 'Groundnuts', 'Onions', 'Tomatoes'],
    difficulty: 'Medium',
    region: 'Eastern Zimbabwe',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    preparationTime: '1 hour',
    culturalSignificance: 'Represents indigenous knowledge of food preservation',
    whereToFind: ['Traditional restaurants', 'Cultural centers', 'Village experiences']
  },
  {
    id: 'matemba',
    name: 'Matemba',
    description: 'Small dried fish, often served as a protein source with sadza',
    ingredients: ['Small dried fish', 'Tomatoes', 'Onions', 'Cooking oil'],
    difficulty: 'Easy',
    region: 'Lake Kariba area',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    preparationTime: '20 minutes',
    culturalSignificance: 'Important protein source in fishing communities',
    whereToFind: ['Kariba lodges', 'Local markets', 'Fishing villages']
  }
];

const CulturalPreparation = () => {
  const [activeTab, setActiveTab] = useState<'language' | 'food' | 'customs'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState('shona');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const handleAudioPlay = (phraseId: string) => {
    if (playingAudio === phraseId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(phraseId);
      // Simulate audio playing
      setTimeout(() => setPlayingAudio(null), 2000);
    }
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuizIndex(0);
    setQuizScore(0);
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }
    
    if (currentQuizIndex < essentialPhrases.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setQuizMode(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Cultural Preparation</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Immerse yourself in Zimbabwean culture before you arrive
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {[
          { id: 'language', label: 'Language Primer', icon: BookOpen },
          { id: 'food', label: 'Food Explorer', icon: Utensils },
          { id: 'customs', label: 'Cultural Customs', icon: Users }
        ].map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            variant={activeTab === tab.id ? 'default' : 'outline'}
            className={activeTab === tab.id 
              ? 'bg-orange-600 hover:bg-orange-700' 
              : 'border-gray-600 text-gray-400 hover:bg-gray-800'
            }
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {activeTab === 'language' && (
        <div className="space-y-6">
          {!quizMode ? (
            <>
              <div className="flex justify-center gap-4 mb-6">
                {languages.map((lang) => (
                  <Button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    variant={selectedLanguage === lang.id ? 'default' : 'outline'}
                    className={selectedLanguage === lang.id 
                      ? 'bg-orange-600 hover:bg-orange-700' 
                      : 'border-gray-600 text-gray-400 hover:bg-gray-800'
                    }
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </Button>
                ))}
              </div>

              <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
                <CardContent className="p-6">
                  <div className="mb-6">
                    {languages.map((lang) => (
                      selectedLanguage === lang.id && (
                        <div key={lang.id} className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {lang.name} ({lang.nativeName})
                          </h3>
                          <div className="flex justify-center gap-6 text-sm text-gray-400">
                            <span>Speakers: {lang.speakers}</span>
                            <span>Region: {lang.region}</span>
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  <div className="space-y-4">
                    {essentialPhrases.map((phrase, index) => (
                      <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{phrase.english}</h4>
                          <Button
                            onClick={() => handleAudioPlay(`${phrase.english}-${index}`)}
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-400 hover:bg-gray-800"
                          >
                            {playingAudio === `${phrase.english}-${index}` ? 
                              <Pause className="h-4 w-4" /> : 
                              <Play className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="text-orange-400 text-sm mb-1">Shona</div>
                            <div className="text-white font-medium">{phrase.shona}</div>
                          </div>
                          <div>
                            <div className="text-orange-400 text-sm mb-1">Ndebele</div>
                            <div className="text-white font-medium">{phrase.ndebele}</div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-400 mb-2">
                          <strong>Pronunciation:</strong> {phrase.pronunciation}
                        </div>
                        <div className="text-sm text-gray-300">
                          <strong>Context:</strong> {phrase.context}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-6">
                    <Button
                      onClick={startQuiz}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      Test Your Knowledge
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Language Quiz</h3>
                  <div className="flex justify-center gap-4 text-sm text-gray-400">
                    <span>Question {currentQuizIndex + 1} of {essentialPhrases.length}</span>
                    <span>Score: {quizScore}</span>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-6">
                    <h4 className="text-xl text-white mb-4">
                      How do you say "{essentialPhrases[currentQuizIndex].english}" in {selectedLanguage === 'shona' ? 'Shona' : 'Ndebele'}?
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => handleQuizAnswer(true)}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-green-600 hover:border-green-600 p-4 h-auto"
                    >
                      {selectedLanguage === 'shona' ? 
                        essentialPhrases[currentQuizIndex].shona : 
                        essentialPhrases[currentQuizIndex].ndebele
                      }
                    </Button>
                    <Button
                      onClick={() => handleQuizAnswer(false)}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-red-600 hover:border-red-600 p-4 h-auto"
                    >
                      Wrong Answer Option
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'food' && (
        <div className="space-y-6">
          {!selectedDish ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {traditionalDishes.map((dish) => (
                <Card 
                  key={dish.id}
                  className="group bg-black/90 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/50 cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedDish(dish)}
                >
                  <div className="relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className={
                        dish.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        dish.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }>
                        {dish.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-xl mb-1">{dish.name}</h3>
                      <p className="text-orange-300 text-sm">{dish.region}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-gray-300 text-sm mb-4">{dish.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4" />
                        {dish.preparationTime}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <Button
                onClick={() => setSelectedDish(null)}
                variant="outline"
                className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
              >
                ← Back to Dishes
              </Button>
              
              <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
                <div className="relative">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedDish.name}</h1>
                    <p className="text-orange-300 text-lg">{selectedDish.region}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-orange-400 font-semibold mb-2">Description</h3>
                        <p className="text-gray-300">{selectedDish.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-orange-400 font-semibold mb-2">Ingredients</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedDish.ingredients.map((ingredient) => (
                            <Badge key={ingredient} className="bg-green-500/20 text-green-400">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-orange-400 font-semibold mb-2">Cultural Significance</h3>
                        <p className="text-gray-300">{selectedDish.culturalSignificance}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-orange-400 font-semibold mb-2">Preparation Details</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <ChefHat className="h-4 w-4 text-orange-400" />
                            <span className="text-white">Time: {selectedDish.preparationTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-orange-400" />
                            <span className="text-white">Difficulty: {selectedDish.difficulty}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-orange-400 font-semibold mb-2">Where to Find</h3>
                        <div className="space-y-2">
                          {selectedDish.whereToFind.map((location) => (
                            <div key={location} className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-green-400" />
                              <span className="text-gray-300">{location}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'customs' && (
        <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
          <CardContent className="p-6">
            <h3 className="text-orange-400 font-semibold mb-6">Cultural Customs & Etiquette</h3>
            <div className="space-y-6">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Greetings</h4>
                <p className="text-gray-300 text-sm">
                  Zimbabweans value respectful greetings. Always greet elders first and use both hands when giving or receiving items.
                </p>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Dining Etiquette</h4>
                <p className="text-gray-300 text-sm">
                  Sadza is traditionally eaten with hands. Wait for the host to start eating, and finish everything on your plate as a sign of respect.
                </p>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Photography</h4>
                <p className="text-gray-300 text-sm">
                  Always ask permission before photographing people. Some cultural and religious sites may have photography restrictions.
                </p>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="text-white font-medium mb-2">Gift Giving</h4>
                <p className="text-gray-300 text-sm">
                  Gifts should be given and received with both hands. Modest gifts from your home country are appreciated.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CulturalPreparation;
