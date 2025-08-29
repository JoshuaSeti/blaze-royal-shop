import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";

const Header = () => {
  return (
    <header className="border-b bg-card shadow-sm">
      {/* Main header bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile: Hamburger + Logo | Desktop: Logo + Search */}
          <div className="flex items-center space-x-3 flex-1">
            {/* Mobile hamburger menu */}
            <MobileSidebar />
            
            <div className="text-xl md:text-2xl font-bold text-primary">ShopHub</div>
            
            {/* Desktop search */}
            <div className="hidden md:flex flex-1 max-w-2xl ml-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search for products..." 
                  className="pl-10 bg-muted/30"
                />
              </div>
            </div>
          </div>

          {/* Account and Cart */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4">
              <User className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline text-sm">Account</span>
            </Button>
            <Button variant="ghost" size="sm" className="relative px-2 md:px-3">
              <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden border-t bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for products..." 
              className="pl-10 bg-background text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;