import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import heroImage from "@assets/generated_images/food_delivery_hero_image.png";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Order Food You Love
        </h1>
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Discover the best restaurants and dishes near you. Fast delivery, easy ordering, real-time tracking.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-3 rounded-lg">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
              <Input
                type="text"
                placeholder="Enter your delivery address"
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white/50"
                data-testid="input-hero-location"
              />
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
              <Input
                type="search"
                placeholder="Search restaurants or dishes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white/50"
                data-testid="input-hero-search"
              />
            </div>
            <Button type="submit" size="lg" data-testid="button-hero-search">
              Find Food
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">30</span>
            </div>
            <span>Min Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">500+</span>
            </div>
            <span>Restaurants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">4.8</span>
            </div>
            <span>Avg Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
