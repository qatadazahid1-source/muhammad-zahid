import React from 'react';
import { BUSINESS_INFO } from '../data/storeData';
import { Phone, MapPin, Clock, MessageCircle, ShieldCheck, ArrowRight, Calendar } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const waText = encodeURIComponent(
    'Assalam-o-Alaikum Car Shine! I want to inquire about your services.'
  );

  return (
    <footer className="bg-[#080b0f] border-t border-border text-secondary text-xs" aria-label="Site footer">

      {/* ─── Pre-footer CTA Strip ───────────────────────────────── */}
      <div className="border-b border-border bg-[#0d1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-primary font-bold text-base mb-1">
              Ready to book a car wash or detailing service?
            </h3>
            <p className="text-xs text-secondary">
              Walk in any day or book ahead — we're open 8 AM to 9:30 PM.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-primary text-xs font-bold rounded-lg transition-colors shadow-md shadow-red-900/30"
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              Book a Service
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-primary text-xs font-bold rounded-lg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Footer Columns ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-primary font-extrabold text-sm shrink-0">
                CS
              </div>
              <div className="leading-none">
                <span className="text-base font-bold text-primary block tracking-tight">CAR SHINE</span>
                <span className="text-[10px] text-red-400 font-medium tracking-widest uppercase block mt-0.5">Detailing & Store</span>
              </div>
            </div>
            <p className="text-xs text-secondary leading-relaxed max-w-xs">
              Shahkot's premier automotive detailing centre, mobile oil change shop, carpet
              cleaning service, and genuine auto accessories store — all in one place.
            </p>

            <div className="space-y-2 text-xs text-secondary">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Main Nankana Mor, near Edhi Center, Shahkot, Punjab</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" aria-hidden="true" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-primary transition-colors font-semibold tabular-nums">
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Clock className="w-3.5 h-3.5 text-muted shrink-0" aria-hidden="true" />
                <span>8:00 AM – 9:30 PM (7 Days a Week)</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-800/50 hover:bg-emerald-700 text-emerald-300 hover:text-primary rounded-lg text-xs transition-colors border border-emerald-800/60"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>WhatsApp: {BUSINESS_INFO.phone}</span>
            </a>
          </div>

          {/* Services Column */}
          <nav aria-label="Services navigation" className="space-y-3">
            <h4 className="text-[11px] font-bold text-primary uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {[
                'Full Car Wash & Foam Bath',
                'Underbody Ramp Cleaning',
                'Car Polishing',
                'Paint Scratch Removal',
                '9H Ceramic Coating',
                'Interior Detailing',
                'Mobile Oil Change',
                'Motorbike Care',
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate('services')}
                    className="hover:text-primary transition-colors text-left leading-snug"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Store + Carpet Column */}
          <nav aria-label="Auto Store navigation" className="space-y-3">
            <h4 className="text-[11px] font-bold text-primary uppercase tracking-wider">Auto Store</h4>
            <ul className="space-y-2">
              {[
                'ZIC Engine Oils',
                'Caltex Havoline',
                'Toyota Genuine Oils',
                'Car Floor Mats',
                'Car Accessories',
                'Oil Filters',
                'Car Care Products',
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="hover:text-primary transition-colors text-left leading-snug"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-border">
              <h4 className="text-[11px] font-bold text-primary uppercase tracking-wider mb-2">Carpet Cleaning</h4>
              <ul className="space-y-1.5">
                {[
                  'Home Carpet Cleaning',
                  'Office Carpet Cleaning',
                  'Deep Steam Extraction',
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate('carpet')}
                      className="hover:text-primary transition-colors text-left leading-snug"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Company Column */}
          <nav aria-label="Company navigation" className="space-y-3">
            <h4 className="text-[11px] font-bold text-primary uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-primary transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-primary transition-colors">Services & Pricing</button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-primary transition-colors">Auto Store</button>
              </li>
              <li>
                <button onClick={() => onNavigate('carpet')} className="hover:text-primary transition-colors">Carpet Cleaning</button>
              </li>
              <li>
                <button onClick={() => onNavigate('location')} className="hover:text-primary transition-colors">Location & Contact</button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors flex items-center gap-1"
                >
                  Book Appointment
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </nav>

        </div>

        {/* ─── Bottom Bar ─────────────────────────────────────────── */}
        <div className="pt-8 mt-10 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted text-[11px]">
          <div>
            © {new Date().getFullYear()} Car Shine Excellent Detailing Service · Shahkot, Punjab, Pakistan.
            All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
            <span>Genuine Lubricants · Professional Detailing · Honest Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
