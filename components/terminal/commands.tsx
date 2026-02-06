"use client";

import React from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export function handleCommand(
  command: string,
  onMarket?: () => void
): React.ReactNode {
  const cmd = command.toLowerCase().trim();
  const args = cmd.split(" ");
  const baseCommand = args[0];

  switch (baseCommand) {
    case "help":
      return <HelpOutput />;
    case "about":
      return <AboutOutput />;
    case "skills":
      return <SkillsOutput />;
    case "projects":
      return <ProjectsOutput />;
    case "contact":
      return <ContactOutput />;
    case "neofetch":
      return <NeofetchOutput />;
    case "market":
      if (onMarket) {
        setTimeout(() => onMarket(), 100);
      }
      return <MarketOutput />;
    case "clear":
      return null; // Handled separately
    case "whoami":
      return <span className="text-terminal-cyan">guest</span>;
    case "date":
      return <span className="text-muted-foreground">{new Date().toString()}</span>;
    case "pwd":
      return <span className="text-muted-foreground">/home/guest/rianne-portfolio</span>;
    case "ls":
      return <LsOutput />;
    case "cat":
      if (args[1] === "readme.md") {
        return <AboutOutput />;
      }
      return <span className="text-terminal-red">cat: {args[1] || "missing operand"}: No such file</span>;
    case "echo":
      return <span>{args.slice(1).join(" ")}</span>;
    case "sudo":
      return <span className="text-terminal-red">Nice try! But you don&apos;t have sudo access here</span>;
    case "rm":
      return <span className="text-terminal-red">Permission denied: Cannot delete portfolio files!</span>;
    case "exit":
      return <span className="text-terminal-yellow">Thanks for visiting! Refresh to start a new session.</span>;
    default:
      return (
        <span className="text-terminal-red">
          Command not found: {command}. Type &apos;help&apos; for available commands.
        </span>
      );
  }
}

function HelpOutput() {
  const commands = [
    { cmd: "about", desc: "Learn about me" },
    { cmd: "skills", desc: "View my technical skills" },
    { cmd: "projects", desc: "Browse my projects" },
    { cmd: "contact", desc: "Get in touch" },
    { cmd: "neofetch", desc: "Display system info" },
    { cmd: "market", desc: "Launch trading experience" },
    { cmd: "clear", desc: "Clear terminal" },
  ];

  return (
    <div className="space-y-2 py-2">
      <p className="text-terminal-cyan">Available commands:</p>
      <div className="grid gap-1">
        {commands.map(({ cmd, desc }) => (
          <div key={cmd} className="flex gap-4">
            <span className="text-terminal-green w-24">{cmd}</span>
            <span className="text-muted-foreground">{desc}</span>
          </div>
        ))}
      </div>
      <p className="text-terminal-dim text-sm mt-3">
        Tip: Use ↑↓ arrows for history, Tab for autocomplete
      </p>
    </div>
  );
}

function AboutOutput() {
  return (
    <div className="space-y-3 py-2">
      <p className="text-terminal-cyan">{"/* About Me */"}</p>
      <p className="leading-relaxed text-muted-foreground">
        Hi! I&apos;m <span className="text-terminal-green">Rianne Lim</span>, a software engineer at JP Morgan Chase.
      </p>
      <p className="leading-relaxed text-muted-foreground">
        A passionate developer with
        proficiency in Python, Java, JavaScript, TypeScript and SQL.
      </p>
      <p className="leading-relaxed text-muted-foreground">
        When I&apos;m not coding, you&apos;ll find me exploring new technologies,
        finding investment opportunities, watching dramas, or playing games.
      </p>
    </div>
  );
}

