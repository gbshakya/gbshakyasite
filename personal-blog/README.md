# Personal Blog

A modern, fast, and responsive personal blog built with Next.js, React, and Tailwind CSS. Features markdown-based blog posts, dark mode, and SEO optimization.

## Features

- 🚀 **Next.js 14** with App Router for optimal performance
- 🎨 **Tailwind CSS** for modern, responsive styling
- 🌙 **Dark Mode** toggle with system preference detection
- 📝 **Markdown Support** for blog posts with frontmatter
- ⏱️ **Reading Time** calculation for each post
- 🏷️ **Tags & Categories** for content organization
- 🔍 **SEO Optimized** with meta tags and OpenGraph
- 📱 **Fully Responsive** design for all devices
- ⚡ **Fast Loading** with static generation
- 🎯 **TypeScript** for better development experience

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: Gray Matter + Remark
- **Dark Mode**: next-themes
- **Deployment**: Vercel (recommended)

## Project Structure

```
personal-blog/
├── app/                    # Next.js app directory
│   ├── blog/              # Blog-related pages
│   │   ├── [slug]/       # Dynamic blog post pages
│   │   └── page.tsx      # Blog listing page
│   ├── about/            # About page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── BlogCard.tsx      # Blog post card component
│   ├── Footer.tsx        # Footer component
│   ├── Header.tsx        # Header component
│   └── ThemeToggle.tsx   # Dark mode toggle
├── lib/                  # Utility functions
│   ├── posts.ts          # Blog post utilities
│   └── utils.ts          # General utilities
├── posts/                # Markdown blog posts
│   ├── getting-started-with-nextjs.md
│   ├── tailwind-css-best-practices.md
│   └── modern-react-patterns.md
└── styles/               # Additional styles (if needed)
```

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Adding Blog Posts

Blog posts are written in Markdown and stored in the `/posts` directory. Each post should include frontmatter with metadata:

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

- `title`: The post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `description`: SEO description (optional)
- `excerpt`: Brief excerpt for blog listing (optional)
- `tags`: Array of tags for categorization (optional)

## Customization

### Site Information

Update the site information in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Your Blog Name",
    template: "%s | Your Blog Name",
  },
  description: "Your blog description",
  authors: [{ name: "Your Name" }],
  // ... other metadata
};
```

### Styling

The application uses Tailwind CSS with a custom design system. You can customize colors and styles in:

- `src/app/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration
- Component files for specific component styles

### Navigation

Update navigation links in `components/Header.tsx`:

```typescript
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  // Add more navigation items here
];
```

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Connect your GitHub repository
3. **Configure settings**
   - Vercel will automatically detect Next.js
   - Set environment variables if needed
4. **Deploy**
   - Click "Deploy"
   - Your site will be live at a `.vercel.app` domain

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

3. **Deploy to your preferred hosting platform**

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Performance Optimization

The blog is optimized for performance with:

- **Static Generation**: Pages are pre-built at build time
- **Image Optimization**: Next.js Image component for optimized images
- **Code Splitting**: Automatic code splitting for faster loads
- **CSS Purging**: Unused CSS is removed in production builds

## SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **OpenGraph**: Social media sharing optimization
- **Structured Data**: Semantic HTML for better search engine understanding
- **Sitemap**: Automatically generated sitemap (add if needed)
- **Robots.txt**: Configure search engine crawling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or run into issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Search existing [GitHub issues](https://github.com/your-repo/issues)
3. Create a new issue with detailed information

## Roadmap

- [ ] Add search functionality
- [ ] Implement RSS feed
- [ ] Add comments system
- [ ] Create newsletter signup
- [ ] Add analytics integration
- [ ] Implement pagination for blog posts

---

Built with ❤️ using Next.js and Tailwind CSS
