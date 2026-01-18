import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCampaign, useCampaignProducts } from "@/hooks/usePromotionCampaigns";
import { format, formatDistanceToNow, isPast, isFuture } from "date-fns";

const PromotionPage = () => {
  const { id } = useParams();
  const { campaign, loading: campaignLoading } = useCampaign(id || "");
  const { products, loading: productsLoading } = useCampaignProducts(id || "");

  const getStatusBadge = () => {
    if (!campaign) return null;
    
    const now = new Date();
    const startDate = new Date(campaign.start_date);
    const endDate = new Date(campaign.end_date);

    if (isFuture(startDate)) {
      return <Badge className="bg-blue-100 text-blue-800">Starts {formatDistanceToNow(startDate, { addSuffix: true })}</Badge>;
    }
    if (isPast(endDate)) {
      return <Badge variant="secondary">Ended</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800">Active Now</Badge>;
  };

  if (campaignLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full rounded-xl mb-8" />
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Promotion Not Found</h1>
          <p className="text-muted-foreground mb-6">This promotion doesn't exist or has been removed.</p>
          <Link to="/promotions">
            <Button>View All Promotions</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Banner */}
        <div className="relative">
          {campaign.banner_url ? (
            <div className="h-64 md:h-80 lg:h-96 overflow-hidden">
              <img 
                src={campaign.banner_url} 
                alt={campaign.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          ) : (
            <div className="h-64 md:h-80 bg-gradient-to-br from-primary to-primary/60" />
          )}
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <Link to="/promotions">
                <Button variant="ghost" className="text-white mb-4 hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Promotions
                </Button>
              </Link>
              <div className="flex items-center gap-3 mb-2">
                {getStatusBadge()}
                {campaign.discount_value && (
                  <Badge variant="destructive" className="text-lg py-1">
                    {campaign.discount_type === 'percent' 
                      ? `${campaign.discount_value}% OFF` 
                      : `K${campaign.discount_value} OFF`}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{campaign.name}</h1>
              {campaign.description && (
                <p className="text-white/80 text-lg max-w-2xl">{campaign.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-6 mb-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">
                  {format(new Date(campaign.start_date), 'MMM d')} - {format(new Date(campaign.end_date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="font-medium">{products.length} items</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {isPast(new Date(campaign.end_date)) ? 'Ended' : 'Ends'}
                </p>
                <p className="font-medium">
                  {formatDistanceToNow(new Date(campaign.end_date), { addSuffix: true })}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Products in this Promotion</h2>
            <p className="text-muted-foreground">Shop amazing deals from participating sellers</p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-xl">
              <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products yet</h3>
              <p className="text-muted-foreground">
                Check back soon as sellers add their products to this promotion
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((cp) => cp.product && (
                <ProductCard
                  key={cp.id}
                  id={cp.product.id}
                  image={cp.product.image_url || "/placeholder.svg"}
                  name={cp.product.name}
                  price={cp.product.price}
                  originalPrice={cp.product.original_price || undefined}
                  discount={cp.product.discount_percent || undefined}
                  rating={4.5}
                  reviews={0}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromotionPage;
