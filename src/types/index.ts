export type ProductCategory = 
  | 'all'
  | 'engine-oils'
  | 'car-care'
  | 'accessories'
  | 'mats-covers'
  | 'filters'
  | 'bike-care';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  brand: string;
  volumeOrSize?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  compatibleVehicles?: string[];
}

export type ServiceCategory = 
  | 'car-wash'
  | 'paint-care'
  | 'carpet-cleaning'
  | 'oil-change'
  | 'bike-wash';

export interface ServicePackage {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryName: string;
  tagline: string;
  duration: string;
  basePrice: number;
  priceNote?: string;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  vehiclePricing?: {
    hatchback?: number;
    sedan?: number;
    suv?: number;
    bike?: number;
    commercial?: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Booking {
  id: string;
  createdAt: string;
  serviceId: string;
  serviceName: string;
  vehicleType: string;
  vehicleModel?: string;
  date: string;
  timeSlot: string;
  serviceType: 'workshop' | 'doorstep';
  customerName: string;
  phone: string;
  address?: string;
  notes?: string;
  carpetAreaSqFt?: number;
  estimatedPrice: number;
  status: 'Confirmed' | 'Pending Review' | 'Completed';
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'jazzcash_easypaisa' | 'bank_transfer' | 'pickup';
  deliveryType: 'delivery' | 'pickup';
  status: 'Order Placed' | 'Processing' | 'Out for Delivery';
  notes?: string;
}
