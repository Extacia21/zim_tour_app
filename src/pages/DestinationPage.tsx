import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Star, 
  Clock, 
  Thermometer,
  Camera,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Mountain,
  TreePine,
  Binoculars,
  Compass,
  Award,
  Activity
} from 'lucide-react';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedFooter from '@/components/EnhancedFooter';
import HotelDiscoverySystem from '@/components/HotelDiscoverySystem';
import ActivitiesDatabase from '@/components/ActivitiesDatabase';
import WildlifeSpotlight from '@/components/WildlifeSpotlight';
import NavigationTools from '@/components/NavigationTools';

const destinations = {
  'victoria-falls': {
    name: 'Victoria Falls',
    tagline: 'The Smoke That Thunders',
    videoUrl: 'https://player.vimeo.com/external/342394285.hd.mp4',
    backgroundImage: '/lovable-uploads/d03937c6-7997-45c8-872a-4b2fa9022a07.png',
    unesco: true,
    usp: 'One of the Seven Natural Wonders of the World',
    bestSeason: 'Peak flow: March - May | Dry season: June - November',
    temperature: '20-30°C',
    description: 'Experience the raw power of one of the Seven Natural Wonders of the World. Victoria Falls is a spectacular sight of awe-inspiring beauty and grandeur on the Zambezi River, where the thundering waters create a mist that can be seen from miles away.',
    topActivities: [
      { name: "Devil's Pool Swimming", description: "Swimming at the edge of the falls (seasonal)", season: "September - December" },
      { name: "White-water Rafting", description: "Grade 5 rapids on the Zambezi River", difficulty: "Extreme" },
      { name: "Bungee Jumping", description: "111m jump off Victoria Falls Bridge", height: "111m" },
      { name: "Helicopter Sunset Cruises", description: "Aerial views over the Zambezi River", experience: "Scenic flights" },
      { name: "Rhino Walking Safaris", description: "In nearby Mosi-oa-Tunya National Park", wildlife: "Rhino encounters" }
    ],
    uniqueFeatures: [
      "Lunar Rainbow viewing on full moon nights",
      "Livingstone Island tours at the edge of the Falls",
      "Helicopter sunset cruises over the Zambezi"
    ],
    accommodations: {
      luxury: ["Victoria Falls Hotel", "Stanley & Livingstone Boutique Hotel"],
      midRange: ["Ilala Lodge", "A'Zambezi River Lodge"],
      budget: ["Victoria Falls Backpackers"]
    },
    gallery: [
      '/lovable-uploads/d03937c6-7997-45c8-872a-4b2fa9022a07.png',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&h=600&fit=crop'
    ]
  },
  'hwange': {
    name: 'Hwange National Park',
    tagline: 'Giants of the Savanna',
    videoUrl: 'https://player.vimeo.com/external/elephants.hd.mp4',
    backgroundImage: '/lovable-uploads/bc57d6ad-4055-4d57-9112-57f8c856f2e8.png',
    unesco: false,
    usp: 'Home to one of Africa\'s largest elephant populations (40,000+)',
    bestSeason: 'Dry season: May - October',
    temperature: '15-35°C',
    description: 'Zimbabwe\'s largest national park with diverse wildlife including the largest elephant population in Africa. Experience incredible game viewing and pristine wilderness across diverse ecosystems from grasslands to woodlands.',
    topActivities: [
      { name: "Big 5 Game Drives", description: "Spot elephants, lions, leopards, rhinos, and buffalo", bestTime: "Early morning & evening" },
      { name: "Guided Walking Safaris", description: "Close encounters with wildlife on foot", difficulty: "Moderate" },
      { name: "Waterhole Photography", description: "Hide photography at Ngweshla & Nyamandhlovu", species: "400+ bird species" },
      { name: "Birdwatching", description: "Over 400 bird species recorded", habitat: "Diverse ecosystems" },
      { name: "Cultural Village Visits", description: "Near Dete village", culture: "Local communities" }
    ],
    uniqueFeatures: [
      "One of Africa's largest elephant populations",
      "Rare African wild dog sightings",
      "Cultural village visits near Dete"
    ],
    accommodations: {
      luxury: ["Singita Pamushana", "The Hide"],
      midRange: ["Hwange Safari Lodge", "Ivory Lodge"],
      budget: ["Sable Sands"]
    },
    gallery: [
      '/lovable-uploads/bc57d6ad-4055-4d57-9112-57f8c856f2e8.png',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&h=600&fit=crop'
    ]
  },
  'great-zimbabwe': {
    name: 'Great Zimbabwe',
    tagline: 'Ancient African Kingdom',
    videoUrl: 'https://player.vimeo.com/external/ruins.hd.mp4',
    backgroundImage: '/lovable-uploads/f5b7c9ff-098f-4495-ac5d-011d1dfce65f.png',
    unesco: true,
    usp: 'Largest ancient structure south of the Sahara Desert',
    bestSeason: 'Cool season: April - August',
    temperature: '15-28°C',
    description: 'The ancient stone city that gave Zimbabwe its name. These magnificent ruins represent medieval stone architecture from the 11th-14th century, showcasing the sophisticated engineering and cultural achievements of ancient African civilizations.',
    topActivities: [
      { name: "Archaeological Tours", description: "Explore ancient city ruins with expert guides", period: "11th-14th century" },
      { name: "Hill Complex Hikes", description: "Panoramic views from the ancient fortress", elevation: "High vantage point" },
      { name: "Cultural Performances", description: "Traditional Shona dance demonstrations", culture: "Shona heritage" },
      { name: "Birdwatching", description: "African fish eagles and other species", habitat: "Ancient ruins" }
    ],
    uniqueFeatures: [
      "UNESCO World Heritage Site",
      "Medieval stone architecture without mortar",
      "African fish eagle sightings"
    ],
    accommodations: {
      luxury: ["Great Zimbabwe Hotel"],
      midRange: ["Norma Jeane's Lakeview Resort"],
      budget: ["Local guesthouses"]
    },
    gallery: [
      '/lovable-uploads/f5b7c9ff-098f-4495-ac5d-011d1dfce65f.png',
      'https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop'
    ]
  },
  'mana-pools': {
    name: 'Mana Pools National Park',
    tagline: 'Pristine Wilderness Paradise',
    videoUrl: 'https://player.vimeo.com/external/mana.hd.mp4',
    backgroundImage: '/lovable-uploads/b3711832-269a-472f-b0f3-f0af5a0e0f43.png',
    unesco: true,
    usp: 'UNESCO World Heritage Site with no fences - pristine wilderness',
    bestSeason: 'Dry season: May - October',
    temperature: '18-32°C',
    description: 'A UNESCO World Heritage Site known for its pristine wilderness, incredible wildlife, and the mighty Zambezi River. Famous for walking safaris and canoeing adventures in one of Africa\'s most untouched landscapes.',
    topActivities: [
      { name: "Canoe Safaris", description: "Navigate the Zambezi River among wildlife", river: "Zambezi River" },
      { name: "Walking Safaris", description: "Big 5 encounters on foot in pristine wilderness", experience: "No fences" },
      { name: "Tiger Fishing", description: "Fish for tigerfish and bream in the Zambezi", species: "Tigerfish & bream" },
      { name: "Photography", description: "Floodplains photography with elephants", subject: "Wildlife & landscapes" }
    ],
    uniqueFeatures: [
      "Pristine wilderness with no fences",
      "Floodplains photography with elephants",
      "Four pools formed by the Zambezi River"
    ],
    accommodations: {
      luxury: ["Ruckomechi Camp", "Zambezi Expeditions"],
      midRange: ["Nyamepi Camp (self-catering)"],
      budget: ["Wilderness camping"]
    },
    gallery: [
      '/lovable-uploads/b3711832-269a-472f-b0f3-f0af5a0e0f43.png',
      'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop'
    ]
  },
  'eastern-highlands': {
    name: 'Eastern Highlands',
    tagline: 'Misty Mountains & Tea Plantations',
    videoUrl: 'https://player.vimeo.com/external/highlands.hd.mp4',
    backgroundImage: '/lovable-uploads/e1646cba-0cda-4d34-a90f-a3cd73555f04.png',
    unesco: false,
    usp: 'Zimbabwe\'s highest peak and misty rainforests',
    bestSeason: 'Year-round: April - September ideal',
    temperature: '10-25°C',
    description: 'Experience the cool mountain climate, mist-covered peaks, and rolling tea plantations of Zimbabwe\'s Eastern Highlands including Nyanga, Bvumba, and Chimanimani. A refreshing contrast to the country\'s lowland regions.',
    topActivities: [
      { name: "Mount Nyangani Hiking", description: "Climb Zimbabwe's highest peak (2,592m)", elevation: "2,592m" },
      { name: "Coffee Plantation Tours", description: "Visit coffee farms in the Bvumba Mountains", region: "Bvumba Mountains" },
      { name: "Mtarazi Falls Visit", description: "Zimbabwe's tallest waterfall", height: "762m" },
      { name: "Trout Fishing", description: "In highland dams and streams", species: "Rainbow & brown trout" }
    ],
    uniqueFeatures: [
      "Mount Nyangani - Zimbabwe's highest peak",
      "Mtarazi Falls - tallest waterfall in Zimbabwe",
      "Misty mountains and rainforests"
    ],
    accommodations: {
      luxury: ["Leopard Rock Hotel"],
      midRange: ["Frog and Fern, Bvumba"],
      budget: ["Mountain lodges"]
    },
    gallery: [
      '/lovable-uploads/e1646cba-0cda-4d34-a90f-a3cd73555f04.png',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop'
    ]
  },
  'matobo': {
    name: 'Matobo Hills',
    tagline: 'Ancient Stone Sanctuary',
    videoUrl: 'https://player.vimeo.com/external/ruins.hd.mp4',
    backgroundImage: '/lovable-uploads/99d20328-4c15-485a-b03a-79ccbf64477a.png',
    unesco: true,
    usp: 'Largest concentration of rock art in Southern Africa',
    bestSeason: 'Cool season: April - August',
    temperature: '12-28°C',
    description: 'Ancient granite formations and spiritual heritage with thousands of years of rock art. Home to rhino tracking and Cecil Rhodes\' grave, the Matobo Hills represent one of Zimbabwe\'s most sacred and historically significant landscapes.',
    topActivities: [
      { name: "Rhino Tracking", description: "Track black and white rhinos on foot", species: "Black & white rhinos" },
      { name: "Rock Art Tours", description: "Ancient San bushmen paintings", age: "2000+ years old" },
      { name: "Cecil Rhodes Grave", description: "Visit the grave of the colonial pioneer", historical: "World's View" },
      { name: "Granite Formations", description: "Explore unique balancing rocks", geological: "Ancient granite" }
    ],
    uniqueFeatures: [
      "Largest concentration of rock art in Southern Africa",
      "Ancient granite formations",
      "Cecil Rhodes' burial site at World's View"
    ],
    accommodations: {
      luxury: ["Amalinda Lodge"],
      midRange: ["Matobo Hills Lodge"],
      budget: ["Camp Amalinda"]
    },
    gallery: [
      '/lovable-uploads/99d20328-4c15-485a-b03a-79ccbf64477a.png',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop'
    ]
  },
  'lake-kariba': {
    name: 'Lake Kariba',
    tagline: 'Africa\'s Paradise Lake',
    videoUrl: 'https://player.vimeo.com/external/kariba.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop',
    unesco: false,
    usp: 'World\'s largest man-made lake by volume',
    bestSeason: 'Dry season: April - October',
    temperature: '20-35°C',
    description: 'The world\'s largest man-made lake by volume, offering spectacular sunsets, houseboat cruises, and excellent tiger fishing. Lake Kariba is a water paradise surrounded by game-rich shores.',
    topActivities: [
      { name: "Houseboat Cruises", description: "Multi-day floating accommodation", experience: "Luxury on water" },
      { name: "Tiger Fishing", description: "World-class angling for tigerfish", species: "Tigerfish & bream" },
      { name: "Sunset Deck Parties", description: "Evening entertainment on the water", atmosphere: "Social & scenic" },
      { name: "Game Viewing", description: "Wildlife along the shoreline", location: "Matusadona National Park" }
    ],
    uniqueFeatures: [
      "World's largest man-made lake by volume",
      "Kariba Dam wall tours",
      "Spectacular African sunsets"
    ],
    accommodations: {
      luxury: ["Bumi Hills Safari Lodge"],
      midRange: ["African Dream Houseboat", "Kalandeka Houseboat"],
      budget: ["Kariba town accommodation"]
    },
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop'
    ]
  },
  'chinhoyi-caves': {
    name: 'Chinhoyi Caves',
    tagline: 'Crystal Blue Pools',
    videoUrl: 'https://player.vimeo.com/external/caves.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1920&h=1080&fit=crop',
    unesco: false,
    usp: 'Underground limestone caves with crystal-clear cobalt blue pools',
    bestSeason: 'Year-round',
    temperature: '20-30°C',
    description: 'Underground limestone caves featuring crystal-clear cobalt blue pools. These mystical caves offer cave diving, swimming, and exploration of fascinating geological formations.',
    topActivities: [
      { name: "Cave Diving", description: "Underwater exploration in crystal pools", depth: "Up to 50m deep" },
      { name: "Swimming", description: "In the famous Sleeping Pool", temperature: "Constant 22°C" },
      { name: "Cave Tours", description: "Guided exploration of limestone formations", geology: "Ancient limestone" },
      { name: "Photography", description: "Unique underground landscapes", lighting: "Natural cave lighting" }
    ],
    uniqueFeatures: [
      "Crystal-clear cobalt blue pools",
      "Constant water temperature of 22°C",
      "Underwater cave systems"
    ],
    accommodations: {
      luxury: ["Orange Grove Farm"],
      midRange: ["Chinhoyi University Lodge"],
      budget: ["Local guesthouses"]
    },
    gallery: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517744918058-b52bb5ccdecd?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop'
    ]
  },
  'gonarezhou': {
    name: 'Gonarezhou National Park',
    tagline: 'Land of the Giants',
    videoUrl: 'https://player.vimeo.com/external/gonarezhou.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&h=1080&fit=crop',
    unesco: false,
    usp: 'Remote wilderness with distinctive red cliffs and giant baobab trees',
    bestSeason: 'Dry season: April - October',
    temperature: '18-40°C',
    description: 'Remote wilderness park famous for its red sandstone cliffs, giant baobab trees, and diverse wildlife. Part of the Great Limpopo Transfrontier Park, it offers an authentic African safari experience.',
    topActivities: [
      { name: "Red Cliffs Exploration", description: "Distinctive sandstone formations", geology: "Red sandstone cliffs" },
      { name: "Baobab Tree Viewing", description: "Ancient giant baobab forests", age: "1000+ years old" },
      { name: "Game Drives", description: "Elephants, lions, and rare nyala antelope", wildlife: "Big 5 & rare species" },
      { name: "Bird Watching", description: "Over 400 bird species", habitat: "Diverse ecosystems" }
    ],
    uniqueFeatures: [
      "Distinctive red sandstone cliffs",
      "Giant baobab trees over 1000 years old",
      "Part of Great Limpopo Transfrontier Park"
    ],
    accommodations: {
      luxury: ["Singita Pamushana"],
      midRange: ["Gonarezhou wilderness camps"],
      budget: ["Camping sites"]
    },
    gallery: [
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop'
    ]
  },
  'antelope-park': {
    name: 'Antelope Park',
    tagline: 'Walk with Lions',
    videoUrl: 'https://player.vimeo.com/external/antelope.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1544943871-6ad0fc82a69e?w=1920&h=1080&fit=crop',
    unesco: false,
    usp: 'Unique lion conservation and walking with lions experience',
    bestSeason: 'Year-round',
    temperature: '15-35°C',
    description: 'A wildlife conservation park offering unique experiences including walking with lions, elephant interactions, and conservation education. Focused on wildlife rehabilitation and sustainable tourism.',
    topActivities: [
      { name: "Lion Walks", description: "Walk alongside habituated lions", experience: "Unique interaction" },
      { name: "Elephant Encounters", description: "Close interactions with elephants", conservation: "Rehabilitation" },
      { name: "Conservation Tours", description: "Learn about wildlife conservation", education: "Conservation focus" },
      { name: "Game Drives", description: "Traditional safari experience", wildlife: "Diverse species" }
    ],
    uniqueFeatures: [
      "Walk with lions experience",
      "Elephant interaction programs",
      "Conservation education focus"
    ],
    accommodations: {
      luxury: ["Antelope Park Resort"],
      midRange: ["Park accommodation"],
      budget: ["Camping facilities"]
    },
    gallery: [
      'https://images.unsplash.com/photo-1544943871-6ad0fc82a69e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop'
    ]
  },
  'matusadona': {
    name: 'Matusadona National Park',
    tagline: 'Kariba\'s Wildlife Haven',
    videoUrl: 'https://player.vimeo.com/external/matusadona.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=1920&h=1080&fit=crop',
    unesco: false,
    usp: 'Game viewing along the shores of Lake Kariba',
    bestSeason: 'Dry season: May - October',
    temperature: '20-35°C',
    description: 'Located on the shores of Lake Kariba, this park offers excellent game viewing with elephants often seen swimming between islands. Combines water and land-based safari activities.',
    topActivities: [
      { name: "Water-based Game Viewing", description: "Wildlife viewing from boats", unique: "Swimming elephants" },
      { name: "Island Exploration", description: "Visit islands in Lake Kariba", activity: "Boat excursions" },
      { name: "Walking Safaris", description: "Guided walks in the park", terrain: "Lakshore wilderness" },
      { name: "Fishing", description: "Angling in Lake Kariba", species: "Tigerfish & bream" }
    ],
    uniqueFeatures: [
      "Elephants swimming between islands",
      "Combination of water and land safaris",
      "Lake Kariba shoreline location"
    ],
    accommodations: {
      luxury: ["Musango Safari Camp"],
      midRange: ["Spurwing Island Lodge"],
      budget: ["Camping areas"]
    },
    gallery: [
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1549366021-9f761d040dd2?w=800&h=600&fit=crop'
    ]
  },
  'chizarira': {
    name: 'Chizarira National Park',
    tagline: 'Rugged Wilderness',
    videoUrl: 'https://player.vimeo.com/external/chizarira.hd.mp4',
    backgroundImage: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=1920&h=1080&fit=crop',
    unesco: false,
    usp: 'Remote and rugged landscape with diverse wildlife',
    bestSeason: 'Dry season: May - October',
    temperature: '15-35°C',
    description: 'One of Zimbabwe\'s most remote and least visited parks, offering an authentic wilderness experience. The rugged terrain includes escarpments, gorges, and diverse wildlife.',
    topActivities: [
      { name: "Wilderness Walking", description: "Multi-day walking safaris", terrain: "Rugged escarpment" },
      { name: "Escarpment Views", description: "Spectacular viewpoints", elevation: "High vantage points" },
      { name: "Wildlife Tracking", description: "Spot elephants, buffalo, and predators", experience: "Remote wilderness" },
      { name: "Gorge Exploration", description: "Explore deep river gorges", geology: "Ancient formations" }
    ],
    uniqueFeatures: [
      "Most remote park in Zimbabwe",
      "Spectacular escarpment views",
      "Authentic wilderness experience"
    ],
    accommodations: {
      luxury: ["Wilderness camps"],
      midRange: ["Basic camps"],
      budget: ["Wilderness camping"]
    },
    gallery: [
      'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop'
    ]
  }
};

