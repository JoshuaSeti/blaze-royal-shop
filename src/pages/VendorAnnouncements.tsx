import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'update' | 'policy' | 'promotion' | 'maintenance';
  date: string;
  isNew: boolean;
}

const VendorAnnouncements = () => {
  const announcements: Announcement[] = [
    { id: '1', title: 'New Payment Processing Fee Structure', content: 'Effective February 1st, payment processing fees will be reduced to 2.5% for all transactions.', category: 'update', date: '2024-01-20', isNew: true },
    { id: '2', title: 'Holiday Season Guidelines', content: 'Please ensure all orders are fulfilled within 48 hours during the holiday season to maintain customer satisfaction.', category: 'policy', date: '2024-01-18', isNew: true },
    { id: '3', title: 'System Maintenance Scheduled', content: 'The vendor portal will be under maintenance on January 25th from 2 AM to 4 AM.', category: 'maintenance', date: '2024-01-15', isNew: false },
  ];

  const getCategoryColor = (category: Announcement['category']) => {
    switch (category) {
      case 'update': return 'bg-blue-100 text-blue-800';
      case 'policy': return 'bg-purple-100 text-purple-800';
      case 'promotion': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Announcements
            </h1>
            <p className="text-muted-foreground">Stay updated with platform news and updates</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/vendor">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={announcement.isNew ? 'border-primary' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      {announcement.isNew && (
                        <Badge variant="default" className="text-xs">New</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(announcement.date).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className={getCategoryColor(announcement.category)}>
                        {announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{announcement.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorAnnouncements;
