import React, { useState } from 'react';
import { FurnitureModel, ProductCategory } from '../types';
import { PRODUCTS_CATALOG } from '../data/boconceptData';
import { Heart, Eye, SlidersHorizontal, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onQuickViewProduct: (product: FurnitureModel) => void;
  onScrollToConfigurator: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onSelectCategory,
  onQuickViewProduct,
  onScrollToConfigurator
}) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_CATALOG
    : PRODUCTS_CATALOG.filter(p => p.category === selectedCategory);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="catalog" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Categories Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-[#E6DDD4] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B0977B] block mb-2 font-semibold">
              Danish Furniture Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#171615]">
              Timeless Scandinavian Design
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Designs' },
              { id: 'sofas', label: 'Sofas' },
              { id: 'armchairs', label: 'Armchairs' },
              { id: 'tables', label: 'Tables' },
              { id: 'storage', label: 'Storage' },
              { id: 'lighting', label: 'Lighting' },
              { id: 'outdoor', label: 'Outdoor' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#171615] text-[#FAF8F5]'
                    : 'bg-[#F4EFEA] text-[#171615] hover:bg-[#E6DDD4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onQuickViewProduct(product)}
                className="group cursor-pointer bg-[#F4EFEA] border border-[#E6DDD4] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
              >
                {/* Image Container — Strictly 4:3 Aspect Ratio */}
                <div className="relative w-full aspect-[4/3] h-48 sm:h-56 overflow-hidden bg-[#E6DDD4]/40" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Secondary Image Hover Effect */}
                  {product.images[1] && (
                    <img
                      src={product.images[1]}
                      alt={`${product.name} detail`}
                      className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.bestseller && (
                      <span className="bg-[#171615] text-white text-[9px] uppercase font-bold tracking-widest px-2 py-1">
                        Bestseller
                      </span>
                    )}
                    {product.featured && (
                      <span className="bg-[#C5A059] text-white text-[9px] uppercase font-bold tracking-widest px-2 py-1">
                        Iconic
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-3 right-3 p-2 bg-[#FAF8F5]/80 backdrop-blur-md hover:bg-white transition-colors z-10 rounded-full"
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#B85B43] text-[#B85B43]' : 'text-[#171615]'}`} />
                  </button>

                  {/* Quick Customise Overlay Button */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickViewProduct(product);
                      }}
                      className="w-full py-2.5 bg-white text-[#171615] text-xs uppercase font-semibold tracking-wider hover:bg-[#C5A059] hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-3.5 h-3.5" /> Quick View & Customise
                    </button>
                  </div>
                </div>

                {/* Card Meta Body — Compact & Uniform */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#B0977B] font-semibold">
                      {product.designer}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#171615] group-hover:text-[#B0977B] transition-colors mt-0.5 leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#171615]/70 line-clamp-2 font-light mt-1.5 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E6DDD4] flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-mono block">From</span>
                      <span className="font-serif text-lg font-semibold text-[#171615]">
                        ${product.basePrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Swatch color dots preview */}
                    <div className="flex items-center -space-x-1">
                      {product.swatches.slice(0, 4).map((sw) => (
                        <span
                          key={sw.id}
                          className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: sw.texture }}
                          title={sw.name}
                        />
                      ))}
                      {product.swatches.length > 4 && (
                        <span className="text-[9px] font-mono text-gray-500 ml-2">
                          +{product.swatches.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
