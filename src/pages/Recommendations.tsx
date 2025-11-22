import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Sparkles, ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const Recommendations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  
  const recommendedProducts = products.slice(0, 8);
  const trendingProducts = products.slice(3, 9);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

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
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-8 w-8" />
              Recommendations for You
            </h1>
            <p className="text-muted-foreground">
              Personalized suggestions based on your browsing history
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading recommendations...</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Recommended Based on Your Activity */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Picked Just for You
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {recommendedProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          id={product.id}
                          image={product.image_url || ''}
                          name={product.name}
                          price={product.price}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Trending Products */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Trending Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trendingProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          id={product.id}
                          image={product.image_url || ''}
                          name={product.name}
                          price={product.price}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Explore More */}
              <div className="text-center">
                <Button asChild size="lg">
                  <Link to="/">Explore All Products</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
