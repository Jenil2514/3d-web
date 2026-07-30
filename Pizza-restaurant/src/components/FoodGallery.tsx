import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { Maximize2, X, Sparkles, Camera } from 'lucide-react';

export const FoodGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Pizza', 'Kitchen', 'Ingredients', 'Atmosphere'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="gallery" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F3] border border-[#F4A261]/30 text-xs font-bold text-[#E63946] uppercase tracking-wider"
          >
            <Camera className="w-3.5 h-3.5 text-[#F4A261]" />
            <span>Visual Journey</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-[#222222] tracking-tight"
          >
            Cinematic Food <span className="text-[#E63946] font-serif-title italic font-normal">Gallery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#222222]/70 font-normal"
          >
            A peek behind the flames: from our Vesuvian brick ovens to hand-pulled mozzarella.
          </motion.p>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#E63946] text-white shadow-md'
                    : 'bg-[#FFF8F3] text-[#222222]/80 hover:bg-black/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Masonry / Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => setLightboxItem(item)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-black/5 shadow-md hover:shadow-2xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase font-bold text-[#FFD166] tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-xs text-white/80 line-clamp-2">{item.caption}</p>

                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/10"
            >
              <button
                onClick={() => setLightboxItem(null)}
                aria-label="Close image lightbox"
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[16/10] bg-black">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#222222] text-white space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD166]">
                  {lightboxItem.category}
                </span>
                <h3 className="font-display font-bold text-xl">{lightboxItem.title}</h3>
                <p className="text-sm text-white/70">{lightboxItem.caption}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
