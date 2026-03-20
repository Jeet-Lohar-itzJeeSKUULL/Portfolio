"use client";

import { motion } from "framer-motion";
import { Github as GithubIcon, Star, GitBranch, Terminal, Activity } from "lucide-react";
import Link from "next/link";

export function GithubSection() {
  // Static placeholder data since we aren't fetching the real API yet
  const pinnedRepos = [
    { name: "scalable-auth-service", desc: "A high-performance JWT/OAuth service written in Go with Redis caching.", stars: 124, forks: 30, lang: "Go" },
    { name: "react-canvas-dashboard", desc: "Open-source canvas rendering engine for complex financial dashboards.", stars: 89, forks: 12, lang: "TypeScript" },
  ];

  return (
    <section className="py-24 bg-background border-t border-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-4 flex items-center gap-4">
              <GithubIcon size={40} className="text-primary hidden md:block" />
              Code & Open Source
            </h2>
            <p className="text-foreground/60 max-w-xl text-lg">
              Explore my raw code, system architectures, and open-source contributions. I believe in writing code in public.
            </p>
          </div>

          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 rounded-full font-bold transition-all shadow-sm w-fit"
          >
             <GithubIcon size={18} /> View Full Profile
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {/* Repositories */}
           <div className="lg:col-span-2 space-y-6">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                 <Terminal size={18} className="text-accent" /> Pinned Repositories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {pinnedRepos.map((repo, i) => (
                    <a href={`https://github.com/yourusername/${repo.name}`} key={i} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/50 transition-colors shadow-sm group">
                       <h4 className="font-bold text-lg mb-2 text-primary group-hover:underline flex items-center gap-2">
                         <GithubIcon size={16} /> {repo.name}
                       </h4>
                       <p className="text-sm font-medium text-foreground/70 mb-6 flex-grow">{repo.desc}</p>
                       <div className="flex items-center gap-4 text-xs font-bold text-foreground/50">
                          <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-accent/80" /> {repo.lang}</span>
                          <span className="flex items-center gap-1 hover:text-yellow-500 transition-colors"><Star size={14} /> {repo.stars}</span>
                          <span className="flex items-center gap-1 hover:text-primary transition-colors"><GitBranch size={14} /> {repo.forks}</span>
                       </div>
                    </a>
                 ))}
              </div>
           </div>

           {/* Contribution Graph Placeholder */}
           <div className="lg:col-span-1 space-y-6">
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                 <Activity size={18} className="text-primary" /> Consistency
              </h3>
              <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center justify-center flex-col shadow-sm text-center">
                 <div className="grid grid-cols-7 gap-1 mb-4 opacity-70">
                    {/* Fake commit graph visual */}
                    {[...Array(28)].map((_, i) => {
                       const level = Math.random();
                       const color = level > 0.8 ? "bg-primary/80" : level > 0.5 ? "bg-primary/50" : level > 0.2 ? "bg-primary/30" : "bg-primary/10";
                       return <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
                    })}
                 </div>
                 <p className="font-bold text-lg mb-1">500+ Contributions</p>
                 <p className="text-sm font-medium text-foreground/60">in the last year</p>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
