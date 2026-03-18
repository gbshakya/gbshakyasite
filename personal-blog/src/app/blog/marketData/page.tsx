import { Metadata } from "next";
import Link from "next/link";
import { MarketDataTable } from "@/components/MarketDataTable";

export const metadata: Metadata = {
  title: "Market Data Analysis",
  description: "Real-time NEPSE market data with interactive charts and analysis tools",
  keywords: ["market data", "NEPSE", "stocks", "financial analysis", "trading"],
};

export default function MarketDataPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">Market Data</span>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight">Market Data Analysis</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time NEPSE market data with interactive analysis tools. 
          Track company performance, analyze trends, and download comprehensive datasets.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Data Updated Daily
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            📊 264 Companies Tracked
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            🔄 Auto-refresh at Midnight
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              📈
            </div>
            <h3 className="font-semibold">Live Data</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            View real-time market data with advanced filtering and sorting capabilities.
          </p>
          <Link
            href="/marketInfo"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            View Full Dashboard →
          </Link>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              📥
            </div>
            <h3 className="font-semibold">Download Data</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Export complete market datasets in CSV format for offline analysis.
          </p>
          <Link
            href="/api/download/csv"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            Download CSV →
          </Link>
        </div>

        <div className="bg-card rounded-lg border p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              🤖
            </div>
            <h3 className="font-semibold">Automation</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Data automatically collected daily at midnight using advanced web scraping.
          </p>
          <Link
            href="/api/run-data-collection"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
          >
            Refresh Now →
          </Link>
        </div>
      </div>

      {/* Market Data Table */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Market Overview</h2>
          <div className="flex gap-2">
            <Link
              href="/marketInfo"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Full Dashboard
            </Link>
            <Link
              href="/api/download/csv"
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Export CSV
            </Link>
          </div>
        </div>
        
        <MarketDataTable compact={true} />
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            🔍
          </div>
          <h3 className="font-semibold mb-2">Advanced Search</h3>
          <p className="text-muted-foreground text-sm">
            Filter companies by symbol, sector, price range, and financial metrics.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            📊
          </div>
          <h3 className="font-semibold mb-2">Real-time Analytics</h3>
          <p className="text-muted-foreground text-sm">
            Track P/E ratios, market caps, and technical indicators in real-time.
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            💾
          </div>
          <h3 className="font-semibold mb-2">Historical Data</h3>
          <p className="text-muted-foreground text-sm">
            Access historical performance data and trend analysis for informed decisions.
          </p>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-12 bg-muted/50 rounded-lg p-8">
        <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Data Sources</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Merolagani - Company financial data</li>
              <li>• NEPSE - Company symbols and listings</li>
              <li>• Automated daily updates at 12:00 AM</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Available Metrics</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Market Price & Volume</li>
              <li>• P/E & P/B Ratios</li>
              <li>• EPS & Dividend Yields</li>
              <li>• Technical Indicators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
