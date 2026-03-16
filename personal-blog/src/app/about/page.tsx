import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          <p className="text-xl text-muted-foreground">
            Get to know the person behind the blog
          </p>
        </div>

        {/* About Content */}
        <div className="prose prose-lg max-w-none space-y-6">
          <div className="aspect-video w-full max-w-md mx-auto mb-8 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20">JD</span>
          </div>

          <h2>Hello, I'm John Doe!</h2>
          <p>
            I'm a passionate web developer and technology enthusiast with a love for creating 
            beautiful, functional, and user-friendly applications. My journey in web development 
            started several years ago, and I've been hooked ever since.
          </p>

          <h3>My Expertise</h3>
          <p>
            I specialize in modern web technologies including React, Next.js, TypeScript, and 
            Tailwind CSS. I enjoy working on both frontend and backend development, and I'm 
            always eager to learn new technologies and best practices.
          </p>

          <h3>What I Write About</h3>
          <p>
            This blog is where I share my thoughts, experiences, and tutorials on web development, 
            programming concepts, and technology trends. I believe in the power of sharing knowledge 
            and helping others learn from my experiences.
          </p>

          <h3>Let's Connect</h3>
          <p>
            I'm always open to connecting with fellow developers and tech enthusiasts. Whether you 
            have a question, want to collaborate on a project, or just want to chat about technology, 
            feel free to reach out!
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              GitHub
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Twitter
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              LinkedIn
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Read My Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
