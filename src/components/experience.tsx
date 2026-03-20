"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap, ArrowRight } from "lucide-react";

type TimelineItem = {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string[];
  type: "work" | "education";
  tech?: string[];
};

const timelineData: TimelineItem[] = [
  {
    id: "exp-1",
    title: "Full Stack Developer Intern",
    company: "Tech Solutions Inc.",
    date: "June 2025 - Present",
    description: [
      "Built scalable scalable backend services capable of handling thousands of concurrent requests, improving overall system performance by 30%.",
      "Optimized frontend React applications, raising Lighthouse scores from 65 to 95 through SSR and dynamic imports.",
      "Collaborated in cross-functional agile teams to deploy high-impact features using CI/CD pipelines to AWS."
    ],
    tech: ["React", "Node.js", "AWS", "Docker"],
    type: "work",
  },
  {
    id: "exp-2",
    title: "Freelance Systems Engineer",
    company: "Self-Employed",
    date: "Jan 2024 - May 2025",
    description: [
      "Engineered performant Next.js e-commerce platforms and portfolios leading to a 40% increase in client conversions.",
      "Integrated secure payment gateways (Stripe) and unified state management logic, drastically reducing transaction drop-off rates.",
    ],
    tech: ["Next.js", "TypeScript", "Redux", "Stripe"],
    type: "work",
  },
  {
    id: "edu-1",
    title: "B.Tech in Computer Science",
    company: "University of Technology",
    date: "2022 - 2026",
    description: [
      "Specialized in Artificial Intelligence algorithms and scalable web engineering paradigms.",
      "Won 1st place in Smart City Solutions 2024 Hackathon out of 150+ competing teams for engineering a real-time traffic prediction system.",
    ],
    type: "education",
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-background border-t border-secondary/10 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tighter mb-4">
            Professional Trajectory
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            A chronological timeline of my engineering roles, quantified achievements, and major academic milestones.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary/20 to-transparent transform md:-translate-x-1/2" />

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-12 h-12 rounded-full bg-background border-[3px] border-primary transform -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  {item.type === "work" ? (
                    <Briefcase size={20} className="text-primary" />
                  ) : (
                    <GraduationCap size={20} className="text-primary" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <div className="p-8 bg-secondary/5 border border-secondary/10 rounded-3xl hover:border-primary/50 transition-colors shadow-sm group hover:shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                    <span className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      <Calendar size={14} /> {item.date}
                    </span>
                    <h3 className="text-2xl font-heading font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <h4 className="text-foreground/80 font-semibold mb-6 text-lg">{item.company}</h4>
                    
                    <ul className={`text-foreground/70 text-sm space-y-3 mb-6 ${isEven ? "md:ml-auto" : ""} max-w-sm`}>
                      {item.description.map((desc, i) => (
                        <li key={i} className={`flex items-start ${isEven ? "md:justify-end" : "justify-start"}`}>
                          <ArrowRight size={14} className={`mt-1 text-primary shrink-0 ${isEven ? "md:ml-3 md:order-last" : "mr-3"}`} />
                          <span className={isEven ? "md:text-right" : "text-left leading-relaxed font-medium"}>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {item.tech && (
                       <div className={`flex flex-wrap gap-2 mt-auto ${isEven ? "md:justify-end" : "justify-start"}`}>
                          {item.tech.map((t) => (
                             <span key={t} className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-background border border-secondary/20 rounded-md text-foreground/60">{t}</span>
                          ))}
                       </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
