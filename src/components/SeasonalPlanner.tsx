
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Droplets, 
  Sun, 
  Thermometer,
  Camera,
  Binoculars,
  Music
} from 'lucide-react';

interface MonthData {
  month: string;
  shortName: string;
  waterfallFlow: 'Low' | 'Medium' | 'High' | 'Peak';
  temperature: number;
  rainfall: number;
  wildlifeActivity: string[];
  festivals: string[];
  bestFor: string[];
  animalMigrations: {
    species: string;
    activity: string;
    likelihood: number;
  }[];
}

const monthlyData: MonthData[] = [
  {
    month: 'January',
    shortName: 'Jan',
    waterfallFlow: 'Peak',
    temperature: 26,
    rainfall: 190,
    wildlifeActivity: ['Peak elephant gathering', 'Bird breeding season'],
    festivals: [],
    bestFor: ['Victoria Falls photography', 'Bird watching'],
    animalMigrations: [
      { species: 'Elephant', activity: 'Gathering at waterholes', likelihood: 95 },
      { species: 'Migratory birds', activity: 'Breeding season', likelihood: 90 }
    ]
  },
  {
    month: 'February',
    shortName: 'Feb',
    waterfallFlow: 'Peak',
    temperature: 26,
    rainfall: 150,
    wildlifeActivity: ['Elephant herds active', 'Predator activity high'],
    festivals: [],
    bestFor: ['Wildlife photography', 'River activities'],
    animalMigrations: [
      { species: 'Elephant', activity: 'Large herds moving', likelihood: 90 },
      { species: 'Lion', activity: 'Active hunting', likelihood: 85 }
    ]
  },
  {
    month: 'March',
    shortName: 'Mar',
    waterfallFlow: 'High',
    temperature: 25,
    rainfall: 130,
    wildlifeActivity: ['Migration routes active', 'Calving season'],
    festivals: [],
    bestFor: ['Safari drives', 'Cultural tours'],
    animalMigrations: [
      { species: 'Zebra', activity: 'Migration corridors', likelihood: 80 },
      { species: 'Antelope', activity: 'Calving season', likelihood: 75 }
    ]
  },
  {
    month: 'April',
    shortName: 'Apr',
    waterfallFlow: 'High',
    temperature: 24,
    rainfall: 50,
    wildlifeActivity: ['Excellent game viewing', 'Clear skies return'],
    festivals: ['Harare International Festival of Arts'],
    bestFor: ['All activities', 'Cultural events'],
    animalMigrations: [
      { species: 'Buffalo', activity: 'Herd formations', likelihood: 85 },
      { species: 'Wild Dog', activity: 'Denning season', likelihood: 60 }
    ]
  },
  {
    month: 'May',
    shortName: 'May',
    waterfallFlow: 'Medium',
    temperature: 22,
    rainfall: 10,
    wildlifeActivity: ['Prime safari season begins', 'Animals congregate'],
    festivals: [],
    bestFor: ['Game drives', 'Walking safaris'],
    animalMigrations: [
      { species: 'Elephant', activity: 'Concentrating near water', likelihood: 95 },
      { species: 'Leopard', activity: 'Increased sightings', likelihood: 70 }
    ]
  },
  {
    month: 'June',
    shortName: 'Jun',
    waterfallFlow: 'Medium',
    temperature: 19,
    rainfall: 5,
    wildlifeActivity: ['Excellent wildlife viewing', 'Dry season starts'],
    festivals: [],
    bestFor: ['Safari photography', 'Comfortable weather'],
    animalMigrations: [
      { species: 'All species', activity: 'Water dependency increases', likelihood: 90 },
      { species: 'Painted Dog', activity: 'Pack activity', likelihood: 65 }
    ]
  },
  {
    month: 'July',
    shortName: 'Jul',
    waterfallFlow: 'Low',
    temperature: 19,
    rainfall: 0,
    wildlifeActivity: ['Peak dry season', 'Animals at waterholes'],
    festivals: [],
    bestFor: ['Wildlife photography', 'Clear skies'],
    animalMigrations: [
      { species: 'Elephant', activity: 'Daily waterhole visits', likelihood: 98 },
      { species: 'Lion', activity: 'Ambush hunting', likelihood: 80 }
    ]
  },
  {
    month: 'August',
    shortName: 'Aug',
    waterfallFlow: 'Low',
    temperature: 22,
    rainfall: 0,
    wildlifeActivity: ['Prime game viewing', 'Predator activity'],
    festivals: [],
    bestFor: ['Photography', 'Safari drives'],
    animalMigrations: [
      { species: 'All species', activity: 'Concentrated around water', likelihood: 95 },
      { species: 'Crocodile', activity: 'Basking season', likelihood: 90 }
    ]
  },
  {
    month: 'September',
    shortName: 'Sep',
    waterfallFlow: 'Low',
    temperature: 26,
    rainfall: 5,
    wildlifeActivity: ['Mating season begins', 'Territorial behavior'],
    festivals: [],
    bestFor: ['Game viewing', 'Behavioral photography'],
    animalMigrations: [
      { species: 'Impala', activity: 'Rutting season', likelihood: 85 },
      { species: 'Elephant', activity: 'Musth season', likelihood: 70 }
    ]
  },
  {
    month: 'October',
    shortName: 'Oct',
    waterfallFlow: 'Low',
    temperature: 28,
    rainfall: 20,
    wildlifeActivity: ['Mating season peak', 'Territorial displays'],
    festivals: [],
    bestFor: ['Wildlife behavior', 'Photography'],
    animalMigrations: [
      { species: 'Kudu', activity: 'Mating displays', likelihood: 80 },
      { species: 'Baboon', activity: 'Troop movements', likelihood: 75 }
    ]
  },
  {
    month: 'November',
    shortName: 'Nov',
    waterfallFlow: 'Low',
    temperature: 27,
    rainfall: 80,
    wildlifeActivity: ['Green season begins', 'First rains'],
    festivals: [],
    bestFor: ['Landscape photography', 'Bird arrivals'],
    animalMigrations: [
      { species: 'Elephant', activity: 'Dispersing from water', likelihood: 60 },
      { species: 'Migratory birds', activity: 'Arrival season', likelihood: 85 }
    ]
  },
  {
    month: 'December',
    shortName: 'Dec',
    waterfallFlow: 'Medium',
    temperature: 26,
    rainfall: 150,
    wildlifeActivity: ['Green season active', 'Young animals'],
    festivals: [],
    bestFor: ['Lush landscapes', 'Baby animals'],
    animalMigrations: [
      { species: 'Antelope', activity: 'Birthing season', likelihood: 90 },
      { species: 'Elephant', activity: 'Calving season', likelihood: 80 }
    ]
  }
];

