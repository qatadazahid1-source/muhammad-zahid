import React, { useState, useEffect } from 'react';
import { SERVICES, TIME_SLOTS, BUSINESS_INFO } from '../data/storeData';
import { ServicePackage, Booking } from '../types';
import { formatPKR, generateWhatsAppBookingLink } from '../utils/helpers';
import { X, Calendar, Clock, Car, MapPin, CheckCircle2, MessageCircle, Phone, Sparkles } from 'lucide-react';

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServicePackage | null;
  initialCarpetSqFt?: number;
  initialCarpetPrice?: number;
  onBookingConfirmed: (booking: Booking) => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialCarpetSqFt,
  initialCarpetPrice,
  onBookingConfirmed,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService ? initialService.id : 'full-car-wash'
  );
  const [vehicleType, setVehicleType] = useState<string>('sedan');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [carpetSqFt, setCarpetSqFt] = useState<number>(initialCarpetSqFt || 54);
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [serviceType, setServiceType] = useState<'workshop' | 'doorstep'>('workshop');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

  // Set today or tomorrow as default date
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Update when initialService or carpet props change
  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id);
      if (initialService.category === 'bike-wash') {
        setVehicleType('bike');
      } else if (initialService.category === 'carpet-cleaning') {
        setVehicleType('carpet');
      }
    }
    if (initialCarpetSqFt) {
      setCarpetSqFt(initialCarpetSqFt);
      setSelectedServiceId('carpet-cleaning');
      setVehicleType('carpet');
    }
  }, [initialService, initialCarpetSqFt]);

  if (!isOpen) return null;

  const currentService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  // Dynamic price calculation
  const calculateEstimate = (): number => {
    if (currentService.category === 'carpet-cleaning') {
      return initialCarpetPrice || Math.max(800, carpetSqFt * 30);
    }
    if (currentService.vehiclePricing) {
      if (vehicleType === 'hatchback' && currentService.vehiclePricing.hatchback) {
        return currentService.vehiclePricing.hatchback;
      }
      if (vehicleType === 'sedan' && currentService.vehiclePricing.sedan) {
        return currentService.vehiclePricing.sedan;
      }
      if (vehicleType === 'suv' && currentService.vehiclePricing.suv) {
        return currentService.vehiclePricing.suv;
      }
      if (vehicleType === 'bike' && currentService.vehiclePricing.bike) {
        return currentService.vehiclePricing.bike;
      }
    }
    return currentService.basePrice;
  };

  const estimatedPrice = calculateEstimate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !date) {
      alert('Please enter your Name, Phone Number, and Preferred Date.');
      return;
    }

    const newBooking: Booking = {
      id: `CSB-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      serviceId: currentService.id,
      serviceName: currentService.name,
      vehicleType:
        vehicleType === 'hatchback'
          ? 'Hatchback (Alto / Cultus / Swift)'
          : vehicleType === 'sedan'
          ? 'Sedan (Corolla / Civic / City)'
          : vehicleType === 'suv'
          ? 'SUV / 4x4 (Sportage / Fortuner)'
          : vehicleType === 'bike'
          ? 'Motorbike (70cc / 125cc)'
          : 'Carpet Cleaning',
      vehicleModel: vehicleModel.trim() || undefined,
      date,
      timeSlot,
      serviceType,
      customerName,
      phone,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
      carpetAreaSqFt: currentService.category === 'carpet-cleaning' ? carpetSqFt : undefined,
      estimatedPrice,
      status: 'Confirmed',
    };

    onBookingConfirmed(newBooking);
    setSubmittedBooking(newBooking);
  };

  const handleCloseAll = () => {
    setSubmittedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-[#141820] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#161a24]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-500">
              Car Shine Workshop Booking
            </span>
            <h2 className="text-lg font-bold text-white">
              {submittedBooking ? 'Booking Confirmed!' : 'Book Service Appointment'}
            </h2>
          </div>
          <button
            onClick={handleCloseAll}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedBooking ? (
            /* Confirmation Screen */
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Thank You, {submittedBooking.customerName}!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your appointment request has been recorded. Our team at Main Nankana Mor, Shahkot is ready to serve you.
                </p>
              </div>

              {/* Booking Voucher */}
              <div className="bg-[#181d28] border border-slate-700/80 rounded-xl p-4 text-left text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-slate-700">
                  <span className="text-slate-400">Booking Reference:</span>
                  <span className="font-bold text-white font-mono">{submittedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-white">{submittedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vehicle / Item:</span>
                  <span className="text-slate-200">
                    {submittedBooking.vehicleType}{' '}
                    {submittedBooking.vehicleModel && `(${submittedBooking.vehicleModel})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Appointment Date & Time:</span>
                  <span className="text-slate-200">
                    {submittedBooking.date} · {submittedBooking.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-slate-200">
                    {submittedBooking.serviceType === 'workshop'
                      ? 'Main Nankana Mor, Shahkot'
                      : `Doorstep: ${submittedBooking.address || 'Customer Location'}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-700 text-sm">
                  <span className="font-medium text-slate-300">Estimated Rate:</span>
                  <span className="font-bold text-emerald-400 tabular-nums">
                    {formatPKR(submittedBooking.estimatedPrice)}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <div className="space-y-3">
                <a
                  href={generateWhatsAppBookingLink(submittedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp (0316-6287979)</span>
                </a>

                <button
                  type="button"
                  onClick={handleCloseAll}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors"
                >
                  Done & Back to Site
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>Hotline: Saqlain Amin (0316-6287979)</span>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Select Service */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  1. Choose Service Required
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => {
                    setSelectedServiceId(e.target.value);
                    const s = SERVICES.find((item) => item.id === e.target.value);
                    if (s?.category === 'bike-wash') setVehicleType('bike');
                    if (s?.category === 'carpet-cleaning') setVehicleType('carpet');
                  }}
                  className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({formatPKR(s.basePrice)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Type / Area */}
              {currentService.category === 'carpet-cleaning' ? (
                <div className="p-3 rounded-lg bg-[#181d28] border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-semibold">Estimated Carpet Area:</span>
                    <span className="font-bold text-white tabular-nums">{carpetSqFt} sq. ft.</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={300}
                    step={10}
                    value={carpetSqFt}
                    onChange={(e) => setCarpetSqFt(parseInt(e.target.value))}
                    className="w-full accent-red-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Small Rug (24 sq.ft)</span>
                    <span>Living Room (54-80 sq.ft)</span>
                    <span>Hall / Office (150+ sq.ft)</span>
                  </div>
                </div>
              ) : currentService.category === 'bike-wash' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Motorbike Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Honda CD 70, CG 125, Suzuki GS 150"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    2. Vehicle Classification
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hatchback', label: 'Hatchback', desc: 'Alto, Cultus, WagonR' },
                      { id: 'sedan', label: 'Sedan', desc: 'Corolla, Civic, City' },
                      { id: 'suv', label: 'SUV / 4x4', desc: 'Sportage, Fortuner, Revo' },
                    ].map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVehicleType(v.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all text-xs ${
                          vehicleType === v.id
                            ? 'border-red-500 bg-red-950/20 text-white'
                            : 'border-slate-700 bg-[#181d28] text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        <div className="font-semibold">{v.label}</div>
                        <div className="text-[10px] text-slate-400 truncate">{v.desc}</div>
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Specific Car Model & Color (e.g. White Corolla 2021)"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="mt-2 w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              )}

              {/* Service Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  3. Service Location
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setServiceType('workshop')}
                    className={`p-2.5 rounded-lg border text-left flex items-start gap-2 ${
                      serviceType === 'workshop'
                        ? 'border-red-500 bg-red-950/20 text-white'
                        : 'border-slate-700 bg-[#181d28] text-slate-300'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">At Workshop</div>
                      <div className="text-[10px] text-slate-400">Main Nankana Mor, Shahkot</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('doorstep')}
                    className={`p-2.5 rounded-lg border text-left flex items-start gap-2 ${
                      serviceType === 'doorstep'
                        ? 'border-red-500 bg-red-950/20 text-white'
                        : 'border-slate-700 bg-[#181d28] text-slate-300'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Home / Office Pickup</div>
                      <div className="text-[10px] text-slate-400">Available across Shahkot</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Time Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Contact Info */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Muhammad Zahid"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0316-XXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 tabular-nums"
                    />
                  </div>
                </div>

                {serviceType === 'doorstep' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Shahkot Pickup Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street, Mohallah, House Number, Shahkot"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Special Instructions / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please focus on scratch on driver door, or heavy dust in carpets"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#181d28] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Price Summary & Submit */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Estimated Service Charge:</span>
                  <span className="text-lg font-bold text-white tabular-nums">
                    {formatPKR(estimatedPrice)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors shadow-md"
                >
                  Confirm Appointment
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
