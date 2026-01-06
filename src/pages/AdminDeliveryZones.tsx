import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MapPin, Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DeliveryZone {
  id: string;
  name: string;
  description: string | null;
  base_fee: number;
  is_active: boolean;
  created_at: string;
}

const AdminDeliveryZones = () => {
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_fee: ''
  });

  const fetchZones = async () => {
    try {
      const { data, error } = await supabase
        .from('delivery_zones')
        .select('*')
        .order('name');

      if (error) throw error;
      setZones((data as DeliveryZone[]) || []);
    } catch (err) {
      console.error('Error fetching zones:', err);
      toast.error('Failed to load delivery zones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingZone) {
        // Update existing zone
        const { error } = await supabase
          .from('delivery_zones')
          .update({
            name: formData.name,
            description: formData.description || null,
            base_fee: parseFloat(formData.base_fee)
          })
          .eq('id', editingZone.id);

        if (error) throw error;
        toast.success('Zone updated successfully');
      } else {
        // Create new zone
        const { error } = await supabase
          .from('delivery_zones')
          .insert({
            name: formData.name,
            description: formData.description || null,
            base_fee: parseFloat(formData.base_fee)
          });

        if (error) throw error;
        toast.success('Zone created successfully');
      }

      setIsDialogOpen(false);
      setEditingZone(null);
      setFormData({ name: '', description: '', base_fee: '' });
      fetchZones();
    } catch (err) {
      console.error('Error saving zone:', err);
      toast.error('Failed to save zone');
    }
  };

  const handleEdit = (zone: DeliveryZone) => {
    setEditingZone(zone);
    setFormData({
      name: zone.name,
      description: zone.description || '',
      base_fee: zone.base_fee.toString()
    });
    setIsDialogOpen(true);
  };

  const handleToggleActive = async (zone: DeliveryZone) => {
    try {
      const { error } = await supabase
        .from('delivery_zones')
        .update({ is_active: !zone.is_active })
        .eq('id', zone.id);

      if (error) throw error;
      toast.success(`Zone ${zone.is_active ? 'deactivated' : 'activated'}`);
      fetchZones();
    } catch (err) {
      console.error('Error toggling zone:', err);
      toast.error('Failed to update zone');
    }
  };

  const handleDelete = async (zoneId: string) => {
    if (!confirm('Are you sure you want to delete this zone?')) return;

    try {
      const { error } = await supabase
        .from('delivery_zones')
        .delete()
        .eq('id', zoneId);

      if (error) throw error;
      toast.success('Zone deleted');
      fetchZones();
    } catch (err) {
      console.error('Error deleting zone:', err);
      toast.error('Failed to delete zone');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Delivery Zones</h1>
            <p className="text-muted-foreground">Manage delivery zones and pricing</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/admin/dashboard">Back to Dashboard</Link>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingZone(null);
                  setFormData({ name: '', description: '', base_fee: '' });
                }}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Zone
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingZone ? 'Edit Zone' : 'Create Zone'}</DialogTitle>
                  <DialogDescription>
                    {editingZone ? 'Update the delivery zone details' : 'Add a new delivery zone with pricing'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Zone Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Zone A - City Center"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="e.g., 0-5km radius from city center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="base_fee">Delivery Fee (K)</Label>
                    <Input
                      id="base_fee"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.base_fee}
                      onChange={(e) => setFormData({ ...formData, base_fee: e.target.value })}
                      placeholder="500"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {editingZone ? 'Update Zone' : 'Create Zone'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              All Delivery Zones
            </CardTitle>
            <CardDescription>
              Configure delivery zones and their associated fees
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">Loading zones...</p>
            ) : zones.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No delivery zones configured</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Delivery Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zones.map((zone) => (
                    <TableRow key={zone.id}>
                      <TableCell className="font-medium">{zone.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {zone.description || '-'}
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 font-semibold text-primary">
                          <DollarSign className="h-4 w-4" />
                          K{Number(zone.base_fee).toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={zone.is_active}
                            onCheckedChange={() => handleToggleActive(zone)}
                          />
                          <Badge variant={zone.is_active ? 'default' : 'secondary'}>
                            {zone.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(zone)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => handleDelete(zone.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDeliveryZones;