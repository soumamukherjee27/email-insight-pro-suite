
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Mail, LineChart, Loader, Bell, Eye, BellRing } from "lucide-react";
import { toast } from "sonner";

interface TrackingData {
  emailId: string;
  trackingId: string;
  status: string;
  opens: number;
  lastOpened: string;
  deliveryTime: string;
  inbox: string;
  openTimes: string[];
  userAgent?: string;
  location?: string;
}

const Track = () => {
  const [trackingId, setTrackingId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingData | null>(null);
  const [usageRemaining, setUsageRemaining] = useState(10);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [hasNewOpenEvent, setHasNewOpenEvent] = useState(false);

  // Simulate email open events for demo purposes
  useEffect(() => {
    if (trackingResult && notificationsEnabled) {
      const timer = setTimeout(() => {
        const newOpenTime = new Date().toISOString();
        setTrackingResult(prev => {
          if (!prev) return null;
          return {
            ...prev,
            opens: prev.opens + 1,
            lastOpened: newOpenTime,
            openTimes: [...prev.openTimes, newOpenTime],
            userAgent: "Chrome/99.0.4844.51 on Windows 10",
            location: "New York, United States"
          };
        });
        setHasNewOpenEvent(true);
        toast.success(
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            <div>
              <p className="font-medium">Email opened!</p>
              <p className="text-xs">Your tracked email was just opened</p>
            </div>
          </div>,
          {
            duration: 5000,
          }
        );
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [trackingResult, notificationsEnabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email && !trackingId) {
      toast.error("Please enter either an email or tracking ID");
      return;
    }
    
    setLoading(true);
    setTrackingResult(null);
    setHasNewOpenEvent(false);
    
    // Simulate API call for tracking
    setTimeout(() => {
      const currentTime = new Date();
      const openTime = new Date(currentTime.getTime() - 2 * 60 * 60 * 1000).toISOString();
      
      setTrackingResult({
        emailId: email || "sample@example.com",
        trackingId: trackingId || "TRK-" + Math.random().toString(36).substring(2, 10),
        status: "Delivered",
        opens: 1,
        lastOpened: openTime,
        deliveryTime: "2 hours ago",
        inbox: Math.random() > 0.2 ? "Primary" : "Spam",
        openTimes: [openTime],
        userAgent: "Safari/605.1.15 on macOS",
        location: "San Francisco, United States"
      });
      
      setLoading(false);
      setUsageRemaining(prev => prev - 1);
      setNotificationsEnabled(true);
    }, 2000);
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">Real-Time Email Tracking</h1>
              <p className="text-muted-foreground">
                Monitor when your emails are opened in real-time with instant notifications.
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
                  <Card className={hasNewOpenEvent ? "animate-pulse-subtle border-email-primary" : ""}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">Email Tracking Results</h3>
                        {notificationsEnabled && (
                          <Badge variant="outline" className="flex items-center gap-1 bg-email-accent">
                            <BellRing className="h-3 w-3 text-email-primary" />
                            <span>Live Tracking Active</span>
                          </Badge>
                        )}
                      </div>
                      
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
                          <div>
                            <p className="text-sm text-muted-foreground">Inbox Placement</p>
                            <p className="font-medium">{trackingResult.inbox}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Times Opened</p>
                            <p className="font-medium">{trackingResult.opens}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Opened</p>
                            <p className="font-medium">{getTimeAgo(trackingResult.lastOpened)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{trackingResult.location || "Unknown"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Device</p>
                            <p className="font-medium">{trackingResult.userAgent || "Unknown"}</p>
                          </div>
                        </div>
                      </div>
                      
                      {trackingResult.openTimes.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Open Timeline</p>
                          <div className="bg-muted p-3 rounded-md max-h-32 overflow-y-auto">
                            {trackingResult.openTimes.map((time, index) => (
                              <div key={index} className="flex items-center gap-2 py-1 text-sm border-b last:border-0 border-border">
                                <Eye className="h-3 w-3 text-email-primary" />
                                <span>Opened {getTimeAgo(time)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                          className="flex items-center gap-2"
                        >
                          {notificationsEnabled ? (
                            <>
                              <Bell className="h-4 w-4" />
                              Pause Notifications
                            </>
                          ) : (
                            <>
                              <BellRing className="h-4 w-4" />
                              Enable Notifications
                            </>
                          )}
                        </Button>
                        
                        <p className="text-xs text-muted-foreground">
                          You'll be notified when this email is opened
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </form>
            </div>

            <div className="mt-10 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">How Real-Time Email Tracking Works</h2>
                <p className="text-muted-foreground mb-4">
                  Our advanced tracking system uses pixel tracking and link redirects with instant notification technology:
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
                      <h3 className="font-medium">Instant Open Notifications</h3>
                      <p className="text-muted-foreground text-sm">
                        Get real-time browser notifications when recipients open your emails.
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
                        Track device type, location, and timestamp of each open event.
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
