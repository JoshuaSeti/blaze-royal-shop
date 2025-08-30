import { Button } from "@/components/ui/button";
import appleLogo from "@/assets/brands/apple-logo.png";
import nikeLogo from "@/assets/brands/nike-logo.png";
import adidasLogo from "@/assets/brands/adidas-logo.png";
import lgLogo from "@/assets/brands/lg-logo.png";

const BrandSelector = () => {
  const brands = [
    { id: 1, name: "Apple", logo: appleLogo },
    { id: 2, name: "Samsung", logo: "https://logos-world.net/wp-content/uploads/2020/09/Samsung-Emblem.png" },
    { id: 3, name: "Nike", logo: nikeLogo },
    { id: 4, name: "Adidas", logo: adidasLogo },
    { id: 5, name: "Sony", logo: "https://logos-world.net/wp-content/uploads/2020/06/Sony-Emblem.png" },
    { id: 6, name: "Dell", logo: "https://logos-world.net/wp-content/uploads/2020/05/Dell-Emblem.png" },
    { id: 7, name: "HP", logo: "https://logos-world.net/wp-content/uploads/2020/07/HP-Emblem.png" },
    { id: 8, name: "LG", logo: lgLogo }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-accent/50 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
          Popular Brands
        </h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {brands.map((brand) => (
            <Button
              key={brand.id}
              variant="secondary"
              className="glass-card hover:bg-primary hover:text-white w-32 h-32 rounded-full flex-col space-y-2 border-border/50 hover:scale-110 transition-all duration-300 group p-4"
            >
              <div className="w-16 h-16 rounded-full bg-white p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUwxNSAyMEgyNUwyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                  }}
                />
              </div>
              <span className="text-sm font-semibold">{brand.name}</span>
            </Button>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-4 pb-4 px-4" style={{ width: 'max-content' }}>
              {brands.map((brand) => (
                <Button
                  key={brand.id}
                  variant="secondary"
                  className="glass-card hover:bg-primary hover:text-white w-20 h-20 rounded-full flex-col space-y-1 border-border/50 hover:scale-105 transition-all duration-300 group p-2 flex-shrink-0"
                >
                  <div className="w-12 h-12 rounded-full bg-white p-1.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUwxNSAyMEgyNUwyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold">{brand.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSelector;