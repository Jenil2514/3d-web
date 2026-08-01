import React, { useState } from 'react';
import { FurnitureModel, SwatchOption, LegOption } from '../types';
import { X, Check, ShoppingBag, Layers, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: FurnitureModel | null;
  onClose: () => void;
  onAddToCart: (product: FurnitureModel, swatch: SwatchOption, leg?: LegOption) => void;
  onOpenSwatches: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSwatches
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState<SwatchOption>(product.swatches[0]);
  const [selectedLeg, setSelectedLeg] = useState<LegOption | undefined>(product.legs ? product.legs[0] : undefined);
  const [added, setAdded] = useState(false);

  const calculatePrice = () => {
    let total = product.basePrice * selectedSwatch.priceMultiplier;
    if (selectedLeg) total += selectedLeg.price;
    return Math.round(total);
  };

  const handleAdd = () => {
    onAddToCart(product, selectedSwatch, selectedLeg);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative z-10 bg-[#FAF8F5] w-full max-w-4xl max-h-[90vh] flex flex-col rounded-none border border-[#E6DDD4] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Fixed Header Bar with Always-Visible Close Button */}
        <div className="p-4 border-b border-[#E6DDD4] flex items-center justify-between bg-[#F4EFEA] flex-shrink-0">
          <span className="text-xs uppercase font-mono tracking-widest text-[#B0977B] font-semibold">
            {product.category} — {product.designer}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors flex items-center gap-1 group"
            aria-label="Close"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#171615] group-hover:text-[#B0977B] hidden sm:inline">Close</span>
            <X className="w-5 h-5 text-[#171615] group-hover:text-[#B0977B]" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Carousel */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 overflow-hidden bg-[#F4EFEA] border border-[#E6DDD4]">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {product.images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                    {product.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          activeImageIndex === idx ? 'bg-[#171615] w-6' : 'bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 flex-shrink-0 border transition-all ${
                        activeImageIndex === idx ? 'border-[#171615] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Customization Controls */}
            <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-3xl font-light text-[#171615]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#B0977B] italic font-serif mt-1">
                  "{product.tagline}"
                </p>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed font-light">
                  {product.description}
                </p>
                <div className="mt-3 text-xs font-mono text-gray-500">
                  Dimensions: <strong className="text-[#171615]">{product.dimensions}</strong>
                </div>
              </div>

              {/* Swatch Selector */}
              <div className="space-y-2 pt-4 border-t border-[#E6DDD4]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#171615]">
                    Select Upholstery
                  </span>
                  <span className="text-gray-500 font-mono">{selectedSwatch.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.swatches.map((sw) => (
                    <button
                      key={sw.id}
                      onClick={() => setSelectedSwatch(sw)}
                      className={`w-8 h-8 rounded-none border transition-all relative ${
                        selectedSwatch.id === sw.id ? 'ring-2 ring-[#171615] ring-offset-1' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: sw.texture }}
                      title={sw.name}
                    >
                      {selectedSwatch.id === sw.id && (
                        <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leg Option */}
              {product.legs && product.legs.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider text-[#171615]">
                      Base Finish
                    </span>
                    <span className="text-gray-500 font-mono">{selectedLeg?.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.legs.map((leg) => (
                      <button
                        key={leg.id}
                        onClick={() => setSelectedLeg(leg)}
                        className={`p-2 border text-xs text-left transition-all flex items-center gap-2 ${
                          selectedLeg?.id === leg.id ? 'border-[#171615] bg-[#F4EFEA]' : 'border-[#E6DDD4]'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: leg.hex }} />
                        <span className="font-medium text-xs text-[#171615]">{leg.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing & Add Button */}
              <div className="pt-4 border-t border-[#171615] space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-gray-500">Configured Price</span>
                  <span className="font-serif text-3xl font-light text-[#171615]">
                    ${calculatePrice().toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleAdd}
                  className={`w-full py-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all ${
                    added ? 'bg-[#2D3E35] text-white' : 'bg-[#171615] text-white hover:bg-[#B0977B]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
