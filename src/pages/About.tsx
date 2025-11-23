import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Users, TrendingUp, Shield } from 'lucide-react';

const About = () => {
  const values = [
    { icon: ShoppingBag, title: 'Customer First', description: 'We put our customers at the heart of everything we do.' },
    { icon: Users, title: 'Empowering Vendors', description: 'Supporting local businesses to grow and thrive online.' },
    { icon: TrendingUp, title: 'Innovation', description: 'Constantly improving our platform with new features.' },
    { icon: Shield, title: 'Trust & Security', description: 'Ensuring safe and secure transactions for all.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Gula</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Zambia's leading e-commerce platform connecting buyers with trusted vendors across the country.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded with a vision to revolutionize online shopping in Zambia, Gula brings together local vendors and customers on a single, easy-to-use platform.
                </p>
                <p>
                  We believe in the power of e-commerce to transform lives and businesses. Our platform provides vendors with the tools they need to succeed online, while giving customers access to a wide variety of quality products.
                </p>
                <p>
                  Today, thousands of vendors trust Gula to power their online businesses, and millions of customers rely on us for their shopping needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Whether you're a vendor looking to grow your business or a customer seeking quality products, Gula is here for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
