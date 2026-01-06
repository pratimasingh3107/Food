import { ThemeProvider } from "@/context/ThemeContext";
import HeroSection from "../HeroSection";

export default function HeroSectionExample() {
  return (
    <ThemeProvider>
      <HeroSection onSearch={(query) => console.log("Search:", query)} />
    </ThemeProvider>
  );
}
