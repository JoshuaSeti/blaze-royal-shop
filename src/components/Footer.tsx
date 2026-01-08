import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer 
      className="relative text-white py-16"
      style={{
        background: 'linear-gradient(135deg, #1a1a5e 0%, #2d1b69 50%, #1a1a5e 100%)',
      }}
    >
      {/* Decorative circles like the reference */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#2d2070]/50 blur-3xl" />
      <div className="absolute right-20 bottom-10 w-48 h-48 rounded-full bg-[#3d2d80]/40 blur-2xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/placeholder.svg" alt="Gula" className="h-8 w-8" />
              <h3 className="text-2xl font-bold">Gula</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Zambia's No. 1 Marketplace. Your trusted partner for premium products and exceptional shopping experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">About Us</Link>
              <Link to="/categories" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Products</Link>
              <Link to="/support" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Contact</Link>
              <Link to="/blog" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Blog</Link>
              <Link to="/careers" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Careers</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <div className="space-y-3">
              <Link to="/help" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Help Center</Link>
              <Link to="/returns" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Returns & Refunds</Link>
              <Link to="/delivery-policy" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Shipping Info</Link>
              <Link to="/order-tracking" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Track Order</Link>
              <Link to="/privacy-policy" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="block text-white/80 hover:text-orange-400 transition-colors text-sm">Terms & Conditions</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-orange-400" />
                <span className="text-sm">support@gula.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="text-sm">+260 97 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Clock className="w-5 h-5 text-orange-400" />
                <span className="text-sm">Mon-Fri: 9AM-6PM CAT</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-sm">Lusaka, Zambia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-3">
              <span className="text-sm font-medium text-white/80">We Accept</span>
              <div className="flex flex-wrap justify-center gap-3">
                {/* Airtel Money */}
                <div className="h-10 px-3 bg-white rounded-md flex items-center justify-center">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <span className="text-red-600 text-xs font-bold">Airtel Money</span>
                  </div>
                </div>
                
                {/* MTN Money */}
                <div className="h-10 px-3 bg-yellow-400 rounded-md flex items-center justify-center">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                      <span className="text-black text-xs font-bold">M</span>
                    </div>
                    <span className="text-black text-xs font-bold">MTN MoMo</span>
                  </div>
                </div>
                
                {/* Zamtel Kwacha */}
                <div className="h-10 px-3 bg-green-600 rounded-md flex items-center justify-center">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Z</span>
                    </div>
                    <span className="text-white text-xs font-bold">Zamtel Kwacha</span>
                  </div>
                </div>
                
                {/* Visa */}
                <div className="h-10 px-4 bg-white rounded-md flex items-center justify-center">
                  <span className="text-blue-900 text-lg font-bold italic">VISA</span>
                </div>
                
                {/* Mastercard */}
                <div className="h-10 px-3 bg-white rounded-md flex items-center justify-center">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-red-500 -mr-2"></div>
                    <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80"></div>
                  </div>
                </div>
                
                {/* PayPal */}
                <div className="h-10 px-3 bg-white rounded-md flex items-center justify-center">
                  <span className="text-blue-800 text-sm font-bold">Pay</span>
                  <span className="text-blue-500 text-sm font-bold">Pal</span>
                </div>
              </div>
            </div>
            
            <p className="text-white/60 text-sm">
              © 2024 Gula. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
