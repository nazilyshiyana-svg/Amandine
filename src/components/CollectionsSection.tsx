import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '../data/jewelryData';

interface CollectionsSectionProps {
  onSelectCollection: (collectionName: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({ onSelectCollection }) => {
  const indexMarkers = ['01', '02', '03', '04'];

  return (
    <section id="collections-section" className="py-20 lg:py-28 bg-[#F3EFE6] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header: Modern Architectural */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#D8D2C6]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <span className="w-1.5 h-1.5 bg-[#9D7E51] rounded-full" />
              <span>COLLECTIONS ARCHITECTURALES · 2026</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              Curated Modern Universes
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Wearable modern art shaped by mathematical balance, brutalist octagons, 
            cantilevered gemstone tension, and organic raw pearl contrast.
          </p>
        </div>

        {/* Collections Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((col, index) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.name)}
              className="group cursor-pointer bg-[#FAFAF8] rounded-[2px] overflow-hidden border border-[#D8D2C6] hover:border-[#121110] transition-all duration-400 flex flex-col justify-between"
            >
              {/* Image Area */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E8E2D7]">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[#121110]/15 group-hover:bg-[#121110]/30 transition-colors" />
                
                {/* Minimalist Unboxed Number Kicker */}
                <div className="absolute top-3 left-3 font-mono text-[11px] text-[#FAFAF8] bg-[#121110]/85 px-2.5 py-1 tracking-wider">
                  [{indexMarkers[index]}]
                </div>

                {/* Minimalist Design Count Marker */}
                <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-[#FAFAF8] bg-[#121110]/70 px-2 py-0.5">
                  {col.itemCount} PIECES
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#E8E2D7] block mb-1">
                    Universe {indexMarkers[index]}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light">
                    {col.name}
                  </h3>
                </div>
              </div>

              {/* Bottom Card Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs font-serif italic text-[#9D7E51] mb-2 font-normal">
                    {col.tagline}
                  </p>
                  <p className="text-xs text-[#59534E] leading-relaxed line-clamp-2 font-light">
                    {col.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E5E0D8] flex items-center justify-between text-[11px] tracking-[0.18em] uppercase font-medium text-[#121110] group-hover:text-[#9D7E51] transition-colors">
                  <span className="font-mono text-[10px]">EXPLORE SERIES</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#9D7E51]" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
