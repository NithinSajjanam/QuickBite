import { Check, Clock, ChefHat, Truck, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { OrderStatus as OrderStatusType, ORDER_STATUS_LABELS, ORDER_STATUS_DESCRIPTIONS } from '@/types/order';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OrderStatusProps {
  onNewOrder: () => void;
}

const statusSteps: { status: OrderStatusType; icon: React.ElementType }[] = [
  { status: 'order_received', icon: Clock },
  { status: 'preparing', icon: ChefHat },
  { status: 'out_for_delivery', icon: Truck },
  { status: 'delivered', icon: PartyPopper },
];

const OrderStatus = ({ onNewOrder }: OrderStatusProps) => {
  const { currentOrder, clearOrder } = useCart();

  if (!currentOrder) return null;

  const currentIndex = statusSteps.findIndex(
    (step) => step.status === currentOrder.status
  );

  const handleNewOrder = () => {
    clearOrder();
    onNewOrder();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-background py-8"
    >
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/10 mb-4">
            <Check className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Order #{currentOrder.id}
          </p>
        </motion.div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Progress line */}
              <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-0.5 bg-muted" />
              <div
                className="absolute left-6 top-6 w-0.5 bg-primary transition-all duration-500"
                style={{
                  height: `${(currentIndex / (statusSteps.length - 1)) * 100}%`,
                  maxHeight: 'calc(100% - 3rem)',
                }}
              />

              <div className="space-y-8">
                {statusSteps.map((step, index) => {
                  const isActive = index <= currentIndex;
                  const isCurrent = index === currentIndex;
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.status}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-start gap-4 pl-16"
                    >
                      <div
                        className={cn(
                          'absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300',
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted bg-background text-muted-foreground',
                          isCurrent && 'animate-pulse-soft ring-4 ring-primary/20'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="pt-2">
                        <h3
                          className={cn(
                            'font-semibold',
                            isActive ? 'text-foreground' : 'text-muted-foreground'
                          )}
                        >
                          {ORDER_STATUS_LABELS[step.status]}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {ORDER_STATUS_DESCRIPTIONS[step.status]}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{currentOrder.deliveryDetails.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="font-medium text-right max-w-[60%]">
                {currentOrder.deliveryDetails.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{currentOrder.deliveryDetails.phone}</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-primary">
                ${(currentOrder.total + 2.99).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {currentOrder.status === 'delivered' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Button onClick={handleNewOrder} className="w-full" size="lg">
              Place New Order
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default OrderStatus;
