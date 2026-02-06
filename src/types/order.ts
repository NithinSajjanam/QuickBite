export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface DeliveryDetails {
  name: string;
  address: string;
  phone: string;
}

export type OrderStatus = 
  | 'order_received' 
  | 'preparing' 
  | 'out_for_delivery' 
  | 'delivered';

export interface Order {
  id: string;
  items: CartItem[];
  deliveryDetails: DeliveryDetails;
  status: OrderStatus;
  total: number;
  createdAt: Date;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  order_received: 'Order Received',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
};

export const ORDER_STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  order_received: 'Your order has been confirmed',
  preparing: 'Our chefs are preparing your delicious meal',
  out_for_delivery: 'Your order is on the way!',
  delivered: 'Enjoy your meal!',
};
