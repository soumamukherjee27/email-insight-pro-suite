import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Mail, FileText, MapPin, BellRing, Code, ShieldCheck, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Prototype Notice Section */}
      <section className="bg-black text-white py-6 px-4 border-b border-green-600">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-green-400 mb-1">🚧 Prototype in Progress</h2>
            <p className="max-w-3xl text-sm md:text-base text-green-300">
              This website is an evolving prototype from <b>BackBenchers Club</b>, focused on empowering professionals who embrace vibe coding and love technology, AI, and cloud infrastructure. We welcome all visitors to explore, contribute, and help us grow with feedback and ideas.
            </p>
            <p className="max-w-3xl mt-1 text-sm md:text-base text-green-300">
              BackBenchers Club thrives on community collaboration — join us in the Community tab to share suggestions, discuss upcoming features, and build powerful tools together.
            </p>
          </div>
          <div>
            <Link
              to="/community"
              className="inline-block bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-3 rounded-lg font-semibold shadow-md"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-email-accent to-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text">
                  Supercharge Your <span> Email Workflow</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Verify, compose, track, and analyze emails with <b>BackBench Mail</b>. Powered by AI and Python's Beautiful Soup for advanced web extraction.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/signup">Get Started Free</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-email-secondary" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-background rounded-xl border border-border p-6 shadow-lg">
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-3 p-3 bg-email-accent rounded-lg">
                      <Mail className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">Email Verification</p>
                        <p className="text-xs text-muted-foreground">Check if an email is active and secure</p>
                      </div>
                      <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse-light"></div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <FileText className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">Email Composition</p>
                        <p className="text-xs text-muted-foreground">Create professional emails</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <BellRing className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">Real-Time Tracking</p>
                        <p className="text-xs text-muted-foreground">Get notified when emails are opened</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <MapPin className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">IP Lookup</p>
                        <p className="text-xs text-muted-foreground">Locate precise email origins with pincode</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <Code className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">Beautiful Soup Web Extraction</p>
                        <p className="text-xs text-muted-foreground">Powerful web scraping capabilities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">All-in-One Email & Web Data Toolkit</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful Python-powered tools designed to improve productivity and provide deep insights for your email and web research.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="feature-icon">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Email Verification</h3>
                <p className="text-muted-foreground">
                  Instantly check if an email address is valid, when it was last active, and if it's been involved in data breaches.
                </p>
                <Link to="/verify" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Composition</h3>
                <p className="text-muted-foreground">
                  Create professional emails and cover letters with our intelligent assistant.
                </p>
                <Link to="/compose" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <BellRing className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Email Tracking</h3>
                <p className="text-muted-foreground">
                  Get instant notifications when your emails are opened, with device and location details.
                </p>
                <Link to="/track" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Precise IP Lookup</h3>
                <p className="text-muted-foreground">
                  Trace email origins down to the pincode/zip level with our advanced geolocation system.
                </p>
                <Link to="/lookup" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful Soup Web Extraction</h3>
                <p className="text-muted-foreground">
                  Extract targeted data from websites using Python's Beautiful Soup with our powerful web scraping tools.
                </p>
                <Link to="/extract" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">BackBencher Community</h3>
                <p className="text-muted-foreground">
                  Join our community of professionals and developers to share insights and techniques.
                </p>
                <Link to="/community" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Beautiful Soup Highlight Section */}
        <section className="py-16 bg-email-accent/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Powered by Beautiful Soup</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Harness the power of Python's premier web scraping library for professional-grade data extraction
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Web Extraction Features</h3>
                  <ul className="space-y-3">
                    <li className="flex">
                      <Check className="h-5 w-5 text-email-primary mr-2 flex-shrink-0" />
                      <span>Extract structured data from any website</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-email-primary mr-2 flex-shrink-0" />
                      <span>Automatically detect and extract contact information</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-email-primary mr-2 flex-shrink-0" />
                      <span>Find hidden emails in JavaScript and metadata</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-email-primary mr-2 flex-shrink-0" />
                      <span>Export data in CSV, JSON, or Excel formats</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-email-primary mr-2 flex-shrink-0" />
                      <span>Set custom extraction rules and patterns</span>
                    </li>
                  </ul>
                  <Button className="mt-6" asChild>
                    <Link to="/extract">Try Web Extraction</Link>
                  </Button>
                </div>
                
                <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">Lead Generation</h4>
                      <p className="text-sm text-muted-foreground">Find prospect emails from company websites and directories</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">Competitive Analysis</h4>
                      <p className="text-sm text-muted-foreground">Extract structured data from competitor websites</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">Content Research</h4>
                      <p className="text-sm text-muted-foreground">Gather information from multiple sources automatically</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-1">Contact Discovery</h4>
                      <p className="text-sm text-muted-foreground">Find decision-makers and their contact details</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your needs. All plans include access to our core features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="pricing-card">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Free</h3>
                  <p className="text-muted-foreground text-sm">Get started with basic features</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold">$0</p>
                  <p className="text-muted-foreground text-sm">Forever free</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>10 email verifications/day</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>10 email compositions/day</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>10 IP lookups/day</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Basic web extraction</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </div>

              <div className="pricing-card-popular">
                <div className="absolute -top-3 right-4 bg-email-secondary text-white text-xs font-medium px-2 py-1 rounded-md">
                  Most Popular
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Pro</h3>
                  <p className="text-muted-foreground text-sm">Perfect for professionals</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold">$19</p>
                  <p className="text-muted-foreground text-sm">per month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>100 email verifications/day</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Unlimited email compositions</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Unlimited IP lookups with city precision</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Real-time email open notifications</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Advanced Beautiful Soup extraction</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Start 14-Day Trial
                </Button>
              </div>

              <div className="pricing-card">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Enterprise</h3>
                  <p className="text-muted-foreground text-sm">For teams and businesses</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-bold">$49</p>
                  <p className="text-muted-foreground text-sm">per month</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Unlimited email verifications</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Unlimited email compositions</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Unlimited IP lookups with pincode precision</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Premium tracking & analytics</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Custom Beautiful Soup extraction rules</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="bg-email-primary rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to supercharge your email workflow?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Join the BackBencher Club community using BackBench Mail to improve their email productivity and web research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-email-primary hover:bg-gray-100">
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-email-primary/90">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
