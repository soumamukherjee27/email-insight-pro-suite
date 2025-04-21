
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Check, X, Loader } from "lucide-react";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { valid: boolean; message: string }>(null);
  const [usageRemaining, setUsageRemaining] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setLoading(true);
    setResult(null);
    
    // Simulate API call for email verification
    setTimeout(() => {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && Math.random() > 0.3;
      setResult({ 
        valid: isValid, 
        message: isValid 
          ? "This email appears to be valid and active." 
          : "This email address is invalid or inactive."
      });
      setLoading(false);
      setUsageRemaining(prev => prev - 1);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Email Verification</h1>
              <p className="text-muted-foreground">
                Instantly check if an email address is valid and active.
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
                  <div className={`p-4 rounded-lg ${result.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div className="flex items-start">
                      <div className={`p-1 rounded-full ${result.valid ? 'bg-green-100' : 'bg-red-100'}`}>
                        {result.valid ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className={`text-sm font-medium ${result.valid ? 'text-green-800' : 'text-red-800'}`}>
                          {result.valid ? 'Valid Email' : 'Invalid Email'}
                        </h3>
                        <p className="text-sm mt-1 text-muted-foreground">
                          {result.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Why Verify Emails?</h2>
                <p className="text-muted-foreground">
                  Email verification is essential for maintaining a clean contact list and ensuring your messages reach real people. Our verification checks:
                </p>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Email syntax validity</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Domain existence and MX records</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Mailbox existence</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-email-secondary mr-2 mt-0.5" />
                    <span>Catch-all detection</span>
                  </li>
                </ul>
              </div>

              <div className="bg-email-accent p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Need to verify in bulk?</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to our Pro or Enterprise plan to verify multiple emails at once.
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
