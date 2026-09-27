import React, { useState } from 'react';
import { CartItem, Order } from '../types';
import { formatPKR, generateWhatsAppOrderLink } from '../utils/helpers';
import { BUSINESS_INFO } from '../data/storeData';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState<string>('');
  const [promoSuccess, setPromoSuccess] = useState<string>('');

  // Checkout form state
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Shahkot');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<
    'cod' | 'jazzcash_easypaisa' | 'bank_transfer' | 'pickup'
  >('cod');
  const [notes, setNotes] = useState<string>('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);

  // Free delivery for pickup or over Rs 3,000
  const shippingFee =
    deliveryType === 'pickup' || subtotal >= 3000 ? 0 : 200;

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    if (promoCode.trim().toUpperCase() === 'SHINE20') {
      setDiscountPercent(20);
      setPromoSuccess('Promo code SHINE20 applied! 20% discount granted.');
    } else {
      setPromoError('Invalid promo code. Use code SHINE20 for 20% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || (deliveryType === 'delivery' && !address.trim())) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const newOrder: Order = {
      id: `CSO-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      shippingFee,
      discount: discountAmount,
      total,
      customerName,
      phone,
      address: deliveryType === 'delivery' ? address : 'Self-Pickup at Workshop (Main Nankana Mor)',
      city,
      deliveryType,
      paymentMethod,
      notes: notes.trim() || undefined,
      status: 'Order Placed',
    };

    onOrderPlaced(newOrder);
    setCompletedOrder(newOrder);
    setStep('confirmed');
    onClearCart();
  };

  const handleCloseAll = () => {
    setStep('cart');
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleCloseAll} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#131720] border-l border-border text-primary flex flex-col shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-border bg-[#151a24] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-red-500" />
              <h2 className="text-base font-bold text-primary">
                {step === 'cart'
                  ? `Shopping Bag (${cart.reduce((a, b) => a + b.quantity, 0)})`
                  : step === 'checkout'
                  ? 'Delivery & Checkout'
                  : 'Order Confirmation'}
              </h2>
            </div>
            <button
              onClick={handleCloseAll}
              className="p-1 rounded-lg text-secondary hover:text-primary hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1">
            {step === 'confirmed' && completedOrder ? (
              /* Confirmation Screen */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">
                    Order #{completedOrder.id} Placed!
                  </h3>
                  <p className="text-xs text-secondary">
                    Thank you {completedOrder.customerName}. Your auto parts order has been received at Car Shine Shahkot.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#171c26] border border-border text-left text-xs space-y-2">
                  <div className="flex justify-between text-secondary">
                    <span>Order Reference:</span>
                    <span className="font-mono font-bold text-primary">{completedOrder.id}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Items Ordered:</span>
                    <span className="text-primary font-medium">
                      {completedOrder.items.reduce((s, i) => s + i.quantity, 0)} items
                    </span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Total Amount:</span>
                    <span className="text-emerald-400 font-bold tabular-nums">
                      {formatPKR(completedOrder.total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Payment Method:</span>
                    <span className="text-primary uppercase font-medium">
                      {completedOrder.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>Delivery Option:</span>
                    <span className="text-primary">
                      {completedOrder.deliveryType === 'delivery'
                        ? `${completedOrder.address}, ${completedOrder.city}`
                        : 'Workshop Pickup (Main Nankana Mor)'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={generateWhatsAppOrderLink(completedOrder)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-primary font-semibold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Order on WhatsApp (0316-6287979)</span>
                  </a>

                  <button
                    onClick={handleCloseAll}
                    className="w-full py-2 px-4 bg-surface hover:bg-surface-elevated text-secondary hover:text-primary rounded-lg text-xs font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : step === 'checkout' ? (
              /* Checkout Form */
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                
                {/* Delivery Mode */}
                <div>
                  <label className="block font-semibold text-secondary mb-1.5">
                    Fulfillment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-2.5 rounded-lg border text-left flex items-start gap-2 ${
                        deliveryType === 'delivery'
                          ? 'border-red-500 bg-red-950/20 text-primary'
                          : 'border-border bg-[#171c26] text-secondary'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">Courier Delivery</div>
                        <div className="text-[10px] text-secondary">
                          {subtotal >= 3000 ? 'FREE Shipping' : 'Rs. 200 delivery fee'}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('pickup')}
                      className={`p-2.5 rounded-lg border text-left flex items-start gap-2 ${
                        deliveryType === 'pickup'
                          ? 'border-red-500 bg-red-950/20 text-primary'
                          : 'border-border bg-[#171c26] text-secondary'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold">Store Pickup</div>
                        <div className="text-[10px] text-secondary">Main Nankana Mor</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div>
                  <label className="block font-semibold text-secondary mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saqlain / Ali Raza"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-primary placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-secondary mb-1">
                    Contact Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0316-XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-primary placeholder-slate-500 focus:outline-none focus:border-red-500 tabular-nums"
                  />
                </div>

                {deliveryType === 'delivery' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-semibold text-secondary mb-1">
                          City / Town
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-primary focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-secondary mb-1">
                          Area / Landmark
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Near Nankana Mor"
                          className="text-primary w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-primary focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-secondary mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House / Shop #, Mohallah, Road"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-primary placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </>
                )}

                {/* Payment Option */}
                <div>
                  <label className="block font-semibold text-secondary mb-1.5">
                    Payment Method
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'cod', label: 'Cash on Delivery (Pay when parcel arrives)' },
                      { id: 'jazzcash_easypaisa', label: 'JazzCash / EasyPaisa (To 0316-6287979)' },
                      { id: 'bank_transfer', label: 'Direct Bank Transfer / Raast' },
                      ...(deliveryType === 'pickup'
                        ? [{ id: 'pickup', label: 'Pay Cash at Car Shine Workshop Counter' }]
                        : []),
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                          paymentMethod === opt.id
                            ? 'border-red-500 bg-red-950/20 text-primary'
                            : 'border-border bg-[#171c26] text-secondary'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={opt.id}
                          checked={paymentMethod === opt.id}
                          onChange={() => setPaymentMethod(opt.id as any)}
                          className="accent-red-600"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-secondary mb-1">
                    Order Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-primary placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Order Summary in Checkout */}
                <div className="p-3 rounded-xl bg-[#171c26] border border-border space-y-1.5 pt-3">
                  <div className="flex justify-between text-secondary">
                    <span>Subtotal:</span>
                    <span className="tabular-nums font-semibold text-primary">{formatPKR(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount (20%):</span>
                      <span className="tabular-nums font-semibold">-{formatPKR(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-secondary">
                    <span>Shipping:</span>
                    <span className="tabular-nums font-semibold text-primary">
                      {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-border">
                    <span>Total:</span>
                    <span className="text-red-400 tabular-nums">{formatPKR(total)}</span>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="py-2.5 px-3 rounded-lg border border-border text-secondary hover:text-primary text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-primary font-bold rounded-lg text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Confirm Order ({formatPKR(total)})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              /* Cart View */
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-muted mx-auto" />
                    <p className="text-sm text-secondary font-medium">Your shopping bag is empty</p>
                    <p className="text-xs text-muted">
                      Explore our genuine engine oils, car wash shampoos, key covers, and accessories.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Item list */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-start gap-3 p-3 rounded-xl bg-[#161b25] border border-border"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover bg-background border border-border shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-primary truncate">
                              {item.product.name}
                            </h4>
                            <div className="text-[11px] text-secondary mb-2">
                              {item.product.brand} · {formatPKR(item.product.price)}
                            </div>

                            {/* Stepper & delete */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-border rounded bg-[#131720]">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                                  className="w-6 h-6 flex items-center justify-center text-secondary hover:text-primary"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center text-xs font-bold text-primary tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                                  className="w-6 h-6 flex items-center justify-center text-secondary hover:text-primary"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.product.id)}
                                className="text-muted hover:text-red-400 p-1 transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Input */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. SHINE20)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-surface-elevated border border-border rounded-lg px-3 py-1.5 text-xs text-primary placeholder-slate-500 uppercase focus:outline-none focus:border-red-500"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="px-3 py-1.5 bg-surface hover:bg-surface-elevated text-primary rounded-lg text-xs font-semibold"
                        >
                          Apply
                        </button>
                      </div>
                      {promoSuccess && (
                        <p className="text-[11px] text-emerald-400 mt-1 font-medium">{promoSuccess}</p>
                      )}
                      {promoError && (
                        <p className="text-[11px] text-red-400 mt-1">{promoError}</p>
                      )}
                    </div>

                    {/* Subtotal card */}
                    <div className="p-3.5 rounded-xl bg-[#161b25] border border-border text-xs space-y-1.5">
                      <div className="flex justify-between text-secondary">
                        <span>Items Subtotal:</span>
                        <span className="font-semibold text-primary tabular-nums">{formatPKR(subtotal)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Discount (20%):</span>
                          <span className="font-semibold tabular-nums">-{formatPKR(discountAmount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-secondary">
                        <span>Delivery:</span>
                        <span className="font-semibold text-primary">
                          {subtotal >= 3000 ? 'FREE (Orders > Rs 3,000)' : 'Calculated at next step'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-primary pt-2 border-t border-border">
                        <span>Est. Subtotal:</span>
                        <span className="text-red-400 tabular-nums">
                          {formatPKR(subtotal - discountAmount)}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep('checkout')}
                      className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-primary font-bold rounded-lg text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Guarantee */}
          {step === 'cart' && cart.length > 0 && (
            <div className="p-3 border-t border-border bg-[#12151d] text-[11px] text-secondary flex items-center justify-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>100% Genuine Auto Parts & Cash on Delivery Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