const DestinationPage = () => {
  const { slug } = useParams();
  const destination = destinations[slug as keyof typeof destinations];
  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <EnhancedNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-xl text-gray-600 mb-4">Sorry, we couldn't find the destination you're looking for.</p>
            <Link to="/" className="text-orange-600 hover:text-orange-700 underline">
              Return to Home
            </Link>
          </div>
        </div>
        <EnhancedFooter />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % destination.gallery.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + destination.gallery.length) % destination.gallery.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <EnhancedNavigation />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            {destination.name}
          </h1>
          <p className="text-2xl md:text-3xl text-orange-200 mb-8">{destination.tagline}</p>
          
          {/* Key Facts Panel */}
          <Card className="bg-black/80 backdrop-blur-xl border border-orange-500/30 p-6 max-w-4xl">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                <div className="text-center">
                  {destination.unesco && (
                    <Badge className="bg-blue-600 mb-2">UNESCO World Heritage</Badge>
                  )}
                  <p className="text-sm text-gray-300">Status</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-orange-400" />
                    <span className="text-orange-400">{destination.bestSeason}</span>
                  </div>
                  <p className="text-sm text-gray-300">Best Season</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Thermometer className="h-4 w-4 text-red-400" />
                    <span className="text-red-400">{destination.temperature}</span>
                  </div>
                  <p className="text-sm text-gray-300">Temperature</p>
                </div>
              </div>
              <div className="border-t border-gray-600 pt-4">
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500">
                  {destination.usp}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'activities', label: 'Top Activities' },
              { id: 'accommodation', label: 'Hotels & Lodges' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'navigation', label: 'Planning Tools' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">About {destination.name}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{destination.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-orange-600" />
                      Unique Features
                    </h3>
                    <ul className="space-y-2">
                      {destination.uniqueFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-orange-600" />
                      Top Activities Preview
                    </h3>
                    <ul className="space-y-2">
                      {destination.topActivities.slice(0, 3).map((activity, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Mountain className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{activity.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Button 
                    onClick={() => setActiveTab('activities')}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    View All Activities
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('accommodation')}
                    variant="outline" 
                    className="border-orange-600 text-orange-600"
                  >
                    Browse Hotels & Lodges
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Top Activities in {destination.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.topActivities.map((activity, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-orange-600" />
                      {activity.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    <div className="space-y-2">
                      {Object.entries(activity).map(([key, value]) => {
                        if (key !== 'name' && key !== 'description') {
                          return (
                            <Badge key={key} variant="outline" className="mr-2">
                              {key}: {String(value)}
                            </Badge>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ActivitiesDatabase />
          </div>
        )}

        {activeTab === 'accommodation' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Hotels & Lodges in {destination.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    Luxury
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {destination.accommodations.luxury.map((hotel, index) => (
                      <li key={index} className="text-gray-700">{hotel}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Users className="h-5 w-5 text-blue-600" />
                    Mid-Range
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {destination.accommodations.midRange.map((hotel, index) => (
                      <li key={index} className="text-gray-700">{hotel}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <MapPin className="h-5 w-5 text-green-600" />
                    Budget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {destination.accommodations.budget.map((hotel, index) => (
                      <li key={index} className="text-gray-700">{hotel}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <HotelDiscoverySystem />
          </div>
        )}

        {activeTab === 'gallery' && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destination.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setCurrentImage(index);
                      setShowGallery(true);
                    }}
                  >
                    <img
                      src={image}
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'navigation' && <NavigationTools />}
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-orange-400 z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 text-white hover:text-orange-400 z-10"
            >
              <ChevronLeft className="h-12 w-12" />
            </button>
            
            <img
              src={destination.gallery[currentImage]}
              alt={`${destination.name} ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-orange-400 z-10"
            >
              <ChevronRight className="h-12 w-12" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentImage + 1} / {destination.gallery.length}
            </div>
          </div>
        </div>
      )}

      <EnhancedFooter />
    </div>
  );
};

export default DestinationPage;
