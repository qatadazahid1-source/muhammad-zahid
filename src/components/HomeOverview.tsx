import React from 'react';
import { Hero } from './Hero';
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
  Flame,
} from 'lucide-react';

interface HomeOverviewProps {
  onOpenBooking: (service?: ServicePackage) => void;
  onOpenShop: () => void;
  onOpenCarpet: () => void;
  onOpenLocation: () => void;
  onAddToCart: (product: Product) => void;
  onOpenProductDetail: (product: Product) => void;
}

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

  return (
    <div>
      {/* Hero Section */}
      <Hero
        onBookClick={() => onOpenBooking()}
        onShopClick={onOpenShop}
        onCarpetClick={onOpenCarpet}
      />

      {/* Quick Service Category Cards Bar */}
      <section className="bg-[#12161f] border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            
            <button
              onClick={() => onOpenBooking(SERVICES.find((s) => s.id === 'full-car-wash'))}
              className="p-3.5 sm:p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/50 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  Car Wash & Detailing
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Underbody ramp & snow foam</p>
              </div>
            </button>

            <button
              onClick={() => onOpenBooking(SERVICES.find((s) => s.id === 'compound-polish'))}
              className="p-3.5 sm:p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/50 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  Polishing & Ceramic
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Scratch removal & 9H coating</p>
              </div>
            </button>

            <button
              onClick={onOpenCarpet}
              className="p-3.5 sm:p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/50 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  Carpet Cleaning
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Home & office deep extraction</p>
              </div>
            </button>

            <button
              onClick={onOpenShop}
              className="p-3.5 sm:p-4 rounded-xl bg-[#171c26] hover:bg-[#1c2331] border border-slate-800 hover:border-red-500/50 text-left transition-all group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  Auto Store & Oils
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">ZIC, Havoline, mats & parts</p>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-[#0f1115]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-1">
                Workshop Excellence
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Services at Car Shine
              </h2>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="mt-2 sm:mt-0 text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <span>View All 8 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-[#141820] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-transparent to-transparent" />
                  {service.badge && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300 mb-4">
                      {service.features.slice(0, 2).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">From</span>
                      <span className="text-base font-bold text-white tabular-nums">
                        {formatPKR(service.basePrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(service)}
                      className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auto Store Products */}
      <section className="py-16 bg-[#12151d] border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-1">
                From Our Shelves
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Best-Selling Oils & Accessories
              </h2>
            </div>
            <button
              onClick={onOpenShop}
              className="mt-2 sm:mt-0 text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onOpenProductDetail(product)}
                className="bg-[#161a24] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all cursor-pointer group"
              >
                <div className="relative h-48 w-full bg-[#181d28] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-[10px] text-white px-2 py-0.5 rounded font-medium">
                    {product.brand}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 mb-1">
                      {product.categoryName} {product.volumeOrSize && `· ${product.volumeOrSize}`}
                    </div>
                    <h3 className="text-xs font-semibold text-white mb-2 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-white tabular-nums">
                      {formatPKR(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Trust & Experience Section */}
      <section className="py-16 bg-[#0f1115]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#141820] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Genuine Lubricants Guaranteed</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We strictly stock authentic ZIC, Havoline, Toyota Petron, Honda Genuine, and Suzuki Ecstar engine oils with intact factory holograms and security seals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141820] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Industrial Steam & Extraction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whether detailing vehicle interiors or washing household carpets and office floor rugs, our high-power extraction eliminates hidden allergens, stains, and odors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141820] border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Shahkot Pickup & Courier Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enjoy doorstep carpet collection across Shahkot and swift Cash on Delivery courier shipping nationwide for auto accessories, key covers, and floor mats.
              </p>
            </div>

          </div>

          {/* Real Customer Feedback Quotation */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#171c26] to-[#12161f] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-200 italic">
                "The underbody wash on the ramp removed months of mud from my Corolla, and their ceramic polish gave it a mirror shine. Highly recommend Saqlain bhai and team in Shahkot!"
              </p>
              <div className="text-xs text-slate-400">
                — Customer Review · Verified Detailing & Oil Change Service
              </div>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-lg shrink-0 transition-colors"
            >
              Book Your Appointment Now
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
