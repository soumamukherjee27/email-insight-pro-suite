import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex flex-col items-start">
          <Link to="/" className="flex flex-col gap-1">
            <span className="text-2xl font-bold gradient-text">
              BB Mail
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              by BackBencher Club
            </span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b border-border">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/verify" 
              className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Verify
            </Link>
            <Link 
              to="/compose" 
              className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Compose
            </Link>
            <Link 
              to="/track" 
              className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track
            </Link>
            <Link 
              to="/lookup" 
              className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              IP Lookup
            </Link>
            <Link 
              to="/extract" 
              className="px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Extract
            </Link>
            <Link 
              to="/community" 
              className="px-4 py-2 rounded-md text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Community
            </Link>
            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" size="sm" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
