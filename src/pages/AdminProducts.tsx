import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  vendor: string;
  price: number;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Wireless Headphones', vendor: 'Tech Store', price: 99.99, category: 'Electronics', status: 'pending', submittedDate: '2024-01-20' },
    { id: '2', name: 'Running Shoes', vendor: 'Sports Shop', price: 79.99, category: 'Sports', status: 'pending', submittedDate: '2024-01-19' },
  ]);

  const handleApprove = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'approved' as const } : p));
    toast.success('Product approved');
  };

  const handleReject = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, status: 'rejected' as const } : p));
    toast.success('Product rejected');
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Approval</h1>
            <p className="text-muted-foreground">Review and moderate product submissions</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>
                      by {product.vendor} • {product.category}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(product.submittedDate).toLocaleDateString()}
                    </p>
                  </div>
                  {product.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" onClick={() => handleReject(product.id)}>
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(product.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
