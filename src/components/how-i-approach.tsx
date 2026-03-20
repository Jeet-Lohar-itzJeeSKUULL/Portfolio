"use client";

import { motion } from "framer-motion";
import { Activity, Layers, Zap, PenTool } from "lucide-react";

const approachPoints = [
  {
    title: "I design systems before writing code",
    description: "Before jumping into development, I map out the architecture, data flow, and component structure. This helps avoid unnecessary complexity later and ensures the system scales smoothly as features grow.",
    icon: <PenTool size={24} />,
    color: "text-primary border-primary"
  },
  {
    title: "I prioritize scalability & performance",
    description: "From optimizing API responses to handling real-time updates efficiently, I focus on building systems that perform well under load. Performance is not an afterthought — it’s built into the foundation.",
    icon: <Zap size={24} />,
    color: "text-yellow-400 border-yellow-400"
  },
  {
    title: "I focus on clean, maintainable architecture",
    description: "I write code that is easy to understand, extend, and debug. A well-structured system allows faster development, easier collaboration, and long-term sustainability.",
    icon: <Layers size={24} />,
    color: "text-accent border-accent"
  },
  {
    title: "I use metrics to guide optimization",
    description: "I rely on measurable indicators like load time, performance scores, and system behavior to make decisions. Instead of guessing, I optimize based on real data and results.",
    icon: <Activity size={24} />,
    color: "text-emerald-400 border-emerald-400"
  }
];

export function HowIApproach() {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/5 to-background border-y border-secondary/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-center mb-16"
        >
          <span className="text-sm font-black tracking-widest uppercase text-primary mb-3 block">Engineering Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter mb-4">
            How I Approach Engineering
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Designing systems that scale, perform, and solve real-world problems requires structured thinking, not just code.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
           {/* Center connecting lines for desktop */}
           <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-secondary/10 -translate-x-1/2" />
           <div className="hidden md:block absolute top-[50%] left-10 right-10 h-px bg-secondary/10 -translate-y-1/2" />

           {approachPoints.map((point, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ delay: idx * 0.1, duration: 0.5 }}
               className="bg-background/50 backdrop-blur-sm p-8 rounded-3xl border border-secondary/20 shadow-lg hover:shadow-xl hover:bg-secondary/5 transition-all group flex flex-col h-full"
             >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 bg-background ${point.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                   {point.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3">{point.title}</h3>
                <p className="text-foreground/70 leading-relaxed font-medium flex-1">
                   {point.description}
                </p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
