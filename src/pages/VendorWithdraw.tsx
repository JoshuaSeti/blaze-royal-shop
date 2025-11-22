import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, CreditCard, Smartphone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';

const VendorWithdraw = () => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const availableBalance = 5432.10;

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Withdrawal request submitted successfully');
      setAmount('');
      setMethod('');
    } catch (error) {
      toast.error('Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Withdraw Funds</h1>
              <p className="text-muted-foreground">Transfer funds to your bank or mobile money</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/vendor">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-2">
                ${availableBalance.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum withdrawal amount: $50.00
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Withdrawal Request</CardTitle>
              <CardDescription>
                Enter the amount and select your preferred withdrawal method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdraw} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Withdrawal Amount *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8"
                      min="50"
                      max={availableBalance}
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method">Withdrawal Method *</Label>
                  <Select value={method} onValueChange={setMethod} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select withdrawal method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Bank Transfer
                        </div>
                      </SelectItem>
                      <SelectItem value="mobile">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Mobile Money
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {method === 'bank' && (
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input id="accountName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input id="accountNumber" placeholder="1234567890" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input id="bankName" placeholder="Example Bank" required />
                    </div>
                  </div>
                )}

                {method === 'mobile' && (
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input id="phoneNumber" placeholder="+1234567890" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provider">Mobile Money Provider</Label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                          <SelectItem value="airtel">Airtel Money</SelectItem>
                          <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Important Notes:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Processing time: 2-5 business days</li>
                    <li>• Withdrawal fees may apply based on method</li>
                    <li>• Minimum withdrawal amount is $50.00</li>
                    <li>• Ensure account details are correct to avoid delays</li>
                  </ul>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading || !amount || !method || parseFloat(amount) < 50}
                >
                  {loading ? 'Processing...' : 'Submit Withdrawal Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorWithdraw;
