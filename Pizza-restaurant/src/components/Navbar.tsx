import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, ShoppingBag, Menu, X, Phone, Calendar } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['home', 'menu', 'about', 'offers', 'reviews', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Why Us', href: '#about', id: 'about' },
    { name: 'Special Offer', href: '#offers', id: 'offers' },
    { name: 'Reviews', href: '#reviews', id: 'reviews' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 px-5 py-3.5 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#FFF8F3]/90 backdrop-blur-xl shadow-lg shadow-black/5 border border-[#F4A261]/20 py-3'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E63946] to-[#F4A261] flex items-center justify-center text-white shadow-md shadow-[#E63946]/20 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-white text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-[#222222] uppercase leading-none">
              FORGIO<span className="text-[#E63946]">.</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#F4A261] mt-0.5">
              Wood Fired Artisan
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/5 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  isActive ? 'text-[#E63946]' : 'text-[#222222]/80 hover:text-[#222222]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-[#E63946]/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Group */}
        <div className="flex items-center gap-3">
          {/* Reservation Button */}
          <button
            onClick={onOpenReservation}
            className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#222222] hover:text-[#E63946] px-3.5 py-2 rounded-xl border border-black/10 hover:border-[#E63946]/30 bg-white/60 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E63946]" />
            Book Table
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            aria-label="Open Shopping Cart"
            className="relative p-2.5 rounded-xl bg-white shadow-sm border border-black/5 hover:border-[#E63946]/30 hover:bg-[#FFF8F3] transition-all cursor-pointer text-[#222222]"
          >
            <ShoppingBag className="w-5 h-5 text-[#222222]" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#E63946] text-white text-[11px] font-bold flex items-center justify-center shadow-sm"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Order Now CTA */}
          <a
            href="#menu"
            onClick={(e) => handleNavClick(e, '#menu')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E63946] to-[#d62839] text-white text-sm font-bold shadow-md shadow-[#E63946]/25 hover:shadow-lg hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            Order Now
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-xl bg-white shadow-sm border border-black/5 text-[#222222] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden max-w-7xl mx-auto mt-2 bg-[#FFF8F3] rounded-2xl shadow-xl border border-[#F4A261]/20 p-5 overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2.5 rounded-xl text-base font-bold transition-all ${
                    activeSection === link.id
                      ? 'bg-[#E63946]/10 text-[#E63946]'
                      : 'text-[#222222]/80 hover:bg-black/5'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-black/5 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-3 rounded-xl border border-black/10 font-bold text-sm text-[#222222] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E63946]" />
                  Reserve a Table
                </button>
                <a
                  href="#menu"
                  onClick={(e) => handleNavClick(e, '#menu')}
                  className="w-full py-3 rounded-xl bg-[#E63946] text-white font-bold text-sm text-center shadow-md cursor-pointer"
                >
                  Order Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
