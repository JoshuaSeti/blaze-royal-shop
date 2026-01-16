import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Store, Package, Star, MapPin, Calendar, ChevronLeft } from "lucide-react";

interface StoreData {
  user_id: string;
  full_name: string | null;
  vendor_company_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string;
  description: string | null;
}

const StorePage = () => {
  const { vendorId } = useParams();
  const [store, setStore] = useState<StoreData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!vendorId) return;

      try {
        // Fetch vendor profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("user_id, full_name, vendor_company_name, avatar_url, created_at")
          .eq("user_id", vendorId)
          .eq("is_vendor", true)
          .single();

        if (profileError) throw profileError;
        setStore(profile);

        // Fetch vendor's products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, name, price, image_url, category, description")
          .eq("vendor_id", vendorId)
          .eq("is_active", true)
          .order("created_at", { ascending: false });

        if (productsError) throw productsError;
        setProducts(productsData || []);

        // Extract unique categories
        const uniqueCategories = [...new Set(productsData?.map(p => p.category) || [])];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching store data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [vendorId]);

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const storeName = store?.vendor_company_name || store?.full_name || "Store";
  const storeInitials = storeName.slice(0, 2).toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-48 w-full mb-8 rounded-xl" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <Store className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Store Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The store you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/stores">
            <Button>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Browse All Stores
            </Button>
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
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/stores" className="hover:text-primary">Stores</Link>
          <span>/</span>
          <span className="text-foreground">{storeName}</span>
        </nav>

        {/* Store Header */}
        <div className="bg-card rounded-xl p-6 md:p-8 mb-8 border">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={store.avatar_url || ""} alt={storeName} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {storeInitials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold">{storeName}</h1>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Verified Seller
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  <span>{products.length} Products</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>4.5 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(store.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Products
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image_url || "/placeholder.svg"}
                name={product.name}
                price={product.price}
                rating={4.5}
                reviews={0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
            <p className="text-muted-foreground">
              {selectedCategory === "all" 
                ? "This store hasn't added any products yet."
                : "No products in this category."
              }
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default StorePage;
