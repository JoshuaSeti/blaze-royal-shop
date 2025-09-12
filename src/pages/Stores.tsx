import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Store, MapPin, Star, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Store {
  id: string;
  full_name: string | null;
  vendor_company_name: string | null;
  avatar_url: string | null;
  product_count: number;
  categories: string[];
}

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Fetch vendor profiles with their product counts
        const { data: profiles, error } = await supabase
          .from("profiles")
          .select(`
            id,
            user_id,
            full_name,
            vendor_company_name,
            avatar_url
          `)
          .eq("is_vendor", true);

        if (error) throw error;

        // For each vendor, get their product count and categories
        const storesWithData = await Promise.all(
          (profiles || []).map(async (profile) => {
            const { data: products } = await supabase
              .from("products")
              .select("category")
              .eq("vendor_id", profile.user_id)
              .eq("is_active", true);

            const categories = [...new Set(products?.map(p => p.category) || [])];
            
            return {
              id: profile.user_id,
              full_name: profile.full_name,
              vendor_company_name: profile.vendor_company_name,
              avatar_url: profile.avatar_url,
              product_count: products?.length || 0,
              categories
            };
          })
        );

        // Filter out vendors with no products
        setStores(storesWithData.filter(store => store.product_count > 0));
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => 
    (store.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     store.vendor_company_name?.toLowerCase().includes(searchTerm.toLowerCase())) ?? false
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Discover Amazing <span className="text-primary">Stores</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Explore unique vendors and find products from trusted sellers
              </p>
              
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6 text-lg rounded-full border-2"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stores Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Loading stores...</p>
              </div>
            ) : filteredStores.length === 0 ? (
              <div className="text-center py-16">
                <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No stores found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "No vendors have added products yet"}
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">All Stores ({filteredStores.length})</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredStores.map((store) => (
                    <Card key={store.id} className="hover:shadow-lg transition-shadow duration-300 border-2">
                      <CardHeader className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          {store.avatar_url ? (
                            <img 
                              src={store.avatar_url} 
                              alt={store.vendor_company_name || store.full_name || 'Store'}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <Store className="h-10 w-10 text-primary" />
                          )}
                        </div>
                        <CardTitle className="text-xl">
                          {store.vendor_company_name || store.full_name || 'Unnamed Store'}
                        </CardTitle>
                        {store.full_name && store.vendor_company_name && (
                          <p className="text-sm text-muted-foreground">by {store.full_name}</p>
                        )}
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>{store.product_count} products</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span>{(4 + Math.random()).toFixed(1)}</span>
                          </div>
                        </div>
                        
                        {store.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {store.categories.slice(0, 3).map((category, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                            {store.categories.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{store.categories.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        <Link to={`/search?vendor=${store.id}`} className="w-full">
                          <Button className="w-full" variant="outline">
                            Visit Store
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Stores;