import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
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
}

interface DeliveryOrder {
  id: string;
  order_id: string;
  vendor_id: string;
  buyer_id: string;
  rider_id: string | null;
  status: 'pending' | 'broadcasting' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  pickup_address: string;
  pickup_latitude: number;
  pickup_longitude: number;
  pickup_instructions: string | null;
  delivery_address: string;
  delivery_latitude: number;
  delivery_longitude: number;
  delivery_instructions: string | null;
  zone_id: string | null;
  delivery_fee: number;
  broadcast_at: string | null;
  accepted_at: string | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  created_at: string;
}

export const useRider = () => {
  const { user } = useAuth();
  const [rider, setRider] = useState<Rider | null>(null);
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);
  const [availableOrders, setAvailableOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationWatchId, setLocationWatchId] = useState<number | null>(null);

  // Fetch rider profile
  const fetchRider = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('riders')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching rider:', error);
      }
      
      setRider(data as Rider | null);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch assigned delivery orders
  const fetchDeliveryOrders = useCallback(async () => {
    if (!rider) return;

    try {
      const { data, error } = await supabase
        .from('delivery_orders')
        .select('*')
        .eq('rider_id', rider.id)
        .in('status', ['accepted', 'picked_up', 'in_transit'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching delivery orders:', error);
        return;
      }

      setDeliveryOrders((data as DeliveryOrder[]) || []);
    } catch (err) {
      console.error('Error:', err);
    }
  }, [rider]);

  // Fetch available orders (broadcasts)
  const fetchAvailableOrders = useCallback(async () => {
    if (!rider) return;

    try {
      const { data, error } = await supabase
        .from('order_broadcasts')
        .select(`
          id,
          delivery_order_id,
          status,
          delivery_orders (*)
        `)
        .eq('rider_id', rider.id)
        .eq('status', 'pending');

      if (error) {
        console.error('Error fetching available orders:', error);
        return;
      }

      const orders = data
        ?.map((broadcast: any) => broadcast.delivery_orders)
        .filter(Boolean) as DeliveryOrder[];
      
      setAvailableOrders(orders || []);
    } catch (err) {
      console.error('Error:', err);
    }
  }, [rider]);

  // Update rider status
  const updateStatus = async (status: 'online' | 'offline' | 'busy') => {
    if (!rider) return;

    try {
      const { error } = await supabase
        .from('riders')
        .update({ status })
        .eq('id', rider.id);

      if (error) throw error;

      setRider({ ...rider, status });
      
      if (status === 'online') {
        startLocationTracking();
        toast.success('You are now online and can receive orders');
      } else if (status === 'offline') {
        stopLocationTracking();
        toast.info('You are now offline');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  // Update rider location
  const updateLocation = async (latitude: number, longitude: number) => {
    if (!rider) return;

    try {
      // Update current location in riders table
      await supabase
        .from('riders')
        .update({
          current_latitude: latitude,
          current_longitude: longitude,
          last_location_update: new Date().toISOString()
        })
        .eq('id', rider.id);

      // Insert into location history
      await supabase
        .from('rider_location_history')
        .insert({
          rider_id: rider.id,
          latitude,
          longitude
        });

      setRider(prev => prev ? {
        ...prev,
        current_latitude: latitude,
        current_longitude: longitude,
        last_location_update: new Date().toISOString()
      } : null);
    } catch (err) {
      console.error('Error updating location:', err);
    }
  };

  // Start GPS location tracking
  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        updateLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Error watching position:', error);
        toast.error('Unable to track your location. Please enable location services.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );

    setLocationWatchId(watchId);
  };

  // Stop GPS location tracking
  const stopLocationTracking = () => {
    if (locationWatchId !== null) {
      navigator.geolocation.clearWatch(locationWatchId);
      setLocationWatchId(null);
    }
  };

  // Accept a delivery order
  const acceptOrder = async (deliveryOrderId: string) => {
    if (!rider) return;

    try {
      // Update the delivery order
      const { error: orderError } = await supabase
        .from('delivery_orders')
        .update({
          rider_id: rider.id,
          status: 'accepted',
          accepted_at: new Date().toISOString()
        })
        .eq('id', deliveryOrderId)
        .is('rider_id', null);

      if (orderError) throw orderError;

      // Update the broadcast status
      await supabase
        .from('order_broadcasts')
        .update({
          status: 'accepted',
          responded_at: new Date().toISOString()
        })
        .eq('delivery_order_id', deliveryOrderId)
        .eq('rider_id', rider.id);

      toast.success('Order accepted!');
      fetchDeliveryOrders();
      fetchAvailableOrders();
    } catch (err) {
      console.error('Error accepting order:', err);
      toast.error('Failed to accept order. It may have been taken by another rider.');
    }
  };

  // Decline a delivery order
  const declineOrder = async (deliveryOrderId: string) => {
    if (!rider) return;

    try {
      await supabase
        .from('order_broadcasts')
        .update({
          status: 'declined',
          responded_at: new Date().toISOString()
        })
        .eq('delivery_order_id', deliveryOrderId)
        .eq('rider_id', rider.id);

      toast.info('Order declined');
      fetchAvailableOrders();
    } catch (err) {
      console.error('Error declining order:', err);
    }
  };

  // Update delivery order status
  const updateOrderStatus = async (
    orderId: string, 
    status: 'picked_up' | 'in_transit' | 'delivered'
  ) => {
    try {
      const updateData: any = { status };
      
      if (status === 'picked_up') {
        updateData.picked_up_at = new Date().toISOString();
      } else if (status === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('delivery_orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;

      toast.success(`Order marked as ${status.replace('_', ' ')}`);
      fetchDeliveryOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Failed to update order status');
    }
  };

  // Create rider profile
  const createRiderProfile = async (data: {
    full_name: string;
    phone: string;
    email?: string;
    vehicle_type?: string;
    license_plate?: string;
  }) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('riders')
        .insert({
          user_id: user.id,
          ...data
        });

      if (error) throw error;

      toast.success('Rider profile created successfully!');
      fetchRider();
    } catch (err) {
      console.error('Error creating rider profile:', err);
      toast.error('Failed to create rider profile');
    }
  };

  useEffect(() => {
    fetchRider();
  }, [fetchRider]);

  useEffect(() => {
    if (rider) {
      fetchDeliveryOrders();
      fetchAvailableOrders();

      // Auto-start tracking if rider is online
      if (rider.status === 'online') {
        startLocationTracking();
      }
    }

    return () => {
      stopLocationTracking();
    };
  }, [rider?.id]);

  return {
    rider,
    deliveryOrders,
    availableOrders,
    loading,
    updateStatus,
    updateLocation,
    acceptOrder,
    declineOrder,
    updateOrderStatus,
    createRiderProfile,
    refetch: fetchRider
  };
};