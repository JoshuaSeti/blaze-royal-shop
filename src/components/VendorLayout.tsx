import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, BarChart3, Wallet, Megaphone, Bell, Undo2, LifeBuoy, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/vendor" },
  { icon: Package, label: "Products", path: "/vendor/products" },
  { icon: ShoppingBag, label: "Orders", path: "/vendor/orders" },
  { icon: BarChart3, label: "Analytics", path: "/vendor/analytics" },
  { icon: Wallet, label: "Withdrawals", path: "/vendor/withdraw" },
  { icon: Megaphone, label: "Promotions", path: "/vendor/promotions" },
  { icon: Bell, label: "Announcements", path: "/vendor/announcements" },
  { icon: Undo2, label: "Returns", path: "/vendor/returns" },
];

export const VendorLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const VENDOR_LINKS = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard },
  { label: "Products", href: "/vendor/products", icon: Package },
  { label: "Orders", href: "/vendor/orders", icon: ShoppingBag },
  { label: "Analytics", href: "/vendor/analytics", icon: BarChart3 },
  { label: "Withdrawals", href: "/vendor/withdrawals", icon: Wallet },
  { label: "Promotions", href: "/vendor/promotions", icon: Megaphone },
];
  const NavLinks = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
      {VENDOR_LINKS.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            location.pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground"
          }`}
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* --- DESKTOP SIDEBAR --- */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="text-primary text-xl font-bold tracking-tight">Gula Vendor</span>
            </Link>
          </div>
          <div className="flex-1 py-4">
            <NavLinks />
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex flex-col">
        {/* TOP BAR (Visible on Mobile) */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-72">
              <div className="mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="font-semibold text-lg">Vendor Portal</h1>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};