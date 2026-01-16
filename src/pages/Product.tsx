import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
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
  Package
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProduct, useRelatedProducts } from "@/hooks/useProduct";
import { useCart } from "@/hooks/useCart";

const Product = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { products: relatedProducts, loading: relatedLoading } = useRelatedProducts(product?.category, id);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(quantity + change, product?.stock_quantity || 10)));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  const vendorName = product?.vendor?.vendor_company_name || product?.vendor?.full_name || "Seller";
  const vendorInitials = vendorName.slice(0, 2).toUpperCase();

  // Generate mock image gallery (in production, you'd have multiple images)
  const productImages = product?.image_url 
    ? [product.image_url, product.image_url, product.image_url, product.image_url]
    : ["/placeholder.svg"];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <Skeleton className="h-4 w-64 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-1">
              <div className="flex lg:flex-col gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-16 h-16 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Skeleton className="aspect-square rounded-xl" />
            </div>
            <div className="lg:col-span-4 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-64 rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-primary whitespace-nowrap">Home</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <Link to="/categories" className="hover:text-primary whitespace-nowrap">{product.category}</Link>
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
          <span className="text-foreground truncate">{product.name}</span>
          
          {/* Share Button */}
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
              {productImages.map((img, idx) => (
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
                    alt={`${product.name} view ${idx + 1}`}
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
                src={productImages[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
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
              {product.name}
            </h1>

            {/* Seller Link */}
            <Link 
              to={`/store/${product.vendor_id}`}
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              {vendorName}
              <ChevronRight className="h-4 w-4" />
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-medium">4.5</span>
              </div>
              <Link to="#reviews" className="text-primary hover:underline text-sm">
                12 Reviews
              </Link>
            </div>

            <Separator />

            {/* Stock Status */}
            {product.stock_quantity !== null && product.stock_quantity > 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-4 w-4" />
                <span className="font-medium">In Stock</span>
                {product.stock_quantity < 10 && (
                  <span className="text-orange-600 text-sm">
                    (Only {product.stock_quantity} left)
                  </span>
                )}
              </div>
            ) : (
              <div className="text-red-600 font-medium">Out of Stock</div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                {product.description || `Experience premium quality with our ${product.name.toLowerCase()}. Crafted with attention to detail and built to last.`}
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Free Delivery Available</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <RotateCcw className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Hassle-Free Exchanges & Returns for 30 Days</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                <span>6-Month Limited Warranty</span>
              </li>
            </ul>
          </div>

          {/* Price Card - Right Side */}
          <div className="lg:col-span-2 order-4">
            <Card className="sticky top-4">
              <CardContent className="p-4 space-y-4">
                {/* Price */}
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  K{product.price.toLocaleString()}
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
                      disabled={quantity >= (product.stock_quantity || 10)}
                      className="h-10 w-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.stock_quantity || product.stock_quantity <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>

                <Separator />

                {/* Seller Card */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Sold by</h4>
                  <Link 
                    to={`/store/${product.vendor_id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={product.vendor?.avatar_url || ""} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {vendorInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{vendorName}</p>
                      <p className="text-xs text-muted-foreground">Visit Store</p>
                    </div>
                    <Store className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* You Might Also Like Section */}
        {relatedProducts.length > 0 && (
          <section className="py-8 border-t">
            <h2 className="text-xl md:text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {relatedProducts.slice(0, 5).map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  image={relatedProduct.image_url || "/placeholder.svg"}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  rating={4.5}
                  reviews={0}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Product;
