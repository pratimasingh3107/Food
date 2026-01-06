import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  CreditCard,
  Edit2,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import type { Order } from "./OrderTracker";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses?: { id: string; label: string; address: string; isDefault: boolean }[];
}

interface ProfilePageProps {
  user: UserProfile;
  orders?: Order[];
  onEditProfile?: () => void;
  onViewOrder?: (orderId: string) => void;
  onReorder?: (orderId: string) => void;
}

export default function ProfilePage({
  user,
  orders = [],
  onEditProfile,
  onViewOrder,
  onReorder,
}: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
  });

  const handleSave = () => {
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "out_for_delivery":
        return "secondary";
      case "preparing":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold" data-testid="text-profile-name">
              {user.name}
            </h1>
            <p className="text-muted-foreground" data-testid="text-profile-email">
              {user.email}
            </p>
            {user.phone && (
              <p className="text-sm text-muted-foreground">{user.phone}</p>
            )}
          </div>

          <Button
            variant="outline"
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
                onEditProfile?.();
              }
            }}
            data-testid="button-edit-profile"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </div>

        {isEditing && (
          <div className="mt-6 space-y-4">
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  data-testid="input-profile-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  data-testid="input-profile-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                  data-testid="input-profile-phone"
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Order History
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Addresses
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4">
          {orders.length === 0 ? (
            <Card className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                Your order history will appear here
              </p>
              <Button data-testid="button-start-ordering">Start Ordering</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card
                  key={order.id}
                  className="p-4 hover-elevate cursor-pointer"
                  onClick={() => {
                    onViewOrder?.(order.id);
                    console.log("View order:", order.id);
                  }}
                  data-testid={`card-order-${order.id}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{order.restaurant}</h4>
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {order.placedAt} • {order.items.length} items
                      </p>
                      <p className="text-sm line-clamp-1">
                        {order.items.map((i) => i.name).join(", ")}
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="font-semibold">
                        ${order.total.toFixed(2)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onReorder?.(order.id);
                          console.log("Reorder:", order.id);
                        }}
                        data-testid={`button-reorder-${order.id}`}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reorder
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="addresses" className="mt-4">
          <Card className="p-4">
            <div className="space-y-4">
              {user.addresses && user.addresses.length > 0 ? (
                user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{addr.label}</span>
                        {addr.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {addr.address}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved addresses</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your delivery addresses for faster checkout
                  </p>
                  <Button data-testid="button-add-address">Add Address</Button>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-4">
          <Card className="p-8 text-center">
            <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No payment methods</h3>
            <p className="text-muted-foreground mb-4">
              Add a payment method for seamless checkout
            </p>
            <Button data-testid="button-add-payment">Add Payment Method</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
