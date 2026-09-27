import React, { useEffect, useRef } from 'react';
import {
  Calendar,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Phone,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/storeData';

interface HeroProps {
  onBookClick: () => void;
  onShopClick: () => void;
  onCarpetClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onShopClick, onCarpetClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll down indicator handler
  const scrollToContent = () => {
    const next = heroRef.current?.nextElementSibling as HTMLElement | null;
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  const waText = encodeURIComponent(
    'Assalam-o-Alaikum Car Shine! I want to book a service / get a quote.'
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[600px] sm:min-h-[680px] lg:min-h-[720px] flex items-center overflow-hidden border-b border-slate-800"
      aria-label="Hero – Car Shine Detailing & Auto Store"
    >
      {/* ─── Background Image + Scrim ─────────────────────── */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/images/workshop_1.jpg"
          alt="Car Shine detailing workshop in Shahkot – professional car care"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.45) contrast(1.1)' }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Left-to-right gradient scrim for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090d]/96 via-[#09090d]/70 to-[#09090d]/20" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0f1115] to-transparent" />
      </div>

      {/* ─── Hero Content ─────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Eyebrow label */}
          <div className="flex items-center gap-2.5 mb-5 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-red-500">
              Car Shine Detailing & Auto Store — Shahkot
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[2.2rem] sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-5 animate-fade-up delay-100"
            style={{ textWrap: 'balance' } as React.CSSProperties}
          >
            Expert Car Detailing,
            <br className="hidden sm:block" />
            Polishing &amp;{' '}
            <span className="text-gradient-red">Auto Care</span>
            <br className="hidden sm:block" />
            in Shahkot.
          </h1>

          {/* Sub-text */}
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-xl animate-fade-up delay-200">
            From deep foam washes and underbody cleaning to paint correction,
            ceramic protection, genuine engine oils and professional carpet
            cleaning for homes and offices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10 animate-fade-up delay-300">
            <button
              onClick={onBookClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5"
              aria-label="Book a car service appointment"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Book a Service
            </button>

            <button
              onClick={onShopClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl transition-all hover:-translate-y-0.5"
              aria-label="Browse auto store – oils and accessories"
            >
              <ShoppingBag className="w-4 h-4 text-red-400" aria-hidden="true" />
              Shop Auto Store
            </button>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              aria-label="Chat with Car Shine on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust Pillars */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-white/10 animate-fade-up delay-400"
            aria-label="Key trust points"
          >
            {[
              { icon: ShieldCheck, text: 'Professional Detailing' },
              { icon: ShoppingBag, text: 'Genuine Oils & Products' },
              { icon: Calendar, text: 'Easy Booking' },
              { icon: MapPin, text: 'Local Shahkot Service' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs sm:text-[13px] text-slate-300">
                <span className="shrink-0 w-5 h-5 rounded-full bg-red-600/25 flex items-center justify-center">
                  <Icon className="w-3 h-3 text-red-500" aria-hidden="true" />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Scroll Down Hint ─────────────────────────────── */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors animate-fade-in delay-600"
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Explore</span>
        <ChevronDown className="w-5 h-5 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  );
};
