> 🖥️ **Frontend Documentation**

# Pages Documentation

The personal blog uses Next.js 16 App Router with server-side rendering and static generation. All pages are located in the `src/app/` directory.

## Page Structure

```
src/app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── globals.css         # Global styles
├── blog/
│   ├── page.tsx        # Blog listing
│   └── [slug]/
│       └── page.tsx    # Individual blog posts
└── about/
    └── page.tsx        # About page
```

## Root Layout

**Location:** `src/app/layout.tsx`
**Type:** Server Component

### Description
Provides the base HTML structure, theme provider, and common layout elements (Header, Footer) for all pages.

### Key Features
- **Theme Provider**: next-themes integration for dark mode
- **Font Configuration**: Geist Sans and Geist Mono fonts
- **SEO Metadata**: Default meta tags and OpenGraph configuration
- **Layout Structure**: Header, main content area, and Footer

### Metadata Configuration
```typescript
export const metadata: Metadata = {
  title: {
    default: "GB Home",
    template: "%s | Your Blog",
  },
  description: "A modern personal blog built with Next.js and Tailwind CSS",
  keywords: ["blog", "next.js", "tailwind css", "personal blog"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Blog",
    description: "A modern personal blog built with Next.js and Tailwind CSS",
    type: "website",
    locale: "en_US",
  },
};
```

### Layout Structure
```typescript
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
</ThemeProvider>
```

---

## Home Page

**Location:** `src/app/page.tsx`
**Type:** Server Component

### Description
Landing page with hero section and recent posts preview. Shows the 3 most recent blog posts.

### Key Features
- **Hero Section**: Welcome message and call-to-action buttons
- **Recent Posts**: Grid layout with BlogCard components
- **Navigation**: Links to blog listing and about page
- **Responsive Design**: Adapts layout for different screen sizes

### Data Flow
```typescript
// Fetches all posts and slices to get 3 most recent
const posts = getAllPosts().slice(0, 3);
```

### Sections

#### Hero Section
- **Title**: "Welcome to GB World test"
- **Description**: Brief introduction to the blog
- **CTA Buttons**: "Read All Posts" and "About Me"

#### Recent Posts Section
- **Grid Layout**: Responsive grid (1 column mobile, 2 tablet, 3 desktop)
- **Blog Cards**: Uses BlogCard component for each post
- **Empty State**: Message when no posts exist
- **View All Link**: Additional link to full blog listing

### Styling Classes
- **Container**: `container mx-auto px-4 py-12`
- **Hero**: `text-center space-y-6 mb-16`
- **Title**: `text-4xl md:text-6xl font-bold tracking-tight`
- **Grid**: `grid gap-8 md:grid-cols-2 lg:grid-cols-3`

---

## Blog Listing Page

**Location:** `src/app/blog/page.tsx`
**Type:** Server Component

### Description
Displays all blog posts in a grid layout with tag filtering options.

### Key Features
- **All Posts Display**: Shows all available blog posts
- **Tag Navigation**: Filterable tags for content categorization
- **Empty State**: Friendly message when no posts exist
- **Responsive Grid**: Adapts to different screen sizes

### Data Flow
```typescript
const posts = getAllPosts();      // All blog posts
const tags = getAllTags();        // Available tags for filtering
```

### Sections

#### Header Section
- **Title**: "Blog"
- **Description**: "Thoughts, tutorials, and insights on web development and technology"
- **Tag Navigation**: Interactive tag pills for filtering

#### Posts Grid
- **Blog Cards**: One BlogCard per post
- **Grid Layout**: Responsive grid similar to home page
- **Empty State**: Message and "Back to Home" button when no posts

### Tag System
```typescript
// Tag navigation links
<Link href="/blog" className="...">
  All Posts
</Link>
{tags.map((tag) => (
  <Link key={tag} href={`/blog/tag/${tag}`} className="...">
    {tag}
  </Link>
))}
```

### Styling Classes
- **Header**: `text-center space-y-4 mb-12`
- **Tag Container**: `flex flex-wrap justify-center gap-2 mt-6`
- **Tag Pills**: `inline-flex items-center rounded-full border border-input bg-background px-3 py-1 text-sm font-medium`

---

## Individual Blog Post Page

**Location:** `src/app/blog/[slug]/page.tsx`
**Type:** Server Component

### Description
Dynamic page for individual blog posts with static generation and SEO optimization.

### Key Features
- **Static Generation**: Pre-builds all blog post pages
- **SEO Metadata**: Dynamic meta tags per post
- **Content Rendering**: HTML content from Markdown
- **Navigation**: Back to blog and related content links

