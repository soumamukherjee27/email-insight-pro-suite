
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Users, Lightbulb } from "lucide-react";

const Community = () => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    if (!feedback || !email) {
      toast({
        title: "Error",
        description: "Please provide your feedback and email",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // In a real app, we would send this to a backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully",
      });
      setFeedback("");
      setEmail("");
      setName("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-orange-800 mb-6">BackBencher Club Community</h1>
          
          <Tabs defaultValue="community" className="w-full mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="community">
                <Users className="h-4 w-4 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger value="feedback">
                <MessageSquare className="h-4 w-4 mr-2" />
                Feedback
              </TabsTrigger>
              <TabsTrigger value="roadmap">
                <Lightbulb className="h-4 w-4 mr-2" />
                Roadmap
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="community">
              <Card className="p-8 mb-6 text-center">
                <h2 className="text-xl font-semibold mb-2">Welcome to the BackBencher Club!</h2>
                <p className="mb-4 text-muted-foreground">
                  Join our AI-powered community to share ideas, access early product updates, and collaborate with email tool innovators from around the world.
                </p>
                <a href="https://discord.gg/backbencher" target="_blank" rel="noopener noreferrer"
                   className="inline-block bg-orange-100 border border-orange-400 px-5 py-2 rounded font-semibold text-orange-700 transition hover:bg-orange-200 mt-4">
                  Join our Discord Community
                </a>
              </Card>
              <div className="p-6 rounded-lg bg-orange-50">
                <h3 className="text-lg font-semibold mb-2">What you can do:</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1 text-left">
                  <li>Request new features or suggest improvements</li>
                  <li>Connect with other BackBencher Club members</li>
                  <li>Stay up-to-date with email tool advancements</li>
                  <li>Contribute to open source projects & resources</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="feedback">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Share Your Feedback</h2>
                <p className="mb-6 text-muted-foreground">
                  We value your input! Share your thoughts, suggestions, or report issues to help us improve BackBench Mail.
                </p>
                
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Your Name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mb-3"
                    />
                    <Input
                      placeholder="Your Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Textarea
                    placeholder="Share your feedback, suggestions, or report an issue..."
                    className="min-h-[150px]"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="roadmap">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Product Roadmap</h2>
                <p className="mb-6 text-muted-foreground">
                  Here's what we're working on next for BackBench Mail and other upcoming BackBencher Club tools:
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-orange-700 mb-2">Coming Soon</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-orange-700 text-xs font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Advanced Email Analytics</h4>
                          <p className="text-sm text-muted-foreground">Track detailed open rates, click-through rates, and engagement metrics</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-orange-700 text-xs font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">AI-Powered Email Templates</h4>
                          <p className="text-sm text-muted-foreground">Industry-specific templates with customizable AI writing assistance</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-orange-700 text-xs font-medium">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Advanced Beautiful Soup Extraction Features</h4>
                          <p className="text-sm text-muted-foreground">Custom extraction rules and pattern-based scraping</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-orange-700 mb-2">Future Tools</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-orange-700 text-xs font-medium">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">BackBench SEO</h4>
                          <p className="text-sm text-muted-foreground">AI-powered SEO optimization with Python data analysis</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-orange-700 text-xs font-medium">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">BackBench Insight</h4>
                          <p className="text-sm text-muted-foreground">Data visualization and business intelligence with Python backends</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
