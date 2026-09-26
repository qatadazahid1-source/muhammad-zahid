import React, { useState } from 'react';
import { Product } from '../types';
import { formatPKR } from '../utils/helpers';
import { BUSINESS_INFO } from '../data/storeData';
import { X, Check, ShoppingBag, MessageSquare, ShieldCheck, Truck, Car } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleWhatsAppInquiry = () => {
    const text = `Hello Car Shine Shahkot, I am interested in purchasing:
• Product: ${product.name}
• Price: ${formatPKR(product.price)}
• Quantity: ${quantity}
Is this in stock at Main Nankana Mor shop?`;
    const url = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#141820] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/60 hover:bg-black text-slate-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Image & Guarantee */}
            <div>
              <div className="rounded-xl overflow-hidden bg-[#181d28] border border-slate-800 mb-4 h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#191e2b] border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                  <span>100% Guaranteed Genuine Brand Sealed</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#191e2b] border border-slate-800">
                  <Truck className="w-4 h-4 text-red-500 shrink-0" />
                  <span>Available for Shop Pickup or Courier Delivery</span>
                </div>
              </div>
            </div>

            {/* Details Column */}
            <div>
              {/* Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="font-semibold text-red-400">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.categoryName}</span>
                {product.volumeOrSize && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{product.volumeOrSize}</span>
                  </>
                )}
              </div>

              <h2 className="text-xl font-bold text-white mb-3 leading-snug">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-extrabold text-white tabular-nums">
                  {formatPKR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through tabular-nums">
                    {formatPKR(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-medium">In Stock</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                    Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Compatible Vehicles */}
              {product.compatibleVehicles && (
                <div className="mb-4 p-3 rounded-lg bg-[#191e2b] border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 mb-1.5">
                    <Car className="w-3.5 h-3.5 text-red-400" />
                    <span>Tested Fitment:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-300">
                    {product.compatibleVehicles.map((car, idx) => (
                      <span key={idx} className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                        {car}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Table */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                    Technical Specifications
                  </h4>
                  <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex justify-between py-1.5 px-3 ${
                          idx % 2 === 0 ? 'bg-[#181d28]' : 'bg-[#141820]'
                        }`}
                      >
                        <span className="text-slate-400">{key}</span>
                        <span className="text-slate-200 font-medium tabular-nums">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-700 rounded-lg bg-[#181d28] p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center font-bold text-sm"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-2.5 px-4 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart ({formatPKR(product.price * quantity)})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* WhatsApp Quick Inquiry Button */}
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full py-2 px-3 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ask Question on WhatsApp</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
