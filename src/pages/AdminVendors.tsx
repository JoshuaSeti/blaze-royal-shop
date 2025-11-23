import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';

interface Vendor {
  id: string;
  name: string;
  companyName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  applicationDate: string;
  products: number;
}

const AdminVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: '1', name: 'Alice Cooper', companyName: 'Tech Store', email: 'alice@tech.com', status: 'pending', applicationDate: '2024-01-20', products: 0 },
    { id: '2', name: 'Bob Wilson', companyName: 'Fashion Hub', email: 'bob@fashion.com', status: 'approved', applicationDate: '2024-01-15', products: 45 },
  ]);

  const handleApprove = (id: string) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, status: 'approved' as const } : v));
    toast.success('Vendor approved successfully');
  };

  const handleReject = (id: string) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, status: 'rejected' as const } : v));
    toast.success('Vendor application rejected');
  };

  const getStatusColor = (status: Vendor['status']) => {
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
            <h1 className="text-3xl font-bold mb-2">Vendor Management</h1>
            <p className="text-muted-foreground">Review and manage vendor applications</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Vendors</TabsTrigger>
            <TabsTrigger value="pending">Pending ({vendors.filter(v => v.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({vendors.filter(v => v.status === 'approved').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {vendors.map((vendor) => (
              <Card key={vendor.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{vendor.companyName}</CardTitle>
                        <CardDescription>{vendor.name} • {vendor.email}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <p>Applied: {new Date(vendor.applicationDate).toLocaleDateString()}</p>
                      <p>Products: {vendor.products}</p>
                    </div>
                    {vendor.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="destructive" onClick={() => handleReject(vendor.id)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm" onClick={() => handleApprove(vendor.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    )}
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

export default AdminVendors;
