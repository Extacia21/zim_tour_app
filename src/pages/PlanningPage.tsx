
import React, { useState } from 'react';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedFooter from '@/components/EnhancedFooter';
import DestinationComparison from '@/components/DestinationComparison';
import TripBuilder from '@/components/TripBuilder';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar } from 'lucide-react';

const PlanningPage = () => {
  const [activeTab, setActiveTab] = useState('comparison');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <EnhancedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trip Planning Tools
          </h1>
          <p className="text-xl text-gray-600">
            Compare destinations and build your perfect Zimbabwe adventure
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <Button
              variant={activeTab === 'comparison' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('comparison')}
              className={`mr-1 ${activeTab === 'comparison' ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Compare Destinations
            </Button>
            <Button
              variant={activeTab === 'builder' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('builder')}
              className={activeTab === 'builder' ? 'bg-orange-600 hover:bg-orange-700' : ''}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Trip Builder
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'comparison' && <DestinationComparison />}
        {activeTab === 'builder' && <TripBuilder />}
      </div>
      
      <EnhancedFooter />
    </div>
  );
};

export default PlanningPage;
