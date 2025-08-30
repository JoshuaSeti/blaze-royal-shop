import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: 'var(--gradient-hero)' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                ✨ Premium Quality Products
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Discover Amazing 
                <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Products
                </span>
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Shop the latest trends and best deals on premium products. Quality guaranteed, fast shipping, and exceptional customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-premium text-white font-semibold px-8 py-6 text-lg hover:scale-105 transition-transform duration-300">
                Shop Now
              </Button>
              <Button variant="outline" size="lg" className="glass-card border-border/50 hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg font-semibold transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:ml-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl"></div>
              <img 
                src={heroBanner} 
                alt="Featured products showcase showcasing premium quality items" 
                className="relative w-full h-auto rounded-2xl hover-glow transition-all duration-500"
                style={{ boxShadow: 'var(--shadow-elegant)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;