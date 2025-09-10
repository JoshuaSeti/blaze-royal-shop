import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CreditCard, Truck, Smartphone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to place an order");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{
          user_id: user.id,
          total_amount: total,
          status: "pending",
          shipping_address: deliveryDetails
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      await clearCart();
      
      toast.success("Order placed successfully!");
      navigate("/order-history");
      
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shipping = 25;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                  <CardDescription>
                    Please provide your delivery details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={deliveryDetails.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={deliveryDetails.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={deliveryDetails.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={deliveryDetails.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={deliveryDetails.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={deliveryDetails.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={deliveryDetails.postalCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 flex items-center gap-3 cursor-pointer">
                          <Truck className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Cash on Delivery</div>
                            <div className="text-sm text-muted-foreground">Pay when your order arrives</div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                        <RadioGroupItem value="airtel" id="airtel" />
                        <Label htmlFor="airtel" className="flex-1 flex items-center gap-3 cursor-pointer">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Airtel Money</div>
                            <div className="text-sm text-muted-foreground">Pay with your Airtel Money wallet</div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                        <RadioGroupItem value="mtn" id="mtn" />
                        <Label htmlFor="mtn" className="flex-1 flex items-center gap-3 cursor-pointer">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">MTN MoMo</div>
                            <div className="text-sm text-muted-foreground">Pay with MTN Mobile Money</div>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                        <RadioGroupItem value="zamtel" id="zamtel" />
                        <Label htmlFor="zamtel" className="flex-1 flex items-center gap-3 cursor-pointer">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Zamtel Kwacha</div>
                            <div className="text-sm text-muted-foreground">Pay with Zamtel Kwacha</div>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.products.name}</div>
                        <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                      </div>
                      <div className="font-medium">K{(Number(item.products.price) * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>K{cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>K{shipping}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>K{total}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;