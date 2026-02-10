"use client";

import React from "react"

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface Command {
  input: string;
  output: React.ReactNode;
  timestamp: Date;
}

interface TerminalProps {
  initialCommands?: Command[];
  onCommand?: (command: string) => React.ReactNode;
  prompt?: string;
  className?: string;
}

export function Terminal({
  initialCommands = [],
  onCommand,
  prompt = "guest@rianne.dev",
  className,
}: TerminalProps) {
  const [history, setHistory] = useState<Command[]>(initialCommands);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (contentRef.current) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      });
    }
  }, [history]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const output = onCommand ? onCommand(input.trim()) : null;
      setHistory((prev) => [
        ...prev,
        { input: input.trim(), output, timestamp: new Date() },
      ]);
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const commandHistory = history.filter((h) => h.input);
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]?.input || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const commandHistory = history.filter((h) => h.input);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]?.input || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple tab completion
      const commands = ["help", "about", "skills", "projects", "experience", "contact", "clear", "neofetch", "market"];
      const matches = commands.filter((cmd) => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      ref={terminalRef}
      onClick={focusInput}
      className={cn(
        "bg-card border border-border rounded-lg overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red" />
          <div className="w-3 h-3 rounded-full bg-terminal-yellow" />
          <div className="w-3 h-3 rounded-full bg-terminal-green" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">
          rianne@portfolio ~ zsh
        </span>
      </div>

      {/* Terminal Content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-4 min-h-0"
      >
        <div className="space-y-2">
          {history.map((cmd, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-terminal-cyan">{prompt}</span>
                <span className="text-terminal-green">~</span>
                <span className="text-foreground">{cmd.input}</span>
              </div>
              {cmd.output && (
                <div className="pl-0 text-foreground/90">{cmd.output}</div>
              )}
            </div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-terminal-cyan">{prompt}</span>
            <span className="text-terminal-green">~</span>
            <div className="flex-1 flex items-center min-w-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-foreground caret-terminal-green min-w-0"
                autoFocus
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
