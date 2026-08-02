import React, { useState } from 'react';
import { ROOM_SCENES } from '../data/boconceptData';
import { Hotspot, FurnitureModel } from '../types';
import { PRODUCTS_CATALOG } from '../data/boconceptData';
import { Plus, X, ArrowRight, ShoppingBag, Eye } from 'lucide-react';

interface RoomHotspotsProps {
  onQuickViewProduct: (product: FurnitureModel) => void;
}

export const RoomHotspots: React.FC<RoomHotspotsProps> = ({ onQuickViewProduct }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(ROOM_SCENES[0].hotspots[0]);

  const scene = ROOM_SCENES[activeSceneIndex];

  return (
    <section id="room-hotspots" className="py-20 bg-[#171615] text-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#C5A059] block mb-2 font-semibold">
              Curated Interiors — Shop The Look
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              Inspired Scandinavian Living
            </h2>
            <p className="text-white/70 font-light mt-2 max-w-xl text-sm sm:text-base">
              Click on the hotspots to explore bespoke furnishings, material pairings, and design details in real room settings.
            </p>
          </div>

          {/* Scene Tabs */}
          <div className="flex gap-3">
            {ROOM_SCENES.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveSceneIndex(idx);
                  setActiveHotspot(sc.hotspots[0]);
                }}
                className={`px-5 py-3 text-xs font-semibold uppercase tracking-widest transition-all border ${
                  activeSceneIndex === idx
                    ? 'bg-[#C5A059] text-white border-[#C5A059]'
                    : 'bg-transparent text-white/80 border-white/20 hover:border-white'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Room Visual Canvas & Hotspot Pins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Room Image Canvas (8 Cols) */}
          <div className="lg:col-span-8 relative w-full min-w-0 aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-black rounded-none border border-white/10 group">
            <img
              src={scene.image}
              alt={scene.title}
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Hotspot Pins */}
            {scene.hotspots.map((hs) => {
              const isSelected = activeHotspot?.id === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspot(hs)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#C5A059] text-white scale-125 shadow-lg shadow-[#C5A059]/50'
                        : 'bg-white/90 text-[#171615] hover:scale-110'
                    }`}
                    aria-label={`Hotspot for ${hs.title}`}
                  >
                    <span className="absolute inset-0 rounded-full bg-[#C5A059] animate-ping-slow pointer-events-none" />
                    <Plus className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
                  </button>
                </div>
              );
            })}

            {/* Bottom Caption Bar */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs z-10">
              <div>
                <h4 className="font-serif text-lg text-white font-medium">{scene.title}</h4>
                <p className="text-white/60 font-light">{scene.subtitle}</p>
              </div>
              <span className="hidden sm:block text-[11px] font-mono text-[#C5A059]">
                {scene.hotspots.length} Clickable Hotspots
              </span>
            </div>

          </div>

          {/* Hotspot Product Preview Card (4 Cols) */}
          <div className="lg:col-span-4 w-full min-w-0 bg-[#232220] p-6 border border-white/10 flex flex-col justify-between">
            {activeHotspot ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                    Selected Piece
                  </span>
                  <span className="text-xs font-mono text-white/50">
                    Hotspot Tagged
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div>
                  <h3 className="font-serif text-2xl font-light text-white">
                    {activeHotspot.title}
                  </h3>
                  <p className="font-serif text-xl text-[#C5A059] mt-1 font-semibold">
                    ${activeHotspot.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-white/70 font-light mt-3 leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      const fullProduct = PRODUCTS_CATALOG.find(p => p.id === activeHotspot.productId);
                      if (fullProduct) onQuickViewProduct(fullProduct);
                    }}
                    className="w-full py-3.5 bg-[#FAF8F5] text-[#171615] hover:bg-[#C5A059] hover:text-white transition-all text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Specifications & Customise</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-white/50 space-y-3">
                <Plus className="w-8 h-8 text-[#C5A059] animate-bounce" />
                <p className="text-sm font-serif italic">Select any hotspot pin on the room image to view product details.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
