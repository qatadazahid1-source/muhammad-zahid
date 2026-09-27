import React, { useState, useEffect, useRef } from 'react';
import { Phone, ShoppingBag, Calendar, MapPin, Clock, Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/storeData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  openBookingModal: () => void;
  savedBookingsCount: number;
  openActivityModal: () => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services & Pricing' },
  { id: 'shop', label: 'Auto Store' },
  { id: 'carpet', label: 'Carpet Cleaning' },
  { id: 'location', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openBookingModal,
  savedBookingsCount,
  openActivityModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Detect scroll for header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileMenuOpen]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [mobileMenuOpen]);

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={menuRef}>
      {/* ─── Top Info Banner (desktop only) ─────────────────── */}
      <div className="hidden sm:block bg-[#080a0e] border-b border-slate-800/60 text-[11px] text-slate-400 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              <span>Main Nankana Mor, near Edhi Center, Shahkot</span>
            </span>
            <span className="items-center gap-1.5 text-slate-400 hidden md:flex">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Open Daily 8:00 AM – 9:30 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-400 font-medium hidden lg:inline">
              ★ {BUSINESS_INFO.specialOffer}
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-semibold tabular-nums"
            >
              <Phone className="w-3 h-3 text-red-500" />
              {BUSINESS_INFO.phoneFormatted}
            </a>
          </div>
        </div>
      </div>

      {/* ─── Main Header ─────────────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 bg-[#0f1218]/97 backdrop-blur-md border-b border-slate-800 transition-shadow duration-200 ${
          scrolled ? 'shadow-xl shadow-black/40' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Zone 1: Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
            aria-label="Car Shine – go to homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-extrabold text-base shadow-md group-hover:bg-red-500 transition-colors">
              CS
            </div>
            <div className="leading-none">
              <span className="text-[17px] sm:text-lg font-bold tracking-tight text-white block">
                CAR SHINE
              </span>
              <span className="text-[9px] text-red-400 font-semibold tracking-widest uppercase block mt-0.5">
                Detailing & Store
              </span>
            </div>
          </button>

          {/* Zone 2: Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-3 py-2 text-[13px] font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeTab === link.id
                    ? 'text-white bg-red-600/10 border border-red-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="block h-0.5 w-full bg-red-500 mt-0.5 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Action Buttons */}
          <div className="flex items-center gap-2">

            {/* My Activity (desktop) */}
            {savedBookingsCount > 0 && (
              <button
                onClick={openActivityModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/70 rounded-lg border border-slate-700/50 transition-colors whitespace-nowrap"
                title="View my bookings & orders"
              >
                <span>My Bookings</span>
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedBookingsCount}
                </span>
              </button>
            )}

            {/* Book Service Button */}
            <button
              onClick={openBookingModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-[12px] font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-md shadow-red-900/30 transition-colors whitespace-nowrap"
              aria-label="Book a service appointment"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Service</span>
            </button>

            {/* Mobile: Compact Book Button */}
            <button
              onClick={openBookingModal}
              className="sm:hidden inline-flex items-center gap-1 px-3 py-2 text-[11px] font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors whitespace-nowrap"
              aria-label="Book"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg border border-slate-700/60 transition-colors shrink-0"
              aria-label={`Shopping Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700/50 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ─── Mobile Slide-Down Menu ──────────────────────────── */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
            className="md:hidden mobile-menu-enter border-t border-slate-800 bg-[#0d1117] shadow-2xl"
          >
            {/* Nav Links */}
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                    activeTab === link.id
                      ? 'bg-red-600/15 text-red-400 border border-red-600/25'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeTab === link.id && (
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-800 mx-4" />

            {/* Contact quick-actions */}
            <div className="px-4 py-3 grid grid-cols-2 gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-white text-sm font-semibold border border-slate-700 hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>Call Us</span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Assalam-o-Alaikum Car Shine! I want to inquire about your services.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Full Book Service button */}
            <div className="px-4 pb-4">
              <button
                onClick={() => { openBookingModal(); setMobileMenuOpen(false); }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/30"
              >
                <Calendar className="w-4 h-4" />
                Book a Service Appointment
              </button>
            </div>

            {/* Location pill */}
            <div className="px-4 pb-5 text-[11px] text-slate-500 text-center">
              <MapPin className="w-3 h-3 inline-block text-red-500 mr-1" />
              Main Nankana Mor, near Edhi Center, Shahkot
              &nbsp;·&nbsp;
              <Clock className="w-3 h-3 inline-block text-slate-500 mx-1" />
              8 AM – 9:30 PM Daily
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
