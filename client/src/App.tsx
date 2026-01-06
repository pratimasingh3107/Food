import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FoodCard, { type FoodItem } from "@/components/FoodCard";
import OrderTracker, { type Order } from "@/components/OrderTracker";
import ProfilePage from "@/components/ProfilePage";
import CheckoutPage from "@/components/CheckoutPage";

import pizzaImage from "@assets/generated_images/pizza_food_item.png";
import burgerImage from "@assets/generated_images/burger_food_item.png";
import sushiImage from "@assets/generated_images/sushi_food_item.png";
import curryImage from "@assets/generated_images/indian_curry_dish.png";
import saladImage from "@assets/generated_images/healthy_salad_bowl.png";
import pastaImage from "@assets/generated_images/pasta_carbonara_dish.png";

// todo: remove mock functionality
const mockFoodItems: FoodItem[] = [
  {
    id: "pizza-1",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy thin crust.",
    price: 14.99,
    image: pizzaImage,
    restaurant: "Mario's Italian Kitchen",
    rating: 4.8,
    reviews: 234,
    deliveryTime: "25-35 min",
    tags: ["Popular", "Best Seller"],
    isVeg: true,
  },
  {
    id: "burger-1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheese, lettuce, tomato, and our special sauce.",
    price: 12.99,
    image: burgerImage,
    restaurant: "Burger Joint",
    rating: 4.6,
    reviews: 189,
    deliveryTime: "20-30 min",
    tags: ["Fast Delivery"],
    isVeg: false,
  },
  {
    id: "sushi-1",
    name: "Salmon Nigiri Set",
    description: "Fresh salmon sushi set with 8 pieces of premium nigiri and wasabi.",
    price: 18.99,
    image: sushiImage,
    restaurant: "Sushi Master",
    rating: 4.9,
    reviews: 312,
    deliveryTime: "30-40 min",
    tags: ["Premium"],
    isVeg: false,
  },
  {
    id: "curry-1",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces, served with naan and rice.",
    price: 15.99,
    image: curryImage,
    restaurant: "Spice Garden",
    rating: 4.7,
    reviews: 267,
    deliveryTime: "25-35 min",
    tags: ["Spicy"],
    isVeg: false,
  },
  {
    id: "salad-1",
    name: "Grilled Chicken Salad",
    description: "Fresh mixed greens with grilled chicken, avocado, cherry tomatoes, and light vinaigrette.",
    price: 11.99,
    image: saladImage,
    restaurant: "Green Bowl",
    rating: 4.5,
    reviews: 156,
    deliveryTime: "15-25 min",
    tags: ["Healthy", "Low Carb"],
    isVeg: false,
  },
  {
    id: "pasta-1",
    name: "Carbonara",
    description: "Creamy pasta with crispy bacon, parmesan cheese, and a rich egg sauce.",
    price: 13.99,
    image: pastaImage,
    restaurant: "Mario's Italian Kitchen",
    rating: 4.7,
    reviews: 198,
    deliveryTime: "25-35 min",
    isVeg: false,
  },
];

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
  ],
};

// todo: remove mock functionality
const mockOrders: Order[] = [
  {
    id: "ord_abc123xyz",
    restaurant: "Mario's Italian Kitchen",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 14.99 },
      { name: "Caesar Salad", quantity: 1, price: 8.99 },
    ],
    status: "out_for_delivery",
    estimatedTime: "15-20 min",
    deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    total: 26.97,
    placedAt: "Dec 16, 2024 at 7:30 PM",
  },
  {
    id: "ord_def456abc",
    restaurant: "Sushi Master",
    items: [
      { name: "Salmon Nigiri Set", quantity: 1, price: 18.99 },
      { name: "Miso Soup", quantity: 2, price: 3.99 },
    ],
    status: "delivered",
    estimatedTime: "Delivered",
    deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    total: 29.96,
    placedAt: "Dec 15, 2024 at 6:00 PM",
  },
];

function HomePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Popular Near You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockFoodItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 bg-muted/30">
        <h2 className="text-2xl font-bold mb-2">Why Choose FoodDash?</h2>
        <p className="text-muted-foreground mb-8">
          Experience the best food delivery service in town
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background p-6 rounded-lg border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">30</span>
            </div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Get your food delivered in 30 minutes or less
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">500+</span>
            </div>
            <h3 className="font-semibold mb-2">Top Restaurants</h3>
            <p className="text-sm text-muted-foreground">
              Choose from hundreds of local favorites
            </p>
          </div>
          <div className="bg-background p-6 rounded-lg border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">24/7</span>
            </div>
            <h3 className="font-semibold mb-2">Always Available</h3>
            <p className="text-sm text-muted-foreground">
              Order anytime, day or night
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Active Orders</h1>
      {mockOrders.filter(o => o.status !== "delivered").map((order) => (
        <OrderTracker key={order.id} order={order} />
      ))}

      <h2 className="text-xl font-bold pt-6">Past Orders</h2>
      {mockOrders.filter(o => o.status === "delivered").map((order) => (
        <OrderTracker key={order.id} order={order} />
      ))}
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "orders":
        return <OrdersPage />;
      case "profile":
        return (
          <ProfilePage
            user={mockUser}
            orders={mockOrders}
            onViewOrder={() => setCurrentPage("orders")}
          />
        );
      case "checkout":
        return (
          <CheckoutPage
            onBack={() => setCurrentPage("home")}
            onPlaceOrder={() => setCurrentPage("orders")}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={mockUser} onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <CartProvider>
            <Toaster />
            <AppContent />
          </CartProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
