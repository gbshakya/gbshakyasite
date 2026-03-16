import { BlogCard } from '@/components/BlogCard';
import { getAllPosts, getAllTags } from '@/lib/posts';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on web development and technology.
        </p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              All Posts
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="inline-flex items-center rounded-full border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">No posts yet</h2>
          <p className="text-muted-foreground mb-8">
            I'm working on some amazing content. Check back soon!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}
