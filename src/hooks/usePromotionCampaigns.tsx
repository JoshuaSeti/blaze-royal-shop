import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PromotionCampaign {
  id: string;
  name: string;
  description: string | null;
  banner_url: string | null;
  discount_type: 'percent' | 'amount' | null;
  discount_value: number | null;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'active' | 'ended';
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignProduct {
  id: string;
  campaign_id: string;
  product_id: string;
  vendor_id: string;
  joined_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    original_price: number | null;
    discount_percent: number | null;
    image_url: string | null;
    vendor_id: string;
  };
}

export const usePromotionCampaigns = () => {
  const [campaigns, setCampaigns] = useState<PromotionCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase
        .from("promotion_campaigns")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      setCampaigns(data as PromotionCampaign[]);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return { campaigns, loading, refetch: fetchCampaigns };
};

export const useCampaignProducts = (campaignId: string) => {
  const [products, setProducts] = useState<CampaignProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("promotion_campaign_products")
        .select(`
          *,
          product:products (
            id,
            name,
            price,
            original_price,
            discount_percent,
            image_url,
            vendor_id
          )
        `)
        .eq("campaign_id", campaignId);

      if (error) throw error;
      setProducts(data as CampaignProduct[]);
    } catch (error) {
      console.error("Error fetching campaign products:", error);
    } finally {
      setLoading(false);
    }
  };

  const joinCampaign = async (productId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("promotion_campaign_products")
        .insert({
          campaign_id: campaignId,
          product_id: productId,
          vendor_id: user.id
        });

      if (error) throw error;
      toast.success("Product added to campaign");
      fetchProducts();
    } catch (error: any) {
      console.error("Error joining campaign:", error);
      if (error.code === "23505") {
        toast.error("Product already in this campaign");
      } else {
        toast.error("Failed to add product to campaign");
      }
    }
  };

  const leaveCampaign = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("promotion_campaign_products")
        .delete()
        .eq("campaign_id", campaignId)
        .eq("product_id", productId);

      if (error) throw error;
      toast.success("Product removed from campaign");
      fetchProducts();
    } catch (error) {
      console.error("Error leaving campaign:", error);
      toast.error("Failed to remove product from campaign");
    }
  };

  useEffect(() => {
    if (campaignId) {
      fetchProducts();
    }
  }, [campaignId]);

  return { products, loading, joinCampaign, leaveCampaign, refetch: fetchProducts };
};

export const useCampaign = (campaignId: string) => {
  const [campaign, setCampaign] = useState<PromotionCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data, error } = await supabase
          .from("promotion_campaigns")
          .select("*")
          .eq("id", campaignId)
          .single();

        if (error) throw error;
        setCampaign(data as PromotionCampaign);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  return { campaign, loading };
};
