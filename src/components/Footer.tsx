const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Gula</h3>
            <p className="text-secondary-foreground/80">
              Your trusted partner for premium products and exceptional shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block hover:text-accent transition-colors">About Us</a>
              <a href="#" className="block hover:text-accent transition-colors">Products</a>
              <a href="#" className="block hover:text-accent transition-colors">Contact</a>
              <a href="#" className="block hover:text-accent transition-colors">Blog</a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <div className="space-y-2">
              <a href="#" className="block hover:text-accent transition-colors">Help Center</a>
              <a href="#" className="block hover:text-accent transition-colors">Returns</a>
              <a href="#" className="block hover:text-accent transition-colors">Shipping Info</a>
              <a href="#" className="block hover:text-accent transition-colors">Track Order</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2 text-secondary-foreground/80">
              <p>Email: support@gula.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Mon-Fri: 9AM-6PM EST</p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-secondary-foreground/80">
            © 2024 Gula. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;