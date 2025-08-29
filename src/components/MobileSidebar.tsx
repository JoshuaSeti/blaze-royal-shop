import { Home, ShoppingBag, Heart, User, Package, Truck, HelpCircle, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "All Products", url: "/products", icon: ShoppingBag },
  { title: "Wishlist", url: "/wishlist", icon: Heart },
  { title: "My Account", url: "/account", icon: User },
];

const orderItems = [
  { title: "My Orders", url: "/orders", icon: Package },
  { title: "Track Order", url: "/track", icon: Truck },
];

const supportItems = [
  { title: "Help Center", url: "/help", icon: HelpCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Main Menu</h3>
            <div className="space-y-1">
              {mainItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-muted text-primary font-medium"
                        : "hover:bg-muted/50"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Orders</h3>
            <div className="space-y-1">
              {orderItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-muted text-primary font-medium"
                        : "hover:bg-muted/50"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">Support</h3>
            <div className="space-y-1">
              {supportItems.map((item) => (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-muted text-primary font-medium"
                        : "hover:bg-muted/50"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}