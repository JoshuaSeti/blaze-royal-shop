import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import footerBg from '@/assets/footer-background.png';

const Footer = () => {
  return (
    <footer 
      className="relative text-white py-16"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1a1a5e] font-bold text-lg">G</span>
              </div>
              <h3 className="text-2xl font-bold">Gula</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Zambia's No. 1 Marketplace. Your trusted partner for premium products and exceptional shopping experience.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-base font-semibold uppercase tracking-wide">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">About Us</Link>
              <Link to="/categories" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Products</Link>
              <Link to="/support" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Contact</Link>
              <Link to="/blog" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Blog</Link>
              <Link to="/careers" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Careers</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-5">
            <h4 className="text-base font-semibold uppercase tracking-wide">Customer Service</h4>
            <div className="space-y-3">
              <Link to="/help" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Help Center</Link>
              <Link to="/returns" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Returns & Refunds</Link>
              <Link to="/delivery-policy" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Shipping Info</Link>
              <Link to="/order-tracking" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Track Order</Link>
              <Link to="/privacy-policy" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Privacy Policy</Link>
              <Link to="/terms" className="block text-white/70 hover:text-orange-400 transition-colors text-sm">Terms & Conditions</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-base font-semibold uppercase tracking-wide">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm">support@gula.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm">+260 97 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Mon-Fri: 9AM-6PM CAT</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm">Lusaka, Zambia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center lg:items-start gap-3">
              <span className="text-xs font-medium text-white/60 uppercase tracking-wider">We Accept</span>
              <div className="flex flex-wrap justify-center gap-2">
                {/* Airtel Money */}
                <div className="h-8 px-3 bg-white rounded flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">A</span>
                  </div>
                  <span className="text-red-600 text-[10px] font-semibold">Airtel Money</span>
                </div>
                
                {/* MTN Money */}
                <div className="h-8 px-3 bg-yellow-400 rounded flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                    <span className="text-black text-[10px] font-bold">M</span>
                  </div>
                  <span className="text-black text-[10px] font-semibold">MTN MoMo</span>
                </div>
                
                {/* Zamtel Kwacha */}
                <div className="h-8 px-3 bg-green-600 rounded flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">Z</span>
                  </div>
                  <span className="text-white text-[10px] font-semibold">Zamtel Kwacha</span>
                </div>
                
                {/* Visa */}
                <div className="h-8 px-4 bg-white rounded flex items-center">
                  <span className="text-blue-900 text-sm font-bold italic">VISA</span>
                </div>
                
                {/* Mastercard */}
                <div className="h-8 px-3 bg-white rounded flex items-center">
                  <div className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-red-500 -mr-1.5"></div>
                    <div className="w-5 h-5 rounded-full bg-yellow-500 opacity-80"></div>
                  </div>
                </div>
                
                {/* PayPal */}
                <div className="h-8 px-3 bg-white rounded flex items-center">
                  <span className="text-blue-800 text-xs font-bold">Pay</span>
                  <span className="text-blue-500 text-xs font-bold">Pal</span>
                </div>
              </div>
            </div>
            
            <p className="text-white/50 text-xs">
              © 2024 Gula. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
