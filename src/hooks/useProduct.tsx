import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductWithVendor {
  id: string;
  vendor_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  original_price: number | null;
  discount_percent: number | null;
  discount_start_date: string | null;
  discount_end_date: string | null;
  is_auction: boolean | null;
  vendor: {
    user_id: string;
    full_name: string | null;
    vendor_company_name: string | null;
    avatar_url: string | null;
  } | null;
}

export const useProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<ProductWithVendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        setError("No product ID provided");
        return;
      }

      try {
        setLoading(true);
        
        // Fetch product with vendor info
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select(`
            *,
            vendor:profiles!products_vendor_id_fkey (
              user_id,
              full_name,
              vendor_company_name,
              avatar_url
            )
          `)
          .eq("id", productId)
          .single();

        if (productError) {
          throw productError;
        }

        setProduct(productData as ProductWithVendor);
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

export const useRelatedProducts = (category: string | undefined, excludeProductId: string | undefined) => {
  const [products, setProducts] = useState<ProductWithVendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            vendor:profiles!products_vendor_id_fkey (
              user_id,
              full_name,
              vendor_company_name,
              avatar_url
            )
          `)
          .eq("category", category)
          .eq("is_active", true)
          .neq("id", excludeProductId || "")
          .limit(8);

        if (error) throw error;
        setProducts((data as ProductWithVendor[]) || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, excludeProductId]);

  return { products, loading };
};
