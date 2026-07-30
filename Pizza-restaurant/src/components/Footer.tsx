import React, { useState } from 'react';
import { Flame, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer id="contact" className="bg-[#222222] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Logo & Mission */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E63946] to-[#F4A261] flex items-center justify-center text-white shadow-md">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-wider text-white uppercase">
                FORGIO<span className="text-[#E63946]">.</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-normal leading-relaxed max-w-sm">
              Artisan Neapolitan wood-fired pizza handcrafted in Vesuvian stone ovens at 800°F. Sourced directly from Naples dairies and organic Italian tomato farms.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#instagram"
                aria-label="Instagram profile"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E63946] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook page"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E63946] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter X profile"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E63946] flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#FFD166]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70 font-medium">
              <li>
                <a href="#home" className="hover:text-[#E63946] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#E63946] transition-colors">
                  Our Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#E63946] transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-[#E63946] transition-colors">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#E63946] transition-colors">
                  Reviews & Ratings
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E63946] transition-colors">
                  Food Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Opening Hours & Location */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#FFD166]">
              Opening Hours
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F4A261] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Mon – Thu:</p>
                  <p>11:30 AM – 10:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Fri – Sun (Late Night Firing):</p>
                  <p>11:00 AM – 12:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-2">
                <MapPin className="w-4 h-4 text-[#FFD166] shrink-0 mt-0.5" />
                <p>482 Artisan Way, Culinary District, CA 90210</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter Signup */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#FFD166]">
              VIP Pizza Club
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Subscribe to get secret menu invites, tasting event passes, and 15% off your next online order.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-white/10 rounded-xl border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#E63946]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to VIP newsletter"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-[#E63946] text-white hover:bg-[#d62839] transition-colors cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-bold">
                  ✓ Welcome to FORGIO VIP Club!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} FORGIO Wood Fired Artisan Pizza. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
