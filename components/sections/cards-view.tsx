"use client";

import { Github, Linkedin, ExternalLink, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skills = [
  {
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    title: "Frontend",
    items: ["Vue.js", "Next.js"],
  },
  {
    title: "Backend",
    items: ["FastAPI", "Flask", "Spring Boot", "Supabase"],
  },
  {
    title: "Tools",
    items: ["Docker", "Vercel", "AWS EC2", "Telegram API", "Google APIs"],
  },
];

const projects = [
  {
    name: "Time The Market (FYP)",
    desc: "ML & sentiment analysis solution to predict stock market trends for Tiger Fund Management",
    tech: ["Python", "TensorFlow", "LSTM", "Vue.js", "Docker", "AWS EC2"],
  },
  {
    name: "WFH System",
    desc: "Comprehensive work from home management system to apply, approve and track WFH status",
    tech: ["Python Flask", "Vue.js", "Supabase", "Vercel"],
  },
  {
    name: "OOP Project x P&C Maintenance",
    desc: "Real-world client solution to manage worker jobs and admin schedule planning",
    tech: ["Java", "Spring Boot", "Vue.js", "Google Maps API"],
  },
  {
    name: "Gym Daddy",
    desc: "Gym management system with virtual queuing, booking, and Telegram notifications",
    tech: ["Vue.js", "Python", "Docker", "Telegram API"],
  },
  {
    name: "Solo Scholar",
    desc: "Study platform with pomodoro timer, to-do lists, notes, and speech-to-text",
    tech: ["JavaScript", "Vue.js", "HTML", "CSS"],
  },
  {
    name: "Xiao Liu Ren Bot",
    desc: "Telegram bot automating Chinese Metaphysics quick prediction methods",
    tech: ["Python", "Telegram Bot API", "Flask"],
  },
];

const contacts = [
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    value: "github.com/riannelimje",
    href: "https://github.com/riannelimje",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/rianne-lim/",
    href: "https://www.linkedin.com/in/rianne-lim/",
  },
];

export function CardsView() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-terminal-green">
            Rianne Lim
          </h1>
          <p className="text-xl text-terminal-cyan">
            Software Engineer
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Information Systems @ Singapore Management University,
            specialising in Financial Technology & Digitalisation and Cloud Solutions.
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

        {/* Skills Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span className="text-terminal-dim">{"//"}</span> Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((category) => (
              <Card key={category.title} className="bg-card border-border hover:border-terminal-green/50 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-terminal-green text-lg">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
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

        {/* Projects Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span className="text-terminal-dim">{"//"}</span> Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
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

        {/* About Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2">
            <span className="text-terminal-dim">{"//"}</span> About Me
          </h2>
          <Card className="bg-card border-border">
            <CardContent className="pt-6 space-y-4">
              <p className="leading-relaxed text-foreground">
                Hi! I&apos;m <span className="text-terminal-green font-semibold">Rianne Lim</span>, 
                Information Systems student from Singapore Management University.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                I specialise in <span className="text-terminal-cyan">Financial Technology & Digitalisation</span> and{" "}
                <span className="text-terminal-cyan">Cloud Solutions</span>. A passionate developer with
                proficiency in Python, Java, JavaScript, and SQL, I build dynamic solutions using
                frameworks like Vue.js and Next.js.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies,
                finding investment opportunities, watching dramas, or playing games.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-terminal-dim text-sm">
            © 2026 Rianne Lim. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
