import { Phone, Store, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col gap-4 w-64">
      {/* Call to Order */}
      <div className="glass-card rounded-lg p-4 flex items-center gap-3">
        <div className="bg-primary/10 p-3 rounded-full">
          <Phone className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">CALL TO ORDER</div>
          <div className="font-bold text-sm">0700-600-0000</div>
        </div>
      </div>

      {/* Sell on ShopHub */}
      <Link to="/vendor-auth">
        <div className="glass-card rounded-lg p-4 flex items-center gap-3 hover:bg-accent transition-colors cursor-pointer">
          <div className="bg-primary/10 p-3 rounded-full">
            <Store className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="font-semibold text-sm">Sell on ShopHub</div>
          </div>
        </div>
      </Link>

      {/* Send Your Packages */}
      <div className="glass-card rounded-lg p-4 flex items-center gap-3 hover:bg-accent transition-colors cursor-pointer">
        <div className="bg-primary/10 p-3 rounded-full">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="font-semibold text-sm">Send Your Packages</div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
