import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CategorySelector from "@/components/CategorySelector";
import BrandSelector from "@/components/BrandSelector";
import HorizontalProductList from "@/components/HorizontalProductList";
import Footer from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { products, loading } = useProducts();

  // Convert database products to display format
  const convertToDisplayProduct = (product: any) => ({
    id: parseInt(product.id.replace(/-/g, '').substring(0, 8), 16), // Convert UUID to number for display
    image: product.image_url || "/placeholder.svg",
    name: product.name,
    price: Number(product.price),
    rating: 4 + Math.random(), // Random rating between 4-5
    reviews: Math.floor(Math.random() * 200) + 50 // Random reviews 50-250
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Organize products by category for different sections
  const electronicProducts = products.filter(p => 
    p.category.toLowerCase().includes('electronics') || 
    p.category.toLowerCase().includes('tech')
  ).slice(0, 5).map(convertToDisplayProduct);

  const fashionProducts = products.filter(p => 
    p.category.toLowerCase().includes('fashion') || 
    p.category.toLowerCase().includes('clothing')
  ).slice(0, 5).map(convertToDisplayProduct);

  const homeProducts = products.filter(p => 
    p.category.toLowerCase().includes('home') || 
    p.category.toLowerCase().includes('furniture')
  ).slice(0, 5).map(convertToDisplayProduct);

  // Fallback to recent products if categories are empty
  const recentProducts = products.slice(0, 5).map(convertToDisplayProduct);
  const popularProducts = products.slice(5, 10).map(convertToDisplayProduct);
  const recommendedProducts = products.slice(10, 15).map(convertToDisplayProduct);

  const bestSellers = electronicProducts.length > 0 ? electronicProducts : recentProducts;
  const todaysDeals = fashionProducts.length > 0 ? fashionProducts : popularProducts;
  const recommended = homeProducts.length > 0 ? homeProducts : recommendedProducts;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HorizontalProductList 
          title="Today's Deals" 
          products={todaysDeals}
          viewAllLink="/search?category=deals"
        />
        <BannerCarousel />
        <HorizontalProductList 
          title="Best Sellers" 
          products={bestSellers}
          viewAllLink="/search?category=electronics"
        />
        <CategorySelector />
        <HorizontalProductList 
          title="Recommended for You" 
          products={recommended}
          viewAllLink="/search"
        />
        <BrandSelector />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
