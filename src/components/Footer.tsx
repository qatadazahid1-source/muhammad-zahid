import React from 'react';
import { BUSINESS_INFO } from '../data/storeData';
import { Phone, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#0b0d12] border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold text-sm">
                CS
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                CAR SHINE
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Excellent Detailing Service, Mobile Oil Change & Auto Accessories. Serving Shahkot and surrounding districts with authentic lubricants and showroom-grade vehicle rejuvenation.
            </p>
            <div className="text-[11px] text-slate-500 pt-1 font-mono">
              Estd. {BUSINESS_INFO.establishedYear} · Shahkot, Punjab
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  Car Wash & Detailing Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  Engine Oils & Accessories Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('carpet')}
                  className="hover:text-white transition-colors"
                >
                  Carpet Cleaning (Home & Office)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-white transition-colors"
                >
                  Location & Driving Map
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Book Service Appointment →
                </button>
              </li>
            </ul>
          </div>

          {/* Workshop Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Full Snow Foam & Ramp Car Wash</li>
              <li>Half Body & Underbody Wash</li>
              <li>Machine Compound & Scratch Removal</li>
              <li>9H Ceramic Crystal Paint Coating</li>
              <li>Interior Deep Steam & Sanitization</li>
              <li>Home & Commercial Carpet Cleaning</li>
              <li>Mobile Oil Change (ZIC, Havoline, Toyota)</li>
              <li>Motorbike Foam Wash & Chain Lube</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Visit or Call Us
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Main Nankana Mor, near Edhi Center, Shahkot</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white tabular-nums font-semibold">
                  {BUSINESS_INFO.phoneFormatted} (Saqlain Amin)
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>8:00 AM – 9:30 PM (7 Days a Week)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-700/60 hover:bg-emerald-600 text-white rounded text-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Car Shine Excellent Detailing Service. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Authentic Pakistani Lubricants & Professional Detailing</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
