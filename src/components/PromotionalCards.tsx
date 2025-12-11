import { Link } from "react-router-dom";

const PromotionalCards = () => {
  const promos = [
    { 
      title: "Deal of the Month", 
      color: "bg-gradient-to-br from-red-500 to-red-600",
      link: "/promotions"
    },
    { 
      title: "Clearance Sales", 
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      link: "/promotions"
    },
    { 
      title: "Send Packages Securely", 
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      link: "/support"
    },
    { 
      title: "NEW ARRIVAL", 
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      link: "/search"
    },
    { 
      title: "Toys & Games", 
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      link: "/categories?cat=toys"
    },
    { 
      title: "Earn While You Shop", 
      color: "bg-gradient-to-br from-primary to-primary-glow",
      link: "/referral"
    },
    { 
      title: "Deals Reloaded", 
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      link: "/promotions"
    }
  ];

  return (
    <section className="py-2 sm:py-4">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hidden pb-2 -mx-4 px-4">
          {promos.map((promo, index) => (
            <Link
              key={index}
              to={promo.link}
              className={`${promo.color} text-white rounded-lg px-3 sm:px-6 py-2.5 sm:py-4 flex items-center justify-center text-center font-bold text-xs sm:text-sm whitespace-nowrap active:scale-95 sm:hover:scale-105 transition-transform duration-300 shadow-md sm:shadow-lg shrink-0`}
            >
              {promo.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalCards;
