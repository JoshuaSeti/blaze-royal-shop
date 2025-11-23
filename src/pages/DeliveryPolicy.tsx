import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DeliveryPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Delivery Policy</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Delivery Areas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>We deliver to all provinces in Zambia. Delivery times may vary based on location.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. Delivery Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Standard delivery: 2-5 business days. Express delivery: 1-2 business days (additional fees apply).</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Delivery Fees</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Delivery fees are calculated based on distance and package weight. Free delivery on orders over K500.</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Order Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Track your order in real-time through your account dashboard or via SMS updates.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Failed Deliveries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>If delivery fails, we'll attempt redelivery or hold your package for pickup at a nearby collection point.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryPolicy;
