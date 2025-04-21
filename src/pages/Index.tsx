
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Mail, FileText, MapPin, LineChart, Search } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-email-accent to-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  Supercharge Your <span className="gradient-text">Email Workflow</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Verify, compose, track, and analyze emails with our all-in-one platform.
                  Perfect for professionals and teams.
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
                        <p className="text-xs text-muted-foreground">Check if an email is active</p>
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
                      <LineChart className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">Email Tracking</p>
                        <p className="text-xs text-muted-foreground">Monitor open rates and more</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <MapPin className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">IP Lookup</p>
                        <p className="text-xs text-muted-foreground">Locate email origins</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <Search className="h-6 w-6 text-email-primary" />
                      <div>
                        <p className="text-sm font-medium">Email Extraction</p>
                        <p className="text-xs text-muted-foreground">Find targeted email addresses</p>
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
              <h2 className="text-3xl font-bold mb-4">All-in-One Email Toolkit</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful tools designed to improve productivity and insight for your email communications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="feature-icon">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Verification</h3>
                <p className="text-muted-foreground">
                  Instantly check if an email address is valid and active before sending your message.
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
                  <LineChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor when your emails are opened and track delivery status in real-time.
                </p>
                <Link to="/track" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">IP Lookup</h3>
                <p className="text-muted-foreground">
                  Determine the geographical location of email senders by their IP address.
                </p>
                <Link to="/lookup" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Extraction</h3>
                <p className="text-muted-foreground">
                  Find targeted email addresses from companies and organizations with our powerful search tools.
                </p>
                <Link to="/extract" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Usage Analytics</h3>
                <p className="text-muted-foreground">
                  Track your usage and get insights on how to optimize your email campaigns.
                </p>
                <Link to="/analytics" className="mt-4 inline-block text-email-primary hover:underline">
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-email-accent">
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
                    <span>Basic email tracking</span>
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
                    <span>Unlimited IP lookups</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Advanced email tracking</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>100 email extractions/day</span>
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
                    <span>Unlimited IP lookups</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Premium email tracking</span>
                  </li>
                  <li className="plan-feature">
                    <Check className="h-4 w-4 text-email-secondary" />
                    <span>Unlimited email extractions</span>
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
                Join thousands of professionals using Email Insight Pro to improve their email productivity.
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
