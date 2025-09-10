import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

const FeaturedProducts = () => {
  const { products, loading } = useProducts();
  
  if (loading) {
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
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-muted animate-pulse rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  // Take first 6 products for featured display
  const featuredProducts = products.slice(0, 6);

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
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image_url || "/api/placeholder/300/300"}
                name={product.name}
                price={Number(product.price)}
                rating={4}
                reviews={Math.floor(Math.random() * 100) + 10}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No products available yet.</p>
            </div>
          )}
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