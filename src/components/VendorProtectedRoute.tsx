import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface VendorProtectedRouteProps {
  children: React.ReactNode;
}

const VendorProtectedRoute = ({ children }: VendorProtectedRouteProps) => {
  // Temporarily bypassing authentication for development/testing
  // TODO: Re-enable authentication checks before production
  return <>{children}</>;
};

export default VendorProtectedRoute;