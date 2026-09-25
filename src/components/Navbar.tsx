import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, MessageCircle, Compass } from 'lucide-react';
import { CurrencyConfig } from '../types';
import { CURRENCIES, BRAND_WHATSAPP_URL } from '../data/jewelryData';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  currency: CurrencyConfig;
  onSelectCurrency: (currency: CurrencyConfig) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenCareGuide: () => void;
  onOpenSizeGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  currency,
  onSelectCurrency,
  searchQuery,
  onSearchChange,
  onNavigateToSection,
  onOpenCareGuide,
  onOpenSizeGuide,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigateToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Modern Announcement Bar */}
      <div className="bg-[#121110] text-[#E8E4DC] px-4 py-2 text-[10.5px] font-mono tracking-widest uppercase flex items-center justify-between border-b border-[#252220]">
        <div className="hidden sm:flex items-center gap-2 text-[#C5A880]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <span>MARAIS ATELIER · ARCHITECTURAL HIGH JEWELLERY</span>
        </div>
        <div className="mx-auto sm:mx-0 text-center font-light">
          Complimentary Worldwide Courier on Orders Over $150 · 18k Recycled Solid Gold
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a
            href={BRAND_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#C5A880] hover:text-[#FFFFFF] transition-colors"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366]" />
            <span>Salon Concierge</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E5E0D8] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Nav links - Desktop */}
            <div className="hidden lg:flex items-center space-x-5 xl:space-x-6 text-xs font-mono tracking-[0.16em] uppercase text-[#121110]">
              <button
                id="nav-parure-link"
                onClick={() => handleNavClick('parure-complete-section')}
                className="text-[#9D7E51] hover:text-[#121110] transition-colors py-2 flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3 text-[#9D7E51]" />
                <span>4-Piece Set</span>
              </button>
              <button
                id="nav-collections-link"
                onClick={() => handleNavClick('collections-section')}
                className="hover:text-[#9D7E51] transition-colors py-2"
              >
                Universes
              </button>
              <button
                id="nav-creations-link"
                onClick={() => handleNavClick('creations-section')}
                className="hover:text-[#9D7E51] transition-colors py-2"
              >
                Repertoire
              </button>
              <button
                id="nav-bespoke-link"
                onClick={() => handleNavClick('bespoke-studio-section')}
                className="hover:text-[#9D7E51] transition-colors py-2 flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#9D7E51]" />
                <span>Bespoke CAD</span>
              </button>
              <button
                id="nav-stacking-link"
                onClick={() => handleNavClick('stacking-studio-section')}
                className="hover:text-[#9D7E51] transition-colors py-2"
              >
                Stacking
              </button>
              <button
                id="nav-about-link"
                onClick={() => handleNavClick('about-section')}
                className="hover:text-[#9D7E51] transition-colors py-2"
              >
                Atelier
              </button>
              <button
                id="nav-contact-link"
                onClick={() => handleNavClick('contact-section')}
                className="hover:text-[#9D7E51] transition-colors py-2"
              >
                Concierge
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                id="mobile-menu-toggle-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#121110] hover:text-[#9D7E51] transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Center Brand Identity: Modern Architectural */}
            <div
              className="flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => handleNavClick('hero-section')}
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#121110] font-normal uppercase group-hover:text-[#9D7E51] transition-colors">
                Amandine
              </span>
              <span className="text-[9px] font-mono tracking-[0.35em] text-[#8C8278] uppercase mt-0.5 font-light">
                Moderne · Paris
              </span>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Currency Selector */}
              <div className="relative">
                <button
                  id="currency-selector-button"
                  onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                  className="text-xs font-mono tracking-wider uppercase font-medium text-[#121110] hover:text-[#9D7E51] py-1 px-2 rounded-[1px] border border-[#D8D2C6] bg-[#FAFAF8] transition-colors"
                >
                  {currency.code} ({currency.symbol})
                </button>
                {isCurrencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px] shadow-lg py-1 z-50">
                    {Object.values(CURRENCIES).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          onSelectCurrency(curr);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-mono tracking-wider flex items-center justify-between hover:bg-[#F3EFE6] transition-colors ${
                          currency.code === curr.code ? 'font-semibold text-[#9D7E51] bg-[#F3EFE6]' : 'text-[#121110]'
                        }`}
                      >
                        <span>{curr.code}</span>
                        <span>{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Toggle */}
              <button
                id="search-toggle-button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#59534E] hover:text-[#121110] transition-colors relative"
                aria-label="Search jewelry"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                id="wishlist-toggle-button"
                onClick={onOpenWishlist}
                className="p-2 text-[#59534E] hover:text-[#121110] transition-colors relative"
                aria-label="Saved favorites"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#9D7E51] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                id="cart-toggle-button"
                onClick={onOpenCart}
                className="p-2 text-[#59534E] hover:text-[#121110] transition-colors relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#121110] text-[#FAFAF8] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-mono shadow-2xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Search Bar Drawer */}
          {isSearchOpen && (
            <div className="py-3 px-2 border-t border-[#E5E0D8] bg-[#FAFAF8] transition-all flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8C8278]" />
              <input
                id="site-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tension rings, fluid torcs, brutalist signets, raw keshi..."
                className="w-full bg-transparent text-sm text-[#121110] focus:outline-none placeholder-[#8C8278] font-light"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs font-mono text-[#8C8278] hover:text-[#121110] uppercase tracking-wider font-light"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-[#8C8278] hover:text-[#121110] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FAFAF8] border-t border-[#E5E0D8] px-6 py-6 space-y-4 font-mono">
            <div className="flex flex-col space-y-3 text-xs uppercase tracking-[0.2em] text-[#121110]">
              <button
                onClick={() => handleNavClick('parure-complete-section')}
                className="text-left py-2 text-[#9D7E51] font-semibold border-b border-[#E5E0D8] flex items-center justify-between"
              >
                <span>Complete 4-Piece Suite</span>
                <Sparkles className="w-3.5 h-3.5 text-[#9D7E51]" />
              </button>
              <button
                onClick={() => handleNavClick('collections-section')}
                className="text-left py-2 hover:text-[#9D7E51] border-b border-[#E5E0D8]"
              >
                Modernist Universes
              </button>
              <button
                onClick={() => handleNavClick('creations-section')}
                className="text-left py-2 hover:text-[#9D7E51] border-b border-[#E5E0D8]"
              >
                Jewellery Repertoire
              </button>
              <button
                onClick={() => handleNavClick('bespoke-studio-section')}
                className="text-left py-2 text-[#9D7E51] border-b border-[#E5E0D8] flex items-center justify-between"
              >
                <span>Bespoke CAD Studio</span>
                <Compass className="w-3.5 h-3.5 text-[#9D7E51]" />
              </button>
              <button
                onClick={() => handleNavClick('stacking-studio-section')}
                className="text-left py-2 hover:text-[#9D7E51] border-b border-[#E5E0D8]"
              >
                Architectural Stacking
              </button>
              <button
                onClick={() => handleNavClick('about-section')}
                className="text-left py-2 hover:text-[#9D7E51] border-b border-[#E5E0D8]"
              >
                Atelier Le Marais
              </button>
              <button
                onClick={() => handleNavClick('testimonials-section')}
                className="text-left py-2 hover:text-[#9D7E51] border-b border-[#E5E0D8]"
              >
                Connoisseur Reviews
              </button>
              <button
                onClick={() => handleNavClick('contact-section')}
                className="text-left py-2 text-[#9D7E51] font-semibold"
              >
                WhatsApp Concierge
              </button>
            </div>

            <div className="pt-4 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#8C8278]">
              <button onClick={onOpenSizeGuide} className="hover:text-[#121110]">
                Ring Size Matrix
              </button>
              <span>•</span>
              <button onClick={onOpenCareGuide} className="hover:text-[#121110]">
                Material Care
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
