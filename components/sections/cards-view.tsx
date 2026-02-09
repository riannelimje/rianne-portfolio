"use client";

import { Github, Linkedin, ExternalLink, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aboutData, skillsData, projectsData, contactsData } from "@/lib/portfolio-data";

const contacts = contactsData.map((contact) => ({
  ...contact,
  icon: contact.label === "GitHub" ? <Github className="w-5 h-5" /> : <Linkedin className="w-5 h-5" />,
}));

export function CardsView() {
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
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span className="text-terminal-dim">{"//"}</span> Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsData.map((project) => (
              <Card
                key={project.name}
                className="bg-card border-border hover:border-terminal-green/50 transition-colors group cursor-pointer"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-terminal-green text-lg flex items-center gap-2">
                    {project.name}
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 bg-secondary rounded text-terminal-cyan"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
