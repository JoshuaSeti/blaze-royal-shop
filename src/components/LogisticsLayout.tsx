import { Link, useLocation } from "react-router-dom";
import { Bike, History, Wallet, LifeBuoy, Map } from "lucide-react";

const LOGISTICS_LINKS = [
  { label: "Active", href: "/logistics", icon: Map },
  { label: "History", href: "/logistics/history", icon: History },
  { label: "Earnings", href: "/logistics/earnings", icon: Wallet },
  { label: "Support", href: "/logistics/support", icon: LifeBuoy },
];

export const LogisticsLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top Header - Simple and clean */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-2">
          <Bike className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tight">GULA RIDER</span>
        </div>
        <div className="h-8 w-8 rounded-full bg-muted border animate-pulse" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20"> {/* pb-20 prevents content from being hidden by bottom nav */}
        {children}
      </main>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 border-t bg-background/80 backdrop-blur-md px-6">
        <div className="flex h-full items-center justify-between">
          {LOGISTICS_LINKS.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <link.icon className={`h-6 w-6 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};