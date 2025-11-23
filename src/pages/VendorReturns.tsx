import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, Package, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';

interface ReturnRequest {
  id: string;
  orderNumber: string;
  customer: string;
  product: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  date: string;
  amount: number;
}

const VendorReturns = () => {
  const [requests] = useState<ReturnRequest[]>([
    { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', product: 'Wireless Headphones', reason: 'Defective', status: 'pending', date: '2024-01-15', amount: 99.99 },
    { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', product: 'Smart Watch', reason: 'Wrong item', status: 'approved', date: '2024-01-14', amount: 299.99 },
  ]);

  const getStatusIcon = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'resolved': return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'resolved': return 'bg-green-100 text-green-800';
    }
  };

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    toast.success(`Return request ${action}d successfully`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Returns & Disputes</h1>
            <p className="text-muted-foreground">Manage customer return requests and disputes</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/vendor">Back to Dashboard</Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({requests.filter(r => r.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({requests.filter(r => r.status === 'approved').length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({requests.filter(r => r.status === 'resolved').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{request.orderNumber}</CardTitle>
                      <CardDescription>
                        {request.customer} • {new Date(request.date).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(request.status)}
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Product</p>
                      <p className="font-medium">{request.product}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reason</p>
                      <p className="font-medium">{request.reason}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-semibold text-lg">${request.amount.toFixed(2)}</p>
                      {request.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleAction(request.id, 'reject')}>
                            Reject
                          </Button>
                          <Button size="sm" onClick={() => handleAction(request.id, 'approve')}>
                            Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorReturns;
