import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Circle,
  ChefHat,
  Bike,
  Home,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";

export interface Order {
  id: string;
  restaurant: string;
  items: { name: string; quantity: number; price: number }[];
  status: "placed" | "preparing" | "out_for_delivery" | "delivered";
  estimatedTime: string;
  deliveryAddress: string;
  total: number;
  placedAt: string;
}

interface OrderTrackerProps {
  order: Order;
  onContactDriver?: () => void;
  onContactRestaurant?: () => void;
}

const statusSteps = [
  { key: "placed", label: "Order Placed", icon: CheckCircle2 },
  { key: "preparing", label: "Preparing", icon: ChefHat },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Bike },
  { key: "delivered", label: "Delivered", icon: Home },
];

export default function OrderTracker({
  order,
  onContactDriver,
  onContactRestaurant,
}: OrderTrackerProps) {
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.key === order.status
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "placed":
        return "bg-blue-500";
      case "preparing":
        return "bg-yellow-500";
      case "out_for_delivery":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="p-6" data-testid={`order-tracker-${order.id}`}>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold">Order #{order.id.slice(-6)}</h3>
            <Badge
              className={`${getStatusColor(order.status)} text-white border-0`}
              data-testid={`badge-status-${order.id}`}
            >
              {statusSteps[currentStepIndex]?.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{order.restaurant}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm font-medium">
            <Clock className="h-4 w-4" />
            <span data-testid={`text-eta-${order.id}`}>{order.estimatedTime}</span>
          </div>
          <p className="text-xs text-muted-foreground">Estimated arrival</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between relative">
          {statusSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step.key}
                className="flex flex-col items-center relative z-10"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  } ${isCurrent ? "ring-4 ring-primary/30" : ""}`}
                >
                  {isCompleted ? (
                    <StepIcon className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center ${
                    isCompleted ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}

          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-0">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Delivery Address</p>
          <p className="text-sm font-medium">{order.deliveryAddress}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Order Items</p>
          <div className="space-y-1">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span data-testid={`text-total-${order.id}`}>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {order.status === "out_for_delivery" && (
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              onContactDriver?.();
              console.log("Contact driver clicked");
            }}
            data-testid="button-contact-driver"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Driver
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              onContactRestaurant?.();
              console.log("Contact restaurant clicked");
            }}
            data-testid="button-contact-restaurant"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>
      )}
    </Card>
  );
}
