import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface VendorProtectedRouteProps {
  children: React.ReactNode;
}

const VendorProtectedRoute = ({ children }: VendorProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isVendor, setIsVendor] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/auth');
      return;
    }

    checkVendorStatus();
  }, [user, authLoading, navigate]);

  const checkVendorStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_vendor')
        .eq('user_id', user!.id)
        .single();

      if (error) throw error;

      if (data?.is_vendor) {
        setIsVendor(true);
      } else {
        setIsVendor(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking vendor status:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isVendor) {
    return null;
  }

  return <>{children}</>;
};

export default VendorProtectedRoute;