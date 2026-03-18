// Mock data for blog posts - replace with actual blog data later
export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

const posts: Post[] = [
  {
    slug: '/blog/marketData',
    title: 'Market Data Analysis',
    description: 'Real-time NEPSE market data with interactive charts and analysis tools',
    date: '2026-03-18',
    tags: ['market data', 'NEPSE', 'stocks', 'analysis'],
    content: 'Real-time market data analysis with comprehensive metrics.'
  },
  {
    slug: '/blog/getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    description: 'Learn how to build modern web applications with Next.js',
    date: '2026-03-15',
    tags: ['Next.js', 'React', 'Web Development'],
    content: 'Complete guide to getting started with Next.js development.'
  }
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getAllTags(): string[] {
  const tags = posts.flatMap(post => post.tags);
  return Array.from(new Set(tags)).sort();
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(post => post.tags.includes(tag));
}
