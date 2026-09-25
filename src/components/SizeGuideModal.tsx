import React, { useState } from 'react';
import { X, Ruler, Sparkles, MessageCircle } from 'lucide-react';
import { BRAND_WHATSAPP_URL } from '../data/jewelryData';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'rings' | 'necklaces'>('rings');

  if (!isOpen) return null;

  const ringSizes = [
    { us: 'US 5', uk: 'J ½', eu: '49', mm: '15.7 mm', circ: '49.3 mm' },
    { us: 'US 6', uk: 'M', eu: '52', mm: '16.5 mm', circ: '51.8 mm' },
    { us: 'US 7', uk: 'O', eu: '54', mm: '17.3 mm', circ: '54.4 mm' },
    { us: 'US 8', uk: 'Q', eu: '57', mm: '18.1 mm', circ: '56.9 mm' },
    { us: 'US 9', uk: 'S', eu: '59', mm: '19.0 mm', circ: '59.5 mm' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24201D]/60 backdrop-blur-xs transition-all">
      <div className="relative bg-[#FAF7F2] border border-[#DFD3C3] rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        
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
            <Ruler className="w-3.5 h-3.5" />
            <span>Atelier Measurement Guide</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#24201D] font-normal">
            Sizing & Proportions
          </h3>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#EAE1D5] mb-6 justify-center">
          <button
            onClick={() => setActiveTab('rings')}
            className={`pb-3 px-6 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors ${
              activeTab === 'rings'
                ? 'border-[#8B7049] text-[#24201D]'
                : 'border-transparent text-[#7A6E64] hover:text-[#24201D]'
            }`}
          >
            Ring Sizing Chart
          </button>
          <button
            onClick={() => setActiveTab('necklaces')}
            className={`pb-3 px-6 text-xs uppercase tracking-widest font-medium border-b-2 transition-colors ${
              activeTab === 'necklaces'
                ? 'border-[#8B7049] text-[#24201D]'
                : 'border-transparent text-[#7A6E64] hover:text-[#24201D]'
            }`}
          >
            Necklace Chain Lengths
          </button>
        </div>

        {/* Tab 1: Rings */}
        {activeTab === 'rings' && (
          <div className="space-y-6">
            <div className="overflow-x-auto border border-[#DFD3C3] rounded-xs bg-[#FDFCFA]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5EFE6] border-b border-[#DFD3C3] text-[10px] uppercase tracking-wider text-[#5D5249]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">US Size</th>
                    <th className="py-2.5 px-4 font-semibold">UK / AU</th>
                    <th className="py-2.5 px-4 font-semibold">EU / FR</th>
                    <th className="py-2.5 px-4 font-semibold">Diameter (mm)</th>
                    <th className="py-2.5 px-4 font-semibold">Circumference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE1D5] text-[#24201D]">
                  {ringSizes.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF7F2]">
                      <td className="py-2.5 px-4 font-medium text-[#8B7049]">{row.us}</td>
                      <td className="py-2.5 px-4">{row.uk}</td>
                      <td className="py-2.5 px-4">{row.eu}</td>
                      <td className="py-2.5 px-4">{row.mm}</td>
                      <td className="py-2.5 px-4">{row.circ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-[#F5EFE6] rounded-xs border border-[#DFD3C3] text-xs text-[#5D5249] space-y-2">
              <strong className="text-[#24201D] block">How to find your accurate ring size:</strong>
              <p>1. Wrap a narrow strip of paper or string snugly around the base of your intended finger.</p>
              <p>2. Mark the exact point where the ends overlap and measure the length in millimeters to find your circumference.</p>
              <p>3. If you fall between two sizes, we recommend selecting the larger size for comfortable daily wear.</p>
            </div>
          </div>
        )}

        {/* Tab 2: Necklaces */}
        {activeTab === 'necklaces' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FDFCFA] border border-[#DFD3C3] rounded-xs">
                <span className="font-serif text-base text-[#24201D] font-normal block mb-1">14" – 15" Choker</span>
                <p className="text-xs text-[#6E6359]">Rests snugly against the base of the throat. Ideal for seed pearls and liquid herringbone chains.</p>
              </div>
              <div className="p-4 bg-[#FDFCFA] border border-[#DFD3C3] rounded-xs">
                <span className="font-serif text-base text-[#24201D] font-normal block mb-1">16" Collarbone</span>
                <p className="text-xs text-[#6E6359]">Falls gently right along the collarbone. The classic everyday length for solitaire pendants.</p>
              </div>
              <div className="p-4 bg-[#FDFCFA] border border-[#DFD3C3] rounded-xs">
                <span className="font-serif text-base text-[#24201D] font-normal block mb-1">18" Princess</span>
                <p className="text-xs text-[#6E6359]">Sits gracefully an inch or two below the collarbone. Complements scoop, V-neck, and button-down shirts.</p>
              </div>
              <div className="p-4 bg-[#FDFCFA] border border-[#DFD3C3] rounded-xs">
                <span className="font-serif text-base text-[#24201D] font-normal block mb-1">20" – 22" Matinée</span>
                <p className="text-xs text-[#6E6359]">Extends to the top of the décolletage. Perfect for layering with shorter chains and larger talismans.</p>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Assistance Footer */}
        <div className="mt-6 pt-4 border-t border-[#EAE1D5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#6E6359]">Unsure about your exact fit?</span>
          <a
            href={BRAND_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#24201D] text-[#FAF7F2] rounded-xs uppercase tracking-wider text-[10px] hover:bg-[#3D3631]"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366]" />
            <span>Consult Stylist on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
