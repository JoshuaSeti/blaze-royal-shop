import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Tag, Clock, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const Promotions = () => {
  const { products, loading } = useProducts();
  
  const flashDeals = products.slice(0, 4);
  const dailyDeals = products.slice(2, 6);
  const weekendSpecials = products.slice(4, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <Zap className="h-10 w-10" />
              Gula Deals
            </h1>
            <p className="text-muted-foreground text-lg">
              Exclusive promotions and limited-time offers
            </p>
          </div>

          {/* Featured Banner */}
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <Badge className="mb-3">Limited Time Offer</Badge>
                  <h2 className="text-3xl font-bold mb-2">Flash Sale - Up to 70% Off!</h2>
                  <p className="text-muted-foreground mb-4">
                    Don't miss out on incredible savings across all categories
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-semibold">Ends in: 23h 45m 12s</span>
                    </div>
                  </div>
                </div>
                <div className="text-6xl font-bold text-primary">70%</div>
              </div>
            </CardContent>
          </Card>

          {/* Promotions Tabs */}
          <Tabs defaultValue="flash" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flash" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Flash Deals
              </TabsTrigger>
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Daily Deals
              </TabsTrigger>
              <TabsTrigger value="weekend" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Weekend Specials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flash" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Flash Deals
                  </CardTitle>
                  <CardDescription>
                    Limited quantity - grab them before they're gone!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading deals...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {flashDeals.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          id={product.id}
                          image={product.image_url || ''}
                          name={product.name}
                          price={product.price}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="daily" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Today's Deals
                  </CardTitle>
                  <CardDescription>
                    New deals every day - check back tomorrow for more!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading deals...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {dailyDeals.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          id={product.id}
                          image={product.image_url || ''}
                          name={product.name}
                          price={product.price}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekend" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Weekend Specials
                  </CardTitle>
                  <CardDescription>
                    Exclusive weekend offers you won't want to miss
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading deals...</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {weekendSpecials.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          id={product.id}
                          image={product.image_url || ''}
                          name={product.name}
                          price={product.price}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Newsletter Signup */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Never Miss a Deal</CardTitle>
              <CardDescription>
                Subscribe to our newsletter for exclusive promotions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border rounded-md"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
