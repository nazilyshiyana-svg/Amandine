import React from 'react';
import { Sparkles, MessageCircle, Instagram, ArrowUp, Compass } from 'lucide-react';
import { BRAND_WHATSAPP_URL } from '../data/jewelryData';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onOpenCareGuide: () => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onOpenCareGuide,
  onOpenSizeGuide,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121110] text-[#FAFAF8] border-t border-[#252220]">
      {/* Upper Newsletter & Brand Ribbon */}
      <div className="border-b border-[#252220] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
                ATELIER MARAIS · ÉDITION 2026
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAFAF8] font-light">
                Join the Amandine Modernist Circle
              </h3>
              <p className="text-xs text-[#8C8278] mt-1 font-light max-w-lg">
                Receive private invitations to seasonal limited-cast sculptures, 
                Place Vendôme showcase viewings, and technical metallurgical releases.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to Amandine Modernist Circle.');
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="bg-[#1E1C1A] border border-[#332F2C] text-xs text-[#FAFAF8] px-4 py-3 rounded-[1px] w-full focus:outline-none focus:border-[#C5A880] font-light placeholder-[#8C8278]"
                />
                <button
                  type="submit"
                  className="bg-[#FAFAF8] text-[#121110] px-6 py-3 text-xs font-mono uppercase tracking-widest font-medium rounded-[1px] hover:bg-[#E8E2D7] transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-4">
              <div className="mb-4">
                <span className="font-serif text-2xl tracking-[0.25em] text-[#FAFAF8] uppercase block">
                  Amandine
                </span>
                <span className="text-[9px] font-mono tracking-[0.35em] text-[#8C8278] uppercase">
                  Moderne · Paris
                </span>
              </div>
              <p className="text-xs text-[#8C8278] leading-relaxed mb-6 font-light max-w-sm">
                Wearable modern architecture crafted from 100% recycled 18k solid gold, 
                fluid liquid vermeil, tension-suspended gems, and raw baroque keshi pearls. 
                Handcrafted at 14 Rue de Turenne, Paris.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={BRAND_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[1px] bg-[#1E1C1A] border border-[#332F2C] flex items-center justify-center text-[#FAFAF8] hover:text-[#25D366] transition-colors"
                  aria-label="WhatsApp Concierge"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[1px] bg-[#1E1C1A] border border-[#332F2C] flex items-center justify-center text-[#FAFAF8] hover:text-[#C5A880] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Universes */}
            <div className="lg:col-span-3">
              <h4 className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#C5A880] font-medium mb-4">
                Modernist Universes
              </h4>
              <ul className="space-y-2.5 text-xs text-[#8C8278] font-light">
                <li>
                  <button
                    onClick={() => onNavigateToSection('parure-complete-section')}
                    className="hover:text-[#FAFAF8] transition-colors text-[#C5A880] font-medium"
                  >
                    L'Orbite 4-Piece Parure Suite
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('creations-section')}
                    className="hover:text-[#FAFAF8] transition-colors"
                  >
                    Formes Architecturales
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('creations-section')}
                    className="hover:text-[#FAFAF8] transition-colors"
                  >
                    Tension & Lévitation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('creations-section')}
                    className="hover:text-[#FAFAF8] transition-colors"
                  >
                    Matière Brute & Perles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('creations-section')}
                    className="hover:text-[#FAFAF8] transition-colors"
                  >
                    Géométrie Pure
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('bespoke-studio-section')}
                    className="hover:text-[#FAFAF8] transition-colors text-[#C5A880]"
                  >
                    Bespoke CAD Studio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('stacking-studio-section')}
                    className="hover:text-[#FAFAF8] transition-colors text-[#C5A880]"
                  >
                    Architectural Stacking
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Concierge */}
            <div className="lg:col-span-3">
              <h4 className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#C5A880] font-medium mb-4">
                Client Salon
              </h4>
              <ul className="space-y-2.5 text-xs text-[#8C8278] font-light">
                <li>
                  <a
                    href={BRAND_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FAFAF8] transition-colors flex items-center gap-1.5"
                  >
                    <span>WhatsApp Stylist Direct</span>
                    <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full" />
                  </a>
                </li>
                <li>
                  <button onClick={onOpenSizeGuide} className="hover:text-[#FAFAF8] transition-colors">
                    Ring Size Matrix
                  </button>
                </li>
                <li>
                  <button onClick={onOpenCareGuide} className="hover:text-[#FAFAF8] transition-colors">
                    Precious Metal Care
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('contact-section')}
                    className="hover:text-[#FAFAF8] transition-colors"
                  >
                    Private Marais Viewing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigateToSection('about-section')}
                    className="hover:text-[#FAFAF8] transition-colors"
                  >
                    Recycled 750 Gold Manifesto
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Top Action */}
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <h4 className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#C5A880] font-medium mb-4">
                  Haute Atelier
                </h4>
                <p className="text-xs text-[#8C8278] font-mono leading-relaxed">
                  14 Rue de Turenne<br />
                  75004 Paris, France<br />
                  +33 7 00 90 01 23
                </p>
              </div>

              <button
                onClick={scrollToTop}
                className="mt-6 inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#C5A880] hover:text-[#FAFAF8] transition-colors"
              >
                <span>Ascend to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#252220] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8C8278]">
          <p>© {new Date().getFullYear()} AMANDINE MODERNE PARIS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 mt-3 sm:mt-0">
            <span>RJC RESPONSIBLE JEWELLERY COUNCIL</span>
            <span>·</span>
            <span>750 SOLID GOLD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
