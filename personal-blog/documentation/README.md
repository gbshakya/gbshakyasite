# Personal Blog Documentation

> 🖥️ **Frontend Documentation** | ⚙️ **Backend Documentation**

A modern, fast, and responsive personal blog built with Next.js, React, and Tailwind CSS. Features markdown-based blog posts, dark mode, and SEO optimization.

## Project Overview

**Purpose**: A personal blogging platform for sharing thoughts, tutorials, and insights on web development and technology.

**Tech Stack**:

| Layer    | Technology       | Location         | Docs                              |
|----------|------------------|------------------|-----------------------------------|
| Frontend | Next.js / React  | `src/`           | [Frontend Docs](./frontend/)      |
| Backend  | Next.js API      | `src/app/`       | [Backend Docs](./backend/)        |
| Database | File System      | `posts/`         | [Posts](./frontend/posts.md)     |

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation & Setup

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

## Project Structure

```
personal-blog/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── blog/              # Blog-related pages
│   │   │   ├── [slug]/       # Dynamic blog post pages
│   │   │   └── page.tsx      # Blog listing page
│   │   ├── about/            # About page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   └── components/           # Reusable React components
├── components/               # Shared components
│   ├── BlogCard.tsx          # Blog post card component
│   ├── Footer.tsx            # Footer component
│   ├── Header.tsx            # Header component
│   └── ThemeToggle.tsx       # Dark mode toggle
├── lib/                      # Utility functions
│   ├── posts.ts              # Blog post utilities
│   └── utils.ts              # General utilities
└── posts/                    # Markdown blog posts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features

- 🚀 **Next.js 16** with App Router for optimal performance
- 🎨 **Tailwind CSS** for modern, responsive styling
- 🌙 **Dark Mode** toggle with system preference detection
- 📝 **Markdown Support** for blog posts with frontmatter
- ⏱️ **Reading Time** calculation for each post
- 🏷️ **Tags & Categories** for content organization
- 🔍 **SEO Optimized** with meta tags and OpenGraph
- 📱 **Fully Responsive** design for all devices
- ⚡ **Fast Loading** with static generation
- 🎯 **TypeScript** for better development experience

## Documentation Links

- [Frontend Architecture](./frontend/overview.md)
- [Components Documentation](./frontend/components/)
- [Pages Documentation](./frontend/pages.md)
- [Blog Posts System](./frontend/posts.md)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel and import your repository
3. Vercel will automatically detect Next.js and configure settings
4. Deploy - your site will be live at a `.vercel.app` domain

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Deploy to your preferred hosting platform

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js and Tailwind CSS
