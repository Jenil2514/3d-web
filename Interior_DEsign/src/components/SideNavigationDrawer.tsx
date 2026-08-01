import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, MapPin, Layers, Heart } from 'lucide-react';
import { ProductCategory } from '../types';

interface SideNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenConsultation: () => void;
  onOpenSwatches: () => void;
  onOpenStoreLocator: () => void;
}

type MenuLevel = 'main' | 'rooms' | 'furniture' | 'collections' | 'service';

export const SideNavigationDrawer: React.FC<SideNavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenConsultation,
  onOpenSwatches,
  onOpenStoreLocator
}) => {
  const [currentLevel, setCurrentLevel] = useState<MenuLevel>('main');

  if (!isOpen) return null;

  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    onClose();
    setCurrentLevel('main');
  };

  const handleRoomClick = (roomCat: string) => {
    let mappedCat: ProductCategory = 'all';
    if (roomCat === 'Living rooms') mappedCat = 'sofas';
    if (roomCat === 'Dining rooms') mappedCat = 'tables';
    if (roomCat === 'Bedrooms' || roomCat === 'Home offices') mappedCat = 'storage';
    if (roomCat === 'Outdoor spaces') mappedCat = 'outdoor';

    onSelectCategory(mappedCat);
    onClose();
    setCurrentLevel('main');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          onClose();
          setCurrentLevel('main');
        }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slide-out Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#171615] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-[#E6DDD4]">
          
          {/* Top Banner & Close Header */}
          <div className="p-6 border-b border-[#E6DDD4] flex items-center justify-between gap-4 bg-white">
            <div className="text-xs font-serif flex items-center gap-2">
              <span className="text-[#171615]/70">Get styling advice</span>
              <button
                onClick={() => {
                  onOpenConsultation();
                  onClose();
                }}
                className="underline underline-offset-4 font-semibold text-[#171615] hover:text-[#B0977B] transition-colors"
              >
                Make an appointment
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                setCurrentLevel('main');
              }}
              className="p-2 hover:bg-[#F4EFEA] rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-[#171615]" />
            </button>
          </div>

          {/* Drawer Body — Multi-Level Sliding View */}
          <div className="flex-1 p-6 relative">
            
            {/* LEVEL 1: MAIN MENU */}
            {currentLevel === 'main' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-200">
                
                {/* Primary Large Links */}
                <div className="space-y-4 font-serif text-2xl sm:text-3xl font-light">
                  <button
                    onClick={() => setCurrentLevel('furniture')}
                    className="w-full flex items-center justify-between py-2 text-left group hover:text-[#B0977B] transition-colors"
                  >
                    <span>Furniture</span>
                    <ChevronRight className="w-5 h-5 text-[#171615]/40 group-hover:text-[#B0977B] group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => setCurrentLevel('collections')}
                    className="w-full flex items-center justify-between py-2 text-left group hover:text-[#B0977B] transition-colors"
                  >
                    <span>Collections</span>
                    <ChevronRight className="w-5 h-5 text-[#171615]/40 group-hover:text-[#B0977B] group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="w-full flex items-center justify-between py-2 text-left hover:text-[#B0977B] transition-colors"
                  >
                    <span>Outlet</span>
                  </button>

                  <button
                    onClick={() => setCurrentLevel('rooms')}
                    className="w-full flex items-center justify-between py-2 text-left group hover:text-[#B0977B] transition-colors"
                  >
                    <span>Rooms</span>
                    <ChevronRight className="w-5 h-5 text-[#171615]/40 group-hover:text-[#B0977B] group-hover:translate-x-1 transition-all" />
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E6DDD4]" />

                {/* Secondary Menu Links */}
                <div className="space-y-4 text-sm font-sans font-medium text-[#171615]/80">
                  <a
                    href="#room-hotspots"
                    onClick={() => onClose()}
                    className="block hover:text-[#B0977B] transition-colors"
                  >
                    KØBENHAVN + Helena Christensen
                  </a>
                  
                  <a
                    href="#room-hotspots"
                    onClick={() => onClose()}
                    className="block hover:text-[#B0977B] transition-colors"
                  >
                    Inspiration & Shop The Look
                  </a>

                  <button
                    onClick={() => setCurrentLevel('service')}
                    className="w-full flex items-center justify-between text-left hover:text-[#B0977B] transition-colors"
                  >
                    <span>Customer Service</span>
                    <ChevronRight className="w-4 h-4 text-[#171615]/40" />
                  </button>

                  <button
                    onClick={() => {
                      onOpenConsultation();
                      onClose();
                    }}
                    className="block text-left hover:text-[#B0977B] transition-colors"
                  >
                    Interior Design Service
                  </button>

                  <button
                    onClick={() => {
                      onOpenSwatches();
                      onClose();
                    }}
                    className="block text-left hover:text-[#B0977B] transition-colors"
                  >
                    Order free samples
                  </button>

                  <button
                    onClick={() => {
                      onOpenStoreLocator();
                      onClose();
                    }}
                    className="block text-left hover:text-[#B0977B] transition-colors"
                  >
                    Find a store
                  </button>

                  <button
                    onClick={() => setCurrentLevel('service')}
                    className="w-full flex items-center justify-between text-left hover:text-[#B0977B] transition-colors"
                  >
                    <span>About KØBENHAVN</span>
                    <ChevronRight className="w-4 h-4 text-[#171615]/40" />
                  </button>

                  <button
                    onClick={() => {
                      onOpenConsultation();
                      onClose();
                    }}
                    className="block text-left hover:text-[#B0977B] transition-colors"
                  >
                    Become a franchisee
                  </button>

                  <button
                    onClick={() => setCurrentLevel('service')}
                    className="w-full flex items-center justify-between text-left hover:text-[#B0977B] transition-colors"
                  >
                    <span>Professionals & Contract</span>
                    <ChevronRight className="w-4 h-4 text-[#171615]/40" />
                  </button>
                </div>

              </div>
            )}

            {/* LEVEL 2: ROOMS PANEL */}
            {currentLevel === 'rooms' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <button
                  onClick={() => setCurrentLevel('main')}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171615]/70 hover:text-[#171615] transition-colors mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#171615]">Rooms</h3>
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="text-xs font-medium underline underline-offset-4 text-[#171615]/70 hover:text-[#B0977B] mt-1 block"
                  >
                    All rooms
                  </button>
                </div>

                <div className="space-y-4 font-serif text-xl font-light pt-4 border-t border-[#E6DDD4]">
                  {[
                    'Living rooms',
                    'Dining rooms',
                    'Bedrooms',
                    'Outdoor spaces',
                    'Small spaces',
                    'Home offices'
                  ].map((room) => (
                    <button
                      key={room}
                      onClick={() => handleRoomClick(room)}
                      className="block w-full text-left hover:text-[#B0977B] transition-colors py-1"
                    >
                      {room}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* LEVEL 2: FURNITURE PANEL */}
            {currentLevel === 'furniture' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <button
                  onClick={() => setCurrentLevel('main')}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171615]/70 hover:text-[#171615] transition-colors mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#171615]">Furniture</h3>
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="text-xs font-medium underline underline-offset-4 text-[#171615]/70 hover:text-[#B0977B] mt-1 block"
                  >
                    All furniture
                  </button>
                </div>

                <div className="space-y-4 font-serif text-xl font-light pt-4 border-t border-[#E6DDD4]">
                  <button onClick={() => handleCategoryClick('sofas')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Sofas & Sectionals
                  </button>
                  <button onClick={() => handleCategoryClick('armchairs')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Armchairs & Recliners
                  </button>
                  <button onClick={() => handleCategoryClick('tables')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Dining Tables & Chairs
                  </button>
                  <button onClick={() => handleCategoryClick('tables')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Coffee & Side Tables
                  </button>
                  <button onClick={() => handleCategoryClick('storage')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Storage & Shelving
                  </button>
                  <button onClick={() => handleCategoryClick('lighting')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Sculptural Lighting
                  </button>
                  <button onClick={() => handleCategoryClick('outdoor')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Outdoor Furniture
                  </button>
                </div>
              </div>
            )}

            {/* LEVEL 2: COLLECTIONS PANEL */}
            {currentLevel === 'collections' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <button
                  onClick={() => setCurrentLevel('main')}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171615]/70 hover:text-[#171615] transition-colors mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#171615]">Collections</h3>
                  <button
                    onClick={() => handleCategoryClick('all')}
                    className="text-xs font-medium underline underline-offset-4 text-[#171615]/70 hover:text-[#B0977B] mt-1 block"
                  >
                    All collections
                  </button>
                </div>

                <div className="space-y-4 font-serif text-xl font-light pt-4 border-t border-[#E6DDD4]">
                  <button onClick={() => handleCategoryClick('sofas')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Bergamo Collection
                  </button>
                  <button onClick={() => handleCategoryClick('armchairs')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Imola Collection
                  </button>
                  <button onClick={() => handleCategoryClick('sofas')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Carmo Collection
                  </button>
                  <button onClick={() => handleCategoryClick('tables')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Kingston Collection
                  </button>
                  <button onClick={() => handleCategoryClick('armchairs')} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Ottawa Collection
                  </button>
                </div>
              </div>
            )}

            {/* LEVEL 2: CUSTOMER SERVICE PANEL */}
            {currentLevel === 'service' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <button
                  onClick={() => setCurrentLevel('main')}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171615]/70 hover:text-[#171615] transition-colors mb-4"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#171615]">Customer Service</h3>
                </div>

                <div className="space-y-4 text-sm font-sans text-[#171615]/80 pt-4 border-t border-[#E6DDD4]">
                  <button onClick={() => { onOpenConsultation(); onClose(); }} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Book Interior Styling Consultation
                  </button>
                  <button onClick={() => { onOpenStoreLocator(); onClose(); }} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Store Locations & Hours
                  </button>
                  <button onClick={() => { onOpenSwatches(); onClose(); }} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    Order Complimentary Swatches
                  </button>
                  <a href="#room-hotspots" onClick={() => onClose()} className="block w-full text-left hover:text-[#B0977B] transition-colors py-1">
                    10-Year Warranty & Upholstery Care
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-[#E6DDD4] bg-white">
            <button
              onClick={() => {
                onOpenConsultation();
                onClose();
              }}
              className="w-full py-3.5 bg-[#171615] text-[#FAF8F5] hover:bg-[#B0977B] transition-colors text-xs uppercase font-semibold tracking-widest flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span>Book Interior Styling</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
