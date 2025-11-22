import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search, MessageCircle, Mail, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        { q: 'How do I track my order?', a: 'You can track your order by visiting the Order Tracking page and entering your tracking number. You can find the tracking number in your order confirmation email.' },
        { q: 'What are the shipping costs?', a: 'Shipping costs vary based on your location and order size. Standard shipping is free for orders over $50. Express shipping options are available at checkout.' },
        { q: 'How long does delivery take?', a: 'Standard delivery typically takes 5-7 business days. Express delivery takes 2-3 business days. You will receive tracking information once your order ships.' },
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unused and in original packaging. Some restrictions apply to certain product categories.' },
        { q: 'How do I initiate a return?', a: 'Visit the Returns & Refunds page, fill out the return form with your order number and reason for return. We will send you return instructions via email.' },
        { q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method.' },
      ]
    },
    {
      category: 'Account & Payments',
      questions: [
        { q: 'How do I reset my password?', a: 'Click on "Forgot Password" on the login page. Enter your email address and we will send you a password reset link.' },
        { q: 'What payment methods do you accept?', a: 'We accept credit cards (Visa, MasterCard, American Express), debit cards, and digital wallets. Payment is secure and encrypted.' },
        { q: 'How do I update my account information?', a: 'Log in to your account and visit your profile page. You can update your email, shipping address, and payment methods there.' },
      ]
    },
    {
      category: 'Products',
      questions: [
        { q: 'How do I know if a product is in stock?', a: 'Product availability is shown on each product page. If an item is out of stock, you can sign up for notifications when it becomes available again.' },
        { q: 'Can I cancel or modify my order?', a: 'You can cancel or modify your order within 2 hours of placing it. After that, the order enters processing and cannot be changed. Contact support for assistance.' },
        { q: 'Do you offer product warranties?', a: 'Warranty coverage varies by product and manufacturer. Check the product description for specific warranty information.' },
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(item => 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
              <HelpCircle className="h-10 w-10" />
              Help Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Find answers to frequently asked questions
            </p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageCircle className="h-5 w-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our support team
                </p>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/support">Start Chat</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-5 w-5" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  support@gula.com
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Phone className="h-5 w-5" />
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  1-800-GULA-HELP
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Browse common questions organized by topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No results found. Try a different search term.
                </p>
              ) : (
                <div className="space-y-6">
                  {filteredFaqs.map((category, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-lg mb-3">{category.category}</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((item, qIdx) => (
                          <AccordionItem key={qIdx} value={`${idx}-${qIdx}`}>
                            <AccordionTrigger>{item.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
