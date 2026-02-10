"use client";

import Link from "next/link";
import { Terminal as TerminalIcon, LayoutGrid } from "lucide-react";
import { CardsView } from "@/components/sections/cards-view";
import { SmallLogo } from "@/components/terminal/ascii-art";
import { ThemeToggle } from "@/components/theme-toggle";

export default function CardsPage() {
  return (
    <main className="min-h-screen">
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Terminal view"
              >
                <TerminalIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Terminal</span>
              </Link>
              <Link
                href="/cards"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors bg-terminal-green/20 text-terminal-green"
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

      <CardsView />
    </main>
  );
}
