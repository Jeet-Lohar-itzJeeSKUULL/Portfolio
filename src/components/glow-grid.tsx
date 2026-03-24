"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GlowGrid() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true" />;
  }

  const currentTheme = resolvedTheme || theme;
  const isDark = currentTheme === "dark";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 
         SVG Grid with "Glow Catcher" effects:
         - Light mode lines are now more prominent in the center (40% radius focus).
         - Uses vibrant blue-purple gradients (#3B82F6 -> #8B5CF6) for all strokes.
      */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          maskImage: "radial-gradient(circle at 50% 40%, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 40%, transparent 95%)"
        }}
      >
        <defs>
          {/* Vibrant Blue-Purple Gradient for Light Mode & Highlights */}
          <linearGradient id="vibrant-grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Deep Blue Gradient for Dark Mode Base Grid */}
          <linearGradient id="dark-grid-base" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>

          {/* Grid Pattern Definition */}
          <pattern
            id="illuminated-hero-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* The "Aura" / Soft diffused glow behind lines */}
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={isDark ? "#2563EB" : "url(#vibrant-grid-gradient)"}
              strokeWidth="4.5"
              strokeOpacity={isDark ? "0.06" : "0.08"}
              style={{ filter: "blur(2.5px)" }}
            />
            
            {/* Main Sharp Grid Lines (Vibrant Tint) */}
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={isDark ? "url(#dark-grid-base)" : "url(#vibrant-grid-gradient)"}
              strokeWidth={isDark ? "1" : "0.9"}
              strokeOpacity={isDark ? "0.22" : "0.15"}
            />

            {/* Intersection Glow Dots */}
            <circle 
              cx="0" 
              cy="0" 
              r="2.8" 
              fill={isDark ? "#3B82F6" : "#8B5CF6"} 
              fillOpacity={isDark ? "0.25" : "0.20"} 
              filter="blur(1.5px)"
            />
            <circle 
              cx="0" 
              cy="0" 
              r="1.2" 
              fill={isDark ? "#E0F2FE" : "#3B82F6"} 
              fillOpacity={isDark ? "0.6" : "0.4"}
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#illuminated-hero-grid)" />
      </svg>

      {/* Main Central Glow (Behind Hero Content) */}
      <motion.div
        animate={{
          opacity: isDark ? [0.15, 0.35, 0.15] : [0.08, 0.16, 0.08],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[75vh] rounded-full pointer-events-none"
        style={{
          background: isDark 
            ? "radial-gradient(circle at center, rgba(37, 99, 235, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 80%)"
            : "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 80%)",
          filter: "blur(140px)",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />

      {/* Surface Polish Layers */}
      <div className="absolute inset-0 backdrop-blur-[0.4px] pointer-events-none" />

      {/* Smooth Vignettes for blending into surrounding sections */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-1 pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-1 pointer-events-none opacity-50" />

      {/* Fades for transition out of the hero section */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-background to-transparent z-1 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-background to-transparent z-1 pointer-events-none" />
    </div>
  );
}
