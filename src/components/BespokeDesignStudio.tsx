import React, { useState, useMemo } from 'react';
import { Sparkles, Check, MessageCircle, ShoppingBag, RotateCw, Gem, Shield, Compass, Sliders, Layers } from 'lucide-react';
import { Product, CurrencyConfig } from '../types';
import { formatPrice } from '../utils/formatters';
import { BRAND_WHATSAPP_NUMBER } from '../data/jewelryData';

interface BespokeDesignStudioProps {
  currency: CurrencyConfig;
  onAddToCart: (product: Product, metal?: string, size?: string) => void;
  onOpenQuickView: (product: Product) => void;
}

type ModernSilhouette = 'orbital-ring' | 'brutalist-signet' | 'fluid-torc' | 'mobius-cuff';

interface MetalOption {
  id: string;
  name: string;
  code: string;
  colorHex: string;
  gradient: string;
  priceDelta: number;
  hallmark: string;
  hardness: string;
}

interface GemOption {
  id: string;
  name: string;
  colorName: string;
  baseHex: string;
  glowHex: string;
  cut: string;
  priceDelta: number;
}

interface SettingOption {
  id: string;
  name: string;
  subtitle: string;
  priceDelta: number;
}

interface CaratOption {
  carat: string;
  scaleFactor: number;
  label: string;
}

const METALS: MetalOption[] = [
  {
    id: 'yellow-gold',
    name: '18k Recycled Solid Yellow Gold',
    code: '750 YG',
    colorHex: '#D4AF37',
    gradient: 'from-[#F3DE9A] via-[#D8AD3D] to-[#997316]',
    priceDelta: 0,
    hallmark: '750 Au · Atelier Marais',
    hardness: '160 HV (Hardened)',
  },
  {
    id: 'platinum',
    name: '950 Solid Modern Platinum',
    code: '950 PT',
    colorHex: '#E2E6E9',
    gradient: 'from-[#FFFFFF] via-[#D5DAE0] to-[#8C95A0]',
    priceDelta: 170,
    hallmark: '950 Pt · Tension Grade',
    hardness: '210 HV (High Density)',
  },
  {
    id: 'rose-gold',
    name: '18k Warm Alabaster Rose Gold',
    code: '750 RG',
    colorHex: '#E6A897',
    gradient: 'from-[#FAD2C7] via-[#DE9381] to-[#A35948]',
    priceDelta: 30,
    hallmark: '750 Au · Rose Satine',
    hardness: '165 HV',
  },
  {
    id: 'white-gold',
    name: '18k Rhodium Mirror White Gold',
    code: '750 WG',
    colorHex: '#D8DFE6',
    gradient: 'from-[#F5F8FA] via-[#C8D1DC] to-[#7B8796]',
    priceDelta: 45,
    hallmark: '750 Au · Rhodium Miroir',
    hardness: '175 HV',
  },
];

const GEMSTONES: GemOption[] = [
  {
    id: 'diamond',
    name: 'Ethical Brilliant Diamond',
    colorName: 'Ice VS1 / F Color',
    baseHex: '#EBF4FA',
    glowHex: '#FFFFFF',
    cut: 'Ideal Brilliant Round Cut',
    priceDelta: 340,
  },
  {
    id: 'emerald',
    name: 'Colombian Vivid Emerald',
    colorName: 'Deep Jardin Green',
    baseHex: '#087F5B',
    glowHex: '#20C997',
    cut: 'Octagonal Step Bevel Cut',
    priceDelta: 290,
  },
  {
    id: 'keshi',
    name: 'Organic Baroque Keshi Pearl',
    colorName: 'Luminescent Raw Nacre',
    baseHex: '#F8F6F0',
    glowHex: '#E8DCC4',
    cut: 'Uncultivated Asymmetric Luster',
    priceDelta: 180,
  },
  {
    id: 'sapphire',
    name: 'Ceylon Royal Midnight Sapphire',
    colorName: 'Velvet Midnight Blue',
    baseHex: '#183153',
    glowHex: '#3B5998',
    cut: 'Cushion Precision Cut',
    priceDelta: 260,
  },
  {
    id: 'monolithic',
    name: 'Monolithic Solid Gold (No Stone)',
    colorName: 'Pure Sculpted Geometry',
    baseHex: '#D4AF37',
    glowHex: '#F3DE9A',
    cut: 'Hand-Polished Mirror Plane',
    priceDelta: 0,
  },
];

