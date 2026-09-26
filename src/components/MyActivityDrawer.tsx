import React from 'react';
import { Booking, Order } from '../types';
import { formatPKR, generateWhatsAppBookingLink, generateWhatsAppOrderLink } from '../utils/helpers';
import { X, Calendar, ShoppingBag, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';

interface MyActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  orders: Order[];
}

export const MyActivityDrawer: React.FC<MyActivityDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  orders,
}) => {
  const [activeTab, setActiveTab] = React.useState<'bookings' | 'orders'>('bookings');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#131720] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#151a24] flex items-center justify-between">
            <h2 className="text-base font-bold text-white">
              My Activity & History
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="p-3 border-b border-slate-800 bg-[#141822]">
            <div className="flex rounded-lg bg-[#0e1117] p-1 border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Service Bookings ({bookings.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Store Orders ({orders.length})</span>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 text-xs">
            {activeTab === 'bookings' ? (
              bookings.length === 0 ? (
                <div className="text-center py-12 space-y-2 text-slate-400">
                  <Calendar className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="font-semibold text-slate-300">No Service Appointments Yet</p>
                  <p className="text-[11px] text-slate-500">
                    Book a car wash, compound polish, or carpet cleaning anytime.
                  </p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 rounded-xl bg-[#161b25] border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-mono font-bold text-red-400">{booking.id}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{booking.status}</span>
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-sm">{booking.serviceName}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {booking.vehicleType} {booking.vehicleModel && `(${booking.vehicleModel})`}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{booking.date} · {booking.timeSlot}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Est. Cost:</span>
                        <span className="font-bold text-white tabular-nums">
                          {formatPKR(booking.estimatedPrice)}
                        </span>
                      </div>

                      <a
                        href={generateWhatsAppBookingLink(booking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-[11px] transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))
              )
            ) : (
              orders.length === 0 ? (
                <div className="text-center py-12 space-y-2 text-slate-400">
                  <ShoppingBag className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="font-semibold text-slate-300">No Store Orders Yet</p>
                  <p className="text-[11px] text-slate-500">
                    Your purchased engine oils, mats, and accessories will appear here.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-xl bg-[#161b25] border border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-mono font-bold text-red-400">{order.id}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-[11px]">
                          <span className="text-slate-300 truncate max-w-[200px]">
                            {item.product.name} (x{item.quantity})
                          </span>
                          <span className="text-slate-200 tabular-nums">
                            {formatPKR(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Total Paid:</span>
                        <span className="font-bold text-white tabular-nums">
                          {formatPKR(order.total)}
                        </span>
                      </div>

                      <a
                        href={generateWhatsAppOrderLink(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded text-[11px] transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
