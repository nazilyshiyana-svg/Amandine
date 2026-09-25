import React, { useState } from 'react';
import { X, Heart, ShoppingBag, MessageCircle, ShieldCheck, Ruler, Check, Sparkles } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatPrice, createWhatsAppInquiryLink } from '../utils/formatters';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  currency: CurrencyConfig;
  onAddToCart: (product: Product, metal?: string, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(product.metalOptions[0] || '18k Yellow Gold');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedMetal, selectedSize);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1A17]/60 backdrop-blur-xs transition-all">
      <div className="relative bg-[#FAF8F5] border border-[#DFD5C5] rounded-xs max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#594E44] hover:text-[#1E1A17] bg-[#FAF8F5]/90 rounded-full border border-[#DFD5C5] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Imagery */}
          <div className="p-6 bg-[#F4EFE6] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#DFD5C5]">
            <div className="relative aspect-square rounded-xs overflow-hidden border border-[#DFD5C5] bg-[#ECE4D8] mb-4">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.hallmark && (
                <div className="absolute top-3 left-3 bg-[#1E1A17]/90 text-[#E7D7C1] font-serif text-[10px] px-2.5 py-0.5 rounded-2xs border border-[#C8A97E]/30">
                  {product.hallmark}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-2xs overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#9D7E51] scale-105'
                        : 'border-[#DFD5C5] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Customization */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#9D7E51] font-medium mb-1">
                <span>{product.collection}</span>
                <span className="text-[#A89C91]">{product.aestheticTag}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1A17] font-normal mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif text-2xl text-[#1E1A17] font-medium">
                  {formatPrice(product.price, currency)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A89C91] line-through font-light">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                )}
                <span className="text-xs text-[#7C7066] ml-auto">
                  ★ {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-xs text-[#594E44] leading-relaxed mb-5 font-light">
                {product.description}
              </p>

              {/* Metal Selection with Color Indicator */}
              <div className="mb-4">
                <label className="block text-[11px] uppercase tracking-wider text-[#594E44] font-medium mb-2">
                  Precious Metal: <span className="text-[#1E1A17]">{selectedMetal}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.metalOptions.map((metal) => {
                    const swatchBg = metal.includes('Rose')
                      ? 'bg-[#E8A598]'
                      : metal.includes('White') || metal.includes('Rhodium') || metal.includes('Platinum')
                      ? 'bg-[#DCDFE3]'
                      : 'bg-[#E5C158]';

                    return (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3 py-1.5 text-xs rounded-2xs border transition-all flex items-center gap-1.5 ${
                          selectedMetal === metal
                            ? 'border-[#1E1A17] bg-[#F4EFE6] text-[#1E1A17] font-medium'
                            : 'border-[#DFD5C5] text-[#7C7066] hover:bg-[#F4EFE6]'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${swatchBg} border border-black/10`} />
                        <span>{metal}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#594E44] font-medium">
                    Sizing / Length: <span className="text-[#1E1A17]">{selectedSize}</span>
                  </label>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[11px] text-[#9D7E51] hover:text-[#1E1A17] flex items-center gap-1 underline underline-offset-2"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs rounded-2xs border transition-all ${
                        selectedSize === sz
                          ? 'border-[#1E1A17] bg-[#1E1A17] text-[#FAF8F5]'
                          : 'border-[#DFD5C5] text-[#594E44] hover:border-[#9D7E51]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications Details */}
            <div className="pt-4 border-t border-[#EAE2D5] space-y-1.5 text-xs text-[#7C7066] mb-6">
              <p>
                <strong className="text-[#1E1A17] font-medium">Materials:</strong> {product.materials}
              </p>
              <p>
                <strong className="text-[#1E1A17] font-medium">Specifications:</strong> {product.dimensions}
              </p>
              <p className="flex items-center gap-1.5 text-[#355E3B]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Complimentary insured shipping & signature velvet presentation box</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-4 rounded-xs text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-[#355E3B] text-white'
                      : 'bg-[#1E1A17] hover:bg-[#332C27] text-[#FAF8F5]'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C8A97E]" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 border rounded-xs transition-colors ${
                    isWishlisted
                      ? 'border-[#9D7E51] bg-[#F4EFE6] text-[#9D7E51]'
                      : 'border-[#DFD5C5] text-[#594E44] hover:text-[#1E1A17] hover:bg-[#F4EFE6]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* WhatsApp direct inquiry button */}
              <a
                href={createWhatsAppInquiryLink('product', {
                  product,
                  metal: selectedMetal,
                  size: selectedSize,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 border border-[#DFD5C5] rounded-xs text-xs tracking-wider uppercase font-medium text-[#1E1A17] hover:bg-[#F4EFE6] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Inquire with Paris Stylist on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
