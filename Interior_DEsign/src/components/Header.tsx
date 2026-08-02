import React, { useState } from 'react';
import { Search, ShoppingBag, MapPin, Layers, Sparkles, Menu, X } from 'lucide-react';
import { PRODUCTS_CATALOG } from '../data/boconceptData';
import { FurnitureModel } from '../types';

interface HeaderProps {
  cartCount: number;
  swatchCount: number;
  onOpenCart: () => void;
  onOpenSwatches: () => void;
  onOpenStoreLocator: () => void;
  onOpenConsultation: () => void;
  onOpenSideNav: () => void;
  onSelectCategory: (category: any) => void;
  onQuickViewProduct: (product: FurnitureModel) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  swatchCount,
  onOpenCart,
  onOpenSwatches,
  onOpenStoreLocator,
  onOpenConsultation,
  onOpenSideNav,
  onSelectCategory,
  onQuickViewProduct
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSearchResults = searchQuery.trim() === ''
    ? []
    : PRODUCTS_CATALOG.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.designer.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6DDD4] shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Single Row Header (h-12 sm:h-13) */}
        <div className="flex items-center justify-between h-12 sm:h-13 gap-3">
          
          {/* Left Section: Navigation Category Quick Links / Menu */}
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={onOpenSideNav}
              className="p-1 text-[#171615] hover:text-[#B0977B] transition-colors flex items-center gap-1.5 group"
              aria-label="Open side menu"
            >
              <Menu className="w-5 h-5 text-[#171615] group-hover:text-[#B0977B] transition-colors" />
              <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-wider">Menu</span>
            </button>

            <nav className="hidden lg:flex items-center space-x-4 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#171615] pl-2 border-l border-[#E6DDD4]">
              <button onClick={() => onSelectCategory('all')} className="hover:text-[#B0977B] transition-colors">Furniture</button>
              <button onClick={() => onSelectCategory('sofas')} className="hover:text-[#B0977B] transition-colors">Sofas</button>
              <button onClick={() => onSelectCategory('armchairs')} className="hover:text-[#B0977B] transition-colors">Armchairs</button>
              <button onClick={() => onSelectCategory('tables')} className="hover:text-[#B0977B] transition-colors">Tables</button>
              <a href="#projects" className="hover:text-[#0D9488] font-bold text-[#0D9488] transition-colors">Projects</a>
              <a href="#room-hotspots" className="hover:text-[#B0977B] transition-colors text-[#B0977B]">Shop The Room</a>
            </nav>
          </div>

          {/* Center Brand Logo */}
          <a href="#" className="flex flex-col items-center group">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#171615] group-hover:text-[#B0977B] transition-colors uppercase leading-none">
              KØBENHAVN
            </span>
            <span className="text-[7px] sm:text-[8px] tracking-[0.25em] text-[#B0977B] uppercase font-sans font-medium hidden sm:block mt-0.5">
              Danish Design 1952
            </span>
          </a>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-xs font-semibold uppercase tracking-wider">
            
            <button
              onClick={onOpenStoreLocator}
              className="hidden md:flex items-center gap-1.5 text-[#171615] hover:text-[#B0977B] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#B0977B]" />
              <span className="text-[11px]">Stores</span>
            </button>

            <button
              onClick={onOpenSwatches}
              className="hidden md:flex items-center gap-1.5 text-[#171615] hover:text-[#B0977B] transition-colors relative"
            >
              <Layers className="w-3.5 h-3.5 text-[#B0977B]" />
              <span className="text-[11px]">Swatches</span>
              {swatchCount > 0 && (
                <span className="bg-[#B0977B] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {swatchCount}
                </span>
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-[#171615] hover:text-[#B0977B] transition-colors flex items-center gap-1.5 group"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px]">Search</span>
            </button>

            {/* Design Service Button */}
            <button
              onClick={onOpenConsultation}
              className="hidden sm:flex items-center gap-1.5 bg-[#171615] text-[#FAF8F5] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider hover:bg-[#B0977B] transition-all"
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Book Stylist</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="p-1.5 text-[#171615] hover:text-[#B0977B] transition-colors relative flex items-center gap-1.5 group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px]">Bag</span>
              {cartCount > 0 && (
                <span className="bg-[#171615] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Live Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
          <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-none shadow-2xl overflow-hidden border border-[#E6DDD4] animate-in fade-in duration-200">
            <div className="p-4 border-b border-[#E6DDD4] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#B0977B]" />
              <input
                type="text"
                autoFocus
                placeholder="Search sofas, chairs, designers, materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-lg font-serif outline-none placeholder:text-[#B0977B]/60"
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="p-2 hover:bg-[#F4EFEA] rounded-full"
              >
                <X className="w-5 h-5 text-[#171615]" />
              </button>
            </div>
            
            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-8">
                  <p className="text-xs uppercase tracking-widest text-[#B0977B] font-semibold mb-3">Popular Searches</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Bergamo Sofa', 'Imola Chair', 'Kingston Table', 'Bouclé Swatches', 'Morten Georgsen'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 bg-[#F4EFEA] text-xs font-medium hover:bg-[#171615] hover:text-[#FAF8F5] transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredSearchResults.length === 0 ? (
                <p className="text-center py-8 text-sm text-gray-500 font-serif italic">
                  No furniture found matching "{searchQuery}".
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredSearchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        onQuickViewProduct(prod);
                        setSearchOpen(false);
                      }}
                      className="flex items-center gap-4 p-3 hover:bg-[#F4EFEA] transition-colors cursor-pointer group"
                    >
                      <img src={prod.images[0]} alt={prod.name} className="w-16 h-16 object-cover bg-[#E6DDD4]" />
                      <div>
                        <p className="text-xs uppercase tracking-wider text-[#B0977B] font-semibold">{prod.category}</p>
                        <h4 className="font-serif font-bold text-base group-hover:text-[#B0977B] transition-colors">{prod.name}</h4>
                        <p className="text-xs font-semibold">${prod.basePrice.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
