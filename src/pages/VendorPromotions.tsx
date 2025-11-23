import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';

interface Promotion {
  id: string;
  name: string;
  description: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'ended';
  joined: boolean;
}

const VendorPromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: '1', name: 'Black Friday Sale', description: 'Biggest sale of the year', discount: 'Up to 50%', startDate: '2024-11-29', endDate: '2024-12-02', status: 'upcoming', joined: false },
    { id: '2', name: 'Flash Sale', description: '24-hour mega deals', discount: '30% off', startDate: '2024-01-15', endDate: '2024-01-16', status: 'active', joined: true },
  ]);

  const handleJoin = (id: string) => {
    setPromotions(promotions.map(p => p.id === id ? { ...p, joined: true } : p));
    toast.success('Successfully joined promotion campaign');
  };

  const getStatusColor = (status: Promotion['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Promotion Campaigns</h1>
            <p className="text-muted-foreground">Join platform-wide promotion campaigns to boost sales</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/vendor">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {promotions.map((promo) => (
            <Card key={promo.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{promo.name}</CardTitle>
                    <CardDescription>{promo.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(promo.status)}>
                    {promo.status.charAt(0).toUpperCase() + promo.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold">{promo.discount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}</span>
                </div>
                {promo.joined ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">You're participating in this campaign</span>
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => handleJoin(promo.id)}
                    disabled={promo.status === 'ended'}
                  >
                    Join Campaign
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorPromotions;
