import React from 'react';
import { Compass, Gem, Award, ShieldCheck, Feather } from 'lucide-react';
import { ATELIER_FACTS } from '../data/jewelryData';
import modernHeroImg from '../assets/images/modern_hero_jewelry_1790242908849.jpg';
import modernEmeraldSignetImg from '../assets/images/modern_emerald_signet_1790242966089.jpg';

export const AboutSection: React.FC = () => {
  const factIcons = [
    <Compass className="w-5 h-5 text-[#9D7E51]" />,
    <Gem className="w-5 h-5 text-[#9D7E51]" />,
    <Award className="w-5 h-5 text-[#9D7E51]" />,
    <ShieldCheck className="w-5 h-5 text-[#9D7E51]" />,
  ];

  return (
    <section id="about-section" className="py-20 lg:py-28 bg-[#F3EFE6] border-b border-[#E5E0D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Visual Composition: Architectural Framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-[1px] overflow-hidden border border-[#D8D2C6] shadow-lg bg-[#E8E2D7]">
                <img
                  src={modernHeroImg}
                  alt="Amandine Modern Atelier in Paris"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[#121110]/10" />

                {/* Minimalist Studio Coordinate Badge */}
                <div className="absolute top-4 left-4 font-mono text-[9px] tracking-widest text-[#FAFAF8] bg-[#121110]/85 px-2.5 py-1">
                  ATELIER GLASSHAUS · LE MARAIS
                </div>
              </div>

              {/* Overlapping Secondary Macro Detail */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-3/5 aspect-square rounded-[1px] overflow-hidden border-2 border-[#FAFAF8] shadow-xl hidden sm:block">
                <img
                  src={modernEmeraldSignetImg}
                  alt="Precision chamfering and flush bezel setting"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Minimalist Monogram Stamp */}
              <div className="absolute -top-5 -left-4 sm:-left-6 w-16 h-16 bg-[#121110] text-[#FAFAF8] border border-[#332F2C] rounded-[1px] flex flex-col items-center justify-center shadow-md font-mono">
                <span className="text-sm font-semibold tracking-widest text-[#C5A880]">A·M</span>
                <span className="text-[7.5px] tracking-[0.2em] text-[#8C8278]">PARIS</span>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9D7E51]" />
              <span>MANIFESTE DU DESIGN MODERNE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light leading-tight mb-6">
              Wearable Sculpture: <br />
              <span className="italic font-normal text-[#9D7E51]">The Geometry of Modern Grace</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#59534E] leading-relaxed mb-6 font-light">
              Founded in a minimalist glass pavilion in Le Marais, Amandine was born to challenge 
              antiquated jewelry conventions. We view fine jewelry not as delicate trinkets, but as 
              bold architectural volumes and kinetic sculptures engineered for continuous daily wear.
            </p>

            <p className="font-sans text-sm sm:text-base text-[#59534E] leading-relaxed mb-8 font-light">
              By marrying advanced CAD metallurgical physics with artisanal French lost-wax hand casting, 
              we achieve open-air tension settings that suspend stones in negative space. Every ounce of gold 
              is 100% recycled 750 alloy, certified conflict-free, and crafted to endure generations.
            </p>

            {/* Modernist Quote Card */}
            <div className="p-6 bg-[#FAFAF8] border-l-2 border-[#121110] border-y border-r border-[#D8D2C6] rounded-[1px] shadow-2xs">
              <p className="font-serif italic text-base sm:text-lg text-[#121110] leading-snug mb-3">
                “Modern jewelry is an architectural statement on the human body—pure negative space, calculated tension, and unadorned truth.”
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-medium tracking-wider text-[#121110] uppercase block">
                    Amandine Vaneau
                  </span>
                  <span className="text-[11px] font-mono text-[#8C8278]">
                    Creative Director & Architect · Paris
                  </span>
                </div>
                <Feather className="w-4 h-4 text-[#9D7E51]" />
              </div>
            </div>

          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="border-t border-[#D8D2C6] pt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ATELIER_FACTS.map((fact, index) => (
              <div
                key={fact.title}
                className="p-6 bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px] flex flex-col justify-between hover:border-[#121110] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[1px] bg-[#F3EFE6] border border-[#D8D2C6] flex items-center justify-center">
                      {factIcons[index]}
                    </div>
                    <span className="font-mono text-xs text-[#8C8278]">0{index + 1}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#121110] font-normal mb-2">
                    {fact.title}
                  </h3>
                  <p className="text-xs text-[#59534E] leading-relaxed font-light">
                    {fact.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
