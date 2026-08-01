export type ProductCategory = 'all' | 'sofas' | 'armchairs' | 'tables' | 'storage' | 'lighting' | 'outdoor';

export interface SwatchOption {
  id: string;
  name: string;
  category: 'Fabric' | 'Leather' | 'Wood' | 'Metal';
  texture: string; // Color hex or image URL pattern
  description: string;
  priceMultiplier: number;
}

export interface LegOption {
  id: string;
  name: string;
  finish: string;
  hex: string;
  price: number;
}

export interface FurnitureModel {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  basePrice: number;
  description: string;
  dimensions: string;
  designer: string;
  images: string[];
  swatches: SwatchOption[];
  legs?: LegOption[];
  featured?: boolean;
  bestseller?: boolean;
}

export interface Hotspot {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  productId: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

export interface RoomScene {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  hotspots: Hotspot[];
}

export interface CartItem {
  cartId: string;
  product: FurnitureModel;
  selectedSwatch: SwatchOption;
  selectedLeg?: LegOption;
  quantity: number;
  totalPrice: number;
}

export interface DesignServiceBooking {
  serviceType: 'In-Home Consultation' | 'In-Store Styling' | 'Virtual 3D Consultation';
  roomType: string;
  preferredStyle: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  preferredDate: string;
  notes?: string;
}
