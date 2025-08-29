import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BannerCarousel from "@/components/BannerCarousel";
import CategorySelector from "@/components/CategorySelector";
import BrandSelector from "@/components/BrandSelector";
import HorizontalProductList from "@/components/HorizontalProductList";
import FeaturedCategories from "@/components/FeaturedCategories";
import Footer from "@/components/Footer";

// Import product images
import headphonesImg from "@/assets/product-headphones.jpg";
import backpackImg from "@/assets/product-backpack.jpg";
import phoneImg from "@/assets/product-phone.jpg";
import mouseImg from "@/assets/product-mouse.jpg";
import laptopImg from "@/assets/product-laptop.jpg";
import watchImg from "@/assets/product-watch.jpg";

const Index = () => {
  // Sample product data
  const bestSellers = [
    {
      id: 1,
      image: headphonesImg,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      rating: 5,
      reviews: 124
    },
    {
      id: 2,
      image: laptopImg,
      name: "Modern Laptop Pro",
      price: 1299,
      originalPrice: 1499,
      rating: 5,
      reviews: 89
    },
    {
      id: 3,
      image: phoneImg,
      name: "Latest Smartphone",
      price: 799,
      originalPrice: 899,
      rating: 5,
      reviews: 256
    },
    {
      id: 4,
      image: watchImg,
      name: "Smart Fitness Watch",
      price: 249,
      rating: 4,
      reviews: 178
    },
    {
      id: 5,
      image: mouseImg,
      name: "Wireless Gaming Mouse",
      price: 89,
      originalPrice: 129,
      rating: 4,
      reviews: 92
    }
  ];

  const todaysDeals = [
    {
      id: 11,
      image: headphonesImg,
      name: "Premium Wireless Headphones",
      price: 199,
      originalPrice: 399,
      rating: 5,
      reviews: 124
    },
    {
      id: 12,
      image: mouseImg,
      name: "Gaming Mouse Pro",
      price: 59,
      originalPrice: 89,
      rating: 4,
      reviews: 203
    },
    {
      id: 13,
      image: watchImg,
      name: "Fitness Tracker",
      price: 149,
      originalPrice: 229,
      rating: 4,
      reviews: 89
    },
    {
      id: 14,
      image: backpackImg,
      name: "Travel Backpack",
      price: 89,
      originalPrice: 149,
      rating: 5,
      reviews: 156
    }
  ];

  const recommendedProducts = [
    {
      id: 15,
      image: phoneImg,
      name: "Smartphone Pro Max",
      price: 999,
      rating: 5,
      reviews: 2341
    },
    {
      id: 16,
      image: laptopImg,
      name: "Ultra-thin Laptop",
      price: 1599,
      rating: 5,
      reviews: 567
    },
    {
      id: 17,
      image: headphonesImg,
      name: "Studio Headphones",
      price: 349,
      rating: 5,
      reviews: 891
    },
    {
      id: 18,
      image: watchImg,
      name: "Premium Smartwatch",
      price: 449,
      rating: 4,
      reviews: 234
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedCategories />
        <HorizontalProductList 
          title="Today's Deals" 
          products={todaysDeals}
          viewAllLink="/deals"
        />
        <BannerCarousel />
        <HorizontalProductList 
          title="Best Sellers" 
          products={bestSellers}
          viewAllLink="/bestsellers"
        />
        <CategorySelector />
        <HorizontalProductList 
          title="Recommended for You" 
          products={recommendedProducts}
          viewAllLink="/recommended"
        />
        <BrandSelector />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
