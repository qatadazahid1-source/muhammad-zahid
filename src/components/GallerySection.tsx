import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid3x3, LayoutGrid } from 'lucide-react';

// ─── Gallery data structure ──────────────────────────────────────────────────
// Images use real supplied files where available; empty slots show an elegant
// placeholder that can easily receive a real image file later.

type GalleryCategory = 'all' | 'detailing' | 'workshop' | 'products' | 'carpet';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  caption?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    src: '/images/workshop_1.jpg',
    alt: 'Car Shine detailing workshop exterior view in Shahkot',
    category: 'workshop',
    caption: 'Our Workshop – Main Nankana Mor, Shahkot',
  },
  {
    id: 'g2',
    src: '/images/Screenshot_2026-09-27_144845.png',
    alt: 'Car Wash Foam Application',
    category: 'detailing',
    caption: 'Thick Snow Foam Wash',
  },
  {
    id: 'g3',
    src: '/images/Screenshot_2026-09-27_144856.png',
    alt: 'Car Underbody Wash',
    category: 'detailing',
    caption: 'Detailed Underbody Wash',
  },
  {
    id: 'g4',
    src: '/images/Screenshot_2026-09-27_144906.png',
    alt: 'Car interior cleaning',
    category: 'detailing',
    caption: 'Interior Cleaning & Vacuum',
  },
  {
    id: 'g5',
    src: '/images/Screenshot_2026-09-27_144915.png',
    alt: 'Car polishing process',
    category: 'detailing',
    caption: 'Paint Correction & Polishing',
  },
  {
    id: 'g6',
    src: '/images/product_1.jpg',
    alt: 'Genuine engine oil display at Car Shine Auto Store Shahkot',
    category: 'products',
    caption: 'Genuine Engine Oils',
  },
  {
    id: 'g7',
    src: '/images/product_2.jpg',
    alt: 'Car accessories and detailing products display shelf',
    category: 'products',
    caption: 'Car Accessories & Floor Mats',
  },
  {
    id: 'g8',
    src: '/images/Screenshot_2026-09-27_145134.png',
    alt: 'Carpet cleaning extraction',
    category: 'carpet',
    caption: 'Deep Carpet Steam Cleaning',
  },
];

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'detailing', label: 'Detailing' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'products', label: 'Products' },
  { id: 'carpet', label: 'Carpet Cleaning' },
];

// Placeholder card for images not yet supplied
const ImagePlaceholder: React.FC<{ alt: string; caption?: string }> = ({ alt, caption }) => (
  <div className="w-full h-full img-placeholder flex flex-col items-center justify-center gap-2 text-center px-4 min-h-[180px]">
    <LayoutGrid className="w-8 h-8 text-slate-600" aria-hidden="true" />
    <span className="text-[11px] text-slate-500 leading-snug">{caption || alt}</span>
    <span className="text-[10px] text-slate-600 font-mono">[Image coming soon]</span>
  </div>
);

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    if (!filtered[index].src) return; // Don't open lightbox for placeholders
    setLightboxIndex(index);
    document.body.classList.add('modal-open');
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.classList.remove('modal-open');
  }, []);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    let prev = lightboxIndex - 1;
    while (prev >= 0 && !filtered[prev].src) prev--;
    if (prev >= 0) setLightboxIndex(prev);
  }, [lightboxIndex, filtered]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    let next = lightboxIndex + 1;
    while (next < filtered.length && !filtered[next].src) next++;
    if (next < filtered.length) setLightboxIndex(next);
  }, [lightboxIndex, filtered]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

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
      id="gallery"
      className="py-16 lg:py-20 bg-[#0c0f14]"
      aria-labelledby="gallery-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 reveal">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-red-500 mb-2">
              <span className="w-5 h-px bg-red-600" />
              Gallery
              <span className="w-5 h-px bg-red-600" />
            </div>
            <h2
              id="gallery-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              Workshop & Service Gallery
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xs sm:text-right">
            A look inside our workshop, services, and auto store products.
          </p>
        </div>

        {/* Category Filter */}
        <div className="scroll-track mb-6 reveal">
          <div className="flex gap-2 pb-1 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-[#151922] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, index) => (
            <div
              key={img.id}
              className="reveal relative group rounded-xl overflow-hidden bg-[#141820] border border-slate-800 hover:border-slate-600 transition-all cursor-pointer aspect-square"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              aria-label={img.src ? `View image: ${img.alt}` : img.alt}
            >
              {img.src ? (
                <>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                  {/* Caption */}
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-[10px] text-white font-medium line-clamp-2">{img.caption}</p>
                    </div>
                  )}
                </>
              ) : (
                <ImagePlaceholder alt={img.alt} caption={img.caption} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Lightbox ─────────────────────────────────────────── */}
      {lightboxIndex !== null && filtered[lightboxIndex]?.src && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="max-w-4xl w-full max-h-[85vh] mx-8" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              style={{ maxHeight: '85vh' }}
            />
            {filtered[lightboxIndex].caption && (
              <p className="mt-3 text-center text-sm text-slate-300">
                {filtered[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 bg-black/60 px-3 py-1.5 rounded-full">
            {lightboxIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </section>
  );
};
