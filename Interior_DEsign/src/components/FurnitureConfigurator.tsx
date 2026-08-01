import React, { useState } from 'react';
import { FurnitureModel, SwatchOption, LegOption } from '../types';
import { PRODUCTS_CATALOG, SWATCH_LIBRARY, LEG_FINISHES } from '../data/boconceptData';
import { Check, ShoppingBag, Layers, RotateCcw, Info, Sparkles, SlidersHorizontal } from 'lucide-react';

interface FurnitureConfiguratorProps {
  onAddToCart: (product: FurnitureModel, swatch: SwatchOption, leg?: LegOption) => void;
  onOpenSwatches: () => void;
}

export const FurnitureConfigurator: React.FC<FurnitureConfiguratorProps> = ({
  onAddToCart,
  onOpenSwatches
}) => {
  const [selectedProduct, setSelectedProduct] = useState<FurnitureModel>(PRODUCTS_CATALOG[0]);
  const [selectedSwatch, setSelectedSwatch] = useState<SwatchOption>(SWATCH_LIBRARY[0]);
  const [selectedLeg, setSelectedLeg] = useState<LegOption | undefined>(LEG_FINISHES[0]);
  const [viewAngle, setViewAngle] = useState<'front' | 'side' | 'detail'>('front');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const calculateTotalPrice = () => {
    let base = selectedProduct.basePrice * selectedSwatch.priceMultiplier;
    if (selectedLeg) base += selectedLeg.price;
    return Math.round(base);
  };

  const handleAddToCart = () => {
    onAddToCart(selectedProduct, selectedSwatch, selectedLeg);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <section id="3d-configurator" className="py-20 bg-[#FAF8F5] border-t border-[#E6DDD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B0977B] mb-2 font-semibold">
              <SlidersHorizontal className="w-4 h-4" />
              Interactive Customiser
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171615]">
              Tailor Your Danish Piece
            </h2>
            <p className="text-[#171615]/70 font-light mt-2 max-w-xl text-sm sm:text-base">
              Personalise fabrics, premium leathers, and handcrafted leg finishes to create a one-of-a-kind design.
            </p>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {PRODUCTS_CATALOG.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedProduct(item);
                  setSelectedSwatch(item.swatches[0] || SWATCH_LIBRARY[0]);
                }}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all border ${
                  selectedProduct.id === item.id
                    ? 'bg-[#171615] text-white border-[#171615]'
                    : 'bg-[#F4EFEA] text-[#171615] border-transparent hover:border-[#171615]'
                }`}
              >
                {item.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Customization Viewport Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Preview (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-[#F4EFEA] p-6 sm:p-10 border border-[#E6DDD4] flex flex-col justify-between min-h-[480px] relative group">
            
            {/* Top Badge & Controls */}
            <div className="flex items-center justify-between z-10">
              <div className="bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 border border-[#E6DDD4] text-[11px] font-mono uppercase tracking-wider text-[#171615] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedSwatch.texture }} />
                <span>{selectedSwatch.name}</span>
              </div>

              {/* View Angles */}
              <div className="flex items-center gap-1 bg-[#FAF8F5]/90 backdrop-blur-md p-1 border border-[#E6DDD4]">
                <button
                  onClick={() => setViewAngle('front')}
                  className={`px-2.5 py-1 text-[10px] uppercase font-semibold transition-colors ${
                    viewAngle === 'front' ? 'bg-[#171615] text-white' : 'text-[#171615] hover:bg-[#E6DDD4]'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setViewAngle('side')}
                  className={`px-2.5 py-1 text-[10px] uppercase font-semibold transition-colors ${
                    viewAngle === 'side' ? 'bg-[#171615] text-white' : 'text-[#171615] hover:bg-[#E6DDD4]'
                  }`}
                >
                  Angle
                </button>
                <button
                  onClick={() => setViewAngle('detail')}
                  className={`px-2.5 py-1 text-[10px] uppercase font-semibold transition-colors ${
                    viewAngle === 'detail' ? 'bg-[#171615] text-white' : 'text-[#171615] hover:bg-[#E6DDD4]'
                  }`}
                >
                  Detail
                </button>
              </div>
            </div>

            {/* Interactive Image Render Viewport */}
            <div className="relative my-6 aspect-4/3 overflow-hidden flex items-center justify-center">
              <img
                src={
                  viewAngle === 'front'
                    ? selectedProduct.images[0]
                    : viewAngle === 'side'
                    ? selectedProduct.images[1] || selectedProduct.images[0]
                    : selectedProduct.images[2] || selectedProduct.images[0]
                }
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105"
              />
              
              {/* Dynamic Texture Overlay tint */}
              <div
                className="absolute inset-0 mix-blend-color opacity-25 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: selectedSwatch.texture }}
              />
            </div>

            {/* Bottom Product Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E6DDD4] z-10 text-xs font-mono text-[#171615]">
              <div>
                <span className="text-gray-500">Designer:</span> <strong className="font-semibold">{selectedProduct.designer}</strong>
              </div>
              <div>
                <span className="text-gray-500">Dimensions:</span> <strong className="font-semibold">{selectedProduct.dimensions}</strong>
              </div>
              <button
                onClick={onOpenSwatches}
                className="text-[#B0977B] underline underline-offset-4 hover:text-[#171615] font-semibold flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5" /> Order Sample Swatch
              </button>
            </div>

          </div>

          {/* Configuration Controls (Right 5 Columns) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 border border-[#E6DDD4] space-y-6">
            
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B0977B] font-semibold">
                {selectedProduct.category}
              </span>
              <h3 className="font-serif text-3xl font-light text-[#171615] mt-1">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-[#171615]/70 italic mt-1 font-serif">
                "{selectedProduct.tagline}"
              </p>
            </div>

            {/* Material Swatch Selector */}
            <div className="space-y-3 pt-4 border-t border-[#E6DDD4]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#171615]">
                  1. Select Upholstery Material
                </span>
                <span className="text-gray-500 font-mono">{selectedSwatch.category}</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {SWATCH_LIBRARY.map((swatch) => (
                  <button
                    key={swatch.id}
                    onClick={() => setSelectedSwatch(swatch)}
                    className={`aspect-square relative rounded-none p-0.5 transition-all ${
                      selectedSwatch.id === swatch.id
                        ? 'ring-2 ring-[#171615] ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                    title={swatch.name}
                  >
                    <div
                      className="w-full h-full border border-black/10 shadow-inner"
                      style={{ backgroundColor: swatch.texture }}
                    />
                    {selectedSwatch.id === swatch.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#171615]/80 font-light bg-[#F4EFEA] p-3 border border-[#E6DDD4]">
                <strong>{selectedSwatch.name}:</strong> {selectedSwatch.description}
              </p>
            </div>

            {/* Leg Finish Selector */}
            {selectedProduct.legs && selectedProduct.legs.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[#E6DDD4]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#171615]">
                    2. Select Base & Leg Finish
                  </span>
                  <span className="text-gray-500 font-mono">
                    {selectedLeg?.name} {selectedLeg?.price ? `(+$${selectedLeg.price})` : ''}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedProduct.legs.map((leg) => (
                    <button
                      key={leg.id}
                      onClick={() => setSelectedLeg(leg)}
                      className={`p-2 border text-center transition-all flex flex-col items-center gap-1.5 ${
                        selectedLeg?.id === leg.id
                          ? 'border-[#171615] bg-[#F4EFEA]'
                          : 'border-[#E6DDD4] bg-[#FAF8F5] hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-black/20"
                        style={{ backgroundColor: leg.hex }}
                      />
                      <span className="text-[10px] font-semibold text-[#171615] truncate max-w-full">
                        {leg.finish}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Pricing & Add to Bag */}
            <div className="pt-6 border-t border-[#171615] space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold block">Total Customized Price</span>
                  <span className="text-xs text-gray-500 font-mono">Includes VAT & Standard Crafting</span>
                </div>
                <span className="font-serif text-3xl font-normal text-[#171615]">
                  ${calculateTotalPrice().toLocaleString()}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-4 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-3 transition-all ${
                  addedAnimation
                    ? 'bg-[#2D3E35] text-white'
                    : 'bg-[#171615] text-[#FAF8F5] hover:bg-[#B0977B]'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Tailored Piece to Bag</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B0977B]" />
                Free Danish white-glove delivery & home assembly included
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
