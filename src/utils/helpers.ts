import { Booking, Order, CartItem } from '../types';
import { BUSINESS_INFO } from '../data/storeData';

export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

export function generateWhatsAppBookingLink(booking: Booking): string {
  const text = `*New Service Booking Request - Car Shine Shahkot*
━━━━━━━━━━━━━━━━━━━━
*Booking ID:* ${booking.id}
*Service:* ${booking.serviceName}
*Vehicle / Item:* ${booking.vehicleType} ${booking.vehicleModel ? `(${booking.vehicleModel})` : ''}
${booking.carpetAreaSqFt ? `*Carpet Area:* ${booking.carpetAreaSqFt} sq. ft.\n` : ''}*Date & Time:* ${booking.date} | ${booking.timeSlot}
*Service Type:* ${booking.serviceType === 'workshop' ? 'At Workshop (Main Nankana Mor)' : 'Doorstep Pickup / Home Service'}
*Est. Amount:* ${formatPKR(booking.estimatedPrice)}

*Customer Details:*
• Name: ${booking.customerName}
• Phone: ${booking.phone}
${booking.address ? `• Address: ${booking.address}\n` : ''}${booking.notes ? `• Special Notes: ${booking.notes}\n` : ''}
Please confirm my appointment. Thank you!`;

  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function generateWhatsAppOrderLink(order: Order): string {
  const itemsList = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - ${formatPKR(item.product.price * item.quantity)}`
    )
    .join('\n');

  const text = `*New Auto Store Order - Car Shine Shahkot*
━━━━━━━━━━━━━━━━━━━━
*Order ID:* ${order.id}
*Customer:* ${order.customerName}
*Phone:* ${order.phone}
*Delivery Type:* ${order.deliveryType === 'delivery' ? 'Home/Office Delivery' : 'Self Pickup at Workshop'}
*Address:* ${order.address}, ${order.city}
*Payment Method:* ${
    order.paymentMethod === 'cod'
      ? 'Cash on Delivery'
      : order.paymentMethod === 'jazzcash_easypaisa'
      ? 'JazzCash / EasyPaisa'
      : order.paymentMethod === 'bank_transfer'
      ? 'Direct Bank Transfer'
      : 'Pay at Store'
  }

*Order Items:*
${itemsList}

*Subtotal:* ${formatPKR(order.subtotal)}
*Shipping:* ${order.shippingFee === 0 ? 'FREE Delivery' : formatPKR(order.shippingFee)}
*Total Payable:* ${formatPKR(order.total)}
${order.notes ? `*Notes:* ${order.notes}\n` : ''}
Please confirm and prepare my order!`;

  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// Local Storage helpers
export function getSavedCart(): CartItem[] {
  try {
    const data = localStorage.getItem('carshine_cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]): void {
  try {
    localStorage.setItem('carshine_cart', JSON.stringify(cart));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

export function getSavedBookings(): Booking[] {
  try {
    const data = localStorage.getItem('carshine_bookings');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  try {
    const existing = getSavedBookings();
    localStorage.setItem('carshine_bookings', JSON.stringify([booking, ...existing]));
  } catch (err) {
    console.error('Failed to save booking to localStorage', err);
  }
}

export function getSavedOrders(): Order[] {
  try {
    const data = localStorage.getItem('carshine_orders');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  try {
    const existing = getSavedOrders();
    localStorage.setItem('carshine_orders', JSON.stringify([order, ...existing]));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }
}
