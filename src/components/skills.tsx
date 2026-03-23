"use client";

import { motion } from "framer-motion";

const topSkills = [
  "Building scalable full-stack applications",
  "Designing performant frontend architectures",
  "Developing real-time, data-driven systems",
  "Backend API design and optimization",
  "System design fundamentals"
];

const skillsData = [
  {
    category: "Languages",
    description: "Core programming languages used for problem-solving, backend development, and data processing.",
    items: [
      { name: "C++", usage: "Procedural & high-performance logic" },
      { name: "Java", usage: "Object-oriented backend systems" },
      { name: "Python", usage: "Data science & backend development" },
      { name: "Kotlin", usage: "Modern Android app development" },
      { name: "SQL", usage: "Database querying and management" },
      { name: "JavaScript", usage: "Interactive web logic" }
    ],
  },
  {
    category: "Frontend",
    description: "Building responsive and interactive user interfaces using modern web technologies.",
    items: [
      { name: "HTML", usage: "Semantic web structure" },
      { name: "CSS", usage: "Modern layout and styling" },
      { name: "JavaScript", usage: "DOM manipulation and events" },
      { name: "React", usage: "Component-based web architecture" }
    ],
  },
  {
    category: "Backend",
    description: "Developing backend systems, APIs, and application logic for scalable web applications.",
    items: [
      { name: "Django", usage: "Rapid Python-driven web services" },
      { name: "REST APIs", usage: "Seamless system communication" },
      { name: "Firebase", usage: "Real-time sync and auth services" }
    ],
  },
  {
    category: "Data & Analytics",
    description: "Working with data processing, visualization, and machine learning tools for insights and predictions.",
    items: [
      { name: "Pandas", usage: "High-performance data manipulation" },
      { name: "scikit-learn", usage: "Machine learning algorithms" },
      { name: "Power BI", usage: "Business intelligence dashboards" },
      { name: "Excel", usage: "Complex data modeling & formulas" },
      { name: "ETL", usage: "Data extraction & transformation" },
      { name: "Informatica IDQ", usage: "Enterprise data quality" },
      { name: "MySQL Workbench", usage: "Visual database design" }
    ],
  },
  {
    category: "Mobile Development",
    description: "Building Android applications with modern architecture and cloud integrations.",
    items: [
      { name: "Kotlin", usage: "Primary Android language" },
      { name: "Android Studio", usage: "Professional Android IDE" },
      { name: "Firebase", usage: "Cloud storage and messaging" },
      { name: "Cloudinary", usage: "Media asset management" }
    ],
  },
  {
    category: "Tools & Development",
    description: "Tools and technologies used for development, collaboration, and design.",
    items: [
      { name: "Git", usage: "Version tracking & history" },
      { name: "GitHub", usage: "Collaborative code hosting" },
      { name: "Figma", usage: "UI/UX interface design" },
      { name: "Canva", usage: "Visual branding and assets" }
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-background border-t border-secondary/10">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-4">
            Technical Arsenal
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto mb-10 text-lg">
            A comprehensive list of the technologies and tools I use to build robust, scalable systems and intuitive interfaces.
          </p>
          
          <div className="flex flex-col items-center justify-center p-6 bg-primary/5 border border-primary/20 rounded-3xl max-w-3xl mx-auto shadow-lg shadow-primary/5">
             <h3 className="text-xl font-heading font-bold mb-4 text-primary">Core Engineering Strengths</h3>
             <div className="flex flex-wrap justify-center gap-3">
                {topSkills.map((skill) => (
                  <span key={skill} className="px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-medium text-sm md:text-base shadow-[0_0_10px_rgba(37,99,235,0.15)] text-center">
                    {skill}
                  </span>
                ))}
             </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/30 transition-colors group flex flex-col h-full shadow-sm"
            >
              <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                {skillGroup.category}
              </h3>
              <p className="text-foreground/60 text-sm mb-6 flex-grow">
                 {skillGroup.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {skillGroup.items.map((item) => (
                  <div
                    key={item.name}
                    className="group/tooltip relative px-4 py-1.5 text-sm rounded-full bg-background border border-secondary/20 font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {item.name}
                    
                    {/* Tooltip Hover Interaction */}
                    <span className="absolute -top-full left-1/2 -translate-x-1/2 -translate-y-1 w-max px-3 py-1.5 bg-foreground text-background font-semibold text-xs rounded-lg opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all pointer-events-none shadow-lg z-20">
                      {item.usage}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground w-0 h-0" />
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
