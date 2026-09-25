import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatPrice } from '../utils/formatters';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: CurrencyConfig;
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onRemoveFromWishlist,
  onMoveToCart,
  onExploreProducts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#24201D]/60 backdrop-blur-xs transition-all">
      <div className="relative bg-[#FAF7F2] w-full max-w-md h-full flex flex-col justify-between shadow-2xl border-l border-[#DFD3C3] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE1D5] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#8B7049] fill-current" />
            <h3 className="font-serif text-xl text-[#24201D] font-normal">
              Saved Favorites ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5D5249] hover:text-[#24201D] rounded-full hover:bg-[#EFE7DC] transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center">
              <Heart className="w-12 h-12 text-[#DFD3C3] mx-auto mb-4" />
              <p className="font-serif text-xl text-[#24201D] mb-2">No Saved Pieces Yet</p>
              <p className="text-xs text-[#7A6E64] max-w-xs mx-auto mb-6">
                Tap the heart icon on any jewelry piece to curate your personal wish list.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="px-6 py-3 bg-[#24201D] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-[#3D3631] transition-colors"
              >
                Browse Creations
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 p-3 bg-[#FDFCFA] border border-[#DFD3C3] rounded-xs"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-24 object-cover object-center rounded-2xs bg-[#EFE7DC] shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-sm text-[#24201D] font-normal leading-snug">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-[#9B8C7E] hover:text-[#24201D] p-1 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-[#7A6E64] block mt-0.5">
                      {product.karat}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#EAE1D5]">
                    <span className="font-serif text-sm text-[#24201D] font-medium">
                      {formatPrice(product.price, currency)}
                    </span>
                    <button
                      onClick={() => {
                        onMoveToCart(product);
                        onRemoveFromWishlist(product);
                      }}
                      className="py-1.5 px-3 bg-[#24201D] text-[#FAF7F2] text-[10px] uppercase tracking-wider font-medium rounded-xs hover:bg-[#3D3631] transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#DFCAAB]" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 bg-[#F5EFE6] border-t border-[#DFD3C3] text-center text-[11px] text-[#7A6E64]">
            Pieces remain saved in your browser session for your convenience.
          </div>
        )}

      </div>
    </div>
  );
};