const SETTINGS: SettingOption[] = [
  {
    id: 'tension',
    name: 'Tension Open-Air Suspension',
    subtitle: 'Zero prongs, gem floats between calculated knife-edge rails',
    priceDelta: 90,
  },
  {
    id: 'flush-bezel',
    name: 'Modernist Flush Bezel',
    subtitle: 'Polished flush with the metal plane for brutalist seamlessness',
    priceDelta: 50,
  },
  {
    id: 'cantilever',
    name: 'Architectural Cantilever Bridge',
    subtitle: 'Split-band bridge elevating the stone 5mm above the skin',
    priceDelta: 75,
  },
  {
    id: 'keystone-pivot',
    name: 'Kinetic Asymmetric Keystone',
    subtitle: 'Articulated floating pivot that reacts naturally to movement',
    priceDelta: 60,
  },
];

const CARAT_OPTIONS: CaratOption[] = [
  { carat: '0.40 ct', scaleFactor: 0.85, label: '0.40 ct · Minimalist Precision' },
  { carat: '0.80 ct', scaleFactor: 1.0, label: '0.80 ct · Atelier Standard' },
  { carat: '1.40 ct', scaleFactor: 1.25, label: '1.40 ct · Modernist Statement' },
  { carat: '2.20 ct', scaleFactor: 1.5, label: '2.20 ct · Haute Sculpture' },
];

