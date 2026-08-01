import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
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
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);
    const [isSwatchesOpen, setIsSwatchesOpen] = useState(false);
    const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [selectedSwatches, setSelectedSwatches] = useState([
        SWATCH_LIBRARY[0],
        SWATCH_LIBRARY[2]
    ]);
    const [toastMessage, setToastMessage] = useState(null);
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };
    const handleAddToCart = (product, swatch, leg) => {
        let price = product.basePrice * swatch.priceMultiplier;
        if (leg)
            price += leg.price;
        price = Math.round(price);
        const cartId = `${product.id}-${swatch.id}-${leg?.id || 'standard'}`;
        setCartItems(prev => {
            const existing = prev.find(item => item.cartId === cartId);
            if (existing) {
                return prev.map(item => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item);
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
    const handleUpdateCartQuantity = (cartId, delta) => {
        setCartItems(prev => prev
            .map(item => {
            if (item.cartId === cartId) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        })
            .filter(Boolean));
    };
    const handleRemoveCartItem = (cartId) => {
        setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    };
    const handleToggleSwatch = (swatch) => {
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
        if (el)
            el.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToConfigurator = () => {
        const el = document.getElementById('3d-configurator');
        if (el)
            el.scrollIntoView({ behavior: 'smooth' });
    };
    const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
    return (_jsxs("div", { className: "min-h-screen bg-[#FAF8F5] text-[#171615] flex flex-col font-sans", children: [toastMessage && (_jsxs("div", { className: "fixed bottom-6 right-6 z-50 bg-[#171615] text-[#FAF8F5] px-5 py-3 shadow-2xl border border-[#C5A059] text-xs font-mono flex items-center gap-2 animate-in slide-in-from-bottom duration-300", children: [_jsx("span", { className: "w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" }), _jsx("span", { children: toastMessage })] })), _jsx(AnnouncementBar, { onOpenConsultation: () => setIsConsultationOpen(true) }), _jsx(Header, { cartCount: cartTotalCount, swatchCount: selectedSwatches.length, onOpenCart: () => setIsCartOpen(true), onOpenSwatches: () => setIsSwatchesOpen(true), onOpenStoreLocator: () => setIsStoreLocatorOpen(true), onOpenConsultation: () => setIsConsultationOpen(true), onOpenSideNav: () => setIsSideNavOpen(true), onSelectCategory: (cat) => {
                    setSelectedCategory(cat);
                    const catalogEl = document.getElementById('catalog');
                    if (catalogEl)
                        catalogEl.scrollIntoView({ behavior: 'smooth' });
                }, onQuickViewProduct: (prod) => setQuickViewProduct(prod) }), _jsxs("main", { className: "flex-1", children: [_jsx(Hero, { onOpenConsultation: () => setIsConsultationOpen(true), onScrollToConfigurator: scrollToBedroom3D }), _jsx(Scroll3DAnimation, { onScrollToCustomizer: scrollToConfigurator }), _jsx(FurnitureConfigurator, { onAddToCart: handleAddToCart, onOpenSwatches: () => setIsSwatchesOpen(true) }), _jsx(RoomHotspots, { onQuickViewProduct: (prod) => setQuickViewProduct(prod) }), _jsx(ProductCatalog, { selectedCategory: selectedCategory, onSelectCategory: (cat) => setSelectedCategory(cat), onQuickViewProduct: (prod) => setQuickViewProduct(prod), onScrollToConfigurator: scrollToConfigurator }), _jsx(FaqSection, { onOpenConsultation: () => setIsConsultationOpen(true), onOpenStoreLocator: () => setIsStoreLocatorOpen(true) })] }), _jsx(Footer, { onOpenStoreLocator: () => setIsStoreLocatorOpen(true), onOpenConsultation: () => setIsConsultationOpen(true), onOpenSwatches: () => setIsSwatchesOpen(true) }), _jsx(InteriorDesignService, { isOpen: isConsultationOpen, onClose: () => setIsConsultationOpen(false) }), _jsx(ProductQuickViewModal, { product: quickViewProduct, onClose: () => setQuickViewProduct(null), onAddToCart: handleAddToCart, onOpenSwatches: () => setIsSwatchesOpen(true) }), _jsx(FreeSwatchesDrawer, { isOpen: isSwatchesOpen, onClose: () => setIsSwatchesOpen(false), selectedSwatches: selectedSwatches, onToggleSwatch: handleToggleSwatch }), _jsx(StoreLocatorModal, { isOpen: isStoreLocatorOpen, onClose: () => setIsStoreLocatorOpen(false), onOpenConsultation: () => setIsConsultationOpen(true) }), _jsx(CartDrawer, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false), cartItems: cartItems, onUpdateQuantity: handleUpdateCartQuantity, onRemoveItem: handleRemoveCartItem }), _jsx(SideNavigationDrawer, { isOpen: isSideNavOpen, onClose: () => setIsSideNavOpen(false), onSelectCategory: (cat) => {
                    setSelectedCategory(cat);
                    const catalogEl = document.getElementById('catalog');
                    if (catalogEl)
                        catalogEl.scrollIntoView({ behavior: 'smooth' });
                }, onOpenConsultation: () => setIsConsultationOpen(true), onOpenSwatches: () => setIsSwatchesOpen(true), onOpenStoreLocator: () => setIsStoreLocatorOpen(true) })] }));
}
