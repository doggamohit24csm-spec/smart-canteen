export type CrowdLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY HIGH';
export type OrderStatus = 'received' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type FoodCategory = 'all' | 'breakfast' | 'meals' | 'snacks' | 'beverages' | 'desserts';

export type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'menu'
  | 'food-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'digital-token'
  | 'order-tracking'
  | 'order-history'
  | 'crowd-details'
  | 'profile'
  | 'notifications'
  | 'admin-dashboard'
  | 'admin-orders'
  | 'admin-menu'
  | 'admin-crowd'
  | 'admin-analytics';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<FoodCategory, 'all'>;
  image: string;
  prepTime: number;
  available: boolean;
  ingredients: string[];
  popular?: boolean;
}

export interface CartItem {
  food: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  token: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  placedAt: Date;
  estimatedReady: Date;
  queuePosition: number;
}

export interface CanteenStatus {
  level: CrowdLevel;
  waitTime: number;
  peopleWaiting: number;
  activeOrders: number;
}

export interface AppNotification {
  id: string;
  message: string;
  detail?: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  read: boolean;
}

export interface User {
  name: string;
  email: string;
  studentId: string;
}
