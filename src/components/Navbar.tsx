import React from 'react';
import { Phone, ShoppingBag, Calendar, MapPin, Clock } from 'lucide-react';
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

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openBookingModal,
  savedBookingsCount,
  openActivityModal,
}) => {
  return (
    <>
      {/* Top Info Banner - Authentic contact & Shahkot location */}
      <div className="bg-[#12161f] border-b border-slate-800/60 text-xs text-slate-400 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Main Nankana Mor, near Edhi Center, Shahkot</span>
            </span>
            <span className="text-slate-600 hidden md:inline">·</span>
            <span className="items-center gap-1.5 text-slate-400 hidden md:flex">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Open Daily: 8:00 AM – 9:30 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-400 font-medium hidden lg:inline">
              ★ {BUSINESS_INFO.specialOffer}
            </span>
            <span className="text-slate-600 hidden lg:inline">·</span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-red-500" />
              <span className="font-semibold tabular-nums">{BUSINESS_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Strictly follows the 3-Zone Contract */}
      <header className="sticky top-0 z-40 bg-[#0f1218]/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Wordmark Brand Title (Single Element) */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm group-hover:bg-red-500 transition-colors">
              CS
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">
                CAR SHINE
              </span>
              <span className="text-[10px] text-red-400 font-medium tracking-wider uppercase block mt-0.5">
                Detailing & Store
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean text links with hover states) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 ${
                activeTab === 'home' ? 'text-white border-b-2 border-red-500 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 ${
                activeTab === 'services' ? 'text-white border-b-2 border-red-500 font-semibold' : ''
              }`}
            >
              Services & Pricing
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 ${
                activeTab === 'shop' ? 'text-white border-b-2 border-red-500 font-semibold' : ''
              }`}
            >
              Auto Store
            </button>
            <button
              onClick={() => setActiveTab('carpet')}
              className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 ${
                activeTab === 'carpet' ? 'text-white border-b-2 border-red-500 font-semibold' : ''
              }`}
            >
              Carpet Cleaning
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`transition-colors whitespace-nowrap hover:text-white pb-0.5 ${
                activeTab === 'location' ? 'text-white border-b-2 border-red-500 font-semibold' : ''
              }`}
            >
              Location & Contact
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {savedBookingsCount > 0 && (
              <button
                onClick={openActivityModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-md border border-slate-700/60 transition-colors whitespace-nowrap"
                title="View my bookings & orders"
              >
                <span>My Bookings</span>
                <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedBookingsCount}
                </span>
              </button>
            )}

            {/* Book Now Button */}
            <button
              onClick={openBookingModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Service</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 rounded-lg border border-slate-700/70 transition-colors shrink-0"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-red-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary nav strip */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-800/70 bg-[#12151c] py-2 px-2 text-xs font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-2 py-1 ${activeTab === 'home' ? 'text-red-400 font-semibold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-2 py-1 ${activeTab === 'services' ? 'text-red-400 font-semibold' : ''}`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-2 py-1 ${activeTab === 'shop' ? 'text-red-400 font-semibold' : ''}`}
          >
            Store
          </button>
          <button
            onClick={() => setActiveTab('carpet')}
            className={`px-2 py-1 ${activeTab === 'carpet' ? 'text-red-400 font-semibold' : ''}`}
          >
            Carpets
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`px-2 py-1 ${activeTab === 'location' ? 'text-red-400 font-semibold' : ''}`}
          >
            Location
          </button>
        </div>
      </header>
    </>
  );
};
