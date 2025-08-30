import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="glass-card border-b-0 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center space-x-8 flex-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              ShopHub
            </div>
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search for products..." 
                  className="pl-12 py-3 bg-muted/50 border-border/50 rounded-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Account and Cart */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-accent rounded-full px-4 py-2">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-accent rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary-glow text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;