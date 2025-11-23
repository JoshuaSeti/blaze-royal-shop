import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';

interface Dispute {
  id: string;
  orderNumber: string;
  customer: string;
  vendor: string;
  issue: string;
  status: 'open' | 'resolved' | 'escalated';
  date: string;
  amount: number;
}

const AdminDisputes = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([
    { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', vendor: 'Tech Store', issue: 'Product damaged on arrival', status: 'open', date: '2024-01-20', amount: 99.99 },
    { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', vendor: 'Fashion Hub', issue: 'Wrong size received', status: 'open', date: '2024-01-19', amount: 49.99 },
  ]);

  const handleResolve = (id: string) => {
    setDisputes(disputes.map(d => d.id === id ? { ...d, status: 'resolved' as const } : d));
    toast.success('Dispute resolved');
  };

  const getStatusColor = (status: Dispute['status']) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'escalated': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dispute Resolution</h1>
            <p className="text-muted-foreground">Handle customer disputes and complaints</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="space-y-6">
          {disputes.map((dispute) => (
            <Card key={dispute.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <CardTitle className="text-lg">{dispute.orderNumber}</CardTitle>
                      <CardDescription>
                        {dispute.customer} vs {dispute.vendor}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(dispute.status)}>
                    {dispute.status.charAt(0).toUpperCase() + dispute.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">Issue:</p>
                  <p className="text-sm text-muted-foreground">{dispute.issue}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Date: {new Date(dispute.date).toLocaleDateString()}</span>
                  <span className="font-semibold text-foreground">${dispute.amount.toFixed(2)}</span>
                </div>
                {dispute.status === 'open' && (
                  <div className="space-y-3 pt-2">
                    <Textarea placeholder="Add resolution notes..." />
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => handleResolve(dispute.id)}>
                        Refund Customer
                      </Button>
                      <Button onClick={() => handleResolve(dispute.id)}>
                        Resolve Dispute
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDisputes;
