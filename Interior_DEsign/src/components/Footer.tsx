import React, { useState } from 'react';
import { ArrowRight, Check, Globe, Instagram, Facebook, Youtube, Sparkles, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenStoreLocator: () => void;
  onOpenConsultation: () => void;
  onOpenSwatches: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenStoreLocator,
  onOpenConsultation,
  onOpenSwatches
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#171615] text-[#FAF8F5] pt-16 pb-12 border-t border-white/10">
      
      {/* Top Banner Callouts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-[#232220] border border-white/10">
          
          <div className="flex items-start gap-4">
            <Sparkles className="w-6 h-6 text-[#C5A059] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-lg font-light text-white">Interior Design Service</h4>
              <p className="text-xs text-white/60 font-light mt-1">Get free 3D room styling guidance from our Danish designers.</p>
              <button onClick={onOpenConsultation} className="text-xs text-[#C5A059] font-semibold uppercase tracking-widest mt-2 hover:underline inline-flex items-center gap-1">
                Book Appointment <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
            <Globe className="w-6 h-6 text-[#C5A059] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-lg font-light text-white">Order Free Swatches</h4>
              <p className="text-xs text-white/60 font-light mt-1">Receive up to 5 fabric & leather samples directly to your doorstep.</p>
              <button onClick={onOpenSwatches} className="text-xs text-[#C5A059] font-semibold uppercase tracking-widest mt-2 hover:underline inline-flex items-center gap-1">
                Request Samples <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
            <MapPin className="w-6 h-6 text-[#C5A059] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-serif text-lg font-light text-white">Store Locator</h4>
              <p className="text-xs text-white/60 font-light mt-1">Visit our flagship showrooms in Toronto, Vancouver, Montreal & Calgary.</p>
              <button onClick={onOpenStoreLocator} className="text-xs text-[#C5A059] font-semibold uppercase tracking-widest mt-2 hover:underline inline-flex items-center gap-1">
                Find a Store <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
        
        {/* Brand & Newsletter Column (5 Cols) */}
        <div className="md:col-span-5 space-y-6">
          <a href="#" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-tight text-white uppercase">
              KØBENHAVN
            </span>
            <span className="block text-[9px] tracking-[0.3em] text-[#C5A059] uppercase font-sans font-medium -mt-1">
              Danish Design 1952
            </span>
          </a>
          <p className="text-xs text-white/70 font-light max-w-sm leading-relaxed">
            KØBENHAVN was born in Denmark in 1952 and is today a premium retail lifestyle brand, designing, producing, and selling iconic Danish furniture.
          </p>

          {/* Newsletter Form */}
          <div className="space-y-3 pt-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#C5A059] block font-semibold">
              Get Our Newsletter
            </span>
            <p className="text-xs text-white/60 font-light">
              Front-row seat to collection launches, interior trends, and private sales.
            </p>

            {subscribed ? (
              <div className="bg-[#2D3E35] p-3 text-xs text-white flex items-center gap-2 border border-[#C5A059]">
                <Check className="w-4 h-4 text-[#C5A059]" />
                <span>Thank you! Welcome to KØBENHAVN Design Club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 text-white px-4 py-3 text-xs outline-none focus:border-[#C5A059] placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="bg-[#FAF8F5] text-[#171615] px-6 text-xs font-semibold uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all flex items-center gap-1"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Links Columns (7 Cols) */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-light">
          
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#C5A059] font-bold">Furniture</h5>
            <ul className="space-y-2 text-white/70">
              <li><a href="#catalog" className="hover:text-white transition-colors">Modular Sofas</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Armchairs & Loungers</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Dining & Extension Tables</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Architectural Storage</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Sculptural Lamps</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Outdoor Collections</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#C5A059] font-bold">Design Services</h5>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={onOpenConsultation} className="hover:text-white transition-colors">3D Room Planner</button></li>
              <li><button onClick={onOpenConsultation} className="hover:text-white transition-colors">In-Home Consultation</button></li>
              <li><button onClick={onOpenSwatches} className="hover:text-white transition-colors">Free Fabric Swatches</button></li>
              <li><button onClick={onOpenStoreLocator} className="hover:text-white transition-colors">Book Showroom Visit</button></li>
              <li><a href="#room-hotspots" className="hover:text-white transition-colors">Shop The Room</a></li>
            </ul>
          </div>

          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h5 className="font-mono text-xs uppercase tracking-widest text-[#C5A059] font-bold">About KØBENHAVN</h5>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Our History Since 1952</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Danish Designers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability & Wood</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Lounge</a></li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Sub-footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/50 gap-4">
        <div>
          © {new Date().getFullYear()} KØBENHAVN A/S. All rights reserved. Live Ekstraordinær.
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 hover:text-[#C5A059] transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 hover:text-[#C5A059] transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 hover:text-[#C5A059] transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
        </div>
      </div>

    </footer>
  );
};
