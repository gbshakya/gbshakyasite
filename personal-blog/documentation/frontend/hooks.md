> 🖥️ **Frontend Documentation**

# Custom Hooks

The personal blog project uses minimal custom hooks, relying primarily on built-in React hooks and library-provided hooks from Next.js and next-themes.

## Used Hooks Overview

### Library Hooks
- **useTheme** (from next-themes) - Theme management
- **usePathname** (from next/navigation) - Current route detection

### Built-in React Hooks
- **useState** - Component state management
- **useEffect** - Side effects (minimal usage)
- **useCallback** - Memoized functions (where needed)

## Theme Hook Integration

### useTheme Hook
**Source**: `next-themes` library  
**Used in**: `ThemeToggle.tsx`, `Header.tsx`

#### Purpose
Manages theme switching between light, dark, and system preferences.

#### Usage Example
```typescript
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button onClick={toggleTheme}>
      {/* Theme icons */}
    </button>
  );
}
```

#### Hook Properties
- **theme**: Current theme ('light' | 'dark' | 'system')
- **setTheme**: Function to change theme
- **systemTheme**: System's preferred theme (if detected)
- **resolvedTheme**: Actually applied theme

#### Configuration Requirements
Requires ThemeProvider wrapper in root layout:

```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {/* App content */}
</ThemeProvider>
```

## Navigation Hook Integration

### usePathname Hook
**Source**: `next/navigation`  
**Used in**: `Header.tsx`

#### Purpose
Gets the current URL pathname for active route highlighting.

#### Usage Example
```typescript
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  
  const isActive = (href: string) => pathname === href;
  
  return (
    <nav>
      {navigation.map((item) => (
        <Link 
          key={item.name}
          href={item.href}
          className={isActive(item.href) ? 'active' : ''}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
```

#### Hook Properties
- **Returns**: String representing current URL pathname
- **Client Component**: Requires 'use client' directive
- **Updates Automatically**: Reacts to route changes

## State Management Patterns

### Local Component State
Most components use minimal local state with useState:

```typescript
// Example: Mobile menu state (if implemented)
const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};
```

### Server vs Client State
- **Server State**: Blog posts, metadata (static generation)
- **Client State**: Theme, UI interactions, form inputs

## Hook Architecture Decisions

### Minimal Custom Hooks
The project intentionally avoids custom hooks to:
- **Reduce Complexity**: Keep codebase simple and maintainable
- **Leverage Libraries**: Use well-tested library hooks
- **Performance**: Avoid unnecessary abstraction layers

### When Custom Hooks Would Be Considered
- **Complex State Logic**: Multiple related state variables
- **Reusable Side Effects**: Common API patterns
- **Performance Optimization**: Expensive computations memoization

## Potential Custom Hook Opportunities

### useMobileMenu Hook
If mobile menu functionality is expanded:

```typescript
function useMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  return { isOpen, toggle, close };
}
```

### useLocalStorage Hook
For persisting user preferences:

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Initialize from localStorage
  });
  
  const setValue = useCallback((value: T) => {
    // Update localStorage and state
  }, [key]);
  
  return [storedValue, setValue] as const;
}
```

### useBlogData Hook
For blog-related operations:

```typescript
function useBlogData() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch posts data
  }, []);
  
  return { posts, loading };
}
```

## Hook Performance Considerations

### React.memo and useCallback
The project uses minimal optimization since:
- **Small Component Tree**: Limited re-rendering impact
- **Server Components**: Most rendering happens on server
- **Static Generation**: Limited client-side state changes

### When to Add Optimizations
- **Frequent Re-renders**: Components updating often
- **Expensive Computations**: Complex calculations in render
- **Large Component Trees**: Deep nesting with shared state

## Hook Testing Patterns

### Testing Library Hooks
If custom hooks are added, test with `@testing-library/react`:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

test('should initialize correctly', () => {
  const { result } = renderHook(() => useCustomHook());
  
  expect(result.current.value).toBe(initialValue);
});

test('should update value', () => {
  const { result } = renderHook(() => useCustomHook());
  
  act(() => {
    result.current.updateValue('new value');
  });
  
  expect(result.current.value).toBe('new value');
});
```

## Hook Documentation Standards

### Custom Hook Documentation
If adding custom hooks, follow this pattern:

```typescript
/**
 * Hook description and purpose
 * 
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Object containing hook return values
 * 
 * @example
 * ```tsx
 * const { value, updateValue } = useCustomHook(initialValue);
 * ```
 */
function useCustomHook(param1: string, param2: number) {
  // Hook implementation
}
```

## Migration Path

### Adding Custom Hooks
When the application grows, consider custom hooks for:

1. **Blog Operations**: Search, filtering, pagination
2. **User Preferences**: Theme persistence, layout settings
3. **Form Handling**: Contact forms, comment systems
4. **Analytics**: Page views, user interactions

### Hook Extraction Process
1. **Identify Patterns**: Repeated state logic across components
2. **Extract Logic**: Create custom hook with clear interface
3. **Update Components**: Replace inline logic with hook usage
4. **Add Tests**: Ensure hook behavior is tested
5. **Document**: Update documentation with hook details

## Best Practices

### Hook Usage Guidelines
- **Client Components Only**: Hooks require 'use client' directive
- **Rule of Hooks**: Follow React's rules of hooks
- **Dependency Arrays**: Proper dependency management in useEffect
- **Cleanup Functions**: Handle cleanup in useEffect returns

### Performance Guidelines
- **Memoization**: Use useCallback/useMemo when needed
- **Avoid Premature Optimization**: Don't over-optimize simple cases
- **Profile First**: Measure performance before optimizing
- **Consider Server Components**: Move logic to server when possible

## Notes

- Current hook usage is minimal and intentional
- Library hooks provide needed functionality without custom code
- Future growth may require custom hooks for complex state management
- All hooks are properly documented and tested
- Performance considerations guide hook usage decisions
