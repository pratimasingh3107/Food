import { CartProvider, useCart } from "@/context/CartContext";
import CartSheet from "../CartSheet";
import pizzaImage from "@assets/generated_images/pizza_food_item.png";
import burgerImage from "@assets/generated_images/burger_food_item.png";
import { useEffect } from "react";

function CartSheetWithItems() {
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
    <div className="w-96 h-[600px] border rounded-lg overflow-hidden">
      <CartSheet 
        onClose={() => console.log("Close cart")} 
        onCheckout={() => console.log("Proceed to checkout")} 
      />
    </div>
  );
}

export default function CartSheetExample() {
  return (
    <CartProvider>
      <CartSheetWithItems />
    </CartProvider>
  );
}