function SkillsOutput() {
  const skillCategories = [
    {
      title: "Languages",
      skills: ["Python", "Java", "JavaScript", "HTML", "CSS", "SQL"],
      color: "text-terminal-green",
    },
    {
      title: "Frontend",
      skills: ["Vue.js", "Next.js"],
      color: "text-terminal-cyan",
    },
    {
      title: "Backend",
      skills: ["Fast API", "Flask", "Spring Boot", "Supabase"],
      color: "text-terminal-yellow",
    },
    {
      title: "Tools",
      skills: ["Docker", "Vercel", "AWS EC2", "Telegram API", "Google APIs"],
      color: "text-terminal-red",
    },
  ];

  return (
    <div className="space-y-4 py-2">
      <p className="text-terminal-cyan">{"/* Technical Skills */"}</p>
      <div className="grid gap-3">
        {skillCategories.map(({ title, skills, color }) => (
          <div key={title} className="flex flex-col sm:flex-row sm:items-start gap-2">
            <span className={`${color} w-24 shrink-0`}>{title}:</span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-secondary rounded text-sm text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsOutput() {
  const projects = [
    {
      name: "Time The Market (FYP)",
      desc: "ML & sentiment analysis solution to predict stock market trends for Tiger Fund Management",
      tech: ["Python", "TensorFlow", "LSTM", "Vue.js", "Docker", "AWS EC2"],
      link: "#",
    },
    {
      name: "WFH System",
      desc: "Comprehensive work from home management system to apply, approve and track WFH status",
      tech: ["Python Flask", "Vue.js", "Supabase", "Vercel"],
      link: "#",
    },
    {
      name: "OOP Project x P&C Maintenance",
      desc: "Real-world client solution to manage worker jobs and admin schedule planning",
      tech: ["Java", "Spring Boot", "Vue.js", "Google Maps API"],
      link: "#",
    },
    {
      name: "Gym Daddy",
      desc: "Gym management system with virtual queuing, booking, and Telegram notifications",
      tech: ["Vue.js", "Python", "Docker", "Telegram API"],
      link: "#",
    },
    {
      name: "Solo Scholar",
      desc: "Study platform with pomodoro timer, to-do lists, notes, and speech-to-text",
      tech: ["JavaScript", "Vue.js", "HTML", "CSS"],
      link: "#",
    },
    {
      name: "Xiao Liu Ren Bot",
      desc: "Telegram bot automating Chinese Metaphysics quick prediction methods",
      tech: ["Python", "Telegram Bot API", "Flask"],
      link: "#",
    },
  ];

  return (
    <div className="space-y-4 py-2">
      <p className="text-terminal-cyan">{"/* Featured Projects */"}</p>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.name}
            className="border border-border rounded p-3 hover:border-terminal-green/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-terminal-green font-semibold">
                {project.name}
              </span>
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-2">{project.desc}</p>
            <div className="flex flex-wrap gap-1">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-1.5 py-0.5 bg-secondary rounded text-terminal-cyan"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-terminal-dim text-sm">
        View more on GitHub →
      </p>
    </div>
  );
}

function ContactOutput() {
  const contacts = [
    {
      icon: <Github className="w-4 h-4" />,
      label: "GitHub",
      value: "github.com/riannelimje",
      href: "https://github.com/riannelimje",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      label: "LinkedIn",
      value: "linkedin.com/in/rianne-lim/",
      href: "https://www.linkedin.com/in/rianne-lim/",
    },
  ];

  return (
    <div className="space-y-3 py-2">
      <p className="text-terminal-cyan">{"/* Contact */"}</p>
      <p className="text-muted-foreground">
        I&apos;m always open to new opportunities and collaborations!
      </p>
      <div className="grid gap-2">
        {contacts.map(({ icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-foreground hover:text-terminal-green transition-colors group"
          >
            <span className="text-terminal-green">{icon}</span>
            <span className="text-terminal-dim w-16">{label}:</span>
            <span className="group-hover:underline">{value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function LsOutput() {
  const files = [
    { name: "about.md", color: "text-terminal-green" },
    { name: "skills.json", color: "text-terminal-yellow" },
    { name: "projects/", color: "text-terminal-cyan" },
    { name: "contact.txt", color: "text-foreground" },
    { name: "readme.md", color: "text-terminal-green" },
  ];

  return (
    <div className="flex flex-wrap gap-4 py-1">
      {files.map((file) => (
        <span key={file.name} className={file.color}>
          {file.name}
        </span>
      ))}
    </div>
  );
}

function NeofetchOutput() {
  return (
    <div className="flex flex-col md:flex-row gap-4 py-2">
      <pre className="text-terminal-green text-xs leading-tight">
{`  ██████╗ ██╗      
  ██╔══██╗██║      
  ██████╔╝██║      
  ██╔══██╗██║      
  ██║  ██║███████╗ 
  ╚═╝  ╚═╝╚══════╝`}
      </pre>
      <div className="text-sm space-y-1">
        <p>
          <span className="text-terminal-cyan">guest</span>
          <span className="text-foreground">@</span>
          <span className="text-terminal-cyan">rianne.dev</span>
        </p>
        <p className="text-terminal-dim">-------------------</p>
        <p>
          <span className="text-terminal-green">Name:</span>{" "}
          <span className="text-foreground">Rianne Lim</span>
        </p>
        <p>
          <span className="text-terminal-green">Role:</span>{" "}
          <span className="text-foreground">SWE</span>
        </p>
        <p>
          <span className="text-terminal-green">Location:</span>{" "}
          <span className="text-foreground">Singapore</span>
        </p>
        <p>
          <span className="text-terminal-green">Message:</span>{" "}
          <span className="text-foreground">Thanks for playing around with my website!</span>
        </p>
      </div>
    </div>
  );
}

function MarketOutput() {
  return (
    <div className="space-y-2 py-2">
      <p className="text-terminal-green">Initialising market terminal...</p>
      <p className="text-muted-foreground">Loading trading dashboard...</p>
    </div>
  );
}
