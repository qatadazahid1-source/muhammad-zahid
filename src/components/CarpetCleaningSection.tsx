import React, { useState } from 'react';
import { Sparkles, Check, Home, Building2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatPKR } from '../utils/helpers';
import { ServicePackage } from '../types';
import { SERVICES } from '../data/storeData';

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

  return (
    <section className="py-16 lg:py-24 bg-[#0d1017] border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Homes, Offices & Mosques</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 [text-wrap:balance]">
            Professional Carpet Cleaning in Shahkot
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Eliminate embedded dust, allergens, bacteria, and tough food/tea stains with our commercial hot foam extraction machines. Doorstep pickup and fast delivery available across Shahkot.
          </p>
        </div>

        {/* Feature Grid & Calculator Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual & Trust Pillars (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#141820]">
              <img
                src="/src/assets/images/service_carpet_cleaning_1790439927890.jpg"
                alt="Commercial carpet steam cleaning in Shahkot"
                className="w-full h-72 sm:h-80 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="bg-red-600/90 font-semibold px-2.5 py-1 rounded">
                  Shahkot Doorstep Pickup & Drop
                </span>
                <span className="text-slate-300">
                  Open 7 Days a Week
                </span>
              </div>
            </div>

            {/* Service Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#141820] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2 text-white font-semibold text-sm">
                  <Home className="w-4 h-4 text-red-500" />
                  <span>Home & Residence Carpets</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deep washing for delicate Persian rugs, shaggy carpets, bedroom runners, and prayer mats (Jaenamaz) with fiber-safe detergents.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141820] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2 text-white font-semibold text-sm">
                  <Building2 className="w-4 h-4 text-red-500" />
                  <span>Offices & Commercial Spaces</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Wall-to-wall carpet cleaning for corporate offices, banquet halls, schools, clinics, and banks with minimal business downtime.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141820] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2 text-white font-semibold text-sm">
                  <Truck className="w-4 h-4 text-red-500" />
                  <span>Doorstep Collection & Delivery</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our team collects rolled carpets directly from your location near Shahkot and returns them fresh, dry, and sealed in plastic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#141820] border border-slate-800">
                <div className="flex items-center gap-2.5 mb-2 text-white font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>Sanitized & Deodorized</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Hospital-grade anti-bacterial rinse kills dust mites, pet dander, and leaves a fresh pleasant lavender or citrus fragrance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Rate Estimator & Booking (5 cols) */}
          <div className="lg:col-span-5 bg-[#141820] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="mb-5 pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white mb-1">
                Instant Carpet Rate Estimator
              </h3>
              <p className="text-xs text-slate-400">
                Calculate transparent rates before placing your service booking.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#10131a] rounded-lg border border-slate-800 mb-5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setCalcMode('preset')}
                className={`flex-1 py-1.5 rounded transition-colors ${
                  calcMode === 'preset' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Standard Sizes
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('custom')}
                className={`flex-1 py-1.5 rounded transition-colors ${
                  calcMode === 'custom' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
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
                        ? 'border-red-500 bg-red-950/20 text-white'
                        : 'border-slate-800 bg-[#171b24] text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                    <div className="font-bold text-white tabular-nums text-sm">
                      {formatPKR(item.price)}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Length (Feet)</label>
                    <input
                      type="number"
                      min={3}
                      max={60}
                      value={customLength}
                      onChange={(e) => setCustomLength(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Width (Feet)</label>
                    <input
                      type="number"
                      min={3}
                      max={40}
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500 tabular-nums"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Total Area: <strong className="text-white tabular-nums">{customLength * customWidth} sq. ft.</strong> (Standard rate: Rs. 30/sq.ft.)
                </div>
              </div>
            )}

            {/* Quantity Counter */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#171b24] border border-slate-800 mb-6 text-xs">
              <span className="text-slate-300 font-medium">Number of Carpets:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCarpetCount(Math.max(1, carpetCount - 1))}
                  className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
                  {carpetCount}
                </span>
                <button
                  type="button"
                  onClick={() => setCarpetCount(carpetCount + 1)}
                  className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Estimated Total Calculation */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/50 mb-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-red-400 block font-medium">Estimated Cleaning Cost</span>
                <span className="text-xs text-slate-400">
                  {calculatedSqFt} sq. ft. total ({carpetCount} carpet{carpetCount > 1 ? 's' : ''})
                </span>
              </div>
              <div className="text-xl font-extrabold text-white tabular-nums">
                {formatPKR(calculatedPrice)}
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleBook}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
            >
              <span>Book Carpet Pickup & Cleaning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-[11px] text-slate-500 text-center mt-3">
              Doorstep pickup in Shahkot · Payment upon delivery after inspection
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
