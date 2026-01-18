import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, ArrowLeft, Tag, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVendorProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { format, isBefore, isAfter } from "date-fns";
import { toast } from "sonner";

const VendorDiscounts = () => {
  const navigate = useNavigate();
  const { products, loading, refetch } = useVendorProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    discount_percent: "",
    start_date: "",
    end_date: ""
  });

  const handleApplyDiscount = async () => {
    if (!selectedProduct || !formData.discount_percent) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const originalPrice = selectedProduct.original_price || selectedProduct.price;
      const discountPercent = parseFloat(formData.discount_percent);
      const newPrice = originalPrice * (1 - discountPercent / 100);

      const { error } = await supabase
        .from("products")
        .update({
          original_price: originalPrice,
          price: Math.round(newPrice * 100) / 100,
          discount_percent: discountPercent,
          discount_start_date: formData.start_date || new Date().toISOString(),
          discount_end_date: formData.end_date || null
        })
        .eq("id", selectedProduct.id);

      if (error) throw error;
      
      toast.success("Discount applied successfully");
      setDialogOpen(false);
      setSelectedProduct(null);
      setFormData({ discount_percent: "", start_date: "", end_date: "" });
      refetch();
    } catch (error) {
      console.error("Error applying discount:", error);
      toast.error("Failed to apply discount");
    }
  };

  const handleRemoveDiscount = async (productId: string, originalPrice: number) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          price: originalPrice,
          original_price: null,
          discount_percent: 0,
          discount_start_date: null,
          discount_end_date: null
        })
        .eq("id", productId);

      if (error) throw error;
      
      toast.success("Discount removed");
      refetch();
    } catch (error) {
      console.error("Error removing discount:", error);
      toast.error("Failed to remove discount");
    }
  };

  const getDiscountStatus = (product: any) => {
    if (!product.discount_percent || product.discount_percent === 0) {
      return null;
    }

    const now = new Date();
    const startDate = product.discount_start_date ? new Date(product.discount_start_date) : null;
    const endDate = product.discount_end_date ? new Date(product.discount_end_date) : null;

    if (startDate && isAfter(startDate, now)) {
      return { status: 'scheduled', label: 'Scheduled', color: 'bg-blue-100 text-blue-800' };
    }
    if (endDate && isBefore(endDate, now)) {
      return { status: 'expired', label: 'Expired', color: 'bg-gray-100 text-gray-800' };
    }
    return { status: 'active', label: 'Active', color: 'bg-green-100 text-green-800' };
  };

  const discountedProducts = products.filter(p => p.discount_percent && p.discount_percent > 0);
  const regularProducts = products.filter(p => !p.discount_percent || p.discount_percent === 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" onClick={() => navigate('/vendor')} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="p-3 rounded-full bg-primary/10">
              <Percent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Product Discounts</h1>
              <p className="text-muted-foreground">Apply time-limited discounts to your products</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Products on Discount</p>
                  <p className="text-2xl font-bold">{discountedProducts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100">
                  <Percent className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Discount</p>
                  <p className="text-2xl font-bold">
                    {discountedProducts.length > 0 
                      ? Math.round(discountedProducts.reduce((sum, p) => sum + (p.discount_percent || 0), 0) / discountedProducts.length)
                      : 0}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Discounted Products */}
        {discountedProducts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Products with Active Discounts</CardTitle>
              <CardDescription>Manage current product discounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Original Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Sale Price</TableHead>
                    <TableHead>Valid Until</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discountedProducts.map((product) => {
                    const discountStatus = getDiscountStatus(product);
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            {product.image_url && (
                              <img 
                                src={product.image_url} 
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                            )}
                            <span>{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="line-through text-muted-foreground">
                          K{(product.original_price || product.price).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{product.discount_percent}% OFF</Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-primary">
                          K{product.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {product.discount_end_date 
                            ? format(new Date(product.discount_end_date), 'MMM d, yyyy')
                            : 'No expiry'
                          }
                        </TableCell>
                        <TableCell>
                          {discountStatus && (
                            <Badge className={discountStatus.color}>{discountStatus.label}</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveDiscount(product.id, product.original_price || product.price)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* All Products */}
        <Card>
          <CardHeader>
            <CardTitle>All Products</CardTitle>
            <CardDescription>Select a product to apply a discount</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : regularProducts.length === 0 && discountedProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                <p className="text-muted-foreground">Add products first to apply discounts</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularProducts.map((product) => (
                  <Card key={product.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => {
                    setSelectedProduct(product);
                    setDialogOpen(true);
                  }}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                            <Package className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{product.name}</h4>
                          <p className="text-lg font-semibold text-primary">K{product.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Tag className="h-4 w-4 mr-1" />
                          Discount
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Apply Discount Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply Discount</DialogTitle>
              <DialogDescription>
                Set a discount for {selectedProduct?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Current Price</Label>
                <p className="text-lg font-semibold">K{selectedProduct?.price.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <Label>Discount Percentage *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="99"
                    value={formData.discount_percent}
                    onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
                    placeholder="20"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
                {formData.discount_percent && selectedProduct && (
                  <p className="text-sm text-green-600">
                    New price: K{Math.round(selectedProduct.price * (1 - parseFloat(formData.discount_percent) / 100)).toLocaleString()}
                  </p>
                )}
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
              <p className="text-xs text-muted-foreground">
                Leave end date empty for no expiry. The discount will automatically show the original price with strikethrough on the product page.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleApplyDiscount}>Apply Discount</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VendorDiscounts;
