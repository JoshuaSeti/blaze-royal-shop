import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Truck, 
  RotateCcw, 
  Shield, 
  Share2, 
  ChevronRight,
  Store,
  Check,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

// Example product data
const exampleProduct = {
  id: "example-1",
  name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones - Premium Audio Experience",
  price: 4999,
  originalPrice: 5999,
  description: "Experience unparalleled sound quality with Sony's flagship wireless headphones. Featuring industry-leading noise cancellation, 30-hour battery life, and ultra-comfortable design. Perfect for music lovers, travelers, and professionals who demand the best audio experience. Includes premium carry case and audio cable for wired listening.",
  category: "Electronics",
  stock_quantity: 15,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
  ],
  vendor: {
    id: "vendor-example",
    name: "TechZone Electronics",
    avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    rating: 4.8,
    products: 156
  }
};

const relatedProducts = [
  { id: "rel-1", name: "Wireless Earbuds Pro", price: 1299, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop", rating: 4.7 },
  { id: "rel-2", name: "Portable Bluetooth Speaker", price: 899, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop", rating: 4.5 },
  { id: "rel-3", name: "USB-C Audio Adapter", price: 299, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop", rating: 4.3 },
  { id: "rel-4", name: "Premium Headphone Stand", price: 449, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop", rating: 4.6 },
  { id: "rel-5", name: "Noise Cancelling Earbuds", price: 1599, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop", rating: 4.8 }
];

const ExampleProduct = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(quantity + change, exampleProduct.stock_quantity)));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Demo Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-6 text-center">
          <p className="text-sm text-primary font-medium">
            📦 This is an example product page for demonstration purposes
          </p>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-primary whitespace-nowrap">Home</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <Link to="/categories" className="hover:text-primary whitespace-nowrap">{exampleProduct.category}</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-foreground truncate">{exampleProduct.name}</span>
          
          <Button variant="ghost" size="sm" className="ml-auto flex-shrink-0">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          {/* Thumbnail Gallery - Left Side */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {exampleProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedImageIndex === idx 
                      ? "border-primary ring-2 ring-primary/20" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${exampleProduct.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="aspect-square bg-card rounded-xl overflow-hidden border relative group">
              <img 
                src={exampleProduct.images[selectedImageIndex]} 
                alt={exampleProduct.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <Badge className="absolute top-4 left-4 bg-red-500">
                {Math.round((1 - exampleProduct.price / exampleProduct.originalPrice) * 100)}% OFF
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Product Details - Middle */}
          <div className="lg:col-span-4 order-3 space-y-4">
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
              {exampleProduct.name}
            </h1>

            {/* Seller Link */}
            <Link 
              to="/example-store"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              {exampleProduct.vendor.name}
              <ChevronRight className="h-4 w-4" />
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/50 text-amber-400/50"}`} 
                  />
                ))}
                <span className="font-medium ml-1">4.8</span>
              </div>
              <Link to="#reviews" className="text-primary hover:underline text-sm">
                248 Reviews
              </Link>
              <span className="text-muted-foreground text-sm">|</span>
              <span className="text-muted-foreground text-sm">1.2k Sold</span>
            </div>

            <Separator />

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">K{exampleProduct.price.toLocaleString()}</span>
              <span className="text-lg text-muted-foreground line-through">K{exampleProduct.originalPrice.toLocaleString()}</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">Save K{(exampleProduct.originalPrice - exampleProduct.price).toLocaleString()}</Badge>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span className="font-medium">In Stock</span>
              <span className="text-muted-foreground text-sm">
                ({exampleProduct.stock_quantity} units available)
              </span>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                {exampleProduct.description}
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Free Delivery on orders over K500</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <RotateCcw className="h-4 w-4 text-primary flex-shrink-0" />
                <span>30-Day Easy Returns & Exchanges</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                <span>12-Month Manufacturer Warranty</span>
              </li>
            </ul>
          </div>

          {/* Price Card - Right Side */}
          <div className="lg:col-span-2 order-4">
            <Card className="sticky top-4">
              <CardContent className="p-4 space-y-4">
                {/* Price */}
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    K{exampleProduct.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground line-through">
                    K{exampleProduct.originalPrice.toLocaleString()}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <div className="flex items-center border rounded-lg">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="h-10 w-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="flex-1 text-center font-medium">{quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= exampleProduct.stock_quantity}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>

                <Separator />

                {/* Seller Card */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Sold by</h4>
                  <Link 
                    to="/example-store"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={exampleProduct.vendor.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        TZ
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{exampleProduct.vendor.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{exampleProduct.vendor.rating}</span>
                        <span>•</span>
                        <span>{exampleProduct.vendor.products} products</span>
                      </div>
                    </div>
                    <Store className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => {
                      toast.info("Sign in to chat with this seller");
                      navigate("/messages");
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* You Might Also Like Section */}
        <section className="py-8 border-t">
          <h2 className="text-xl md:text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviews={Math.floor(Math.random() * 100) + 10}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ExampleProduct;
