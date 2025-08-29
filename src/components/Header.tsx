import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <header className="border-b bg-card shadow-sm">
      {/* Main header bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile: Hamburger + Logo | Desktop: Logo + Search */}
          <div className="flex items-center space-x-3 flex-1">
            {/* Mobile hamburger menu */}
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            
            <div className="text-2xl font-bold text-primary">ShopHub</div>
            
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
          <div className="flex items-center space-x-2">
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
              className="pl-10 bg-background"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;