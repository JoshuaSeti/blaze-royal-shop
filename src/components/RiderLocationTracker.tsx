import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Signal, SignalZero } from 'lucide-react';

interface RiderLocationTrackerProps {
  status: 'online' | 'offline' | 'busy';
  latitude: number | null;
  longitude: number | null;
  lastUpdate: string | null;
  onGoOnline: () => void;
  onGoOffline: () => void;
}

const RiderLocationTracker: React.FC<RiderLocationTrackerProps> = ({
  status,
  latitude,
  longitude,
  lastUpdate,
  onGoOnline,
  onGoOffline
}) => {
  const isTracking = status === 'online' || status === 'busy';
  
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
    }
  };

  const formatLastUpdate = () => {
    if (!lastUpdate) return 'Never';
    const date = new Date(lastUpdate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    return date.toLocaleTimeString();
  };

  return (
    <Card className={`border-2 ${isTracking ? 'border-green-500/50 bg-green-50/30' : 'border-muted'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${getStatusColor()} ${isTracking ? 'animate-pulse' : ''}`} />
            <div>
              <p className="font-medium capitalize">{status}</p>
              <p className="text-xs text-muted-foreground">
                {isTracking ? (
                  <span className="flex items-center gap-1">
                    <Signal className="h-3 w-3 text-green-500" />
                    Location tracking active
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <SignalZero className="h-3 w-3" />
                    Location tracking off
                  </span>
                )}
              </p>
            </div>
          </div>

          {status === 'offline' ? (
            <Button onClick={onGoOnline} size="sm" className="bg-green-600 hover:bg-green-700">
              <Navigation className="h-4 w-4 mr-1" />
              Go Online
            </Button>
          ) : status === 'online' ? (
            <Button onClick={onGoOffline} variant="outline" size="sm">
              Go Offline
            </Button>
          ) : null}
        </div>

        {isTracking && latitude && longitude && (
          <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Updated {formatLastUpdate()}
            </Badge>
          </div>
        )}

        {!isTracking && (
          <p className="mt-3 text-sm text-muted-foreground">
            ⚠️ You must be online to receive delivery orders
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RiderLocationTracker;