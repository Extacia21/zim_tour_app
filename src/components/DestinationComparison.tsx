
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Star, Mountain, Camera, Users, MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'Victoria Falls',
    slug: 'victoria-falls',
    bestFor: 'Adventure',
    wildlife: '⭐⭐⭐',
    adventure: '⭐⭐⭐⭐⭐',
    culture: '⭐⭐⭐',
    relaxation: '⭐⭐⭐⭐',
    unesco: true,
    topActivity: 'Bungee Jumping',
    season: 'Year-round',
    uniqueFeature: 'Lunar Rainbow'
  },
  {
    name: 'Hwange National Park',
    slug: 'hwange',
    bestFor: 'Wildlife',
    wildlife: '⭐⭐⭐⭐⭐',
    adventure: '⭐⭐⭐⭐',
    culture: '⭐⭐',
    relaxation: '⭐⭐⭐',
    unesco: false,
    topActivity: 'Game Drives',
    season: 'May-Oct',
    uniqueFeature: '40,000+ Elephants'
  },
  {
    name: 'Great Zimbabwe',
    slug: 'great-zimbabwe',
    bestFor: 'Culture',
    wildlife: '⭐⭐',
    adventure: '⭐⭐',
    culture: '⭐⭐⭐⭐⭐',
    relaxation: '⭐⭐⭐',
    unesco: true,
    topActivity: 'Archaeological Tours',
    season: 'Apr-Aug',
    uniqueFeature: 'Ancient Stone City'
  },
  {
    name: 'Mana Pools',
    slug: 'mana-pools',
    bestFor: 'Wilderness',
    wildlife: '⭐⭐⭐⭐⭐',
    adventure: '⭐⭐⭐⭐',
    culture: '⭐⭐',
    relaxation: '⭐⭐⭐⭐',
    unesco: true,
    topActivity: 'Canoe Safaris',
    season: 'May-Oct',
    uniqueFeature: 'No Fences'
  },
  {
    name: 'Eastern Highlands',
    slug: 'eastern-highlands',
    bestFor: 'Relaxation',
    wildlife: '⭐⭐',
    adventure: '⭐⭐⭐',
    culture: '⭐⭐⭐',
    relaxation: '⭐⭐⭐⭐⭐',
    unesco: false,
    topActivity: 'Mountain Hiking',
    season: 'Year-round',
    uniqueFeature: 'Highest Peak'
  },
  {
    name: 'Matobo Hills',
    slug: 'matobo',
    bestFor: 'Culture & Wildlife',
    wildlife: '⭐⭐⭐⭐',
    adventure: '⭐⭐⭐',
    culture: '⭐⭐⭐⭐⭐',
    relaxation: '⭐⭐⭐',
    unesco: true,
    topActivity: 'Rhino Tracking',
    season: 'Apr-Aug',
    uniqueFeature: 'Rock Art'
  }
];

const DestinationComparison = () => {
  const [filterBy, setFilterBy] = useState('all');

  const filteredDestinations = destinations.filter(dest => {
    if (filterBy === 'all') return true;
    return dest.bestFor.toLowerCase().includes(filterBy.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-orange-600" />
            Compare Destinations
          </CardTitle>
          <p className="text-gray-600">Find the perfect destination based on your interests</p>
        </CardHeader>
        <CardContent>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'wildlife', 'adventure', 'culture', 'relaxation'].map((filter) => (
              <Button
                key={filter}
                variant={filterBy === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterBy(filter)}
                className={filterBy === filter ? 'bg-orange-600 hover:bg-orange-700' : ''}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Destination</TableHead>
                  <TableHead>Best For</TableHead>
                  <TableHead>Wildlife</TableHead>
                  <TableHead>Adventure</TableHead>
                  <TableHead>Culture</TableHead>
                  <TableHead>Relaxation</TableHead>
                  <TableHead>UNESCO</TableHead>
                  <TableHead>Top Activity</TableHead>
                  <TableHead>Best Season</TableHead>
                  <TableHead>Unique Feature</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinations.map((destination) => (
                  <TableRow key={destination.slug} className="hover:bg-orange-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mountain className="h-4 w-4 text-orange-600" />
                        {destination.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-orange-600 text-orange-600">
                        {destination.bestFor}
                      </Badge>
                    </TableCell>
                    <TableCell>{destination.wildlife}</TableCell>
                    <TableCell>{destination.adventure}</TableCell>
                    <TableCell>{destination.culture}</TableCell>
                    <TableCell>{destination.relaxation}</TableCell>
                    <TableCell>
                      {destination.unesco && (
                        <Badge className="bg-blue-600">UNESCO</Badge>
                      )}
                    </TableCell>
                    <TableCell>{destination.topActivity}</TableCell>
                    <TableCell>{destination.season}</TableCell>
                    <TableCell>{destination.uniqueFeature}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DestinationComparison;
