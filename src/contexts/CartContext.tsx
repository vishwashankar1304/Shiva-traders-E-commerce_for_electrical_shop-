import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';
import { Product, CartItem, Cart, Order, Address, PaymentMethod } from '@/types';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: (address: Address, paymentMethod: PaymentMethod) => string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getInitialCart = (): Cart => {
  return {
    items: [],
    totalPrice: 0
  };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(getInitialCart());
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      } else {
        setCart(getInitialCart());
      }
    } else {
      setCart(getInitialCart());
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const calculateTotalPrice = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.items.findIndex(item => item.product.id === product.id);
      
      let updatedItems;
      if (existingItemIndex !== -1) {
        // Increase quantity if product already exists
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item
        updatedItems = [...prevCart.items, { product, quantity }];
      }
      
      const newCart = {
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems)
      };
      
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`,
      });
      
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(item => item.product.id !== productId);
      
      const newCart = {
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems)
      };
      
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart",
      });
      
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      return {
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems)
      };
    });
  };

  const clearCart = () => {
    setCart(getInitialCart());
  };

  const checkout = (address: Address, paymentMethod: PaymentMethod): string | null => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: "Please log in to checkout",
      });
      return null;
    }
    
    if (cart.items.length === 0) {
      toast({
        variant: "destructive",
        title: "Checkout failed",
        description: "Your cart is empty",
      });
      return null;
    }
    
    // Create a new order
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      userId: user.id,
      items: [...cart.items],
      totalPrice: cart.totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      address: address,
      paymentMethod: paymentMethod
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear the cart
    clearCart();
    
    toast({
      title: "Order placed",
      description: `Your order #${newOrder.id} has been placed successfully`,
    });
    
    return newOrder.id;
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};