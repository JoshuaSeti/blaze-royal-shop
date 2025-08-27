import ProductCard from "./ProductCard";
import headphonesImg from "@/assets/product-headphones.jpg";
import backpackImg from "@/assets/product-backpack.jpg";
import phoneImg from "@/assets/product-phone.jpg";

const FeaturedProducts = () => {
  const products = [
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
      image: backpackImg,
      name: "Leather Travel Backpack",
      price: 189,
      rating: 4,
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
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our hand-picked selection of premium products with unbeatable prices and quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary-hover font-semibold text-lg border-b-2 border-primary hover:border-primary-hover transition-colors">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;