
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Link, FileText, Loader, Download } from "lucide-react";
import { toast } from "sonner";

interface ExtractedEmail {
  email: string;
  name: string;
  position: string;
  department: string;
  source: string;
}

const Extract = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedEmails, setExtractedEmails] = useState<ExtractedEmail[]>([]);
  const [usageRemaining, setUsageRemaining] = useState(100);
  const [loadingProgress, setLoadingProgress] = useState(0);

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
      
      // Generate email with different formats
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("Please enter a valid URL to extract emails from");
      return;
    }
    
    if (usageRemaining <= 0) {
      toast.error("You've reached your daily extraction limit. Upgrade to continue.");
      return;
    }
    
    setLoading(true);
    setLoadingProgress(0);
    setExtractedEmails([]);
    
    // Simulate domain extraction from URL
    let domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    
    // Simulate API call with progressive updates for more realistic UI
    const extractionCount = Math.min(Math.floor(Math.random() * 20) + 30, usageRemaining); // Between 30-50, but limited by remaining usage
    const totalTime = 3000; // 3 seconds for complete extraction
    const interval = totalTime / 10;
    let progress = 0;
    
    const progressInterval = setInterval(() => {
      progress += 10;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(progressInterval);
        const emails = generateRandomEmails(domain, extractionCount);
        setExtractedEmails(emails);
        setLoading(false);
        setUsageRemaining(prev => prev - extractionCount);
        toast.success(`Successfully extracted ${extractionCount} email addresses from ${domain}`);
      }
    }, interval);
  };

  const handleDownload = () => {
    if (!extractedEmails.length) return;
    
    // Create CSV content
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
    
    toast.success("CSV file downloaded successfully");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Email Extraction</h1>
              <p className="text-muted-foreground">
                Find professional email addresses from company websites and LinkedIn profiles.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="url-extract" className="block text-sm font-medium mb-2">
                    Website URL or LinkedIn Company Page
                  </label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input
                        id="url-extract"
                        type="url"
                        placeholder="https://company.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pr-10"
                      />
                      <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !url || usageRemaining <= 0}
                      className="ml-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Extracting...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Extract Emails
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      Extractions remaining today: <span className="font-semibold">{usageRemaining}/100</span>
                    </div>
                    {extractedEmails.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleDownload}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download CSV
                      </Button>
                    )}
                  </div>
                  {usageRemaining === 0 && (
                    <p className="text-destructive mt-1">
                      You've reached your daily limit. Upgrade to continue.
                    </p>
                  )}
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
                      Extracted {Math.floor(loadingProgress / 100 * extractedEmails.length)} emails...
                    </p>
                  </div>
                )}

                {extractedEmails.length > 0 && (
                  <Card>
                    <CardContent className="p-0">
                      <div className="max-h-96 overflow-auto">
                        <Table>
                          <TableHeader className="sticky top-0 bg-card">
                            <TableRow>
                              <TableHead>Email</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Position</TableHead>
                              <TableHead>Department</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {extractedEmails.map((email, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{email.email}</TableCell>
                                <TableCell>{email.name}</TableCell>
                                <TableCell>{email.position}</TableCell>
                                <TableCell>{email.department}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">How Email Extraction Works</h2>
                <p className="text-muted-foreground mb-4">
                  Our email extraction tool uses advanced algorithms to find professional email addresses from websites and LinkedIn profiles:
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mt-1 mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-email-accent text-email-primary">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Website Scanning</h3>
                      <p className="text-muted-foreground text-sm">
                        We scan company websites and public pages to identify email patterns.
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
                      <h3 className="font-medium">Pattern Recognition</h3>
                      <p className="text-muted-foreground text-sm">
                        Our algorithms detect email formatting conventions used by the organization.
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
                      <h3 className="font-medium">Verification</h3>
                      <p className="text-muted-foreground text-sm">
                        Each extracted email is verified to ensure deliverability and accuracy.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-email-accent p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Need more extractions?</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to our Pro or Enterprise plan for higher extraction limits and advanced search features.
                </p>
                <Button>Upgrade Now</Button>
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
