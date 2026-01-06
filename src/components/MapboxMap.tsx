import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

interface MapboxMapProps {
  onLocationSelect?: (lat: number, lng: number, address: string) => void;
  initialLatitude?: number;
  initialLongitude?: number;
  showSearch?: boolean;
  markers?: Array<{ lat: number; lng: number; color?: string; label?: string }>;
  height?: string;
  interactive?: boolean;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  onLocationSelect,
  initialLatitude = -15.4167,
  initialLongitude = 28.2833,
  showSearch = true,
  markers = [],
  height = '400px',
  interactive = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenEntered, setTokenEntered] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [initialLongitude, initialLatitude],
        zoom: 12,
        interactive
      });

      // Add navigation controls
      if (interactive) {
        map.current.addControl(
          new mapboxgl.NavigationControl(),
          'top-right'
        );

        // Add geolocate control
        const geolocate = new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        });
        map.current.addControl(geolocate);
      }

      // Add initial marker if coordinates provided
      if (initialLatitude && initialLongitude) {
        markerRef.current = new mapboxgl.Marker({ color: '#ef4444' })
          .setLngLat([initialLongitude, initialLatitude])
          .addTo(map.current);
      }

      // Add additional markers
      markers.forEach((marker) => {
        new mapboxgl.Marker({ color: marker.color || '#3b82f6' })
          .setLngLat([marker.lng, marker.lat])
          .setPopup(marker.label ? new mapboxgl.Popup().setText(marker.label) : undefined)
          .addTo(map.current!);
      });

      // Handle map clicks for location selection
      if (onLocationSelect && interactive) {
        map.current.on('click', async (e) => {
          const { lng, lat } = e.lngLat;
          
          // Update or create marker
          if (markerRef.current) {
            markerRef.current.setLngLat([lng, lat]);
          } else {
            markerRef.current = new mapboxgl.Marker({ color: '#ef4444' })
              .setLngLat([lng, lat])
              .addTo(map.current!);
          }

          // Reverse geocode to get address
          setIsLoading(true);
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
            );
            const data = await response.json();
            const address = data.features?.[0]?.place_name || 'Unknown location';
            setSelectedAddress(address);
            onLocationSelect(lat, lng, address);
          } catch (error) {
            console.error('Geocoding error:', error);
            onLocationSelect(lat, lng, 'Selected location');
          } finally {
            setIsLoading(false);
          }
        });
      }

      setTokenEntered(true);
    } catch (error) {
      console.error('Error initializing map:', error);
      setTokenEntered(false);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      initializeMap();
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 15
          });

          if (markerRef.current) {
            markerRef.current.setLngLat([longitude, latitude]);
          } else {
            markerRef.current = new mapboxgl.Marker({ color: '#ef4444' })
              .setLngLat([longitude, latitude])
              .addTo(map.current);
          }

          // Reverse geocode
          if (onLocationSelect) {
            try {
              const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`
              );
              const data = await response.json();
              const address = data.features?.[0]?.place_name || 'Current location';
              setSelectedAddress(address);
              onLocationSelect(latitude, longitude, address);
            } catch (error) {
              onLocationSelect(latitude, longitude, 'Current location');
            }
          }
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to get your location');
      },
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (mapboxToken && !tokenEntered) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!tokenEntered && !mapboxToken) {
    return (
      <div className="p-6 border rounded-lg bg-muted/50" style={{ minHeight: height }}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">Mapbox Configuration Required</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to enable the map. Get one at{' '}
            <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              mapbox.com
            </a>
          </p>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
          </div>
          <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
            Enable Map
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden" />
      
      {showSearch && interactive && (
        <div className="absolute top-3 left-3 right-3 z-10">
          <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getCurrentLocation}
                className="shrink-0"
              >
                <Navigation className="h-4 w-4 mr-1" />
                Use My Location
              </Button>
              {isLoading && <span className="text-sm text-muted-foreground">Loading...</span>}
            </div>
            {selectedAddress && (
              <p className="text-sm text-muted-foreground mt-2 truncate">
                <MapPin className="h-3 w-3 inline mr-1" />
                {selectedAddress}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;