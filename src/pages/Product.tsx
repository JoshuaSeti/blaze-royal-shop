import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HorizontalProductList from "@/components/HorizontalProductList";

// Import product images
import productHeadphones from "@/assets/product-headphones.jpg";
import productBackpack from "@/assets/product-backpack.jpg";
import productPhone from "@/assets/product-phone.jpg";
import productMouse from "@/assets/product-mouse.jpg";
import productLaptop from "@/assets/product-laptop.jpg";
import productWatch from "@/assets/product-watch.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";


const mockProducts = [
  { id: 1, image: productHeadphones, name: "Premium Wireless Headphones", price: 299, originalPrice: 399, rating: 4.8, reviews: 324 },
  { id: 2, image: productBackpack, name: "Travel Backpack Pro", price: 89, rating: 4.6, reviews: 156 },
  { id: 3, image: productPhone, name: "Smartphone Ultra", price: 899, originalPrice: 999, rating: 4.9, reviews: 1247 },
  { id: 4, image: productMouse, name: "Gaming Mouse Elite", price: 79, rating: 4.7, reviews: 89 },
  { id: 5, image: productLaptop, name: "Laptop Pro 15\"", price: 1299, rating: 4.8, reviews: 267 },
  { id: 6, image: productWatch, name: "Smart Watch Series X", price: 399, rating: 4.5, reviews: 445 }
];

const Product = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { cartItems, loading, addToCart, updateCartItemQuantity, removeFromCart, cartTotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Find product by ID or default to first product
  const product = mockProducts.find(p => p.id === parseInt(id || "1")) || mockProducts[0];
  
  // Get suggested products (exclude current product)
  const suggestedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };
  const handleAddToCart = async () => {
  setIsSubmitting(true);
  try {
    // Note: ensure product.id is a string that exists in your DB
    await addToCart("da9fe44d-d7c0-47a4-951e-202dc0884d8d", quantity);
  } finally {
    setIsSubmitting(false);
  }
};

  // const AddtoCart = async () => {
  //   setIsSubmitting(true)
  //   try {
  //     const {data, error} = await supabase.from("cart_items").insert(cartItems)
  //     if (error) throw error;
  //     toast.message("Successful")
  //   } catch (error) {
  //     toast.error(`${error}`)
  //   } finally {setIsSubmitting(false)}
    
  // }
  

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-xl overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                  <Badge variant="destructive">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience premium quality with our {product.name.toLowerCase()}. 
                Crafted with attention to detail and built to last, this product combines 
                cutting-edge technology with elegant design. Perfect for daily use and 
                designed to exceed your expectations.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Premium materials and construction</li>
                <li>• Advanced features for enhanced performance</li>
                <li>• Ergonomic design for comfort</li>
                <li>• 2-year warranty included</li>
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuantityChange(-1)}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuantityChange(1)}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
  disabled={isSubmitting} 
  onClick={handleAddToCart} // Use the wrapper function
  size="lg" 
  className="flex-1"
>
  <ShoppingCart className="mr-2 h-5 w-5" />
  {isSubmitting ? "Adding..." : `Add to Cart $${product.price * quantity}`}
</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <HorizontalProductList 
          title="You might also like" 
          products={suggestedProducts}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Product;