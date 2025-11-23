import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Bell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const AdminContent = () => {
  const blogs = [
    { id: '1', title: 'Top 10 Products of 2024', status: 'published', date: '2024-01-15', views: 1234 },
    { id: '2', title: 'How to Shop Safely Online', status: 'draft', date: '2024-01-20', views: 0 },
  ];

  const announcements = [
    { id: '1', title: 'New Payment Method Added', target: 'all', date: '2024-01-18' },
    { id: '2', title: 'Holiday Season Guidelines', target: 'vendors', date: '2024-01-15' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Content Management</h1>
            <p className="text-muted-foreground">Manage blogs and platform announcements</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Blog Posts
              </h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <Card key={blog.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{blog.title}</CardTitle>
                      <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                        {blog.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      {new Date(blog.date).toLocaleDateString()} • {blog.views} views
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {blog.status === 'draft' && <Button size="sm">Publish</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Bell className="h-6 w-6" />
                Announcements
              </h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <CardDescription>
                      Target: {announcement.target} • {new Date(announcement.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
