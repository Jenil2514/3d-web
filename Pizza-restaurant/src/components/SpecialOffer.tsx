import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, Copy, Check, ArrowRight, Gift, Clock } from 'lucide-react';

interface SpecialOfferProps {
  onClaimOffer: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onClaimOffer }) => {
  const [copied, setCopied] = useState(false);

  // Live Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FORGIO3FOR2');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="offers" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-br from-[#E63946] via-[#d62839] to-[#222222] p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F4A261]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#FFD166]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Background Illustration / Pizza Accent */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-15 pointer-events-none hidden lg:block pr-12">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
              alt="Special Offer Background"
              referrerPolicy="no-referrer"
              className="w-96 h-96 rounded-full object-cover"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-[#FFD166]">
                <Gift className="w-4 h-4 text-[#FFD166]" />
                <span>Limited Time Artisan Deal</span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
                BUY 2 PIZZAS, <br />
                <span className="text-[#FFD166] font-serif-title italic font-normal">GET 1 FREE</span>
              </h2>

              <p className="text-base sm:text-lg text-white/80 max-w-xl font-normal leading-relaxed">
                Order any 2 Large or Family artisan pizzas and get a classic Wood-Fired Margherita DOC completely free on us.
              </p>

              {/* Live Countdown & Code Copy */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                {/* Countdown Box */}
                <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                  <Clock className="w-5 h-5 text-[#FFD166] animate-pulse" />
                  <div className="flex items-center gap-2 font-display font-extrabold text-xl text-white">
                    <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                    <span>:</span>
                    <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                    <span>:</span>
                    <span className="text-[#FFD166]">{String(timeLeft.seconds).padStart(2, '0')}s</span>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
                  <span className="text-xs text-white/70 uppercase font-medium">Use Code:</span>
                  <span className="font-mono font-extrabold text-sm text-[#FFD166] tracking-wider">
                    FORGIO3FOR2
                  </span>
                  <button
                    onClick={handleCopyCode}
                    aria-label="Copy promotional code"
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Action Column */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center space-y-4">
              <button
                onClick={onClaimOffer}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-[#FFD166] text-[#222222] font-display font-extrabold text-lg shadow-xl hover:shadow-2xl hover:bg-white hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-3 group"
              >
                <span>Claim Offer Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-white/60 font-medium text-center lg:text-right">
                * Applicable on all online orders today. Auto-applied at checkout.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
