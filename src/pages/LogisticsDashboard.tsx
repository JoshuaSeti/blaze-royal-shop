import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Package, CheckCircle, Clock } from 'lucide-react';
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
