import React, { useState, useMemo } from 'react';
import { Heart, Eye, ShoppingBag, Check, SlidersHorizontal, Sparkles, X, MessageCircle, Compass } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatPrice, createWhatsAppInquiryLink } from '../utils/formatters';

interface ProductCatalogProps {
  products: Product[];
  currency: CurrencyConfig;
  selectedCollectionFilter: string | null;
  onClearCollectionFilter: () => void;
  onAddToCart: (product: Product, metal?: string, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onOpenQuickView: (product: Product) => void;
  onNavigateToBespoke?: () => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currency,
  selectedCollectionFilter,
  onClearCollectionFilter,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onOpenQuickView,
  onNavigateToBespoke,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [selectedMetals, setSelectedMetals] = useState<Record<string, string>>({});

  // Filter tabs for modern collection
  const filterTabs = [
    { id: 'all', label: 'All Sculptures' },
    { id: 'rings', label: 'Rings & Tension' },
    { id: 'necklaces', label: 'Torcs & Collars' },
    { id: 'earrings', label: 'Ear Climbers & Drops' },
    { id: 'bracelets', label: 'Mobius Cuffs' },
    { id: 'pearls', label: 'Raw Keshi Pearls' },
  ];

  // Filter logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Universe collection filter
    if (selectedCollectionFilter) {
      list = list.filter((p) => p.collection.toLowerCase() === selectedCollectionFilter.toLowerCase());
    }

    // Category / aesthetic filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'pearls') {
        list = list.filter(
          (p) =>
            p.collection.toLowerCase().includes('perle') ||
            p.materials.toLowerCase().includes('keshi') ||
            p.materials.toLowerCase().includes('pearl')
        );
      } else {
        list = list.filter((p) => p.category === activeFilter);
      }
    }

    // Sort logic
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCollectionFilter, activeFilter, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const metal = selectedMetals[product.id] || product.metalOptions[0];
    onAddToCart(product, metal);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1800);
  };

  const handleSelectMetal = (productId: string, metal: string) => {
    setSelectedMetals((prev) => ({ ...prev, [productId]: metal }));
  };

  return (
    <section id="creations-section" className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E5E0D8]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <span className="w-1.5 h-1.5 bg-[#9D7E51] rounded-full" />
              <span>CATALOGUE RAISONNÉ · REPERTOIRE 2026</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              Architectural Jewellery Repertoire
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Wearable sculptures forged in certified 18k solid gold, liquid vermeil, 
            tension-suspended diamonds, and raw organic keshi keystones.
          </p>
        </div>

        {/* Active Collection Filter Indicator */}
        {selectedCollectionFilter && (
          <div className="mb-8 p-3.5 bg-[#F3EFE6] border border-[#D8D2C6] rounded-[1px] flex items-center justify-between max-w-xl mx-auto">
            <div className="flex items-center gap-2 text-xs text-[#121110]">
              <Sparkles className="w-4 h-4 text-[#9D7E51]" />
              <span>Viewing series: <strong>{selectedCollectionFilter}</strong></span>
            </div>
            <button
              onClick={onClearCollectionFilter}
              className="text-xs uppercase tracking-wider text-[#9D7E51] hover:text-[#121110] flex items-center gap-1 font-medium font-mono"
            >
              <span>RESET</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Controls (Segmented Tabs & Sorter) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#E5E0D8]">
          {/* Functional interactive filter buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-1 p-1 bg-[#F3EFE6] border border-[#D8D2C6] rounded-[1px]">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase transition-all rounded-[1px] ${
                  activeFilter === tab.id
                    ? 'bg-[#121110] text-[#FAFAF8] font-medium shadow-2xs'
                    : 'text-[#59534E] hover:text-[#121110]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C8278] flex items-center gap-1.5 font-light">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#9D7E51]" />
              <span>SORT:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs tracking-wider uppercase font-mono text-[#121110] bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px] px-3 py-1.5 focus:outline-none focus:border-[#121110] cursor-pointer"
            >
              <option value="featured">Editorial Highlights</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Atelier Rating</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#F3EFE6] rounded-[1px] border border-[#D8D2C6] max-w-md mx-auto my-8">
            <p className="font-serif text-xl text-[#121110] mb-2 font-normal">No pieces found</p>
            <p className="text-xs text-[#7A746E] mb-6">
              Adjust your filters or explore all modernist series.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                onClearCollectionFilter();
              }}
              className="px-6 py-2.5 bg-[#121110] text-[#FAFAF8] text-xs font-mono uppercase tracking-widest rounded-[1px] hover:bg-[#2B2724]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Modernist Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 sm:gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isAdded = justAddedId === product.id;
            const currentMetal = selectedMetals[product.id] || product.metalOptions[0];

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-[#FAFAF8] rounded-[1px] border border-[#E5E0D8] overflow-hidden hover:border-[#121110] hover:shadow-md transition-all duration-400"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E2D7]">
                  {/* Primary & Secondary Crossfade Images */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-700 ease-out group-hover:opacity-0"
                    loading="lazy"
                  />
                  <img
                    src={product.images[1] || product.images[0]}
                    alt={`${product.name} alternate view`}
                    className="w-full h-full object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-hover:scale-103"
                    loading="lazy"
                  />

                  {/* Wishlist Heart Button */}
                  <button
                    id={`wishlist-btn-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                      isWishlisted
                        ? 'bg-[#9D7E51] text-white shadow-xs'
                        : 'bg-[#FAFAF8]/90 text-[#59534E] hover:text-[#121110] hover:bg-white'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      id={`quickview-btn-${product.id}`}
                      onClick={() => onOpenQuickView(product)}
                      className="w-full py-2.5 bg-[#FAFAF8]/95 backdrop-blur-md text-[#121110] text-[10.5px] font-mono uppercase tracking-[0.22em] border border-[#D8D2C6] rounded-[1px] hover:bg-[#121110] hover:text-[#FAFAF8] transition-colors flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#9D7E51]" />
                      <span>Inspect Details</span>
                    </button>
                  </div>
                </div>

                {/* Product Meta & Details (Zero-pill discipline) */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Quiet Editorial Kicker with Typographic Separator */}
                    <div className="flex items-center gap-1.5 text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C8278] mb-1.5">
                      <span className="text-[#9D7E51] font-semibold">{product.collection}</span>
                      <span aria-hidden="true" className="text-[#D8D2C6]">·</span>
                      <span>{product.hallmark || product.karat}</span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onOpenQuickView(product)}
                      className="font-serif text-lg text-[#121110] font-normal hover:text-[#9D7E51] transition-colors cursor-pointer mb-1 line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-[#59534E] line-clamp-1 font-light mb-3">
                      {product.materials}
                    </p>

                    {/* Interactive Metal Swatch Chooser on Card */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-mono text-[#8C8278] uppercase tracking-wider font-light">Alloy:</span>
                      <div className="flex items-center gap-1.5">
                        {product.metalOptions.map((opt) => {
                          const isSelected = currentMetal === opt;
                          const swatchBg = opt.includes('Rose')
                            ? 'bg-[#E8A598]'
                            : opt.includes('White') || opt.includes('Rhodium') || opt.includes('Platinum')
                            ? 'bg-[#DCDFE3]'
                            : 'bg-[#D4AF37]';

                          return (
                            <button
                              key={opt}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelectMetal(product.id, opt);
                              }}
                              title={opt}
                              className={`w-3.5 h-3.5 rounded-full ${swatchBg} transition-transform ${
                                isSelected ? 'ring-2 ring-[#121110] ring-offset-1 scale-110' : 'opacity-70 hover:opacity-100'
                              }`}
                            />
                          );
                        })}
                      </div>
                      <span className="text-[10px] font-mono text-[#59534E] font-light ml-auto truncate max-w-[120px]">
                        {currentMetal}
                      </span>
                    </div>
                  </div>

                  {/* Pricing, Bespoke Customize, & Quick Add Action */}
                  <div className="pt-3 border-t border-[#E5E0D8] space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-xl text-[#121110] font-medium">
                          {formatPrice(product.price, currency)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs font-mono text-[#8C8278] line-through font-light">
                            {formatPrice(product.originalPrice, currency)}
                          </span>
                        )}
                      </div>

                      {/* Direct WhatsApp styling link */}
                      <a
                        href={createWhatsAppInquiryLink('product', {
                          product,
                          metal: currentMetal,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8C8278] hover:text-[#25D366] transition-colors p-1"
                        title="Inquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Add to Bag Button */}
                      <button
                        id={`add-to-cart-btn-${product.id}`}
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`w-full py-2.5 px-3 text-[10.5px] uppercase font-mono tracking-[0.16em] font-medium rounded-[1px] transition-all flex items-center justify-center gap-1.5 ${
                          isAdded
                            ? 'bg-[#2E7D32] text-white'
                            : 'bg-[#121110] hover:bg-[#2B2724] text-[#FAFAF8]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
                            <span>Bag</span>
                          </>
                        )}
                      </button>

                      {/* Customise in Bespoke Studio */}
                      {onNavigateToBespoke ? (
                        <button
                          onClick={onNavigateToBespoke}
                          className="w-full py-2.5 px-2 border border-[#D8D2C6] hover:border-[#121110] text-[#59534E] hover:text-[#121110] bg-[#F3EFE6] text-[10px] font-mono uppercase tracking-[0.14em] font-medium rounded-[1px] transition-colors flex items-center justify-center gap-1"
                        >
                          <Compass className="w-3 h-3 text-[#9D7E51]" />
                          <span>Customise</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenQuickView(product)}
                          className="w-full py-2.5 px-2 border border-[#D8D2C6] hover:border-[#121110] text-[#59534E] hover:text-[#121110] bg-[#F3EFE6] text-[10px] font-mono uppercase tracking-[0.14em] font-medium rounded-[1px] transition-colors flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-[#9D7E51]" />
                          <span>Inspect</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