export const BespokeDesignStudio: React.FC<BespokeDesignStudioProps> = ({
  currency,
  onAddToCart,
}) => {
  const [silhouette, setSilhouette] = useState<ModernSilhouette>('orbital-ring');
  const [selectedMetal, setSelectedMetal] = useState<MetalOption>(METALS[0]);
  const [selectedGem, setSelectedGem] = useState<GemOption>(GEMSTONES[0]);
  const [selectedSetting, setSelectedSetting] = useState<SettingOption>(SETTINGS[0]);
  const [selectedCarat, setSelectedCarat] = useState<CaratOption>(CARAT_OPTIONS[1]);
  const [engravingText, setEngravingText] = useState<string>('PARIS · MMXXVI');
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [viewPerspective, setViewPerspective] = useState<'3d' | 'top' | 'elevation'>('3d');
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  // Base price for each modern silhouette
  const basePrices: Record<ModernSilhouette, number> = {
    'orbital-ring': 450,
    'brutalist-signet': 490,
    'fluid-torc': 480,
    'mobius-cuff': 420,
  };

  const calculatedPrice = useMemo(() => {
    const base = basePrices[silhouette];
    const metalCost = selectedMetal.priceDelta;
    const gemCost = Math.round(selectedGem.priceDelta * selectedCarat.scaleFactor);
    const settingCost = selectedSetting.priceDelta;
    return base + metalCost + gemCost + settingCost;
  }, [silhouette, selectedMetal, selectedGem, selectedSetting, selectedCarat]);

  const handleBespokeAddToCart = () => {
    const bespokeProduct: Product = {
      id: `bespoke-${silhouette}-${Date.now()}`,
      name: `Amandine Bespoke ${
        silhouette === 'orbital-ring'
          ? "L'Orbite Dual-Band"
          : silhouette === 'brutalist-signet'
          ? "L'Octogone Brutalist"
          : silhouette === 'fluid-torc'
          ? 'Le Torc Ondulant'
          : 'Le Ruban Mobius'
      }`,
      tagline: `Custom ${selectedCarat.carat} ${selectedGem.name} in ${selectedMetal.name}`,
      collection: 'Atelier Sur Mesure (Bespoke)',
      category:
        silhouette === 'orbital-ring' || silhouette === 'brutalist-signet'
          ? 'rings'
          : silhouette === 'fluid-torc'
          ? 'necklaces'
          : 'bracelets',
      price: calculatedPrice,
      rating: 5.0,
      reviewCount: 1,
      description: `Bespoke modern architectural creation handcrafted in Paris. Configured with ${selectedMetal.name} (${selectedMetal.hallmark}), ${selectedSetting.name}, and ${selectedCarat.carat} ${selectedGem.name}. Secret inscription: "${engravingText}".`,
      materials: `${selectedMetal.name} (${selectedMetal.code}), ${selectedGem.name} (${selectedCarat.carat})`,
      karat: selectedMetal.name,
      hallmark: `${selectedMetal.code} · ${selectedSetting.name.split(' ')[0]}`,
      dimensions: `Custom Atelier Specification · Engraving: "${engravingText}"`,
      images: [
        silhouette === 'orbital-ring'
          ? '/src/assets/images/modern_orbital_ring_1790242934161.jpg'
          : silhouette === 'brutalist-signet'
          ? '/src/assets/images/modern_emerald_signet_1790242966089.jpg'
          : silhouette === 'fluid-torc'
          ? '/src/assets/images/modern_fluid_torc_1790242950576.jpg'
          : '/src/assets/images/sculpted_cuff_bangle_1790241579711.jpg',
      ],
      metalOptions: [selectedMetal.name],
      sizes: ['Custom Tailored'],
      inStock: true,
    };

    onAddToCart(bespokeProduct, selectedMetal.name, 'Tailored to Client');
    setIsAddedToBag(true);
    setTimeout(() => setIsAddedToBag(false), 2400);
  };

  const handleWhatsAppConsult = () => {
    const text = `Bonjour Amandine Master Goldsmith! 📐✨\n\nI have configured a custom modern architectural design in your Bespoke Studio:\n\n• Silhouette: ${silhouette.toUpperCase()}\n• Metal: ${selectedMetal.name} (${selectedMetal.code})\n• Gemstone: ${selectedCarat.carat} ${selectedGem.name}\n• Setting Architecture: ${selectedSetting.name}\n• Laser Engraving: "${engravingText}"\n• Estimated Quote: $${calculatedPrice} USD\n\nCould we review the metallurgical CAD tolerances and finalize this creation? Merci!`;
    const url = `https://wa.me/${BRAND_WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="bespoke-studio-section" className="py-20 lg:py-28 bg-[#FAFAF8] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Studio Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#E5E0D8]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] text-[#8C8278] mb-2">
              <Compass className="w-4 h-4 text-[#9D7E51]" />
              <span>ATELIER SUR MESURE · BESPOKE CAD STUDIO</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121110] font-light tracking-tight">
              Design Your Modern Jewellery
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#59534E] max-w-md leading-relaxed font-light">
            Engineer your one-of-a-kind wearable modern sculpture. Choose architectural 
            silhouettes, tension physics, ethical gems, and personalized laser inscription.
          </p>
        </div>

        {/* Studio Workspace: Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Live CAD Vector Visualizer */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-[#F3EFE6] border border-[#D8D2C6] rounded-[2px] p-5 sm:p-7 relative shadow-sm">
              
              {/* Top Visualizer Controls */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D8D2C6]/80 text-[10px] font-mono uppercase tracking-wider text-[#59534E]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9D7E51] animate-ping" />
                  <span>CAD VIEW: {viewPerspective.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowWireframe(!showWireframe)}
                    className={`px-2.5 py-1 rounded-[1px] border transition-colors ${
                      showWireframe
                        ? 'bg-[#121110] text-[#FAFAF8] border-[#121110]'
                        : 'bg-[#FAFAF8] text-[#121110] border-[#D8D2C6]'
                    }`}
                  >
                    {showWireframe ? 'Wireframe [ON]' : 'Wireframe [OFF]'}
                  </button>
                  <button
                    onClick={() => {
                      const next = viewPerspective === '3d' ? 'top' : viewPerspective === 'top' ? 'elevation' : '3d';
                      setViewPerspective(next);
                    }}
                    className="p-1 hover:text-[#121110] transition-colors"
                    title="Rotate Perspective"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic SVG CAD Stage */}
              <div className="relative aspect-square max-h-[380px] w-full flex items-center justify-center bg-[#FAFAF8] border border-[#D8D2C6] rounded-[1px] overflow-hidden p-6">
                
                {/* Architectural Grid Background */}
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, #121110 1px, transparent 1px), linear-gradient(to bottom, #121110 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Perspective & Blueprint Visual SVG */}
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-full max-w-[280px] max-h-[280px] transition-all duration-500 drop-shadow-md"
                >
                  <defs>
                    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={selectedMetal.colorHex} stopOpacity="1" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor={selectedMetal.colorHex} stopOpacity="0.7" />
                    </linearGradient>
                    <radialGradient id="gemGlow" cx="40%" cy="40%" r="60%">
                      <stop offset="0%" stopColor={selectedGem.glowHex} />
                      <stop offset="70%" stopColor={selectedGem.baseHex} />
                      <stop offset="100%" stopColor="#0B1320" stopOpacity="0.9" />
                    </radialGradient>
                  </defs>

                  {/* Silhouette Specific Architectural Vectors */}
                  {silhouette === 'orbital-ring' && (
                    <g transform="translate(150, 150)">
                      {/* Orbital Ellipse 1 */}
                      <ellipse
                        rx="85"
                        ry="42"
                        transform="rotate(-25)"
                        fill="none"
                        stroke={showWireframe ? '#9D7E51' : 'url(#metalGrad)'}
                        strokeWidth={showWireframe ? '1.5' : '10'}
                        strokeDasharray={showWireframe ? '4 3' : 'none'}
                      />
                      {/* Orbital Ellipse 2 (Intersecting) */}
                      <ellipse
                        rx="85"
                        ry="42"
                        transform="rotate(25)"
                        fill="none"
                        stroke={showWireframe ? '#9D7E51' : 'url(#metalGrad)'}
                        strokeWidth={showWireframe ? '1.5' : '10'}
                        strokeDasharray={showWireframe ? '4 3' : 'none'}
                      />
                      {/* Tension Held Keystone Gemstone */}
                      {selectedGem.id !== 'monolithic' && (
                        <g transform={`scale(${selectedCarat.scaleFactor})`}>
                          <circle
                            cx="0"
                            cy="-18"
                            r="18"
                            fill="url(#gemGlow)"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                          {/* Facet reflections */}
                          <polygon
                            points="0,-30 12,-18 0,-6 -12,-18"
                            fill="#FFFFFF"
                            fillOpacity="0.3"
                          />
                        </g>
                      )}
                      {/* Secret Engraving along lower arc */}
                      <text
                        x="0"
                        y="58"
                        textAnchor="middle"
                        fill="#8C8278"
                        fontSize="7"
                        fontFamily="monospace"
                        letterSpacing="2"
                      >
                        {engravingText}
                      </text>
                    </g>
                  )}

                  {silhouette === 'brutalist-signet' && (
                    <g transform="translate(150, 150)">
                      {/* Lower Ring Band */}
                      <path
                        d="M -60,0 C -60,80 60,80 60,0"
                        fill="none"
                        stroke={showWireframe ? '#9D7E51' : 'url(#metalGrad)'}
                        strokeWidth={showWireframe ? '2' : '12'}
                      />
                      {/* Octagonal Beveled Top Face */}
                      <polygon
                        points="-45,-60 45,-60 70,-20 45,20 -45,20 -70,-20"
                        fill={showWireframe ? '#F3EFE6' : 'url(#metalGrad)'}
                        stroke="#121110"
                        strokeWidth="1.5"
                      />
                      {/* Flush Bezel Gem */}
                      {selectedGem.id !== 'monolithic' ? (
                        <g transform={`scale(${selectedCarat.scaleFactor})`}>
                          <polygon
                            points="-25,-40 25,-40 38,-20 25,0 -25,0 -38,-20"
                            fill="url(#gemGlow)"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                          />
                        </g>
                      ) : (
                        <circle cx="0" cy="-20" r="14" fill="#D4AF37" fillOpacity="0.4" />
                      )}
                      {/* Inscription */}
                      <text
                        x="0"
                        y="62"
                        textAnchor="middle"
                        fill="#8C8278"
                        fontSize="7"
                        fontFamily="monospace"
                        letterSpacing="2"
                      >
                        {engravingText}
                      </text>
                    </g>
                  )}

                  {silhouette === 'fluid-torc' && (
                    <g transform="translate(150, 150)">
                      {/* Asymmetric Open Collar Arc */}
                      <path
                        d="M -75,40 C -95,-70 95,-70 75,40 C 65,80 30,85 0,85"
                        fill="none"
                        stroke={showWireframe ? '#9D7E51' : 'url(#metalGrad)'}
                        strokeWidth={showWireframe ? '2' : '10'}
                        strokeLinecap="round"
                      />
                      {/* Suspended Organic Pearl / Keystone */}
                      {selectedGem.id !== 'monolithic' && (
                        <g transform={`translate(-60, 48) scale(${selectedCarat.scaleFactor})`}>
                          <ellipse
                            cx="0"
                            cy="0"
                            rx="18"
                            ry="24"
                            fill="url(#gemGlow)"
                            stroke="#FFFFFF"
                            strokeWidth="1"
                          />
                        </g>
                      )}
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fill="#8C8278"
                        fontSize="7"
                        fontFamily="monospace"
                        letterSpacing="1.5"
                      >
                        {engravingText}
                      </text>
                    </g>
                  )}

                  {silhouette === 'mobius-cuff' && (
                    <g transform="translate(150, 150)">
                      {/* Mobius Ribbon Loop */}
                      <path
                        d="M -90,-20 C -70,-65 70,-65 90,-20 C 110,25 -20,25 0,55 C 20,85 90,60 90,30"
                        fill="none"
                        stroke={showWireframe ? '#9D7E51' : 'url(#metalGrad)'}
                        strokeWidth={showWireframe ? '2' : '11'}
                        strokeLinecap="round"
                      />
                      {selectedGem.id !== 'monolithic' && (
                        <circle
                          cx="0"
                          cy="55"
                          r={10 * selectedCarat.scaleFactor}
                          fill="url(#gemGlow)"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                        />
                      )}
                      <text
                        x="0"
                        y="-15"
                        textAnchor="middle"
                        fill="#8C8278"
                        fontSize="7"
                        fontFamily="monospace"
                        letterSpacing="2"
                      >
                        {engravingText}
                      </text>
                    </g>
                  )}
                </svg>

                {/* Subtle Coordinates Tag */}
                <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#8C8278]">
                  CAD-REF: AM-{silhouette.slice(0, 3).toUpperCase()}-{selectedMetal.code}
                </div>
              </div>

              {/* Technical Metallurgy Spec Sheet */}
              <div className="mt-4 pt-3 border-t border-[#D8D2C6] grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#8C8278] block">Hardness</span>
                  <span className="text-xs font-mono text-[#121110] font-medium">{selectedMetal.hardness}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#8C8278] block">Hallmark</span>
                  <span className="text-xs font-mono text-[#121110] font-medium">{selectedMetal.code}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#8C8278] block">Stone Scale</span>
                  <span className="text-xs font-mono text-[#121110] font-medium">{selectedCarat.carat}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase text-[#8C8278] block">Tension Spec</span>
                  <span className="text-xs font-mono text-[#121110] font-medium">420 MPa Safe</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Configuration Modules */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Step 1: Silhouette Architecture */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8278]">
                  01 / SILHOUETTE ARCHITECTURE
                </span>
                <span className="text-xs font-serif italic text-[#9D7E51]">Wearable Geometry</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'orbital-ring', name: "L'Orbite Dual Band", type: 'Ring', desc: 'Floating orbital axes' },
                  { id: 'brutalist-signet', name: "L'Octogone Signet", type: 'Ring', desc: 'Chamfered brutalist face' },
                  { id: 'fluid-torc', name: 'Le Torc Ondulant', type: 'Collar', desc: 'Asymmetric molten collar' },
                  { id: 'mobius-cuff', name: 'Le Ruban Mobius', type: 'Cuff', desc: 'Continuous mathematical twist' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSilhouette(item.id as ModernSilhouette)}
                    className={`p-3.5 text-left border rounded-[1px] transition-all ${
                      silhouette === item.id
                        ? 'border-[#121110] bg-[#121110] text-[#FAFAF8]'
                        : 'border-[#D8D2C6] bg-[#FAFAF8] text-[#121110] hover:border-[#121110]'
                    }`}
                  >
                    <div className="font-serif text-sm font-medium">{item.name}</div>
                    <div className={`text-[10px] mt-0.5 ${silhouette === item.id ? 'text-[#C5A880]' : 'text-[#7A746E]'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Precious Metal Alloy */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8278]">
                  02 / PREVIOUS METAL ALLOY
                </span>
                <span className="text-xs font-serif text-[#121110] font-normal">{selectedMetal.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {METALS.map((metal) => (
                  <button
                    key={metal.id}
                    onClick={() => setSelectedMetal(metal)}
                    className={`p-3 border rounded-[1px] text-left transition-all ${
                      selectedMetal.id === metal.id
                        ? 'border-[#121110] bg-[#F3EFE6] ring-1 ring-[#121110]'
                        : 'border-[#D8D2C6] bg-[#FAFAF8] hover:border-[#121110]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-3.5 h-3.5 rounded-full border border-[#D8D2C6]" style={{ backgroundColor: metal.colorHex }} />
                      <span className="font-mono text-[10px] uppercase font-semibold text-[#121110]">{metal.code}</span>
                    </div>
                    <div className="text-[11px] text-[#121110] font-medium leading-tight">{metal.name.split(' ')[1] || metal.name}</div>
                    <div className="text-[9.5px] text-[#8C8278] mt-0.5">
                      {metal.priceDelta === 0 ? 'Standard' : `+$${metal.priceDelta}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Keystone Gemstone */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8278]">
                  03 / KEYSTONE GEMSTONE & MINERAL
                </span>
                <span className="text-xs font-serif italic text-[#9D7E51]">{selectedGem.cut}</span>
              </div>
              <div className="space-y-2">
                {GEMSTONES.map((gem) => (
                  <button
                    key={gem.id}
                    onClick={() => setSelectedGem(gem)}
                    className={`w-full p-3 border rounded-[1px] text-left flex items-center justify-between transition-all ${
                      selectedGem.id === gem.id
                        ? 'border-[#121110] bg-[#F3EFE6]'
                        : 'border-[#D8D2C6] bg-[#FAFAF8] hover:border-[#121110]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: gem.baseHex }}
                      />
                      <div>
                        <div className="font-serif text-sm text-[#121110] font-medium">{gem.name}</div>
                        <div className="text-[10px] text-[#7A746E]">{gem.colorName} · {gem.cut}</div>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-[#121110]">
                      {gem.priceDelta === 0 ? 'Included' : `+$${gem.priceDelta}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Setting Engineering & Carat Scale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8278] block mb-2">
                  04 / SETTING ARCHITECTURE
                </span>
                <select
                  value={selectedSetting.id}
                  onChange={(e) => {
                    const found = SETTINGS.find((s) => s.id === e.target.value);
                    if (found) setSelectedSetting(found);
                  }}
                  className="w-full p-2.5 bg-[#FAFAF8] border border-[#D8D2C6] text-xs text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
                >
                  {SETTINGS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (+${s.priceDelta})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#7A746E] mt-1.5">{selectedSetting.subtitle}</p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8278] block mb-2">
                  05 / STONE CARAT SCALE
                </span>
                <select
                  value={selectedCarat.carat}
                  onChange={(e) => {
                    const found = CARAT_OPTIONS.find((c) => c.carat === e.target.value);
                    if (found) setSelectedCarat(found);
                  }}
                  className="w-full p-2.5 bg-[#FAFAF8] border border-[#D8D2C6] text-xs text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
                >
                  {CARAT_OPTIONS.map((c) => (
                    <option key={c.carat} value={c.carat}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-[#7A746E] mt-1.5">Precision calibrated for balanced weight distribution.</p>
              </div>
            </div>

            {/* Step 5: Laser Inscription */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8278] block mb-2">
                06 / SECRET INNER LASER INSCRIPTION (COMPLIMENTARY)
              </span>
              <input
                type="text"
                value={engravingText}
                maxLength={24}
                onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                placeholder="E.G. PARIS · MMXXVI · AMOUR"
                className="w-full p-3 bg-[#FAFAF8] border border-[#D8D2C6] text-xs font-mono text-[#121110] rounded-[1px] focus:outline-none focus:border-[#121110]"
              />
              <p className="text-[10px] text-[#7A746E] mt-1">Laser engraved 0.15mm deep along the inner architectural curvature.</p>
            </div>

            {/* Price Quote & Direct Goldsmith Action Bar */}
            <div className="pt-6 border-t border-[#E5E0D8]">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#8C8278] block">
                    TOTAL ESTIMATED QUOTE
                  </span>
                  <div className="font-serif text-3xl text-[#121110] font-normal">
                    {formatPrice(calculatedPrice, currency)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10.5px] text-[#25D366] font-medium block">
                    Atelier Marais Ready
                  </span>
                  <span className="text-[10px] text-[#8C8278]">
                    Lead time: 7–10 days hand casting
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  id="bespoke-add-to-bag-button"
                  onClick={handleBespokeAddToCart}
                  className={`w-full py-4 text-xs font-medium uppercase tracking-[0.2em] rounded-[1px] transition-all flex items-center justify-center gap-2 ${
                    isAddedToBag
                      ? 'bg-[#2E7D32] text-white'
                      : 'bg-[#121110] text-[#FAFAF8] hover:bg-[#2B2724]'
                  }`}
                >
                  {isAddedToBag ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Custom Piece Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                      <span>Add Bespoke to Bag</span>
                    </>
                  )}
                </button>

                <button
                  id="bespoke-whatsapp-consult-button"
                  onClick={handleWhatsAppConsult}
                  className="w-full py-4 bg-[#F3EFE6] border border-[#D8D2C6] text-[#121110] text-xs font-medium uppercase tracking-[0.18em] rounded-[1px] hover:bg-[#EAE4D7] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Consult Goldsmith</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
