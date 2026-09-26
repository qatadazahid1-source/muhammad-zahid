import React from 'react';
import { Calendar, ShoppingBag, ShieldCheck, Sparkles, MapPin, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO } from '../data/storeData';

interface HeroProps {
  onBookClick: () => void;
  onShopClick: () => void;
  onCarpetClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onShopClick, onCarpetClick }) => {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-slate-800">
      {/* Background Image with Measured Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_car_shine_detailing_1790439912564.jpg"
          alt="Car Shine Detailing Center Workshop in Shahkot"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-105"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrim for WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1016]/95 via-[#0d1016]/80 to-[#0d1016]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          
          {/* Subtle text trust marker - no pill boxes */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-red-500 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Estd 2021 · Saqlain Amin Management</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Shahkot Center</span>
          </div>

          {/* Main Headline with text-wrap balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-5 [text-wrap:balance]">
            Expert Car Detailing, Polishing & Auto Store in Shahkot.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl font-normal">
            From hydraulic underbody snow foam washes and 9H ceramic paint correction, to genuine branded engine oils, accessories, and professional carpet cleaning for homes and offices.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            <button
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-lg shadow-red-900/30 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Car Wash / Service</span>
            </button>

            <button
              onClick={onShopClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-800/90 hover:bg-slate-700 active:bg-slate-800 rounded-lg border border-slate-700 transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-red-400" />
              <span>Shop Oils & Accessories</span>
            </button>

            <button
              onClick={onCarpetClick}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Carpet Cleaning</span>
            </button>
          </div>

          {/* Authentic Real Trust Points grounded in the physical business */}
          <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
              <span>100% Genuine Oils (ZIC, Havoline, Toyota, Honda)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Main Nankana Mor, near Edhi Center</span>
            </div>
            <div className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-red-500 shrink-0" />
              <span>Direct Booking Hotline: 0316-6287979</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
