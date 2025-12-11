import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, HelpCircle, ChevronDown } from "lucide-react";
import gulaLogo from "@/assets/gula-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <Link to="/vendor-auth" className="text-primary hover:underline flex items-center gap-1">
              <span>🛍️</span> Sell on Gula
            </Link>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>Payment Options</span>
              <span>Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-[#ff7e20] shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src={gulaLogo} alt="Gula" className="h-8 sm:h-10 w-auto" />
            </Link>
            
            {/* Search Bar with Button */}
            <div className="flex-1 max-w-3xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Search products, brands and categories" 
                    className="pl-10 pr-4 py-3 bg-background border-border rounded-lg focus:ring-2 focus:ring-primary/20 transition-all duration-300 w-full"
                    aria-label="Search products"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const q = (e.currentTarget as HTMLInputElement).value.trim();
                        if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
                      }
                    }}
                  />
                </div>
                <Button 
                  className="hidden sm:flex bg-primary hover:bg-primary-hover text-primary-foreground px-4 lg:px-8"
                  size="icon"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
                    const q = input?.value.trim();
                    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
                  }}
                >
                  <Search className="h-5 w-5 lg:hidden" />
                  <span className="hidden lg:inline">Search</span>
                </Button>
              </div>
            </div>

            {/* Account Dropdown - hidden on mobile, shown on lg+ */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden lg:flex items-center gap-2">
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/auth')}>
                  Sign In
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/order-history')}>
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                  Saved Items
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help Dropdown - hidden on mobile, shown on lg+ */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden lg:flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>Help</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/help')}>
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/support')}>
                  Contact Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/order-tracking')}>
                  Track Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-accent rounded-full shrink-0"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary-glow text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;