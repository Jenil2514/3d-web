export interface Pizza {
  id: string;
  name: string;
  italianName?: string;
  description: string;
  ingredients: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  prepTime: string;
  calories: string;
  category: 'Vegetarian' | 'Specialty' | 'Spicy' | 'Classic';
  image: string;
  isPopular?: boolean;
  isChefRecommendation?: boolean;
  spiciness?: number; // 0 to 3
}

export interface CartItem {
  pizza: Pizza;
  quantity: number;
  crust?: string;
  size?: 'Medium (11")' | 'Large (14")' | 'Family (18")';
  extraToppings?: string[];
  totalPrice: number;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  favoritePizza: string;
  date: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Pizza' | 'Kitchen' | 'Ingredients' | 'Atmosphere';
  image: string;
  aspectRatio?: string;
  caption: string;
}
