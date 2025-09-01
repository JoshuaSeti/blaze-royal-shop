import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Search, Edit, Trash2, Tag, Plus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299,
    quantity: 50,
    status: "active",
    discount: 0,
    image: "/api/placeholder/80/80"
  },
  {
    id: 2,
    name: "Modern Laptop Pro",
    category: "Electronics", 
    price: 1299,
    quantity: 25,
    status: "active",
    discount: 15,
    image: "/api/placeholder/80/80"
  },
  {
    id: 3,
    name: "Designer T-Shirt",
    category: "Fashion",
    price: 89,
    quantity: 0,
    status: "out_of_stock",
    discount: 20,
    image: "/api/placeholder/80/80"
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 249,
    quantity: 75,
    status: "active",
    discount: 0,
    image: "/api/placeholder/80/80"
  }
];

const VendorProducts = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [discountDialogOpen, setDiscountDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [discountValue, setDiscountValue] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Product deleted successfully");
  };

  const handleApplyDiscount = () => {
    if (selectedProduct && discountValue) {
      setProducts(products.map(p => 
        p.id === selectedProduct.id 
          ? { ...p, discount: parseInt(discountValue) }
          : p
      ));
      toast.success("Discount applied successfully");
      setDiscountDialogOpen(false);
      setDiscountValue("");
      setSelectedProduct(null);
    }
  };

  const getStatusBadge = (status: string, quantity: number) => {
    if (quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (quantity < 10) {
      return <Badge variant="secondary">Low Stock</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">In Stock</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/vendor')}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="p-3 rounded-full bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Product Management</h1>
              <p className="text-muted-foreground">Manage your product inventory</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:ring-primary/20"
              />
            </div>
            <Button 
              onClick={() => navigate('/vendor')}
              className="bg-gradient-to-r from-primary to-primary-hover"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        <Card className="border-primary/10 shadow-lg bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Your Products ({filteredProducts.length})</CardTitle>
            <CardDescription>
              Manage your product listings, inventory, and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>{getStatusBadge(product.status, product.quantity)}</TableCell>
                      <TableCell>
                        {product.discount > 0 ? (
                          <Badge variant="outline" className="text-green-600">
                            {product.discount}% OFF
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProduct(product);
                              setDiscountValue(product.discount.toString());
                              setDiscountDialogOpen(true);
                            }}
                          >
                            <Tag className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first product"}
                </p>
                <Button 
                  onClick={() => navigate('/vendor')}
                  className="bg-gradient-to-r from-primary to-primary-hover"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Discount Dialog */}
        <Dialog open={discountDialogOpen} onOpenChange={setDiscountDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply Discount</DialogTitle>
              <DialogDescription>
                Set a discount percentage for {selectedProduct?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="100"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDiscountDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleApplyDiscount}>
                Apply Discount
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default VendorProducts;