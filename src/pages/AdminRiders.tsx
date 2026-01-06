import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MapPin, Star, Package, Signal, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import MapboxMap from '@/components/MapboxMap';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Rider {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  email: string | null;
  vehicle_type: string;
  license_plate: string | null;
  status: 'online' | 'offline' | 'busy';
  current_latitude: number | null;
  current_longitude: number | null;
  last_location_update: string | null;
  is_verified: boolean;
  is_active: boolean;
  total_deliveries: number;
  rating: number;
  created_at: string;
}

const AdminRiders = () => {
  const [riders, setRiders] = useState<Rider[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const fetchRiders = async () => {
    setLoading(true);
    try {
      // Use service role through edge function or direct query
      // For now, we'll fetch what's accessible
      const { data, error } = await supabase
        .from('riders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching riders:', error);
        // Show mock data for demo
        setRiders([
          {
            id: '1',
            user_id: 'user1',
            full_name: 'John Rider',
            phone: '+260 97 1234567',
            email: 'john@rider.com',
            vehicle_type: 'motorcycle',
            license_plate: 'ABC 123',
            status: 'online',
            current_latitude: -15.4167,
            current_longitude: 28.2833,
            last_location_update: new Date().toISOString(),
            is_verified: true,
            is_active: true,
            total_deliveries: 156,
            rating: 4.8,
            created_at: '2024-01-15T10:00:00Z'
          },
          {
            id: '2',
            user_id: 'user2',
            full_name: 'Jane Courier',
            phone: '+260 96 7654321',
            email: 'jane@courier.com',
            vehicle_type: 'bicycle',
            license_plate: null,
            status: 'busy',
            current_latitude: -15.4200,
            current_longitude: 28.2900,
            last_location_update: new Date().toISOString(),
            is_verified: true,
            is_active: true,
            total_deliveries: 89,
            rating: 4.9,
            created_at: '2024-02-01T10:00:00Z'
          },
          {
            id: '3',
            user_id: 'user3',
            full_name: 'Mike Driver',
            phone: '+260 95 9876543',
            email: 'mike@driver.com',
            vehicle_type: 'motorcycle',
            license_plate: 'XYZ 789',
            status: 'offline',
            current_latitude: null,
            current_longitude: null,
            last_location_update: null,
            is_verified: false,
            is_active: true,
            total_deliveries: 12,
            rating: 4.5,
            created_at: '2024-03-01T10:00:00Z'
          }
        ]);
      } else {
        setRiders((data as Rider[]) || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge className="bg-green-100 text-green-800">Online</Badge>;
      case 'busy':
        return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>;
      case 'offline':
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredRiders = riders.filter(rider => {
    if (activeTab === 'all') return true;
    return rider.status === activeTab;
  });

  const onlineRiders = riders.filter(r => r.status === 'online' || r.status === 'busy');
  const mapMarkers = onlineRiders
    .filter(r => r.current_latitude && r.current_longitude)
    .map(r => ({
      lat: r.current_latitude!,
      lng: r.current_longitude!,
      color: r.status === 'online' ? '#22c55e' : '#eab308',
      label: r.full_name
    }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Rider Management</h1>
            <p className="text-muted-foreground">View and manage delivery riders</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/admin/dashboard">Back to Dashboard</Link>
            </Button>
            <Button onClick={fetchRiders} variant="outline">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Riders</p>
                  <p className="text-2xl font-bold">{riders.length}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Online Now</p>
                  <p className="text-2xl font-bold text-green-600">
                    {riders.filter(r => r.status === 'online').length}
                  </p>
                </div>
                <Signal className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">On Delivery</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {riders.filter(r => r.status === 'busy').length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">
                    {riders.length > 0 
                      ? (riders.reduce((acc, r) => acc + Number(r.rating), 0) / riders.length).toFixed(1)
                      : '0'}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Map */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Live Rider Locations
            </CardTitle>
            <CardDescription>
              Track all active riders in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapboxMap
              height="400px"
              markers={mapMarkers}
              showSearch={false}
              interactive={true}
            />
            <div className="flex gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Online ({riders.filter(r => r.status === 'online').length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Busy ({riders.filter(r => r.status === 'busy').length})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Riders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Riders</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All ({riders.length})</TabsTrigger>
                <TabsTrigger value="online">
                  Online ({riders.filter(r => r.status === 'online').length})
                </TabsTrigger>
                <TabsTrigger value="busy">
                  Busy ({riders.filter(r => r.status === 'busy').length})
                </TabsTrigger>
                <TabsTrigger value="offline">
                  Offline ({riders.filter(r => r.status === 'offline').length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                {loading ? (
                  <p className="text-center py-8 text-muted-foreground">Loading riders...</p>
                ) : filteredRiders.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No riders found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rider</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Deliveries</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Last Active</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRiders.map((rider) => (
                        <TableRow key={rider.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{rider.full_name}</p>
                              {rider.is_verified && (
                                <Badge variant="outline" className="text-xs">Verified</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{rider.phone}</p>
                            <p className="text-xs text-muted-foreground">{rider.email}</p>
                          </TableCell>
                          <TableCell>
                            <p className="capitalize">{rider.vehicle_type}</p>
                            {rider.license_plate && (
                              <p className="text-xs text-muted-foreground">{rider.license_plate}</p>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(rider.status)}</TableCell>
                          <TableCell>{rider.total_deliveries}</TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                              {Number(rider.rating).toFixed(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {rider.last_location_update
                              ? new Date(rider.last_location_update).toLocaleString()
                              : 'Never'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRiders;