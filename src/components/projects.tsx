"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Activity, TrendingUp } from "lucide-react";
import { projectsData } from "@/data/projects";

const filters = ["All", "Full Stack", "Data Science", "App Development", "Frontend"];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projectsData.filter(
    (project) => activeFilter === "All" || project.categories.includes(activeFilter)
  );

  return (
    <section id="projects" className="py-24 bg-background border-t border-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-4">
              Featured Case Studies
            </h2>
            <p className="text-foreground/60 max-w-xl text-lg">
              Detailed breakdowns of my most impactful engineering work, complete with architecture insights and real-world metrics.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end max-w-2xl ml-auto">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-[13px] font-bold tracking-tight transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground shadow-[0_8px_16px_rgba(37,99,235,0.3)] ring-2 ring-primary/20"
                    : "bg-secondary/5 hover:bg-secondary/15 text-foreground/70 hover:text-foreground border border-secondary/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Featured Project */}
          <div className="md:col-span-2 lg:col-span-3 mb-10">
             <div className="relative bg-secondary/5 rounded-[2rem] overflow-hidden border border-secondary/20 shadow-2xl flex flex-col lg:flex-row group border-primary/30 hover:border-primary/60 transition-colors">
                <div className="lg:w-1/2 relative aspect-video lg:aspect-auto min-h-[400px] lg:min-h-[500px] overflow-hidden bg-secondary/10 shrink-0">
                   {projectsData[1]?.image && (
                     <Image
                       src={projectsData[1].image}
                       alt={projectsData[1].title}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-700"
                     />
                   )}
                   <div className="absolute inset-0 bg-background/10 mix-blend-overlay pointer-events-none" />
                   <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10 bg-background/50 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
                   <div className="absolute inset-0 bg-gradient-to-r from-background to-background/80 hidden lg:block -z-10" />
                   <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-black tracking-widest uppercase text-primary px-3 py-1 bg-primary/10 rounded-md border border-primary/20 shadow-[0_0_10px_rgba(37,99,235,0.2)]">Featured Case Study</span>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-heading font-black mb-2 group-hover:text-primary transition-colors">
                      {projectsData[1]?.title}
                   </h3>
                   
                   <p className="text-xl font-bold text-foreground/90 leading-snug mb-6">
                      {projectsData[1]?.impactStatement}
                   </p>
                   
                   <p className="text-foreground/70 font-medium leading-relaxed mb-8 text-base">
                      {projectsData[1]?.shortDescription}
                   </p>
                   
                   <ul className="space-y-3 mb-10">
                     {projectsData[1]?.metrics?.slice(0, 3).map((metric, i) => (
                       <li key={i} className="flex items-start gap-3 text-foreground/90 font-medium bg-secondary/5 px-4 py-2 rounded-lg border border-secondary/10 w-fit">
                          <span className="shrink-0 mt-0.5 text-primary"><Activity size={16} /></span>
                          <span className="text-sm leading-snug font-semibold">{metric}</span>
                       </li>
                     ))}
                   </ul>

                   <Link 
                     href={`/projects/${projectsData[1]?.id}`} 
                     className="mt-auto inline-flex items-center justify-center w-fit px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold group/btn shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:bg-primary/95 hover:scale-[1.05] active:scale-[0.97] transition-all duration-300 cursor-pointer outline-none"
                   >
                     <span className="flex items-center gap-2 transition-transform duration-300 group-hover/btn:translate-x-1">View Project →</span>
                   </Link>
                </div>
             </div>
          </div>

          <AnimatePresence>
            {filteredProjects.map((project) => {
              // Get the first metric for permanent display, if any
              const firstMetric = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

              return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative bg-secondary/5 rounded-3xl overflow-hidden border border-secondary/10 hover:border-primary/50 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] hover:scale-[1.03] hover:-translate-y-2"
              >
                <div className="relative aspect-video overflow-hidden bg-secondary/10 shrink-0">
                  {/* Fallback pattern */}
                  <div className="absolute inset-0 flex items-center justify-center text-secondary font-heading font-bold opacity-20 text-2xl">
                    {project.title}
                  </div>
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 z-10"
                    />
                  )}
                  {/* Hover Overlay with Metrics - Top Gradient */}
                  <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-background/95 via-background/80 to-transparent opacity-0 -translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-20 flex flex-col p-6 pointer-events-none">
                     <h4 className="font-heading font-bold text-lg mb-3 text-primary flex items-center gap-2 drop-shadow-md">
                        <Activity size={16} /> Key Metrics
                     </h4>
                     <ul className="text-sm font-medium text-foreground/90 space-y-2.5">
                        {project.metrics?.slice(0, 3).map((metric, i) => {
                          let icon = "✨";
                          let highlight = "text-primary/90";
                          const lower = metric.toLowerCase();
                          if (lower.includes("time") || lower.includes("lag") || lower.includes("second") || lower.includes("fps")) { icon = "⏱️"; highlight = "text-amber-400"; }
                          else if (lower.includes("performance") || lower.includes("optimiz") || lower.includes("efficienc")) { icon = "⚡"; highlight = "text-yellow-400"; }
                          else if (lower.includes("user") || lower.includes("vehicle") || lower.includes("traffic")) { icon = "👥"; highlight = "text-blue-400"; }
                          else if (lower.includes("reduce") || lower.includes("drop") || lower.includes("overhead")) { icon = "📉"; highlight = "text-emerald-400"; }
                          else if (lower.includes("score") || lower.includes("increas")) { icon = "📈"; highlight = "text-emerald-500"; }
                          else if (lower.includes("crash") || lower.includes("secur")) { icon = "🛡️"; highlight = "text-indigo-400"; }

                          return (
                            <li key={i} className="flex items-start gap-2 drop-shadow-md bg-background/20 px-3 py-2 rounded-lg backdrop-blur-sm border border-secondary/10">
                              <span className="shrink-0 mt-0.5 text-base">{icon}</span>
                              <span className="leading-snug">
                                {metric.split(/([0-9]+%|[0-9]+k?\+|[0-9,\.]+)/i).map((part, idx) => 
                                  part.match(/([0-9]+%|[0-9]+k?\+|[0-9,\.]+)/i) ? 
                                  <span key={idx} className={`font-bold ${highlight}`}>{part}</span> : part
                                )}
                              </span>
                            </li>
                          );
                        })}
                     </ul>
                  </div>
                  
                  {/* Floating Action Links (Bottom Right of Image) */}
                  <div className="absolute bottom-4 right-4 z-30 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out translate-y-4 group-hover:translate-y-0 delay-75">
                     {project.liveUrl && (
                       <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-primary rounded-full text-primary-foreground hover:scale-110 transition-transform shadow-lg border border-primary/50" aria-label="Live Demo">
                         <ExternalLink size={18} />
                       </a>
                     )}
                     {project.githubUrl && (
                       <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-background/90 backdrop-blur rounded-full text-foreground hover:scale-110 transition-transform shadow-lg border border-secondary/20" aria-label="Source Code">
                         <Github size={18} />
                       </a>
                     )}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-secondary/5">
                  {/* 1. Project Tag */}
                  <div className="mb-4 flex flex-wrap gap-2">
                     <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 tracking-wide uppercase">
                        {project.categories.join(" • ")}
                     </span>
                  </div>
                  
                  {/* 2. Project Title */}
                  <h3 className="text-2xl font-heading font-black mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/projects/${project.id}`}>
                      {project.title}
                    </Link>
                  </h3>
                  
                  {/* 3. ONE-LINE IMPACT STATEMENT */}
                  <p className="text-base font-bold text-foreground/95 leading-snug mb-5">
                    {project.impactStatement}
                  </p>
                  
                  {/* 4. Key Metric Highlight */}
                  {firstMetric && (
                     <div className="flex items-start gap-2 mb-5 bg-background shadow-sm border border-secondary/20 px-3 py-2 rounded-lg w-fit">
                       <span className="shrink-0 mt-[1px] text-xs">⚡</span>
                       <span className="text-xs font-bold text-primary leading-snug">{firstMetric}</span>
                     </div>
                  )}

                  {/* 5. Short Description */}
                  <p className="text-foreground/70 mb-6 text-sm flex-grow font-medium leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>
                  
                  {/* 6. Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {(() => {
                      const priorityTags = ["Django", "React", "Python", "Firebase", "Next.js", "TypeScript", "Kotlin"];
                      const sortedTags = [...project.techStack].sort((a, b) => {
                        const aIdx = priorityTags.findIndex(p => a.toLowerCase().includes(p.toLowerCase()));
                        const bIdx = priorityTags.findIndex(p => b.toLowerCase().includes(p.toLowerCase()));
                        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
                        if (aIdx !== -1) return -1;
                        if (bIdx !== -1) return 1;
                        return 0;
                      });

                      return sortedTags.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 bg-secondary/5 border border-secondary/10 rounded px-2.5 py-1 transition-all group-hover:text-primary group-hover:border-primary/20">
                          {tech}
                        </span>
                      ));
                    })()}
                    {project.techStack.length > 4 && (
                       <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/30 bg-transparent px-2 py-1">
                          +{project.techStack.length - 4}
                       </span>
                    )}
                  </div>

                  {/* 7. CTA Button */}
                  <div className="mt-auto pt-4 relative z-10">
                    <Link 
                      href={`/projects/${project.id}`} 
                      className="flex items-center justify-center w-full py-4 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/30 hover:border-transparent rounded-xl font-bold group/btn shadow-sm hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer outline-none px-6"
                    >
                      <span className="flex items-center gap-2 transition-transform duration-300 group-hover/btn:translate-x-1 font-bold">View Project →</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
