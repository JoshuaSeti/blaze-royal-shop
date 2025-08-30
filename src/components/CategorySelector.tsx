import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Headphones, 
  Laptop, 
  Watch, 
  ShirtIcon as Shirt, 
  Home, 
  Car, 
  Gamepad2 
} from "lucide-react";

const CategorySelector = () => {
  const categories = [
    { id: 1, name: "Electronics", icon: Smartphone, color: "text-primary" },
    { id: 2, name: "Audio", icon: Headphones, color: "text-secondary" },
    { id: 3, name: "Computers", icon: Laptop, color: "text-primary" },
    { id: 4, name: "Wearables", icon: Watch, color: "text-secondary" },
    { id: 5, name: "Fashion", icon: Shirt, color: "text-primary" },
    { id: 6, name: "Home", icon: Home, color: "text-secondary" },
    { id: 7, name: "Automotive", icon: Car, color: "text-primary" },
    { id: 8, name: "Gaming", icon: Gamepad2, color: "text-secondary" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Shop by Category
        </h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant="outline"
                className="glass-card h-32 flex-col space-y-3 hover:bg-primary/5 hover:border-primary/30 hover:scale-105 transition-all duration-300 group border-border/50"
              >
                <IconComponent className={`h-10 w-10 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-sm font-semibold group-hover:text-primary transition-colors">{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-4 pb-4 px-4" style={{ width: 'max-content' }}>
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant="outline"
                    className="glass-card h-24 w-20 flex-col space-y-2 hover:bg-primary/5 hover:border-primary/30 hover:scale-105 transition-all duration-300 group border-border/50 flex-shrink-0"
                  >
                    <IconComponent className={`h-6 w-6 ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-xs font-semibold group-hover:text-primary transition-colors leading-tight text-center">{category.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;