import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Store, Package, Star, Calendar, ChevronLeft, Search, MessageCircle, Heart, Users } from "lucide-react";

// Example store data
const exampleStore = {
  id: "vendor-example",
  name: "TechZone Electronics",
  description: "Your one-stop shop for premium electronics and gadgets. We offer authentic products with manufacturer warranty, fast shipping, and excellent customer service. Established in 2020, we've served over 50,000 happy customers.",
  avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=400&fit=crop",
  rating: 4.8,
  totalReviews: 1248,
  followers: 5200,
  responseRate: 98,
  joinedDate: "2020-03-15",
  categories: ["Audio", "Wearables", "Accessories", "Smartphones", "Laptops"]
};

const exampleProducts = [
  { id: "p-1", name: "Sony WH-1000XM5 Wireless Headphones", price: 4999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "Audio", rating: 4.8 },
  { id: "p-2", name: "Apple AirPods Pro 2nd Gen", price: 3499, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop", category: "Audio", rating: 4.9 },
  { id: "p-3", name: "Samsung Galaxy Watch 6", price: 4299, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", category: "Wearables", rating: 4.6 },
  { id: "p-4", name: "Anker PowerCore 26800mAh", price: 899, image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop", category: "Accessories", rating: 4.7 },
  { id: "p-5", name: "JBL Flip 6 Bluetooth Speaker", price: 1599, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop", category: "Audio", rating: 4.5 },
  { id: "p-6", name: "Logitech MX Master 3S Mouse", price: 1699, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop", category: "Accessories", rating: 4.8 },
  { id: "p-7", name: "Apple Watch Series 9", price: 6999, image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=300&h=300&fit=crop", category: "Wearables", rating: 4.9 },
  { id: "p-8", name: "Bose QuietComfort Ultra", price: 5499, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop", category: "Audio", rating: 4.7 },
  { id: "p-9", name: "Samsung Galaxy Buds2 Pro", price: 2299, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300&h=300&fit=crop", category: "Audio", rating: 4.6 },
  { id: "p-10", name: "Belkin 3-in-1 Wireless Charger", price: 1299, image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=300&h=300&fit=crop", category: "Accessories", rating: 4.4 },
  { id: "p-11", name: "Fitbit Charge 6", price: 2199, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop", category: "Wearables", rating: 4.5 },
  { id: "p-12", name: "Marshall Stanmore III Speaker", price: 4999, image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop", category: "Audio", rating: 4.8 },
];

const ExampleStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);

  const filteredProducts = exampleProducts.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Demo Banner */}
        <div className="bg-primary/10 border-b border-primary/20 py-3 text-center">
          <p className="text-sm text-primary font-medium container mx-auto px-4">
            🏪 This is an example store page for demonstration purposes
          </p>
        </div>

        {/* Store Cover Image */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/10 overflow-hidden">
          <img 
            src={exampleStore.coverImage} 
            alt="Store cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          {/* Store Header */}
          <div className="relative -mt-16 mb-6">
            <Card className="overflow-visible">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Avatar */}
                  <Avatar className="h-28 w-28 border-4 border-background shadow-lg -mt-20 md:-mt-16">
                    <AvatarImage src={exampleStore.avatar} alt={exampleStore.name} />
                    <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                      TZ
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h1 className="text-2xl md:text-3xl font-bold">{exampleStore.name}</h1>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            ✓ Verified
                          </Badge>
                        </div>
                        <p className="text-muted-foreground max-w-2xl">
                          {exampleStore.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{exampleStore.rating}</span>
                        <span className="text-muted-foreground">({exampleStore.totalReviews.toLocaleString()} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>{exampleProducts.length} Products</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{exampleStore.followers.toLocaleString()} Followers</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{exampleStore.responseRate}% Response</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(exampleStore.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button 
                      variant={isFollowing ? "outline" : "default"}
                      className="flex-1 md:flex-none"
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products in this store..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Products
              </Button>
              {exampleStore.categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {selectedCategory === "all" ? "All Products" : selectedCategory}
                <span className="text-muted-foreground font-normal ml-2">
                  ({filteredProducts.length} items)
                </span>
              </h2>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map(product => (
                  <Link to="/example-product" key={product.id}>
                    <ProductCard
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      reviews={Math.floor(Math.random() * 200) + 20}
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExampleStore;
