import React, { useState } from 'react';
import { Sparkles, Layers, ShoppingBag, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { STACKING_LOOKS, PRODUCTS, StackingLook, BRAND_WHATSAPP_URL } from '../data/jewelryData';
import { formatPrice } from '../utils/formatters';
import modernOrbitalRingImg from '../assets/images/modern_orbital_ring_1790242934161.jpg';
import modernFluidTorcImg from '../assets/images/modern_fluid_torc_1790242950576.jpg';

interface StackingStudioProps {
  currency: CurrencyConfig;
  onAddToCart: (product: Product, metal?: string, size?: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const StackingStudio: React.FC<StackingStudioProps> = ({
  currency,
  onAddToCart,
  onOpenQuickView,
}) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState('18k Yellow Gold');
  const [addedAll, setAddedAll] = useState(false);

  const currentLook: StackingLook = STACKING_LOOKS[activeLookIndex];
  const lookProducts = currentLook.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const rawTotal = lookProducts.reduce((acc, p) => acc + p.price, 0);
  const discountedTotal = Math.round(rawTotal * (1 - currentLook.discountPct / 100));

  const handleAddAllToCart = () => {
    lookProducts.forEach((prod) => {
      onAddToCart(prod, selectedMetal);
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2400);
  };

  return (
    <section id="stacking-studio-section" className="py-20 lg:py-28 bg-[#F3EFE6] border-b border-[#E5E0D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#D8D2C6]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <Layers className="w-3.5 h-3.5 text-[#9D7E51]" />
              <span>L’ART DE L’ACCUMULATION · MODERN SUITES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              Architectural Stacking Studio
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Wearable sculptures engineered to interlock. Pair tension-suspended diamonds 
            with brutalist chamfers and asymmetric fluid collars with tiered savings.
          </p>
        </div>

        {/* Look Toggles */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {STACKING_LOOKS.map((look, idx) => (
            <button
              key={look.id}
              onClick={() => {
                setActiveLookIndex(idx);
                setAddedAll(false);
              }}
              className={`px-5 py-2.5 text-xs font-mono tracking-[0.18em] uppercase rounded-[1px] transition-all ${
                activeLookIndex === idx
                  ? 'bg-[#121110] text-[#FAFAF8] shadow-xs font-medium'
                  : 'bg-[#FAFAF8] text-[#59534E] border border-[#D8D2C6] hover:text-[#121110]'
              }`}
            >
              {look.name}
            </button>
          ))}
        </div>

        {/* Main Interactive Studio Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#FAFAF8] border border-[#D8D2C6] rounded-[2px] p-6 sm:p-10 shadow-sm">
          
          {/* Left: Atmospheric Look Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-[1px] overflow-hidden border border-[#D8D2C6] shadow-md bg-[#E8E2D7]">
              <img
                src={currentLook.type === 'necklaces' ? modernFluidTorcImg : modernOrbitalRingImg}
                alt={currentLook.name}
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/60 via-transparent to-transparent" />

              {/* Floating Layer Markers on the Image */}
              <div className="absolute top-4 left-4 bg-[#121110]/85 text-[#FAFAF8] px-3 py-1.5 rounded-[1px] font-mono text-[10px] tracking-[0.25em] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                <span>Curated Modern Suite</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E8E2D7] block mb-1">
                  {currentLook.frenchTitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light">
                  {currentLook.name}
                </h3>
                <p className="text-xs text-[#FAFAF8]/90 font-light mt-1 max-w-md">
                  {currentLook.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Deconstructed Suite Pieces & Suite Pricing */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#8C8278]">
                  COMPOSED OF {lookProducts.length} ARCHITECTURAL CREATIONS
                </span>
                <span className="font-mono text-xs text-[#2E7D32] font-medium bg-[#E8F5E9] px-2 py-0.5 rounded-[1px]">
                  SAVE {currentLook.discountPct}% AS A SUITE
                </span>
              </div>

              {/* Piece List */}
              <div className="space-y-3">
                {lookProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    onClick={() => onOpenQuickView(product)}
                    className="group/item flex items-center justify-between p-3.5 bg-[#F3EFE6] border border-[#D8D2C6] rounded-[1px] hover:border-[#121110] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#9D7E51] font-semibold w-5">
                        0{idx + 1}
                      </span>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-[1px] object-cover bg-[#E8E2D7] border border-[#D8D2C6]"
                      />
                      <div>
                        <h4 className="font-serif text-sm text-[#121110] group-hover/item:text-[#9D7E51] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="font-mono text-[10px] text-[#7A746E]">
                          {product.collection} · {product.hallmark || product.karat}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-xs text-[#121110] font-medium block">
                        {formatPrice(product.price, currency)}
                      </span>
                      <span className="text-[10px] text-[#9D7E51] group-hover/item:underline font-mono">
                        Inspect →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metal Selector for Suite */}
              <div className="mt-5 p-3.5 bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px] flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#59534E]">
                  SUITE ALLOY:
                </span>
                <div className="flex items-center gap-2">
                  {['18k Yellow Gold', '950 Solid Platinum', '18k Rose Gold'].map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-[1px] transition-colors ${
                        selectedMetal === metal
                          ? 'bg-[#121110] text-[#FAFAF8]'
                          : 'bg-[#F3EFE6] text-[#59534E] hover:text-[#121110]'
                      }`}
                    >
                      {metal.split(' ')[1] || metal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Total Pricing & Action Bar */}
            <div className="pt-6 border-t border-[#E5E0D8]">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C8278] block">
                    COMPLETE MODERN SUITE
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl text-[#121110] font-normal">
                      {formatPrice(discountedTotal, currency)}
                    </span>
                    <span className="font-mono text-sm text-[#8C8278] line-through font-light">
                      {formatPrice(rawTotal, currency)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[#2E7D32] block">
                    You save {formatPrice(rawTotal - discountedTotal, currency)}
                  </span>
                  <span className="font-mono text-[10px] text-[#8C8278]">
                    Includes bespoke Amandine coffret
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="add-stacking-suite-to-cart-button"
                  onClick={handleAddAllToCart}
                  className={`w-full py-4 text-xs font-mono font-medium uppercase tracking-[0.2em] rounded-[1px] transition-all flex items-center justify-center gap-2 ${
                    addedAll
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#121110] text-[#FAFAF8] hover:bg-[#2B2724]'
                  }`}
                >
                  {addedAll ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Complete Suite Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                      <span>Add Suite to Bag</span>
                    </>
                  )}
                </button>

                <a
                  href={`${BRAND_WHATSAPP_URL}?text=${encodeURIComponent(
                    `Bonjour Amandine Atelier! I am interested in acquiring ${currentLook.name} ($${discountedTotal} USD) in ${selectedMetal}. Could you provide styling advice?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#F3EFE6] border border-[#D8D2C6] text-[#121110] text-xs font-mono font-medium uppercase tracking-[0.18em] rounded-[1px] hover:bg-[#EAE4D7] transition-all flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Stylist Consultation</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
