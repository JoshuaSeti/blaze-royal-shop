import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PromoBannerCardProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  link?: string;
  bgColor?: string;
  bgImage?: string;
}

const PromoBannerCard = ({ 
  title, 
  subtitle, 
  buttonText = "Shop now", 
  link = "/search",
  bgColor = "bg-muted",
  bgImage
}: PromoBannerCardProps) => {
  return (
    <section className="py-4 sm:py-6">
      <div className="container mx-auto px-4">
        <div 
          className={`relative rounded-xl overflow-hidden ${bgColor}`}
          style={bgImage ? { 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : undefined}
        >
          <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 uppercase tracking-wide">
              {title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mb-6 sm:mb-8">
              {subtitle}
            </p>
            <Button 
              asChild
              variant="secondary" 
              className="bg-white text-foreground hover:bg-white/90 font-medium px-6 py-2 rounded-full"
            >
              <Link to={link}>
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBannerCard;
