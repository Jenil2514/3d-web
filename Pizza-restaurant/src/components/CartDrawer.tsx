import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Truck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = subtotal > 35 ? 0 : subtotal > 0 ? 3.99 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (promoCode.trim().toUpperCase() === 'FORGIO3FOR2') {
      const cheapestPrice = cartItems.length > 0 ? Math.min(...cartItems.map((i) => i.pizza.price)) : 15.99;
      setDiscount(cheapestPrice);
      setPromoSuccess(`Promo Code FORGIO3FOR2 Applied! -$${cheapestPrice.toFixed(2)} off.`);
    } else if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      const tenPercent = subtotal * 0.1;
      setDiscount(tenPercent);
      setPromoSuccess(`10% Welcome Discount Applied! -$${tenPercent.toFixed(2)} off.`);
    } else if (promoCode.trim().length > 0) {
      setPromoError('Invalid promo code. Try "FORGIO3FOR2"');
    }
  };

  const handleCheckout = () => {
    setIsCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setIsCheckoutSuccess(false);
      onClose();
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#FFF8F3] shadow-2xl flex flex-col border-l border-black/5"
          >
            {/* Header */}
            <div className="p-6 bg-white border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E63946]/10 flex items-center justify-center text-[#E63946]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#222222]">Your Order</h3>
                  <p className="text-xs text-[#222222]/60 font-medium">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close cart drawer"
                className="p-2 rounded-full hover:bg-black/5 text-[#222222] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List or Checkout Success Overlay */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isCheckoutSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h3 className="font-display font-extrabold text-2xl text-[#222222]">
                    Order Confirmed!
                  </h3>
                  <p className="text-sm text-[#222222]/70 max-w-xs">
                    Your pizza is being hand-stretched and fired in our 800° Vesuvian stone oven. Estimated delivery in 25 mins!
                  </p>
                  <div className="p-4 rounded-2xl bg-white border border-black/5 text-xs text-[#222222] font-semibold">
                    🔥 Order #FG-84920 • Tracking Live
                  </div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-20 h-20 rounded-full bg-[#E63946]/10 text-[#E63946] flex items-center justify-center text-3xl">
                    🍕
                  </div>
                  <h4 className="font-display font-bold text-xl text-[#222222]">Your Cart is Empty</h4>
                  <p className="text-xs text-[#222222]/60 max-w-xs">
                    Explore our wood-fired pizza menu and add your favorite handcrafted pies!
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-[#E63946] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl p-4 border border-black/5 shadow-sm space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-display font-bold text-sm text-[#222222]">
                            {item.pizza.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            aria-label={`Remove ${item.pizza.name} from cart`}
                            className="text-[#222222]/40 hover:text-[#E63946] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#F4A261] font-medium">
                          {item.size || 'Large (14")'}
                        </p>
                        {item.crust && (
                          <p className="text-[10px] text-[#222222]/60 truncate">
                            {item.crust}
                          </p>
                        )}
                        {item.extraToppings && item.extraToppings.length > 0 && (
                          <p className="text-[10px] text-emerald-600 font-medium truncate">
                            +{item.extraToppings.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/5">
                      <div className="flex items-center gap-2 bg-[#FFF8F3] px-2 py-1 rounded-lg border border-black/5">
                        <button
                          onClick={() => onUpdateQuantity(idx, -1)}
                          className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs hover:bg-black/5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(idx, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs hover:bg-black/5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-display font-bold text-sm text-[#222222]">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {!isCheckoutSuccess && cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-black/5 space-y-4">
                {/* Promo Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#222222]/40" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. FORGIO3FOR2)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#FFF8F3] rounded-xl border border-black/10 text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-[#E63946]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#222222] text-white text-xs font-bold rounded-xl hover:bg-[#E63946] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {promoError && <p className="text-[11px] text-[#E63946] font-bold">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-emerald-600 font-bold">{promoSuccess}</p>}

                {/* Pricing Table */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#222222]/70 font-medium">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-[#222222]/70 font-medium">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#E63946]" /> Delivery Fee
                    </span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-display font-extrabold text-base text-[#222222] pt-2 border-t border-black/10">
                    <span>Grand Total</span>
                    <span className="text-[#E63946]">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-2xl bg-[#E63946] text-white font-display font-bold text-sm shadow-xl shadow-[#E63946]/30 hover:bg-[#d62839] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Proceed to Express Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
