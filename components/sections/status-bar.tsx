"use client";

import { useState, useEffect } from "react";
import { Activity, Clock, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border px-4 py-2 text-xs z-50",
        className
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-terminal-green">
            <Activity className="w-3 h-3" />
            <span>NORMAL</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
            <span>main</span>
            <span className="text-terminal-cyan">✓</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-terminal-green">
            <Wifi className="w-3 h-3" />
            <span className="hidden sm:inline">Connected</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="font-mono">{time}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
