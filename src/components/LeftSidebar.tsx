import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Laptop, 
  Monitor, 
  Shirt, 
  Home as HomeIcon,
  ShoppingBag,
  Baby,
  Bike
} from "lucide-react";

const LeftSidebar = () => {
  const categories = [
    { name: "Appliances", icon: HomeIcon, link: "/categories?cat=appliances" },
    { name: "Phones & Tablets", icon: Smartphone, link: "/categories?cat=phones" },
    { name: "Health & Beauty", icon: ShoppingBag, link: "/categories?cat=beauty" },
    { name: "Home & Office", icon: HomeIcon, link: "/categories?cat=home" },
    { name: "Electronics", icon: Monitor, link: "/categories?cat=electronics" },
    { name: "Fashion", icon: Shirt, link: "/categories?cat=fashion" },
    { name: "Supermarket", icon: ShoppingBag, link: "/categories?cat=supermarket" },
    { name: "Computing", icon: Laptop, link: "/categories?cat=computing" },
    { name: "Baby Products", icon: Baby, link: "/categories?cat=baby" },
    { name: "Sporting Goods", icon: Bike, link: "/categories?cat=sports" }
  ];

  return (
    <aside className="hidden lg:block w-64 glass-card rounded-lg overflow-hidden">
      <nav className="py-2">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Link
              key={index}
              to={category.link}
              className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-foreground hover:text-primary"
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default LeftSidebar;
