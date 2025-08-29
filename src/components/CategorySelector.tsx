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
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Shop by Category
        </h2>
        <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
          <div className="flex space-x-4 md:grid md:grid-cols-4 lg:grid-cols-8 md:gap-4 md:space-x-0 pb-4 md:pb-0">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant="outline"
                  className="h-24 w-20 md:w-auto flex-col space-y-2 hover:bg-accent border-border flex-shrink-0"
                >
                  <IconComponent className={`h-6 w-6 md:h-8 md:w-8 ${category.color}`} />
                  <span className="text-xs md:text-sm font-medium text-center leading-tight">{category.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;