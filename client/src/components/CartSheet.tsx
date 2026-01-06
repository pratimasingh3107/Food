import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartSheetProps {
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSheet({ onClose, onCheckout }: CartSheetProps) {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Your Cart</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground text-center mb-4">
            Add items from restaurants to get started
          </p>
          <Button onClick={onClose} data-testid="button-browse-menu">
            Browse Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b flex items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Your Cart ({items.length})</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-muted-foreground"
          data-testid="button-clear-cart"
        >
          Clear All
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-lg bg-muted/50"
              data-testid={`cart-item-${item.id}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.restaurant}</p>
                <p className="text-sm font-semibold mt-1">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeItem(item.id)}
                  data-testid={`button-remove-${item.id}`}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    data-testid={`button-cart-decrease-${item.id}`}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    data-testid={`button-cart-increase-${item.id}`}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span data-testid="text-cart-total">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={onCheckout} data-testid="button-checkout">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
