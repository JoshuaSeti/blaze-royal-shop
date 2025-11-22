import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { PackageX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';

const Returns = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Return request submitted successfully');
      setOrderNumber('');
      setReason('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to submit return request');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/profile" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <PackageX className="h-8 w-8" />
              Returns & Refunds
            </h1>
            <p className="text-muted-foreground">
              Submit a return or refund request for your order
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Return Request Form</CardTitle>
              <CardDescription>
                Please provide details about your return request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">Order Number *</Label>
                  <Input
                    id="orderNumber"
                    placeholder="ORD-2024-001"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Return Reason *</Label>
                  <Select value={reason} onValueChange={setReason} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defective">Defective Product</SelectItem>
                      <SelectItem value="wrong-item">Wrong Item Received</SelectItem>
                      <SelectItem value="not-as-described">Not as Described</SelectItem>
                      <SelectItem value="changed-mind">Changed My Mind</SelectItem>
                      <SelectItem value="damaged">Damaged in Shipping</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Return Policy</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Returns accepted within 30 days of delivery</li>
                    <li>• Items must be unused and in original packaging</li>
                    <li>• Refunds processed within 5-7 business days</li>
                    <li>• Return shipping costs may apply</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? 'Submitting...' : 'Submit Return Request'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link to="/order-history">View Orders</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Returns;
