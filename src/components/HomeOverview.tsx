import React, { useEffect, useRef } from 'react';
import { Hero } from './Hero';
import { WhyChooseSection } from './WhyChooseSection';
import { ProcessSection } from './ProcessSection';
import { GallerySection } from './GallerySection';
import { SERVICES, PRODUCTS, BUSINESS_INFO } from '../data/storeData';
import { Product, ServicePackage } from '../types';
import { formatPKR } from '../utils/helpers';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ShoppingBag,
  ArrowRight,
  Droplet,
  Truck,
  Car,
  Star,
  MessageCircle,
  Phone,
  MapPin,
  LayoutGrid,
} from 'lucide-react';

interface HomeOverviewProps {
  onOpenBooking: (service?: ServicePackage) => void;
  onOpenShop: () => void;
  onOpenCarpet: () => void;
  onOpenLocation: () => void;
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

// ─── Image placeholder for missing real images ─────────────────────────────
const ServiceImgPlaceholder: React.FC<{ label?: string }> = ({ label }) => (
  <div className="w-full h-full img-placeholder flex flex-col items-center justify-center gap-1.5 text-center px-4">
    <LayoutGrid className="w-7 h-7 text-slate-600" aria-hidden="true" />
    {label && <span className="text-[10px] text-slate-600">{label}</span>}
  </div>
);

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onOpenBooking,
  onOpenShop,
  onOpenCarpet,
  onOpenLocation,
  onAddToCart,
  onOpenProductDetail,
}) => {
  const featuredServices = SERVICES.slice(0, 3);
  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  // Scroll reveal
  const sectionRefs = {
    categories: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    products: useRef<HTMLElement>(null),
    trust: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

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
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  const waText = encodeURIComponent(
    'Assalam-o-Alaikum Car Shine! I want to book a service / get a quote.'
  );

  return (
    <div className="overflow-x-hidden">

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <Hero
        onBookClick={() => onOpenBooking()}
        onShopClick={onOpenShop}
        onCarpetClick={onOpenCarpet}
      />

      {/* ─── Quick Service Category Bar ────────────────────────── */}
      <section
        ref={sectionRefs.categories}
        id="service-categories"
        className="bg-[#11151f] border-b border-slate-800 py-5"
        aria-label="Service categories"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Scrollable on mobile, grid on desktop */}
          <div className="scroll-track md:overflow-visible">
            <div className="flex gap-3 md:grid md:grid-cols-4 min-w-max md:min-w-0">

              <button
                onClick={() => onOpenBooking(SERVICES.find((s) => s.id === 'full-car-wash'))}
                className="reveal flex-shrink-0 md:flex-shrink w-[160px] sm:w-[180px] md:w-auto p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/40 text-left transition-all group flex items-start gap-3 card-hover"
              >
                <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Car className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    Car Wash & Detailing
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Underbody ramp & snow foam</p>
                </div>
              </button>

              <button
                onClick={() => onOpenBooking(SERVICES.find((s) => s.id === 'compound-polish'))}
                className="reveal reveal-delay-1 flex-shrink-0 md:flex-shrink w-[160px] sm:w-[180px] md:w-auto p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/40 text-left transition-all group flex items-start gap-3 card-hover"
              >
                <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    Polishing & Ceramic
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Scratch removal & 9H coating</p>
                </div>
              </button>

              <button
                onClick={onOpenCarpet}
                className="reveal reveal-delay-2 flex-shrink-0 md:flex-shrink w-[160px] sm:w-[180px] md:w-auto p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/40 text-left transition-all group flex items-start gap-3 card-hover"
              >
                <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Droplet className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    Carpet Cleaning
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">Home & office deep extraction</p>
                </div>
              </button>

              <button
                onClick={onOpenShop}
                className="reveal reveal-delay-3 flex-shrink-0 md:flex-shrink w-[160px] sm:w-[180px] md:w-auto p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/40 text-left transition-all group flex items-start gap-3 card-hover"
              >
                <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                    Auto Store & Oils
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">ZIC, Havoline, mats & parts</p>
                </div>
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Services ──────────────────────────────────── */}
      <section
        ref={sectionRefs.services}
        id="featured-services"
        className="py-16 bg-[#0f1115]"
        aria-labelledby="featured-services-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-800 gap-3 reveal">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-red-500 mb-1.5">
                Workshop Excellence
              </div>
              <h2 id="featured-services-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Services at Car Shine
              </h2>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((service, i) => (
              <article
                key={service.id}
                className={`reveal reveal-delay-${i + 1} bg-[#141820] border border-slate-800 rounded-xl overflow-hidden flex flex-col hover:border-slate-700 transition-all duration-200 card-hover`}
              >
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <ServiceImgPlaceholder label={service.name} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-transparent to-transparent" />
                  {service.badge && (
                    <span className="absolute top-3 right-3 bg-red-600/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                      {service.features.slice(0, 2).map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Starting from</span>
                      <span className="text-base font-bold text-white tabular-nums">
                        {formatPKR(service.basePrice)}
                      </span>
                    </div>
                    <button
                      onClick={() => onOpenBooking(service)}
                      className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                      aria-label={`Book ${service.name}`}
                    >
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Services Button */}
          <div className="mt-8 text-center reveal">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-colors"
            >
              View All 8+ Services with Pricing
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Why Car Shine ─────────────────────────────────────── */}
      <WhyChooseSection />

      {/* ─── Featured Auto Store Products ──────────────────────── */}
      <section
        ref={sectionRefs.products}
        id="featured-products"
        className="py-16 bg-[#12151d] border-y border-slate-800"
        aria-labelledby="featured-products-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-800 gap-3 reveal">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-red-500 mb-1.5">
                From Our Shelves
              </div>
              <h2 id="featured-products-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Best-Selling Oils & Accessories
              </h2>
            </div>
            <button
              onClick={onOpenShop}
              className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.map((product, i) => (
              <article
                key={product.id}
                onClick={() => onOpenProductDetail(product)}
                className={`reveal reveal-delay-${i + 1} bg-[#161a24] border border-slate-800 rounded-xl overflow-hidden flex flex-col hover:border-slate-700 transition-all cursor-pointer group card-hover`}
              >
                <div className="relative h-44 w-full bg-[#181d28] overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <ServiceImgPlaceholder label={product.name} />
                  )}
                  <div className="absolute top-2 left-2 bg-black/70 text-[10px] text-white px-2 py-0.5 rounded font-medium">
                    {product.brand}
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-2 right-2 bg-red-600 text-[10px] text-white px-2 py-0.5 rounded font-bold">
                      SALE
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 mb-1">
                      {product.categoryName}{product.volumeOrSize ? ` · ${product.volumeOrSize}` : ''}
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-semibold text-white mb-1.5 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-2">
                    <div>
                      <span className="text-sm font-bold text-white tabular-nums">
                        {formatPKR(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-[10px] text-slate-500 line-through tabular-nums">
                          {formatPKR(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag className="w-3 h-3" aria-hidden="true" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center reveal">
            <button
              onClick={onOpenShop}
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Browse Full Auto Store
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Gallery Section ────────────────────────────────────── */}
      <GallerySection />

      {/* ─── How It Works / Process ─────────────────────────────── */}
      <ProcessSection onBookClick={() => onOpenBooking()} />

      {/* ─── Trust / Customer Review Banner ─────────────────────── */}
      <section
        ref={sectionRefs.trust}
        className="py-12 bg-[#0d1017] border-y border-slate-800"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="reveal p-5 rounded-2xl bg-[#141820] border border-slate-800 space-y-3 card-hover">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-white">Genuine Lubricants Guaranteed</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We strictly stock authentic ZIC, Havoline, Toyota Petron, Honda Genuine, and
                Suzuki Ecstar engine oils with intact factory holograms and security seals.
              </p>
            </div>

            <div className="reveal reveal-delay-1 p-5 rounded-2xl bg-[#141820] border border-slate-800 space-y-3 card-hover">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-white">Industrial Steam & Extraction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether detailing vehicle interiors or washing household carpets, our high-power
                extraction eliminates hidden allergens, stains, and odors effectively.
              </p>
            </div>

            <div className="reveal reveal-delay-2 p-5 rounded-2xl bg-[#141820] border border-slate-800 space-y-3 card-hover">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <Truck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-sm font-bold text-white">Shahkot Pickup & Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Doorstep carpet collection across Shahkot and swift Cash on Delivery shipping
                for auto accessories, key covers, and floor mats.
              </p>
            </div>
          </div>

          {/* Customer Testimonial Placeholder */}
          <div className="reveal p-6 rounded-2xl bg-gradient-to-r from-[#171c26] to-[#12161f] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                ))}
                <span className="text-xs text-amber-300 ml-1 font-medium">5.0</span>
              </div>
              <p className="text-sm text-slate-200 italic leading-relaxed">
                "The underbody wash on the ramp removed months of mud from my Corolla, and their
                ceramic polish gave it a mirror shine. Highly recommend Saqlain bhai and the
                Car Shine team in Shahkot!"
              </p>
              <div className="text-xs text-slate-500">
                — Verified Detailing & Oil Change Customer · Shahkot
              </div>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm whitespace-nowrap shadow-lg shadow-red-900/30 transition-colors shrink-0"
              aria-label="Book your appointment at Car Shine"
            >
              Book Your Appointment
            </button>
          </div>
        </div>
      </section>

      {/* ─── Final CTA + Quick Contact ───────────────────────────── */}
      <section
        ref={sectionRefs.contact}
        className="py-14 bg-[#0f1115]"
        aria-labelledby="final-cta-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[11px] font-bold tracking-widest uppercase text-red-500 mb-3 reveal">
            Ready to Get Started?
          </div>
          <h2 id="final-cta-heading" className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 reveal">
            Book a Service or Visit Our Store
          </h2>
          <p className="text-sm text-slate-400 mb-8 reveal max-w-lg mx-auto">
            Walk in any day from 8 AM to 9:30 PM, or book in advance to guarantee your slot.
            We're at Main Nankana Mor, near Edhi Center, Shahkot.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 reveal">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-900/30 transition-all hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Book a Service
            </button>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              WhatsApp Us
            </a>
            <button
              onClick={onOpenLocation}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/8 hover:bg-white/12 border border-white/10 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              <MapPin className="w-4 h-4 text-red-400" aria-hidden="true" />
              Get Directions
            </button>
          </div>

          {/* Quick contact info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 reveal">
            <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
              {BUSINESS_INFO.phoneFormatted}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" aria-hidden="true" />
              Main Nankana Mor, Shahkot
            </span>
            <span className="text-slate-500">Open Daily 8 AM – 9:30 PM</span>
          </div>
        </div>
      </section>

    </div>
  );
};
