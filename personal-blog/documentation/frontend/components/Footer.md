> 🖥️ **Frontend Documentation**

# Footer

**Location:** `components/Footer.tsx`
**Type:** Layout Component

## Description

The Footer component provides site-wide footer with three columns: site information, quick navigation links, and social media connections. It includes a copyright notice and responsive grid layout.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| — | — | — | — | No props accepted |

## State & Hooks

- **No local state**: Static component with no interactive elements
- **No hooks**: Pure presentational component

## Usage Example

```tsx
import { Footer } from '@/components/Footer';

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

### Layout Sections
1. **Site Information**: Blog description and branding
2. **Quick Links**: Navigation to main pages
3. **Social Links**: External social media connections
4. **Copyright**: Footer with current year

### Visual Elements

#### Site Information Column
```tsx
<div>
  <h3 className="text-lg font-semibold mb-4">Your Blog</h3>
  <p className="text-muted-foreground text-sm">
    A modern personal blog built with Next.js and Tailwind CSS.
  </p>
</div>
```

#### Quick Links Column
- Home (`/`)
- Blog (`/blog`) 
- About (`/about`)

#### Social Links Column
- **GitHub**: `https://github.com`
- **Twitter**: `https://twitter.com`
- **LinkedIn**: `https://linkedin.com`

#### Copyright Section
```tsx
<p>&copy; {new Date().getFullYear()} Your Blog. All rights reserved.</p>
```

### Styling Classes
- **Footer Container**: `border-t bg-background`
- **Main Container**: `container mx-auto px-4 py-8`
- **Grid Layout**: `grid grid-cols-1 md:grid-cols-3 gap-8`
- **Column Headers**: `text-lg font-semibold mb-4`
- **Links**: `text-muted-foreground hover:text-foreground`
- **Social Icons**: `text-muted-foreground hover:text-foreground`
- **Copyright**: `mt-8 pt-8 border-t text-center text-sm text-muted-foreground`

## Social Media Icons

The component includes inline SVG icons for social media platforms:

### GitHub Icon
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..."/>
</svg>
```

### Twitter Icon
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723..."/>
</svg>
```

### LinkedIn Icon
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037..."/>
</svg>
```

## Responsive Design

### Breakpoints
- **Mobile**: Single column layout (`grid-cols-1`)
- **Desktop**: Three column layout (`md:grid-cols-3`)

### Container Behavior
- **Padding**: Consistent `px-4` on all screen sizes
- **Spacing**: `gap-8` between columns
- **Text Scaling**: Responsive typography scales appropriately

## Accessibility

- **Semantic HTML**: Proper `<footer>` element usage
- **Link Semantics**: Clear link text and destinations
- **External Links**: `target="_blank"` and `rel="noopener noreferrer"` for security
- **Visual Hierarchy**: Clear heading structure with proper contrast
- **Keyboard Navigation**: All links are focusable and accessible

## Performance Considerations

- **Static Component**: No client-side JavaScript required
- **Inline SVGs**: No additional HTTP requests for icons
- **Minimal Dependencies**: Only uses Next.js Link component
- **CSS Optimization**: Efficient Tailwind utility usage

## Integration Points

- **Layout System**: Part of root layout structure
- **Navigation**: Complements header navigation
- **Theme System**: Uses theme-aware color classes
- **Routing**: Internal links use Next.js Link component

## Customization Options

### Site Information
Update the site name and description:

```tsx
<h3 className="text-lg font-semibold mb-4">Your Blog Name</h3>
<p className="text-muted-foreground text-sm">
  Your custom blog description here.
</p>
```

### Navigation Links
Add or remove quick links:

```tsx
<ul className="space-y-2 text-sm">
  <li><Link href="/">Home</Link></li>
  <li><Link href="/blog">Blog</Link></li>
  <li><Link href="/about">About</Link></li>
  <li><Link href="/contact">Contact</Link></li> {/* Add new link */}
</ul>
```

### Social Media Links
Update social media URLs and add new platforms:

```tsx
<a href="https://your-profile-url" target="_blank" rel="noopener noreferrer">
  {/* SVG icon or text */}
</a>
```

### Copyright Notice
Customize the copyright text:

```tsx
<p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
```

## SEO Considerations

- **Internal Linking**: Provides additional navigation for crawlers
- **External Links**: Proper rel attributes for security and SEO
- **Semantic Structure**: Footer provides site structure context
- **No JavaScript Dependency**: Content accessible to all crawlers

## Internationalization

The component can be enhanced for i18n:

```tsx
// Example with internationalization
<h3>{t('footer.about')}</h3>
<p>{t('footer.description')}</p>
```

## Notes

- Social media links currently point to generic URLs - update with actual profiles
- Component is fully static and server-renderable
- Uses current year dynamically for copyright
- All external links open in new tabs for better UX
- Hover effects provide visual feedback for interactive elements
