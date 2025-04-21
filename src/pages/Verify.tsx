
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Check, X, Loader, Clock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface VerificationResult {
  valid: boolean;
  message: string;
  format: boolean;
  dns: boolean;
  mxRecords: boolean;
  smtp: boolean;
  disposable: boolean;
  lastActive?: string;
  score: number;
  breachHistory?: {
    breached: boolean;
    lastBreach?: string;
    count?: number;
  };
}

const Verify = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [usageRemaining, setUsageRemaining] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address to verify");
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    // Simulate API call for email verification
    setTimeout(() => {
      const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const randomValue = Math.random();
      const isValid = isValidFormat && randomValue > 0.3;
      
      const lastActiveDate = new Date();
      lastActiveDate.setDate(lastActiveDate.getDate() - Math.floor(Math.random() * 90));
      
      const verificationResult: VerificationResult = {
        valid: isValid,
        message: isValid 
          ? "This email appears to be valid and active." 
          : "This email address is invalid or inactive.",
        format: isValidFormat,
        dns: isValidFormat && randomValue > 0.2,
        mxRecords: isValidFormat && randomValue > 0.25,
        smtp: isValid,
        disposable: randomValue < 0.2,
        lastActive: lastActiveDate.toISOString(),
        score: isValid ? Math.floor(randomValue * 40) + 60 : Math.floor(randomValue * 40),
        breachHistory: {
          breached: randomValue < 0.4,
          lastBreach: randomValue < 0.4 ? new Date(lastActiveDate.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString() : undefined,
          count: randomValue < 0.4 ? Math.floor(randomValue * 5) + 1 : 0
        }
      };
      
      setResult(verificationResult);
      setLoading(false);
      setUsageRemaining(prev => prev - 1);
      
      if (verificationResult.valid) {
        toast.success("Email verified successfully");
      } else {
        toast.error("Email verification failed");
      }
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Advanced Email Verification</h1>
              <p className="text-muted-foreground">
                Instantly check if an email address is valid, active, and safe to use.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-10"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !email}
                      className="ml-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Verifying
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Checks remaining today: <span className="font-semibold">{usageRemaining}/10</span>
                  {usageRemaining === 0 && (
                    <p className="text-destructive mt-1">
                      You've reached your daily limit. Upgrade to continue.
                    </p>
                  )}
                </div>

                {result && (
                  <Card className={result.valid ? 'border-green-200' : 'border-red-200'}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className={`p-1 rounded-full ${result.valid ? 'bg-green-100' : 'bg-red-100'}`}>
                            {result.valid ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <X className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div className="ml-3">
                            <h3 className={`text-lg font-medium ${result.valid ? 'text-green-800' : 'text-red-800'}`}>
                              {result.valid ? 'Valid Email' : 'Invalid Email'}
                            </h3>
                            <p className="text-sm mt-1 text-muted-foreground">
                              {result.message}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Badge 
                            variant="outline" 
                            className={`px-3 py-1 ${getScoreColor(result.score)} bg-opacity-10`}
                          >
                            Score: {result.score}/100
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${result.format ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm">Format Check</span>
                          </div>
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${result.dns ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm">Domain Exists</span>
                          </div>
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${result.mxRecords ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm">MX Records</span>
                          </div>
                          <div className="flex items-center">
                            <div className={`h-3 w-3 rounded-full mr-2 ${result.smtp ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm">SMTP Check</span>
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowAdvanced(!showAdvanced)}
                            className="text-sm text-muted-foreground hover:text-foreground px-0"
                          >
                            {showAdvanced ? "Hide" : "Show"} Advanced Details
                          </Button>
                          
                          {showAdvanced && (
                            <div className="mt-4 space-y-4">
                              <div className="p-3 bg-muted rounded-md space-y-3">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">Last Active:</span>
                                  </div>
                                  <span className="text-sm">{formatDate(result.lastActive)}</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">Disposable Email:</span>
                                  </div>
                                  <Badge variant={result.disposable ? "destructive" : "outline"}>
                                    {result.disposable ? "Yes" : "No"}
                                  </Badge>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">Found in Data Breaches:</span>
                                  </div>
                                  <Badge variant={result.breachHistory?.breached ? "destructive" : "outline"}>
                                    {result.breachHistory?.breached ? `Yes (${result.breachHistory.count} times)` : "No"}
                                  </Badge>
                                </div>
                                
                                {result.breachHistory?.breached && (
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                      <span className="text-sm font-medium">Last Breach:</span>
                                    </div>
                                    <span className="text-sm">{formatDate(result.breachHistory.lastBreach)}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-xs text-muted-foreground">
                                Our verification system uses Python libraries and APIs to check email validity and security status.
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Advanced Verification with Python Tools</h2>
                <p className="text-muted-foreground">
                  Our email verification uses powerful Python libraries and tools to perform comprehensive checks:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Email syntax validation and formatting</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>DNS and MX record verification</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>SMTP mailbox existence check</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Disposable email detection</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Data breach history scanning</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Last activity timestamp detection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-email-accent p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Need to verify in bulk?</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to our Pro or Enterprise plan to verify multiple emails at once with detailed reports.
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

export default Verify;
