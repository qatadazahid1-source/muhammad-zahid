import React, { useEffect, useRef } from 'react';
import { Calendar, Car, Sparkles, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Calendar,
    title: 'Choose Your Service',
    desc: 'Browse our full service menu — from a quick foam wash to full ceramic coating. Select what fits your vehicle and budget.',
    color: 'text-red-500',
    bg: 'bg-red-600/15',
  },
  {
    number: '02',
    icon: Car,
    title: 'Book an Appointment',
    desc: 'Call us, send a WhatsApp message, or use our online booking form to confirm your preferred date and time.',
    color: 'text-red-400',
    bg: 'bg-red-600/10',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Bring Your Vehicle',
    desc: 'Drive or bring your vehicle to our workshop at Main Nankana Mor, Shahkot. Our team will greet and take care of it.',
    color: 'text-red-500',
    bg: 'bg-red-600/15',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Service & Delivery',
    desc: 'We complete the service with care and quality. A final inspection is done before we hand your vehicle back to you.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-600/15',
  },
];

interface ProcessSectionProps {
  onBookClick: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onBookClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-16 lg:py-20 bg-background"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 reveal">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-red-500 mb-3">
            <span className="w-6 h-px bg-red-600" />
            How It Works
            <span className="w-6 h-px bg-red-600" />
          </div>
          <h2
            id="process-heading"
            className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight mb-3"
          >
            Simple 4-Step Process
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            From booking to delivery, we keep it simple, transparent, and professional.
          </p>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">

          {/* Horizontal connector line (desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {STEPS.map(({ number, icon: Icon, title, desc, color, bg }, i) => (
              <div
                key={number}
                className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center lg:items-center`}
              >
                {/* Step number badge */}
                <div className="relative z-10 flex flex-col items-center mb-5">
                  <div
                    className={`w-20 h-20 rounded-2xl ${bg} flex items-center justify-center border border-border shadow-lg mb-3`}
                  >
                    <Icon className={`w-8 h-8 ${color}`} aria-hidden="true" />
                  </div>
                  <span className={`text-4xl font-black ${color} opacity-30 leading-none -mt-1`}>
                    {number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-primary mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-secondary leading-relaxed max-w-[220px]">{desc}</p>

                {/* Arrow between steps (mobile/tablet) */}
                {i < STEPS.length - 1 && (
                  <div className="sm:hidden mt-4 text-muted text-lg" aria-hidden="true">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center reveal">
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-primary font-bold text-sm rounded-xl shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            Book Your Appointment Now
          </button>
        </div>

      </div>
    </section>
  );
};
