import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Settings, MapPin, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VendorPickupLocationManager from "@/components/VendorPickupLocationManager";

const VendorSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/vendor")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Vendor Settings</h1>
              <p className="text-muted-foreground">Manage your store settings and pickup locations</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="pickup" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pickup" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Pickup Locations
            </TabsTrigger>
            <TabsTrigger value="store" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Store Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pickup" className="space-y-6">
            <VendorPickupLocationManager />
          </TabsContent>

          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Update your store details and business information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Store settings coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorSettings;
