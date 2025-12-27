import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';

interface WishlistItem {
  id: string;
  product_name: string;
  product_price: number;
  product_image_url: string | null;
  product_url: string | null;
  created_at: string;
}

const Wishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // TODO: Re-enable before production
  useEffect(() => {
    // if (!user) {
    //   navigate('/auth');
    //   return;
    // }
    if (user) fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setItems(prev => prev.filter(item => item.id !== itemId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  // TODO: Re-enable before production
  // if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
              <Heart className="h-8 w-8" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading wishlist...</p>
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Start adding items you love to your wishlist
                </p>
                <Button asChild>
                  <Link to="/">Browse Products</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-square relative bg-muted">
                    {item.product_image_url ? (
                      <img
                        src={item.product_image_url}
                        alt={item.product_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{item.product_name}</h3>
                    {item.product_price && (
                      <p className="text-xl font-bold text-primary mb-4">
                        ${item.product_price.toFixed(2)}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" disabled>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
