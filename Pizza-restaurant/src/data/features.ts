import { Feature } from '../types';

export const FEATURES: Feature[] = [
  {
    id: 'fresh-ingredients',
    icon: '🍕',
    title: 'Fresh Ingredients',
    subtitle: 'Farm to Oven',
    description: 'We source 100% organic San Marzano tomatoes, heirloom vegetables, and hand-picked basil delivered fresh every single morning.',
    badge: '100% Organic'
  },
  {
    id: 'wood-fired',
    icon: '🔥',
    title: 'Wood Fired Perfection',
    subtitle: '800°F Brick Oven',
    description: 'Baked in custom Neapolitan Vesuvian volcanic stone brick ovens at 800°F for exactly 90 seconds to achieve the perfect leopard-spotted crust.',
    badge: 'Authentic 90s'
  },
  {
    id: 'premium-cheese',
    icon: '🧀',
    title: 'Premium Cheese',
    subtitle: 'Direct from Campania',
    description: 'Authentic Buffalo Mozzarella Campana DOP and hand-stretched Fior di Latte imported weekly from artisanal dairies in Naples.',
    badge: 'DOP Certified'
  },
  {
    id: 'fast-delivery',
    icon: '🚚',
    title: 'Fast & Hot Delivery',
    subtitle: 'Thermal Express Box',
    description: 'Custom ventilated insulated thermal boxes guarantee your pizza arrives piping hot, crispy, and oven-fresh within 30 minutes.',
    badge: '30-Min Guarantee'
  }
];
