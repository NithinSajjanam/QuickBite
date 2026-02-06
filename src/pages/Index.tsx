import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import MenuCard from '@/components/MenuCard';
import Cart from '@/components/Cart';
import CheckoutForm from '@/components/CheckoutForm';
import OrderStatus from '@/components/OrderStatus';
import { CartProvider, useCart } from '@/context/CartContext';
import { menuItems } from '@/data/menuItems';

type View = 'menu' | 'checkout' | 'status';

const IndexContent = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [view, setView] = useState<View>('menu');
  const { currentOrder } = useCart();

  // Show order status if there's an active order
  if (currentOrder || view === 'status') {
    if (currentOrder) {
      return <OrderStatus onNewOrder={() => setView('menu')} />;
    }
    setView('menu');
  }

  if (view === 'checkout') {
    return (
      <CheckoutForm
        onBack={() => {
          setView('menu');
          setCartOpen(true);
        }}
        onComplete={() => setView('status')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            Good food, <span className="text-primary">delivered fast</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose from our delicious menu and get it delivered to your doorstep
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </main>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setView('checkout');
        }}
      />
    </div>
  );
};

const Index = () => {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
};

export default Index;
