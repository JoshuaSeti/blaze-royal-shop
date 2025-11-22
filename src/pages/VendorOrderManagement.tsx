import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

const VendorOrderManagement = () => {
  const [orders] = useState<Order[]>([
    { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', date: '2024-01-15', status: 'pending', total: 299.99, items: 3 },
    { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', date: '2024-01-14', status: 'processing', total: 149.50, items: 2 },
    { id: '3', orderNumber: 'ORD-003', customer: 'Mike Johnson', date: '2024-01-13', status: 'shipped', total: 89.99, items: 1 },
    { id: '4', orderNumber: 'ORD-004', customer: 'Sarah Wilson', date: '2024-01-12', status: 'delivered', total: 199.99, items: 4 },
  ]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <Package className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
    }
  };

  const filterOrders = (status?: Order['status']) => {
    return status ? orders.filter(o => o.status === status) : orders;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Order Management</h1>
            <p className="text-muted-foreground">Manage and track all your orders</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/vendor">Back to Dashboard</Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({filterOrders('pending').length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({filterOrders('processing').length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({filterOrders('shipped').length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({filterOrders('delivered').length})</TabsTrigger>
          </TabsList>

          {['all', 'pending', 'processing', 'shipped', 'delivered'].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterOrders(tab === 'all' ? undefined : tab as Order['status']).map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                        <CardDescription>
                          Customer: {order.customer} • {new Date(order.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                        <p className="font-semibold text-lg">${order.total.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {order.status === 'pending' && (
                          <Button size="sm">Process Order</Button>
                        )}
                        {order.status === 'processing' && (
                          <Button size="sm">Mark as Shipped</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default VendorOrderManagement;
