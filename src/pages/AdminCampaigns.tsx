import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Campaign {
  id: string;
  name: string;
  code: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'ended';
  uses: number;
}

const AdminCampaigns = () => {
  const [campaigns] = useState<Campaign[]>([
    { id: '1', name: 'Black Friday', code: 'BF2024', discount: '50%', startDate: '2024-11-29', endDate: '2024-12-02', status: 'scheduled', uses: 0 },
    { id: '2', name: 'New Year Sale', code: 'NY2024', discount: '30%', startDate: '2024-01-01', endDate: '2024-01-07', status: 'active', uses: 234 },
  ]);

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Marketing Campaigns</h1>
            <p className="text-muted-foreground">Create and manage promotional campaigns</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>Set up a new promotional campaign</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input id="name" placeholder="e.g. Black Friday Sale" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Promo Code</Label>
                    <Input id="code" placeholder="e.g. BF2024" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount</Label>
                    <Input id="discount" placeholder="e.g. 50%" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start">Start Date</Label>
                      <Input id="start" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end">End Date</Label>
                      <Input id="end" type="date" />
                    </div>
                  </div>
                  <Button className="w-full">Create Campaign</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button asChild variant="outline">
              <Link to="/admin/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{campaign.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {campaign.code}
                      </span>
                      <span>Discount: {campaign.discount}</span>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                    <span>Uses: {campaign.uses}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">End Campaign</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCampaigns;
