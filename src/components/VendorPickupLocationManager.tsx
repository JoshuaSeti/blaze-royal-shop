import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Trash2, Star, Navigation } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import MapboxMap from "./MapboxMap";

interface PickupLocation {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  instructions: string | null;
  is_default: boolean;
}

const VendorPickupLocationManager = () => {
  const { user } = useAuth();
  const [locations, setLocations] = useState<PickupLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocation, setNewLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
    instructions: "",
  });
  const [selectedMapLocation, setSelectedMapLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (user) {
      fetchLocations();
    }
  }, [user]);

  const fetchLocations = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("seller_pickup_locations")
        .select("*")
        .eq("vendor_id", user.id)
        .order("is_default", { ascending: false });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error("Error fetching pickup locations:", error);
      toast.error("Failed to load pickup locations");
    } finally {
      setLoading(false);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedMapLocation({ lat, lng });
    setNewLocation(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address: `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    }));
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedMapLocation({ lat: latitude, lng: longitude });
          setNewLocation(prev => ({
            ...prev,
            latitude,
            longitude,
            address: `Current Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Failed to get current location");
        }
      );
    }
  };

  const handleAddLocation = async () => {
    if (!user || !newLocation.address || newLocation.latitude === 0) {
      toast.error("Please select a location on the map");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("seller_pickup_locations")
        .insert([{
          vendor_id: user.id,
          address: newLocation.address,
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
          instructions: newLocation.instructions || null,
          is_default: locations.length === 0,
        }])
        .select()
        .single();

      if (error) throw error;

      setLocations(prev => [...prev, data]);
      setShowAddForm(false);
      setNewLocation({ address: "", latitude: 0, longitude: 0, instructions: "" });
      setSelectedMapLocation(null);
      toast.success("Pickup location added");
    } catch (error) {
      console.error("Error adding pickup location:", error);
      toast.error("Failed to add pickup location");
    }
  };

  const handleSetDefault = async (locationId: string) => {
    if (!user) return;

    try {
      // First, unset all defaults
      await supabase
        .from("seller_pickup_locations")
        .update({ is_default: false })
        .eq("vendor_id", user.id);

      // Then set the new default
      const { error } = await supabase
        .from("seller_pickup_locations")
        .update({ is_default: true })
        .eq("id", locationId);

      if (error) throw error;

      setLocations(prev =>
        prev.map(loc => ({
          ...loc,
          is_default: loc.id === locationId,
        }))
      );
      toast.success("Default location updated");
    } catch (error) {
      console.error("Error setting default location:", error);
      toast.error("Failed to update default location");
    }
  };

  const handleDeleteLocation = async (locationId: string) => {
    try {
      const { error } = await supabase
        .from("seller_pickup_locations")
        .delete()
        .eq("id", locationId);

      if (error) throw error;

      setLocations(prev => prev.filter(loc => loc.id !== locationId));
      toast.success("Pickup location deleted");
    } catch (error) {
      console.error("Error deleting pickup location:", error);
      toast.error("Failed to delete pickup location");
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Pickup Locations
        </CardTitle>
        <CardDescription>
          Manage where riders will pick up orders from your store
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {locations.length === 0 && !showAddForm && (
          <div className="text-center py-8 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No pickup locations configured</p>
            <p className="text-sm">Add your store location so riders can pick up orders</p>
          </div>
        )}

        {locations.map((location) => (
          <div
            key={location.id}
            className="flex items-start justify-between p-4 border rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{location.address}</span>
                {location.is_default && (
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1" />
                    Default
                  </Badge>
                )}
              </div>
              {location.instructions && (
                <p className="text-sm text-muted-foreground">{location.instructions}</p>
              )}
            </div>
            <div className="flex gap-2">
              {!location.is_default && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSetDefault(location.id)}
                >
                  Set Default
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteLocation(location.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}

        {showAddForm ? (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={newLocation.address}
                onChange={(e) => setNewLocation(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter pickup address"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleUseCurrentLocation}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>

            <div className="h-48 rounded-lg overflow-hidden border">
              <MapboxMap
                onLocationSelect={(lat, lng) => handleMapClick(lat, lng)}
                markers={selectedMapLocation ? [{ lat: selectedMapLocation.lat, lng: selectedMapLocation.lng, label: "Pickup" }] : []}
                initialLatitude={selectedMapLocation?.lat}
                initialLongitude={selectedMapLocation?.lng}
                height="100%"
              />
            </div>

            <div className="space-y-2">
              <Label>Pickup Instructions (optional)</Label>
              <Textarea
                value={newLocation.instructions}
                onChange={(e) => setNewLocation(prev => ({ ...prev, instructions: e.target.value }))}
                placeholder="e.g., Ring the bell at the back door"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddLocation} disabled={!newLocation.latitude}>
                Save Location
              </Button>
              <Button variant="outline" onClick={() => {
                setShowAddForm(false);
                setSelectedMapLocation(null);
                setNewLocation({ address: "", latitude: 0, longitude: 0, instructions: "" });
              }}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Pickup Location
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorPickupLocationManager;
