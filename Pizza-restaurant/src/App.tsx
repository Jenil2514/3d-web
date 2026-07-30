import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedPizzas } from './components/FeaturedPizzas';
import { PizzaModal } from './components/PizzaModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SpecialOffer } from './components/SpecialOffer';
import { CustomerReviews } from './components/CustomerReviews';
import { FoodGallery } from './components/FoodGallery';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';
import { Pizza, CartItem } from './types';
import { PIZZAS } from './data/pizzas';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isReservationOpen, setIsReservationOpen] = useState<boolean>(false);
  const [quickViewPizza, setQuickViewPizza] = useState<Pizza | null>(null);

  // Total item count badge
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add pizza from cards or quick view modal
  const handleSimpleAddToCart = (pizza: Pizza) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.pizza.id === pizza.id &&
          item.size === 'Large (14")' &&
          item.crust === 'Classic Neapolitan Leopard-Char'
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        updated[existingIdx].totalPrice += pizza.price;
        return updated;
      } else {
        return [
          ...prev,
          {
            pizza,
            quantity: 1,
            size: 'Large (14")',
            crust: 'Classic Neapolitan Leopard-Char',
            extraToppings: [],
            totalPrice: pizza.price
          }
        ];
      }
    });
  };

  const handleCustomAddToCart = (customized: {
    pizza: Pizza;
    size: 'Medium (11")' | 'Large (14")' | 'Family (18")';
    crust: string;
    extraToppings: string[];
    quantity: number;
    totalPrice: number;
  }) => {
    setCartItems((prev) => [
      ...prev,
      {
        pizza: customized.pizza,
        quantity: customized.quantity,
        size: customized.size,
        crust: customized.crust,
        extraToppings: customized.extraToppings,
        totalPrice: customized.totalPrice
      }
    ]);
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const item = updated[index];
      if (!item) return prev;

      const singleUnitPrice = item.totalPrice / item.quantity;
      const newQty = item.quantity + delta;

      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      } else {
        updated[index] = {
          ...item,
          quantity: newQty,
          totalPrice: singleUnitPrice * newQty
        };
        return updated;
      }
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleClaimOffer = () => {
    // Add Margherita DOC to cart as part of special offer
    const margherita = PIZZAS.find((p) => p.id === 'classic-margherita') || PIZZAS[0];
    handleSimpleAddToCart(margherita);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] text-[#222222] font-sans antialiased overflow-x-hidden selection:bg-[#E63946] selection:text-white">
      {/* Floating Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 2: Hero */}
        <Hero onQuickOrder={() => setIsCartOpen(true)} />

        {/* Section 3: Featured Pizzas */}
        <FeaturedPizzas
          onAddToCart={handleSimpleAddToCart}
          onOpenQuickView={(pizza) => setQuickViewPizza(pizza)}
        />

        {/* Section 4: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 5: Special Offer */}
        <SpecialOffer onClaimOffer={handleClaimOffer} />

        {/* Section 6: Customer Reviews */}
        <CustomerReviews />

        {/* Section 7: Food Gallery */}
        <FoodGallery />
      </main>

      {/* Section 8: Footer */}
      <Footer />

      {/* Interactive Modals & Slide-Over Drawers */}
      <PizzaModal
        pizza={quickViewPizza}
        onClose={() => setQuickViewPizza(null)}
        onAddToCart={handleCustomAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
