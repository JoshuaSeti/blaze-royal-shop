import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
}

interface HorizontalProductListProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

const HorizontalProductList = ({ title, products, viewAllLink }: HorizontalProductListProps) => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          {viewAllLink && (
            <Button variant="ghost" className="text-primary hover:text-primary-hover">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-4" style={{ width: 'max-content' }}>
            {products.map((product) => (
              <div key={product.id} className="w-80 flex-shrink-0">
                <ProductCard
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductList;