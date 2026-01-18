import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, DollarSign, Ticket, ArrowRight } from "lucide-react";
import { useInfluencerTracking } from "@/hooks/usePromocodes";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const InfluencerTracking = () => {
  const [pin, setPin] = useState("");
  const [submittedPin, setSubmittedPin] = useState("");
  const { promocode, usage, loading, error } = useInfluencerTracking(submittedPin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPin(pin.toUpperCase());
  };

  const totalEarnings = usage.reduce((sum, u) => sum + (u.discount_applied || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!submittedPin || error ? (
          <div className="max-w-md mx-auto pt-16">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Influencer Portal</CardTitle>
                <CardDescription>
                  Enter your access PIN to view your promocode performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      value={pin}
                      onChange={(e) => setPin(e.target.value.toUpperCase())}
                      placeholder="Enter your PIN"
                      className="text-center text-2xl font-mono tracking-widest uppercase"
                      maxLength={6}
                    />
                    {error && (
                      <p className="text-sm text-destructive text-center">{error}</p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={pin.length < 4}>
                    Access Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : loading ? (
          <div className="text-center py-16">Loading...</div>
        ) : promocode ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <Badge variant="outline" className="mb-2">Influencer Dashboard</Badge>
              <h1 className="text-3xl font-bold">Welcome, {promocode.influencer_name}</h1>
              <p className="text-muted-foreground">Track your promocode performance</p>
            </div>

            {/* Promocode Info */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Promo Code</p>
                    <p className="text-3xl font-mono font-bold">{promocode.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Benefit</p>
                    <Badge className="text-lg py-1">
                      {promocode.benefit_type === 'discount_percent' && `${promocode.benefit_value}% OFF`}
                      {promocode.benefit_type === 'discount_amount' && `K${promocode.benefit_value} OFF`}
                      {promocode.benefit_type === 'free_delivery' && 'Free Delivery'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Ticket className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Uses</p>
                      <p className="text-3xl font-bold">{promocode.uses_count}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-green-100">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Savings Given</p>
                      <p className="text-3xl font-bold">K{totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={promocode.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {promocode.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage History */}
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Recent Usage</CardTitle>
                <CardDescription>Track when your code was used</CardDescription>
              </CardHeader>
              <CardContent>
                {usage.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No usage recorded yet. Share your code to start tracking!
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Discount Applied</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usage.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>{format(new Date(u.used_at), 'MMM d, yyyy')}</TableCell>
                          <TableCell>{format(new Date(u.used_at), 'h:mm a')}</TableCell>
                          <TableCell className="text-right font-medium">
                            K{(u.discount_applied || 0).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Back Button */}
            <div className="text-center">
              <Button variant="outline" onClick={() => {
                setSubmittedPin("");
                setPin("");
              }}>
                Log Out
              </Button>
            </div>
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default InfluencerTracking;
