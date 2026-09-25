/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionsSection } from './components/CollectionsSection';
import { CompleteJewellerySetSection } from './components/CompleteJewellerySetSection';
import { BespokeDesignStudio } from './components/BespokeDesignStudio';
import { StackingStudio } from './components/StackingStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramGallery } from './components/InstagramGallery';
import { ContactWhatsAppSection } from './components/ContactWhatsAppSection';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CareGuideModal } from './components/CareGuideModal';
import { Footer } from './components/Footer';
import { Product, CartItem, CurrencyConfig } from './types';
import { CURRENCIES, PRODUCTS, BRAND_WHATSAPP_URL } from './data/jewelryData';
import { MessageCircle } from 'lucide-react';

export default function App() {
  // Currency State
  const [currency, setCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);

  // Cart State with initial sample items for luxury showcase
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amandine_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default luxury sample item in cart
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedMetal: '18k Yellow Gold',
        selectedSize: 'US 7',
      },
    ];
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('amandine_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [PRODUCTS[0].id, PRODUCTS[1].id];
  });

  // UI Control states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollectionFilter, setSelectedCollectionFilter] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('amandine_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('amandine_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // Cart handlers
  const handleAddToCart = (product: Product, metal?: string, size?: string) => {
    const chosenMetal = metal || product.metalOptions[0] || '18k Yellow Gold';
    const chosenSize = size || product.sizes[0] || 'Standard';

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedMetal === chosenMetal &&
          item.selectedSize === chosenSize
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [
          ...prev,
          {
            product,
            quantity: 1,
            selectedMetal: chosenMetal,
            selectedSize: chosenSize,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    metal: string,
    size: string,
    delta: number
  ) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedMetal === metal &&
            item.selectedSize === size
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, metal: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedMetal === metal &&
            item.selectedSize === size
          )
      )
    );
  };

  // Wishlist handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Search filtering
  const searchableProducts = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.materials.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      (p.aestheticTag && p.aestheticTag.toLowerCase().includes(q))
    );
  });

  // Navigation smoothly to anchor sections
  const handleNavigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (collectionName: string) => {
    setSelectedCollectionFilter(collectionName);
    handleNavigateToSection('creations-section');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1A17] selection:bg-[#EAE2D5] selection:text-[#1E1A17]">
      
      {/* Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        currency={currency}
        onSelectCurrency={setCurrency}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToSection={handleNavigateToSection}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Luxury Hero Section */}
        <Hero
          onExploreClick={() => handleNavigateToSection('creations-section')}
          onStoryClick={() => handleNavigateToSection('about-section')}
          onStackingClick={() => handleNavigateToSection('stacking-studio-section')}
          onBespokeClick={() => handleNavigateToSection('bespoke-studio-section')}
          onParureClick={() => handleNavigateToSection('parure-complete-section')}
        />

        {/* Complete 4-Piece Matching Jewellery Set (Necklace, Bracelet, Ring, Earrings) */}
        <CompleteJewellerySetSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Featured Collections Showcase */}
        <CollectionsSection onSelectCollection={handleSelectCollection} />

        {/* Atelier Sur Mesure: Custom Bespoke Jewellery Designer */}
        <BespokeDesignStudio
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* The Stacking & Layering Studio */}
        <StackingStudio
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
        />

        {/* Product Catalog with Prices & Filters */}
        <ProductCatalog
          products={searchableProducts}
          currency={currency}
          selectedCollectionFilter={selectedCollectionFilter}
          onClearCollectionFilter={() => setSelectedCollectionFilter(null)}
          onOpenQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onNavigateToBespoke={() => handleNavigateToSection('bespoke-studio-section')}
        />

        {/* About Amandine & Atelier Craftsmanship */}
        <AboutSection />

        {/* Customer Testimonials */}
        <TestimonialsSection />

        {/* Instagram Gallery (#AmandineMoments) */}
        <InstagramGallery onOpenProduct={(p) => setQuickViewProduct(p)} />

        {/* Contact & WhatsApp Concierge CTA */}
        <ContactWhatsAppSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigateToSection={handleNavigateToSection}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
      <aside aria-label="WhatsApp Stylist Concierge" className="fixed bottom-6 right-6 z-40">
        <a
          id="floating-whatsapp-action-button"
          href={BRAND_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-[#1E1A17] text-[#FAF8F5] rounded-full shadow-xl hover:bg-[#332C27] border border-[#DFD5C5]/50 transition-all hover:scale-105 group"
          title="Chat with our Paris Stylist on WhatsApp"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#25D366] rounded-full ring-2 ring-[#1E1A17] animate-ping" />
          </div>
          <span className="text-xs uppercase tracking-widest font-medium text-[#FAF8F5] hidden sm:inline">
            WhatsApp Stylist
          </span>
        </a>
      </aside>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onExploreProducts={() => handleNavigateToSection('creations-section')}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={(p) => handleAddToCart(p)}
        onExploreProducts={() => handleNavigateToSection('creations-section')}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Care Guide Modal */}
      <CareGuideModal isOpen={isCareGuideOpen} onClose={() => setIsCareGuideOpen(false)} />

    </div>
  );
}
