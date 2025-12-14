import { Link } from "react-router-dom";
import appleLogo from "@/assets/brands/apple-logo.png";
import nikeLogo from "@/assets/brands/nike-logo.png";
import adidasLogo from "@/assets/brands/adidas-logo.png";
import lgLogo from "@/assets/brands/lg-logo.png";

const BrandSelector = () => {
  const brands = [
    { id: 1, name: "Apple", logo: appleLogo, link: "/search?brand=apple" },
    { id: 2, name: "Samsung", logo: "https://logos-world.net/wp-content/uploads/2020/09/Samsung-Emblem.png", link: "/search?brand=samsung" },
    { id: 3, name: "Nike", logo: nikeLogo, link: "/search?brand=nike" },
    { id: 4, name: "Adidas", logo: adidasLogo, link: "/search?brand=adidas" },
    { id: 5, name: "Sony", logo: "https://logos-world.net/wp-content/uploads/2020/06/Sony-Emblem.png", link: "/search?brand=sony" },
    { id: 6, name: "Dell", logo: "https://logos-world.net/wp-content/uploads/2020/05/Dell-Emblem.png", link: "/search?brand=dell" },
    { id: 7, name: "HP", logo: "https://logos-world.net/wp-content/uploads/2020/07/HP-Emblem.png", link: "/search?brand=hp" },
    { id: 8, name: "LG", logo: lgLogo, link: "/search?brand=lg" }
  ];

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground uppercase">
            Popular Brands
          </h2>
          <Link 
            to="/stores" 
            className="text-sm text-primary hover:underline font-medium"
          >
            View all
          </Link>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={brand.link}
              className="group flex flex-col items-center p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-white p-3 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUwxNSAyMEgyNUwyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                  }}
                />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto scrollbar-hidden -mx-4 px-4">
            <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  to={brand.link}
                  className="group flex flex-col items-center w-20"
                >
                  <div className="w-14 h-14 rounded-xl bg-white border border-border/50 p-2 flex items-center justify-center mb-2 group-hover:scale-105 group-hover:border-primary/30 transition-all duration-300 shadow-sm">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyNUwxNSAyMEgyNUwyMCAyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSelector;
