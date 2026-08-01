import React, { useState } from 'react';
import { STORES_LOCATIONS } from '../data/boconceptData';
import { MapPin, X, Phone, Clock, Sparkles } from 'lucide-react';

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultation
}) => {
  if (!isOpen) return null;

  const [selectedStore, setSelectedStore] = useState(STORES_LOCATIONS[0]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-none border border-[#E6DDD4] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E6DDD4] flex items-center justify-between bg-[#171615] text-white">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#C5A059]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                Flagship Showrooms
              </span>
              <h3 className="font-serif text-2xl font-light">Find a KØBENHAVN Store</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Store List (5 Cols) */}
          <div className="md:col-span-5 border-r border-[#E6DDD4] bg-[#F4EFEA] p-4 space-y-2 max-h-[400px] overflow-y-auto">
            {STORES_LOCATIONS.map((store) => (
              <button
                key={store.city}
                onClick={() => setSelectedStore(store)}
                className={`w-full p-4 text-left border transition-all ${
                  selectedStore.city === store.city
                    ? 'border-[#171615] bg-[#FAF8F5] shadow-sm'
                    : 'border-transparent hover:bg-black/5'
                }`}
              >
                <h4 className="font-serif font-bold text-base text-[#171615]">{store.city}</h4>
                <p className="text-xs text-gray-600 font-light mt-1">{store.address}</p>
              </button>
            ))}
          </div>

          {/* Store Detail & Map Preview (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-[#B0977B] tracking-widest font-semibold block">
                  Store Details
                </span>
                <h3 className="font-serif text-3xl font-light text-[#171615] mt-1">
                  {selectedStore.city}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-gray-700 font-light pt-3 border-t border-[#E6DDD4]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B0977B] flex-shrink-0 mt-0.5" />
                  <span>{selectedStore.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B0977B] flex-shrink-0" />
                  <span>{selectedStore.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#B0977B] flex-shrink-0" />
                  <span>{selectedStore.hours}</span>
                </div>
              </div>
            </div>

            {/* Map Visual Box */}
            <div className="aspect-16/9 bg-[#E6DDD4] relative overflow-hidden border border-[#E6DDD4] flex items-center justify-center">
              <img
                src={(selectedStore as any).image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"}
                alt={`${selectedStore.city} Showroom`}
                className="w-full h-full object-cover opacity-90 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-4">
                <span className="bg-[#171615] text-white px-3 py-1.5 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg">
                  <MapPin className="w-4 h-4 text-[#C5A059]" /> {selectedStore.city}
                </span>
              </div>
            </div>

            <button
              onClick={() => { onClose(); onOpenConsultation(); }}
              className="w-full py-3.5 bg-[#171615] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              Book In-Store Styling Appointment
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
