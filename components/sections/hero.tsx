"use client";

import { useState, useEffect } from "react";
import { Github, Linkedin } from "lucide-react";
import { AsciiArt } from "@/components/terminal/ascii-art";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = [
    "Software Engineer",
    "Full Stack Engineer",
    "SMU Information Systems",
    "Matcha Lover",
    "Cardistry Enthusiast",
    "Drama Addict",
    "Avid Photographer",
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  if (!mounted) {
    return null;
  }

  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="space-y-6">
        {/* ASCII Name */}
        <div className="overflow-x-auto pb-2">
          <AsciiArt />
        </div>

        {/* Dynamic Title */}
        <div className="space-y-2">
          <p className="text-terminal-dim text-sm">
            <span className="text-terminal-cyan">const</span>{" "}
            <span className="text-terminal-green">role</span> ={" "}
          </p>
          <h2 className="text-xl md:text-2xl text-foreground">
            <span className="text-terminal-yellow">&quot;</span>
            <span
              key={titleIndex}
              className="inline-block animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              {titles[titleIndex]}
            </span>
            <span className="text-terminal-yellow">&quot;</span>
            <span className="text-terminal-dim">;</span>
          </h2>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="text-muted-foreground">
            <span className="text-terminal-green">{">"}</span> Singapore
          </span>
          <span className="text-muted-foreground">
            <span className="text-terminal-cyan">{">"}</span> Open to opportunities
          </span>
          <span className="text-terminal-dim">|</span>
          <a
            href="https://github.com/riannelimje"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-terminal-green transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/rianne-lim/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-terminal-cyan transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>

        {/* Instruction */}
        <div className="pt-4">
          <p className="text-terminal-dim text-sm animate-pulse">
            Type <span className="text-terminal-green">help</span> in the terminal below or any linux command to get started...
          </p>
        </div>
      </div>
    </section>
  );
}
