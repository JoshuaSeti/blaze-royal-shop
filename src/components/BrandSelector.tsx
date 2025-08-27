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
    <section className="py-8 bg-accent">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
          Popular Brands
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {brands.map((brand) => (
            <Button
              key={brand.id}
              variant="secondary"
              className="px-6 py-3 bg-card hover:bg-card/80 text-card-foreground border border-border"
            >
              <span className="text-xl mr-2">{brand.logo}</span>
              <span className="font-medium">{brand.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSelector;