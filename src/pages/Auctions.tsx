import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Gavel, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { formatDistanceToNow, isPast } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuctions } from "@/hooks/useAuctions";

const Auctions = () => {
  const { auctions, loading } = useAuctions();

  const getTimeRemaining = (endTime: string) => {
    if (isPast(new Date(endTime))) {
      return "Ended";
    }
    return formatDistanceToNow(new Date(endTime), { addSuffix: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 md:p-12 mb-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Gavel className="h-8 w-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Live Auctions</h1>
            </div>
            <p className="text-lg text-primary-foreground/90 max-w-xl">
              Discover amazing deals and bid on exclusive products. Place your bids and win incredible items at unbeatable prices!
            </p>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <Gavel className="w-full h-full" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{auctions.length}</div>
              <div className="text-sm text-muted-foreground">Active Auctions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {auctions.filter(a => {
                  const hoursLeft = (new Date(a.end_time).getTime() - Date.now()) / (1000 * 60 * 60);
                  return hoursLeft <= 24 && hoursLeft > 0;
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">Ending Soon</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                K{auctions.reduce((sum, a) => sum + a.current_price, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Bids Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {auctions.length > 0 ? Math.round((auctions.reduce((sum, a) => sum + ((a.starting_price - a.current_price) / a.starting_price * -100), 0) / auctions.length)) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Avg. Bid Increase</div>
            </CardContent>
          </Card>
        </div>

        {/* Auctions Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : auctions.length === 0 ? (
          <Card className="p-12 text-center">
            <Gavel className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Active Auctions</h2>
            <p className="text-muted-foreground mb-6">
              Check back soon for exciting new auctions!
            </p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {auctions.map((auction) => {
              const hoursLeft = (new Date(auction.end_time).getTime() - Date.now()) / (1000 * 60 * 60);
              const isEndingSoon = hoursLeft <= 24 && hoursLeft > 0;
              
              return (
                <Link key={auction.id} to={`/auctions/${auction.id}`}>
                  <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
                    <div className="relative">
                      <img
                        src={auction.product?.image_url || "/placeholder.svg"}
                        alt={auction.product?.name || "Auction item"}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isEndingSoon && (
                        <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          Ending Soon
                        </Badge>
                      )}
                      <Badge className="absolute top-3 right-3 bg-primary">
                        <Gavel className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {auction.product?.name || "Auction Item"}
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Current Bid</span>
                          <span className="font-bold text-primary text-lg">
                            K{auction.current_price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Starting Price</span>
                          <span className="text-muted-foreground line-through">
                            K{auction.starting_price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className={isEndingSoon ? "text-destructive font-medium" : "text-muted-foreground"}>
                          Ends {getTimeRemaining(auction.end_time)}
                        </span>
                      </div>

                      <Button className="w-full group-hover:bg-primary-hover" size="sm">
                        Place Bid
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* How it Works */}
        <section className="mt-16 py-12 border-t">
          <h2 className="text-2xl font-bold text-center mb-8">How Auctions Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Find an Auction</h3>
              <p className="text-muted-foreground text-sm">
                Browse active auctions and find items you're interested in bidding on.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Place Your Bid</h3>
              <p className="text-muted-foreground text-sm">
                Enter your bid amount. Make sure it's higher than the current bid plus the minimum increment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Win & Pay</h3>
              <p className="text-muted-foreground text-sm">
                If you're the highest bidder when the auction ends, you win! Complete your purchase to claim the item.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Auctions;