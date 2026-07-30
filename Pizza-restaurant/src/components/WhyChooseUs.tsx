import React from 'react';
import { motion } from 'motion/react';
import { FEATURES } from '../data/features';
import { Flame, Sparkles, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#FFF8F3] relative overflow-hidden">
      {/* Subtle Background Shapes */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#FFD166]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F4A261]/30 text-xs font-bold text-[#E63946] uppercase tracking-wider shadow-sm"
          >
            <Award className="w-3.5 h-3.5 text-[#F4A261]" />
            <span>The Forgio Commitment</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-[#222222] tracking-tight"
          >
            Why Pizza Lovers <span className="text-[#E63946] font-serif-title italic font-normal">Choose Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#222222]/70 font-normal"
          >
            We don't take shortcuts. Every pie is a labor of passion, tradition, and culinary perfection.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, index) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative bg-white rounded-3xl p-8 border border-black/5 shadow-md hover:shadow-2xl hover:border-[#F4A261]/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            >
              {/* Subtle Corner Glow on Hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-[#E63946]/20 to-[#F4A261]/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8F3] border border-[#F4A261]/20 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:bg-[#E63946]/10 transition-all duration-300">
                    {feat.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFF8F3] border border-black/5 text-[10px] font-extrabold text-[#E63946] uppercase tracking-wider">
                    {feat.badge}
                  </span>
                </div>

                {/* Subtitle & Title */}
                <span className="text-xs font-bold text-[#F4A261] uppercase tracking-widest block mb-1">
                  {feat.subtitle}
                </span>
                <h3 className="font-display font-bold text-xl text-[#222222] mb-3 group-hover:text-[#E63946] transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#222222]/70 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              {/* Decorative Bottom Bar */}
              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-bold text-[#222222]/60 group-hover:text-[#E63946] transition-colors">
                <span>Uncompromising Quality</span>
                <Sparkles className="w-4 h-4 text-[#F4A261]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
