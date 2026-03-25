> 🖥️ **Frontend Documentation**

# Frontend Architecture Overview

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling framework |
| next-themes | 0.4.6 | Dark mode support |
| gray-matter | 4.0.3 | Markdown frontmatter parsing |
| remark | 15.0.1 | Markdown processing |
| reading-time | 1.5.0 | Reading time calculation |

## Architecture Patterns

### 1. App Router Structure
The application uses Next.js 16 App Router with the following structure:
- **Server Components** by default for optimal performance
- **Client Components** marked with `'use client'` directive
- **Static Generation** for blog posts and pages
- **Dynamic Routes** for blog post slugs

### 2. Component Architecture
- **Presentational Components**: Focus on UI rendering
- **Container Components**: Handle data fetching and state
- **Shared Components**: Reusable across pages
- **Layout Components**: Structure and navigation

### 3. Data Flow
- **File-based CMS**: Markdown files in `/posts` directory
- **Static Generation**: Build-time processing of posts
- **Client-side**: Theme switching and interactions

## Key Directories

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── blog/              # Blog section
│   │   ├── page.tsx       # Blog listing
│   │   └── [slug]/        # Dynamic post pages
│   └── about/             # About page
├── components/            # Shared React components
└── lib/                   # Utility functions
```

## Styling Strategy

### Tailwind CSS Configuration
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: CSS custom properties with next-themes
- **Component Variants**: Consistent design tokens
- **Typography**: Prose classes for blog content

### CSS Architecture
- **Global Styles**: `globals.css` with CSS variables
- **Component Styles**: Tailwind utility classes
- **Theme Variables**: Custom properties for theming
- **Responsive Utilities**: Breakpoint-specific classes

## Performance Optimizations

### 1. Static Generation
- Blog posts pre-rendered at build time
- Dynamic routes with `generateStaticParams`
- Optimized metadata for SEO

### 2. Code Splitting
- Automatic route-based splitting
- Component-level lazy loading where needed
- Optimized bundle size

### 3. Image Optimization
- Next.js Image component usage
- Responsive image loading
- WebP format support

## State Management

### Client State
- **Theme**: next-themes hook for dark/light mode
- **Navigation**: usePathname for active route tracking
- **Local State**: useState for component-specific state

### Server State
- **Blog Posts**: File system reading with caching
- **Static Data**: Build-time generation
- **Metadata**: Dynamic SEO metadata

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Focus management
- **Color Contrast**: WCAG compliant themes
- **Reduced Motion**: Respect user preferences

## SEO Implementation

### Metadata Strategy
- **Dynamic Titles**: Template-based page titles
- **Meta Descriptions**: Page-specific descriptions
- **Open Graph**: Social media optimization
- **Structured Data**: Semantic markup

### Performance Metrics
- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Mobile First**: Responsive design priority
- **Fast Loading**: Static generation benefits

## Development Workflow

### Component Development
1. Create component in appropriate directory
2. Define TypeScript interfaces for props
3. Implement with Tailwind classes
4. Add responsive design considerations
5. Test dark mode compatibility

### Page Development
1. Create page in `src/app/` directory
2. Implement server-side data fetching
3. Add metadata for SEO
4. Test static generation
5. Verify responsive behavior

## Build Process

### Development
```bash
npm run dev    # Development server with HMR
```

### Production
```bash
npm run build  # Static generation and optimization
npm run start  # Production server
```

### Quality Assurance
```bash
npm run lint   # ESLint code quality check
```

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Core functionality without JavaScript

## Security Considerations

- **Content Security Policy**: Configured for external resources
- **XSS Prevention**: React's built-in protections
- **Dependency Updates**: Regular security updates
- **Input Validation**: Markdown processing sanitization
