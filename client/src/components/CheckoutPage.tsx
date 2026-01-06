import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  CreditCard,
  Wallet,
  Banknote,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CheckoutPageProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function CheckoutPage({ onBack, onPlaceOrder }: CheckoutPageProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: "",
  });

  const deliveryFee = 2.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + deliveryFee + tax;

  const handlePlaceOrder = () => {
    console.log("Placing order:", { items, formData, paymentMethod, total: grandTotal });
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      onPlaceOrder();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto p-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-4">
          Your order is being prepared. You can track its progress in real-time.
        </p>
        <p className="text-sm text-muted-foreground">Redirecting to order tracking...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto p-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-4">
          Add some items to your cart to proceed with checkout.
        </p>
        <Button onClick={onBack} data-testid="button-back-to-menu">
          Browse Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} data-testid="button-back">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5" />
          Delivery Details
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                data-testid="input-checkout-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                required
                data-testid="input-checkout-phone"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Main St, Apt 4B, City, State 12345"
              className="resize-none"
              required
              data-testid="input-checkout-address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Ring doorbell, leave at door, etc."
              className="resize-none"
              data-testid="input-checkout-instructions"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </h2>

        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
          <div
            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${
              paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <RadioGroupItem value="card" id="card" data-testid="radio-card" />
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <Label htmlFor="card" className="cursor-pointer">Credit/Debit Card</Label>
              <p className="text-sm text-muted-foreground">Pay securely with your card</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${
              paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setPaymentMethod("wallet")}
          >
            <RadioGroupItem value="wallet" id="wallet" data-testid="radio-wallet" />
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <Label htmlFor="wallet" className="cursor-pointer">Digital Wallet</Label>
              <p className="text-sm text-muted-foreground">Apple Pay, Google Pay</p>
            </div>
          </div>

          <div
            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${
              paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-border"
            }`}
            onClick={() => setPaymentMethod("cash")}
          >
            <RadioGroupItem value="cash" id="cash" data-testid="radio-cash" />
            <Banknote className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
              <Label htmlFor="cash" className="cursor-pointer">Cash on Delivery</Label>
              <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
            </div>
          </div>
        </RadioGroup>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5" />
          Order Summary
        </h2>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <Separator />

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
          </div>

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span data-testid="text-checkout-total">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      <Button
        className="w-full"
        size="lg"
        onClick={handlePlaceOrder}
        disabled={!formData.name || !formData.phone || !formData.address}
        data-testid="button-place-order"
      >
        Place Order - ${grandTotal.toFixed(2)}
      </Button>
    </div>
  );
}
