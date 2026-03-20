"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import Image from "next/image";

const ROLES = [
  "Full Stack Developer",
  "App Developer (Android & Web)",
  "Data Science Enthusiast"
];

export function Hero() {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseDuration = 1200;

    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        timer = setTimeout(() => {}, typingSpeed);
      } else {
        timer = setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
      }
    } else {
      if (text === currentRole) {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      } else {
        timer = setTimeout(() => setText(currentRole.slice(0, text.length + 1)), typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background gradients & Noise */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle noise texture (3% opacity) */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Animated slow-moving deep blue/purple background glow (12s loop) */}
        <motion.div
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vh] pointer-events-none mix-blend-screen blur-[120px] rounded-[100%]"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(30,58,138,0.6) 0%, rgba(88,28,135,0.3) 40%, transparent 70%)"
          }}
        />

        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[0%] w-[60vw] h-[60vh] pointer-events-none mix-blend-screen blur-[120px] rounded-[100%]"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(88,28,135,0.4) 0%, rgba(30,58,138,0.2) 40%, transparent 70%)"
          }}
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto mt-20 md:mt-0 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-black tracking-tight mb-4"
          >
            Jeet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Lohar</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 flex items-center h-10 md:h-12"
          >
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block w-[3px] h-8 md:h-10 bg-primary ml-1"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-foreground/80 font-medium mb-4 max-w-xl"
          >
            I design and build scalable applications and intelligent systems for real-world impact.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-base text-foreground/60 max-w-xl font-light mb-10 leading-relaxed"
          >
            Focused on developing high-performance web and mobile applications, with strong foundations in data-driven solutions and modern system design. I build systems that are fast, scalable, and user-centric.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              Explore My Work <ArrowRight size={18} />
            </a>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="flex flex-1 sm:flex-none items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 px-6 py-4 rounded-full font-medium transition-colors"
              >
                Contact Me <Mail size={18} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Resume"
                className="flex items-center justify-center w-14 h-14 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 rounded-full transition-colors flex-shrink-0"
              >
                <Download size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full max-w-sm md:max-w-md relative"
        >
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden group">
            <div className="absolute inset-[-4px] bg-gradient-to-br from-primary via-transparent to-accent rounded-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 blur-md" />
            <div className="absolute inset-0 rounded-xl bg-background m-[2px] overflow-hidden">
              <Image
                src="/images/profile3.jpg"
                alt="Jeet Lohar"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-10"
              />
              {/* Dark overlay for blending (15% opacity) */}
              <div className="absolute inset-0 bg-black/15 z-20 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Subtle floating decorative elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-xl mix-blend-screen"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/20 rounded-full blur-xl mix-blend-screen"
          />
        </motion.div>
      </div>
    </section>
  );
}
