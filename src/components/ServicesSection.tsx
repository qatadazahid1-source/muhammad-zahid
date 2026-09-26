import React, { useState } from 'react';
import { SERVICES } from '../data/storeData';
import { ServicePackage, ServiceCategory } from '../types';
import { formatPKR } from '../utils/helpers';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (service: ServicePackage) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'car-wash', label: 'Car Wash & Detailing' },
    { id: 'paint-care', label: 'Polishing & Ceramic' },
    { id: 'carpet-cleaning', label: 'Carpet Cleaning (Homes & Offices)' },
    { id: 'oil-change', label: 'Oil Change' },
    { id: 'bike-wash', label: 'Motorbike Care' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section className="py-16 lg:py-20 bg-[#0f1115]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Human Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-2">
              Our Professional Workshop Solutions
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
              Car Detailing, Polishing & Carpet Cleaning
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-slate-400 max-w-md">
            Equipped with modern hydraulic underbody ramps, snow foam systems, rotary polishers, and industrial carpet steam extractors.
          </p>
        </div>

        {/* Filter Tabs - Styled as segmented control, not candy pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#151922] rounded-lg border border-slate-800 overflow-x-auto mb-10 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#141820] border border-slate-800 rounded-xl overflow-hidden flex flex-col hover:border-slate-700 transition-all duration-200 group"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-transparent to-transparent" />
                
                {/* Clean unboxed tag */}
                {service.badge && (
                  <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    {service.badge}
                  </div>
                )}
                
                <div className="absolute bottom-3 left-3 text-xs text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-400" />
                  <span>{service.duration}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-red-400 font-medium mb-1">
                    {service.categoryName}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-1.5 mb-5 text-xs text-slate-300">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Vehicle Pricing Tier Reference */}
                  {service.vehiclePricing && (
                    <div className="pt-3 border-t border-slate-800/80 mb-4">
                      <div className="text-[11px] text-slate-400 font-medium mb-1">Standard Rates:</div>
                      <div className="flex items-center justify-between text-xs text-slate-300 tabular-nums">
                        {service.vehiclePricing.hatchback && (
                          <div>
                            <span className="text-slate-500 block text-[10px]">Hatchback</span>
                            <span className="font-semibold">{formatPKR(service.vehiclePricing.hatchback)}</span>
                          </div>
                        )}
                        {service.vehiclePricing.sedan && (
                          <div>
                            <span className="text-slate-500 block text-[10px]">Sedan</span>
                            <span className="font-semibold">{formatPKR(service.vehiclePricing.sedan)}</span>
                          </div>
                        )}
                        {service.vehiclePricing.suv && (
                          <div>
                            <span className="text-slate-500 block text-[10px]">SUV/Jeep</span>
                            <span className="font-semibold">{formatPKR(service.vehiclePricing.suv)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Baseline and CTA */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Starting at</span>
                    <span className="text-lg font-bold text-white tabular-nums">
                      {formatPKR(service.basePrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectServiceToBook(service)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
