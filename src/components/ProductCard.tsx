import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
}

const ProductCard = ({ image, name, price, originalPrice, rating, reviews }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-3 right-3 bg-card/80 hover:bg-card"
          >
            <Heart className="h-4 w-4" />
          </Button>
          {originalPrice && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-medium">
              Sale
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">${price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;