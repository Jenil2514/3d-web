import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pizza } from '../types';
import { X, Star, Clock, Flame, Plus, Minus, Check, ShieldCheck, ShoppingBag } from 'lucide-react';

interface PizzaModalProps {
  pizza: Pizza | null;
  onClose: () => void;
  onAddToCart: (customizedPizza: {
    pizza: Pizza;
    size: 'Medium (11")' | 'Large (14")' | 'Family (18")';
    crust: string;
    extraToppings: string[];
    quantity: number;
    totalPrice: number;
  }) => void;
}

export const PizzaModal: React.FC<PizzaModalProps> = ({
  pizza,
  onClose,
  onAddToCart
}) => {
  if (!pizza) return null;

  const [selectedSize, setSelectedSize] = useState<'Medium (11")' | 'Large (14")' | 'Family (18")'>('Large (14")');
  const [selectedCrust, setSelectedCrust] = useState<string>('Classic Neapolitan Leopard-Char');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const sizes = [
    { name: 'Medium (11")', priceOffset: 0 },
    { name: 'Large (14")', priceOffset: 4.5 },
    { name: 'Family (18")', priceOffset: 8.0 }
  ];

  const crustOptions = [
    'Classic Neapolitan Leopard-Char',
    'Extra Fermented 36-Hr Airy Bubbly',
    'Gluten-Free Cauliflower & Almond Crust (+ $2.50)',
    'Garlic Herb Stuffed Crust (+ $3.00)'
  ];

  const extraToppingOptions = [
    { name: 'Extra Buffalo Mozzarella', price: 2.5 },
    { name: 'White Truffle Drizzle', price: 2.0 },
    { name: 'Fresh Whole Burrata', price: 4.0 },
    { name: 'Hot Calabrian Honey', price: 1.5 },
    { name: 'Smoked Provolone', price: 2.0 }
  ];

  const sizeOffset = sizes.find((s) => s.name === selectedSize)?.priceOffset || 0;
  const crustOffset = selectedCrust.includes('$2.50') ? 2.5 : selectedCrust.includes('$3.00') ? 3.0 : 0;
  const toppingsOffset = selectedToppings.reduce((acc, tName) => {
    const topObj = extraToppingOptions.find((t) => t.name === tName);
    return acc + (topObj ? topObj.price : 0);
  }, 0);

  const unitPrice = pizza.price + sizeOffset + crustOffset + toppingsOffset;
  const totalPrice = unitPrice * quantity;

  const toggleTopping = (name: string) => {
    setSelectedToppings((prev) =>
      prev.includes(name) ? prev.filter((t) => t !== name) : [...prev, name]
    );
  };

  const handleAdd = () => {
    onAddToCart({
      pizza,
      size: selectedSize,
      crust: selectedCrust,
      extraToppings: selectedToppings,
      quantity,
      totalPrice
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#FFF8F3] rounded-3xl shadow-2xl border border-[#F4A261]/20 overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#222222] shadow-md hover:bg-white hover:text-[#E63946] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
            {/* Left Image Column */}
            <div className="md:col-span-5 relative bg-white flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-black/5">
              <img
                src={pizza.image}
                alt={pizza.name}
                referrerPolicy="no-referrer"
                className="w-full max-w-[280px] h-auto object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-full bg-[#E63946] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  {pizza.category}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white text-[#222222] text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-[#F4A261]" />
                  {pizza.prepTime}
                </span>
              </div>
            </div>

            {/* Right Options Column */}
            <div className="md:col-span-7 p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-2xl text-[#222222]">{pizza.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{pizza.rating}</span>
                  </div>
                </div>
                {pizza.italianName && (
                  <p className="text-xs font-serif-title italic text-[#F4A261] font-semibold mt-0.5">
                    {pizza.italianName}
                  </p>
                )}
                <p className="text-xs text-[#222222]/70 mt-2 leading-relaxed">
                  {pizza.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#222222] uppercase tracking-wider block">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedSize(s.name as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border ${
                        selectedSize === s.name
                          ? 'bg-[#E63946] text-white border-[#E63946] shadow-sm'
                          : 'bg-white text-[#222222]/80 border-black/10 hover:border-[#F4A261]'
                      }`}
                    >
                      <div>{s.name.split(' ')[0]}</div>
                      <div className="text-[10px] opacity-80">{s.name.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Crust Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#222222] uppercase tracking-wider block">
                  Choose Crust Style
                </label>
                <div className="space-y-1.5">
                  {crustOptions.map((c) => (
                    <label
                      key={c}
                      onClick={() => setSelectedCrust(c)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        selectedCrust === c
                          ? 'bg-white border-[#E63946] ring-1 ring-[#E63946] text-[#222222]'
                          : 'bg-white/60 border-black/5 hover:border-black/20 text-[#222222]/80'
                      }`}
                    >
                      <span>{c}</span>
                      <input
                        type="radio"
                        name="crust"
                        checked={selectedCrust === c}
                        onChange={() => setSelectedCrust(c)}
                        className="accent-[#E63946]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Extra Toppings */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#222222] uppercase tracking-wider block">
                  Extra Gourmet Finishes
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {extraToppingOptions.map((top) => {
                    const isSelected = selectedToppings.includes(top.name);
                    return (
                      <button
                        key={top.name}
                        onClick={() => toggleTopping(top.name)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E63946]/10 border-[#E63946] text-[#E63946] font-bold'
                            : 'bg-white border-black/5 text-[#222222]/80 hover:border-black/20'
                        }`}
                      >
                        <span>{top.name}</span>
                        <span className="text-[10px] opacity-80">+${top.price.toFixed(2)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quantity & Add Button */}
              <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl border border-black/10">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[#FFF8F3] hover:bg-black/5 flex items-center justify-center font-bold text-base cursor-pointer"
                  >
                    <Minus className="w-4 h-4 text-[#222222]" />
                  </button>
                  <span className="font-bold text-base w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-[#FFF8F3] hover:bg-black/5 flex items-center justify-center font-bold text-base cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#222222]" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={isSuccess}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    isSuccess
                      ? 'bg-emerald-600 shadow-emerald-600/30'
                      : 'bg-[#E63946] hover:bg-[#d62839] shadow-[#E63946]/30 hover:scale-[1.02] active:scale-98'
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-5 h-5 animate-bounce" />
                      <span>Added to Your Order!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add To Order • ${totalPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
