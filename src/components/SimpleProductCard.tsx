import { Link } from "react-router-dom";

interface SimpleProductCardProps {
  id?: string;
  image: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: "red" | "yellow";
}

const SimpleProductCard = ({ 
  id, 
  image, 
  name, 
  brand, 
  price, 
  originalPrice,
  badge,
  badgeColor = "red"
}: SimpleProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="flex flex-col">
        {/* Image Container */}
        <div className="relative bg-muted/30 rounded-lg overflow-hidden aspect-square mb-3">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <span 
              className={`absolute bottom-3 left-3 px-2 py-1 text-xs font-bold rounded ${
                badgeColor === "yellow" 
                  ? "bg-yellow-400 text-yellow-900" 
                  : "bg-red-500 text-white"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground">{brand}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-foreground">
              From K {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                K {originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SimpleProductCard;
