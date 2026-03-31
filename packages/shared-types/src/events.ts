// Event types for MFE orchestration
export type EventType =
  | 'CHECKOUT_STARTED'
  | 'ORDER_PLACED'
  | 'PAYMENT_SUCCESS'
  | 'PAYMENT_FAILED'
  | 'SETTINGS_CHANGED'
  | 'THEME_CHANGED'
  | 'USER_LOGGED_IN'
  | 'USER_LOGGED_OUT';

export interface MFEEvent<T = unknown> {
  type: EventType;
  payload: T;
  timestamp: number;
  source: string;
}

export interface CheckoutDetails {
  orderId: string;
  amount: number;
  currency: string;
  items: CartItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentMethod {
  type: 'card' | 'cash' | 'split';
  details?: Record<string, string>;
}

export interface Order {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  total: number;
  items: CartItem[];
  createdAt: Date;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}
