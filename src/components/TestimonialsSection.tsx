import React from 'react';
import { Star, CheckCircle2, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/jewelryData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials-section" className="py-20 lg:py-28 bg-[#F3EFE6] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#D8D2C6]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-[#9D7E51]" />
              <span>VOIX DES CONNAISSEURS · ARCHITECTURAL REVIEWS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              Client Impressions
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Critiques and personal reflections from collectors in Paris, Stockholm, Tokyo, and New York.
          </p>
        </div>

        {/* Multi-Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              className="bg-[#FAFAF8] p-7 rounded-[1px] border border-[#D8D2C6] flex flex-col justify-between hover:border-[#121110] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#9D7E51]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-[#8C8278]">0{idx + 1}</span>
                </div>

                <h3 className="font-serif text-lg text-[#121110] font-normal mb-3">
                  “{review.title}”
                </h3>

                <p className="text-xs text-[#59534E] leading-relaxed mb-6 font-light italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author and Verified Status */}
              <div className="pt-4 border-t border-[#E5E0D8]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-medium tracking-wider text-[#121110] uppercase">
                    {review.author}
                  </span>
                  {review.verified && (
                    <span className="font-mono text-[9.5px] text-[#2E7D32] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between font-mono text-[10.5px] text-[#8C8278]">
                  <span>{review.location}</span>
                  <span className="truncate max-w-[140px] text-[#9D7E51]">
                    {review.productPurchased}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Trust Metrics */}
        <div className="mt-16 pt-8 border-t border-[#D8D2C6] grid grid-cols-1 sm:grid-cols-3 gap-8 text-center font-mono">
          <div>
            <div className="font-serif text-3xl text-[#121110] font-light">4.98 / 5.0</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#8C8278] mt-1">Connoisseur Satisfaction</div>
          </div>
          <div>
            <div className="font-serif text-3xl text-[#121110] font-light">3,400+</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#8C8278] mt-1">Sculptures Cast in Paris</div>
          </div>
          <div>
            <div className="font-serif text-3xl text-[#121110] font-light">100%</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#8C8278] mt-1">RJC Certified 750 Gold</div>
          </div>
        </div>

      </div>
    </section>
  );
};
