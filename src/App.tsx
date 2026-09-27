/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeOverview } from './components/HomeOverview';
import { ServicesSection } from './components/ServicesSection';
import { ShopSection } from './components/ShopSection';
import { CarpetCleaningSection } from './components/CarpetCleaningSection';
import { LocationAndContact } from './components/LocationAndContact';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { MyActivityDrawer } from './components/MyActivityDrawer';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';

import { Product, ServicePackage, CartItem, Booking, Order } from './types';
import {
  getSavedCart,
  saveCart,
  getSavedBookings,
  saveBooking,
  getSavedOrders,
  saveOrder,
} from './utils/helpers';
import { BUSINESS_INFO } from './data/storeData';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => getSavedCart());
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Booking state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<ServicePackage | null>(null);
  const [carpetSqFtToBook, setCarpetSqFtToBook] = useState<number | undefined>(undefined);
  const [carpetPriceToBook, setCarpetPriceToBook] = useState<number | undefined>(undefined);

  // Product detail modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Activity modal
  const [isActivityOpen, setIsActivityOpen] = useState<boolean>(false);
  const [savedBookings, setSavedBookings] = useState<Booking[]>(() => getSavedBookings());
  const [savedOrders, setSavedOrders] = useState<Order[]>(() => getSavedOrders());

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show scroll-to-top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Track scroll for scroll-to-top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    saveBooking(newBooking);
    setSavedBookings(getSavedBookings());
    showToast(`Booking ${newBooking.id} recorded successfully!`);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    saveOrder(newOrder);
    setSavedOrders(getSavedOrders());
    showToast(`Order ${newOrder.id} placed successfully!`);
  };

  const handleOpenBookingModal = (
    service?: ServicePackage,
    sqFt?: number,
    price?: number
  ) => {
    setSelectedServiceToBook(service || null);
    setCarpetSqFtToBook(sqFt);
    setCarpetPriceToBook(price);
    setIsBookingOpen(true);
  };

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Scroll to top when changing tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col selection:bg-red-600 selection:text-primary">

      {/* ── Skip to content (accessibility) ──────── */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ── Toast Alert ───────────────────────────── */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-6 left-1/2 z-[100] bg-background border border-border text-primary text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 toast-enter"
          style={{ transform: 'translateX(-50%)' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Navigation Bar ────────────────────────── */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={totalCartItemsCount}
        openCart={() => setIsCartOpen(true)}
        openBookingModal={() => handleOpenBookingModal()}
        savedBookingsCount={savedBookings.length + savedOrders.length}
        openActivityModal={() => setIsActivityOpen(true)}
      />

      {/* ── Main Content ──────────────────────────── */}
      <main id="main-content" className="flex-1">
        {activeTab === 'home' && (
          <HomeOverview
            onOpenBooking={(service) => handleOpenBookingModal(service)}
            onOpenShop={() => handleTabChange('shop')}
            onOpenCarpet={() => handleTabChange('carpet')}
            onOpenLocation={() => handleTabChange('location')}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onOpenProductDetail={(product) => setSelectedProduct(product)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesSection
            onSelectServiceToBook={(service) => handleOpenBookingModal(service)}
          />
        )}

        {activeTab === 'shop' && (
          <ShopSection
            onAddToCart={(product, qty) => handleAddToCart(product, qty || 1)}
            onOpenProductDetail={(product) => setSelectedProduct(product)}
          />
        )}

        {activeTab === 'carpet' && (
          <CarpetCleaningSection
            onBookCarpet={(sqFt, price) =>
              handleOpenBookingModal(undefined, sqFt, price)
            }
          />
        )}

        {activeTab === 'location' && <LocationAndContact />}
      </main>

      {/* ── Floating WhatsApp + Scroll Top (desktop) ─ */}
      <aside
        aria-label="Quick contact actions"
        className="hidden sm:flex fixed bottom-6 right-5 z-40 flex-col items-end gap-2.5"
      >
        {/* Scroll to top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface hover:bg-surface-elevated text-primary border border-border shadow-lg transition-all hover:scale-105"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        )}

        {/* WhatsApp pill */}
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Assalam-o-Alaikum Car Shine! I want to inquire about your services.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-primary shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-xs font-bold"
          title="Chat with Car Shine on WhatsApp"
          aria-label="Chat with Car Shine on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
          <span>WhatsApp Us</span>
        </a>

        {/* Call button */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-primary shadow-xl transition-all hover:scale-105"
          title={`Call ${BUSINESS_INFO.phoneFormatted}`}
          aria-label={`Call Car Shine at ${BUSINESS_INFO.phoneFormatted}`}
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
        </a>
      </aside>

      {/* ── Mobile floating WhatsApp (separate from bottom bar) ─── */}
      <a
        href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent('Assalam-o-Alaikum Car Shine! I want to inquire about your services.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden fixed bottom-28 right-4 z-40 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-primary shadow-xl flex items-center justify-center transition-all hover:scale-105 animate-pulse-red"
        style={{ animation: 'none' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" aria-hidden="true" />
      </a>

      {/* ── Service Booking Modal ─────────────────── */}
      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedServiceToBook}
        initialCarpetSqFt={carpetSqFtToBook}
        initialCarpetPrice={carpetPriceToBook}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* ── Product Detail Modal ──────────────────── */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* ── Shopping Cart Drawer ──────────────────── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* ── User Activity Drawer ──────────────────── */}
      <MyActivityDrawer
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        bookings={savedBookings}
        orders={savedOrders}
      />

      {/* ── Footer ───────────────────────────────── */}
      {/* Add bottom padding on mobile to account for the bottom bar */}
      <div className="sm:hidden h-28" aria-hidden="true" />
      <Footer
        onNavigate={handleTabChange}
        onOpenBooking={() => handleOpenBookingModal()}
      />

      {/* ── Mobile Bottom Action Bar ──────────────── */}
      <MobileBottomBar onBookClick={() => handleOpenBookingModal()} />

    </div>
  );
}
