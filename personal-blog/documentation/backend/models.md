> ⚙️ **Backend Documentation**

# Data Models & Schemas

This project uses a **file-based content management system** rather than traditional database models. All data structures are defined by TypeScript interfaces and stored as Markdown files with frontmatter.

## Content Data Model

### PostData Interface

**Location**: `lib/posts.ts`  
**Type**: TypeScript Interface  
**Storage**: Markdown files with frontmatter

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

### Field Specifications

| Field | Type | Required | Source | Description |
|-------|------|----------|--------|-------------|
| slug | string | ✅ | Filename | URL-friendly identifier derived from filename |
| title | string | ✅ | Frontmatter | Post title (defaults to slug if missing) |
| date | string | ✅ | Frontmatter | Publication date in ISO format (YYYY-MM-DD) |
| description | string | ❌ | Frontmatter | SEO description for meta tags |
| tags | string[] | ❌ | Frontmatter | Array of tags for categorization |
| readingTime | string | ✅ | Calculated | Auto-calculated reading time estimate |
| content | string | ❌ | Generated | HTML content from Markdown processing |
| excerpt | string | ❌ | Frontmatter | Brief excerpt for blog listings |

## File Structure Schema

### Directory Organization

```
posts/
├── post-slug-1.md
├── post-slug-2.mdx
└── category/
    └── post-slug-3.md
```

### File Naming Convention

- **Format**: `kebab-case.md` or `kebab-case.mdx`
- **Characters**: Lowercase letters, numbers, hyphens only
- **Length**: Recommended 1-50 characters
- **Uniqueness**: Each slug must be unique

### File Path Schema

```typescript
// Base posts directory
const postsDirectory = path.join(process.cwd(), 'posts');

// Individual post path
const postPath = path.join(postsDirectory, `${slug}.md`);
const fallbackPath = path.join(postsDirectory, `${slug}.mdx`);
```

## Frontmatter Schema

### Required Fields

```yaml
---
title: "Post Title"
date: "2024-03-15"
---
```

### Optional Fields

```yaml
---
title: "Post Title"
date: "2024-03-15"
description: "SEO-friendly description"
excerpt: "Brief excerpt for listings"
tags: ["tag1", "tag2", "tag3"]
---
```

### Field Validation Rules

#### Title Field
- **Type**: String
- **Length**: 1-200 characters
- **Characters**: Any Unicode characters supported
- **Required**: Yes (defaults to slug if missing)
- **Purpose**: Display title and SEO title

#### Date Field
- **Type**: String (YYYY-MM-DD format)
- **Format**: ISO 8601 date format
- **Validation**: Must be valid date
- **Required**: Yes (defaults to current date if missing)
- **Purpose**: Sorting and publication date

#### Description Field
- **Type**: String
- **Length**: 1-300 characters recommended
- **Purpose**: SEO meta description
- **Required**: No (empty string if missing)

#### Excerpt Field
- **Type**: String
- **Length**: 1-500 characters recommended
- **Purpose**: Blog listing preview
- **Required**: No (empty string if missing)

#### Tags Field
- **Type**: Array of strings
- **Format**: YAML array syntax
- **Characters**: Alphanumeric and spaces
- **Case**: Case-sensitive (but filtering is case-insensitive)
- **Required**: No (empty array if missing)

## Content Schema

### Markdown Content Structure

```markdown
---
title: "Example Post"
date: "2024-03-15"
tags: ["webdev", "tutorial"]
---

# Heading 1

Content goes here...

## Heading 2

More content...

### Lists

- Item 1
- Item 2

### Code

```javascript
const example = "code block";
```

### Links

[Link text](https://example.com)
```

### Supported Markdown Elements

| Element | Syntax | Purpose |
|---------|--------|---------|
| Headings | `# H1` through `###### H6` | Document structure |
| Paragraphs | Text separated by blank lines | Body content |
| Lists | `- item` or `1. item` | Enumerated content |
| Links | `[text](url)` | Hyperlinks |
| Images | `![alt](src)` | Visual content |
| Code | `inline` or fenced blocks | Code snippets |
| Bold | `**text**` | Emphasis |
| Italic | `*text*` | Emphasis |
| Blockquotes | `> quote` | Citations |
| Horizontal Rules | `---` | Content separation |

### HTML Output Schema

Processed Markdown generates semantic HTML:

```html
<h1>Heading 1</h1>
<p>Content goes here...</p>
<h2>Heading 2</h2>
<p>More content...</p>
<h3>Lists</h3>
<ul>
<li>Item 1</li>
<li>Item 2</li>
</ul>
<h3>Code</h3>
<pre><code>const example = "code block";</code></pre>
<h3>Links</h3>
<p><a href="https://example.com">Link text</a></p>
```

## Data Processing Schema

### Processing Pipeline

