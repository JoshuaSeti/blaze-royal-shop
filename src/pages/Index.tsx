import Header from "@/components/Header";
import BannerCarousel from "@/components/BannerCarousel";
import CategorySelector from "@/components/CategorySelector";
import BrandSelector from "@/components/BrandSelector";
import HorizontalProductList from "@/components/HorizontalProductList";
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

  const newArrivals = [
    {
      id: 6,
      image: backpackImg,
      name: "Leather Travel Backpack",
      price: 189,
      rating: 4,
      reviews: 89
    },
    {
      id: 7,
      image: phoneImg,
      name: "Premium Smartphone Case",
      price: 49,
      originalPrice: 69,
      rating: 5,
      reviews: 145
    },
    {
      id: 8,
      image: watchImg,
      name: "Luxury Smart Watch",
      price: 599,
      rating: 5,
      reviews: 67
    },
    {
      id: 9,
      image: laptopImg,
      name: "Gaming Laptop Ultra",
      price: 1899,
      rating: 5,
      reviews: 43
    },
    {
      id: 10,
      image: mouseImg,
      name: "Ergonomic Office Mouse",
      price: 59,
      rating: 4,
      reviews: 156
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BannerCarousel />
        <CategorySelector />
        <BrandSelector />
        <HorizontalProductList 
          title="Best Sellers" 
          products={bestSellers}
          viewAllLink="/bestsellers"
        />
        <HorizontalProductList 
          title="New Arrivals" 
          products={newArrivals}
          viewAllLink="/new"
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
