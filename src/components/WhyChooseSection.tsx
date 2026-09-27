import React, { useEffect, useRef } from 'react';
import {
  Wrench,
  ShieldCheck,
  Star,
  Droplets,
  Clock,
  MapPin,
  Users,
  Sparkles,
} from 'lucide-react';

const REASONS = [
  {
    icon: Wrench,
    title: 'Professional Equipment',
    desc: 'Hydraulic ramp, snow foam cannons, dual-action polishers, and industrial carpet extractors — real workshop tools.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Oils & Products',
    desc: 'Authentic ZIC, Havoline, Toyota Petron, Honda, and Suzuki oils with factory holograms. No imitations, ever.',
  },
  {
    icon: Star,
    title: 'Experienced Detailing Team',
    desc: 'Supervised by Saqlain Amin with years of hands-on experience in paint correction, ceramic coating, and underbody care.',
  },
  {
    icon: Droplets,
    title: 'Multiple Services in One Place',
    desc: 'Car wash, polishing, ceramic coating, oil change, carpet cleaning, and auto accessories — all under one roof.',
  },
  {
    icon: Clock,
    title: 'Open 7 Days a Week',
    desc: 'Walk in any day from 8:00 AM to 9:30 PM. No appointment needed for basic car wash and oil change services.',
  },
  {
    icon: MapPin,
    title: 'Conveniently Located in Shahkot',
    desc: 'Situated at Main Nankana Mor, near Edhi Center — easy access for residents across Shahkot and surrounding areas.',
  },
  {
    icon: Users,
    title: 'Customer-Focused Service',
    desc: 'Transparent pricing, honest advice, and clear communication. We treat your vehicle the way we would treat our own.',
  },
  {
    icon: Sparkles,
    title: 'Quality You Can See',
    desc: 'Every service passes a post-work visual inspection. We do not hand a vehicle back until we are proud of the result.',
  },
];

export const WhyChooseSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-car-shine"
      className="py-16 lg:py-20 bg-[#0d1017] border-y border-slate-800"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-red-500 mb-3">
            <span className="w-6 h-px bg-red-600" />
            Why Choose Us
            <span className="w-6 h-px bg-red-600" />
          </div>
          <h2
            id="why-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3"
          >
            Why Car Shine in Shahkot?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We are not a basic car wash. We are a full automotive care destination
            committed to quality, honesty, and results.
          </p>
        </div>

        {/* Grid of reasons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {REASONS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`reveal reveal-delay-${Math.min(i % 4 + 1, 4)} p-5 rounded-2xl bg-[#141820] border border-slate-800 hover:border-red-600/30 card-hover group`}
            >
              <div className="w-10 h-10 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-200">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 leading-snug">{title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
