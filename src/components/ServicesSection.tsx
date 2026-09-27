import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, BUSINESS_INFO } from '../data/storeData';
import { ServicePackage, ServiceCategory } from '../types';
import { formatPKR } from '../utils/helpers';
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (service: ServicePackage) => void;
}

// Image placeholder for services without a real photo
const ServiceImgPlaceholder: React.FC<{ label?: string }> = ({ label }) => (
  <div className="w-full h-full img-placeholder flex flex-col items-center justify-center gap-2 text-center px-4">
    <LayoutGrid className="w-8 h-8 text-slate-600" aria-hidden="true" />
    {label && <span className="text-[11px] text-slate-600 leading-snug">{label}</span>}
    <span className="text-[10px] text-slate-700 font-mono">[Image coming soon]</span>
  </div>
);

// Expanded service detail card
const ServiceDetailCard: React.FC<{
  service: ServicePackage;
  onBook: () => void;
}> = ({ service, onBook }) => {
  const waText = encodeURIComponent(
    `Assalam-o-Alaikum Car Shine! I want to inquire about "${service.name}".`
  );
  return (
    <div className="mt-3 p-4 rounded-xl bg-[#181d28] border border-slate-700/60 space-y-4">
      <p className="text-xs text-slate-300 leading-relaxed">{service.description}</p>

      {/* All features */}
      <div>
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
          What's Included
        </div>
        <ul className="space-y-1.5">
          {service.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Vehicle pricing breakdown */}
      {service.vehiclePricing && (
        <div>
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Pricing by Vehicle Type
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {service.vehiclePricing.hatchback && (
              <div className="p-2.5 rounded-lg bg-[#12151c] border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 mb-0.5">Hatchback</div>
                <div className="text-xs font-bold text-white tabular-nums">{formatPKR(service.vehiclePricing.hatchback)}</div>
              </div>
            )}
            {service.vehiclePricing.sedan && (
              <div className="p-2.5 rounded-lg bg-[#12151c] border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 mb-0.5">Sedan</div>
                <div className="text-xs font-bold text-white tabular-nums">{formatPKR(service.vehiclePricing.sedan)}</div>
              </div>
            )}
            {service.vehiclePricing.suv && (
              <div className="p-2.5 rounded-lg bg-[#12151c] border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 mb-0.5">SUV / Jeep</div>
                <div className="text-xs font-bold text-white tabular-nums">{formatPKR(service.vehiclePricing.suv)}</div>
              </div>
            )}
            {service.vehiclePricing.commercial && (
              <div className="p-2.5 rounded-lg bg-[#12151c] border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 mb-0.5">Commercial</div>
                <div className="text-xs font-bold text-white tabular-nums">{formatPKR(service.vehiclePricing.commercial!)}</div>
              </div>
            )}
            {service.vehiclePricing.bike && (
              <div className="p-2.5 rounded-lg bg-[#12151c] border border-slate-800 text-center">
                <div className="text-[10px] text-slate-500 mb-0.5">Motorbike</div>
                <div className="text-xs font-bold text-white tabular-nums">{formatPKR(service.vehiclePricing.bike)}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={onBook}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors"
          aria-label={`Book ${service.name}`}
        >
          <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
          Book This Service
        </button>
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors"
          aria-label={`Inquire about ${service.name} on WhatsApp`}
        >
          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
          WhatsApp Inquiry
        </a>
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'car-wash', label: 'Car Wash & Detailing' },
    { id: 'paint-care', label: 'Polishing & Ceramic' },
    { id: 'carpet-cleaning', label: 'Carpet Cleaning' },
    { id: 'oil-change', label: 'Oil Change' },
    { id: 'bike-wash', label: 'Motorbike Care' },
  ];

  const filteredServices =
    selectedCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpandedServiceId((prev) => (prev === id ? null : id));
  };

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 60);
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
      className="py-16 lg:py-20 bg-[#0f1115]"
      id="services"
      aria-labelledby="services-page-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800 gap-4 reveal">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-red-500 mb-2">
              Our Professional Workshop Solutions
            </div>
            <h1 id="services-page-heading" className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Car Detailing, Polishing & Carpet Cleaning
            </h1>
            <div className="section-divider mt-2" aria-hidden="true" />
          </div>
          <p className="text-sm text-slate-400 max-w-sm">
            Equipped with hydraulic underbody ramps, snow foam systems, rotary polishers,
            and industrial carpet steam extractors.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="scroll-track mb-8 reveal">
          <div className="flex gap-1.5 pb-1 min-w-max md:flex-wrap md:min-w-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setExpandedServiceId(null);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-[#151922] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
                aria-pressed={selectedCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service, i) => (
            <article
              key={service.id}
              className={`reveal reveal-delay-${Math.min(i % 3 + 1, 3)} bg-[#141820] border border-slate-800 rounded-xl overflow-hidden flex flex-col transition-all duration-200 ${
                expandedServiceId === service.id
                  ? 'ring-1 ring-red-600/50'
                  : 'hover:border-slate-700 card-hover'
              }`}
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900 shrink-0">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <ServiceImgPlaceholder label={service.name} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141820]/80 via-transparent to-transparent" />

                {service.badge && (
                  <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    {service.badge}
                  </div>
                )}

                <div className="absolute bottom-3 left-3 text-xs text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-[11px] text-red-400 font-semibold mb-1">{service.categoryName}</div>
                <h2 className="text-base font-bold text-white mb-2 leading-snug">{service.name}</h2>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed flex-grow">
                  {service.tagline}
                </p>

                {/* Top 3 features */}
                <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Starting at</span>
                    <span className="text-base font-bold text-white tabular-nums">
                      {formatPKR(service.basePrice)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectServiceToBook(service)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                      aria-label={`Book ${service.name}`}
                    >
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>Book</span>
                    </button>
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                      aria-expanded={expandedServiceId === service.id}
                      aria-label={expandedServiceId === service.id ? 'Hide details' : 'View details'}
                    >
                      {expandedServiceId === service.id
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>

                {/* Expanded detail panel */}
                {expandedServiceId === service.id && (
                  <ServiceDetailCard
                    service={service}
                    onBook={() => onSelectServiceToBook(service)}
                  />
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom booking CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#171c26] to-[#12161f] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5 reveal">
          <div>
            <h3 className="text-base font-bold text-white mb-1">
              Not sure which service you need?
            </h3>
            <p className="text-xs text-slate-400">
              Call or WhatsApp us — we'll guide you to the right service for your vehicle.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              Call: {BUSINESS_INFO.phoneFormatted}
            </a>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
