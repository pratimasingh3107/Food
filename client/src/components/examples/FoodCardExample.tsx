import { CartProvider } from "@/context/CartContext";
import FoodCard from "../FoodCard";
import pizzaImage from "@assets/generated_images/pizza_food_item.png";

export default function FoodCardExample() {
  // todo: remove mock functionality
  const mockItem = {
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
  };

  return (
    <CartProvider>
      <div className="max-w-xs">
        <FoodCard item={mockItem} />
      </div>
    </CartProvider>
  );
}
