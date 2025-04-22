
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex flex-col items-start">
          <Link to="/" className="flex flex-col gap-1">
            <span className="text-2xl font-bold gradient-text">
              BackBench Mail
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              by BackBencher Club
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/verify" className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
            Verify
          </Link>
          <Link to="/compose" className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
            Compose
          </Link>
          <Link to="/track" className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
            Track
          </Link>
          <Link to="/lookup" className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
            IP Lookup
          </Link>
          <Link to="/extract" className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors">
            Extract
          </Link>
          <Link 
            to="/community" 
            className="px-4 py-2 rounded-md text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
          >
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
