
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Community = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 py-12 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-orange-800 mb-6">BackBencher Club Community</h1>
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
      </div>
    </main>
    <Footer />
  </div>
);

export default Community;
