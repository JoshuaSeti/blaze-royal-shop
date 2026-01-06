-- Create enum for rider status
CREATE TYPE public.rider_status AS ENUM ('online', 'offline', 'busy');

-- Create enum for delivery order status
CREATE TYPE public.delivery_status AS ENUM ('pending', 'broadcasting', 'accepted', 'picked_up', 'in_transit', 'delivered', 'cancelled');

-- Create delivery zones table
CREATE TABLE public.delivery_zones (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    base_fee NUMERIC NOT NULL DEFAULT 0,
    polygon JSONB, -- Store zone boundary as GeoJSON polygon
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create riders table
CREATE TABLE public.riders (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    vehicle_type TEXT DEFAULT 'motorcycle',
    license_plate TEXT,
    status rider_status DEFAULT 'offline',
    current_latitude NUMERIC,
    current_longitude NUMERIC,
    last_location_update TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    total_deliveries INTEGER DEFAULT 0,
    rating NUMERIC DEFAULT 5.0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(user_id)
);

-- Create seller pickup locations table
CREATE TABLE public.seller_pickup_locations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    vendor_id UUID NOT NULL,
    address TEXT NOT NULL,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    instructions TEXT,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create delivery orders table
CREATE TABLE public.delivery_orders (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL,
    vendor_id UUID NOT NULL,
    buyer_id UUID NOT NULL,
    rider_id UUID,
    status delivery_status DEFAULT 'pending',
    -- Pickup details
    pickup_address TEXT NOT NULL,
    pickup_latitude NUMERIC NOT NULL,
    pickup_longitude NUMERIC NOT NULL,
    pickup_instructions TEXT,
    -- Delivery details
    delivery_address TEXT NOT NULL,
    delivery_latitude NUMERIC NOT NULL,
    delivery_longitude NUMERIC NOT NULL,
    delivery_instructions TEXT,
    -- Zone and pricing
    zone_id UUID REFERENCES public.delivery_zones(id),
    delivery_fee NUMERIC NOT NULL DEFAULT 0,
    -- Timestamps
    broadcast_at TIMESTAMP WITH TIME ZONE,
    accepted_at TIMESTAMP WITH TIME ZONE,
    picked_up_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create rider location history for tracking
CREATE TABLE public.rider_location_history (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    rider_id UUID NOT NULL REFERENCES public.riders(id) ON DELETE CASCADE,
    latitude NUMERIC NOT NULL,
    longitude NUMERIC NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order broadcasts table (tracks which riders received broadcast)
CREATE TABLE public.order_broadcasts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    delivery_order_id UUID NOT NULL REFERENCES public.delivery_orders(id) ON DELETE CASCADE,
    rider_id UUID NOT NULL REFERENCES public.riders(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- pending, accepted, declined, expired
    broadcast_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    responded_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(delivery_order_id, rider_id)
);

-- Enable RLS on all tables
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.riders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_pickup_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rider_location_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_broadcasts ENABLE ROW LEVEL SECURITY;

-- Delivery zones policies (public read, admin write)
CREATE POLICY "Anyone can view active delivery zones"
ON public.delivery_zones FOR SELECT
USING (is_active = true);

-- Riders policies
CREATE POLICY "Riders can view their own profile"
ON public.riders FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Riders can update their own profile"
ON public.riders FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create rider profile"
ON public.riders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Seller pickup locations policies
CREATE POLICY "Vendors can view their pickup locations"
ON public.seller_pickup_locations FOR SELECT
USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can create pickup locations"
ON public.seller_pickup_locations FOR INSERT
WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update their pickup locations"
ON public.seller_pickup_locations FOR UPDATE
USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can delete their pickup locations"
ON public.seller_pickup_locations FOR DELETE
USING (auth.uid() = vendor_id);

-- Delivery orders policies
CREATE POLICY "Riders can view assigned orders"
ON public.delivery_orders FOR SELECT
USING (
    rider_id = (SELECT id FROM public.riders WHERE user_id = auth.uid())
    OR buyer_id = auth.uid()
    OR vendor_id = auth.uid()
);

CREATE POLICY "Riders can update their assigned orders"
ON public.delivery_orders FOR UPDATE
USING (rider_id = (SELECT id FROM public.riders WHERE user_id = auth.uid()));

-- Rider location history policies
CREATE POLICY "Riders can insert their location"
ON public.rider_location_history FOR INSERT
WITH CHECK (rider_id = (SELECT id FROM public.riders WHERE user_id = auth.uid()));

CREATE POLICY "Riders can view their location history"
ON public.rider_location_history FOR SELECT
USING (rider_id = (SELECT id FROM public.riders WHERE user_id = auth.uid()));

-- Order broadcasts policies
CREATE POLICY "Riders can view their broadcasts"
ON public.order_broadcasts FOR SELECT
USING (rider_id = (SELECT id FROM public.riders WHERE user_id = auth.uid()));

CREATE POLICY "Riders can update their broadcast response"
ON public.order_broadcasts FOR UPDATE
USING (rider_id = (SELECT id FROM public.riders WHERE user_id = auth.uid()));

-- Create triggers for updated_at
CREATE TRIGGER update_delivery_zones_updated_at
BEFORE UPDATE ON public.delivery_zones
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_riders_updated_at
BEFORE UPDATE ON public.riders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seller_pickup_locations_updated_at
BEFORE UPDATE ON public.seller_pickup_locations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_delivery_orders_updated_at
BEFORE UPDATE ON public.delivery_orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for riders table (for location tracking)
ALTER TABLE public.riders REPLICA IDENTITY FULL;

-- Insert default delivery zones
INSERT INTO public.delivery_zones (name, description, base_fee) VALUES
('Zone A', 'City Center - 0-5km radius', 500),
('Zone B', 'Inner Suburbs - 5-10km radius', 800),
('Zone C', 'Outer Suburbs - 10-20km radius', 1200);