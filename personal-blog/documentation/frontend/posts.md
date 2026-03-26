> 🖥️ **Frontend Documentation**

# Blog Posts System

The blog posts system handles Markdown-based content management with frontmatter metadata, reading time calculation, and static generation support.

## File Structure

```
posts/
├── getting-started-with-nextjs.md
├── tailwind-css-best-practices.md
└── modern-react-patterns.md
```

## Core Library: posts.ts

**Location:** `lib/posts.ts`
**Type:** Utility Module

### Description
Provides functions for reading, parsing, and processing Markdown blog posts with frontmatter metadata.

### Key Dependencies
- **fs**: File system operations
- **path**: File path handling
- **gray-matter**: Frontmatter parsing
- **remark**: Markdown processing
- **remark-html**: Markdown to HTML conversion
- **reading-time**: Reading time calculation

### Data Interface

```typescript
export interface PostData {
  slug: string;           // URL-friendly identifier
  title: string;          // Post title from frontmatter
  date: string;           // Publication date (YYYY-MM-DD)
  description: string;    // SEO description
  tags: string[];         // Array of post tags
  readingTime: string;    // Calculated reading time
  content?: string;       // HTML content (for individual posts)
  excerpt?: string;       // Brief excerpt for listings
}
```

## Core Functions

### getAllPosts()

**Purpose**: Retrieves all blog posts sorted by date (newest first)

```typescript
export function getAllPosts(): PostData[]
```

#### Process
1. Checks if posts directory exists
2. Reads all `.md` and `.mdx` files
3. Parses frontmatter with gray-matter
4. Calculates reading time
5. Extracts metadata (title, date, tags, etc.)
6. Sorts by date (newest first)

#### Return Value
Array of `PostData` objects without `content` field

#### Example Usage
```typescript
const posts = getAllPosts(); // Returns sorted array of posts
const recentPosts = posts.slice(0, 3); // Get 3 most recent
```

### getPostBySlug()

**Purpose**: Retrieves a single post with full HTML content

```typescript
export async function getPostBySlug(slug: string): Promise<PostData | null>
```

#### Process
1. Constructs file path from slug
2. Supports both `.md` and `.mdx` extensions
3. Reads and parses Markdown file
4. Converts Markdown to HTML with remark
5. Calculates reading time
6. Returns complete post data

#### Error Handling
- Returns `null` if file doesn't exist
- Logs errors for debugging
- Graceful fallback for missing files

#### Example Usage
```typescript
const post = await getPostBySlug('my-post-slug');
if (post) {
  console.log(post.title); // Post title
  console.log(post.content); // HTML content
}
```

### getAllPostSlugs()

**Purpose**: Returns array of all post slugs for static generation

```typescript
export function getAllPostSlugs(): string[]
```

#### Usage in Static Generation
```typescript
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

### getPostsByTag()

**Purpose**: Filters posts by specific tag (case-insensitive)

```typescript
export function getPostsByTag(tag: string): PostData[]
```

#### Logic
```typescript
return allPosts.filter((post) => 
  post.tags.some((postTag) => 
    postTag.toLowerCase() === tag.toLowerCase()
  )
);
```

### getAllTags()

**Purpose**: Returns sorted array of all unique tags

```typescript
export function getAllTags(): string[]
```

#### Process
1. Gets all posts
2. Collects all tags into a Set
3. Converts to array and sorts alphabetically

## Markdown File Format

### Frontmatter Structure

```markdown
---
title: "Your Post Title"
date: "2024-03-15"
description: "A brief description of your post"
excerpt: "An excerpt that will appear on the blog listing page"
tags: ["tag1", "tag2", "tag3"]
---

# Your Post Content

Write your post content here in Markdown format...
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | ✅ | Post title (defaults to slug if missing) |
| date | string | ✅ | Publication date in YYYY-MM-DD format |
| description | string | ❌ | SEO description for meta tags |
| excerpt | string | ❌ | Brief excerpt for blog listings |
| tags | string[] | ❌ | Array of tags for categorization |

### Content Processing

#### Markdown Features Supported
- **Headings**: H1-H6 with `#` syntax
- **Lists**: Ordered and unordered lists
- **Links**: `[text](url)` syntax
- **Images**: `![alt](src)` syntax
- **Code**: Inline `code` and fenced blocks
- **Bold/Italic**: `**bold**` and `*italic*`
- **Blockquotes**: `>` syntax

