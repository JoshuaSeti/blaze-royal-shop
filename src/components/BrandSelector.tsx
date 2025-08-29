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
        <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
          <div className="flex space-x-4 md:flex-wrap md:justify-center md:gap-4 md:space-x-0 pb-4 md:pb-0 min-w-max md:min-w-0">
            {brands.map((brand) => (
              <Button
                key={brand.id}
                variant="secondary"
                className="px-4 py-3 md:px-6 bg-card hover:bg-card/80 text-card-foreground border border-border flex-shrink-0"
              >
                <span className="text-lg md:text-xl mr-2">{brand.logo}</span>
                <span className="font-medium text-sm md:text-base">{brand.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSelector;