import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ProductCardProps {
  id?: number;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
}

const ProductCard = ({ id = 1, image, name, price, originalPrice, rating, reviews }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <Card className="product-card group border-0 overflow-hidden">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative overflow-hidden">
          <Link to={`/product/${id}`}>
            <div className="overflow-hidden">
              <img 
                src={image} 
                alt={name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {originalPrice && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-primary-glow text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  Sale
                </div>
              )}
            </div>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`absolute top-4 right-4 ${
              isFavorite ? 'text-red-500' : 'text-white/90'
            } hover:text-red-500 hover:bg-white/20 bg-black/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors leading-tight">
              {name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-medium">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-3">
            <span className="text-2xl font-bold text-primary">${price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full btn-premium text-white font-semibold py-3 hover:scale-[1.02] transition-all duration-300">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;