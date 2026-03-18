import Link from 'next/link';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
}

export function BlogCard({ title, description, date, slug, tags }: BlogCardProps) {
  return (
    <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">
            <Link href={slug} className="hover:text-blue-600 transition-colors">
              {title}
            </Link>
          </h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <time className="text-sm text-muted-foreground">{date}</time>
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-muted rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
