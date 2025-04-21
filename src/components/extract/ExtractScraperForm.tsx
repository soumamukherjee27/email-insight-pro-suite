
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Globe, Code, Download } from "lucide-react";
import ExtractScrapedTable, { ScrapedData } from "./ExtractScrapedTable";

interface Props {
  url: string;
  setUrl: (u: string) => void;
  loading: boolean;
  loadingProgress: number;
  usageRemaining: number;
  handleSubmit: (e: React.FormEvent) => void;
  scrapedData: ScrapedData[];
  handleDownload: () => void;
  scrapeTarget: "all" | "emails" | "links" | "phones" | "addresses";
  setScrapeTarget: (target: "all" | "emails" | "links" | "phones" | "addresses") => void;
}

const ExtractScraperForm: React.FC<Props> = ({
  url,
  setUrl,
  loading,
  loadingProgress,
  usageRemaining,
  handleSubmit,
  scrapedData,
  handleDownload,
  scrapeTarget,
  setScrapeTarget
}) => (
  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="url-scrape" className="block text-sm font-medium mb-2">
            Website URL to Scrape
          </label>
          <div className="flex">
            <div className="relative flex-1">
              <Input
                id="url-scrape"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-10"
                disabled={loading}
                aria-label="Scraping URL"
              />
              <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            </div>
            <Button
              type="submit"
              disabled={loading || !url || usageRemaining <= 0}
              className={`ml-2 transition-all ${loading ? "animate-pulse" : ""}`}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <Code className="mr-2 h-4 w-4" />
                  Scrape Data
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">What to Extract</label>
          <div className="flex flex-wrap gap-2">
            <Button 
              type="button" 
              variant={scrapeTarget === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setScrapeTarget("all")}
            >
              All Data
            </Button>
            <Button 
              type="button" 
              variant={scrapeTarget === "emails" ? "default" : "outline"} 
              size="sm"
              onClick={() => setScrapeTarget("emails")}
            >
              Emails
            </Button>
            <Button 
              type="button" 
              variant={scrapeTarget === "links" ? "default" : "outline"} 
              size="sm"
              onClick={() => setScrapeTarget("links")}
            >
              Links
            </Button>
            <Button 
              type="button" 
              variant={scrapeTarget === "phones" ? "default" : "outline"} 
              size="sm"
              onClick={() => setScrapeTarget("phones")}
            >
              Phone Numbers
            </Button>
            <Button 
              type="button" 
              variant={scrapeTarget === "addresses" ? "default" : "outline"} 
              size="sm"
              onClick={() => setScrapeTarget("addresses")}
            >
              Addresses
            </Button>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <div className="flex items-center justify-between">
          <div>
            Scraping operations remaining today: <span className="font-semibold">{usageRemaining}/100</span>
          </div>
          {scrapedData.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownload}
              className="flex items-center gap-2"
              type="button"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </Button>
          )}
        </div>
      </div>

      {loading && (
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-email-primary rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground text-right">
            Scanning webpage and extracting data {loadingProgress < 100 ? "..." : "complete"}
          </p>
        </div>
      )}

      <ExtractScrapedTable scrapedData={scrapedData} />
    </form>
  </div>
);

export default ExtractScraperForm;