#### HTML Output
- Clean, semantic HTML structure
- Proper heading hierarchy
- Accessible link and image elements
- Code syntax highlighting (if configured)

## Reading Time Calculation

### Algorithm
Uses the `reading-time` library with standard parameters:
- **Words per minute**: ~200 WPM average
- **Images**: Adds ~12 seconds per image
- **Code blocks**: Adjusted reading time

### Output Format
Human-readable string like "3 min read" or "1 min read"

## File System Operations

### Directory Structure
```
posts/
├── post-1.md
├── post-2.mdx
└── subdirectory/
    └── post-3.md
```

### Supported Extensions
- `.md` - Standard Markdown files
- `.mdx` - Markdown with JSX components

### Error Handling
- **Missing Directory**: Returns empty arrays
- **File Not Found**: Returns null for individual posts
- **Invalid Markdown**: Graceful error handling with logging

## Performance Considerations

### Static Generation
- **Build-time Processing**: All posts processed during build
- **File System Caching**: Next.js caches file reads
- **HTML Generation**: Pre-rendered content for fast loading

### Memory Usage
- **Streaming**: Large files processed in chunks
- **Selective Loading**: Only loads content when needed
- **Efficient Parsing**: Optimized gray-matter usage

### Caching Strategy
- **Build Cache**: Next.js automatic caching
- **Development**: Hot reloading for content changes
- **Production**: Static assets served efficiently

## Integration Points

### With Pages
- **Blog Listing**: Uses `getAllPosts()` for post grid
- **Individual Posts**: Uses `getPostBySlug()` for content
- **Static Generation**: Uses `getAllPostSlugs()` for routes

### With Components
- **BlogCard**: Displays post metadata and excerpts
- **Tag System**: Uses `getAllTags()` and `getPostsByTag()`
- **Navigation**: Integrates with Next.js routing

### With Metadata
- **SEO**: Title, description, and OpenGraph data
- **Structured Data**: Publication dates and authors
- **Social Sharing**: Optimized metadata for sharing

## Advanced Features

### Tag System
- **Case Insensitive**: Tag matching ignores case
- **URL Safe**: Tags used in URL paths
- **Unique Collection**: Automatic deduplication

### Date Handling
- **ISO Format**: Standardized date storage
- **Sorting**: Chronological ordering
- **Formatting**: Display formatting in components

### Content Validation
- **Required Fields**: Validates title and date
- **Type Safety**: TypeScript interface enforcement
- **Fallbacks**: Default values for missing metadata

## Development Workflow

### Adding New Posts
1. Create `.md` file in `posts/` directory
2. Add frontmatter with metadata
3. Write Markdown content
4. Test with development server
5. Build and verify static generation

### Content Updates
- **Hot Reload**: Changes reflected immediately in dev
- **Build Required**: Static generation updates on build
- **Metadata Changes**: Updates SEO and navigation

### File Organization
- **Naming Convention**: URL-friendly slugs
- **Logical Grouping**: Related posts can be grouped
- **Version Control**: Track content changes

## SEO Optimization

### Meta Data
- **Title**: Dynamic per-post titles
- **Description**: SEO descriptions from frontmatter
- **Publication Date**: Structured data for search engines

### Content Structure
- **Semantic HTML**: Proper heading hierarchy
- **Internal Linking**: Cross-references between posts
- **Readability**: Optimized content formatting

### Performance
- **Fast Loading**: Pre-rendered HTML
- **Image Optimization**: Next.js Image integration
- **Core Web Vitals**: Optimized for search ranking

## Security Considerations

### Content Sanitization
- **Markdown Processing**: Safe HTML generation
- **XSS Prevention**: Remark handles sanitization
- **File Access**: Controlled file system operations

### Input Validation
- **File Extensions**: Only `.md` and `.mdx` allowed
- **Path Traversal**: Secure file path construction
- **Error Handling**: Graceful failure modes

## Future Enhancements

### Potential Features
- **Search Integration**: Full-text search capability
- **Content Categories**: Hierarchical categorization
- **Author System**: Multiple author support
- **Draft Mode**: Unpublished post management

### Performance Improvements
- **Incremental Builds**: Faster rebuilds for large sites
- **Content CDN**: Distributed content delivery
- **Image Optimization**: Advanced image handling

## Notes

- Posts are processed at build time for optimal performance
- Frontmatter validation provides type safety
- Reading time is calculated automatically
- Tag system supports flexible content organization
- Error handling ensures graceful degradation
- Static generation enables fast loading times
