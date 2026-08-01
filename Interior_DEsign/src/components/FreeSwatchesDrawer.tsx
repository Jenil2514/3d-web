import React, { useState } from 'react';
import { SWATCH_LIBRARY } from '../data/boconceptData';
import { SwatchOption } from '../types';
import { X, Layers, Check, ArrowRight, Truck, Sparkles } from 'lucide-react';

interface FreeSwatchesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSwatches: SwatchOption[];
  onToggleSwatch: (swatch: SwatchOption) => void;
}

export const FreeSwatchesDrawer: React.FC<FreeSwatchesDrawerProps> = ({
  isOpen,
  onClose,
  selectedSwatches,
  onToggleSwatch
}) => {
  const [ordered, setOrdered] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: ''
  });

  if (!isOpen) return null;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrdered(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-[#FAF8F5] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E6DDD4] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E6DDD4] flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#B0977B]" />
            <div>
              <h3 className="font-serif text-xl font-light text-[#171615]">
                Order Free Swatches
              </h3>
              <span className="text-[10px] font-mono text-gray-500 uppercase">
                {selectedSwatches.length} / 5 Swatches Selected
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full">
            <X className="w-5 h-5 text-[#171615]" />
          </button>
        </div>

        {ordered ? (
          <div className="p-8 text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-[#2D3E35] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-2xl text-[#171615]">
                Free Swatch Box On Its Way!
              </h4>
              <p className="text-xs text-gray-600 mt-2 font-light leading-relaxed">
                We are preparing your custom Danish fabric & leather sample box. Shipped free to <strong>{shippingAddress.city || 'your address'}</strong> in 2-4 business days.
              </p>
            </div>
            <button
              onClick={() => { setOrdered(false); onClose(); }}
              className="bg-[#171615] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B]"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Instruction */}
            <div className="bg-[#F4EFEA] p-4 border border-[#E6DDD4] text-xs text-gray-700 leading-relaxed font-light">
              Touch and feel BoConcept fabrics in your home’s natural lighting before ordering. Select up to 5 complimentary swatches.
            </div>

            {/* Swatch Selector Grid */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-semibold tracking-wider text-[#171615]">
                Available Material Library
              </span>
              <div className="space-y-2">
                {SWATCH_LIBRARY.map((swatch) => {
                  const isSelected = selectedSwatches.some(s => s.id === swatch.id);
                  return (
                    <div
                      key={swatch.id}
                      onClick={() => onToggleSwatch(swatch)}
                      className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected ? 'border-[#171615] bg-[#F4EFEA]' : 'border-[#E6DDD4] hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-none border border-black/10 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: swatch.texture }}
                        />
                        <div>
                          <h5 className="font-serif font-bold text-sm text-[#171615]">{swatch.name}</h5>
                          <span className="text-[10px] font-mono text-gray-500">{swatch.category}</span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-[#171615] border-[#171615] text-white' : 'border-gray-300'}`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Form */}
            {selectedSwatches.length > 0 && (
              <form onSubmit={handleOrder} className="pt-4 border-t border-[#E6DDD4] space-y-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#171615] block">
                  Delivery Address
                </span>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  className="w-full p-2.5 bg-[#F4EFEA] border border-[#E6DDD4] text-xs outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  className="w-full p-2.5 bg-[#F4EFEA] border border-[#E6DDD4] text-xs outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="w-full p-2.5 bg-[#F4EFEA] border border-[#E6DDD4] text-xs outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    className="w-full p-2.5 bg-[#F4EFEA] border border-[#E6DDD4] text-xs outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 bg-[#171615] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B] transition-all flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Ship Free Swatch Box
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
