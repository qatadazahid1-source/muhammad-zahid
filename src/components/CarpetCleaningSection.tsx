import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Home, Building2, Truck, ShieldCheck, ArrowRight, Search, Droplets, Wind, CheckCircle2 } from 'lucide-react';
import { formatPKR } from '../utils/helpers';
import { ServicePackage } from '../types';
import { SERVICES } from '../data/storeData';

const PROCESS_STEPS = [
  { num: '01', icon: Search, label: 'Inspection', desc: 'We assess the carpet type, size, stain severity, and fiber sensitivity before selecting the right cleaning method.' },
  { num: '02', icon: Droplets, label: 'Pre-treatment', desc: 'Specialized pre-spray dissolves stubborn stains, tea marks, oil, and allergens before the main extraction wash.' },
  { num: '03', icon: Sparkles, label: 'Deep Cleaning', desc: 'Industrial rotary foam scrubbers penetrate deep into the carpet pile to lift embedded dirt and bacteria.' },
  { num: '04', icon: Wind, label: 'Extraction & Dry', desc: 'High-suction wet vacuum extracts dirty water and moisture. Centrifugal spin drying speeds up drying time.' },
  { num: '05', icon: CheckCircle2, label: 'Final Inspection', desc: 'A fresh scented rinse is applied, and the carpet is inspected before being returned clean, sealed, and ready.' },
];

interface CarpetCleaningSectionProps {
  onBookCarpet: (prefilledSqFt?: number, prefilledPrice?: number) => void;
}

