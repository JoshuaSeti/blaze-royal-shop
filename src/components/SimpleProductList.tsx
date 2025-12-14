import SimpleProductCard from "./SimpleProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

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
        
        <div 
          ref={scrollRef}
          className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-thin scrollbar-track-muted scrollbar-thumb-primary/30 hover:scrollbar-thumb-primary/50"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="flex gap-3 sm:gap-4 pb-2" style={{ width: 'max-content' }}>
            {products.map((product) => (
              <div key={product.id} className="w-36 sm:w-44 md:w-52 flex-shrink-0">
                <SimpleProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicator bar */}
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default SimpleProductList;
