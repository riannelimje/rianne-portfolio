"use client";

import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, ExternalLink, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aboutData, skillsData, projectsData, contactsData } from "@/lib/portfolio-data";

const contacts = contactsData.map((contact) => ({
  ...contact,
  icon: contact.label === "GitHub" ? <Github className="w-5 h-5" /> : <Linkedin className="w-5 h-5" />,
}));

export function CardsView() {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(new Array(projectsData.length).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            // Cascade flip animation
            projectsData.forEach((_, index) => {
              setTimeout(() => {
                setFlippedCards((prev) => {
                  const newFlipped = [...prev];
                  newFlipped[index] = true;
                  return newFlipped;
                });
              }, index * 150); // 150ms delay between each card
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate subtle random rotations for each card
  const randomRotations = useRef(
    projectsData.map(() => (Math.random() - 0.5) * 3) // -1.5 to 1.5 degrees
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-terminal-green">
            {aboutData.name}
          </h1>
          <p className="text-xl text-terminal-cyan">
            {aboutData.role}
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {aboutData.education.major} @ {aboutData.education.school},
            specialising in {aboutData.education.specializations.join(" and ")}.
          </p>
          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-md hover:bg-terminal-green/20 hover:text-terminal-green transition-colors"
              >
                {contact.icon}
                <span className="text-sm">{contact.label}</span>
              </a>
            ))}
          </div>
        </header>

         {/* About Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span className="text-terminal-dim">{"//"}</span> About Me
          </h2>
          <Card className="bg-card border-border">
            <CardContent className="pt-6 space-y-4">
              <p className="leading-relaxed text-foreground">
                Hi! I&apos;m <span className="text-terminal-green">{aboutData.name}</span>!
              </p>
              <p className="leading-relaxed text-muted-foreground">
                I specialise in {aboutData.education.specializations.map((spec, i) => (
                  <span key={spec}>
                    <span className="text-terminal-cyan">{spec}</span>
                    {i < aboutData.education.specializations.length - 1 && " and "}
                  </span>
                ))}. {aboutData.description[0]}
              </p>
              <p className="leading-relaxed text-muted-foreground">
                {aboutData.description[1]}
              </p>
              <p className="leading-relaxed text-muted-foreground">
                {aboutData.description[2]}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Projects Section */}
        <section ref={sectionRef} className="space-y-6">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span className="text-terminal-dim">{"//"}</span> Projects
          </h2>
          <div className="overflow-x-auto pb-8 px-4">
            <div className="relative flex items-center justify-center min-w-max py-12 h-[450px]" style={{ perspective: '2000px' }}>
              {[...projectsData].reverse().map((project, reverseIndex) => {
                const index = projectsData.length - 1 - reverseIndex;
                const isFlipped = flippedCards[index];
                const translateX = reverseIndex * 65; // Optimized spacing to fit all cards on desktop
                const rotation = randomRotations.current[index];
                const zIndex = reverseIndex;
                
                const CardWrapper = project.link ? 'a' : 'div';
                const linkProps = project.link ? {
                  href: project.link,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {};
                
                return (
                  <div
                    key={project.name}
                    className="absolute group"
                    style={{
                      left: `${translateX}px`,
                      zIndex: zIndex,
                      perspective: '2000px',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isFlipped) return;
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = `translateY(-50px) scale(1.08)`;
                      target.style.zIndex = '100';
                    }}
                    onMouseLeave={(e) => {
                      if (!isFlipped) return;
                      const target = e.currentTarget as HTMLElement;
                      target.style.transform = `translateY(0) scale(1)`;
                      target.style.zIndex = `${zIndex}`;
                    }}
                  >
                    <CardWrapper
                      {...linkProps}
                      className="block no-underline"
                      style={{ pointerEvents: isFlipped ? 'auto' : 'none' }}
                    >
                      <div
                        style={{
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          transform: isFlipped ? `rotateY(0deg) rotate(${rotation}deg)` : `rotateY(180deg) rotate(${rotation}deg)`,
                          width: '280px',
                          height: '360px',
                        }}
                      >
                      {/* Card Front */}
                      <Card
                        className="w-[280px] h-[360px] bg-gradient-to-br from-card via-card to-secondary border-2 border-terminal-green/40 hover:border-terminal-green transition-all cursor-pointer"
                        style={{
                          backfaceVisibility: 'hidden',
                          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 159, 0.1)',
                        }}
                      >
                        <CardHeader className="pb-3 border-b border-terminal-green/30">
                          <CardTitle 
                            className="text-terminal-green text-lg font-bold flex items-center justify-between gap-2"
                          >
                            <span className="truncate">{project.name}</span>
                            {project.link && (
                              <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3 h-[280px] flex flex-col">
                          <p className="text-sm text-muted-foreground leading-relaxed flex-grow overflow-hidden">
                            {project.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {project.tech.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="text-xs px-2.5 py-1 bg-terminal-green/10 border border-terminal-green/40 rounded text-terminal-cyan"
                              >
                                {t}
                              </span>
                            ))}
                            {project.tech.length > 4 && (
                              <span className="text-xs px-2.5 py-1 bg-terminal-green/10 border border-terminal-green/40 rounded text-terminal-dim">
                                +{project.tech.length - 4}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Card Back */}
                      <Card
                        className="w-[280px] h-[360px] absolute top-0 left-0 bg-gradient-to-br from-terminal-green/5 via-secondary to-terminal-cyan/5 border-2 border-terminal-green/40"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: `rotateY(180deg)`,
                          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 159, 0.1)',
                        }}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
                          {/* Terminal pattern background */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="text-terminal-green text-xs font-mono leading-tight break-all">
                              {Array(20).fill('01010101 ').join('')}
                              {Array(20).fill('10101010 ').join('')}
                              {Array(20).fill('11001100 ').join('')}
                            </div>
                          </div>
                          
                          {/* Center logo/icon */}
                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-24 h-24 border-4 border-terminal-green/30 rounded-lg flex items-center justify-center">
                              <span className="text-5xl text-terminal-green font-bold" style={{
                                textShadow: '0 0 20px rgba(0, 255, 159, 0.6)',
                              }}>
                                {'</>'}
                              </span>
                            </div>
                            <div className="text-terminal-cyan font-mono text-xs">
                              RIANNE_LIM.DEV
                            </div>
                            <div className="flex gap-2 text-terminal-dim text-xs">
                              <span>■</span>
                              <span>■</span>
                              <span>■</span>
                            </div>
                          </div>

                          {/* Corner decorations */}
                          <div className="absolute top-4 left-4 text-terminal-green/30 text-xs font-mono">
                            {'>>'}
                          </div>
                          <div className="absolute top-4 right-4 text-terminal-green/30 text-xs font-mono">
                            {'<<'}
                          </div>
                          <div className="absolute bottom-4 left-4 text-terminal-green/30 text-xs font-mono">
                            {'>>'}
                          </div>
                          <div className="absolute bottom-4 right-4 text-terminal-green/30 text-xs font-mono">
                            {'<<'}
                          </div>
                        </div>
                      </Card>
                    </div>
                    </CardWrapper>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-terminal-dim text-sm animate-pulse">
            {flippedCards.every(f => f) ? 'Hover over the cards to explore projects' : 'Watch the cards flip...'}
          </p>
        </section>

        {/* Skills Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span className="text-terminal-dim">{"//"}</span> Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillsData.map((category) => (
              <Card key={category.title} className="bg-card border-border hover:border-terminal-green/50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-terminal-green text-lg">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-secondary text-sm rounded text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-terminal-dim text-sm">
            © {new Date().getFullYear()} Rianne Lim. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
