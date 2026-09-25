import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check, MessageCircle, ArrowUpRight, ShieldCheck, Gem, Layers } from 'lucide-react';
import { Product, CurrencyConfig, JewellerySet } from '../types';
import { COMPLETE_JEWELLERY_SET, BRAND_WHATSAPP_URL, BRAND_WHATSAPP_NUMBER } from '../data/jewelryData';
import { formatPrice } from '../utils/formatters';

interface CompleteJewellerySetSectionProps {
  currency: CurrencyConfig;
  onAddToCart: (product: Product, metal?: string, size?: string) => void;
  onOpenQuickView: (product: Product) => void;
}

type SelectedPieceKey = 'all' | 'necklace' | 'bracelet' | 'ring' | 'earrings';

export const CompleteJewellerySetSection: React.FC<CompleteJewellerySetSectionProps> = ({
  currency,
  onAddToCart,
  onOpenQuickView,
}) => {
  const set: JewellerySet = COMPLETE_JEWELLERY_SET;
  const [selectedPieceKey, setSelectedPieceKey] = useState<SelectedPieceKey>('all');
  const [selectedMetal, setSelectedMetal] = useState<string>('18k Yellow Gold');
  const [selectedRingSize, setSelectedRingSize] = useState<string>('US 7');
  const [addedSuite, setAddedSuite] = useState<boolean>(false);
  const [addedPieceId, setAddedPieceId] = useState<string | null>(null);

  const pieceList = [
    { key: 'necklace', label: '01 / Necklace', product: set.pieces.necklace },
    { key: 'bracelet', label: '02 / Bracelet', product: set.pieces.bracelet },
    { key: 'ring', label: '03 / Ring', product: set.pieces.ring },
    { key: 'earrings', label: '04 / Earrings', product: set.pieces.earrings },
  ] as const;

  const currentProduct = selectedPieceKey === 'all' ? null : set.pieces[selectedPieceKey];

  // Add the entire 4-piece set to the bag
  const handleAddSuiteToBag = () => {
    // Add all 4 pieces with suite discount
    Object.values(set.pieces).forEach((product) => {
      const size = product.category === 'rings' ? selectedRingSize : product.sizes[0];
      onAddToCart(product, selectedMetal, size);
    });
    setAddedSuite(true);
    setTimeout(() => setAddedSuite(false), 2600);
  };

  // Add single piece
  const handleAddSinglePiece = (product: Product) => {
    const size = product.category === 'rings' ? selectedRingSize : product.sizes[0];
    onAddToCart(product, selectedMetal, size);
    setAddedPieceId(product.id);
    setTimeout(() => setAddedPieceId(null), 1800);
  };

  const handleWhatsAppConsultSuite = () => {
    const text = `Bonjour Amandine Atelier! 📐✨\n\nI am captivated by the complete 4-piece "L'Orbite Architectural Parure Suite" ($${set.setPrice} USD) including:\n• 01 / Necklace: ${set.pieces.necklace.name}\n• 02 / Bracelet: ${set.pieces.bracelet.name}\n• 03 / Ring: ${set.pieces.ring.name} (Size: ${selectedRingSize})\n• 04 / Earrings: ${set.pieces.earrings.name}\nAlloy: ${selectedMetal}\n\nCould you confirm lead time and coffret personalization? Merci!`;
    const url = `https://wa.me/${BRAND_WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="parure-complete-section" className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E0D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header: Modern Architectural Masterpiece */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E5E0D8]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9D7E51]" />
              <span>LA PARURE COMPLÈTE · THE HARMONIOUS 4-PIECE SUITE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              {set.name}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Necklace, bracelet, ring, and earrings united by intersecting orbital geometry, 
            mathematical negative space, and tension-suspended ethical diamonds.
          </p>
        </div>

        {/* Piece Selector Segmented Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E5E0D8]">
          <button
            onClick={() => setSelectedPieceKey('all')}
            className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-[1px] transition-all ${
              selectedPieceKey === 'all'
                ? 'bg-[#121110] text-[#FAFAF8] font-medium'
                : 'bg-[#F3EFE6] text-[#59534E] hover:text-[#121110]'
            }`}
          >
            [ Complete 4-Piece Ensemble ]
          </button>
          {pieceList.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedPieceKey(item.key)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-[1px] transition-all ${
                selectedPieceKey === item.key
                  ? 'bg-[#121110] text-[#FAFAF8] font-medium'
                  : 'bg-[#F3EFE6] text-[#59534E] hover:text-[#121110]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Display: Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start bg-[#F3EFE6] border border-[#D8D2C6] rounded-[2px] p-6 sm:p-10 shadow-sm">
          
          {/* Left Column: High-Fashion Visual Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-[1px] overflow-hidden border border-[#D8D2C6] shadow-md bg-[#E8E2D7]">
              <img
                src={selectedPieceKey === 'all' ? set.image : currentProduct?.images[0] || set.image}
                alt={selectedPieceKey === 'all' ? set.name : currentProduct?.name || set.name}
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/60 via-transparent to-transparent pointer-events-none" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-[#121110]/85 text-[#FAFAF8] px-3 py-1.5 rounded-[1px] font-mono text-[10px] tracking-[0.25em] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C5A880]" />
                <span>
                  {selectedPieceKey === 'all'
                    ? '4-PIECE HAUTE PARURE'
                    : `PIECE: ${selectedPieceKey.toUpperCase()}`}
                </span>
              </div>

              {/* Savings Badge */}
              <div className="absolute top-4 right-4 bg-[#2E7D32] text-white px-2.5 py-1 rounded-[1px] font-mono text-[10px] uppercase tracking-wider font-medium">
                15% SUITE ADVANTAGE
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E8E2D7] block mb-1">
                  {selectedPieceKey === 'all' ? set.frenchTitle : currentProduct?.collection}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light">
                  {selectedPieceKey === 'all' ? set.name : currentProduct?.name}
                </h3>
                <p className="text-xs text-[#FAFAF8]/90 font-light mt-1 max-w-md">
                  {selectedPieceKey === 'all' ? set.tagline : currentProduct?.tagline}
                </p>
              </div>
            </div>

            {/* Quick-Switch Thumbnails below Image */}
            <div className="grid grid-cols-5 gap-2 mt-4">
              <button
                onClick={() => setSelectedPieceKey('all')}
                className={`aspect-square rounded-[1px] overflow-hidden border transition-all ${
                  selectedPieceKey === 'all' ? 'border-[#121110] ring-1 ring-[#121110]' : 'border-[#D8D2C6] opacity-75'
                }`}
              >
                <img src={set.image} alt="Complete Suite" className="w-full h-full object-cover" />
              </button>
              {pieceList.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSelectedPieceKey(item.key)}
                  className={`aspect-square rounded-[1px] overflow-hidden border transition-all ${
                    selectedPieceKey === item.key ? 'border-[#121110] ring-1 ring-[#121110]' : 'border-[#D8D2C6] opacity-75'
                  }`}
                >
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Complete Suite Configuration & Piece Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Suite Overview & Description */}
            <div>
              <div className="flex items-center justify-between border-b border-[#D8D2C6] pb-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#8C8278]">
                  4 MATCHING PIECES · 18K SOLID GOLD (750 AU)
                </span>
                <span className="font-mono text-xs text-[#9D7E51] font-semibold">
                  TENSION ARCHITECTURE
                </span>
              </div>

              <p className="text-xs text-[#59534E] leading-relaxed font-light mb-6">
                {set.description}
              </p>

              {/* 4 Pieces Interactive Spec Cards */}
              <div className="space-y-3 mb-6">
                {pieceList.map((item) => {
                  const p = item.product;
                  const isSelected = selectedPieceKey === item.key;
                  const isAdded = addedPieceId === p.id;

                  return (
                    <div
                      key={p.id}
                      className={`p-3.5 bg-[#FAFAF8] border rounded-[1px] transition-all ${
                        isSelected
                          ? 'border-[#121110] shadow-2xs'
                          : 'border-[#D8D2C6] hover:border-[#121110]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center gap-3 cursor-pointer flex-1"
                          onClick={() => setSelectedPieceKey(item.key)}
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-12 rounded-[1px] object-cover bg-[#E8E2D7] border border-[#D8D2C6]"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-[#9D7E51] uppercase font-semibold">
                                {item.label}
                              </span>
                              <span className="text-[10px] text-[#8C8278] font-mono">· {p.hallmark}</span>
                            </div>
                            <h4 className="font-serif text-sm text-[#121110] font-normal line-clamp-1">
                              {p.name}
                            </h4>
                            <p className="text-[10.5px] text-[#59534E] font-light line-clamp-1">
                              {p.materials}
                            </p>
                          </div>
                        </div>

                        <div className="text-right pl-3">
                          <span className="font-mono text-xs text-[#121110] font-medium block">
                            {formatPrice(p.price, currency)}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => onOpenQuickView(p)}
                              className="text-[10px] font-mono text-[#8C8278] hover:text-[#121110] uppercase"
                            >
                              Inspect
                            </button>
                            <span className="text-[#D8D2C6]">·</span>
                            <button
                              onClick={() => handleAddSinglePiece(p)}
                              className="text-[10px] font-mono text-[#9D7E51] hover:underline uppercase font-medium"
                            >
                              {isAdded ? 'Added ✓' : '+ Piece'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Precious Metal Selector & Ring Size Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C8278] block mb-1.5">
                    SUITE ALLOY FINISH:
                  </span>
                  <select
                    value={selectedMetal}
                    onChange={(e) => setSelectedMetal(e.target.value)}
                    className="w-full bg-transparent text-xs font-mono text-[#121110] focus:outline-none cursor-pointer"
                  >
                    <option value="18k Yellow Gold">18k Recycled Solid Yellow Gold</option>
                    <option value="950 Solid Platinum">950 Solid Modern Platinum</option>
                    <option value="18k Rose Gold">18k Warm Alabaster Rose Gold</option>
                  </select>
                </div>

                <div className="p-3 bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C8278] block mb-1.5">
                    INCLUDED RING SIZE:
                  </span>
                  <select
                    value={selectedRingSize}
                    onChange={(e) => setSelectedRingSize(e.target.value)}
                    className="w-full bg-transparent text-xs font-mono text-[#121110] focus:outline-none cursor-pointer"
                  >
                    {['US 5', 'US 6', 'US 7', 'US 8', 'US 9'].map((s) => (
                      <option key={s} value={s}>
                        {s} (Complimentary Re-sizing)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Suite Guarantees & Features */}
              <div className="space-y-1.5 pt-2 border-t border-[#D8D2C6]/80 text-[11px] text-[#59534E] font-light">
                {set.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9D7E51] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Pricing & Action Bar */}
            <div className="pt-6 border-t border-[#D8D2C6]">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C8278] block">
                    TOTAL 4-PIECE SUITE PRICE
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl sm:text-4xl text-[#121110] font-normal">
                      {formatPrice(set.setPrice, currency)}
                    </span>
                    <span className="font-mono text-sm text-[#8C8278] line-through font-light">
                      {formatPrice(set.totalOriginalPrice, currency)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[#2E7D32] font-semibold block">
                    Save {formatPrice(set.totalOriginalPrice - set.setPrice, currency)} ({set.discountPct}% Suite Advantage)
                  </span>
                  <span className="font-mono text-[10px] text-[#8C8278]">
                    Includes bespoke Parisian velvet coffret
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="acquire-complete-4-piece-suite-btn"
                  onClick={handleAddSuiteToBag}
                  className={`w-full py-4 text-xs font-mono font-medium uppercase tracking-[0.2em] rounded-[1px] transition-all flex items-center justify-center gap-2 ${
                    addedSuite
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#121110] text-[#FAFAF8] hover:bg-[#2B2724]'
                  }`}
                >
                  {addedSuite ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Complete 4-Piece Set Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                      <span>Acquire Complete Set</span>
                    </>
                  )}
                </button>

                <button
                  id="consult-suite-whatsapp-btn"
                  onClick={handleWhatsAppConsultSuite}
                  className="w-full py-4 bg-[#FAFAF8] border border-[#D8D2C6] text-[#121110] text-xs font-mono font-medium uppercase tracking-[0.18em] rounded-[1px] hover:bg-[#EAE4D7] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Consult Goldsmith</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
