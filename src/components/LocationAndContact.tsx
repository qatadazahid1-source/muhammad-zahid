import React from 'react';
import { BUSINESS_INFO } from '../data/storeData';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Navigation,
  ShieldCheck,
  Award,
  Users,
} from 'lucide-react';

export const LocationAndContact: React.FC = () => {
  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent('Main Nankana Mor, near Edhi Center, Shahkot, Punjab, Pakistan');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleWhatsAppChat = () => {
    const text = 'Assalam-o-Alaikum Car Shine Detailing Shahkot, I want to inquire about your services & shop products.';
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-16 lg:py-20 bg-[#0f1115] border-t border-slate-800" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
            Visit Our Shahkot Workshop & Retail Store
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Location, Contact & Workshop Hours
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Conveniently situated at Main Nankana Mor near Edhi Center, Shahkot. Featuring a full hydraulic wash ramp, dedicated paint correction bay, and extensive auto lubricants shelf.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact & Management Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Workshop Address Card */}
            <div className="p-5 rounded-2xl bg-[#141820] border border-slate-800">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">Workshop Address</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    Main Nankana Mor, near Edhi Center, Shahkot, District Nankana Sahib, Punjab, Pakistan
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Landmark: Beside Edhi Center at the main Nankana Road junction.
                  </p>
                </div>
              </div>

              <button
                onClick={handleOpenGoogleMaps}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700/80"
              >
                <Navigation className="w-3.5 h-3.5 text-red-400" />
                <span>Get Driving Directions on Google Maps</span>
              </button>
            </div>

            {/* Direct Phone Numbers & Management */}
            <div className="p-5 rounded-2xl bg-[#141820] border border-slate-800 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Direct Contact & Feed Back
              </h3>

              {/* Main Management */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#181d28] border border-slate-800">
                <div>
                  <div className="text-[11px] text-slate-400">Management</div>
                  <div className="text-sm font-bold text-white">{BUSINESS_INFO.management}</div>
                </div>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold tabular-nums"
                >
                  <Phone className="w-3 h-3" />
                  <span>{BUSINESS_INFO.phoneFormatted}</span>
                </a>
              </div>

              {/* Customer Feedback Lines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {BUSINESS_INFO.customerFeedback.map((person, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#181d28] border border-slate-800">
                    <div className="text-[10px] text-slate-400">Customer Feedback</div>
                    <div className="font-semibold text-white truncate">{person.name}</div>
                    <a
                      href={`tel:${person.phone.replace(/[^0-9]/g, '')}`}
                      className="text-red-400 hover:underline text-[11px] font-mono mt-0.5 block tabular-nums"
                    >
                      {person.phone}
                    </a>
                  </div>
                ))}
              </div>

              {/* Quick WhatsApp CTA */}
              <button
                onClick={handleWhatsAppChat}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Workshop Manager on WhatsApp</span>
              </button>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-xl bg-[#141820] border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-500 shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-white block">Operating Schedule</span>
                <span className="text-slate-400">{BUSINESS_INFO.hours} (Open All 7 Days)</span>
              </div>
            </div>

          </div>

          {/* Interactive Workshop Showcase & Visual Route (7 cols) */}
          <div className="lg:col-span-7 bg-[#141820] border border-slate-800 rounded-2xl overflow-hidden p-6 space-y-6">
            
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                Workshop Facilities & Detailing Equipment
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Car Shine Shahkot is custom-built for high-volume automotive cleanliness and precision detailing. Whether you come for a quick underbody wash or a full interior steam detail, our facility provides clean water, specialized ramps, and sheltered service bays.
              </p>
            </div>

            {/* Facilities Visual Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#181d28] border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-red-500 mb-2" />
                <h4 className="font-semibold text-white mb-1">Hydraulic Ramp Bay</h4>
                <p className="text-[11px] text-slate-400">
                  Elevates vehicles for high-pressure underbody mud and road-salt blasting.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#181d28] border border-slate-800">
                <Award className="w-4 h-4 text-red-500 mb-2" />
                <h4 className="font-semibold text-white mb-1">Rotary Machine Studio</h4>
                <p className="text-[11px] text-slate-400">
                  Dual-action cutting and finishing polish for scratch removal and ceramic gloss.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#181d28] border border-slate-800">
                <Users className="w-4 h-4 text-red-500 mb-2" />
                <h4 className="font-semibold text-white mb-1">Carpet Wash Station</h4>
                <p className="text-[11px] text-slate-400">
                  Dedicated industrial area for deep foam extraction of home & office carpets.
                </p>
              </div>
            </div>

            {/* Shahkot Route Landmark Guide Card */}
            <div className="p-4 rounded-xl bg-[#181d28] border border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                How to Reach Us in Shahkot:
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>From Nankana Sahib Road:</strong> Approach the main Shahkot entrance roundabout; Car Shine is located directly at Main Nankana Mor right next to Edhi Center.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>From Faisalabad / Lahore Road:</strong> Take the Shahkot bypass towards Nankana Mor. Look for the large red & white "CAR SHINE EXCELLENT DETAILING SERVICE" gate and welcome board.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span>
                    <strong>Need Help Finding Us?</strong> Call manager Saqlain Amin at <strong className="text-white">0316-6287979</strong> for instant phone guidance.
                  </span>
                </li>
              </ul>
            </div>

            {/* First Visit Promo Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-transparent border border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white block">
                  First Time at Car Shine Shahkot?
                </span>
                <span className="text-xs text-red-300">
                  Get 20% discount on full detailing packages. Show code <strong className="text-white">SHINE20</strong> at reception.
                </span>
              </div>
              <button
                onClick={handleWhatsAppChat}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap"
              >
                Claim 20% Discount
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
