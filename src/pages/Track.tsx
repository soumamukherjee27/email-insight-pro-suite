
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Mail, LineChart, Loader } from "lucide-react";

const Track = () => {
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);
  const [usageRemaining, setUsageRemaining] = useState(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !trackingId) return;
    
    setLoading(true);
    setTrackingResult(null);
    
    // Simulate API call for tracking
    setTimeout(() => {
      setTrackingResult({
        emailId: email || "sample@example.com",
        trackingId: trackingId || "TRK-" + Math.random().toString(36).substring(2, 10),
        status: "Delivered",
        opens: Math.floor(Math.random() * 5),
        lastOpened: new Date().toISOString(),
        deliveryTime: "2 hours ago",
        inbox: Math.random() > 0.2 ? "Primary" : "Spam",
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
              <h1 className="text-3xl font-bold mb-4">Email Tracking</h1>
              <p className="text-muted-foreground">
                Monitor when your emails were opened and track delivery status in real-time.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email-track" className="block text-sm font-medium mb-2">
                    Email Address or Tracking ID
                  </label>
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="relative flex-1">
                      <Input
                        id="email-track"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-10"
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="relative flex-1">
                      <Input
                        id="tracking-id"
                        type="text"
                        placeholder="Tracking ID (optional)"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        className="pr-10"
                      />
                      <LineChart className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Tracking requests remaining today: <span className="font-semibold">{usageRemaining}/10</span>
                  {usageRemaining === 0 && (
                    <p className="text-destructive mt-1">
                      You've reached your daily limit. Upgrade to continue.
                    </p>
                  )}
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={loading || usageRemaining === 0 || (!email && !trackingId)}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Tracking Email
                      </>
                    ) : (
                      "Track Email"
                    )}
                  </Button>
                </div>

                {trackingResult && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Email Tracking Results</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Email Address</p>
                            <p className="font-medium">{trackingResult.emailId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tracking ID</p>
                            <p className="font-medium">{trackingResult.trackingId}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-medium">{trackingResult.status}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Times Opened</p>
                            <p className="font-medium">{trackingResult.opens}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Opened</p>
                            <p className="font-medium">{new Date(trackingResult.lastOpened).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Inbox Placement</p>
                            <p className="font-medium">{trackingResult.inbox}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-2 bg-muted rounded-md text-xs text-muted-foreground">
                        This is a simulated result for demonstration purposes. For real tracking, enable our pixel tracking in your emails.
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">How Email Tracking Works</h2>
                <p className="text-muted-foreground mb-4">
                  Our email tracking uses a combination of pixel tracking and link redirects to monitor when recipients interact with your emails.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mt-1 mr-4 flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-email-accent text-email-primary">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Send Tracked Emails</h3>
                      <p className="text-muted-foreground text-sm">
                        Use our compose function to create emails with embedded tracking pixels.
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
                      <h3 className="font-medium">Real-time Notifications</h3>
                      <p className="text-muted-foreground text-sm">
                        Get instant alerts when recipients open your emails or click links.
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
                      <h3 className="font-medium">Detailed Analytics</h3>
                      <p className="text-muted-foreground text-sm">
                        View detailed reports on open rates, click-through rates, and inbox placement.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Track;
