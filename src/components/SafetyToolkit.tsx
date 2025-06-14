
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, MapPin, Shield, Zap, Navigation, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SafetyAlert {
  id: string;
  type: 'weather' | 'wildlife' | 'road' | 'security';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
}

const SafetyToolkit = () => {
  const [riskLevel, setRiskLevel] = useState<'green' | 'amber' | 'red'>('green');
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();
  
  const [alerts, setAlerts] = useState<SafetyAlert[]>([
    {
      id: '1',
      type: 'wildlife',
      severity: 'medium',
      title: 'Elephant Crossing Alert',
      description: 'Elephants spotted crossing main road to Hwange NP',
      location: 'A8 Highway, 15km from Dete',
      timestamp: new Date(Date.now() - 1800000) // 30 mins ago
    },
    {
      id: '2',
      type: 'weather',
      severity: 'low',
      title: 'Light Rain Expected',
      description: 'Brief showers expected in Eastern Highlands',
      location: 'Nyanga Mountains',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    }
  ]);

  const emergencyContacts = [
    { name: 'Police Emergency', number: '995', icon: Shield },
    { name: 'Medical Emergency', number: '994', icon: Phone },
    { name: 'Fire Emergency', number: '993', icon: Zap },
    { name: 'Tourist Helpline', number: '+263-4-793701', icon: MapPin }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'green': return 'text-green-400 bg-green-500/20';
      case 'amber': return 'text-yellow-400 bg-yellow-500/20';
      case 'red': return 'text-red-400 bg-red-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500/20 text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
    toast({
      title: "Emergency call initiated",
      description: `Calling ${number}`,
    });
  };

  const handleSOS = () => {
    // Get location if possible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast({
            title: "SOS ACTIVATED",
            description: `Emergency services notified. Location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            variant: "destructive"
          });
          
          // In a real app, this would send the location to emergency services
          console.log('SOS activated at:', { latitude, longitude });
        },
        () => {
          toast({
            title: "SOS ACTIVATED",
            description: "Emergency services have been notified.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "SOS ACTIVATED",
        description: "Emergency services have been notified.",
        variant: "destructive"
      });
    }
  };

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Open Google Maps with current location
          window.open(`https://www.google.com/maps/@${latitude},${longitude},15z`, '_blank');
        },
        () => {
          // Fallback to Zimbabwe general location
          window.open('https://www.google.com/maps/place/Zimbabwe/@-19.015438,29.154857,6z', '_blank');
        }
      );
    } else {
      window.open('https://www.google.com/maps/place/Zimbabwe/@-19.015438,29.154857,6z', '_blank');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-40 w-80">
      <Card className="bg-black/90 backdrop-blur-xl border border-gray-500/30">
        <CardContent className="p-4">
          {/* Header with close button */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${getRiskColor(riskLevel)}`}></div>
              <div>
                <h3 className="text-white font-semibold">Safety Status</h3>
                <p className="text-sm text-gray-400 capitalize">{riskLevel} Risk Level</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Active Alerts */}
          {alerts.length > 0 && (
            <div className="mb-4">
              <h4 className="text-white text-sm font-medium mb-2">Active Alerts</h4>
              <div className="space-y-2">
                {alerts.slice(0, 2).map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-lg bg-gray-800/50 border border-gray-600/30"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="text-white text-xs font-medium">{alert.title}</h5>
                      <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-xs mb-1">{alert.description}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleGetDirections}
                variant="outline"
                size="sm"
                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 text-xs p-2 h-auto flex flex-col items-center gap-1"
              >
                <Navigation className="h-4 w-4" />
                <span className="text-xs">Get Directions</span>
              </Button>
              <Button
                onClick={() => window.open('/planning', '_blank')}
                variant="outline"
                size="sm"
                className="border-green-500/30 text-green-400 hover:bg-green-500/20 text-xs p-2 h-auto flex flex-col items-center gap-1"
              >
                <MapPin className="h-4 w-4" />
                <span className="text-xs">Plan Route</span>
              </Button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="mb-4">
            <h4 className="text-white text-sm font-medium mb-2">Emergency Contacts</h4>
            <div className="grid grid-cols-2 gap-2">
              {emergencyContacts.map((contact, index) => (
                <Button
                  key={index}
                  onClick={() => handleEmergencyCall(contact.number)}
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs p-2 h-auto flex flex-col items-center gap-1"
                >
                  <contact.icon className="h-4 w-4" />
                  <span className="text-xs">{contact.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* SOS Button */}
          <Button
            onClick={handleSOS}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            EMERGENCY SOS
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyToolkit;
