import React, { useState } from 'react';
import { FurnitureModel, SwatchOption, LegOption, CartItem, ProductCategory } from './types';
import { SWATCH_LIBRARY } from './data/boconceptData';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Scroll3DAnimation } from './components/Scroll3DAnimation';
import { FurnitureConfigurator } from './components/FurnitureConfigurator';
import { RoomHotspots } from './components/RoomHotspots';
import { ProductCatalog } from './components/ProductCatalog';
import { FaqSection } from './components/FaqSection';
import { InteriorDesignService } from './components/InteriorDesignService';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { FreeSwatchesDrawer } from './components/FreeSwatchesDrawer';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { CartDrawer } from './components/CartDrawer';
import { SideNavigationDrawer } from './components/SideNavigationDrawer';
import { Footer } from './components/Footer';

export function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<FurnitureModel | null>(null);
  
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSwatchesOpen, setIsSwatchesOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedSwatches, setSelectedSwatches] = useState<SwatchOption[]>([
    SWATCH_LIBRARY[0],
    SWATCH_LIBRARY[2]
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: FurnitureModel, swatch: SwatchOption, leg?: LegOption) => {
    let price = product.basePrice * swatch.priceMultiplier;
    if (leg) price += leg.price;
    price = Math.round(price);

    const cartId = `${product.id}-${swatch.id}-${leg?.id || 'standard'}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartId === cartId);
      if (existing) {
        return prev.map(item =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          selectedSwatch: swatch,
          selectedLeg: leg,
          quantity: 1,
          totalPrice: price
        }
      ];
    });

    showToast(`Added ${product.name} (${swatch.name}) to shopping bag`);
  };

  const handleUpdateCartQuantity = (cartId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleToggleSwatch = (swatch: SwatchOption) => {
    setSelectedSwatches(prev => {
      const exists = prev.some(s => s.id === swatch.id);
      if (exists) {
        return prev.filter(s => s.id !== swatch.id);
      }
      if (prev.length >= 5) {
        showToast('Maximum 5 free swatches per order');
        return prev;
      }
      return [...prev, swatch];
    });
  };

  const scrollToBedroom3D = () => {
    const el = document.getElementById('3d-bedroom');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToConfigurator = () => {
    const el = document.getElementById('3d-configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#171615] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#171615] text-[#FAF8F5] px-5 py-3 shadow-2xl border border-[#C5A059] text-xs font-mono flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <AnnouncementBar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Header */}
      <Header
        cartCount={cartTotalCount}
        swatchCount={selectedSwatches.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSwatches={() => setIsSwatchesOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenSideNav={() => setIsSideNavOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onQuickViewProduct={(prod) => setQuickViewProduct(prod)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onScrollToConfigurator={scrollToBedroom3D}
        />

        {/* Interactive 3D Scroll Architecture Section */}
        <Scroll3DAnimation
          onScrollToCustomizer={scrollToConfigurator}
        />

        {/* 3. INTERACTIVE CUSTOMISER SECTION */}
        <FurnitureConfigurator
          onAddToCart={handleAddToCart}
          onOpenSwatches={() => setIsSwatchesOpen(true)}
        />

        {/* Shop The Look / Room Hotspots Section */}
        <RoomHotspots
          onQuickViewProduct={(prod) => setQuickViewProduct(prod)}
        />

        {/* Product Catalog */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onQuickViewProduct={(prod) => setQuickViewProduct(prod)}
          onScrollToConfigurator={scrollToConfigurator}
        />

        {/* Danish Design & FAQ Accordion Section */}
        <FaqSection
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenSwatches={() => setIsSwatchesOpen(true)}
      />

      {/* Modals & Drawers */}
      <InteriorDesignService
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenSwatches={() => setIsSwatchesOpen(true)}
      />

      <FreeSwatchesDrawer
        isOpen={isSwatchesOpen}
        onClose={() => setIsSwatchesOpen(false)}
        selectedSwatches={selectedSwatches}
        onToggleSwatch={handleToggleSwatch}
      />

      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
      />

      <SideNavigationDrawer
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const catalogEl = document.getElementById('catalog');
          if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenSwatches={() => setIsSwatchesOpen(true)}
        onOpenStoreLocator={() => setIsStoreLocatorOpen(true)}
      />

    </div>
  );
}
