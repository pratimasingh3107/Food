import OrderTracker from "../OrderTracker";

export default function OrderTrackerExample() {
  // todo: remove mock functionality
  const mockOrder = {
    id: "ord_abc123xyz",
    restaurant: "Mario's Italian Kitchen",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 14.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
      { name: "Garlic Bread", quantity: 2, price: 4.99 },
    ],
    status: "out_for_delivery" as const,
    estimatedTime: "15-20 min",
    deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    total: 33.96,
    placedAt: "Dec 16, 2024 at 7:30 PM",
  };

  return (
    <div className="max-w-lg">
      <OrderTracker order={mockOrder} />
    </div>
  );
}
