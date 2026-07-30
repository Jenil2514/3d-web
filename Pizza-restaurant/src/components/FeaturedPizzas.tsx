import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pizza } from '../types';
import { PIZZAS } from '../data/pizzas';
import { Plus, Star, Eye, Flame, Clock, Sparkles, Check } from 'lucide-react';

interface FeaturedPizzasProps {
  onAddToCart: (pizza: Pizza) => void;
  onOpenQuickView: (pizza: Pizza) => void;
}

export const FeaturedPizzas: React.FC<FeaturedPizzasProps> = ({
  onAddToCart,
  onOpenQuickView
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const categories = ['All', 'Vegetarian', 'Specialty', 'Spicy', 'Classic'];

  const filteredPizzas = PIZZAS.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  const handleAddClick = (e: React.MouseEvent, pizza: Pizza) => {
    e.stopPropagation();
    onAddToCart(pizza);
    setAddedIds((prev) => ({ ...prev, [pizza.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [pizza.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Light Radial Gradients */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8F3] border border-[#F4A261]/30 text-xs font-bold text-[#E63946] uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4A261]" />
            <span>Artisan Selection</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-[#222222] tracking-tight"
          >
            Featured Handcrafted <span className="text-[#E63946] font-serif-title italic font-normal">Pizzas</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#222222]/70 font-normal"
          >
            Baked in 800°F Vesuvian stone ovens with hand-stretched cold-fermented dough and fresh DOP ingredients.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-6"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeTab === cat
                    ? 'bg-[#E63946] text-white shadow-md shadow-[#E63946]/25'
                    : 'bg-[#FFF8F3] text-[#222222]/80 hover:bg-black/5 hover:text-[#222222]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Pizzas Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPizzas.map((pizza, index) => {
              const isAdded = addedIds[pizza.id];
              return (
                <motion.div
                  layout
                  key={pizza.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => onOpenQuickView(pizza)}
                  className="group relative bg-[#FFF8F3] rounded-3xl p-5 border border-black/5 shadow-sm hover:shadow-2xl hover:border-[#F4A261]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
                >
                  {/* Top Image Container */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-white">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuickView(pizza);
                        }}
                        className="w-full py-2.5 rounded-xl bg-white/90 backdrop-blur-md text-[#222222] text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-white transition-colors"
                      >
                        <Eye className="w-4 h-4 text-[#E63946]" />
                        Customize & Details
                      </button>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {pizza.isPopular && (
                        <span className="px-3 py-1 rounded-full bg-[#E63946] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                          Best Seller
                        </span>
                      )}
                      {pizza.isChefRecommendation && (
                        <span className="px-3 py-1 rounded-full bg-[#F4A261] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                          Chef Choice
                        </span>
                      )}
                    </div>

                    {/* Rating Tag Top Right */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#222222] text-xs font-bold flex items-center gap-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{pizza.rating}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-display font-bold text-xl text-[#222222] group-hover:text-[#E63946] transition-colors">
                          {pizza.name}
                        </h3>
                        {pizza.spiciness ? (
                          <div className="flex text-[#E63946] text-xs">
                            {[...Array(pizza.spiciness)].map((_, i) => (
                              <Flame key={i} className="w-3.5 h-3.5 fill-[#E63946]" />
                            ))}
                          </div>
                        ) : null}
                      </div>

                      {pizza.italianName && (
                        <p className="text-xs font-serif-title italic text-[#F4A261] font-semibold">
                          {pizza.italianName}
                        </p>
                      )}

                      <p className="text-xs text-[#222222]/70 mt-2 line-clamp-2 leading-relaxed">
                        {pizza.description}
                      </p>

                      {/* Ingredient Chips */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {pizza.ingredients.slice(0, 4).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-black/5 text-[#222222]/80"
                          >
                            {ing}
                          </span>
                        ))}
                        {pizza.ingredients.length > 4 && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-black/5 text-[#222222]/60">
                            +{pizza.ingredients.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Pricing & Action Bar */}
                    <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#222222]/50 font-medium block">Starting from</span>
                        <span className="font-display text-2xl font-extrabold text-[#222222]">
                          ${pizza.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => handleAddClick(e, pizza)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-[#E63946] hover:bg-[#d62839] text-white shadow-md shadow-[#E63946]/20 hover:scale-105 active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 animate-bounce" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
