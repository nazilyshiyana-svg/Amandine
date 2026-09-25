import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { BRAND_WHATSAPP_URL, BRAND_WHATSAPP_NUMBER } from '../data/jewelryData';

export const ContactWhatsAppSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Modernist Custom Commission',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  const quickInquiries = [
    { label: 'Tension Ring Sizing & Hand Geometry', topic: 'sizing' },
    { label: 'Custom Gemstone & Emerald Commission', topic: 'custom' },
    { label: 'Private Marais Glasshouse Viewing', topic: 'viewing' },
    { label: 'Asymmetric Fluid Torc Styling Advice', topic: 'torc' },
  ];

  return (
    <section id="contact-section" className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E0D8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E5E0D8]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9D7E51]" />
              <span>SALON PRIVÉ · DIRECT ATELIER CONCIERGE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              Direct Stylist Concierge
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Connect directly with our master goldsmiths in Le Marais for private commissions, 
            natural daylight macro video, and tailored ring sizing.
          </p>
        </div>

        {/* 2-Column Split: WhatsApp Concierge Card & Direct Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Direct WhatsApp Concierge Hero Box */}
          <div className="lg:col-span-5 bg-[#F3EFE6] border border-[#D8D2C6] rounded-[1px] p-7 sm:p-9 flex flex-col justify-between shadow-xs">
            <div>
              {/* Clean unboxed status indicator */}
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#121110] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>PARIS MARAIS STYLIST ONLINE NOW</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#121110] font-normal mb-3">
                WhatsApp Live Concierge
              </h3>

              <p className="text-xs sm:text-sm text-[#59534E] leading-relaxed mb-6 font-light">
                Message our head stylist directly to receive uncompressed 4K video of pieces 
                under natural Parisian daylight, tension tolerances, or direct bespoke commissioning.
              </p>

              {/* Quick Inquiry Pre-fills */}
              <div className="mb-8">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#8C8278] block mb-2.5">
                  Instant One-Click Inquiries:
                </span>
                <div className="flex flex-col gap-2">
                  {quickInquiries.map((item, idx) => (
                    <a
                      key={idx}
                      href={`https://wa.me/${BRAND_WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(
                        `Bonjour Amandine Atelier! ✨ I would love assistance regarding: ${item.label}. Merci!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono bg-[#FAFAF8] hover:bg-[#EAE4D7] border border-[#D8D2C6] px-3.5 py-2.5 rounded-[1px] text-[#121110] transition-colors flex items-center justify-between group"
                    >
                      <span className="font-light">{item.label}</span>
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Big Main WhatsApp Button */}
            <div>
              <a
                id="contact-section-whatsapp-cta-button"
                href={BRAND_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#121110] text-[#FAFAF8] hover:bg-[#2B2724] text-xs font-mono font-medium tracking-[0.2em] uppercase rounded-[1px] transition-all flex items-center justify-center gap-2.5 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Open WhatsApp Concierge</span>
              </a>
              <span className="text-[10px] font-mono text-center block text-[#8C8278] mt-2">
                Average reply time: under 4 minutes during salon hours
              </span>
            </div>
          </div>

          {/* Right Column: Direct Atelier Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px] p-7 sm:p-9 shadow-xs flex flex-col justify-between">
            {formSubmitted ? (
              <div className="py-16 text-center">
                <div className="w-12 h-12 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-4 border border-[#2E7D32]/20">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl text-[#121110] font-normal mb-2">
                  Merci Pour Votre Message
                </h4>
                <p className="text-xs text-[#59534E] max-w-sm mx-auto mb-6 font-light">
                  Your inquiry has been received by our Marais atelier. A dedicated concierge 
                  will respond within 24 hours with complete metallurgical specifications.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 border border-[#D8D2C6] text-xs font-mono uppercase tracking-wider text-[#121110] hover:bg-[#F3EFE6] rounded-[1px]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-[#8C8278] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Camille Laurent"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#D8D2C6] text-xs text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-[#8C8278] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="camille@domain.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#D8D2C6] text-xs text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-[#8C8278] mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#D8D2C6] text-xs text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-[#8C8278] mb-1">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#D8D2C6] text-xs text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
                    >
                      <option value="Modernist Custom Commission">Modernist Custom Commission</option>
                      <option value="Tension Ring Sizing">Tension Ring Sizing & Fit</option>
                      <option value="Private Marais Viewing">Private Marais Viewing</option>
                      <option value="Shipping & Courier">Worldwide Insured Courier</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-[#8C8278] mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your desired creation, metal choice, or sizing inquiries..."
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#D8D2C6] text-xs text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#121110] text-[#FAFAF8] text-xs font-mono font-medium tracking-[0.2em] uppercase rounded-[1px] hover:bg-[#2B2724] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry to Atelier</span>
                </button>
              </form>
            )}

            {/* Atelier Contact Details Strip */}
            <div className="mt-8 pt-6 border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#8C8278]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9D7E51] shrink-0 mt-0.5" />
                <span>14 Rue de Turenne, 75004 Paris</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#9D7E51] shrink-0 mt-0.5" />
                <span>Mon–Sat: 10:00 – 19:00 CET</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#9D7E51] shrink-0 mt-0.5" />
                <span>concierge@amandine.paris</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
