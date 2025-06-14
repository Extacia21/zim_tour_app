
import React from 'react';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedFooter from '@/components/EnhancedFooter';
import WildlifeSpotlight from '@/components/WildlifeSpotlight';

const WildlifePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <EnhancedNavigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Wildlife Safari
          </h1>
          <p className="text-xl text-gray-600">
            Discover Zimbabwe's incredible wildlife and conservation efforts
          </p>
        </div>
        
        <WildlifeSpotlight />
      </div>
      
      <EnhancedFooter />
    </div>
  );
};

export default WildlifePage;
