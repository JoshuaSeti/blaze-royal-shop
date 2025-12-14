import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Headphones, 
  Laptop, 
  Watch, 
  ShirtIcon as Shirt, 
  Home, 
  Car, 
  Gamepad2,
  Sparkles,
  Baby
} from "lucide-react";

const CategorySelector = () => {
  const categories = [
    { id: 1, name: "Electronics", icon: Smartphone, gradient: "from-blue-500 to-cyan-400", link: "/search?category=electronics" },
    { id: 2, name: "Audio", icon: Headphones, gradient: "from-purple-500 to-pink-400", link: "/search?category=audio" },
    { id: 3, name: "Computers", icon: Laptop, gradient: "from-slate-600 to-slate-400", link: "/search?category=computers" },
    { id: 4, name: "Wearables", icon: Watch, gradient: "from-amber-500 to-orange-400", link: "/search?category=wearables" },
    { id: 5, name: "Fashion", icon: Shirt, gradient: "from-rose-500 to-pink-400", link: "/search?category=fashion" },
    { id: 6, name: "Home", icon: Home, gradient: "from-emerald-500 to-teal-400", link: "/search?category=home" },
    { id: 7, name: "Automotive", icon: Car, gradient: "from-red-500 to-orange-400", link: "/search?category=automotive" },
    { id: 8, name: "Gaming", icon: Gamepad2, gradient: "from-indigo-500 to-purple-400", link: "/search?category=gaming" },
    { id: 9, name: "Beauty", icon: Sparkles, gradient: "from-pink-400 to-rose-300", link: "/search?category=beauty" },
    { id: 10, name: "Kids", icon: Baby, gradient: "from-sky-400 to-blue-300", link: "/search?category=kids" },
  ];

  return (
    <section className="py-8 sm:py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground uppercase">
            Shop by Category
          </h2>
          <Link 
            to="/categories" 
            className="text-sm text-primary hover:underline font-medium"
          >
            View all
          </Link>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={category.link}
                className="group flex flex-col items-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden">
          <div className="overflow-x-auto scrollbar-hidden -mx-4 px-4">
            <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    to={category.link}
                    className="group flex flex-col items-center w-20"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-foreground text-center leading-tight">
                      {category.name}
                    </span>
                  </Link>
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
