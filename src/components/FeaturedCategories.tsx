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
    <section className="py-16 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Shop by Category</h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="product-card group border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/15 group-hover:to-secondary/15 transition-all duration-300"></div>
                  <span className="relative text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                  <Button className="w-full btn-premium text-white font-semibold hover:scale-[1.02] transition-all duration-300">
                    Shop Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-4 pb-4 px-2" style={{ width: 'max-content' }}>
              {categories.map((category) => (
                <Card key={category.id} className="product-card group border-0 overflow-hidden flex-shrink-0 w-48">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/15 group-hover:to-secondary/15 transition-all duration-300"></div>
                      <span className="relative text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                      <Button className="w-full btn-premium text-white font-semibold text-sm py-2 hover:scale-[1.02] transition-all duration-300">
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;