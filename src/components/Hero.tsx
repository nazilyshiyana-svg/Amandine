import React from 'react';
import { ArrowUpRight, Sparkles, MessageCircle, Compass, Layers, ShieldCheck } from 'lucide-react';
import { BRAND_WHATSAPP_URL } from '../data/jewelryData';
import modernHeroImg from '../assets/images/modern_hero_jewelry_1790242908849.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
  onStackingClick?: () => void;
  onBespokeClick?: () => void;
  onParureClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onStackingClick,
  onBespokeClick,
  onParureClick,
}) => {
  return (
    <section id="hero-section" className="relative bg-[#FAFAF8] overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E5E0D8]">
      
      {/* Modern Runway Ticker Ribbon */}
      <div className="w-full bg-[#121110] text-[#E8E4DC] py-2.5 px-4 overflow-hidden border-b border-[#252220] flex items-center justify-between text-[10.5px] uppercase tracking-[0.28em] font-mono">
        <div className="flex items-center gap-6 animate-pulse">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            Amandine Moderne · Paris
          </span>
          <span className="hidden md:inline text-[#7A746E]">/</span>
          <span className="hidden md:inline">Architectural Wearable Sculpture</span>
          <span className="hidden md:inline text-[#7A746E]">/</span>
          <span className="hidden md:inline">Tension-Suspended Gems</span>
        </div>
        <div className="flex items-center gap-3 text-[#C5A880]">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
          <span className="tracking-widest">Le Marais Atelier Online</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Modern Architectural Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Minimal Index Header */}
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C8278] mb-6">
              <span className="text-[#121110] font-semibold">ÉDITION 2026</span>
              <span aria-hidden="true" className="text-[#C5A880]">——</span>
              <span>SCULPTURE CONTEMPORAINE</span>
            </div>

            {/* Contemporary Monolithic Title */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#121110] leading-[1.04] tracking-tight mb-6 uppercase">
              Architectural <br />
              <span className="italic font-normal text-[#9D7E51] font-serif lowercase">forms.</span> <br />
              Pure Modernity.
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#59534E] max-w-xl leading-relaxed font-light mb-10">
              Challenging traditional fine jewelry with tension-suspended ethical diamonds, 
              mathematical orbital bands, and fluid molten collars. Handcrafted in 100% recycled 
              18k solid gold at our glass-pavilion atelier in Le Marais, Paris.
            </p>

            {/* Clean Architectural Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
              <button
                id="hero-explore-collection-btn"
                onClick={onExploreClick}
                className="px-8 py-4 bg-[#121110] text-[#FAFAF8] text-xs font-medium tracking-[0.22em] uppercase rounded-[1px] hover:bg-[#2B2724] transition-all flex items-center justify-between sm:justify-center gap-3 group shadow-xs"
              >
                <span>Explore Repertoire</span>
                <ArrowUpRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {onParureClick && (
                <button
                  id="hero-parure-suite-btn"
                  onClick={onParureClick}
                  className="px-7 py-4 bg-[#F3EFE6] text-[#121110] border border-[#D8D2C6] text-xs font-medium tracking-[0.2em] uppercase rounded-[1px] hover:bg-[#EAE4D7] transition-all flex items-center justify-between sm:justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#9D7E51]" />
                  <span>4-Piece Parure</span>
                </button>
              )}

              {onBespokeClick && (
                <button
                  id="hero-bespoke-studio-btn"
                  onClick={onBespokeClick}
                  className="px-6 py-4 bg-[#FAFAF8] text-[#59534E] hover:text-[#121110] border border-[#E5E0D8] text-xs font-medium tracking-[0.2em] uppercase rounded-[1px] hover:bg-[#F3EFE6] transition-all flex items-center justify-between sm:justify-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5 text-[#9D7E51]" />
                  <span>CAD Studio</span>
                </button>
              )}

              {onStackingClick && (
                <button
                  id="hero-stacking-studio-btn"
                  onClick={onStackingClick}
                  className="px-6 py-4 bg-[#FAFAF8] text-[#59534E] hover:text-[#121110] border border-[#E5E0D8] text-xs font-medium tracking-[0.18em] uppercase rounded-[1px] hover:bg-[#F3EFE6] transition-all flex items-center justify-between sm:justify-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-[#9D7E51]" />
                  <span>Stacking</span>
                </button>
              )}
            </div>

            {/* Contemporary Technical Manifestos */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E0D8] text-left">
              <div>
                <span className="font-mono text-xs text-[#9D7E51] block mb-1">01 / TECHNIQUE</span>
                <span className="font-serif text-lg text-[#121110] block font-normal leading-snug">Tension Float</span>
                <span className="text-[11px] text-[#7A746E] font-light">Zero prong obstruction</span>
              </div>
              <div>
                <span className="font-mono text-xs text-[#9D7E51] block mb-1">02 / MATIÈRE</span>
                <span className="font-serif text-lg text-[#121110] block font-normal leading-snug">750 Solid Gold</span>
                <span className="text-[11px] text-[#7A746E] font-light">100% sustainably refined</span>
              </div>
              <div>
                <span className="font-mono text-xs text-[#9D7E51] block mb-1">03 / ATELIER</span>
                <span className="font-serif text-lg text-[#121110] block font-normal leading-snug">Paris Marais</span>
                <span className="text-[11px] text-[#7A746E] font-light">Custom CAD & lost-wax</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Framed Modern Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              
              {/* Outer Minimalist Hairline Box */}
              <div className="relative bg-[#F3EFE6] p-3 sm:p-4 rounded-[2px] border border-[#D8D2C6] shadow-md">
                
                {/* Image Canvas with Aspect Ratio */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1px] bg-[#E8E2D7]">
                  <img
                    src={modernHeroImg}
                    alt="Amandine Modernist Sculptural Fine Jewelry"
                    className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700 ease-out"
                    loading="eager"
                  />

                  {/* Top Minimalist Coordinates Tag */}
                  <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest uppercase bg-[#121110]/80 text-[#FAFAF8] px-2.5 py-1 backdrop-blur-xs">
                    48.8575° N, 2.3622° E · MARAIS
                  </div>

                  {/* Bottom Technical Spec Badge */}
                  <div className="absolute bottom-4 inset-x-4 bg-[#FAFAF8]/95 backdrop-blur-md p-3.5 border border-[#D8D2C6] text-[#121110]">
                    <div className="flex items-center justify-between text-[9.5px] font-mono uppercase tracking-wider text-[#8C8278] mb-1">
                      <span>SERIES 01 · PIÈCE MAÎTRESSE</span>
                      <span className="text-[#9D7E51]">LIMITED CAST</span>
                    </div>
                    <div className="font-serif text-base text-[#121110] font-normal leading-tight">
                      Le Torc Ondulant & L’Orbite Ring
                    </div>
                    <div className="text-[10.5px] text-[#59534E] font-light mt-0.5 flex items-center justify-between">
                      <span>18k Solid Gold · Grade-AAA Keshi Pearl</span>
                      <span className="font-mono text-[#121110] font-medium">$520</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Minimalist Floating Accent Card */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-[#121110] text-[#FAFAF8] p-3.5 rounded-[1px] shadow-xl border border-[#332F2C] hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#252220] border border-[#C5A880]/40 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880] block">Pure Modernity</span>
                  <span className="text-xs font-serif font-light text-[#FAFAF8]">Sculpted in Paris, France</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
