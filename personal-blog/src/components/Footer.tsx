import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">GB Home</h3>
            <p className="text-sm text-muted-foreground">
              A modern blog built with Next.js, featuring real-time market data analysis and insights.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/marketInfo" className="text-muted-foreground hover:text-foreground">
                  Market Data
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Real-time Market Data</li>
              <li>Interactive Analysis</li>
              <li>Daily Updates</li>
              <li>CSV Export</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Data Sources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>NEPSE</li>
              <li>Merolagani</li>
              <li>Automated Collection</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2026 GB Home. Built with Next.js and modern web technologies.</p>
        </div>
      </div>
    </footer>
  );
}
