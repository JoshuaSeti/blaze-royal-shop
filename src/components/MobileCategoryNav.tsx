import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  { id: "all", label: "All", link: "/" },
  { id: "women", label: "Women", link: "/search?category=women" },
  { id: "men", label: "Men", link: "/search?category=men" },
  { id: "sports", label: "Sports", link: "/search?category=sports" },
  { id: "home", label: "Home", link: "/search?category=home" },
  { id: "kids", label: "Kids", link: "/search?category=kids" },
  { id: "electronics", label: "Electronics", link: "/search?category=electronics" },
  { id: "beauty", label: "Beauty", link: "/search?category=beauty" },
];

const MobileCategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="sm:hidden bg-background border-b border-border sticky top-[104px] z-40">
      <div 
        className="overflow-x-auto px-3 py-2"
        style={{ 
          scrollbarWidth: 'thin',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex items-center gap-2" style={{ width: 'max-content' }}>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCategoryNav;