```typescript
// 1. File Reading
const fileContents = fs.readFileSync(fullPath, 'utf8');

// 2. Frontmatter Parsing
const matterResult = matter(fileContents);

// 3. Reading Time Calculation
const stats = readingTime(fileContents);

// 4. Markdown to HTML
const processedContent = await remark()
  .use(html)
  .process(matterResult.content);

// 5. Data Assembly
return {
  slug,
  title: matterResult.data.title,
  date: matterResult.data.date,
  description: matterResult.data.description,
  tags: matterResult.data.tags,
  readingTime: stats.text,
  content: processedContent.toString(),
  excerpt: matterResult.data.excerpt,
};
```

### Data Transformation Schema

#### Input (Markdown File)
```yaml
---
title: "My Post"
date: "2024-03-15"
tags: ["webdev"]
---

# My Post

Content here...
```

#### Output (PostData Object)
```typescript
{
  slug: "my-post",
  title: "My Post",
  date: "2024-03-15",
  description: "",
  tags: ["webdev"],
  readingTime: "2 min read",
  content: "<h1>My Post</h1><p>Content here...</p>",
  excerpt: ""
}
```

## Query Schema

### Data Access Patterns

#### getAllPosts()
```typescript
// Returns: PostData[] (without content field)
const posts = getAllPosts();
```

#### getPostBySlug()
```typescript
// Returns: PostData | null (with content field)
const post = await getPostBySlug('post-slug');
```

#### getAllPostSlugs()
```typescript
// Returns: string[]
const slugs = getAllPostSlugs();
```

#### getPostsByTag()
```typescript
// Returns: PostData[]
const posts = getPostsByTag('webdev');
```

#### getAllTags()
```typescript
// Returns: string[]
const tags = getAllTags();
```

### Filtering Schema

#### Tag Filtering
```typescript
// Case-insensitive tag matching
const filteredPosts = allPosts.filter((post) => 
  post.tags.some((postTag) => 
    postTag.toLowerCase() === tag.toLowerCase()
  )
);
```

#### Date Sorting
```typescript
// Newest first sorting
const sortedPosts = posts.sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);
```

## Validation Schema

### File Validation
- **Extension**: Must be `.md` or `.mdx`
- **Existence**: File must exist in posts directory
- **Readable**: File must be readable text
- **Encoding**: UTF-8 encoding assumed

### Content Validation
- **Frontmatter**: Valid YAML syntax
- **Required Fields**: Title and date must be present
- **Date Format**: Must be valid YYYY-MM-DD
- **Markdown**: Valid Markdown syntax

### Type Safety
```typescript
// Runtime validation example
function validatePostData(data: any): PostData {
  return {
    slug: typeof data.slug === 'string' ? data.slug : '',
    title: typeof data.title === 'string' ? data.title : data.slug,
    date: typeof data.date === 'string' ? data.date : new Date().toISOString(),
    description: typeof data.description === 'string' ? data.description : '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: typeof data.readingTime === 'string' ? data.readingTime : '',
    content: typeof data.content === 'string' ? data.content : undefined,
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : undefined,
  };
}
```

## Performance Schema

### Memory Usage
- **File Reading**: One file at a time
- **Processing**: Streaming for large files
- **Caching**: Next.js build cache
- **Garbage Collection**: Automatic cleanup

### Processing Time
- **Frontmatter Parsing**: O(1) per file
- **Markdown Processing**: O(n) where n is content length
- **Reading Time**: O(n) content analysis
- **Sorting**: O(m log m) where m is number of posts

### Storage Efficiency
- **File Size**: Plain text compression
- **Build Output**: Optimized HTML/CSS/JS
- **CDN Caching**: Static asset distribution
- **Gzip Compression**: Automatic compression

## Future Schema Extensions

### Potential Data Models

#### Author Model
```typescript
interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  social: SocialLinks;
}
```

#### Category Model
```typescript
interface Category {
  slug: string;
  name: string;
  description: string;
  parent?: string;
}
```

#### Comment Model
```typescript
interface Comment {
  id: string;
  postSlug: string;
  author: string;
  content: string;
  createdAt: string;
  approved: boolean;
}
```

### Database Migration Path
If transitioning to database:

#### SQL Schema (PostgreSQL)
```sql
CREATE TABLE posts (
  slug VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  content TEXT,
  excerpt TEXT,
  reading_time VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
  post_slug VARCHAR(255) REFERENCES posts(slug),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (post_slug, tag_id)
);
```

#### NoSQL Schema (MongoDB)
```javascript
{
  _id: ObjectId,
  slug: String,
  title: String,
  date: Date,
  description: String,
  content: String,
  excerpt: String,
  tags: [String],
  readingTime: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Notes

- All data models are defined by TypeScript interfaces
- No database required - file-based storage
- Frontmatter provides structured metadata
- Markdown content is processed to HTML
- Type safety enforced throughout
- Validation happens at build time
- Schema can be extended as needed
- Migration to database is straightforward if needed
