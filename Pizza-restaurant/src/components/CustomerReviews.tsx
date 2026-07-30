import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/testimonials';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="reviews" className="py-24 bg-[#FFF8F3] relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-80 h-80 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-[#F4A261]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F4A261]/30 text-xs font-bold text-[#E63946] uppercase tracking-wider shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-[#E63946] fill-[#E63946]" />
            <span>Community Love</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-[#222222] tracking-tight"
          >
            Loved By <span className="text-[#E63946] font-serif-title italic font-normal">Food Critics</span> & Locals
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#222222]/70 font-normal"
          >
            Over 12,000 five-star reviews from pizza purists, Michelin chefs, and families.
          </motion.p>
        </div>

        {/* Featured Testimonial Hero Carousel Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            key={TESTIMONIALS[currentIndex].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="relative bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-xl flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <Quote className="absolute top-6 right-8 w-16 h-16 text-[#F4A261]/15 pointer-events-none" />

            {/* Avatar & Role Info */}
            <div className="flex flex-col items-center text-center space-y-3 shrink-0">
              <div className="relative">
                <img
                  src={TESTIMONIALS[currentIndex].avatar}
                  alt={TESTIMONIALS[currentIndex].name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-[#FFF8F3] shadow-md"
                />
                {TESTIMONIALS[currentIndex].verified && (
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="Verified Customer">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-[#222222]">
                  {TESTIMONIALS[currentIndex].name}
                </h4>
                <p className="text-xs text-[#222222]/60 font-medium">
                  {TESTIMONIALS[currentIndex].role}
                </p>
              </div>
            </div>

            {/* Quote & Details */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
                {[...Array(TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-base sm:text-xl font-serif-title italic text-[#222222] leading-relaxed">
                "{TESTIMONIALS[currentIndex].comment}"
              </p>

              <div className="pt-4 border-t border-black/5 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-[#222222]/70 font-semibold">
                  <span>Favorite Pie:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#FFF8F3] text-[#E63946] font-bold border border-black/5">
                    {TESTIMONIALS[currentIndex].favoritePizza}
                  </span>
                </div>
                <span className="text-[#222222]/40 font-medium">{TESTIMONIALS[currentIndex].date}</span>
              </div>
            </div>
          </motion.div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              aria-label="Previous review"
              className="p-3 rounded-full bg-white shadow-md border border-black/5 hover:bg-[#E63946] hover:text-white transition-all cursor-pointer text-[#222222]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-8 bg-[#E63946]' : 'w-2.5 bg-black/15 hover:bg-black/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Next review"
              className="p-3 rounded-full bg-white shadow-md border border-black/5 hover:bg-[#E63946] hover:text-white transition-all cursor-pointer text-[#222222]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auto-scrolling / Grid of all reviews preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-[#222222]/50 font-semibold">{item.date}</span>
              </div>
              <p className="text-xs text-[#222222]/80 leading-relaxed line-clamp-3">
                "{item.comment}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-[#222222]">{item.name}</p>
                  <p className="text-[10px] text-[#222222]/50">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
