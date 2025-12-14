import Header from "@/components/Header";
import PromotionalBanner from "@/components/PromotionalBanner";
import BannerCarousel from "@/components/BannerCarousel";
import LeftSidebar from "@/components/LeftSidebar";
import PromotionalCards from "@/components/PromotionalCards";
import CategorySelector from "@/components/CategorySelector";
import BrandSelector from "@/components/BrandSelector";
import SimpleProductList from "@/components/SimpleProductList";
import PromoBannerCard from "@/components/PromoBannerCard";
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

        {/* Product Sections with Promo Banners */}
        <SimpleProductList 
          title="Today's Deals" 
          products={placeholderProducts.deals}
          viewAllLink="/search?category=deals"
        />

        <PromoBannerCard 
          title="Festive Season Sale"
          subtitle="Celebrate with amazing discounts on gifts, decorations, and more for your loved ones."
          buttonText="Shop now"
          link="/search?category=festive"
          bgColor="bg-gradient-to-r from-red-800 to-red-600"
        />

        <SimpleProductList 
          title="Electronics" 
          products={placeholderProducts.electronics}
          viewAllLink="/search?category=electronics"
        />

        <CategorySelector />

        <PromoBannerCard 
          title="New Arrivals"
          subtitle="Discover the latest trends and fresh styles just added to our collection."
          buttonText="Explore"
          link="/search?category=new"
          bgColor="bg-gradient-to-r from-slate-800 to-slate-600"
        />

        <SimpleProductList 
          title="Fashion" 
          products={placeholderProducts.fashion}
          viewAllLink="/search?category=fashion"
        />

        <BrandSelector />

        <PromoBannerCard 
          title="Home Essentials"
          subtitle="Transform your space with quality home goods at unbeatable prices."
          buttonText="Shop home"
          link="/search?category=home"
          bgColor="bg-gradient-to-r from-amber-800 to-amber-600"
        />

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
