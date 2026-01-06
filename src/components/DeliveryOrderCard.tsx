import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Package, Navigation, Clock, DollarSign, CheckCircle, Truck } from 'lucide-react';

interface DeliveryOrderCardProps {
  order: {
    id: string;
    order_id: string;
    status: string;
    pickup_address: string;
    pickup_latitude: number;
    pickup_longitude: number;
    pickup_instructions?: string | null;
    delivery_address: string;
    delivery_latitude: number;
    delivery_longitude: number;
    delivery_instructions?: string | null;
    delivery_fee: number;
    created_at: string;
  };
  type: 'available' | 'active';
  onAccept?: () => void;
  onDecline?: () => void;
  onPickedUp?: () => void;
  onDelivered?: () => void;
  onNavigate?: (lat: number, lng: number) => void;
}

const DeliveryOrderCard: React.FC<DeliveryOrderCardProps> = ({
  order,
  type,
  onAccept,
  onDecline,
  onPickedUp,
  onDelivered,
  onNavigate
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
      case 'broadcasting':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-blue-100 text-blue-800';
      case 'picked_up':
      case 'in_transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Calculate rough distance (placeholder - in production use proper distance calculation)
  const calculateDistance = () => {
    const lat1 = order.pickup_latitude;
    const lon1 = order.pickup_longitude;
    const lat2 = order.delivery_latitude;
    const lon2 = order.delivery_longitude;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const handleNavigate = (lat: number, lng: number) => {
    if (onNavigate) {
      onNavigate(lat, lng);
    } else {
      // Open in Google Maps
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    }
  };

  return (
    <Card className={type === 'available' ? 'border-primary/50 bg-primary/5' : ''}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Package className="h-4 w-4" />
            Order #{order.order_id.slice(0, 8)}
          </CardTitle>
          <Badge className={getStatusColor(order.status)}>
            {formatStatus(order.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pickup Location */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-green-600">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Pickup
          </div>
          <p className="text-sm text-muted-foreground pl-4">{order.pickup_address}</p>
          {order.pickup_instructions && (
            <p className="text-xs text-muted-foreground pl-4 italic">{order.pickup_instructions}</p>
          )}
          {type === 'active' && order.status === 'accepted' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2"
              onClick={() => handleNavigate(order.pickup_latitude, order.pickup_longitude)}
            >
              <Navigation className="h-3 w-3 mr-1" />
              Navigate
            </Button>
          )}
        </div>

        {/* Delivery Location */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-red-600">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Delivery
          </div>
          <p className="text-sm text-muted-foreground pl-4">{order.delivery_address}</p>
          {order.delivery_instructions && (
            <p className="text-xs text-muted-foreground pl-4 italic">{order.delivery_instructions}</p>
          )}
          {type === 'active' && (order.status === 'picked_up' || order.status === 'in_transit') && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2"
              onClick={() => handleNavigate(order.delivery_latitude, order.delivery_longitude)}
            >
              <Navigation className="h-3 w-3 mr-1" />
              Navigate
            </Button>
          )}
        </div>

        {/* Order Info */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {calculateDistance()} km
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(order.created_at).toLocaleTimeString()}
            </span>
          </div>
          <div className="text-lg font-bold text-primary flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            K{Number(order.delivery_fee).toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {type === 'available' && (
            <>
              <Button className="flex-1" onClick={onAccept}>
                <CheckCircle className="h-4 w-4 mr-1" />
                Accept
              </Button>
              <Button variant="outline" onClick={onDecline}>
                Decline
              </Button>
            </>
          )}
          
          {type === 'active' && order.status === 'accepted' && (
            <Button className="w-full" onClick={onPickedUp}>
              <Package className="h-4 w-4 mr-1" />
              Mark as Picked Up
            </Button>
          )}
          
          {type === 'active' && (order.status === 'picked_up' || order.status === 'in_transit') && (
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={onDelivered}>
              <Truck className="h-4 w-4 mr-1" />
              Mark as Delivered
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryOrderCard;