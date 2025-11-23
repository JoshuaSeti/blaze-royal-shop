import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const LogisticsEarnings = () => {
  const earnings = {
    today: 125.50,
    week: 650.00,
    month: 2450.00,
    total: 12340.00,
  };

  const recentPayouts = [
    { id: '1', amount: 650.00, date: '2024-01-15', status: 'completed' },
    { id: '2', amount: 580.00, date: '2024-01-08', status: 'completed' },
    { id: '3', amount: 720.00, date: '2024-01-01', status: 'completed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Earnings</h1>
            <p className="text-muted-foreground">Track your delivery earnings and payouts</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/logistics/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.today.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.week.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.month.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${earnings.total.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
            <CardDescription>Your withdrawal history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-semibold">${payout.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{new Date(payout.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-green-600 font-medium capitalize">{payout.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogisticsEarnings;