### Static Generation

#### generateStaticParams
```typescript
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
```

#### generateMetadata
```typescript
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Your Name"],
    },
  };
}
```

### Page Structure

#### Article Header
- **Back Navigation**: "Back to Blog" link with arrow icon
- **Title**: Large heading (4xl md:text-5xl)
- **Metadata**: Date and reading time
- **Tags**: Clickable tag pills

#### Article Content
```typescript
<div 
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: post.content || '' }}
/>
```

#### Article Footer
- **Call to Action**: Encouragement to share content
- **Navigation**: "Read More Posts" button

### Styling Classes
- **Container**: `container mx-auto px-4 py-12`
- **Article**: `max-w-3xl mx-auto`
- **Prose**: `prose prose-lg max-w-none` for blog content
- **Header**: `space-y-4 mb-8`

---

## About Page

**Location:** `src/app/about/page.tsx`
**Type:** Server Component

### Description
Static page with personal information, expertise details, and social links.

### Key Features
- **Personal Introduction**: About the blog author
- **Expertise Section**: Technical skills and specialties
- **Social Links**: Links to external profiles
- **Responsive Design**: Adapts to different screen sizes

### Sections

#### Header
- **Title**: "About Me"
- **Description**: "Get to know the person behind the blog"

#### Content Sections
1. **Avatar Placeholder**: Large "JD" initials in colored box
2. **Introduction**: "Hello, I'm John Doe!"
3. **Expertise**: Web development background
4. **Content Focus**: What the blog covers
5. **Call to Action**: Invitation to connect

#### Social Links
- **GitHub**: Link to GitHub profile
- **Twitter**: Link to Twitter profile  
- **LinkedIn**: Link to LinkedIn profile
- **Blog**: Link back to blog listing

### Styling Classes
- **Container**: `container mx-auto px-4 py-12`
- **Content**: `max-w-3xl mx-auto`
- **Prose**: `prose prose-lg max-w-none space-y-6`
- **Avatar**: `aspect-video w-full max-w-md mx-auto mb-8 rounded-lg bg-muted`

### Customization Notes
The page uses placeholder content ("John Doe", "JD") that should be customized with actual personal information and social media URLs.

---

## Global Styles

**Location:** `src/app/globals.css`
**Type:** CSS

### Description
Global CSS styles including Tailwind base styles, custom CSS variables, and prose styling for blog content.

### Key Sections
- **Tailwind Base**: Base layer styles and resets
- **CSS Variables**: Theme color definitions
- **Custom Styles**: Additional component styles
- **Prose Styles**: Typography for blog content

---

## Routing Patterns

### Static Routes
- `/` - Home page
- `/blog` - Blog listing
- `/about` - About page

### Dynamic Routes
- `/blog/[slug]` - Individual blog posts
- `/blog/tag/[tag]` - Tag-filtered posts (planned)

### Navigation Structure
All pages use consistent navigation patterns:
- **Header**: Site-wide navigation
- **Footer**: Quick links and social media
- **Breadcrumbs**: Contextual navigation (blog posts)
- **CTA Buttons**: Clear calls-to-action

## Performance Optimizations

### Static Generation
- **Blog Posts**: Pre-rendered at build time
- **Metadata**: Generated per page
- **Routes**: All routes statically generated

### Code Splitting
- **Route-based**: Automatic splitting by page
- **Component-level**: Lazy loading where appropriate
- **CSS Optimization**: Tailwind purging

### SEO Features
- **Meta Tags**: Dynamic per page
- **Open Graph**: Social media optimization
- **Structured Data**: Semantic HTML structure
- **Internal Linking**: Proper navigation hierarchy

## Accessibility

### Semantic HTML
- **Proper Headings**: H1-H6 hierarchy maintained
- **Navigation**: Landmark elements and ARIA implications
- **Links**: Descriptive link text and proper focus states

### Responsive Design
- **Mobile First**: Progressive enhancement approach
- **Touch Targets**: Appropriate sizing for mobile interaction
- **Text Scaling**: Responsive typography

### Color & Contrast
- **Theme Support**: Light/dark mode compatibility
- **WCAG Compliance**: Proper contrast ratios
- **Focus Indicators**: Clear visual feedback

## Notes

- All pages use server components by default for optimal performance
- Theme toggle requires client-side component (in Header)
- Blog content is processed from Markdown files
- Social media links use placeholder URLs - update with actual profiles
- The about page contains placeholder content that should be customized
