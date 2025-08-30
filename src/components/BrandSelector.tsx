import { Button } from "@/components/ui/button";

const BrandSelector = () => {
  const brands = [
    { id: 1, name: "Apple", logo: "🍎" },
    { id: 2, name: "Samsung", logo: "📱" },
    { id: 3, name: "Nike", logo: "✔️" },
    { id: 4, name: "Adidas", logo: "⚡" },
    { id: 5, name: "Sony", logo: "🎧" },
    { id: 6, name: "Dell", logo: "💻" },
    { id: 7, name: "HP", logo: "🖥️" },
    { id: 8, name: "LG", logo: "📺" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-accent/50 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Popular Brands
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {brands.map((brand) => (
            <Button
              key={brand.id}
              variant="secondary"
              className="glass-card hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold border-border/50 hover:scale-105 transition-all duration-300 group"
            >
              <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">{brand.logo}</span>
              <span>{brand.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSelector;