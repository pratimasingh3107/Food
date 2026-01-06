# Food Ordering Web App Design Guidelines

## Design Approach: Reference-Based

**Primary References**: Swiggy, Zomato, Uber Eats, DoorDash
**Key Principles**: 
- Appetite appeal through vibrant food imagery
- Frictionless ordering flow with clear visual hierarchy
- Trust signals through ratings, reviews, and order tracking transparency
- Mobile-first responsive design with touch-friendly interactions

## Typography

**Font Stack**: 
- Primary: Inter or DM Sans (Google Fonts) - clean, modern sans-serif for UI elements
- Accent: Poppins (Google Fonts) - semi-bold for hero headlines and restaurant names

**Hierarchy**:
- Hero Headlines: text-4xl to text-6xl, font-bold
- Restaurant Names: text-xl to text-2xl, font-semibold
- Food Item Titles: text-lg, font-medium
- Descriptions: text-sm to text-base, font-normal
- Prices: text-lg to text-xl, font-bold (emphasized)
- Order Status: text-base, font-semibold
- Body/Labels: text-sm, font-normal

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4, p-6
- Section spacing: py-8, py-12, py-16
- Card gaps: gap-4, gap-6
- Grid gaps: gap-6, gap-8

**Container Widths**:
- Max content width: max-w-7xl mx-auto
- Food cards: Standard width with aspect ratio preservation
- Forms: max-w-md to max-w-lg

## Component Library

### Navigation
- Sticky top navigation with search bar prominence
- Cart icon with item count badge (top-right)
- User profile dropdown menu
- Mobile: Hamburger menu with slide-out drawer

### Restaurant/Food Listing
- Masonry-style grid on desktop (grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- Cards with: food image (aspect-ratio-square or 4:3), restaurant/item name, rating stars + count, price, delivery time
- Hover effect: subtle lift (translate-y-[-4px]) with shadow increase
- "Add to Cart" button overlay on image hover (desktop) or always visible (mobile)

### Shopping Cart
- Slide-in side panel (right side, fixed position)
- Scrollable item list with thumbnail, quantity stepper (+/-), remove icon
- Sticky footer with subtotal, delivery fee, total
- Prominent checkout button (w-full, large size)

### Order Tracking
- Stepper/progress indicator (horizontal on desktop, vertical on mobile)
- Four stages: Order Placed → Preparing → Out for Delivery → Delivered
- Active stage highlighted, completed stages with checkmark icons
- Estimated delivery time prominently displayed
- Map integration placeholder for delivery tracking

### User Profile
- Two-column layout on desktop (sidebar + content area)
- Sidebar: Profile photo, name, email, edit profile button, navigation tabs
- Order history: Timeline layout with cards showing date, restaurant, items count, total, status badge, reorder button
- Each order expandable to show full item list

### Forms (Checkout/Profile)
- Single column, left-aligned labels
- Input fields: rounded-lg, p-3, border with focus ring
- Required field indicators (asterisk)
- Error states with text-red-600 messaging below fields
- Payment method selection with radio cards (visual selection)

### Hero Section (Homepage)
- Full-width hero with food photography background
- Centered search bar (max-w-2xl) with location input + cuisine/restaurant search
- Headline: "Order Food You Love" style messaging (text-5xl, font-bold)
- Subheadline with value prop
- Gradient overlay for text readability (bg-gradient-to-r from-black/60 to-transparent)
- Buttons with backdrop-blur-md bg-white/20 for glassmorphic effect

### Additional Components
- Rating display: Star icons (Heroicons) + numerical rating + review count
- Badges: "Fast Delivery", "Free Delivery", dietary tags (rounded-full, px-3, py-1)
- Empty states: Illustrations with helpful messaging for empty cart, no orders
- Loading states: Skeleton screens for cards and lists

## Images

**Hero Section**: 
Large, vibrant food photography showing diverse cuisine spread or delivery scene. Full-width, height: 60vh to 80vh. Overlay gradient for text contrast.

**Restaurant/Food Cards**: 
High-quality food photography for each item. Square or 4:3 aspect ratio. Consistent image treatment across all cards.

**Profile Section**: 
User avatar placeholder (circle, 128px diameter). Restaurant logos in order history (64px).

**Empty States**: 
Friendly illustrations for empty cart, no orders yet, error states.

**Order Tracking**: 
Optional delivery person illustration or map placeholder.

**Image Treatment**: 
All food images with subtle rounded corners (rounded-lg). Lazy loading for performance. Consistent aspect ratios for visual rhythm.

---

**Icon Library**: Heroicons (via CDN)
**Animations**: Minimal - only hover states on cards, smooth cart panel slide-in, and order status transitions