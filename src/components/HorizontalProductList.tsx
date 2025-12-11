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
    <section className="py-6 sm:py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4 sm:mb-8 md:mb-10">
          <h2 className="text-lg sm:text-2xl md:text-4xl font-bold text-foreground">{title}</h2>
          {viewAllLink && (
            <Button variant="ghost" className="text-primary hover:text-primary-hover font-semibold hover:bg-primary/5 rounded-full px-2 sm:px-4 md:px-6 text-sm sm:text-base">
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          )}
        </div>
        
        <div className="overflow-x-auto scrollbar-hidden -mx-4 px-4">
          <div className="flex space-x-3 sm:space-x-4 md:space-x-6 pb-4" style={{ width: 'max-content' }}>
            {products.map((product) => (
              <div key={product.id} className="w-40 sm:w-56 md:w-72 flex-shrink-0">
                <ProductCard
                  id={product.id.toString()}
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