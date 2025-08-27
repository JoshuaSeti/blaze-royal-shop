import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import summerSaleBanner from "@/assets/banner-summer-sale.jpg";
import techBanner from "@/assets/banner-tech.jpg";
import fashionBanner from "@/assets/banner-fashion.jpg";

const BannerCarousel = () => {
  const banners = [
    {
      id: 1,
      image: summerSaleBanner,
      title: "Summer Sale",
      subtitle: "Up to 70% Off",
      description: "Don't miss out on amazing deals",
      buttonText: "Shop Now",
      buttonLink: "/sale"
    },
    {
      id: 2,
      image: techBanner,
      title: "New Tech Arrivals",
      subtitle: "Latest Gadgets",
      description: "Discover cutting-edge technology",
      buttonText: "Explore Tech",
      buttonLink: "/electronics"
    },
    {
      id: 3,
      image: fashionBanner,
      title: "Fashion Week Special",
      subtitle: "Trending Styles",
      description: "Stay ahead of fashion trends",
      buttonText: "Shop Fashion",
      buttonLink: "/fashion"
    }
  ];

  return (
    <section className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-lg text-white">
                      <h2 className="text-4xl lg:text-6xl font-bold mb-2">
                        {banner.title}
                      </h2>
                      <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-orange-300">
                        {banner.subtitle}
                      </h3>
                      <p className="text-lg mb-6 opacity-90">
                        {banner.description}
                      </p>
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary-hover text-primary-foreground"
                      >
                        {banner.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default BannerCarousel;