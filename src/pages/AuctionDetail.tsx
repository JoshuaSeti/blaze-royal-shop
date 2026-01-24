import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Gavel, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  AlertCircle,
  Users,
  Trophy,
  ArrowUp
} from "lucide-react";
import { formatDistanceToNow, isPast, format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuctionBids, Auction } from "@/hooks/useAuctions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const AuctionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [bidAmount, setBidAmount] = useState("");
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const { bids, loading: bidsLoading, placeBid, refetch: refetchBids } = useAuctionBids(id || "");

  useEffect(() => {
    const fetchAuction = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from("auctions")
          .select(`
            *,
            product:products (
              name,
              image_url,
              description
            )
          `)
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        setAuction(data as Auction);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();

    // Set up realtime subscription for auction updates
    const channel = supabase
      .channel(`auction_${id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'auctions', filter: `id=eq.${id}` },
        (payload) => {
          setAuction(prev => prev ? { ...prev, ...payload.new } : null);
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'auction_bids', filter: `auction_id=eq.${id}` },
        () => {
          refetchBids();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, refetchBids]);

  const handlePlaceBid = async () => {
    if (!user) {
      toast.error("Please log in to place a bid");
      return;
    }

    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid bid amount");
      return;
    }

    setIsPlacingBid(true);
    await placeBid(amount);
    setBidAmount("");
    setIsPlacingBid(false);
  };

  const getTimeRemaining = (endTime: string) => {
    if (isPast(new Date(endTime))) {
      return "Auction Ended";
    }
    return formatDistanceToNow(new Date(endTime), { addSuffix: true });
  };

  const minNextBid = auction ? auction.current_price + auction.min_bid_increment : 0;
  const isEnded = auction ? isPast(new Date(auction.end_time)) : false;
  const hoursLeft = auction ? (new Date(auction.end_time).getTime() - Date.now()) / (1000 * 60 * 60) : 0;
  const isEndingSoon = hoursLeft <= 24 && hoursLeft > 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-96 w-full rounded-xl" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div>
              <Skeleton className="h-80 w-full rounded-xl" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <Gavel className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Auction Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This auction doesn't exist or has been removed.
          </p>
          <Link to="/auctions">
            <Button>Browse Auctions</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/auctions" className="hover:text-primary">Auctions</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground truncate">{auction.product?.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Image */}
            <div className="relative rounded-xl overflow-hidden bg-card">
              <img
                src={auction.product?.image_url || "/placeholder.svg"}
                alt={auction.product?.name || "Auction item"}
                className="w-full h-96 object-cover"
              />
              {isEndingSoon && !isEnded && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground text-sm px-3 py-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Ending Soon!
                </Badge>
              )}
              {isEnded && (
                <Badge className="absolute top-4 left-4 bg-muted text-muted-foreground text-sm px-3 py-1">
                  Auction Ended
                </Badge>
              )}
              <Badge className="absolute top-4 right-4 bg-primary text-sm px-3 py-1">
                <Gavel className="h-4 w-4 mr-1" />
                {isEnded ? "Closed" : "Live Auction"}
              </Badge>
            </div>

            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{auction.product?.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {auction.product?.description || "No description available for this item."}
                </p>
                
                <Separator />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting Price</span>
                    <p className="font-semibold">K{auction.starting_price.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Min Increment</span>
                    <p className="font-semibold">K{auction.min_bid_increment.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Start Time</span>
                    <p className="font-semibold">{format(new Date(auction.start_time), "PPp")}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">End Time</span>
                    <p className="font-semibold">{format(new Date(auction.end_time), "PPp")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Bid History ({bids.length} bids)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bidsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : bids.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No bids yet. Be the first to bid!</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {bids.map((bid, index) => (
                      <div 
                        key={bid.id} 
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          index === 0 ? "bg-primary/10 border border-primary/20" : "bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={index === 0 ? "bg-primary text-primary-foreground" : ""}>
                              {index === 0 ? <Trophy className="h-4 w-4" /> : (index + 1)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              Bidder #{bid.bidder_id.slice(0, 8)}
                              {bid.bidder_id === user?.id && " (You)"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(bid.created_at), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${index === 0 ? "text-primary" : ""}`}>
                            K{bid.bid_amount.toLocaleString()}
                          </p>
                          {index === 0 && (
                            <Badge variant="outline" className="text-xs">Highest</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bidding Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Place Your Bid</CardTitle>
                  <Badge variant={isEnded ? "secondary" : isEndingSoon ? "destructive" : "default"}>
                    <Clock className="h-3 w-3 mr-1" />
                    {getTimeRemaining(auction.end_time)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Price */}
                <div className="text-center p-6 bg-primary/5 rounded-xl">
                  <span className="text-sm text-muted-foreground">Current Bid</span>
                  <p className="text-4xl font-bold text-primary">
                    K{auction.current_price.toLocaleString()}
                  </p>
                  {bids.length > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      {bids.length} bid{bids.length > 1 ? "s" : ""} placed
                    </p>
                  )}
                </div>

                {isEnded ? (
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">This auction has ended</p>
                    {bids.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Winning bid: K{bids[0]?.bid_amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Bid Input */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ArrowUp className="h-4 w-4" />
                        <span>Minimum bid: K{minNextBid.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">K</span>
                          <Input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            placeholder={minNextBid.toLocaleString()}
                            className="pl-8"
                            min={minNextBid}
                            disabled={!user || isPlacingBid}
                          />
                        </div>
                      </div>
                      
                      {/* Quick Bid Buttons */}
                      <div className="grid grid-cols-3 gap-2">
                        {[0, 50, 100].map((increment) => (
                          <Button
                            key={increment}
                            variant="outline"
                            size="sm"
                            onClick={() => setBidAmount((minNextBid + increment).toString())}
                            disabled={!user}
                          >
                            +K{increment === 0 ? "Min" : increment}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {!user ? (
                      <div className="space-y-3">
                        <p className="text-sm text-center text-muted-foreground">
                          Please log in to place a bid
                        </p>
                        <Link to="/auth" className="block">
                          <Button className="w-full">Log In to Bid</Button>
                        </Link>
                      </div>
                    ) : (
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={handlePlaceBid}
                        disabled={isPlacingBid || !bidAmount}
                      >
                        <Gavel className="h-5 w-5 mr-2" />
                        {isPlacingBid ? "Placing Bid..." : "Place Bid"}
                      </Button>
                    )}

                    <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <p className="text-amber-800 dark:text-amber-200">
                        By placing a bid, you commit to purchasing this item if you win.
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Auction Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Starting Price</span>
                    <span>K{auction.starting_price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Min Increment</span>
                    <span>K{auction.min_bid_increment.toLocaleString()}</span>
                  </div>
                  {auction.reserve_price && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reserve Price</span>
                      <span className={auction.current_price >= auction.reserve_price ? "text-green-600" : "text-orange-600"}>
                        {auction.current_price >= auction.reserve_price ? "Met" : "Not Met"}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuctionDetail;