import ProfilePage from "../ProfilePage";

export default function ProfilePageExample() {
  // todo: remove mock functionality
  const mockUser = {
    id: "user_123",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: undefined,
    addresses: [
      {
        id: "addr_1",
        label: "Home",
        address: "123 Main Street, Apt 4B, New York, NY 10001",
        isDefault: true,
      },
      {
        id: "addr_2",
        label: "Work",
        address: "456 Business Ave, Floor 12, New York, NY 10002",
        isDefault: false,
      },
    ],
  };

  const mockOrders = [
    {
      id: "ord_abc123",
      restaurant: "Mario's Italian Kitchen",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 14.99 },
        { name: "Caesar Salad", quantity: 1, price: 8.99 },
      ],
      status: "delivered" as const,
      estimatedTime: "Delivered",
      deliveryAddress: "123 Main Street, Apt 4B",
      total: 26.97,
      placedAt: "Dec 15, 2024",
    },
    {
      id: "ord_def456",
      restaurant: "Sushi Master",
      items: [
        { name: "Salmon Nigiri Set", quantity: 1, price: 18.99 },
        { name: "Miso Soup", quantity: 2, price: 3.99 },
      ],
      status: "out_for_delivery" as const,
      estimatedTime: "10-15 min",
      deliveryAddress: "123 Main Street, Apt 4B",
      total: 29.96,
      placedAt: "Dec 16, 2024",
    },
  ];

  return (
    <ProfilePage 
      user={mockUser} 
      orders={mockOrders}
      onEditProfile={() => console.log("Edit profile")}
      onViewOrder={(id) => console.log("View order:", id)}
      onReorder={(id) => console.log("Reorder:", id)}
    />
  );
}
