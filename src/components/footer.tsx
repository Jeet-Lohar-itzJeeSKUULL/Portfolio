"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background py-12 border-t border-secondary/10 relative">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="text-xl font-heading font-bold tracking-wider">
            Jeet<span className="text-primary">.</span>Lohar
          </Link>
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} Jeet Lohar. All Rights Reserved.
          </p>
        </div>

        <div className="flex gap-4 mb-6 md:mb-0">
          <Link href="#projects" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Projects</Link>
          <span className="text-secondary/30">•</span>
          <Link href="#skills" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Skills</Link>
          <span className="text-secondary/30">•</span>
          <Link href="#experience" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Experience</Link>
          <span className="text-secondary/30">•</span>
          <Link href="#contact" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Contact</Link>
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="p-3 bg-secondary/10 hover:bg-secondary/20 rounded-full text-foreground/70 transition-colors"
        >
          <ArrowUp size={20} />
        </button>

      </div>
    </footer>
  );
}
