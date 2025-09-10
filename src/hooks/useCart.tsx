import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "./useAuth";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    stock_quantity: number;
  };
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCartItems = async () => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            stock_quantity
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        // Update quantity
        const newQuantity = existingItem.quantity + quantity;
        await updateCartItemQuantity(existingItem.id, newQuantity);
      } else {
        // Insert new item
        const { data, error } = await supabase
          .from("cart_items")
          .insert([{
            user_id: user.id,
            product_id: productId,
            quantity
          }])
          .select(`
            *,
            products (
              id,
              name,
              price,
              image_url,
              stock_quantity
            )
          `)
          .single();

        if (error) throw error;
        setCartItems(prev => [...prev, data]);
      }
      
      toast.success("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", cartItemId)
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            stock_quantity
          )
        `)
        .single();

      if (error) throw error;
      
      setCartItems(prev => 
        prev.map(item => item.id === cartItemId ? data : item)
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast.error("Failed to update cart item");
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId);

      if (error) throw error;
      
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
      
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const cartTotal = cartItems.reduce((sum, item) => 
    sum + (item.products.price * item.quantity), 0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return { 
    cartItems, 
    loading, 
    addToCart, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart,
    cartTotal,
    cartCount,
    refetch: fetchCartItems 
  };
};