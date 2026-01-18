import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gavel, Plus, ArrowLeft, Clock, Users, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVendorAuctions } from "@/hooks/useAuctions";
import { useVendorProducts } from "@/hooks/useProducts";
import { format, formatDistanceToNow } from "date-fns";

const VendorAuctions = () => {
  const navigate = useNavigate();
  const { auctions, loading, createAuction, cancelAuction } = useVendorAuctions();
  const { products } = useVendorProducts();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "",
    starting_price: "",
    reserve_price: "",
    min_bid_increment: "10",
    end_time: ""
  });

  const handleCreate = async () => {
    if (!formData.product_id || !formData.starting_price || !formData.end_time) {
      return;
    }

    await createAuction({
      product_id: formData.product_id,
      starting_price: parseFloat(formData.starting_price),
      reserve_price: formData.reserve_price ? parseFloat(formData.reserve_price) : undefined,
      min_bid_increment: parseFloat(formData.min_bid_increment),
      end_time: formData.end_time
    });

    setDialogOpen(false);
    setFormData({
      product_id: "",
      starting_price: "",
      reserve_price: "",
      min_bid_increment: "10",
      end_time: ""
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "ended":
        return <Badge variant="secondary">Ended</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter out products that are already in auction
  const availableProducts = products.filter(
    p => !auctions.some(a => a.product_id === p.id && a.status === "active")
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" onClick={() => navigate('/vendor')} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="p-3 rounded-full bg-primary/10">
              <Gavel className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Auction Management</h1>
              <p className="text-muted-foreground">Create and manage product auctions</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Auction
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Auction</DialogTitle>
                  <DialogDescription>
                    Set up a new auction for one of your products
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Product</Label>
                    <Select 
                      value={formData.product_id} 
                      onValueChange={(v) => setFormData({ ...formData, product_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a product" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Starting Price (K)</Label>
                      <Input
                        type="number"
                        value={formData.starting_price}
                        onChange={(e) => setFormData({ ...formData, starting_price: e.target.value })}
                        placeholder="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reserve Price (K)</Label>
                      <Input
                        type="number"
                        value={formData.reserve_price}
                        onChange={(e) => setFormData({ ...formData, reserve_price: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Minimum Bid Increment (K)</Label>
                    <Input
                      type="number"
                      value={formData.min_bid_increment}
                      onChange={(e) => setFormData({ ...formData, min_bid_increment: e.target.value })}
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Auction End Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={formData.end_time}
                      onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate}>Create Auction</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <Gavel className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Auctions</p>
                  <p className="text-2xl font-bold">{auctions.filter(a => a.status === "active").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Auctions</p>
                  <p className="text-2xl font-bold">{auctions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-amber-100">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">
                    K{auctions.reduce((sum, a) => sum + a.current_price, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auctions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Auctions</CardTitle>
            <CardDescription>Manage all your product auctions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : auctions.length === 0 ? (
              <div className="text-center py-12">
                <Gavel className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No auctions yet</h3>
                <p className="text-muted-foreground mb-4">Create your first auction to start selling</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Starting Price</TableHead>
                    <TableHead>Current Bid</TableHead>
                    <TableHead>Ends</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auctions.map((auction) => (
                    <TableRow key={auction.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {auction.product?.image_url && (
                            <img 
                              src={auction.product.image_url} 
                              alt={auction.product?.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <span>{auction.product?.name || "Unknown Product"}</span>
                        </div>
                      </TableCell>
                      <TableCell>K{auction.starting_price.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold text-primary">
                        K{auction.current_price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(auction.end_time), { addSuffix: true })}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(auction.status)}</TableCell>
                      <TableCell className="text-right">
                        {auction.status === "active" && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => cancelAuction(auction.id)}
                          >
                            Cancel
                          </Button>
                        )}
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

export default VendorAuctions;
