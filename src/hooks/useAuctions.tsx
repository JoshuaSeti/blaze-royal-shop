import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Auction {
  id: string;
  product_id: string;
  vendor_id: string;
  starting_price: number;
  current_price: number;
  reserve_price: number | null;
  min_bid_increment: number;
  start_time: string;
  end_time: string;
  status: 'pending' | 'active' | 'ended' | 'cancelled';
  winner_id: string | null;
  created_at: string;
  updated_at: string;
  product?: {
    name: string;
    image_url: string | null;
    description: string | null;
  };
}

export interface AuctionBid {
  id: string;
  auction_id: string;
  bidder_id: string;
  bid_amount: number;
  created_at: string;
}

export const useAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuctions = async () => {
    try {
      const { data, error } = await supabase
        .from("auctions")
        .select(`
          *,
          product:products (
            name,
            image_url,
            description
          )
        `)
        .eq("status", "active")
        .order("end_time", { ascending: true });

      if (error) throw error;
      setAuctions(data as Auction[]);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return { auctions, loading, refetch: fetchAuctions };
};

export const useVendorAuctions = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuctions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("auctions")
        .select(`
          *,
          product:products (
            name,
            image_url,
            description
          )
        `)
        .eq("vendor_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAuctions(data as Auction[]);
    } catch (error) {
      console.error("Error fetching vendor auctions:", error);
    } finally {
      setLoading(false);
    }
  };

  const createAuction = async (auctionData: {
    product_id: string;
    starting_price: number;
    reserve_price?: number;
    min_bid_increment: number;
    end_time: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("auctions")
        .insert({
          ...auctionData,
          vendor_id: user.id,
          current_price: auctionData.starting_price,
          status: "active"
        });

      if (error) throw error;
      
      // Update product to mark as auction
      await supabase
        .from("products")
        .update({ is_auction: true })
        .eq("id", auctionData.product_id);

      toast.success("Auction created successfully");
      fetchAuctions();
    } catch (error) {
      console.error("Error creating auction:", error);
      toast.error("Failed to create auction");
    }
  };

  const cancelAuction = async (auctionId: string) => {
    try {
      const { error } = await supabase
        .from("auctions")
        .update({ status: "cancelled" })
        .eq("id", auctionId);

      if (error) throw error;
      toast.success("Auction cancelled");
      fetchAuctions();
    } catch (error) {
      console.error("Error cancelling auction:", error);
      toast.error("Failed to cancel auction");
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return { auctions, loading, createAuction, cancelAuction, refetch: fetchAuctions };
};

export const useAuctionBids = (auctionId: string) => {
  const [bids, setBids] = useState<AuctionBid[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBids = async () => {
    try {
      const { data, error } = await supabase
        .from("auction_bids")
        .select("*")
        .eq("auction_id", auctionId)
        .order("bid_amount", { ascending: false });

      if (error) throw error;
      setBids(data);
    } catch (error) {
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (amount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to place a bid");
        return;
      }

      // Get current auction state
      const { data: auction } = await supabase
        .from("auctions")
        .select("current_price, min_bid_increment, status")
        .eq("id", auctionId)
        .single();

      if (!auction || auction.status !== "active") {
        toast.error("This auction is no longer active");
        return;
      }

      if (amount < auction.current_price + auction.min_bid_increment) {
        toast.error(`Bid must be at least K${(auction.current_price + auction.min_bid_increment).toLocaleString()}`);
        return;
      }

      // Insert bid
      const { error: bidError } = await supabase
        .from("auction_bids")
        .insert({
          auction_id: auctionId,
          bidder_id: user.id,
          bid_amount: amount
        });

      if (bidError) throw bidError;

      // Update auction current price
      await supabase
        .from("auctions")
        .update({ current_price: amount })
        .eq("id", auctionId);

      toast.success("Bid placed successfully!");
      fetchBids();
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error("Failed to place bid");
    }
  };

  useEffect(() => {
    if (auctionId) {
      fetchBids();
    }
  }, [auctionId]);

  return { bids, loading, placeBid, refetch: fetchBids };
};
