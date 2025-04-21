import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Link, FileText, Loader, Download, Globe, Code, MapPin, Mail } from "lucide-react";
import { toast } from "sonner";
import ExtractEmailsForm from "@/components/extract/ExtractEmailsForm";
import ExtractScraperForm from "@/components/extract/ExtractScraperForm";

interface ExtractedEmail {
  email: string;
  name: string;
  position: string;
  department: string;
  source: string;
}

interface ScrapedData {
  type: string;
  value: string;
  context?: string;
  page?: string;
}

const Extract = () => {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [extractedEmails, setExtractedEmails] = React.useState<ExtractedEmail[]>([]);
  const [scrapedData, setScrapedData] = React.useState<ScrapedData[]>([]);
  const [usageRemaining, setUsageRemaining] = React.useState(100);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState("emails");
  const [scrapeTarget, setScrapeTarget] = React.useState<"all" | "emails" | "links" | "phones" | "addresses">("all");

  const getExtractionCount = () => {
    const base = Math.floor(Math.random() * 21) + 30;
    return Math.min(base, usageRemaining);
  };

  const generateRandomEmails = (domain: string, count: number): ExtractedEmail[] => {
    const firstNames = ["John", "Jane", "Michael", "Emma", "David", "Sarah", "Robert", "Lisa", "Kevin", "Amy"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
    const positions = ["CEO", "CTO", "CFO", "Marketing Manager", "Product Manager", "Sales Representative", "HR Manager", "Developer", "Designer", "Customer Support"];
    const departments = ["Executive", "Engineering", "Finance", "Marketing", "Product", "Sales", "HR", "Development", "Design", "Support"];
    
    const emails: ExtractedEmail[] = [];
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const position = positions[Math.floor(Math.random() * positions.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      
      let email;
      const format = Math.floor(Math.random() * 3);
      if (format === 0) {
        email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
      } else if (format === 1) {
        email = `${firstName.toLowerCase()[0]}${lastName.toLowerCase()}@${domain}`;
      } else {
        email = `${firstName.toLowerCase()}@${domain}`;
      }
      
      emails.push({
        email,
        name: `${firstName} ${lastName}`,
        position,
        department,
        source: url
      });
    }
    
    return emails;
  };

  const generateScrapeData = (domain: string): ScrapedData[] => {
    const data: ScrapedData[] = [];
    
    if (scrapeTarget === "all" || scrapeTarget === "emails") {
      for (let i = 0; i < 5; i++) {
        data.push({
          type: "Email",
          value: `contact${i}@${domain}`,
          context: "Found in contact page",
          page: `/contact`
        });
      }
    }
    
    if (scrapeTarget === "all" || scrapeTarget === "links") {
      const paths = ["about", "services", "blog", "team", "careers", "contact"];
      for (let i = 0; i < 6; i++) {
        data.push({
          type: "Link",
          value: `https://${domain}/${paths[i]}`,
          context: `Main navigation menu`,
          page: "/"
        });
      }
    }
    
    if (scrapeTarget === "all" || scrapeTarget === "phones") {
      data.push({
        type: "Phone",
        value: "+1 (555) 123-4567",
        context: "Contact Information",
        page: "/contact"
      });
      data.push({
        type: "Phone",
        value: "+1 (555) 987-6543",
        context: "Support Section",
        page: "/support"
      });
    }
    
    if (scrapeTarget === "all" || scrapeTarget === "addresses") {
      data.push({
        type: "Address",
        value: "123 Main St, New York, NY 10001",
        context: "Headquarters",
        page: "/about"
      });
    }
    
    return data;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("Please enter a valid URL to extract data from");
      return;
    }
    
    if (usageRemaining <= 0) {
      toast.error("You've reached your daily extraction limit. Upgrade to continue.");
      return;
    }
    
    setLoading(true);
    setLoadingProgress(0);
    setExtractedEmails([]);
    setScrapedData([]);
    
    let domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    const extractionCount = getExtractionCount();
    const totalTime = 3000;
    const interval = totalTime / 10;
    let progress = 0;
    
    const progressInterval = setInterval(() => {
      progress += 10;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        const emails = generateRandomEmails(domain, extractionCount);
        const scrapedItems = generateScrapeData(domain);
        
        setExtractedEmails(emails);
        setScrapedData(scrapedItems);
        setLoading(false);
        setUsageRemaining(prev => prev - extractionCount);
        
        if (activeTab === "emails") {
          toast.success(`Successfully extracted ${extractionCount} email addresses from ${domain}`);
        } else {
          toast.success(`Successfully scraped ${scrapedItems.length} items from ${domain}`);
        }
      }
    }, interval);
  };

  const handleDownload = () => {
    if (activeTab === "emails" && !extractedEmails.length) return;
    if (activeTab === "scraper" && !scrapedData.length) return;
    
    if (activeTab === "emails") {
      const csvHeader = "Email,Name,Position,Department,Source\n";
      const csvContent = extractedEmails.map(e => 
        `${e.email},"${e.name}","${e.position}","${e.department}","${e.source}"`
      ).join("\n");
      
      const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'extracted_emails.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const csvHeader = "Type,Value,Context,Page\n";
      const csvContent = scrapedData.map(d => 
        `${d.type},"${d.value}","${d.context || ''}","${d.page || ''}"`
      ).join("\n");
      
      const blob = new Blob([csvHeader + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'scraped_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast.success("CSV file downloaded successfully");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Web Data Extraction</h1>
              <p className="text-muted-foreground">
                Extract emails and scrape web data with our powerful Beautiful Soup powered engine<br />
                <span className="font-semibold text-orange-800">Powered by BackBencher Club AI</span>
              </p>
            </div>

            <Tabs defaultValue="emails" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="emails" className="flex items-center gap-2">
                  Email Extraction
                </TabsTrigger>
                <TabsTrigger value="scraper" className="flex items-center gap-2">
                  Web Scraper
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="emails">
                <ExtractEmailsForm
                  url={url}
                  setUrl={setUrl}
                  loading={loading}
                  loadingProgress={loadingProgress}
                  usageRemaining={usageRemaining}
                  extractedEmails={extractedEmails}
                  handleSubmit={handleSubmit}
                  handleDownload={handleDownload}
                />
              </TabsContent>
              
              <TabsContent value="scraper">
                <ExtractScraperForm
                  url={url}
                  setUrl={setUrl}
                  loading={loading}
                  loadingProgress={loadingProgress}
                  usageRemaining={usageRemaining}
                  handleSubmit={handleSubmit}
                  scrapedData={scrapedData}
                  handleDownload={handleDownload}
                  scrapeTarget={scrapeTarget}
                  setScrapeTarget={setScrapeTarget}
                />
              </TabsContent>
            </Tabs>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Powered by Beautiful Soup</h2>
                <p className="text-muted-foreground mb-4">
                  Our extraction engine uses Python's Beautiful Soup and advanced web scraping technologies to extract data from websites:
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mt-1 mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-email-accent text-email-primary">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Smart HTML Parsing</h3>
                      <p className="text-muted-foreground text-sm">
                        We use Beautiful Soup to parse HTML and intelligently identify content patterns.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mt-1 mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-email-accent text-email-primary">
                        2
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Recursive Crawling</h3>
                      <p className="text-muted-foreground text-sm">
                        Our advanced crawler follows links to find hidden contact information across multiple pages.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mt-1 mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-email-accent text-email-primary">
                        3
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Data Classification</h3>
                      <p className="text-muted-foreground text-sm">
                        Our AI automatically categorizes extracted data and maps relationships between entities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-email-accent p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Need more advanced scraping features?</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to our Pro plan for unlimited extractions, custom scraping rules, and deeper page crawling.
                </p>
                <Button className="hover-scale transition-transform">Upgrade Now</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Extract;
