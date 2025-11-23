import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, UserX, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  joinDate: string;
  orders: number;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15', orders: 12 },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-01-10', orders: 8 },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', status: 'suspended', joinDate: '2024-01-05', orders: 3 },
  ]);

  const handleToggleSuspend = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' as const : 'active' as const } : u));
    toast.success('User status updated');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage platform users and permissions</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Joined: {new Date(user.joinDate).toLocaleDateString()} • {user.orders} orders
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={user.status === 'active' ? 'destructive' : 'default'}
                    size="sm"
                    onClick={() => handleToggleSuspend(user.id)}
                  >
                    {user.status === 'active' ? (
                      <>
                        <UserX className="h-4 w-4 mr-2" />
                        Suspend
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Activate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
