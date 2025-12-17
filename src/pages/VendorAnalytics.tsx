import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Package, Users, ArrowUp, ArrowDown, Sparkles, Search, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const VendorAnalytics = () => {
  const stats = {
    totalRevenue: { value: 45678.90, change: 12.5, trending: 'up' },
    totalOrders: { value: 234, change: 8.3, trending: 'up' },
    totalProducts: { value: 48, change: 4.2, trending: 'up' },
    avgOrderValue: { value: 195.20, change: -2.1, trending: 'down' },
  };

  const topProducts = [
    { name: 'Wireless Headphones', sales: 45, revenue: 6750 },
    { name: 'Smart Watch', sales: 38, revenue: 11400 },
    { name: 'Laptop Backpack', sales: 32, revenue: 2560 },
    { name: 'USB-C Hub', sales: 28, revenue: 1680 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your performance and insights</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/vendor">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.value.toLocaleString()}</div>
              <div className={`flex items-center gap-1 text-sm ${stats.totalRevenue.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.totalRevenue.trending === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {stats.totalRevenue.change}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Total Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.value}</div>
              <div className={`flex items-center gap-1 text-sm ${stats.totalOrders.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.totalOrders.trending === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {stats.totalOrders.change}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts.value}</div>
              <div className={`flex items-center gap-1 text-sm ${stats.totalProducts.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.totalProducts.trending === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {stats.totalProducts.change}% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Avg Order Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.avgOrderValue.value.toFixed(2)}</div>
              <div className={`flex items-center gap-1 text-sm ${stats.avgOrderValue.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stats.avgOrderValue.trending === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                {Math.abs(stats.avgOrderValue.change)}% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MarketPulse Insights */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              MarketPulse™ Insights
            </CardTitle>
            <CardDescription>AI-powered market trends and opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Upward trend in price for smartwatches</p>
                  <p className="text-xs text-muted-foreground mt-1">Consider adjusting pricing strategy</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <Search className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">iPhone accessory searches up 14% from last month</p>
                  <p className="text-xs text-muted-foreground mt-1">High demand opportunity</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Wireless earbuds category growing 23% YoY</p>
                  <p className="text-xs text-muted-foreground mt-1">Expand your audio inventory</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">Laptop bags trending in back-to-school season</p>
                  <p className="text-xs text-muted-foreground mt-1">Stock up before demand peaks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                <div className="p-2 rounded-full bg-red-100 text-red-600">
                  <ArrowDown className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">USB-A accessories declining in searches</p>
                  <p className="text-xs text-muted-foreground mt-1">Shift focus to USB-C products</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-background border">
                <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">New trend: MagSafe compatible accessories</p>
                  <p className="text-xs text-muted-foreground mt-1">Emerging category opportunity</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">${product.revenue.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Chart</CardTitle>
              <CardDescription>Revenue over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">Chart placeholder - integrate chart library</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;
