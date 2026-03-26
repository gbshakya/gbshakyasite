> 🖥️ **Frontend Documentation**

# Header

**Location:** `components/Header.tsx`
**Type:** Layout Component

## Description

The Header component provides site navigation with a sticky header, site branding, navigation menu, theme toggle, and mobile menu button. It includes active route highlighting and responsive design with mobile-specific menu handling.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| — | — | — | — | No props accepted |

## State & Hooks

- **usePathname**: From `next/navigation` to get current route for active state styling
- **No local state**: Component is fully controlled by route state

## Usage Example

```tsx
import { Header } from '@/components/Header';

// Used in root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## Component Structure

### Navigation Configuration
```typescript
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
];
```

### Visual Elements
1. **Sticky Header**: Fixed positioning with backdrop blur effect
2. **Site Branding**: "GB World" logo linking to home
3. **Navigation Menu**: Desktop-only navigation links
4. **Theme Toggle**: Dark/light mode switcher
5. **Mobile Menu**: Hamburger icon for mobile devices

### Styling Classes
- **Header**: `sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`
- **Container**: `container mx-auto flex h-14 items-center justify-between px-4`
- **Brand**: `text-xl font-bold`
- **Nav Links**: `hidden md:flex items-center space-x-6 text-sm font-medium`
- **Active Link**: `text-foreground` vs `text-foreground/60`
- **Mobile Menu**: `md:hidden` with hamburger SVG

## Navigation Logic

### Active State Detection
```typescript
const pathname = usePathname();

// Active link styling
className={cn(
  'transition-colors hover:text-foreground/80',
  pathname === item.href
    ? 'text-foreground'
    : 'text-foreground/60'
)}
```

### Responsive Behavior
- **Desktop (md+)**: Full navigation menu visible
- **Mobile (<md)**: Hamburger menu button shown
- **Menu Link**: Points to `/menu` (placeholder for mobile menu implementation)

## Accessibility

- **Semantic HTML**: Proper `<header>` element usage
- **Navigation Structure**: `<nav>` element with proper ARIA implications
- **Theme Toggle**: `aria-label="Toggle theme"` for screen readers
- **Keyboard Navigation**: Focusable elements with proper tab order
- **Visual Indicators**: Active state clearly shown through color

## Performance Considerations

- **Client Component**: Uses `'use client'` for `usePathname` hook
- **Minimal Dependencies**: Only uses Next.js navigation hooks
- **CSS Optimization**: Tailwind utilities with efficient purging
- **No Heavy Computations**: Simple conditional rendering

## Responsive Design

### Breakpoints
- **Mobile**: < 768px - Shows hamburger menu
- **Desktop**: ≥ 768px - Shows full navigation

### Container Layout
- **Max Width**: Container class provides responsive max-width
- **Padding**: Consistent `px-4` on all screen sizes
- **Height**: Fixed `h-14` header height

## Integration Points

- **Theme Provider**: Works with next-themes context
- **Routing**: Integrates with Next.js App Router
- **Layout System**: Part of root layout structure
- **Utility Functions**: Uses `cn` from `@/lib/utils`

## Customization Options

### Navigation Items
Modify the navigation array to add/remove menu items:

```typescript
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }, // Add new item
];
```

### Styling Customization
- **Header Height**: Modify `h-14` class
- **Brand Text**: Update "GB World" to your brand name
- **Colors**: Adjust theme colors through CSS variables
- **Transitions**: Customize hover and transition effects

### Mobile Menu Enhancement
The current mobile menu links to `/menu` as a placeholder. To implement a mobile menu:

1. Create a mobile menu component
2. Add state management for menu open/close
3. Implement slide-out or dropdown menu
4. Update the hamburger link to toggle menu

## Theme Integration

The Header component integrates with the theme system through:
- **Theme Toggle Component**: Embedded for dark/light mode switching
- **Theme Classes**: Uses theme-aware Tailwind classes
- **Backdrop Blur**: Works with both light and dark themes

## SEO Considerations

- **Semantic Structure**: Proper header hierarchy
- **Internal Links**: Clean navigation links for crawlers
- **No JavaScript Required**: Basic navigation works without JS
- **Fast Rendering**: Minimal component complexity

## Notes

- Component is marked as client component due to `usePathname` usage
- Mobile menu is a basic placeholder - can be enhanced with slide-out menu
- Theme toggle is integrated directly into the header
- Active route detection provides visual feedback to users
- Backdrop blur effect provides modern glass-morphism styling
