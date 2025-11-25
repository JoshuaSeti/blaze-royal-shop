import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

const Header = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="glass-card border-b-0 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3 md:gap-6">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent whitespace-nowrap">
            ShopHub
          </Link>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-3xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search for products..." 
                className="pl-10 pr-4 py-2 bg-muted/50 border-border/50 rounded-full focus:ring-2 focus:ring-primary/20 transition-all duration-300 w-full"
                aria-label="Search products"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (e.currentTarget as HTMLInputElement).value.trim();
                    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
                  }
                }}
              />
            </div>
          </div>

          {/* Cart */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-accent rounded-full shrink-0"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary-glow text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;