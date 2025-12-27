import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Truck, Package, MapPin, Clock, CheckCircle, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

interface TrackingEvent {
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
}

interface TrackedOrder {
  orderNumber: string;
  status: 'in-transit' | 'delivered' | 'processing' | 'picked-up';
  estimatedDelivery: string;
  trackingNumber: string;
  events: TrackingEvent[];
}

const OrderTracking = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // TODO: Re-enable before production
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/auth');
  //   }
  // }, [user, navigate]);

  const mockTracking: TrackedOrder = {
    orderNumber: 'ORD-2024-002',
    status: 'in-transit',
    estimatedDelivery: '2024-01-18',
    trackingNumber: 'TRK123456789',
    events: [
      {
        date: '2024-01-16',
        time: '14:30',
        status: 'In Transit',
        location: 'Distribution Center - City Hub',
        description: 'Package is on the way to your delivery address'
      },
      {
        date: '2024-01-15',
        time: '09:15',
        status: 'Picked Up',
        location: 'Warehouse - Main Facility',
        description: 'Package has been picked up by courier'
      },
      {
        date: '2024-01-14',
        time: '16:45',
        status: 'Processing',
        location: 'Fulfillment Center',
        description: 'Order is being prepared for shipment'
      },
      {
        date: '2024-01-14',
        time: '10:00',
        status: 'Confirmed',
        location: 'Order Processing',
        description: 'Order has been confirmed and is being prepared'
      }
    ]
  };

  const handleTrackOrder = () => {
    if (!trackingNumber.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackedOrder(mockTracking);
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in transit':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'picked up':
        return <Package className="h-5 w-5 text-orange-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <MapPin className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: TrackedOrder['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'picked-up':
        return 'bg-orange-100 text-orange-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // TODO: Re-enable before production
  // if (!user) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/profile" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your tracking number to see the latest updates
            </p>
          </div>

          {/* Tracking Input */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Tracking Information</CardTitle>
              <CardDescription>
                Find your tracking number in your order confirmation email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter tracking number (e.g., TRK123456789)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleTrackOrder} 
                  disabled={loading || !trackingNumber.trim()}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  {loading ? 'Tracking...' : 'Track'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Order {trackedOrder.orderNumber}</CardTitle>
                      <CardDescription>
                        Tracking: {trackedOrder.trackingNumber}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(trackedOrder.status)}>
                      {trackedOrder.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Estimated delivery: {new Date(trackedOrder.estimatedDelivery).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking History</CardTitle>
                  <CardDescription>
                    Latest updates on your package
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {trackedOrder.events.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {getStatusIcon(event.status)}
                          {index < trackedOrder.events.length - 1 && (
                            <div className="w-px h-12 bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{event.status}</h3>
                            <span className="text-sm text-muted-foreground">
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {event.location}
                          </p>
                          <p className="text-sm">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button asChild variant="outline">
                  <Link to="/order-history">View Order History</Link>
                </Button>
                <Button variant="outline">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;