const SeasonalPlanner = () => {
  const [selectedMonth, setSelectedMonth] = useState<MonthData | null>(null);
  const [activeView, setActiveView] = useState<'calendar' | 'wildlife' | 'festivals'>('calendar');

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'Peak': return 'bg-blue-600 text-white';
      case 'High': return 'bg-blue-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getRainfallIntensity = (rainfall: number) => {
    if (rainfall > 100) return 'bg-blue-600';
    if (rainfall > 50) return 'bg-blue-400';
    if (rainfall > 10) return 'bg-blue-200';
    return 'bg-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">Seasonal Planning Guide</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Plan your Zimbabwe adventure with wildlife migration timelines and seasonal highlights
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {[
          { id: 'calendar', label: 'Monthly Overview', icon: Calendar },
          { id: 'wildlife', label: 'Wildlife Timeline', icon: Binoculars },
          { id: 'festivals', label: 'Cultural Events', icon: Music }
        ].map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveView(tab.id as any)}
            variant={activeView === tab.id ? 'default' : 'outline'}
            className={activeView === tab.id 
              ? 'bg-orange-600 hover:bg-orange-700' 
              : 'border-gray-600 text-gray-400 hover:bg-gray-800'
            }
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      {activeView === 'calendar' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {monthlyData.map((month) => (
            <Card 
              key={month.month}
              className="bg-black/90 backdrop-blur-xl border border-orange-500/20 hover:border-orange-500/50 cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedMonth(month)}
            >
              <CardContent className="p-4">
                <div className="text-center mb-3">
                  <h3 className="text-white font-bold text-lg">{month.shortName}</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Thermometer className="h-4 w-4 text-red-400" />
                    <span className="text-gray-300 text-sm">{month.temperature}°C</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-400" />
                    <Badge className={getFlowColor(month.waterfallFlow)} size="sm">
                      {month.waterfallFlow} Flow
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-gray-400 mb-1">Rainfall</div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getRainfallIntensity(month.rainfall)}`}
                          style={{ width: `${Math.min(month.rainfall / 200 * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300">{month.rainfall}mm</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-xs text-orange-400 mb-1">Best for:</div>
                  <div className="flex flex-wrap gap-1">
                    {month.bestFor.slice(0, 2).map((activity) => (
                      <Badge key={activity} variant="secondary" className="text-xs bg-orange-500/20 text-orange-300">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeView === 'wildlife' && (
        <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
          <CardContent className="p-6">
            <h3 className="text-orange-400 font-semibold mb-6">Wildlife Activity Timeline</h3>
            <div className="space-y-4">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <div className="min-w-16 text-center">
                    <div className="text-white font-medium">{month.shortName}</div>
                    <div className="text-xs text-gray-400">{month.temperature}°C</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {month.wildlifeActivity.map((activity) => (
                        <Badge key={activity} className="bg-green-500/20 text-green-400 text-xs">
                          {activity}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-1">
                      {month.animalMigrations.map((migration) => (
                        <div key={migration.species} className="flex items-center gap-2 text-sm">
                          <span className="text-orange-300">{migration.species}:</span>
                          <span className="text-gray-300">{migration.activity}</span>
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                            {migration.likelihood}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeView === 'festivals' && (
        <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
          <CardContent className="p-6">
            <h3 className="text-orange-400 font-semibold mb-6">Cultural Events & Festivals</h3>
            <div className="space-y-4">
              {monthlyData.filter(month => month.festivals.length > 0).map((month) => (
                <div key={month.month} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Music className="h-5 w-5 text-orange-400" />
                    <h4 className="text-white font-medium">{month.month}</h4>
                  </div>
                  {month.festivals.map((festival) => (
                    <div key={festival} className="ml-8 text-gray-300">
                      {festival}
                    </div>
                  ))}
                </div>
              ))}
              <div className="text-center text-gray-400 italic">
                More cultural events and festivals will be added as they are confirmed
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMonth && (
        <Card className="bg-black/90 backdrop-blur-xl border border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedMonth.month} Details</h3>
              <Button
                onClick={() => setSelectedMonth(null)}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-400 hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Weather</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-400" />
                      <span className="text-white">Average: {selectedMonth.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <span className="text-white">Rainfall: {selectedMonth.rainfall}mm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getFlowColor(selectedMonth.waterfallFlow)}>
                        Victoria Falls: {selectedMonth.waterfallFlow} Flow
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Best Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMonth.bestFor.map((activity) => (
                      <Badge key={activity} className="bg-green-500/20 text-green-400">
                        <Camera className="h-3 w-3 mr-1" />
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Wildlife Activity</h4>
                  <div className="space-y-2">
                    {selectedMonth.wildlifeActivity.map((activity) => (
                      <div key={activity} className="flex items-center gap-2">
                        <Binoculars className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Animal Migrations</h4>
                  <div className="space-y-2">
                    {selectedMonth.animalMigrations.map((migration) => (
                      <div key={migration.species} className="p-2 bg-gray-800/50 rounded">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{migration.species}</span>
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                            {migration.likelihood}%
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400">{migration.activity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeasonalPlanner;
