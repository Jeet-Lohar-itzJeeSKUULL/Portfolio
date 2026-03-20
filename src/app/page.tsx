import { Hero } from "@/components/hero";
import { CurrentlyWorking } from "@/components/currently-working";
import { About } from "@/components/about";
import { HowIApproach } from "@/components/how-i-approach";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { GithubSection } from "@/components/github";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Hero />
      <CurrentlyWorking />
      <About />
      <HowIApproach />
      <Skills />
      <Projects />
      <Experience />
      <GithubSection />
      <Contact />
    </main>
  );
}
