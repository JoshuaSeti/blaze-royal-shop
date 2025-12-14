import Header from "@/components/Header";
import PromotionalBanner from "@/components/PromotionalBanner";
import BannerCarousel from "@/components/BannerCarousel";
import LeftSidebar from "@/components/LeftSidebar";
import PromotionalCards from "@/components/PromotionalCards";
import CategorySelector from "@/components/CategorySelector";
import BrandSelector from "@/components/BrandSelector";
import SimpleProductList from "@/components/SimpleProductList";
import Footer from "@/components/Footer";
import { placeholderProducts } from "@/data/placeholderProducts";

const Index = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <PromotionalBanner />
      <Header />
      <main>
        {/* Main Layout with Sidebars */}
        <div className="container mx-auto px-4 py-3 sm:py-6">
          <div className="flex gap-6">
            {/* Hide LeftSidebar on mobile */}
            <div className="hidden lg:block">
              <LeftSidebar />
            </div>
            
            <div className="flex-1">
              <BannerCarousel />
            </div>
          </div>
        </div>

        {/* Promotional Cards */}
        <PromotionalCards />

        {/* Product Sections */}
        <SimpleProductList 
          title="Today's Deals" 
          products={placeholderProducts.deals}
          viewAllLink="/search?category=deals"
        />
        <SimpleProductList 
          title="Electronics" 
          products={placeholderProducts.electronics}
          viewAllLink="/search?category=electronics"
        />
        <CategorySelector />
        <SimpleProductList 
          title="Fashion" 
          products={placeholderProducts.fashion}
          viewAllLink="/search?category=fashion"
        />
        <BrandSelector />
        <SimpleProductList 
          title="Home & Living" 
          products={placeholderProducts.home}
          viewAllLink="/search?category=home"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
