export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  featured?: boolean;
  rating?: number;
  inStock: boolean;
  createdAt: string;
  reviews?: Review[];
  avgRating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export type PaymentMethod = 'razorpay' | 'cash_on_delivery';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  address?: Address;
  paymentMethod?: PaymentMethod;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
}