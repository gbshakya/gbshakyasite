> 🖥️ **Frontend Documentation**

# ThemeToggle

**Location:** `components/ThemeToggle.tsx`
**Type:** UI Component

## Description

The ThemeToggle component provides a button for switching between light and dark themes. It uses the next-themes library for theme management and displays animated sun/moon icons that transition based on the current theme.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| — | — | — | — | No props accepted |

## State & Hooks

- **useTheme**: From `next-themes` to get current theme and setTheme function
  - `theme`: Current theme ('light', 'dark', or 'system')
  - `setTheme`: Function to change theme

## Usage Example

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';

// Used in Header component
export function Header() {
  return (
    <header>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
```

## Component Structure

### Button Element
```tsx
<button
  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
  aria-label="Toggle theme"
>
  {/* Icons */}
</button>
```

### Theme Logic
```typescript
const { setTheme, theme } = useTheme();

// Toggle between light and dark
onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
```

## Icon System

The component uses two overlapping SVG icons with conditional visibility:

### Sun Icon (Light Theme)
```svg
<svg
  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  xmlns="http://www.w3.org/2000/svg"
  width="24" height="24"
  viewBox="0 0 24 24"
  fill="none" stroke="currentColor" strokeWidth="2"
>
  <circle cx="12" cy="12" r="5" />
  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
</svg>
```

### Moon Icon (Dark Theme)
```svg
<svg
  className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  xmlns="http://www.w3.org/2000/svg"
  width="24" height="24"
  viewBox="0 0 24 24"
  fill="none" stroke="currentColor" strokeWidth="2"
>
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
</svg>
```

## Animation System

### Icon Transitions
- **Sun Icon**: 
  - Light theme: `rotate-0 scale-100` (visible)
  - Dark theme: `-rotate-90 scale-0` (hidden, rotated and scaled)
- **Moon Icon**:
  - Light theme: `rotate-90 scale-0` (hidden, rotated and scaled)
  - Dark theme: `rotate-0 scale-100` (visible)

### CSS Classes Used
- **Transition**: `transition-all` for smooth animations
- **Transform**: `rotate-*` and `scale-*` for icon switching
- **Positioning**: `absolute` for moon icon overlay
- **Dark Mode**: `dark:*` classes for theme-specific styling

## Styling Classes

### Button Styles
- **Base**: `inline-flex items-center justify-center rounded-md text-sm font-medium`
- **Interactive**: `hover:bg-accent hover:text-accent-foreground`
- **Focus**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- **Size**: `h-10 w-10` (square button)
- **States**: `disabled:pointer-events-none disabled:opacity-50`

### Accessibility
- **ARIA Label**: `aria-label="Toggle theme"`
- **Screen Reader**: `<span className="sr-only">Toggle theme</span>`

## Theme Integration

### Theme Provider Requirement
The component requires a `ThemeProvider` from next-themes to be wrapped higher in the component tree:

```tsx
// In root layout
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  <Header />
  {/* rest of app */}
</ThemeProvider>
```

### Theme Values
- **'light'**: Forces light theme
- **'dark'**: Forces dark theme  
- **'system'**: Uses system preference (default)

## Accessibility

- **ARIA Label**: Clear description for screen readers
- **Keyboard Accessible**: Button can be activated with keyboard
- **Visual Feedback**: Hover and focus states provided
- **Color Contrast**: Icons use current text color for proper contrast
- **Reduced Motion**: Respects user's motion preferences (CSS transitions)

## Performance Considerations

- **Client Component**: Requires `'use client'` for theme hook
- **Minimal State**: Only tracks current theme
- **CSS Transitions**: Hardware-accelerated transforms
- **No External Dependencies**: Only uses next-themes hook

## Integration Points

- **Theme Provider**: Must be wrapped in ThemeProvider
- **Header Component**: Typically used in site header
- **CSS Variables**: Works with Tailwind's dark mode system
- **System Preference**: Respects OS-level theme preference

## Customization Options

### Button Styling
Modify button appearance by updating classes:

```tsx
className="inline-flex items-center justify-center rounded-lg text-lg font-semibold h-12 w-12"
```

### Icon Customization
Replace icons with custom SVGs or different theme icons:

```tsx
// Custom sun icon
<svg className="...">
  <path d="your-custom-sun-path" />
</svg>

// Custom moon icon  
<svg className="...">
  <path d="your-custom-moon-path" />
</svg>
```

### Theme Behavior
Customize theme switching logic:

```tsx
// Cycle through all themes
const themes = ['light', 'dark', 'system'];
const currentIndex = themes.indexOf(theme);
const nextTheme = themes[(currentIndex + 1) % themes.length];
onClick={() => setTheme(nextTheme)}
```

## Browser Support

- **Modern Browsers**: Full support for CSS transitions and transforms
- **CSS Variables**: Required for theme switching (supported in all modern browsers)
- **JavaScript**: Required for theme state management

## SEO Considerations

- **No Impact**: Theme switching is client-side only
- **Progressive Enhancement**: Works without JavaScript (default theme)
- **Crawler Friendly**: Content accessible regardless of theme

## Notes

- Component requires next-themes to be properly configured
- Icons use CSS transforms for smooth animations
- Theme preference is persisted in localStorage by next-themes
- System theme preference is automatically detected
- Button is square (10x10) but can be customized
- Uses current text color for icon visibility in both themes
