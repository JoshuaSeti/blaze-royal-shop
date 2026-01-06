import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Package, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import RiderLocationTracker from '@/components/RiderLocationTracker';
import DeliveryOrderCard from '@/components/DeliveryOrderCard';
import { useRider } from '@/hooks/useRider';
import { Button } from '@/components/ui/button';

const LogisticsDashboard = () => {
  const {
    rider,
    deliveryOrders,
    availableOrders,
    loading,
    updateStatus,
    acceptOrder,
    declineOrder,
    updateOrderStatus
  } = useRider();

  // Mock data for demo when no rider profile exists
  const mockDeliveries = [
    { id: '1', order_id: 'ORD-001', status: 'accepted', pickup_address: 'Cairo Road, Lusaka', pickup_latitude: -15.4167, pickup_longitude: 28.2833, delivery_address: 'Kabulonga, Lusaka', delivery_latitude: -15.4300, delivery_longitude: 28.3000, delivery_fee: 500, created_at: new Date().toISOString() },
  ];

  const activeOrders = rider ? deliveryOrders : mockDeliveries;
  const pendingOrders = rider ? availableOrders : [];

  const todayEarnings = activeOrders
    .filter((o: any) => o.status === 'delivered')
    .reduce((sum: number, o: any) => sum + Number(o.delivery_fee), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Rider Dashboard</h1>
          <p className="text-muted-foreground">Manage your deliveries and track earnings</p>
        </div>

        {/* Location Tracker */}
        <div className="mb-6">
          <RiderLocationTracker
            status={rider?.status || 'offline'}
            latitude={rider?.current_latitude || null}
            longitude={rider?.current_longitude || null}
            lastUpdate={rider?.last_location_update || null}
            onGoOnline={() => updateStatus('online')}
            onGoOffline={() => updateStatus('offline')}
          />
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deliveries</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeOrders.filter((o: any) => o.status !== 'delivered').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">K{todayEarnings.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available">
              Available ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeOrders.filter((o: any) => o.status !== 'delivered').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {pendingOrders.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  {rider?.status === 'online' 
                    ? 'No available orders right now. Stay online to receive new orders.'
                    : 'Go online to start receiving delivery orders.'}
                </CardContent>
              </Card>
            ) : (
              pendingOrders.map((order: any) => (
                <DeliveryOrderCard
                  key={order.id}
                  order={order}
                  type="available"
                  onAccept={() => acceptOrder(order.id)}
                  onDecline={() => declineOrder(order.id)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.filter((o: any) => o.status !== 'delivered').length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No active deliveries. Accept an order to get started.
                </CardContent>
              </Card>
            ) : (
              activeOrders
                .filter((o: any) => o.status !== 'delivered')
                .map((order: any) => (
                  <DeliveryOrderCard
                    key={order.id}
                    order={order}
                    type="active"
                    onPickedUp={() => updateOrderStatus(order.id, 'picked_up')}
                    onDelivered={() => updateOrderStatus(order.id, 'delivered')}
                  />
                ))
            )}
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