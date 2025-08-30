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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">{title}</h2>
          {viewAllLink && (
            <Button variant="ghost" className="text-primary hover:text-primary-hover font-semibold hover:bg-primary/5 rounded-full px-4 md:px-6">
              View All <ChevronRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
            </Button>
          )}
        </div>
        
        <div className="overflow-x-auto scrollbar-hidden">
          <div className="flex space-x-4 md:space-x-8 pb-6 px-2" style={{ width: 'max-content' }}>
            {products.map((product) => (
              <div key={product.id} className="w-72 md:w-80 flex-shrink-0 hover-lift">
                <ProductCard
                  id={product.id}
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