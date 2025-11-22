import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import VendorAuth from "./pages/VendorAuth";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Categories from "./pages/Categories";
import OrderHistory from "./pages/OrderHistory";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import VendorDashboard from "./pages/VendorDashboard";
import VendorProducts from "./pages/VendorProducts";
import VendorOrderManagement from "./pages/VendorOrderManagement";
import VendorAnalytics from "./pages/VendorAnalytics";
import VendorWithdraw from "./pages/VendorWithdraw";
import VendorProtectedRoute from "./components/VendorProtectedRoute";
import BottomNavigation from "./components/BottomNavigation";
import Search from "./pages/Search";
import Stores from "./pages/Stores";
import PasswordReset from "./pages/PasswordReset";
import Wishlist from "./pages/Wishlist";
import Recommendations from "./pages/Recommendations";
import Returns from "./pages/Returns";
import Help from "./pages/Help";
import Support from "./pages/Support";
import Reviews from "./pages/Reviews";
import Referral from "./pages/Referral";
import Promotions from "./pages/Promotions";
import Blog from "./pages/Blog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/vendor-auth" element={<VendorAuth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/help" element={<Help />} />
              <Route path="/support" element={<Support />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/referral" element={<Referral />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/vendor" element={
                <VendorProtectedRoute>
                  <VendorDashboard />
                </VendorProtectedRoute>
              } />
              <Route path="/vendor/products" element={
                <VendorProtectedRoute>
                  <VendorProducts />
                </VendorProtectedRoute>
              } />
              <Route path="/vendor/orders" element={
                <VendorProtectedRoute>
                  <VendorOrderManagement />
                </VendorProtectedRoute>
              } />
              <Route path="/vendor/analytics" element={
                <VendorProtectedRoute>
                  <VendorAnalytics />
                </VendorProtectedRoute>
              } />
              <Route path="/vendor/withdraw" element={
                <VendorProtectedRoute>
                  <VendorWithdraw />
                </VendorProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNavigation />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
