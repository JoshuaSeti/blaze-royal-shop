import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import MapboxMap from "./MapboxMap";
import { useDeliveryZones } from "@/hooks/useDeliveryZones";

interface DeliveryLocationPickerProps {
  onLocationSelect: (location: {
    address: string;
    latitude: number;
    longitude: number;
    zoneId: string | null;
    deliveryFee: number;
  }) => void;
}

const DeliveryLocationPicker = ({ onLocationSelect }: DeliveryLocationPickerProps) => {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const { calculateDeliveryFee } = useDeliveryZones();

  const handleMapClick = (lat: number, lng: number, addr?: string) => {
    setSelectedLocation({ lat, lng });
    setAddress(addr || `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation({ lat: latitude, lng: longitude });
          setAddress(`Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleConfirmLocation = () => {
    if (selectedLocation && address) {
      const { zoneId, fee } = calculateDeliveryFee(selectedLocation.lat, selectedLocation.lng);
      onLocationSelect({
        address,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        zoneId,
        deliveryFee: fee,
      });
    }
  };

  const { fee } = selectedLocation 
    ? calculateDeliveryFee(selectedLocation.lat, selectedLocation.lng) 
    : { fee: 0 };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select Delivery Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="delivery-address">Delivery Address</Label>
          <Input
            id="delivery-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address or select on map"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleUseCurrentLocation}
          disabled={isLocating}
        >
          <Navigation className="h-4 w-4 mr-2" />
          {isLocating ? "Getting location..." : "Use Current Location"}
        </Button>

        <div className="h-64 rounded-lg overflow-hidden border">
          <MapboxMap
            onLocationSelect={(lat, lng) => handleMapClick(lat, lng)}
            markers={selectedLocation ? [{ lat: selectedLocation.lat, lng: selectedLocation.lng, label: "Delivery" }] : []}
            initialLatitude={selectedLocation?.lat}
            initialLongitude={selectedLocation?.lng}
          />
        </div>

        {selectedLocation && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Delivery Fee:</span>
              <span className="font-bold text-primary">K{fee.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Button
          type="button"
          className="w-full"
          onClick={handleConfirmLocation}
          disabled={!selectedLocation || !address}
        >
          Confirm Delivery Location
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeliveryLocationPicker;
