import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Promocode {
  id: string;
  vendor_id: string;
  code: string;
  benefit_type: 'discount_percent' | 'discount_amount' | 'free_delivery' | 'buy_x_get_y';
  benefit_value: number | null;
  min_order_amount: number | null;
  max_uses: number | null;
  uses_count: number;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  product_ids: string[] | null;
  influencer_pin: string | null;
  influencer_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface PromocodeUsage {
  id: string;
  promocode_id: string;
  user_id: string;
  order_id: string | null;
  discount_applied: number | null;
  used_at: string;
}

export const useVendorPromocodes = () => {
  const [promocodes, setPromocodes] = useState<Promocode[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPromocodes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("promocodes")
        .select("*")
        .eq("vendor_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPromocodes(data as Promocode[]);
    } catch (error) {
      console.error("Error fetching promocodes:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateInfluencerPin = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createPromocode = async (promocodeData: {
    code: string;
    benefit_type: Promocode['benefit_type'];
    benefit_value?: number;
    min_order_amount?: number;
    max_uses?: number;
    start_date?: string;
    end_date?: string;
    product_ids?: string[];
    influencer_name?: string;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const influencer_pin = promocodeData.influencer_name 
        ? generateInfluencerPin() 
        : null;

      const { error } = await supabase
        .from("promocodes")
        .insert({
          ...promocodeData,
          vendor_id: user.id,
          influencer_pin,
          is_active: true
        });

      if (error) throw error;
      
      if (influencer_pin) {
        toast.success(`Promocode created! Influencer PIN: ${influencer_pin}`);
      } else {
        toast.success("Promocode created successfully");
      }
      fetchPromocodes();
      return influencer_pin;
    } catch (error: any) {
      console.error("Error creating promocode:", error);
      if (error.code === "23505") {
        toast.error("This promo code already exists");
      } else {
        toast.error("Failed to create promocode");
      }
      return null;
    }
  };

  const updatePromocode = async (id: string, updates: Partial<Promocode>) => {
    try {
      const { error } = await supabase
        .from("promocodes")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      toast.success("Promocode updated");
      fetchPromocodes();
    } catch (error) {
      console.error("Error updating promocode:", error);
      toast.error("Failed to update promocode");
    }
  };

  const deletePromocode = async (id: string) => {
    try {
      const { error } = await supabase
        .from("promocodes")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Promocode deleted");
      fetchPromocodes();
    } catch (error) {
      console.error("Error deleting promocode:", error);
      toast.error("Failed to delete promocode");
    }
  };

  useEffect(() => {
    fetchPromocodes();
  }, []);

  return { promocodes, loading, createPromocode, updatePromocode, deletePromocode, refetch: fetchPromocodes };
};

export const useInfluencerTracking = (pin: string) => {
  const [promocode, setPromocode] = useState<Promocode | null>(null);
  const [usage, setUsage] = useState<PromocodeUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: promoData, error: promoError } = await supabase
        .from("promocodes")
        .select("*")
        .eq("influencer_pin", pin)
        .single();

      if (promoError) {
        setError("Invalid PIN");
        return;
      }

      setPromocode(promoData as Promocode);

      const { data: usageData, error: usageError } = await supabase
        .from("promocode_usage")
        .select("*")
        .eq("promocode_id", promoData.id)
        .order("used_at", { ascending: false });

      if (usageError) throw usageError;
      setUsage(usageData);
    } catch (err) {
      console.error("Error fetching tracking:", err);
      setError("Failed to load tracking data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pin) {
      fetchTracking();
    }
  }, [pin]);

  return { promocode, usage, loading, error, refetch: fetchTracking };
};
