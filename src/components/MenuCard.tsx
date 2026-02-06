import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuItem } from '@/types/order';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const MenuCard = ({ item, index }: MenuCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-0 shadow-soft hover:shadow-glow transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 left-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {item.category}
          </span>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>
            <span className="text-lg font-bold text-primary whitespace-nowrap">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <div className="mt-4">
            {quantity === 0 ? (
              <Button
                onClick={() => addItem(item)}
                className="w-full"
                size="lg"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between rounded-lg bg-secondary p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, quantity - 1)}
                  className="h-9 w-9"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold text-lg">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => updateQuantity(item.id, quantity + 1)}
                  className="h-9 w-9"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MenuCard;
