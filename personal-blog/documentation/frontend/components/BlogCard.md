> 🖥️ **Frontend Documentation**

# BlogCard

**Location:** `components/BlogCard.tsx`
**Type:** UI Component

## Description

The BlogCard component displays a preview of a blog post with a placeholder image, title, excerpt, metadata (date and reading time), and tags. It's used on both the home page and blog listing page to show post previews in a grid layout.

## Props

| Prop       | Type     | Required | Default | Description          |
|------------|----------|----------|---------|----------------------|
| post       | PostData | ✅       | —       | Blog post data object |
| showExcerpt| boolean  | ❌       | true    | Whether to show excerpt text |

## State & Hooks

- No local state
- No custom hooks used
- Uses external utility functions from `@/lib/utils`

## Usage Example

```tsx
import { BlogCard } from '@/components/BlogCard';
import type { PostData } from '@/lib/posts';

// Example usage in a page component
function BlogListing() {
  const post: PostData = {
    slug: 'my-first-post',
    title: 'My First Blog Post',
    date: '2024-03-15',
    description: 'A description of my first post',
    tags: ['webdev', 'tutorial'],
    readingTime: '3 min read',
    excerpt: 'This is a brief excerpt of my blog post...'
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard post={post} showExcerpt={true} />
    </div>
  );
}
```

## Component Structure

### Visual Elements
1. **Placeholder Image**: Gradient background with first letter of title
2. **Title**: Hover effect with color transition
3. **Excerpt**: Optional, limited to 3 lines with `line-clamp-3`
4. **Metadata**: Date and reading time with bullet separator
5. **Tags**: Clickable tag pills with hover effects

### Styling Classes
- **Container**: `group relative flex flex-col space-y-2`
- **Image**: `aspect-video w-full overflow-hidden rounded-lg bg-muted`
- **Title**: `text-xl font-semibold leading-tight group-hover:text-primary transition-colors`
- **Excerpt**: `text-muted-foreground line-clamp-3`
- **Metadata**: `flex flex-wrap items-center gap-2 text-sm text-muted-foreground`
- **Tags**: `inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground`

## Data Requirements

The component expects a `PostData` object with the following interface:

```typescript
interface PostData {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  excerpt?: string;
  content?: string;
}
```

## Accessibility

- **Semantic HTML**: Uses `<article>` element for proper content structure
- **Link Context**: Entire card is clickable with proper link semantics
- **Visual Hierarchy**: Clear heading structure and content organization
- **Color Contrast**: Text meets WCAG contrast requirements

## Responsive Behavior

- **Desktop**: 3-column grid layout
- **Tablet**: 2-column grid layout  
- **Mobile**: Single column layout
- **Text Scaling**: Responsive font sizes maintain readability

## Performance Considerations

- **Static Rendering**: Component is server-rendered by default
- **Minimal Dependencies**: Only uses utility functions
- **CSS Optimization**: Uses Tailwind's purged utilities
- **Image Placeholder**: Lightweight gradient instead of actual images

## Integration Points

- **Blog Listing Page**: Used in `/blog/page.tsx`
- **Home Page**: Used in `/src/app/page.tsx` for recent posts
- **Utility Functions**: Depends on `formatDate` from `@/lib/utils`
- **Type Definitions**: Uses `PostData` interface from `@/lib/posts`

## Customization Options

### Styling Modifications
- Change gradient colors in the placeholder image
- Modify hover effects and transitions
- Adjust spacing and typography scales
- Customize tag appearance and colors

### Functional Extensions
- Add author information display
- Include category badges
- Add bookmark/favorite functionality
- Implement lazy loading for images

## Notes

- The component uses a gradient placeholder instead of actual images for performance
- Tags are clickable and link to tag-specific blog pages
- The entire card is wrapped in a link for better UX
- Excerpt is optional and controlled by the `showExcerpt` prop
- Date formatting is handled by the `formatDate` utility function
