import SimpleProductCard from "./SimpleProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface SimpleProduct {
  id: string;
  image: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: "red" | "yellow";
}

interface SimpleProductListProps {
  title: string;
  products: SimpleProduct[];
  viewAllLink?: string;
}

const SimpleProductList = ({ title, products, viewAllLink }: SimpleProductListProps) => {
  return (
    <section className="py-6 sm:py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground uppercase">{title}</h2>
          {viewAllLink && (
            <Button variant="ghost" className="text-primary hover:text-primary-hover font-semibold hover:bg-primary/5 rounded-full px-2 sm:px-4 text-sm">
              <span className="hidden sm:inline">View All</span>
              <span className="sm:hidden">All</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="overflow-x-auto scrollbar-hidden -mx-4 px-4">
          <div className="flex gap-3 sm:gap-4 pb-4" style={{ width: 'max-content' }}>
            {products.map((product) => (
              <div key={product.id} className="w-36 sm:w-44 md:w-52 flex-shrink-0">
                <SimpleProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimpleProductList;
