
import React from 'react';
import { useParams } from 'react-router-dom';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedFooter from '@/components/EnhancedFooter';
import HotelDiscoverySystem from '@/components/HotelDiscoverySystem';

const HotelsPage = () => {
  const { destination } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <EnhancedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hotels & Lodges
            {destination && destination !== 'all' && (
              <span className="block text-orange-600 capitalize">
                in {destination.replace('-', ' ')}
              </span>
            )}
          </h1>
          <p className="text-xl text-gray-600">
            Discover premium accommodations in Zimbabwe's most stunning locations
          </p>
        </div>
        
        <HotelDiscoverySystem />
      </div>
      
      <EnhancedFooter />
    </div>
  );
};

export default HotelsPage;
