-- Create auctions table
CREATE TABLE public.auctions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL,
  starting_price NUMERIC NOT NULL,
  current_price NUMERIC NOT NULL,
  reserve_price NUMERIC,
  min_bid_increment NUMERIC NOT NULL DEFAULT 1,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('pending', 'active', 'ended', 'cancelled')),
  winner_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create auction bids table
CREATE TABLE public.auction_bids (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  auction_id UUID NOT NULL REFERENCES public.auctions(id) ON DELETE CASCADE,
  bidder_id UUID NOT NULL,
  bid_amount NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create promocodes table for vendor promo codes
CREATE TABLE public.promocodes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id UUID NOT NULL,
  code TEXT NOT NULL,
  benefit_type TEXT NOT NULL CHECK (benefit_type IN ('discount_percent', 'discount_amount', 'free_delivery', 'buy_x_get_y')),
  benefit_value NUMERIC,
  min_order_amount NUMERIC,
  max_uses INTEGER,
  uses_count INTEGER DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  product_ids UUID[],
  influencer_pin TEXT,
  influencer_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(vendor_id, code)
);

-- Create promocode usage tracking table
CREATE TABLE public.promocode_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  promocode_id UUID NOT NULL REFERENCES public.promocodes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  order_id UUID,
  discount_applied NUMERIC,
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create promotion campaigns table
CREATE TABLE public.promotion_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  banner_url TEXT,
  discount_type TEXT CHECK (discount_type IN ('percent', 'amount')),
  discount_value NUMERIC,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'ended')),
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create promotion campaign products (products under a promotion)
CREATE TABLE public.promotion_campaign_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.promotion_campaigns(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(campaign_id, product_id)
);

-- Add discount fields to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS original_price NUMERIC,
ADD COLUMN IF NOT EXISTS discount_percent NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS discount_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS discount_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_auction BOOLEAN DEFAULT false;

-- Enable RLS on all new tables
ALTER TABLE public.auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auction_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promocodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promocode_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotion_campaign_products ENABLE ROW LEVEL SECURITY;

-- Auctions policies
CREATE POLICY "Anyone can view active auctions" ON public.auctions FOR SELECT USING (true);
CREATE POLICY "Vendors can create auctions" ON public.auctions FOR INSERT WITH CHECK (auth.uid() = vendor_id);
CREATE POLICY "Vendors can update their auctions" ON public.auctions FOR UPDATE USING (auth.uid() = vendor_id);
CREATE POLICY "Vendors can delete their auctions" ON public.auctions FOR DELETE USING (auth.uid() = vendor_id);

-- Auction bids policies
CREATE POLICY "Anyone can view bids" ON public.auction_bids FOR SELECT USING (true);
CREATE POLICY "Authenticated users can place bids" ON public.auction_bids FOR INSERT WITH CHECK (auth.uid() = bidder_id);

-- Promocodes policies
CREATE POLICY "Vendors can view their promocodes" ON public.promocodes FOR SELECT USING (auth.uid() = vendor_id OR influencer_pin IS NOT NULL);
CREATE POLICY "Vendors can create promocodes" ON public.promocodes FOR INSERT WITH CHECK (auth.uid() = vendor_id);
CREATE POLICY "Vendors can update their promocodes" ON public.promocodes FOR UPDATE USING (auth.uid() = vendor_id);
CREATE POLICY "Vendors can delete their promocodes" ON public.promocodes FOR DELETE USING (auth.uid() = vendor_id);

-- Promocode usage policies
CREATE POLICY "Users can view their own usage" ON public.promocode_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can record usage" ON public.promocode_usage FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Promotion campaigns policies (public read, admin write)
CREATE POLICY "Anyone can view campaigns" ON public.promotion_campaigns FOR SELECT USING (true);
CREATE POLICY "Admins can manage campaigns" ON public.promotion_campaigns FOR ALL USING (true);

-- Promotion campaign products policies
CREATE POLICY "Anyone can view campaign products" ON public.promotion_campaign_products FOR SELECT USING (true);
CREATE POLICY "Vendors can add their products to campaigns" ON public.promotion_campaign_products FOR INSERT WITH CHECK (auth.uid() = vendor_id);
CREATE POLICY "Vendors can remove their products from campaigns" ON public.promotion_campaign_products FOR DELETE USING (auth.uid() = vendor_id);

-- Create updated_at trigger for new tables
CREATE TRIGGER update_auctions_updated_at BEFORE UPDATE ON public.auctions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_promocodes_updated_at BEFORE UPDATE ON public.promocodes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_promotion_campaigns_updated_at BEFORE UPDATE ON public.promotion_campaigns FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();