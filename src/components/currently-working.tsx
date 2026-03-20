"use client";

import { motion } from "framer-motion";
import { Cpu, RotateCw } from "lucide-react";

export function CurrentlyWorking() {
  return (
    <section className="py-12 bg-secondary/5 border-y border-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
           <div className="relative flex items-center justify-center">
              <RotateCw className="text-primary animate-spin-slow duration-[3000ms]" size={28} />
              <div className="absolute inset-0 bg-primary/20 blur-md rounded-full" />
           </div>
           <div>
              <h3 className="font-heading font-black text-lg tracking-wide">Currently Engineering</h3>
              <p className="text-sm font-medium text-foreground/60 uppercase tracking-widest">Active Focus Areas</p>
           </div>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 w-full md:w-auto">
          <motion.div 
             whileHover={{ y: -2 }}
             className="flex items-center gap-2 px-5 py-2.5 bg-background border border-secondary/20 rounded-xl shadow-sm cursor-default"
          >
             <Cpu size={16} className="text-accent" />
             <span className="text-sm font-bold">AI-Powered Web Applications</span>
          </motion.div>
          <motion.div 
             whileHover={{ y: -2 }}
             className="flex items-center gap-2 px-5 py-2.5 bg-background border border-secondary/20 rounded-xl shadow-sm cursor-default"
          >
             <Cpu size={16} className="text-primary" />
             <span className="text-sm font-bold">Scalable System Design Patterns</span>
          </motion.div>
          <motion.div 
             whileHover={{ y: -2 }}
             className="flex items-center gap-2 px-5 py-2.5 bg-background border border-secondary/20 rounded-xl shadow-sm cursor-default"
          >
             <Cpu size={16} className="text-emerald-400" />
             <span className="text-sm font-bold">Event-Driven Microservices Architecture</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
