
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">
              BackBench Mail <span className="text-sm font-semibold pl-3 text-muted-foreground">by BackBencher Club</span>
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/verify" className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
            Verify
          </Link>
          <Link to="/compose" className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
            Compose
          </Link>
          <Link to="/track" className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
            Track
          </Link>
          <Link to="/lookup" className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
            IP Lookup
          </Link>
          <Link to="/extract" className="px-3 py-2 rounded-md text-sm hover:bg-secondary">
            Extract
          </Link>
          <Link to="/community" className="px-3 py-2 rounded-md text-sm hover:bg-orange-100 font-semibold text-orange-700">
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
          <Button size="sm">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
