import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { PostData } from '@/lib/posts';

interface BlogCardProps {
  post: PostData;
  showExcerpt?: boolean;
}

export function BlogCard({ post, showExcerpt = true }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col space-y-2">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="space-y-3">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/20">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            {showExcerpt && post.excerpt && (
              <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
