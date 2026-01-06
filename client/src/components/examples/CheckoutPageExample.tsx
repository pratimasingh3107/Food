import { CartProvider, useCart } from "@/context/CartContext";
import CheckoutPage from "../CheckoutPage";
import pizzaImage from "@assets/generated_images/pizza_food_item.png";
import burgerImage from "@assets/generated_images/burger_food_item.png";
import { useEffect } from "react";

function CheckoutWithItems() {
  const { addItem } = useCart();

  // todo: remove mock functionality
  useEffect(() => {
    addItem({
      id: "pizza-1",
      name: "Margherita Pizza",
      price: 14.99,
      image: pizzaImage,
      restaurant: "Mario's Italian Kitchen",
    });
    addItem({
      id: "burger-1",
      name: "Classic Cheeseburger",
      price: 12.99,
      image: burgerImage,
      restaurant: "Burger Joint",
    });
  }, []);

  return (
    <CheckoutPage
      onBack={() => console.log("Go back")}
      onPlaceOrder={() => console.log("Order placed!")}
    />
  );
}

export default function CheckoutPageExample() {
  return (
    <CartProvider>
      <CheckoutWithItems />
    </CartProvider>
  );
}
