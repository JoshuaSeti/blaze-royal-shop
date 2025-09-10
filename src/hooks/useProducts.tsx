import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Product {
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
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
};

export const useVendorProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVendorProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching vendor products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([productData])
        .select()
        .single();

      if (error) throw error;
      
      setProducts(prev => [data, ...prev]);
      toast.success("Product created successfully");
      return data;
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
      throw error;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      
      setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
      toast.success("Product updated successfully");
      return data;
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
      throw error;
    }
  };

  useEffect(() => {
    fetchVendorProducts();
  }, []);

  return { 
    products, 
    loading, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    refetch: fetchVendorProducts 
  };
};