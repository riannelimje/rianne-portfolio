"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  { text: "Initialising market terminal...", delay: 0 },
  { text: "Loading market data...", delay: 300 },
  { text: "Syncing ticker feed...", delay: 600 },
  { text: "Connecting to exchange...", delay: 900 },
  { text: "Authenticating trading session...", delay: 1200 },
  { text: "Fetching portfolio data...", delay: 1500 },
  { text: "Loading asset information...", delay: 1800 },
  { text: "System ready.", delay: 2100 },
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show messages one by one
    const messageTimers = BOOT_MESSAGES.map((msg, index) =>
      setTimeout(() => {
        setVisibleMessages(index + 1);
      }, msg.delay)
    );

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Fade out and complete
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      messageTimers.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 bg-background z-50 flex items-center justify-center transition-opacity duration-400",
        fadeOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="max-w-lg w-full mx-4 space-y-6">
        {/* ASCII Header */}
        <pre className="text-terminal-green text-xs sm:text-sm text-center font-mono">
{`
 ███╗   ███╗ █████╗ ██████╗ ██╗  ██╗███████╗████████╗
 ████╗ ████║██╔══██╗██╔══██╗██║ ██╔╝██╔════╝╚══██╔══╝
 ██╔████╔██║███████║██████╔╝█████╔╝ █████╗     ██║   
 ██║╚██╔╝██║██╔══██║██╔══██╗██╔═██╗ ██╔══╝     ██║   
 ██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██╗███████╗   ██║   
 ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝   
`}
        </pre>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-terminal-green transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-terminal-dim">
            <span>Loading system</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Boot Messages */}
        <div className="bg-card border border-border rounded-md p-4 font-mono text-sm h-48 overflow-hidden">
          <div className="space-y-1">
            {BOOT_MESSAGES.slice(0, visibleMessages).map((msg, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-terminal-green">[OK]</span>
                <span className="text-muted-foreground">{msg.text}</span>
              </div>
            ))}
            {visibleMessages < BOOT_MESSAGES.length && (
              <div className="flex items-center gap-2">
                <span className="text-terminal-yellow animate-pulse">[..]</span>
                <span className="text-muted-foreground">
                  {BOOT_MESSAGES[visibleMessages]?.text}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <p className="text-center text-terminal-dim text-sm">
          Paper Trading Mode • $1,000,000 Starting Capital
        </p>
      </div>
    </div>
  );
}
