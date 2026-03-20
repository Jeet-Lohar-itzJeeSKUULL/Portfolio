import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, ShieldCheck, Activity, Zap, Server, ChevronRight } from "lucide-react";

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

  return (
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* Project Hero / Case Study Header */}
      <section className="container mx-auto px-6 md:px-12 max-w-5xl py-12 relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
        
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 font-medium text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all mb-10 shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Showcase
        </Link>

        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-md border border-primary/20">
              {project.category}
            </span>
            <span className="text-sm font-medium text-foreground/50">Case Study</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">
            {project.title}
          </h1>
          <p className="text-2xl text-foreground/80 font-medium max-w-3xl leading-snug">
            {project.solutionSummary || project.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(37,99,235,0.3)]"
              >
                <ExternalLink size={20} /> View Live Application
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-background border-2 border-secondary/20 hover:border-foreground font-bold rounded-xl transition-all hover:-translate-y-1"
              >
                <Github size={20} /> System Source
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Feature Image Frame */}
      <div className="container mx-auto px-6 md:px-12 max-w-6xl mb-24 relative z-10">
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-secondary/5 border-2 border-secondary/10 shadow-2xl ring-4 ring-background/5">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} Interface`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/20 to-secondary/5">
              <span className="text-secondary/40 text-4xl font-heading font-black">{project.title}</span>
            </div>
          )}
        </div>
      </div>

      <section className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          
          {/* Main Context Column */}
          <div className="md:col-span-3 space-y-16">
            
            {/* Business/Technical Context */}
            {project.problemStatement && (
              <div className="relative pl-6 border-l-4 border-accent">
                <h3 className="text-xl font-heading font-bold mb-4 text-accent uppercase tracking-wider flex items-center gap-2">
                   <ShieldCheck size={20} /> The Problem Context
                </h3>
                <p className="text-foreground/80 leading-relaxed text-lg font-medium">
                  {project.problemStatement}
                </p>
              </div>
            )}

            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-black border-b border-secondary/20 pb-4">Architectural Approach</h2>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                {project.architecture || project.description}
              </p>
              {project.solutionApproach && (
                 <p className="text-foreground/70 leading-relaxed text-lg">
                    {project.solutionApproach}
                 </p>
              )}
              
              {/* Very Simple Diagram Representation */}
              <div className="flex flex-wrap items-center justify-center gap-4 py-8 px-4 bg-secondary/5 border border-secondary/10 rounded-2xl">
                 <div className="px-4 py-2 bg-background border border-secondary/20 rounded font-mono text-sm shrink-0 shadow-sm">Client UI</div>
                 <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                 <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded font-mono text-sm shrink-0 shadow-sm">Routing / API Layer</div>
                 <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                 <div className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded font-mono text-sm shrink-0 shadow-sm">Core Backend</div>
                 <ArrowLeft size={16} className="text-secondary/50 rotate-180 shrink-0" />
                 <div className="px-4 py-2 bg-background border border-secondary/20 rounded font-mono text-sm shrink-0 shadow-sm">Data & Cache</div>
              </div>
            </div>

            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-black mb-4 border-b border-secondary/20 pb-4">Engineering Challenges</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.challenges.map((challenge, idx) => (
                    <li key={idx} className="bg-secondary/5 p-6 rounded-2xl border border-secondary/10">
                       <p className="text-foreground/80 leading-relaxed font-medium">{challenge}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.tradeOffs && project.tradeOffs.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-black mb-4 border-b border-secondary/20 pb-4">Technical Trade-offs</h3>
                <div className="flex flex-col gap-4">
                  {project.tradeOffs.map((tradeoff, idx) => (
                    <div key={idx} className="flex gap-4 p-5 bg-background border border-secondary/20 rounded-xl relative overflow-hidden">
                       <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500/50" />
                       <span className="text-foreground/80 font-medium">{tradeoff}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {project.metrics && project.metrics.length > 0 && (
              <div className="p-8 bg-primary/5 rounded-3xl border border-primary/20">
                <h3 className="text-2xl font-heading font-black mb-6 text-primary flex items-center gap-2">
                  <Activity /> Verified Impact Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-background rounded-xl p-6 shadow-sm border border-secondary/10">
                      <p className="font-semibold text-foreground/90">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.performanceImprovements && project.performanceImprovements.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-black mb-4 flex items-center gap-2">
                   <Zap className="text-yellow-500" /> Performance Optimizations
                </h3>
                <ul className="space-y-4">
                  {project.performanceImprovements.map((opt, idx) => (
                    <li key={idx} className="flex items-start gap-4 bg-secondary/5 rounded-lg p-4 border border-secondary/10">
                      <ChevronRight className="flex-shrink-0 mt-0.5 text-primary" size={20} />
                      <span className="text-foreground/80 font-medium">{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.keyLearnings && project.keyLearnings.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-black mb-4">Engineering Retrospective</h3>
                <div className="prose prose-invert max-w-none text-foreground/80">
                  <ul className="space-y-3">
                    {project.keyLearnings.map((learning, idx) => (
                      <li key={idx} className="leading-relaxed text-lg">{learning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Sidebar */}
          <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-secondary/20 pt-8 md:pt-0 md:pl-8">
             <div className="sticky top-24 space-y-10">
               <div>
                  <h3 className="text-sm font-heading font-black uppercase text-foreground/50 tracking-widest mb-6 flex items-center gap-2">
                     <Server size={16} /> Stack Map
                  </h3>
                  <div className="flex flex-col gap-3">
                    {project.techStack.map((tech) => (
                      <div key={tech} className="px-5 py-3 bg-secondary/10 rounded-xl font-bold border border-secondary/20 hover:border-primary hover:bg-primary/5 transition-all w-fit">
                        {tech}
                      </div>
                    ))}
                  </div>
               </div>

               {project.features && project.features.length > 0 && (
                 <div>
                    <h3 className="text-sm font-heading font-black uppercase text-foreground/50 tracking-widest mb-6">
                       Core Systems
                    </h3>
                    <ul className="space-y-3">
                       {project.features.map((feature, idx) => (
                          <li key={idx} className="text-sm font-semibold text-foreground/80">
                            • {feature}
                          </li>
                       ))}
                    </ul>
                 </div>
               )}
             </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}
