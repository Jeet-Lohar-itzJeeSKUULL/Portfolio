import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, ShieldCheck, Activity, Zap, Server, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  CSS: "bg-purple-500",
  Vue: "bg-emerald-500",
  HTML: "bg-orange-500",
  Python: "bg-blue-400",
  Kotlin: "bg-purple-400",
  Java: "bg-red-500",
  Swift: "bg-orange-500",
  Rust: "bg-red-400",
  Go: "bg-cyan-500"
};

async function getGithubLanguages(githubUrl: string) {
  if (!githubUrl || !githubUrl.includes("github.com")) return null;

  try {
    const url = new URL(githubUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const owner = parts[0];
    const repo = parts[1];

    if (!owner || !repo) return null;

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
      next: { revalidate: 86400 } // cache 24h
    });

    if (!res.ok) return null;
    const data = await res.json();

    // total = sum(all bytes)
    const total = Object.values(data).reduce((acc: number, curr: unknown) => acc + (curr as number), 0) as number;
    if (total === 0) return null;

    // Convert to percentage
    const languages: Record<string, number> = {};
    for (const [lang, bytes] of Object.entries(data)) {
      languages[lang] = Number(((bytes as number / total) * 100).toFixed(1));
    }

    return Object.keys(languages).length > 0 ? languages : null;
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) return notFound();

  const languages = await getGithubLanguages(project.githubUrl);

  return (
    <main className="min-h-screen bg-background pt-24 pb-32">
      {/* Project Hero / Case Study Header */}
      <section className="container mx-auto px-6 md:px-10 lg:px-16 max-w-[1400px] w-[95vw] py-16 lg:py-20 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 border border-secondary/20 font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 mb-12 shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Showcase
        </Link>

        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-md border border-primary/20">
              {project.categories.join(" • ")}
            </span>
            <span className="text-sm font-medium text-foreground/50 tracking-wider">CASE STUDY</span>
          </div>

          {["event-manager-app", "fleetpulse"].includes(project.id) && (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold text-[15px] w-fit mt-2 shadow-inner">
              <span className="text-lg">🚧</span> Currently under active development — core architecture and real-time systems are being implemented.
            </div>
          )}

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60 max-w-5xl">
            {project.title}
          </h1>
          <p className="text-2xl lg:text-3xl text-foreground/70 font-medium max-w-[800px] leading-snug mt-4">
            {project.solutionSummary || project.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] shadow-sm"
              >
                <ExternalLink size={20} /> View Live Application
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-background border-2 border-secondary/20 hover:border-foreground/40 text-foreground font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Github size={20} /> System Source
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Feature Image Frame */}
      <div className="container mx-auto px-6 md:px-10 lg:px-16 max-w-[1400px] w-[95vw] mb-32 relative z-10">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-secondary/5 border border-secondary/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 mix-blend-overlay z-10 pointer-events-none" />
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} Interface`}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 to-secondary/5">
              <span className="text-secondary/40 text-4xl font-heading font-black">{project.title}</span>
            </div>
          )}
        </div>
      </div>

      <section className="container mx-auto px-6 md:px-10 lg:px-16 max-w-[1400px] w-[95vw]">

        {/* Modern Dashboard Overview: Stack & Languages */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 lg:mb-24">

            {/* Extended Stack Map */}
            <div className="p-8 lg:p-10 rounded-[2rem] bg-secondary/5 border border-secondary/10 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <h3 className="text-sm font-heading font-black uppercase tracking-widest mb-8 flex items-center gap-3 drop-shadow-sm relative z-10 text-foreground/50">
                <Server className="text-primary" size={20} /> Stack & Core Systems
              </h3>

              <div className="flex flex-wrap gap-3 relative z-10 mb-8">
                {project.techStack.map((tech) => (
                  <div key={tech} className="px-5 py-2.5 bg-background shadow-inner rounded-full font-bold text-[13px] border border-secondary/20 hover:border-primary/50 hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(var(--primary),0.15)] hover:scale-105 transition-all w-fit cursor-default text-foreground/80 hover:text-foreground">
                    {tech}
                  </div>
                ))}
              </div>

              {project.features && project.features.length > 0 && (
                <div className="relative z-10">
                  <div className="w-full h-px bg-gradient-to-r from-secondary/20 to-transparent mb-6" />
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-[14px] font-semibold text-foreground/70 flex gap-2">
                        <span className="text-primary/50 mt-1 flex-shrink-0">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Extended Languages Drop */}
            <div className="p-8 lg:p-10 rounded-[2rem] bg-secondary/5 border border-secondary/10 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <h3 className="text-sm font-heading font-black uppercase tracking-widest mb-10 flex items-center gap-3 drop-shadow-sm relative z-10 text-foreground/50">
                <Github className="text-primary" size={20} /> Language Distribution
              </h3>

              <div className="relative z-10 flex-grow flex flex-col justify-center">
                {languages && Object.keys(languages).length > 0 ? (
                  <div className="space-y-10">
                    {/* Full-width Bar */}
                    <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner border border-secondary/10 bg-background relative mt-2 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.1)] transition-shadow duration-500">
                      {Object.entries(languages).map(([lang, pct]) => (
                        <div
                          key={lang}
                          style={{ width: `${pct}%` }}
                          className={`h-full ${LANG_COLORS[lang] || "bg-secondary"} hover:brightness-110 transition-all cursor-pointer`}
                          title={`${lang} ${pct}%`}
                        />
                      ))}
                    </div>

                    {/* Horizontal Legend */}
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
                      {Object.entries(languages).map(([lang, pct], idx) => (
                        <div key={lang} className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-[13px] font-bold text-foreground/60 uppercase tracking-widest">
                            <span className={`w-3 h-3 rounded-full shadow-sm ${LANG_COLORS[lang] || "bg-secondary"}`} />
                            {lang}
                          </div>
                          <span className={`text-4xl font-heading font-black tracking-tight ${idx === 0 ? "text-primary drop-shadow-[0_0_12px_rgba(var(--primary),0.3)]" : "text-foreground/80"}`}>
                            {pct}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center mb-6 shadow-inner group-hover:border-primary/20 transition-colors">
                      <span className="text-4xl">⚙️</span>
                    </div>
                    <h4 className="text-xl font-heading font-black tracking-tight text-foreground/80 mb-2">Under Development</h4>
                    <p className="text-foreground/40 text-sm max-w-[280px] leading-relaxed">
                      Repository data is not yet available or project is currently in progress.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </ScrollReveal>

        <div className="flex flex-col mx-auto max-w-[1000px] w-full gap-20 md:gap-24">

          {/* Custom FAANG-level Section for Event Manager App */}
          {project.id === "event-manager-app" && (
            <div className="flex flex-col gap-20 md:gap-24 w-full max-w-5xl">
              {/* SECTION 1: Problem & Context */}
              <ScrollReveal>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  {/* Left Gradient Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />

                  {/* Ambient Background Blur */}
                  <div className="absolute -left-[100px] top-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-10">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-primary">⚡</span> Problem & Context
                      </h2>
                    </div>

                    <div className="space-y-4 max-w-[750px]">
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                        Modern event platforms often fail to deliver real-time coordination between users and organizers, resulting in inconsistent data, delayed updates, and poor user experience.
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 max-w-[750px]">
                      <h3 className="text-2xl font-bold text-foreground mb-4 drop-shadow-sm">Key challenges observed:</h3>
                      <ul className="list-none space-y-3 ml-2 text-foreground/60 font-medium">
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Ticket availability inconsistencies during high demand</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Lack of real-time updates across devices</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Fragmented user and organizer workflows</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Limited scalability during peak traffic events</li>
                      </ul>
                    </div>

                    <div className="p-8 lg:p-10 bg-background/50 rounded-2xl border border-secondary/10 backdrop-blur-md mt-10 shadow-sm relative overflow-hidden transition-colors duration-500 hover:bg-background/80 hover:border-primary/20 hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <h3 className="text-xl font-bold text-foreground/90 mb-6 flex items-center gap-2 drop-shadow-sm relative z-10">
                        <span>🎯</span> Objective
                      </h3>
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg relative z-10">
                        This project aims to design a unified system that enables real-time synchronization, scalable event handling, and seamless user interaction.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* SECTION 2: Core System Capabilities */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  {/* Left Gradient Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-accent via-accent/40 to-transparent" />

                  {/* Ambient Background Blur */}
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-10">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-accent">⚙️</span> Core System Capabilities
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Real-time event discovery with dynamic filtering and recommendations
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Scalable ticket booking system with concurrency handling
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Organizer dashboard with event analytics and management tools
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Live ticket availability updates across all connected clients
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Notification system (reminders, updates, alerts)
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Mobile-first experience with cross-platform synchronization
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Architectural Approach */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-blue-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-blue-500">🏗️</span> Architectural Approach
                      </h2>
                    </div>

                    <div className="space-y-6 max-w-[850px]">
                      <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                        Architecting a scalable, event-driven system designed for real-time performance:
                      </p>

                      <ul className="list-none space-y-4 ml-0 text-foreground/70 font-medium text-lg lg:text-xl mt-6 p-6 lg:p-8 rounded-2xl bg-secondary/5 border border-secondary/10 relative overflow-hidden transition-all duration-500 hover:border-accent/40 hover:bg-accent/5 hover:shadow-[0_0_30px_rgba(var(--accent),0.1)] hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span>
                          <span>Unified backend powering both Web and Mobile clients</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span>
                          <span>API-first architecture for modular scalability</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span>
                          <span>Real-time data flow using WebSockets / Firebase streams</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span>
                          <span>Event-driven system for notifications, updates, and triggers</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span>
                          <span>Role-based access control (Users, Organizers, Admins)</span>
                        </li>
                      </ul>

                      <div className="pt-4 max-w-[750px]">
                        <p className="text-foreground/80 leading-[1.8] font-medium text-lg border-l-2 border-accent/40 pl-5 py-2 italic drop-shadow-sm">
                          Designed to handle high concurrency scenarios such as ticket releases, live updates, and simultaneous user interactions without performance degradation.
                        </p>
                      </div>
                    </div>

                    {/* Architectural Diagrams */}
                    <div className="mt-12 w-full relative z-10">
                      <h3 className="text-xl font-bold text-foreground/90 mb-6 drop-shadow-sm">System designed around real-time data propagation:</h3>

                      {/* Specialized App Flow Map */}
                      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-10 px-4 md:px-6 bg-secondary/5 border border-secondary/10 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.2)] transition-colors hover:border-accent/40 group overflow-x-auto relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="px-4 py-3 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 group-hover:border-accent/30 transition-colors z-10">User Action</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />

                        <div className="px-4 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">API Layer</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />

                        <div className="px-4 py-3 bg-accent/10 text-accent border border-accent/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">Event Processing</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />

                        <div className="px-4 py-3 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 group-hover:border-accent/30 transition-colors z-10">Database Update</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />

                        <div className="px-4 py-3 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">Real-Time Broadcast</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />

                        <div className="px-4 py-3 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 group-hover:border-accent/30 transition-colors z-10">UI Sync</div>
                      </div>

                      {/* Impact Result Panel */}
                      <div className="mt-8 space-y-5 max-w-[750px] p-6 lg:p-8 bg-background/60 rounded-2xl border border-secondary/10 backdrop-blur-md shadow-sm transition-all hover:bg-background/80 hover:border-accent/20">
                        <h4 className="text-lg font-bold text-foreground/90 flex items-center gap-2 drop-shadow-sm">
                          This ensures:
                        </h4>
                        <ul className="list-none space-y-3 ml-1 text-foreground/70 font-medium text-[16px] md:text-lg">
                          <li className="flex items-center gap-3"><span className="text-accent drop-shadow-sm scale-150">•</span> Instant reflection of ticket availability</li>
                          <li className="flex items-center gap-3"><span className="text-accent drop-shadow-sm scale-150">•</span> Consistent state across multiple devices</li>
                          <li className="flex items-center gap-3"><span className="text-accent drop-shadow-sm scale-150">•</span> Reduced latency in user interactions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* SECTION: Engineering Challenges */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-red-500/80 via-red-500/30 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-red-500 drop-shadow-sm">⚠️</span> Engineering Challenges
                    </h3>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[950px] relative z-10 w-full mt-8">
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">01</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Managing concurrent ticket bookings without data conflicts</span>
                    </li>
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">02</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Ensuring real-time consistency across distributed clients</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* SECTION: Current Development Status */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-yellow-500 via-yellow-500/40 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-yellow-500 drop-shadow-sm">🚧</span> Current Development Status
                    </h3>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 max-w-[1000px] mt-8 relative z-10">
                    <div className="flex-1 p-8 rounded-3xl bg-secondary/5 border border-secondary/10">
                      <h4 className="text-xl font-bold mb-4">Completed</h4>
                      <ul className="space-y-3 text-foreground/70">
                        <li>• System architecture designed</li>
                        <li>• Database schema defined</li>
                      </ul>
                    </div>
                    <div className="flex-1 p-8 rounded-3xl bg-yellow-500/5 border border-yellow-500/20">
                      <h4 className="text-xl font-bold mb-4">In Progress</h4>
                      <ul className="space-y-3 text-foreground/70">
                        <li>• Backend API integration</li>
                        <li>• Real-time synchronization layer</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Custom FAANG-level Section for FleetPulse (Live Map) */}
          {project.id === "fleetpulse" && (
            <div className="flex flex-col gap-20 md:gap-24 w-full max-w-5xl">
              {/* SECTION 1: Problem & Context */}
              <ScrollReveal>
                <div className="relative pl-6 md:pl-10 py-4 mb-8 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />
                  <div className="absolute -left-[100px] top-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                  
                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-primary">⚡</span> Problem & Context
                      </h2>
                    </div>

                    <div className="space-y-6 max-w-[750px]">
                      <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                        Modern fleet management systems require real-time visibility of vehicles, efficient route tracking, and optimized resource utilization.
                      </p>
                      
                      <div className="space-y-4 pt-4">
                        <h3 className="text-2xl font-bold text-foreground mb-4 drop-shadow-sm">Challenges arise due to:</h3>
                        <ul className="list-none space-y-4 ml-0 text-foreground/60 font-medium text-lg">
                          <li className="flex items-center gap-3"><span className="text-primary/70 font-bold">•</span> Handling continuous real-time location updates</li>
                          <li className="flex items-center gap-3"><span className="text-primary/70 font-bold">•</span> Ensuring smooth UI rendering with high-frequency data</li>
                          <li className="flex items-center gap-3"><span className="text-primary/70 font-bold">•</span> Managing battery-efficient background tracking</li>
                          <li className="flex items-center gap-3"><span className="text-primary/70 font-bold">•</span> Scaling for multiple vehicles simultaneously</li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10 bg-background/50 rounded-2xl border border-secondary/10 backdrop-blur-md shadow-sm relative overflow-hidden transition-all duration-500 hover:bg-background/80 hover:border-primary/20 hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <h3 className="text-xl font-bold text-foreground/90 mb-6 flex items-center gap-2 drop-shadow-sm relative z-10">
                        <span>🎯</span> Objective
                      </h3>
                      <p className="text-foreground/70 leading-[1.8] font-medium text-lg relative z-10">
                        Design a system capable of real-time tracking, efficient data handling, and smooth user interaction across devices.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* SECTION 2: Core System Capabilities */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-accent">🚀</span> Core System Capabilities
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[950px] relative z-10 w-full mt-8">
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-1">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Real-time vehicle tracking with live location updates</span>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-1">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Dynamic map rendering with multiple vehicle markers</span>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-1">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Background location tracking with optimized battery usage</span>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-1">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Route visualization and movement tracking</span>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-1 md:col-span-2">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Scalable system for handling multiple vehicles simultaneously</span>
                        </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Architectural Approach */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-blue-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-blue-500">🏗️</span> Architectural Approach
                      </h2>
                    </div>

                    <div className="space-y-6 max-w-[850px]">
                      <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                        Designing a real-time, event-driven mobile system:
                      </p>
                      
                      <ul className="list-none space-y-4 ml-0 text-foreground/70 font-medium text-lg lg:text-xl mt-6 p-6 lg:p-8 rounded-2xl bg-secondary/5 border border-secondary/10 relative overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Location data captured via device sensors</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Data streamed through Firebase / real-time backend</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Event-driven updates pushed to UI layer</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Optimized rendering using map APIs and efficient UI updates</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Modular architecture separating tracking, processing, and UI layers</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-12 w-full relative z-10">
                      <h3 className="text-xl font-bold text-foreground/90 mb-6 drop-shadow-sm">System focus on real-time propagation of location data:</h3>

                      {/* specialized app flow for FleetPulse */}
                      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-10 px-4 md:px-6 bg-secondary/5 border border-secondary/10 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.2)] transition-colors hover:border-accent/40 group overflow-x-auto relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="px-4 py-3 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 group-hover:border-accent/30 transition-colors z-10">Sensor</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">Stream</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-accent/10 text-accent border border-accent/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">Backend</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 group-hover:border-accent/30 transition-colors z-10">Engine</div>
                        <ArrowLeft size={14} className="text-accent/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">Map UI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* SECTION: Engineering Challenges */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-red-500/80 via-red-500/30 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-red-500 drop-shadow-sm">⚠️</span> Engineering Challenges
                    </h3>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[950px] relative z-10 w-full mt-8">
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">01</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Handling high-frequency location updates without UI lag</span>
                    </li>
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">02</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Optimizing battery consumption during continuous tracking</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* Status Banner / Progress for FleetPulse */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-yellow-500 via-yellow-500/40 to-transparent" />
                  <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                    <span className="text-yellow-500 drop-shadow-sm">🚀</span> Development Roadmap
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
                    <div className="p-8 bg-secondary/5 rounded-3xl border border-secondary/10">
                      <h4 className="text-xl font-bold mb-4 drop-shadow-sm text-primary">✅ Current Milestones</h4>
                      <ul className="space-y-3 text-foreground/70 font-medium">
                        <li>• Real-time data pipeline architecture</li>
                        <li>• Background location service optimization</li>
                      </ul>
                    </div>
                    <div className="p-8 bg-accent/5 rounded-3xl border border-accent/20">
                      <h4 className="text-xl font-bold mb-4 drop-shadow-sm text-accent">🔮 Next Phases</h4>
                      <ul className="space-y-3 text-foreground/70 font-medium">
                        <li>• Multi-vehicle simultaneous tracking scaling</li>
                        <li>• Predictive route analysis engine</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Engineering Roadblocks for FleetPulse */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-orange-500 via-orange-500/40 to-transparent" />
                  <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                    <span className="text-orange-500 drop-shadow-sm">🚧</span> Engineering Roadblocks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
                    <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                      <p className="text-foreground/70 font-medium leading-[1.7]">Managing OS-level restrictions on high-frequency background tracking.</p>
                    </div>
                    <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                      <p className="text-foreground/70 font-medium leading-[1.7]">Optimizing map layer updates to maintain 60FPS with 100+ entities.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Performance Considerations for FleetPulse */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-8 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-blue-400 via-blue-400/10 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                  
                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-blue-400 drop-shadow-sm">⚡</span> Performance Considerations
                    </h3>
                  </div>
                  
                  <div className="space-y-6 max-w-[850px] relative z-10">
                    <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                      Designing a real-time tracking system required careful attention to performance and resource efficiency.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-foreground/90 drop-shadow-sm">Key considerations:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all">
                          <span className="text-blue-400 mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium">Minimizing UI re-renders during high-frequency location updates</span>
                        </li>
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all">
                          <span className="text-blue-400 mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium">Optimizing map rendering for multiple active vehicle markers</span>
                        </li>
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all">
                          <span className="text-blue-400 mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium">Reducing unnecessary network calls through event-driven updates</span>
                        </li>
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all">
                          <span className="text-blue-400 mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium">Balancing update intervals with battery efficiency</span>
                        </li>
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-blue-400/30 hover:bg-blue-400/5 transition-all md:col-span-2">
                          <span className="text-blue-400 mt-1 flex-shrink-0 font-bold">•</span>
                          <span className="text-foreground/70 font-medium">Ensuring smooth 60 FPS rendering on mobile devices</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-6 bg-blue-400/5 rounded-2xl border border-blue-400/20 backdrop-blur-sm shadow-sm transition-all hover:bg-blue-400/10 hover:border-blue-400/30">
                      <p className="text-foreground/90 font-bold text-lg">
                        <span className="text-blue-400 mr-2 uppercase tracking-wide text-sm">Focus:</span><br />
                        Maintaining real-time responsiveness without compromising device performance.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Scalability Strategy for FleetPulse */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-8 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-purple-500 via-purple-500/10 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                  
                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-purple-500 drop-shadow-sm">📈</span> Scalability Strategy
                    </h3>
                  </div>
                  
                  <div className="space-y-6 max-w-[850px] relative z-10">
                    <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                      The system is designed with scalability in mind to support increasing numbers of vehicles and users.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-foreground/90 drop-shadow-sm">Approach:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/60 font-medium leading-[1.6]">
                        <li className="flex items-center gap-3"><span className="text-purple-500 drop-shadow-sm font-bold">•</span> Event-driven architecture for efficient data propagation</li>
                        <li className="flex items-center gap-3"><span className="text-purple-500 drop-shadow-sm font-bold">•</span> Modular separation of tracking, processing, and UI layers</li>
                        <li className="flex items-center gap-3"><span className="text-purple-500 drop-shadow-sm font-bold">•</span> Backend designed to handle concurrent real-time streams</li>
                        <li className="flex items-center gap-3"><span className="text-purple-500 drop-shadow-sm font-bold">•</span> Efficient state management to prevent performance bottlenecks</li>
                        <li className="flex items-center gap-3"><span className="text-purple-500 drop-shadow-sm font-bold">•</span> Future-ready support for multi-vehicle tracking at scale</li>
                      </ul>
                    </div>

                    <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 backdrop-blur-sm shadow-sm transition-all hover:bg-purple-500/10 hover:border-purple-500/30">
                      <p className="text-foreground/90 font-bold text-lg">
                        <span className="text-purple-500 mr-2 uppercase tracking-wide text-sm">Goal:</span><br />
                        Ensure the system remains performant as usage grows.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Future Scope & Enhancements for FleetPulse */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-8 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-emerald-500 via-emerald-500/10 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                  
                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-emerald-500 drop-shadow-sm">🔮</span> Future Scope & Enhancements
                    </h3>
                  </div>
                  
                  <div className="space-y-6 max-w-[850px] relative z-10">
                    <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                      The project roadmap includes several advanced features to enhance system intelligence and usability.
                    </p>
                    
                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-foreground/90 drop-shadow-sm">Planned enhancements:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                          <p className="text-foreground/70 font-semibold">• Predictive route optimization using historical data</p>
                        </div>
                        <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                          <p className="text-foreground/70 font-semibold">• AI-based traffic pattern analysis</p>
                        </div>
                        <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                          <p className="text-foreground/70 font-semibold">• Real-time alerts for route deviations and anomalies</p>
                        </div>
                        <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all">
                          <p className="text-foreground/70 font-semibold">• Advanced analytics dashboard for fleet insights</p>
                        </div>
                        <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all md:col-span-2">
                          <p className="text-foreground/70 font-semibold">• Cross-platform support (Web dashboard + Admin panel)</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10 bg-emerald-500/5 rounded-3xl border border-emerald-500/20 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent pointer-events-none" />
                      <p className="text-emerald-500 font-black italic text-xl tracking-tight relative z-10 drop-shadow-sm">
                        <span className="text-sm uppercase tracking-widest block mb-1 not-italic text-emerald-500/60 font-heading">Vision</span>
                        Evolve FleetPulse into a full-scale intelligent fleet management system.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Custom FAANG-level Section for MangaQuiz */}
          {project.id === "mangaquiz" && (
            <div className="flex flex-col gap-20 md:gap-24 w-full max-w-5xl">
              {/* SECTION 1: Problem & Context */}
              <ScrollReveal>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />
                  <div className="absolute -left-[100px] top-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                  
                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-primary">⚡</span> Problem & Context
                      </h2>
                    </div>

                    <div className="space-y-4 max-w-[750px]">
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                        Manga readers lacked interactive platforms that test their knowledge with dynamic visual feedback and instant scoring.
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 max-w-[750px]">
                      <h3 className="text-2xl font-bold text-foreground mb-4 drop-shadow-sm">Key challenges observed:</h3>
                      <ul className="list-none space-y-3 ml-2 text-foreground/60 font-medium">
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Static, non-engaging UI patterns in existing quiz apps</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Frame drops during complex animations and image loads</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Lack of immediate, gamified visual feedback</li>
                      </ul>
                    </div>

                    <div className="p-8 lg:p-10 bg-background/50 rounded-2xl border border-secondary/10 backdrop-blur-md mt-10 shadow-sm relative overflow-hidden transition-colors duration-500 hover:bg-background/80 hover:border-primary/20 hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <h3 className="text-xl font-bold text-foreground/90 mb-6 flex items-center gap-2 drop-shadow-sm relative z-10">
                        <span>🎯</span> Objective
                      </h3>
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg relative z-10">
                        Build an immersive, UI-driven quiz application centered entirely on robust frontend architecture and instantaneous user engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* SECTION 2: Core System Capabilities */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-accent">⚙️</span> Core System Capabilities
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Precision-timed state machine scoring system
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Dynamic question routing and randomization payloads
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> 60fps micro-interactions and visual feedback loops
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Resilient local storage persistence architecture
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Architectural Approach */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 space-y-8 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-blue-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10">
                    <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground drop-shadow-sm">
                      <span className="text-blue-500 mr-2">🏗️</span>Architectural Approach
                    </h2>
                  </div>

                  <div className="relative z-10">
                    <div className="space-y-6 max-w-[850px]">
                      <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                        Engineered a decoupled, lightning-fast frontend layer optimized for interactive feedback loops:
                      </p>
                      
                      <ul className="list-none space-y-4 ml-0 text-foreground/70 font-medium text-lg lg:text-xl mt-6 p-6 lg:p-8 rounded-2xl bg-secondary/5 border border-secondary/10 relative overflow-hidden transition-all duration-500 hover:border-accent/40 hover:bg-accent/5 hover:shadow-[0_0_30px_rgba(var(--accent),0.1)] hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Localized state engine isolated from global rendering cycles via Zustand</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Leveraged predictive caching to pre-flight assets prior to animation triggers</span>
                        </li>
                        <li className="flex items-start gap-4 relative z-10">
                          <span className="text-accent mt-1 flex-shrink-0 font-bold drop-shadow-sm">•</span> 
                          <span>Abstracted UI styling into atomic utilities via Tailwind CSS</span>
                        </li>
                      </ul>

                      <div className="pt-4 max-w-[750px]">
                        <p className="text-foreground/80 leading-[1.8] font-medium text-lg border-l-2 border-accent/40 pl-5 py-2 italic drop-shadow-sm">
                          Designed to deliver flawless 60fps frame rates across highly responsive, fluid user interface paths.
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 max-w-[1000px] relative z-10">
                      <div className="flex flex-wrap items-center justify-center gap-3 py-10 px-5 bg-secondary/5 border border-secondary/10 rounded-2xl w-full shadow-sm mt-6 relative z-10 transition-colors hover:border-secondary/30">
                        <div className="px-4 py-2 bg-background border border-secondary/20 rounded-lg font-mono text-[13px] md:text-sm shrink-0 shadow-sm text-foreground/80">User Interaction</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                        <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono text-[13px] md:text-sm shrink-0 shadow-sm">UI Components Layer</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                        <div className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-lg font-mono text-[13px] md:text-sm shrink-0 shadow-sm">State Management (Zustand)</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                        <div className="px-4 py-2 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-lg font-mono text-[13px] md:text-sm shrink-0 shadow-sm">Quiz Logic Engine</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                        <div className="px-4 py-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-lg font-mono text-[13px] md:text-sm shrink-0 shadow-sm">Feedback & Score System</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                        <div className="px-4 py-2 bg-background border border-secondary/20 rounded-lg font-mono text-[13px] md:text-sm shrink-0 shadow-sm text-foreground/80">UI Re-render</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Edge Cases & Handling */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-yellow-500 via-yellow-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-yellow-500 drop-shadow-sm">🛡️</span> Edge Cases & Handling
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4 relative z-10 w-full mt-4">
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-yellow-500/30 transition-colors items-center shadow-sm">
                        <span className="text-yellow-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Prevented multiple rapid selections causing inconsistent state</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-yellow-500/30 transition-colors items-center shadow-sm">
                        <span className="text-yellow-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Ensured score integrity during fast user interactions</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-yellow-500/30 transition-colors items-center shadow-sm">
                        <span className="text-yellow-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Handled incomplete quiz flows without breaking UI state</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-yellow-500/30 transition-colors items-center shadow-sm">
                        <span className="text-yellow-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Managed state reset cleanly between quiz sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* UX Engineering Decisions */}
              <ScrollReveal delay={0.3}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-purple-500 via-purple-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-purple-500 drop-shadow-sm">✨</span> UX Engineering Decisions
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4 relative z-10 w-full mt-4">
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-purple-500/30 transition-colors items-center shadow-sm">
                        <span className="text-purple-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Designed instant feedback loops to keep users engaged</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-purple-500/30 transition-colors items-center shadow-sm">
                        <span className="text-purple-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Minimized interaction latency to improve responsiveness perception</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-purple-500/30 transition-colors items-center shadow-sm">
                        <span className="text-purple-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Structured question flow to maintain user momentum</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-purple-500/30 transition-colors items-center shadow-sm">
                        <span className="text-purple-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Used subtle animations to enhance clarity without affecting performance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          {/* Custom FAANG-level Section for VentureHub */}
          {project.id === "venturehub" && (
            <div className="flex flex-col gap-12 w-full max-w-5xl">
              {/* SECTION 1: Problem & Context */}
              <ScrollReveal>
                <div className="relative pl-6 md:pl-10 py-4 mb-8">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />
                  <div className="absolute -left-[100px] top-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                  
                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-primary">⚡</span> Problem & Context
                      </h2>
                    </div>

                    <div className="space-y-4 max-w-[750px]">
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                        Early-stage founders often struggle to showcase ideas, find collaborators, and manage initial traction in a structured way.
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 max-w-[750px]">
                      <h3 className="text-2xl font-bold text-foreground mb-4 drop-shadow-sm">Key challenges:</h3>
                      <ul className="list-none space-y-3 ml-2 text-foreground/60 font-medium">
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Lack of centralized platforms for idea collaboration</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Difficulty in connecting with relevant contributors</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Poor visibility of early-stage projects</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Unstructured workflows for managing ventures</li>
                      </ul>
                    </div>

                    <div className="p-8 lg:p-10 bg-background/50 rounded-2xl border border-secondary/10 backdrop-blur-md mt-10 shadow-sm relative overflow-hidden transition-colors duration-500 hover:bg-background/80 hover:border-primary/20 hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <h3 className="text-xl font-bold text-foreground/90 mb-6 flex items-center gap-2 drop-shadow-sm relative z-10">
                        <span>🎯</span> Objective
                      </h3>
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg relative z-10">
                        Design a platform that enables structured collaboration, visibility, and efficient management of startup ideas.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* SECTION 2: Core System Capabilities */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 mb-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-accent via-accent/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-accent">⚙️</span> Core System Capabilities
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[900px]">
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Create and showcase startup ideas
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Discover and connect with collaborators
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Manage venture progress and updates
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Role-based interaction between users
                        </p>
                      </div>
                      <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 shadow-sm md:col-span-2">
                        <p className="text-foreground/70 font-medium text-lg leading-[1.6]">
                          <span className="text-accent font-bold drop-shadow-sm mr-2">•</span> Structured dashboards for tracking activity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* ARCHITECTURAL APPROACH */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 mb-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-blue-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-blue-500">🏗️</span> Architectural Approach
                      </h2>
                    </div>
                    
                    <div className="space-y-6 max-w-[850px]">
                      <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                        Designed as a modular full-stack system:
                      </p>
                      <ul className="list-none space-y-4 text-foreground/70 font-medium text-[16px] md:text-lg">
                        <li className="flex items-start gap-4"><span className="text-blue-500 font-bold">•</span> <span className="flex-1 leading-[1.6]">Frontend built using Next.js for scalability and performance</span></li>
                        <li className="flex items-start gap-4"><span className="text-blue-500 font-bold">•</span> <span className="flex-1 leading-[1.6]">Backend powered by Firebase services for rapid development</span></li>
                        <li className="flex items-start gap-4"><span className="text-blue-500 font-bold">•</span> <span className="flex-1 leading-[1.6]">API-driven communication for structured data handling</span></li>
                        <li className="flex items-start gap-4"><span className="text-blue-500 font-bold">•</span> <span className="flex-1 leading-[1.6]">Role-based access system for controlled interactions</span></li>
                      </ul>
                      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20 mt-8 mb-6 inline-block shadow-sm transition-all hover:border-blue-500/40 hover:shadow-md">
                        <p className="text-foreground/90 font-bold text-lg">
                          <span className="text-blue-500 mr-2 uppercase tracking-wide text-sm">Target:</span><br />
                          Focused on building a scalable and extensible platform.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* USER WORKFLOW */}
              <ScrollReveal delay={0.3}>
                <div className="relative pl-6 md:pl-10 py-4 mb-4">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-indigo-500 via-indigo-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-indigo-500 drop-shadow-sm">🔄</span> User Workflow
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-foreground/90 drop-shadow-sm">User Journey:</h3>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 py-8 px-6 bg-secondary/5 border border-secondary/10 rounded-2xl max-w-[950px] shadow-sm transition-colors hover:border-indigo-500/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
                        <div className="px-4 py-2 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 relative z-10">User Signup</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0 relative z-10" />
                        <div className="px-4 py-2 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm relative z-10">Profile Creation</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0 relative z-10" />
                        <div className="px-4 py-2 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 relative z-10">Idea Posting</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0 relative z-10" />
                        <div className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm relative z-10">Discovery Feed</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0 relative z-10" />
                        <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm relative z-10">Collaboration Request</div>
                        <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0 relative z-10" />
                        <div className="px-4 py-2 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 relative z-10">Venture Management</div>
                      </div>
                    </div>

                    <div className="p-8 lg:p-10 bg-background/50 rounded-2xl border border-secondary/10 backdrop-blur-md shadow-sm relative overflow-hidden transition-all duration-500 hover:bg-background/80 hover:border-indigo-500/20 max-w-[850px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                      <h3 className="text-xl font-bold text-foreground/90 mb-5 relative z-10">System Behavior:</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground/60 font-medium relative z-10">
                        <li className="flex items-start gap-3"><span className="text-indigo-500">•</span> Dynamic content updates based on user actions</li>
                        <li className="flex items-start gap-3"><span className="text-indigo-500">•</span> Structured interaction flows between users</li>
                        <li className="flex items-start gap-3"><span className="text-indigo-500">•</span> Real-time reflection of collaboration activities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* ENGINEERING CHALLENGES */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 relative pl-6 md:pl-10 py-4 mb-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-red-500/80 via-red-500/30 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-red-500 drop-shadow-sm">⚠️</span> Engineering Challenges
                    </h3>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[950px] relative z-10 w-full mt-8">
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">01</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Designing scalable data models for users and ventures</span>
                    </li>
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">02</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Managing role-based access and permissions</span>
                    </li>
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">03</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Structuring flexible collaboration workflows</span>
                    </li>
                    <li className="flex items-start gap-5 p-8 rounded-3xl bg-secondary/5 border border-secondary/10 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:-translate-y-1 hover:shadow-lg">
                      <span className="text-red-500/80 mt-1 text-2xl font-heading font-black drop-shadow-sm border-b-2 border-red-500/30 pb-1">04</span>
                      <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Handling dynamic content updates efficiently</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* DESIGN DECISIONS & TRADE-OFFS */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-6 relative pl-6 md:pl-10 py-4 mb-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-purple-500/80 via-purple-500/30 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <span className="text-purple-500 drop-shadow-sm">⚖️</span> Design Decisions & Trade-offs
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5 max-w-[850px] relative z-10 w-full mt-8">
                    <div className="flex gap-4 p-6 bg-background border border-secondary/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 hover:shadow-md transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500/50 group-hover:bg-purple-500 transition-colors" />
                      <span className="text-foreground/70 font-medium text-[16px] md:text-lg leading-[1.7] ml-2">
                        <strong className="text-foreground/90 font-bold block mb-1">Used Firebase for faster backend setup</strong>
                        Chosen over custom backend complexity to rapidly prototype and iterate on core features.
                      </span>
                    </div>
                    <div className="flex gap-4 p-6 bg-background border border-secondary/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 hover:shadow-md transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500/50 group-hover:bg-purple-500 transition-colors" />
                      <span className="text-foreground/70 font-medium text-[16px] md:text-lg leading-[1.7] ml-2">
                        <strong className="text-foreground/90 font-bold block mb-1">Prioritized modular architecture for future scalability</strong>
                        Ensures that as the venture logic grows, micro-services can be safely extracted.
                      </span>
                    </div>
                    <div className="flex gap-4 p-6 bg-background border border-secondary/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 hover:shadow-md transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500/50 group-hover:bg-purple-500 transition-colors" />
                      <span className="text-foreground/70 font-medium text-[16px] md:text-lg leading-[1.7] ml-2">
                        <strong className="text-foreground/90 font-bold block mb-1">Focused on core collaboration features</strong>
                        Explicitly avoided feature overload to prioritize quality interaction and discovery mechanics.
                      </span>
                    </div>
                    <div className="flex gap-4 p-6 bg-background border border-secondary/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 hover:shadow-md transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-500/50 group-hover:bg-purple-500 transition-colors" />
                      <span className="text-foreground/70 font-medium text-[16px] md:text-lg leading-[1.7] ml-2">
                        <strong className="text-foreground/90 font-bold block mb-1">Balanced simplicity with extensibility in system design</strong>
                        Retained dynamic NoSQL structures to adapt to unknown future venture attributes without breaking the schema.
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* FUTURE SCALABILITY */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 mb-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-teal-500 via-teal-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-teal-500 drop-shadow-sm">🚀</span> Future Scalability
                      </h2>
                    </div>

                    <div className="p-8 lg:p-10 bg-teal-500/5 rounded-3xl border border-teal-500/20 backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:border-teal-500/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] max-w-[850px]">
                      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent pointer-events-none" />
                      <ul className="space-y-5 text-foreground/80 font-medium text-[16px] md:text-lg relative z-10 mb-2">
                        <li className="flex items-start gap-4">
                          <span className="text-teal-500 font-bold text-xl leading-none mt-1 shadow-sm">•</span>
                          <span className="leading-[1.6]">Integration of real-time collaboration features</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <span className="text-teal-500 font-bold text-xl leading-none mt-1 shadow-sm">•</span>
                          <span className="leading-[1.6]">Advanced recommendation system for matching collaborators</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <span className="text-teal-500 font-bold text-xl leading-none mt-1 shadow-sm">•</span>
                          <span className="leading-[1.6]">Scalable backend services using microservice architecture</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <span className="text-teal-500 font-bold text-xl leading-none mt-1 shadow-sm">•</span>
                          <span className="leading-[1.6]">Caching and performance optimization layers</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <span className="text-teal-500 font-bold text-xl leading-none mt-1 shadow-sm">•</span>
                          <span className="leading-[1.6]">Expansion into mobile platform</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* VERIFIED IMPACT METRICS */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 mb-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-emerald-500 via-emerald-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-emerald-500 drop-shadow-sm">📈</span> Verified Impact Metrics
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4 relative z-10 w-full mt-4 max-w-[850px]">
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 transition-colors items-center shadow-sm">
                        <span className="text-emerald-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Improved idea discovery efficiency through structured feed design</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 transition-colors items-center shadow-sm">
                        <span className="text-emerald-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Reduced friction in collaboration requests with streamlined workflows</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 transition-colors items-center shadow-sm">
                        <span className="text-emerald-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Achieved fast page load and interaction response using optimized frontend</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-emerald-500/30 transition-colors items-center shadow-sm">
                        <span className="text-emerald-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Enabled smooth user interactions across multiple workflows without UI lag</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* PERFORMANCE HIGHLIGHTS */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 mb-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-cyan-500 via-cyan-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-cyan-500 drop-shadow-sm">⚡</span> Performance Highlights
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4 relative z-10 w-full mt-4 max-w-[850px]">
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-cyan-500/30 transition-colors items-center shadow-sm">
                        <span className="text-cyan-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Optimized component rendering for dynamic content updates</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-cyan-500/30 transition-colors items-center shadow-sm">
                        <span className="text-cyan-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Efficient data fetching and state handling using Firebase services</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-cyan-500/30 transition-colors items-center shadow-sm">
                        <span className="text-cyan-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Lightweight UI structure ensuring fast navigation and responsiveness</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-cyan-500/30 transition-colors items-center shadow-sm">
                        <span className="text-cyan-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Minimized unnecessary re-renders through component-level optimizations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* ENGINEERING RETROSPECTIVE */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 mb-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-orange-500 via-orange-500/40 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-orange-500 drop-shadow-sm">🧠</span> Engineering Retrospective
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4 relative z-10 w-full mt-4 max-w-[850px]">
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-orange-500/30 transition-colors items-center shadow-sm">
                        <span className="text-orange-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Structuring user workflows is as important as backend logic</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-orange-500/30 transition-colors items-center shadow-sm">
                        <span className="text-orange-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Early decisions on data models significantly impact scalability</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-orange-500/30 transition-colors items-center shadow-sm">
                        <span className="text-orange-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Simplicity in UI design improves usability and maintainability</span>
                      </div>
                      <div className="flex gap-4 p-5 md:p-6 bg-secondary/5 rounded-2xl border border-secondary/10 hover:border-orange-500/30 transition-colors items-center shadow-sm">
                        <span className="text-orange-500/80 font-bold scale-125">•</span>
                        <span className="text-foreground/70 font-medium text-lg leading-[1.6]">Modular architecture enables easier feature expansion in product-based systems</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* WHY THIS PROJECT STANDS OUT */}
              <ScrollReveal delay={0.2}>
                <div className="mb-20 max-w-[1000px]">
                  <div className="p-8 lg:p-10 bg-accent/5 rounded-3xl border border-accent/20 backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(var(--accent),0.15)] hover:-translate-y-1">
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none" />
                    <h3 className="text-2xl font-bold text-accent mb-5 flex items-center gap-3 relative z-10 drop-shadow-sm">
                      <span className="text-3xl">🎯</span> Why This Project Stands Out
                    </h3>
                    <p className="text-foreground/90 font-medium mb-6 text-lg relative z-10">This project demonstrates product thinking, system design, and full-stack development in a SaaS context. It highlights:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/80 font-medium text-[16px] md:text-lg relative z-10">
                      <li className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-secondary/10 shadow-sm"><span className="text-accent font-bold scale-150 drop-shadow-sm">•</span> <strong className="text-foreground/90 tracking-wide">End-to-end application design</strong></li>
                      <li className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-secondary/10 shadow-sm"><span className="text-accent font-bold scale-150 drop-shadow-sm">•</span> <strong className="text-foreground/90 tracking-wide">User-centric workflow engineering</strong></li>
                      <li className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-secondary/10 shadow-sm"><span className="text-accent font-bold scale-150 drop-shadow-sm">•</span> <strong className="text-foreground/90 tracking-wide">Scalable system architecture</strong></li>
                      <li className="flex items-center gap-3 bg-background/50 p-4 rounded-xl border border-secondary/10 shadow-sm"><span className="text-accent font-bold scale-150 drop-shadow-sm">•</span> <strong className="text-foreground/90 tracking-wide">Real-world product development approach</strong></li>
                    </ul>
                    <div className="mt-8 pt-6 border-t border-accent/20 relative z-10">
                      <p className="text-accent/90 font-bold text-[17px] italic tracking-wide">
                        Positioning it as a startup-oriented engineering project rather than a basic CRUD application.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}

          

          {project.id === "stock-market-dashboard" && (
            <div className="flex flex-col gap-20 md:gap-24 w-full max-w-5xl">
              {/* SECTION 1: Problem & Context */}
              <ScrollReveal>
                <div className="relative pl-6 md:pl-10 py-4 mb-8">
                  {/* Left Gradient Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />

                  {/* Ambient Background Blur */}
                  <div className="absolute -left-[100px] top-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-primary">⚡</span> Problem & Context
                      </h2>
                    </div>

                    <div className="space-y-4 max-w-[750px]">
                      <h3 className="text-2xl font-bold text-foreground mb-4 drop-shadow-sm">Problem:</h3>
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                        Traders require ultra-fast, highly visual data processing to make split-second decisions.
                      </p>
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg pt-2">
                        However, existing tools:
                      </p>
                      <ul className="list-none space-y-3 ml-2 text-foreground/60 font-medium pt-2">
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Fragment analytics across multiple platforms</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Introduce latency during heavy data rendering</li>
                        <li className="flex items-center gap-3"><span className="text-primary/70">►</span> Fail to provide real-time actionable insights</li>
                      </ul>
                    </div>

                    <div className="space-y-4 pt-6 max-w-[750px]">
                      <h3 className="text-2xl font-bold text-foreground mb-4 drop-shadow-sm">Goal:</h3>
                      <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                        The goal was to build a unified, high-performance system that delivers:
                      </p>
                      <ul className="list-disc list-outside ml-6 space-y-3 text-foreground/60 font-medium leading-[1.6]">
                        <li>Real-time streaming data</li>
                        <li>Advanced technical analysis</li>
                        <li>Predictive intelligence</li>
                        <li>Seamless user interaction</li>
                      </ul>
                      <p className="text-foreground/50 leading-[1.8] font-medium text-lg italic pt-4 mt-4 drop-shadow-sm">
                        —all within a single responsive interface.
                      </p>
                    </div>

                    <div className="p-8 lg:p-10 bg-background/50 rounded-2xl border border-secondary/10 backdrop-blur-md mt-10 shadow-sm relative overflow-hidden transition-colors duration-500 hover:bg-background/80 hover:border-primary/20 hover:shadow-lg">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                      <h3 className="text-xl font-bold text-foreground/90 mb-6 flex items-center gap-2 drop-shadow-sm relative z-10">
                        <span>📊</span> Scale
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-foreground/60 font-medium relative z-10">
                        <li className="flex items-center gap-3">• ~75,000+ data points processed</li>
                        <li className="flex items-center gap-3">• 60+ companies analyzed</li>
                        <li className="flex items-center gap-3">• 5-year historical dataset</li>
                        <li className="flex items-center gap-3">• Multiple analytical layers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* SECTION 2: Challenges & Complexity */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  {/* Left Gradient Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-accent via-accent/40 to-transparent" />

                  {/* Ambient Background Blur */}
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-10 group">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-accent">⚙️</span> Challenges & Complexity
                      </h2>
                    </div>

                    <div className="space-y-10 max-w-[750px]">
                      <div>
                        <h3 className="text-xl font-bold text-foreground/90 mb-3 flex items-center gap-2 drop-shadow-sm">
                          Handling High-Frequency Data
                        </h3>
                        <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                          Rendering thousands of data points across multiple charts introduced severe performance bottlenecks.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground/90 mb-3 flex items-center gap-2 drop-shadow-sm">
                          Real-Time Consistency
                        </h3>
                        <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                          Ensuring data synchronization during intermittent WebSocket drops without corrupting UI state.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground/90 mb-3 flex items-center gap-2 drop-shadow-sm">
                          Interactive Performance
                        </h3>
                        <p className="text-foreground/60 leading-[1.8] font-medium text-lg">
                          Maintaining smooth filtering, slicing, and comparisons under heavy load without frame drops.
                        </p>
                      </div>

                      <div className="p-8 lg:p-10 bg-background/50 rounded-2xl border border-secondary/10 backdrop-blur-md shadow-sm relative overflow-hidden transition-all duration-500 hover:bg-background/80 hover:border-accent/20 hover:shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
                        <h3 className="text-xl font-bold text-foreground/90 mb-6 flex items-center gap-2 drop-shadow-sm relative z-10">
                          Multi-Dimensional Analysis
                        </h3>
                        <p className="text-foreground/70 font-medium mb-5 text-lg relative z-10">The system supports:</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-foreground/60 font-medium mb-5 ml-2 relative z-10">
                          <li>• Company-level insights</li>
                          <li>• Sector-level comparisons</li>
                          <li>• Time-based trend analysis</li>
                          <li>• Predictive modeling</li>
                        </ul>
                        <p className="text-foreground/50 italic font-medium text-lg pt-2 relative z-10 drop-shadow-sm">
                          —all within a single unified experience.
                        </p>
                      </div>

                      <div className="p-8 lg:p-10 bg-primary/5 rounded-2xl border border-primary/20 backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                        <h3 className="text-2xl font-bold text-primary mb-5 flex items-center gap-3 relative z-10 drop-shadow-sm">
                          <span>🧠</span> Why This Project Stands Out
                        </h3>
                        <p className="text-foreground/90 font-medium mb-5 text-lg relative z-10">This is not just a dashboard. It combines:</p>
                        <ul className="space-y-4 text-foreground/80 font-medium text-lg relative z-10">
                          <li>• <strong className="text-primary/90 font-bold">Data Engineering</strong> (data modeling, aggregation)</li>
                          <li>• <strong className="text-primary/90 font-bold">System Design</strong> (handling scale and performance)</li>
                          <li>• <strong className="text-primary/90 font-bold">Data Science</strong> (ML + forecasting models)</li>
                          <li>• <strong className="text-primary/90 font-bold">UX Engineering</strong> (interactive analytics experience)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Architectural Approach */}
              <ScrollReveal delay={0.2}>
                <div className="relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-secondary/40 via-secondary/10 to-transparent" />
                  <div className="absolute -left-[100px] top-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                        <span className="text-primary-500">🏗️</span> Architectural Approach
                      </h2>
                    </div>

                    <div className="space-y-6 max-w-[850px]">
                      <p className="text-foreground/70 leading-[1.8] text-lg lg:text-xl font-medium">
                        Designed a data-driven architecture to handle real-time market data ingestion, processing, and visualization with minimal latency.
                      </p>
                      <ul className="list-none space-y-4 ml-2 text-foreground/70 font-medium text-lg lg:text-xl mt-4">
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold">•</span>
                          <span>Integrated real-time market data streams using WebSockets for continuous updates</span>
                        </li>
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold">•</span>
                          <span>Implemented a localized state management system to efficiently handle high-frequency data changes</span>
                        </li>
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold">•</span>
                          <span>Designed optimized data transformation pipelines before rendering</span>
                        </li>
                        <li className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/5 border border-secondary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                          <span className="text-primary mt-1 flex-shrink-0 font-bold">•</span>
                          <span>Utilized efficient chart rendering strategies to handle large datasets smoothly</span>
                        </li>
                      </ul>
                      <div className="p-8 lg:p-10 bg-primary/5 rounded-2xl border border-primary/20 backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                        <p className="text-foreground/90 font-bold text-lg relative z-10">
                          <span className="text-primary mr-2 uppercase tracking-wide text-sm">RESULT:</span><br />
                          Real-time data visualization with optimized rendering and minimal UI latency.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center max-w-[1000px] w-full mt-10">
                      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-10 px-4 md:px-6 bg-secondary/5 border border-secondary/10 rounded-2xl shadow-[0_5px_30px_rgba(0,0,0,0.2)] transition-colors hover:border-primary/40 group overflow-x-auto relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        
                        <div className="px-4 py-3 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 group-hover:border-primary/30 transition-colors z-10">Data Source</div>
                        <ArrowLeft size={14} className="text-primary/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">Stream Layer</div>
                        <ArrowLeft size={14} className="text-primary/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-accent/10 text-accent border border-accent/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">Processing</div>
                        <ArrowLeft size={14} className="text-primary/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-background border border-secondary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm text-foreground/80 group-hover:border-primary/30 transition-colors z-10">State</div>
                        <ArrowLeft size={14} className="text-primary/60 rotate-180 shrink-0 z-10" />
                        
                        <div className="px-4 py-3 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono text-xs md:text-sm shrink-0 shadow-sm z-10">UI</div>
                      </div>
                      <p className="text-foreground/60 italic font-medium text-[15px] md:text-base mt-6 text-center max-w-[850px] drop-shadow-sm">
                        This data-centric architecture ensures seamless streaming and high-fidelity visualization with zero frame drops.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Technical Trade-offs */}
              <ScrollReveal delay={0.2}>
                <div className="space-y-8 mb-20 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-yellow-500/40 via-yellow-500/10 to-transparent" />
                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground drop-shadow-sm">Technical Trade-offs</h3>
                  </div>
                  <div className="flex flex-col gap-5 max-w-[850px] relative z-10">
                    <div className="flex gap-4 p-6 bg-background border border-secondary/20 rounded-2xl relative overflow-hidden group hover:border-yellow-500/30 hover:shadow-md transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors" />
                      <span className="text-foreground/70 font-medium text-lg leading-[1.7] ml-2">
                        <strong className="text-foreground/90 block mb-1">Prioritized Canvas-based rendering over DOM for performance</strong>
                        Unlocks the ability to handle high-frequency data streams at 60fps, sacrificing some accessibility flexibility for pure performance.
                      </span>
                    </div>
                    <div className="flex gap-4 p-6 bg-background border border-secondary/20 rounded-2xl relative overflow-hidden group hover:border-yellow-500/30 hover:shadow-md transition-all">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors" />
                      <span className="text-foreground/70 font-medium text-lg leading-[1.7] ml-2">
                        <strong className="text-foreground/90 block mb-1">Shifted computation to client-side for zero-latency</strong>
                        Achieved instantaneous interactions and real-time responsiveness, while increasing the initial JavaScript bundle cost.
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Verified Impact Metrics */}
              <ScrollReveal delay={0.25}>
                <div className="relative p-10 lg:p-12 bg-primary/5 rounded-[2rem] border border-primary/20 max-w-[950px] mb-20 overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
                  <h3 className="text-3xl font-heading font-black mb-8 text-primary flex items-center gap-3 relative z-10 drop-shadow-sm">
                    <Activity size={28} /> Verified Impact Metrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    <div className="bg-background rounded-2xl p-6 shadow-sm border border-secondary/10 flex items-start group hover:border-primary/40 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] hover:-translate-y-1">
                      <p className="font-semibold text-foreground/80 text-lg leading-[1.6]">
                        <span className="text-primary text-4xl lg:text-5xl mb-3 block font-heading font-black tracking-tighter drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:drop-shadow-[0_0_25px_rgba(var(--primary),0.5)] transition-all">10,000+</span>
                        Data points processed per second without UI lag
                      </p>
                    </div>
                    <div className="bg-background rounded-2xl p-6 shadow-sm border border-secondary/10 flex items-start group hover:border-primary/40 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] hover:-translate-y-1">
                      <p className="font-semibold text-foreground/80 text-lg leading-[1.6]">
                        <span className="text-primary text-4xl lg:text-5xl mb-3 block font-heading font-black tracking-tighter drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:drop-shadow-[0_0_25px_rgba(var(--primary),0.5)] transition-all">95+</span>
                        Lighthouse performance score achieved
                      </p>
                    </div>
                    <div className="bg-background rounded-2xl p-6 shadow-sm border border-secondary/10 flex items-start group hover:border-primary/40 transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] hover:-translate-y-1">
                      <p className="font-semibold text-foreground/80 text-lg leading-[1.6]">
                        <span className="text-primary text-4xl lg:text-5xl mb-3 block font-heading font-black tracking-tighter drop-shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:drop-shadow-[0_0_25px_rgba(var(--primary),0.5)] transition-all">50%</span>
                        Reduction in render computation via memoization
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Performance Highlights */}
              <ScrollReveal delay={0.3}>
                <div className="space-y-8 max-w-[850px] mb-20 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-yellow-500/40 via-yellow-500/10 to-transparent" />
                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground flex items-center gap-3 drop-shadow-sm">
                      <Zap className="text-yellow-500 drop-shadow-sm" size={36} /> Performance Highlights
                    </h3>
                  </div>
                  <ul className="space-y-5 relative z-10 w-full">
                    <li className="flex items-start gap-4 bg-secondary/5 rounded-xl p-5 border border-secondary/10 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all shadow-sm">
                      <ChevronRight className="flex-shrink-0 mt-1 text-yellow-500 drop-shadow-sm" size={24} />
                      <span className="text-foreground/70 font-medium text-lg leading-[1.7]">
                        Offloaded heavy computations to <strong className="text-foreground/90">Web Workers</strong> to keep the main thread fluid.
                      </span>
                    </li>
                    <li className="flex items-start gap-4 bg-secondary/5 rounded-xl p-5 border border-secondary/10 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all shadow-sm">
                      <ChevronRight className="flex-shrink-0 mt-1 text-yellow-500 drop-shadow-sm" size={24} />
                      <span className="text-foreground/70 font-medium text-lg leading-[1.7]">
                        Batched high-frequency UI updates using <strong className="text-foreground/90">requestAnimationFrame</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-4 bg-secondary/5 rounded-xl p-5 border border-secondary/10 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all shadow-sm">
                      <ChevronRight className="flex-shrink-0 mt-1 text-yellow-500 drop-shadow-sm" size={24} />
                      <span className="text-foreground/70 font-medium text-lg leading-[1.7]">
                        Minimized unnecessary re-renders via <strong className="text-foreground/90">memoization and state partitioning</strong>.
                      </span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* Engineering Retrospective */}
              <ScrollReveal delay={0.35}>
                <div className="space-y-8 max-w-[850px] mb-20 relative pl-6 md:pl-10 py-4 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-primary/50 via-primary/10 to-transparent" />
                  <div>
                    <h3 className="text-3xl lg:text-5xl font-heading font-black tracking-tight text-foreground drop-shadow-sm">Engineering Retrospective</h3>
                  </div>
                  <div className="prose prose-invert max-w-none text-foreground/70 relative z-10">
                    <p className="leading-[1.8] text-lg lg:text-xl font-medium mb-6">
                      Rendering performance at scale is fundamentally constrained by the DOM.
                    </p>
                    <p className="leading-[1.8] text-lg lg:text-xl font-medium">
                      Switching to <strong className="text-primary font-bold drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]">Canvas-based rendering</strong> unlocked the ability to handle high-frequency data streams at <strong className="text-primary font-bold drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]">60fps</strong>, making it the critical architectural decision for this system.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
