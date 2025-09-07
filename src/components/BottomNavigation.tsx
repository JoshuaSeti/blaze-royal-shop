import { Home, Grid3X3, Search, ShoppingCart, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
      active: location.pathname === "/"
    },
    {
      id: "categories",
      label: "Categories",
      icon: Grid3X3,
      path: "/categories",
      active: location.pathname.startsWith("/categories")
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      path: "/search",
      active: location.pathname === "/search"
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      path: "/checkout",
      active: location.pathname === "/checkout",
      badge: 3 // This should come from cart state in a real app
    },
    {
      id: "profile",
      label: user ? "Profile" : "Sign In",
      icon: User,
      path: user ? "/profile" : "/auth",
      active: location.pathname === "/profile" || location.pathname === "/auth"
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/80 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 relative min-w-[60px]",
                item.active
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={item.active ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-xs mt-1 font-medium transition-all duration-200",
                item.active ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;