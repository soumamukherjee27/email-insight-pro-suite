
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, MapPin, Globe, Loader, Lock } from "lucide-react";
import { toast } from "sonner";

const IPLookup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    ip: string;
    country: string;
    city: string;
    isp: string;
    timezone: string;
    latitude: number;
    longitude: number;
    pincode?: string;
    lastActive?: string;
  }>(null);
  const [usageRemaining, setUsageRemaining] = useState(10);
  const [isPremium, setIsPremium] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    // Simulate API call for IP lookup
    setTimeout(() => {
      const randomIP = `192.168.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`;
      setResult({
        ip: randomIP,
        country: "United States",
        city: "New York",
        isp: "Example ISP",
        timezone: "UTC-5",
        latitude: 40.7128,
        longitude: -74.006,
        ...(isPremium && { pincode: "10001" }),
        lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      setLoading(false);
      setUsageRemaining(prev => prev - 1);
      toast.success(`Successfully located email origin IP: ${randomIP}`);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Email IP Lookup</h1>
              <p className="text-muted-foreground">
                Trace the actual sender's IP address and geographical location from email headers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email-lookup" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input
                        id="email-lookup"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-10"
                      />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading || !email}
                      className="ml-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Locating
                        </>
                      ) : (
                        "Lookup"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Lookups remaining today: <span className="font-semibold">{usageRemaining}/10</span>
                  {usageRemaining === 0 && (
                    <p className="text-destructive mt-1">
                      You've reached your daily limit. Upgrade to continue.
                    </p>
                  )}
                </div>

                {result && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Sender's IP Location Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">IP Address</p>
                            <p className="font-medium">{result.ip}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Country</p>
                            <p className="font-medium">{result.country}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">City</p>
                            <p className="font-medium">{result.city}</p>
                          </div>
                          {result.pincode && (
                            <div>
                              <p className="text-sm text-muted-foreground">Pincode/Zip</p>
                              <p className="font-medium">{result.pincode}</p>
                            </div>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">ISP</p>
                            <p className="font-medium">{result.isp}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Timezone</p>
                            <p className="font-medium">{result.timezone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Coordinates</p>
                            <p className="font-medium">{result.latitude}, {result.longitude}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Active</p>
                            <p className="font-medium">{new Date(result.lastActive || "").toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      {!isPremium && (
                        <div className="mt-4 p-3 bg-email-accent rounded-md text-sm flex items-center gap-2">
                          <Lock className="h-4 w-4 text-email-primary" />
                          <span className="font-medium">Upgrade to Premium for pincode/zip precision and detailed activity logs</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                <p className="text-muted-foreground mb-4">
                  Our Email IP Lookup tool extracts and analyzes the actual sender's IP address from email headers using advanced Python tools:
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mt-1 mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-email-accent text-email-primary">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Extract Real IP</h3>
                      <p className="text-muted-foreground text-sm">
                        We analyze email headers to find the actual originating IP address, not just the mail server.
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
                      <h3 className="font-medium">Precise Geolocation</h3>
                      <p className="text-muted-foreground text-sm">
                        Determine accurate geographical information down to city level (pincode for premium users).
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
                      <h3 className="font-medium">Activity Timestamps</h3>
                      <p className="text-muted-foreground text-sm">
                        View when the email address was last active based on network data.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-email-accent p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Need unlimited IP lookups with pincode precision?</h3>
                <p className="text-muted-foreground mb-4">
                  Upgrade to our Pro or Enterprise plan for unlimited IP lookups with pincode/ZIP precision and detailed activity logs.
                </p>
                <Button onClick={() => setIsPremium(!isPremium)}>
                  {isPremium ? "Currently in Premium Mode" : "Upgrade Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IPLookup;
