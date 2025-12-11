import { Link } from "react-router-dom";

const PromotionalBanner = () => {
  return (
    <div className="bg-gradient-to-r from-secondary via-secondary-hover to-secondary text-white py-2 sm:py-3">
      <div className="container mx-auto px-4">
        {/* Mobile Layout - simplified */}
        <div className="flex sm:hidden items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold">Brand Day</span>
            <div className="bg-primary px-3 py-0.5 rounded-full font-bold text-xs">
              30% OFF
            </div>
          </div>
          <div className="bg-primary px-2 py-0.5 rounded font-bold text-xs animate-pulse">
            LIVE
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Brand Day</span>
            <div className="bg-primary px-6 py-1 rounded-full font-bold text-sm">
              UP TO 30% OFF
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary px-4 py-1 rounded font-bold text-sm animate-pulse">
              LIVE NOW
            </div>
            <div className="text-right">
              <div className="text-xs">Call for Deals</div>
              <div className="font-bold">0700 600 0000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
