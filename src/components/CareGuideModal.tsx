import React from 'react';
import { X, Sparkles, ShieldCheck, Droplets, Sun, HeartHandshake } from 'lucide-react';

interface CareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareGuideModal: React.FC<CareGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24201D]/60 backdrop-blur-xs transition-all">
      <div className="relative bg-[#FAF7F2] border border-[#DFD3C3] rounded-sm max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5D5249] hover:text-[#24201D] bg-[#FAF7F2] rounded-full border border-[#DFD3C3]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#9F8259] font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preserving Your Heirlooms</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#24201D] font-normal">
            Jewellery Care Rituals
          </h3>
        </div>

        <div className="space-y-4 text-xs text-[#5D5249]">
          <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#DFD3C3] flex items-start gap-3">
            <Sun className="w-5 h-5 text-[#8B7049] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#24201D] block font-medium mb-1">
                The “Last On, First Off” Golden Rule
              </strong>
              <p className="leading-relaxed">
                Always apply cosmetics, perfumes, lotions, and hairsprays before putting on your Amandine jewellery. Chemical residues can dull the golden luster and compromise organic freshwater pearls.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#DFD3C3] flex items-start gap-3">
            <Droplets className="w-5 h-5 text-[#8B7049] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#24201D] block font-medium mb-1">
                Water & Active Lifestyles
              </strong>
              <p className="leading-relaxed">
                Remove your rings, earrings, and necklaces before swimming in chlorinated pools or ocean saltwater, showering, or intense physical workouts to protect the thick gold vermeil finish.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#DFD3C3] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#8B7049] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#24201D] block font-medium mb-1">
                Gentle Cleansing Ritual
              </strong>
              <p className="leading-relaxed">
                Buff softly with our complimentary 100% cotton micro-polishing cloth. If needed, rinse with lukewarm filtered water and a drop of pH-neutral soap; pat thoroughly dry before storing.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#DFD3C3] flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#8B7049] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#24201D] block font-medium mb-1">
                Lifetime Atelier Spa Service
              </strong>
              <p className="leading-relaxed">
                All Amandine pieces include complimentary annual ultrasonic deep cleaning, prong checking, and re-polishing at our Paris boutique.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#EAE1D5] text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#24201D] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium rounded-xs hover:bg-[#3D3631]"
          >
            Understood & Close
          </button>
        </div>

      </div>
    </div>
  );
};
