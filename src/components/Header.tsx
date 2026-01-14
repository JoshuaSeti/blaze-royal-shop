import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, HelpCircle, ChevronDown, Menu, MapPin, User } from "lucide-react";
import gulaLogo from "@/assets/gula-logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Top Navigation Bar - hidden on mobile */}
      <div className="hidden sm:block bg-muted/30 border-b border-border/50">
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

      {/* Mobile Header */}
      <header className="sm:hidden bg-[#ff7e20] sticky top-0 z-50">
        {/* Top Row - Menu, Logo, Icons */}
        <div className="flex items-center justify-between px-3 py-2.5">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-2">
            {/* Hamburger Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                  <Link to="/" className="block py-2 text-foreground hover:text-primary">Home</Link>
                  <Link to="/categories" className="block py-2 text-foreground hover:text-primary">Categories</Link>
                  <Link to="/promotions" className="block py-2 text-foreground hover:text-primary">Deals</Link>
                  <Link to="/order-history" className="block py-2 text-foreground hover:text-primary">My Orders</Link>
                  <Link to="/wishlist" className="block py-2 text-foreground hover:text-primary">Saved Items</Link>
                  {/* <Link to="/order-history" className="block py-2 text-foreground hover:text-primary">Order History</Link>
                  <Link to="/order-history" className="block py-2 text-foreground hover:text-primary">Help</Link>
                  <Link to="/referral" className="block py-2 text-foreground hover:text-primary">Help</Link>
                  <Link to="/recommendations" className="block py-2 text-foreground hover:text-primary">Help</Link> */}
                  <div className="border-t border-border pt-4 mt-4">
                    <p className="text-xs text-muted-foreground mb-2">For Vendors</p>
                    <Link to="/vendor-login" className="block py-2 text-primary font-medium">Vendor Login</Link>
                    <Link to="/vendor" className="block py-2 text-foreground hover:text-primary">Vendor Dashboard</Link>
                    <Link to="/vendor-auth" className="block py-2 text-foreground hover:text-primary">Become a Seller</Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/">
              <img src={gulaLogo} alt="Gula" className="h-9 w-auto mt-1 -ml-1" />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <MapPin className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/auth')}
            >
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-white hover:bg-white/10"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Search Bar Row */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search products, stores or brands"
              className="pl-10 py-2.5 bg-muted/80 border-0 rounded-lg text-sm placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const q = (e.currentTarget as HTMLInputElement).value.trim();
                  if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden sm:block bg-[#ff7e20] shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src={gulaLogo} alt="Gula" className="h-10 w-auto" />
            </Link>
            
            {/* Search Bar with Button */}
            <div className="flex-1 max-w-3xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input 
                    placeholder="Search Gula" 
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
                  className="flex bg-primary hover:bg-primary-hover text-primary-foreground px-4 lg:px-8"
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

            {/* Account Dropdown */}
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
                
                <DropdownMenuItem onClick={() => navigate('/returns')}>
                  Returns
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/referral')}>
                  Refferal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/recommendations')}>
                  Recommendations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                  Saved Items
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => navigate('/vendor')}>
                  Vendor Dashboard
                </DropdownMenuItem> */}
                {/* Dashboard
                Products
                Orders
                Analytics
                Withdrawals
                Promotions
                Announcements
                Returns
                Support */}
                <DropdownMenuItem className="text-primary font-medium" onClick={() => navigate('/vendor-login')}>
                  Vendor Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vendor')}>
                  Vendor Dashboard
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => navigate('/vendor/orders')}>
                  Vendor Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vendor/analytics')}>
                  Vendor Analytics
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vendor/withdrawls')}>
                  Vendor Withdrawls
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vendor/promotions')}>
                  Vendor Promotions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vendor/announcements')}>
                  Vendor Announcements
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vendor/returns')}>
                  Vendor Returns
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/vendor/support')}>
                  Vendor Support
                </DropdownMenuItem> */}
                
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Help Dropdown */}
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
