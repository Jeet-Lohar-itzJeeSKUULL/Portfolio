"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10" ref={containerRef}>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-16 text-center"
        >
          My Journey
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 relative">
          {/* Animated Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-secondary/20 transform -translate-x-1/2">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-[2px] bg-gradient-to-b from-primary via-accent to-transparent shadow-[0_0_10px_rgba(139,92,246,0.8)]"
            />
          </div>

          {/* Left Column */}
          <div className="flex flex-col pt-12 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="px-8 py-8 md:px-12 md:py-10 bg-secondary/5 rounded-[2rem] border border-secondary/10 hover:border-primary/50 transition-colors shadow-lg w-full relative group overflow-hidden text-left flex flex-col justify-center md:min-h-[380px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4 text-primary">Who I Am</h3>
              <div className="space-y-3 text-foreground/80 leading-relaxed font-light text-base lg:text-lg">
                 <p>
                    I’m a developer focused on building real-world applications that combine scalable systems, intuitive user experiences, and data-driven thinking. My work sits at the intersection of full stack development, application engineering, and data science fundamentals.
                 </p>
                 <p>
                    I don’t just build features — I focus on how systems behave, scale, and perform in real-world scenarios.
                 </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="px-8 py-8 md:px-12 md:py-10 bg-secondary/5 rounded-[2rem] border border-secondary/10 hover:border-accent/50 transition-colors shadow-lg w-full relative group overflow-hidden text-left flex flex-col justify-center md:min-h-[380px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4 text-accent">How I Think</h3>
              <div className="space-y-3 text-foreground/80 leading-relaxed font-light text-base lg:text-lg">
                 <p>
                    I approach development with an engineering mindset — starting with understanding the problem deeply before writing code.
                 </p>
                 <ul className="list-disc list-outside ml-5 space-y-1 marker:text-accent font-medium text-foreground/90">
                    <li>I prioritize scalability and performance from the beginning</li>
                    <li>I design systems before implementation</li>
                    <li>I focus on clean, maintainable architecture</li>
                    <li>I use data and metrics to guide improvements</li>
                 </ul>
                 <p>
                    Every project I build is driven by the goal of creating systems that are efficient, reliable, and impactful.
                 </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:pt-48 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="px-8 py-8 md:px-12 md:py-10 bg-secondary/5 rounded-[2rem] border border-secondary/10 hover:border-accent/50 transition-colors shadow-lg w-full relative group overflow-hidden text-left flex flex-col justify-center md:min-h-[380px]"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-4 text-accent">What I Do</h3>
              <div className="space-y-3 text-foreground/80 leading-relaxed font-light text-base lg:text-lg">
                 <p>
                    I develop full-stack web and mobile applications with a strong emphasis on performance, usability, and system design. My experience spans modern web technologies, backend systems, and application-level problem solving.
                 </p>
                 <p>
                    Alongside application development, I leverage data science concepts to build smarter, more efficient solutions — ensuring that applications are not just functional, but intelligent and optimized.
                 </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
