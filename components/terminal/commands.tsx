"use client";

import React from "react";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { aboutData, skillsData, projectsData, contactsData } from "@/lib/portfolio-data";

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
        Hi! I&apos;m <span className="text-terminal-green">{aboutData.name}</span>!
      </p>
      {aboutData.description.map((desc, index) => (
        <p key={index} className="leading-relaxed text-muted-foreground">
          {desc}
        </p>
      ))}
    </div>
  );
}

function SkillsOutput() {
  return (
    <div className="space-y-4 py-2">
      <p className="text-terminal-cyan">{"/* Technical Skills */"}</p>
      <div className="grid gap-3">
        {skillsData.map(({ title, skills, color }) => (
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
  const [showAll, setShowAll] = React.useState(false);
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 3);
  
  return (
    <div className="space-y-4 py-2">
      <p className="text-terminal-cyan">{"/* Featured Projects */"}</p>
      <div className="grid gap-4">
        {displayedProjects.map((project) => {
          const ProjectWrapper = project.link ? 'a' : 'div';
          const linkProps = project.link ? {
            href: project.link,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block border border-border rounded p-3 hover:border-terminal-green/50 transition-colors no-underline cursor-pointer"
          } : {
            className: "border border-border rounded p-3"
          };
          
          return (
            <ProjectWrapper
              key={project.name}
              {...linkProps}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-terminal-green font-semibold">
                  {project.name}
                </span>
                {project.link && (
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                )}
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
            </ProjectWrapper>
          );
        })}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-terminal-dim text-sm hover:text-terminal-green transition-colors cursor-pointer"
      >
        {showAll ? "↑ Show less" : `↓ Expand list (${projectsData.length - 3} more)`}
      </button>
    </div>
  );
}

function ContactOutput() {
  const contacts = contactsData.map((contact) => ({
    ...contact,
    icon: contact.label === "GitHub" ? <Github className="w-4 h-4" /> : <Linkedin className="w-4 h-4" />,
  }));

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
          <span className="text-foreground">{aboutData.name}</span>
        </p>
        <p>
          <span className="text-terminal-green">Role:</span>{" "}
          <span className="text-foreground">{aboutData.role}</span>
        </p>
        <p>
          <span className="text-terminal-green">Location:</span>{" "}
          <span className="text-foreground">{aboutData.location}</span>
        </p>
        <p>
          <span className="text-terminal-green">Message:</span>{" "}
          <span className="text-foreground">{aboutData.message}</span>
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
