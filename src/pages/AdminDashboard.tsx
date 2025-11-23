import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store, Package, DollarSign, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '12,543', icon: Users, change: '+12%', link: '/admin/users' },
    { title: 'Active Vendors', value: '1,234', icon: Store, change: '+8%', link: '/admin/vendors' },
    { title: 'Total Orders', value: '45,678', icon: Package, change: '+23%', link: '/admin/orders' },
    { title: 'Revenue', value: '$234,567', icon: DollarSign, change: '+15%', link: '/admin/revenue' },
    { title: 'Pending Disputes', value: '23', icon: AlertCircle, change: '-5%', link: '/admin/disputes' },
    { title: 'Platform Growth', value: '45%', icon: TrendingUp, change: '+10%', link: '/admin/analytics' },
  ];

  const quickActions = [
    { title: 'User Management', description: 'Manage users and permissions', link: '/admin/users' },
    { title: 'Vendor Approval', description: 'Review vendor applications', link: '/admin/vendors' },
    { title: 'Product Moderation', description: 'Approve or reject products', link: '/admin/products' },
    { title: 'Dispute Resolution', description: 'Handle customer disputes', link: '/admin/disputes' },
    { title: 'Marketing Campaigns', description: 'Manage promotions', link: '/admin/campaigns' },
    { title: 'Content Management', description: 'Edit blogs and announcements', link: '/admin/content' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={action.link}>Manage</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
