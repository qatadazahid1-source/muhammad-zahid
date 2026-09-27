import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/storeData';

interface MobileBottomBarProps {
  onBookClick: () => void;
}

/**
 * MobileBottomBar — Fixed bottom action strip on mobile only.
 * Shows Call / WhatsApp / Book buttons.
 * Hidden on sm+ screens where the floating WhatsApp pill is enough.
 */
export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onBookClick }) => {
  const waText = encodeURIComponent(
    'Assalam-o-Alaikum Car Shine! I would like to inquire about your services.'
  );

  return (
    <div
      className="sm:hidden mobile-bottom-bar pb-safe"
      role="navigation"
      aria-label="Quick contact actions"
    >
      <div className="flex items-stretch h-14">
        {/* Call */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label={`Call Car Shine at ${BUSINESS_INFO.phoneFormatted}`}
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">Call</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-slate-800" aria-hidden="true" />

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-emerald-400 hover:text-emerald-300 hover:bg-white/5 transition-colors"
          aria-label="Chat with Car Shine on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">WhatsApp</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-slate-800" aria-hidden="true" />

        {/* Book */}
        <button
          onClick={onBookClick}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-red-600 hover:bg-red-500 text-white transition-colors"
          aria-label="Book a service appointment"
        >
          <Calendar className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-semibold">Book</span>
        </button>
      </div>
    </div>
  );
};
