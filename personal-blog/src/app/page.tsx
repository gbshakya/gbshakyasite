import Link from 'next/link';
import { BlogCard } from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';

export default async function Home() {
  const posts = getAllPosts().slice(0, 3); // Show only 3 recent posts

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to GB World test
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I write about web development, technology, and creative coding. 
          Join me on this journey of learning and discovery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Read All Posts
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
          <p className="text-muted-foreground mt-2">
            Check out my latest thoughts and tutorials
          </p>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          </div>
        )}
        
        {posts.length > 0 && (
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View All Posts
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
