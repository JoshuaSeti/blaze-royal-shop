import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Ticket, Plus, ArrowLeft, Trash2, Copy, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVendorPromocodes, Promocode } from "@/hooks/usePromocodes";
import { format } from "date-fns";
import { toast } from "sonner";

const VendorPromocodes = () => {
  const navigate = useNavigate();
  const { promocodes, loading, createPromocode, updatePromocode, deletePromocode } = useVendorPromocodes();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createdPin, setCreatedPin] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    benefit_type: "discount_percent" as Promocode['benefit_type'],
    benefit_value: "",
    min_order_amount: "",
    max_uses: "",
    start_date: "",
    end_date: "",
    influencer_name: ""
  });

  const handleCreate = async () => {
    if (!formData.code || !formData.benefit_type) {
      toast.error("Please fill in required fields");
      return;
    }

    const pin = await createPromocode({
      code: formData.code.toUpperCase(),
      benefit_type: formData.benefit_type,
      benefit_value: formData.benefit_value ? parseFloat(formData.benefit_value) : undefined,
      min_order_amount: formData.min_order_amount ? parseFloat(formData.min_order_amount) : undefined,
      max_uses: formData.max_uses ? parseInt(formData.max_uses) : undefined,
      start_date: formData.start_date || undefined,
      end_date: formData.end_date || undefined,
      influencer_name: formData.influencer_name || undefined
    });

    if (pin) {
      setCreatedPin(pin);
    } else {
      setDialogOpen(false);
    }

    setFormData({
      code: "",
      benefit_type: "discount_percent",
      benefit_value: "",
      min_order_amount: "",
      max_uses: "",
      start_date: "",
      end_date: "",
      influencer_name: ""
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getBenefitLabel = (type: Promocode['benefit_type'], value: number | null) => {
    switch (type) {
      case 'discount_percent':
        return `${value}% off`;
      case 'discount_amount':
        return `K${value} off`;
      case 'free_delivery':
        return 'Free Delivery';
      case 'buy_x_get_y':
        return 'Buy X Get Y';
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" onClick={() => navigate('/vendor')} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="p-3 rounded-full bg-primary/10">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Promo Codes</h1>
              <p className="text-muted-foreground">Create and manage promotional codes</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setCreatedPin(null);
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Promo Code
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                {createdPin ? (
                  <>
                    <DialogHeader>
                      <DialogTitle>Influencer PIN Created!</DialogTitle>
                      <DialogDescription>
                        Share this PIN with your influencer so they can track their promocode usage
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                      <div className="bg-primary/10 rounded-lg p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Influencer Access PIN</p>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-3xl font-mono font-bold tracking-wider">{createdPin}</span>
                          <Button size="icon" variant="ghost" onClick={() => copyToClipboard(createdPin)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                          They can use this PIN at /influencer-tracking to view their stats
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => {
                        setDialogOpen(false);
                        setCreatedPin(null);
                      }}>Done</Button>
                    </DialogFooter>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle>Create Promo Code</DialogTitle>
                      <DialogDescription>
                        Set up a new promotional code for your products
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                      <div className="space-y-2">
                        <Label>Promo Code *</Label>
                        <Input
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                          placeholder="e.g., SAVE20"
                          className="uppercase"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Benefit Type *</Label>
                        <Select 
                          value={formData.benefit_type} 
                          onValueChange={(v: Promocode['benefit_type']) => setFormData({ ...formData, benefit_type: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="discount_percent">Percentage Discount</SelectItem>
                            <SelectItem value="discount_amount">Fixed Amount Off</SelectItem>
                            <SelectItem value="free_delivery">Free Delivery</SelectItem>
                            <SelectItem value="buy_x_get_y">Buy X Get Y</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {formData.benefit_type !== 'free_delivery' && (
                        <div className="space-y-2">
                          <Label>
                            {formData.benefit_type === 'discount_percent' ? 'Discount Percentage' : 'Discount Amount (K)'}
                          </Label>
                          <Input
                            type="number"
                            value={formData.benefit_value}
                            onChange={(e) => setFormData({ ...formData, benefit_value: e.target.value })}
                            placeholder={formData.benefit_type === 'discount_percent' ? "20" : "50"}
                          />
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Min Order (K)</Label>
                          <Input
                            type="number"
                            value={formData.min_order_amount}
                            onChange={(e) => setFormData({ ...formData, min_order_amount: e.target.value })}
                            placeholder="Optional"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Max Uses</Label>
                          <Input
                            type="number"
                            value={formData.max_uses}
                            onChange={(e) => setFormData({ ...formData, max_uses: e.target.value })}
                            placeholder="Unlimited"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            value={formData.end_date}
                            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Influencer Name (Optional)
                          </Label>
                          <Input
                            value={formData.influencer_name}
                            onChange={(e) => setFormData({ ...formData, influencer_name: e.target.value })}
                            placeholder="e.g., @influencer_name"
                          />
                          <p className="text-xs text-muted-foreground">
                            If set, a PIN will be generated for the influencer to track their code usage
                          </p>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleCreate}>Create Code</Button>
                    </DialogFooter>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Promocodes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Promo Codes</CardTitle>
            <CardDescription>All promotional codes for your store</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : promocodes.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No promo codes yet</h3>
                <p className="text-muted-foreground mb-4">Create promotional codes to attract customers</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Benefit</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Valid Until</TableHead>
                      <TableHead>Influencer</TableHead>
                      <TableHead>Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {promocodes.map((promo) => (
                      <TableRow key={promo.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold">{promo.code}</span>
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => copyToClipboard(promo.code)}>
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {getBenefitLabel(promo.benefit_type, promo.benefit_value)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {promo.uses_count}{promo.max_uses ? `/${promo.max_uses}` : ''}
                        </TableCell>
                        <TableCell>
                          {promo.end_date 
                            ? format(new Date(promo.end_date), 'MMM d, yyyy')
                            : 'No expiry'
                          }
                        </TableCell>
                        <TableCell>
                          {promo.influencer_name ? (
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              <span className="text-sm">{promo.influencer_name}</span>
                              {promo.influencer_pin && (
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-6 w-6"
                                  onClick={() => copyToClipboard(promo.influencer_pin!)}
                                  title="Copy PIN"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={promo.is_active}
                            onCheckedChange={(checked) => updatePromocode(promo.id, { is_active: checked })}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => deletePromocode(promo.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorPromocodes;
