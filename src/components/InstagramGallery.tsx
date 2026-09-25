import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS, PRODUCTS } from '../data/jewelryData';
import { Product } from '../types';

interface InstagramGalleryProps {
  onOpenProduct: (product: Product) => void;
}

export const InstagramGallery: React.FC<InstagramGalleryProps> = ({ onOpenProduct }) => {
  const handlePostClick = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      onOpenProduct(product);
    }
  };

  return (
    <section id="instagram-section" className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E5E0D8]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <Instagram className="w-3.5 h-3.5 text-[#9D7E51]" />
              <span>@AMANDINE.MODERNE · DIGITAL SALON</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              Modernist Jewelry in Motion
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Real client layerings, natural daylight reflections, and behind-the-scenes 
            lost-wax casting in Le Marais.
          </p>
        </div>

        {/* Modern 4-Image Architectural Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => handlePostClick(post.productId)}
              className="group relative aspect-[3/4] rounded-[1px] overflow-hidden cursor-pointer border border-[#D8D2C6] bg-[#E8E2D7] shadow-xs"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#121110]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#C5A880]">{post.handle}</span>
                  <span className="flex items-center gap-1.5 text-white/90">
                    <Heart className="w-3.5 h-3.5 fill-current text-[#C5A880]" />
                    {post.likes.toLocaleString()}
                  </span>
                </div>

                <div>
                  <p className="font-serif text-sm text-[#FAFAF8] line-clamp-3 leading-snug mb-3">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase text-[#C5A880]">
                    <span>Inspect Creation</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#D8D2C6] bg-[#F3EFE6] text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#121110] rounded-[1px] hover:bg-[#121110] hover:text-[#FAFAF8] transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-[#9D7E51]" />
            <span>Follow @amandine.moderne</span>
          </a>
        </div>

      </div>
    </section>
  );
};
