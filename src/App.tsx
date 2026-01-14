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
import VendorLogin from "./pages/VendorLogin";
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
import VendorReturns from "./pages/VendorReturns";
import VendorPromotions from "./pages/VendorPromotions";
import VendorAnnouncements from "./pages/VendorAnnouncements";
import VendorProtectedRoute from "./components/VendorProtectedRoute";
import LogisticsLogin from "./pages/LogisticsLogin";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import LogisticsEarnings from "./pages/LogisticsEarnings";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminVendors from "./pages/AdminVendors";
import AdminProducts from "./pages/AdminProducts";
import AdminDisputes from "./pages/AdminDisputes";
import AdminCampaigns from "./pages/AdminCampaigns";
import AdminContent from "./pages/AdminContent";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DeliveryPolicy from "./pages/DeliveryPolicy";
import Careers from "./pages/Careers";
import About from "./pages/About";

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

// 📂 Secondary / Profile Menu (dropdown or account tab)
// User-specific, but important.
// Orders
// Returns
// Referral
// Saved / Recommendations (if personalized)
// Support / Help Center
// 🧾 Footer (low-frequency, trust & legal)
// These should live in the footer, even if you later minimize or collapse it.
// About
// Careers
// Privacy Policy
// Terms of Service
// Refund / Return Policy (if informational page)
// Contact / Support overview
// Even if you “remove” the footer visually, these links should still exist somewhere for legal and trust reasons.
// 🛍 Vendor Portal (separate navigation entirely)
// This is not part of the consumer site nav.
// Vendor menu:
// Dashboard
// Products
// Orders
// Analytics
// Withdrawals
// Promotions
// Announcements
// Returns
// Support
// Think Shopify Seller Dashboard, not Amazon homepage.
// 🚚 Logistics Portal (fully separate app or subdomain)
// Do NOT mix with consumer UX.
// Rider login
// Active deliveries
// Earnings
// History
// Support

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
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
          <Route path="/vendor-login" element={<VendorLogin />} />
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
              <Route path="/vendor/returns" element={
                <VendorProtectedRoute>
                  <VendorReturns />
                </VendorProtectedRoute>
              } />
              <Route path="/vendor/promotions" element={
                <VendorProtectedRoute>
                  <VendorPromotions />
                </VendorProtectedRoute>
              } />
              <Route path="/vendor/announcements" element={
                <VendorProtectedRoute>
                  <VendorAnnouncements />
                </VendorProtectedRoute>
              } />
              <Route path="/logistics-login" element={<LogisticsLogin />} />
              <Route path="/logistics/dashboard" element={<LogisticsDashboard />} />
              <Route path="/logistics/earnings" element={<LogisticsEarnings />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/vendors" element={<AdminVendors />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/disputes" element={<AdminDisputes />} />
              <Route path="/admin/campaigns" element={<AdminCampaigns />} />
              <Route path="/admin/content" element={<AdminContent />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/delivery-policy" element={<DeliveryPolicy />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
