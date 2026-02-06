import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, MenuItem, Order, DeliveryDetails, OrderStatus } from '@/types/order';

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  currentOrder: Order | null;
  placeOrder: (deliveryDetails: DeliveryDetails) => void;
  clearOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = useCallback((deliveryDetails: DeliveryDetails) => {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      deliveryDetails,
      status: 'order_received',
      total,
      createdAt: new Date(),
    };
    setCurrentOrder(order);
    clearCart();

    // Simulate order status updates
    const statuses: OrderStatus[] = ['preparing', 'out_for_delivery', 'delivered'];
    statuses.forEach((status, index) => {
      setTimeout(() => {
        setCurrentOrder((prev) => prev ? { ...prev, status } : null);
      }, (index + 1) * 5000); // Update every 5 seconds
    });
  }, [items, total, clearCart]);

  const clearOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        currentOrder,
        placeOrder,
        clearOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
