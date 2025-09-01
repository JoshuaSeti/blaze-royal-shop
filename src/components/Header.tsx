import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="glass-card border-b-0 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4 md:space-x-8 flex-1">
            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              ShopHub
            </div>
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search for products..." 
                  className="pl-12 py-3 bg-muted/50 border-border/50 rounded-full focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Account and Cart */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden sm:flex items-center space-x-2 hover:bg-accent rounded-full px-3 md:px-4 py-2">
                    <User className="h-4 md:h-5 w-4 md:w-5" />
                    <span className="hidden md:inline font-medium">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/vendor')}>
                    Vendor Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate('/auth')}
                className="hidden sm:flex items-center space-x-2 hover:bg-accent rounded-full px-3 md:px-4 py-2"
                variant="ghost"
              >
                <User className="h-4 md:h-5 w-4 md:w-5" />
                <span className="hidden md:inline font-medium">Sign In</span>
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="relative hover:bg-accent rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary-glow text-white text-xs rounded-full h-5 md:h-6 w-5 md:w-6 flex items-center justify-center font-bold shadow-lg">
                3
              </span>
            </Button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for products..." 
              className="pl-11 py-3 bg-muted/50 border-border/50 rounded-full focus:ring-2 focus:ring-primary/20 transition-all duration-300 w-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;