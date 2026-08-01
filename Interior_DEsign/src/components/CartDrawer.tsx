import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Trash2, ArrowRight, Check, Sparkles, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice * item.quantity, 0);
  const freeDeliveryThreshold = 2500;
  const progressToFreeDelivery = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleCheckout = () => {
    setCheckoutComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="bg-[#FAF8F5] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#E6DDD4] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E6DDD4] flex items-center justify-between bg-[#F4EFEA]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B0977B]" />
            <h3 className="font-serif text-xl font-light text-[#171615]">
              Your Shopping Bag ({cartItems.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full">
            <X className="w-5 h-5 text-[#171615]" />
          </button>
        </div>

        {checkoutComplete ? (
          <div className="p-8 text-center space-y-6 my-auto">
            <div className="w-16 h-16 bg-[#2D3E35] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-serif text-3xl font-light text-[#171615]">
                Order Confirmed!
              </h4>
              <p className="text-xs text-gray-600 mt-2 font-light leading-relaxed">
                Thank you for choosing BoConcept Danish Design. Your bespoke piece is being prepared by our craftsmen in Denmark. A confirmation email has been sent.
              </p>
            </div>
            <button
              onClick={() => { setCheckoutComplete(false); onClose(); }}
              className="bg-[#171615] text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B]"
            >
              Continue Browsing
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <ShoppingBag className="w-12 h-12 text-[#B0977B]/40 mx-auto" />
            <h4 className="font-serif text-2xl font-light text-[#171615]">
              Your Bag is Empty
            </h4>
            <p className="text-xs text-gray-500 font-light">
              Explore our Danish living, dining, and armchair collections to customize your piece.
            </p>
            <button
              onClick={onClose}
              className="bg-[#171615] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B]"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <>
            {/* Free Delivery Bar */}
            <div className="bg-[#F4EFEA] px-6 py-3 border-b border-[#E6DDD4] space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-gray-600 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#B0977B]" />
                  {subtotal >= freeDeliveryThreshold ? 'Free White-Glove Delivery Unlocked!' : `$${(freeDeliveryThreshold - subtotal).toLocaleString()} away from Free White-Glove Delivery`}
                </span>
                <span className="font-bold text-[#171615]">{Math.round(progressToFreeDelivery)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E6DDD4] rounded-full overflow-hidden">
                <div className="h-full bg-[#B0977B] transition-all duration-500" style={{ width: `${progressToFreeDelivery}%` }} />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.cartId} className="flex gap-4 p-4 bg-[#F4EFEA] border border-[#E6DDD4] relative group">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-black/10 flex-shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-base text-[#171615]">{item.product.name}</h4>
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        className="text-gray-400 hover:text-[#B85B43] p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-gray-600 space-y-0.5">
                      <div>Fabric: <strong className="text-[#171615]">{item.selectedSwatch.name}</strong></div>
                      {item.selectedLeg && (
                        <div>Legs: <strong className="text-[#171615]">{item.selectedLeg.name}</strong></div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#E6DDD4] bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="px-2.5 py-0.5 text-xs hover:bg-[#E6DDD4]"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="px-2.5 py-0.5 text-xs hover:bg-[#E6DDD4]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-bold text-base text-[#171615]">
                        ${(item.totalPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Summary & Checkout */}
            <div className="p-6 border-t border-[#171615] bg-[#FAF8F5] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#171615]">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Danish White-Glove Delivery & Assembly</span>
                  <span className="font-mono text-[#171615]">
                    {subtotal >= freeDeliveryThreshold ? 'FREE' : '$299'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-[#E6DDD4]">
                  <span>Total (VAT Included)</span>
                  <span className="font-serif text-2xl text-[#171615]">
                    ${(subtotal + (subtotal >= freeDeliveryThreshold ? 0 : 299)).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[#171615] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold hover:bg-[#B0977B] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Proceed to Danish Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 font-mono pt-1">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#B0977B]" /> 10-Year Warranty</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#B0977B]" /> Danish Craftsmanship</span>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
