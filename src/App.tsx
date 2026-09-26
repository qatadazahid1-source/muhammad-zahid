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

  // Quick toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
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

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-slate-700 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        cartCount={totalCartItemsCount}
        openCart={() => setIsCartOpen(true)}
        openBookingModal={() => handleOpenBookingModal()}
        savedBookingsCount={savedBookings.length + savedOrders.length}
        openActivityModal={() => setIsActivityOpen(true)}
      />

      {/* Main Views based on activeTab */}
      <main className="flex-1">
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

      {/* Persistent Floating WhatsApp & Call Hotline */}
      <aside aria-label="Customer quick contact" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group text-xs font-bold"
          title="Chat with Car Shine on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>

        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl transition-all transform hover:scale-105"
          title={`Call ${BUSINESS_INFO.phoneFormatted}`}
        >
          <Phone className="w-4 h-4" />
        </a>
      </aside>

      {/* Service Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedServiceToBook}
        initialCarpetSqFt={carpetSqFtToBook}
        initialCarpetPrice={carpetPriceToBook}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* User Activity & History Drawer */}
      <MyActivityDrawer
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        bookings={savedBookings}
        orders={savedOrders}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenBooking={() => handleOpenBookingModal()}
      />

    </div>
  );
}
