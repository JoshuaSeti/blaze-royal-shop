import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Package, CheckCircle, Clock, Navigation, Sparkles, Truck, Bike, Car, DollarSign, Timer, Route, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';

interface Delivery {
  id: string;
  orderNumber: string;
  customer: string;
  address: string;
  distance: string;
  status: 'pending' | 'in-transit' | 'delivered';
  earnings: number;
}

const LogisticsDashboard = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', address: 'Lusaka, Zambia', distance: '5.2 km', status: 'pending', earnings: 15.00 },
    { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', address: 'Ndola, Zambia', distance: '8.5 km', status: 'in-transit', earnings: 25.00 },
  ]);

  const handleAccept = (id: string) => {
    setDeliveries(deliveries.map(d => d.id === id ? { ...d, status: 'in-transit' as const } : d));
    toast.success('Delivery accepted');
  };

  const handleComplete = (id: string) => {
    setDeliveries(deliveries.map(d => d.id === id ? { ...d, status: 'delivered' as const } : d));
    toast.success('Delivery completed');
  };

  const getStatusColor = (status: Delivery['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Delivery Dashboard</h1>
          <p className="text-muted-foreground">Manage your deliveries and track earnings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveries.filter(d => d.status === 'pending').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveries.filter(d => d.status === 'in-transit').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${deliveries.reduce((sum, d) => sum + d.earnings, 0).toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Intelligent Routing Section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Intelligent Routing
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-powered route optimization and logistics recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map Placeholder */}
              <div className="relative rounded-lg overflow-hidden border bg-muted/50 min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50">
                  {/* Simulated map with route */}
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Route line */}
                    <path 
                      d="M 50 250 Q 100 200 150 180 T 250 120 T 350 80" 
                      fill="none" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth="3" 
                      strokeDasharray="8,4"
                      className="animate-pulse"
                    />
                    
                    {/* Start point */}
                    <circle cx="50" cy="250" r="8" fill="hsl(var(--primary))" />
                    <text x="60" y="270" fontSize="10" fill="currentColor" className="text-muted-foreground">Warehouse</text>
                    
                    {/* Waypoints */}
                    <circle cx="150" cy="180" r="5" fill="hsl(var(--primary))" fillOpacity="0.6" />
                    <circle cx="250" cy="120" r="5" fill="hsl(var(--primary))" fillOpacity="0.6" />
                    
                    {/* End point */}
                    <circle cx="350" cy="80" r="8" fill="#22c55e" />
                    <text x="300" y="70" fontSize="10" fill="currentColor" className="text-muted-foreground">Destination</text>
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-background/90 backdrop-blur-sm rounded-md p-3 border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Lusaka → Ndola Route</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Optimized</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">328 km • Est. 4h 15min</p>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Route className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Recommended Route</p>
                      <p className="text-xs text-muted-foreground">AI-optimized path</p>
                    </div>
                  </div>
                  <p className="text-sm">Take the <span className="font-medium text-primary">T3 Highway via Kabwe</span> - 12% faster than alternative routes with current traffic conditions.</p>
                </div>

                <div className="p-4 rounded-lg bg-background border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Best Logistics Partner</p>
                      <p className="text-xs text-muted-foreground">Based on cost & reliability</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">SwiftDeliver Zambia</p>
                      <p className="text-xs text-muted-foreground">98.5% on-time delivery rate</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Best Match</Badge>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                      <Car className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Recommended Method</p>
                      <p className="text-xs text-muted-foreground">Optimal for this parcel</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded border bg-muted/30">
                      <Bike className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Bike</p>
                    </div>
                    <div className="p-2 rounded border-2 border-primary bg-primary/5">
                      <Car className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-medium text-primary">Car</p>
                    </div>
                    <div className="p-2 rounded border bg-muted/30">
                      <Truck className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Truck</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Cost Savings</span>
                    </div>
                    <p className="text-lg font-bold text-green-700 mt-1">K45.00</p>
                    <p className="text-xs text-green-600">vs. standard routing</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Time Saved</span>
                    </div>
                    <p className="text-lg font-bold text-blue-700 mt-1">38 min</p>
                    <p className="text-xs text-blue-600">vs. standard routing</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Deliveries</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-transit">In Transit</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {deliveries.map((delivery) => (
              <Card key={delivery.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{delivery.orderNumber}</CardTitle>
                      <CardDescription>{delivery.customer}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(delivery.status)}>
                      {delivery.status.replace('-', ' ').charAt(0).toUpperCase() + delivery.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{delivery.address} • {delivery.distance}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-semibold text-lg">${delivery.earnings.toFixed(2)}</p>
                      <div className="flex gap-2">
                        {delivery.status === 'pending' && (
                          <Button size="sm" onClick={() => handleAccept(delivery.id)}>
                            Accept Delivery
                          </Button>
                        )}
                        {delivery.status === 'in-transit' && (
                          <Button size="sm" onClick={() => handleComplete(delivery.id)}>
                            Mark as Delivered
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/logistics/earnings">View Earnings Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDashboard;
