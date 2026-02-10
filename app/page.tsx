"use client";

import React from "react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Terminal as TerminalIcon, LayoutGrid } from "lucide-react";
import { Terminal } from "@/components/terminal/terminal";
import { handleCommand } from "@/components/terminal/commands";
import { Hero } from "@/components/sections/hero";
import { StatusBar } from "@/components/sections/status-bar";
import { SmallLogo } from "@/components/terminal/ascii-art";
import { ThemeToggle } from "@/components/theme-toggle";
import { BootSequence } from "@/components/trading/boot-sequence";
import { TradingDashboard } from "@/components/trading/trading-dashboard";

interface Command {
  input: string;
  output: React.ReactNode;
  timestamp: Date;
}

export default function Home() {
  const [viewMode, setViewMode] = useState<"terminal" | "market">("terminal");
  const [showBootSequence, setShowBootSequence] = useState(false);
  const [terminalKey, setTerminalKey] = useState(0);
  const [initialCommands, setInitialCommands] = useState<Command[]>([
    {
      input: "welcome",
      output: <WelcomeMessage />,
      timestamp: new Date(),
    },
  ]);

  const handleMarketCommand = useCallback(() => {
    setShowBootSequence(true);
  }, []);

  const handleBootComplete = useCallback(() => {
    setShowBootSequence(false);
    setViewMode("market");
  }, []);

  const processCommand = useCallback(
    (command: string): React.ReactNode => {
      const cmd = command.toLowerCase().trim();

      // Handle clear command
      if (cmd === "clear") {
        setInitialCommands([]);
        setTerminalKey((prev) => prev + 1);
        return null;
      }

      return handleCommand(command, handleMarketCommand);
    },
    [handleMarketCommand]
  );

  // If in market view, render trading dashboard
  if (viewMode === "market") {
    return (
      <>
        {showBootSequence && <BootSequence onComplete={handleBootComplete} />}
        <TradingDashboard onExit={() => setViewMode("terminal")} />
      </>
    );
  }

  return (
    <main className="min-h-screen pb-12">
      {/* Boot Sequence Overlay */}
      {showBootSequence && <BootSequence onComplete={handleBootComplete} />}

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <SmallLogo className="text-2xl" />
            <span className="text-muted-foreground text-sm hidden sm:inline">
              rianne.dev
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 bg-secondary rounded-md p-1">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors bg-terminal-green/20 text-terminal-green"
                aria-label="Terminal view"
              >
                <TerminalIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Terminal</span>
              </Link>
              <Link
                href="/cards"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Cards view"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </Link>
            </div>
            <span className="text-terminal-dim hidden sm:inline">
              <span className="text-terminal-green">v</span>2.0.0
            </span>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <Hero />

        {/* Terminal */}
        <section className="pb-20">
          <Terminal
            key={terminalKey}
            initialCommands={initialCommands}
            onCommand={processCommand}
            className="h-[400px] md:h-[500px]"
          />
        </section>
      </div>

      {/* Status Bar */}
      <StatusBar />
    </main>
  );
}

function WelcomeMessage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-terminal-cyan">
        Welcome to Rianne&apos;s Portfolio Terminal v2.0.0
      </p>
      <p className="text-muted-foreground">
        Type <span className="text-terminal-green">help</span> to see available
        commands.
      </p>
      <p className="text-terminal-dim text-sm">
        Last login: {currentDate || "..."} from 127.0.0.1
      </p>
    </div>
  );
}