export const CarpetCleaningSection: React.FC<CarpetCleaningSectionProps> = ({ onBookCarpet }) => {
  // Calculator state
  const [calcMode, setCalcMode] = useState<'preset' | 'custom'>('preset');
  const [selectedPreset, setSelectedPreset] = useState<string>('medium');
  const [customLength, setCustomLength] = useState<number>(10);
  const [customWidth, setCustomWidth] = useState<number>(12);
  const [carpetCount, setCarpetCount] = useState<number>(1);

  const presets: Record<string, { label: string; desc: string; sqFt: number; price: number }> = {
    small: { label: 'Small Rug / Runner', desc: 'Approx 4 x 6 ft (24 sq. ft.)', sqFt: 24, price: 800 },
    medium: { label: 'Living Room Carpet', desc: 'Approx 6 x 9 ft (54 sq. ft.)', sqFt: 54, price: 1500 },
    large: { label: 'Large Hall Rug', desc: 'Approx 8 x 10 ft (80 sq. ft.)', sqFt: 80, price: 2400 },
    master: { label: 'Master Bedroom / Majlis', desc: 'Approx 10 x 12 ft (120 sq. ft.)', sqFt: 120, price: 3500 },
  };

  const calculatedSqFt = calcMode === 'preset'
    ? presets[selectedPreset].sqFt * carpetCount
    : customLength * customWidth * carpetCount;

  // Rate: ~Rs. 30 per sq. ft. for custom or preset package
  const calculatedPrice = calcMode === 'preset'
    ? presets[selectedPreset].price * carpetCount
    : Math.max(800, Math.round(customLength * customWidth * 30 * carpetCount));

  const handleBook = () => {
    onBookCarpet(calculatedSqFt, calculatedPrice);
  };

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[#0d1017] border-y border-border" id="carpet-cleaning" aria-labelledby="carpet-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 reveal">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-500 mb-3">
            <span className="w-5 h-px bg-red-600" />
            Homes, Offices & Mosques
            <span className="w-5 h-px bg-red-600" />
          </div>
          <h1 id="carpet-heading" className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mb-4" style={{textWrap: 'balance'} as React.CSSProperties}>
            Professional Carpet Cleaning in Shahkot
          </h1>
          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            Eliminate embedded dust, allergens, bacteria, and tough food/tea stains with our commercial hot foam extraction machines. Doorstep pickup and fast delivery available across Shahkot.
          </p>
        </div>

        {/* Feature Grid & Calculator Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual & Trust Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-border bg-surface">
              <img
                src="/src/assets/images/service_carpet_cleaning_1790439927890.jpg"
                alt="Commercial carpet steam cleaning in Shahkot"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-primary">
                <span className="bg-red-600/90 font-semibold px-2.5 py-1 rounded">
                  Shahkot Doorstep Pickup & Drop
                </span>
                <span className="text-secondary">
                  Open 7 Days a Week
                </span>
              </div>
            </div>

            {/* Service Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-center gap-2.5 mb-2 text-primary font-semibold text-sm">
                  <Home className="w-4 h-4 text-red-500" />
                  <span>Home & Residence Carpets</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  Deep washing for delicate Persian rugs, shaggy carpets, bedroom runners, and prayer mats (Jaenamaz) with fiber-safe detergents.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-center gap-2.5 mb-2 text-primary font-semibold text-sm">
                  <Building2 className="w-4 h-4 text-red-500" />
                  <span>Offices & Commercial Spaces</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  Wall-to-wall carpet cleaning for corporate offices, banquet halls, schools, clinics, and banks with minimal business downtime.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-center gap-2.5 mb-2 text-primary font-semibold text-sm">
                  <Truck className="w-4 h-4 text-red-500" />
                  <span>Doorstep Collection & Delivery</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  Our team collects rolled carpets directly from your location near Shahkot and returns them fresh, dry, and sealed in plastic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-center gap-2.5 mb-2 text-primary font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>Sanitized & Deodorized</span>
                </div>
                <p className="text-xs text-secondary leading-relaxed">
                  Hospital-grade anti-bacterial rinse kills dust mites, pet dander, and leaves a fresh pleasant lavender or citrus fragrance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Rate Estimator & Booking (5 cols) */}
          <div className="lg:col-span-5 bg-surface border border-border rounded-2xl p-6 shadow-xl">
            <div className="mb-5 pb-4 border-b border-border">
              <h3 className="text-lg font-bold text-primary mb-1">
                Instant Carpet Rate Estimator
              </h3>
              <p className="text-xs text-secondary">
                Calculate transparent rates before placing your service booking.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#10131a] rounded-lg border border-border mb-5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setCalcMode('preset')}
                className={`flex-1 py-1.5 rounded transition-colors ${
                  calcMode === 'preset' ? 'bg-red-600 text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                Standard Sizes
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('custom')}
                className={`flex-1 py-1.5 rounded transition-colors ${
                  calcMode === 'custom' ? 'bg-red-600 text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                Custom Dimensions (Ft)
              </button>
            </div>

            {calcMode === 'preset' ? (
              <div className="space-y-2.5 mb-5">
                {Object.entries(presets).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedPreset(key)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs ${
                      selectedPreset === key
                        ? 'border-red-500 bg-red-950/20 text-primary'
                        : 'border-border bg-[#171b24] text-secondary hover:border-border'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-[11px] text-secondary">{item.desc}</div>
                    </div>
                    <div className="font-bold text-primary tabular-nums text-sm">
                      {formatPKR(item.price)}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-secondary mb-1">Length (Feet)</label>
                    <input
                      type="number"
                      min={3}
                      max={60}
                      value={customLength}
                      onChange={(e) => setCustomLength(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-red-500 tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-secondary mb-1">Width (Feet)</label>
                    <input
                      type="number"
                      min={3}
                      max={40}
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:border-red-500 tabular-nums"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-secondary">
                  Total Area: <strong className="text-primary tabular-nums">{customLength * customWidth} sq. ft.</strong> (Standard rate: Rs. 30/sq.ft.)
                </div>
              </div>
            )}

            {/* Quantity Counter */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#171b24] border border-border mb-6 text-xs">
              <span className="text-secondary font-medium">Number of Carpets:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCarpetCount(Math.max(1, carpetCount - 1))}
                  className="w-7 h-7 rounded bg-surface hover:bg-surface-elevated text-primary font-bold flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-primary tabular-nums">
                  {carpetCount}
                </span>
                <button
                  type="button"
                  onClick={() => setCarpetCount(carpetCount + 1)}
                  className="w-7 h-7 rounded bg-surface hover:bg-surface-elevated text-primary font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Estimated Total Calculation */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 mb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-red-400 block font-medium">Estimated Cleaning Cost</span>
                <span className="text-xs text-secondary">
                  {calculatedSqFt} sq. ft. total ({carpetCount} carpet{carpetCount > 1 ? 's' : ''})
                </span>
              </div>
              <div className="text-xl font-extrabold text-primary tabular-nums">
                {formatPKR(calculatedPrice)}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleBook}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-primary font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
            >
              <span>Book Carpet Pickup & Cleaning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-[11px] text-muted text-center mt-3">
              Doorstep pickup in Shahkot · Payment upon delivery after inspection
            </p>
          </div>

        </div>

        {/* Cleaning Process Timeline */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="text-center mb-10 reveal">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-red-500 mb-2">
              <span className="w-5 h-px bg-red-600" />
              Our Process
              <span className="w-5 h-px bg-red-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">How We Clean Your Carpets</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROCESS_STEPS.map(({ num, icon: Icon, label, desc }, i) => (
              <div key={num} className={`reveal reveal-delay-${Math.min(i + 1, 4)} flex flex-col items-center text-center p-4 rounded-xl bg-surface border border-border hover:border-red-600/30 card-hover`}>
                <div className="w-12 h-12 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="text-2xl font-black text-red-600/20 leading-none mb-1">{num}</div>
                <h3 className="text-xs font-bold text-primary mb-1.5">{label}</h3>
                <p className="text-[11px] text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
