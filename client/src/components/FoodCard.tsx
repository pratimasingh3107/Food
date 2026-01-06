import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurant: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  tags?: string[];
  isVeg?: boolean;
}

interface FoodCardProps {
  item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurant: item.restaurant,
    });
  };

  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-food-${item.id}`}
    >
      <div className="relative aspect-square">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-background rounded-md p-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(item.id, quantity - 1);
                }}
                data-testid={`button-decrease-${item.id}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.id}`}>
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(item.id, quantity + 1);
                }}
                data-testid={`button-increase-${item.id}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              data-testid={`button-add-${item.id}`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {item.isVeg !== undefined && (
          <div
            className={`absolute top-2 right-2 w-4 h-4 border-2 flex items-center justify-center ${
              item.isVeg
                ? "border-green-600"
                : "border-red-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                item.isVeg ? "bg-green-600" : "bg-red-600"
              }`}
            />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-lg line-clamp-1" data-testid={`text-name-${item.id}`}>
            {item.name}
          </h3>
          <span className="font-bold text-lg whitespace-nowrap" data-testid={`text-price-${item.id}`}>
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-2" data-testid={`text-restaurant-${item.id}`}>
          {item.restaurant}
        </p>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {item.description}
        </p>

        <div className="flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{item.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({item.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{item.deliveryTime}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
