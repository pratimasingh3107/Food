import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "../Navbar";

export default function NavbarExample() {
  // todo: remove mock functionality
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: undefined,
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <Navbar 
          user={mockUser} 
          onNavigate={(page) => console.log("Navigate to:", page)} 
        />
      </CartProvider>
    </ThemeProvider>
  );
}
