import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, Gift, ArrowRight, Check } from 'lucide-react';
import { CartItem, CurrencyConfig } from '../types';
import { formatPrice, createWhatsAppInquiryLink } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyConfig;
  onUpdateQuantity: (productId: string, metal: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, metal: string, size: string) => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onExploreProducts,
}) => {
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  // Subtotal calculation in USD
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalUSD);
  const shippingProgress = Math.min(100, (subtotalUSD / freeShippingThreshold) * 100);

  const handleStandardCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#24201D]/60 backdrop-blur-xs transition-all">
      <div className="relative bg-[#FAF7F2] w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#DFD3C3] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE1D5] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#8B7049]" />
            <h3 className="font-serif text-xl text-[#24201D] font-normal">
              Your Shopping Bag ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5D5249] hover:text-[#24201D] rounded-full hover:bg-[#EFE7DC] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF7F2] px-6 py-3 border-b border-[#EAE1D5]">
          <div className="text-[11px] text-[#5D5249] mb-1.5 flex justify-between">
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong>{formatPrice(remainingForFreeShipping, currency)}</strong> more for complimentary courier
              </span>
            ) : (
              <span className="text-[#355E3B] font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Complimentary Worldwide Courier Unlocked!
              </span>
            )}
            <span className="font-medium text-[#8B7049]">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full bg-[#EAE1D5] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#8B7049] h-full transition-all duration-500 rounded-full"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {checkoutComplete ? (
            <div className="py-12 px-4 text-center bg-[#F5EFE6] rounded-sm border border-[#DFD3C3]">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#8B7049] flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-[#8B7049]" />
              </div>
              <h4 className="font-serif text-2xl text-[#24201D] font-normal mb-2">
                Order Received With Gratitude
              </h4>
              <p className="text-xs text-[#6E6359] leading-relaxed mb-6">
                Your order is registered with our Parisian atelier. For custom engraving or instant shipment confirmation, feel free to touch base with our WhatsApp stylist!
              </p>
              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#24201D] text-[#FAF7F2] text-xs uppercase tracking-widest rounded-xs"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingBag className="w-12 h-12 text-[#DFD3C3] mx-auto mb-4" />
              <p className="font-serif text-xl text-[#24201D] mb-2">Your Bag is Empty</p>
              <p className="text-xs text-[#7A6E64] max-w-xs mx-auto mb-6">
                Explore our fine jewellery creations and discover pieces crafted for a lifetime.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="px-6 py-3 bg-[#24201D] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-[#3D3631] transition-colors"
              >
                Explore Creations
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedMetal}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-[#FDFCFA] border border-[#DFD3C3] rounded-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-center rounded-2xs bg-[#EFE7DC] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm text-[#24201D] font-normal leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            onRemoveItem(item.product.id, item.selectedMetal, item.selectedSize)
                          }
                          className="text-[#9B8C7E] hover:text-[#24201D] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#7C7066] block mt-0.5 font-light">
                        {item.selectedMetal} · {item.selectedSize}
                      </span>
                      {item.product.hallmark && (
                        <span className="text-[10px] text-[#9D7E51] font-serif italic block mt-0.5">
                          {item.product.hallmark}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EAE1D5]">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#DFD3C3] rounded-2xs bg-[#FAF7F2]">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.selectedMetal, item.selectedSize, -1)
                          }
                          className="p-1 hover:bg-[#EFE7DC] text-[#4A4039]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs text-[#24201D] font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.selectedMetal, item.selectedSize, 1)
                          }
                          className="p-1 hover:bg-[#EFE7DC] text-[#4A4039]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <span className="font-serif text-sm text-[#24201D] font-medium">
                        {formatPrice(item.product.price * item.quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Bespoke Gift Wrap Toggle */}
              <div className="p-3.5 bg-[#F5EFE6] border border-[#DFD3C3] rounded-xs">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#24201D] font-medium">
                  <input
                    type="checkbox"
                    checked={includeGiftWrap}
                    onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                    className="accent-[#8B7049]"
                  />
                  <Gift className="w-4 h-4 text-[#8B7049]" />
                  <span>Complimentary Gift Box & Sealed Card</span>
                </label>

                {includeGiftWrap && (
                  <textarea
                    rows={2}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your handwritten gift message..."
                    className="w-full mt-2 p-2 bg-[#FAF7F2] border border-[#DFD3C3] rounded-2xs text-xs text-[#24201D] placeholder-[#9B8C7E] focus:outline-none focus:border-[#8B7049]"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout Actions */}
        {items.length > 0 && !checkoutComplete && (
          <div className="p-6 bg-[#F5EFE6] border-t border-[#DFD3C3] space-y-3">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-xs uppercase tracking-wider text-[#5D5249]">Estimated Subtotal</span>
              <span className="font-serif text-xl font-medium text-[#24201D]">
                {formatPrice(subtotalUSD, currency)}
              </span>
            </div>
            <p className="text-[10px] text-[#7A6E64]">
              Taxes and duties calculated at final dispatch. Insured courier included.
            </p>

            <div className="space-y-2 pt-2">
              {/* Direct WhatsApp Checkout Button */}
              <a
                id="cart-whatsapp-checkout-btn"
                href={createWhatsAppInquiryLink('cart', {
                  cartItems: items,
                  currency,
                  subtotal: subtotalUSD * currency.rate,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#24201D] hover:bg-[#3D3631] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium rounded-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Order via WhatsApp Concierge</span>
              </a>

              {/* Standard Checkout */}
              <button
                id="cart-standard-checkout-btn"
                onClick={handleStandardCheckout}
                className="w-full py-3 px-4 bg-[#FAF7F2] border border-[#DFD3C3] hover:bg-[#EFE7DC] text-[#24201D] text-xs uppercase tracking-widest font-medium rounded-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Express Web Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8B7049]" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
