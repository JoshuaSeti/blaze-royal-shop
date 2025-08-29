import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/src/assets/product-phone.jpg",
    description: "Latest gadgets & tech"
  },
  {
    id: 2,
    name: "Fashion",
    image: "/src/assets/product-backpack.jpg", 
    description: "Trendy clothes & accessories"
  },
  {
    id: 3,
    name: "Sports",
    image: "/src/assets/product-watch.jpg",
    description: "Fitness & outdoor gear"
  },
  {
    id: 4,
    name: "Computing",
    image: "/src/assets/product-laptop.jpg",
    description: "Laptops & accessories"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Shop by Category</h2>
        <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
          <div className="flex space-x-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-4 md:space-x-0 pb-4 md:pb-0">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group w-64 md:w-auto flex-shrink-0">
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;