import { Home, Grid3X3, Search, Wallet, User } from "lucide-react";
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
      id: "wallet",
      label: "Wallet",
      icon: Wallet,
      path: "/wallet",
      active: location.pathname === "/wallet"
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-around px-1 py-1 safe-area-pb">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 relative min-w-[64px]",
                item.active
                  ? "text-primary"
                  : "text-muted-foreground active:scale-95"
              )}
              aria-label={item.label}
            >
              {item.active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
              <div className={cn(
                "relative p-1.5 rounded-lg transition-all duration-200",
                item.active && "bg-primary/10"
              )}>
                <Icon size={22} strokeWidth={item.active ? 2.5 : 1.8} />
              </div>
              <span className={cn(
                "text-[10px] mt-0.5 font-medium transition-all duration-200",
                item.active ? "text-primary font-semibold" : "text-muted-foreground"
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