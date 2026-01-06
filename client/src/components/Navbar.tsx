import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  User,
  Moon,
  Sun,
  Menu,
  MapPin,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useCart } from "@/context/CartContext";
import CartSheet from "./CartSheet";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onNavigate?: (page: string) => void;
}

export default function Navbar({ user, onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex flex-col gap-4 mt-8">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      onNavigate?.("home");
                      setMobileMenuOpen(false);
                    }}
                    data-testid="link-mobile-home"
                  >
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      onNavigate?.("orders");
                      setMobileMenuOpen(false);
                    }}
                    data-testid="link-mobile-orders"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      onNavigate?.("profile");
                      setMobileMenuOpen(false);
                    }}
                    data-testid="link-mobile-profile"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <button
              onClick={() => onNavigate?.("home")}
              className="flex items-center gap-2"
              data-testid="link-logo"
            >
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">FoodDash</span>
            </button>

            <div className="hidden lg:flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Deliver to:</span>
              <Button variant="ghost" className="p-0 h-auto text-foreground font-medium" data-testid="button-location">
                Current Location
              </Button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for restaurants or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="input-search"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="relative"
                  data-testid="button-cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      data-testid="badge-cart-count"
                    >
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md p-0">
                <CartSheet onClose={() => setCartOpen(false)} onCheckout={() => {
                  setCartOpen(false);
                  onNavigate?.("checkout");
                }} />
              </SheetContent>
            </Sheet>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium">
                      {user.name.split(" ")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate?.("profile")} data-testid="menu-item-profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate?.("orders")} data-testid="menu-item-orders">
                    <Package className="h-4 w-4 mr-2" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem data-testid="menu-item-settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => {
                      window.location.href = "/api/logout";
                    }}
                    data-testid="menu-item-logout"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => window.location.href = "/api/login"} data-testid="button-login">
                Login
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-mobile"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
