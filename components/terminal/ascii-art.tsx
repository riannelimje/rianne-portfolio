"use client";

import { cn } from "@/lib/utils";

interface AsciiArtProps {
  className?: string;
}

export function AsciiArt({ className }: AsciiArtProps) {
  const art = `
██████╗ ██╗ █████╗ ███╗   ██╗███╗   ██╗███████╗
██╔══██╗██║██╔══██╗████╗  ██║████╗  ██║██╔════╝
██████╔╝██║███████║██╔██╗ ██║██╔██╗ ██║█████╗  
██╔══██╗██║██╔══██║██║╚██╗██║██║╚██╗██║██╔══╝  
██║  ██║██║██║  ██║██║ ╚████║██║ ╚████║███████╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝
`;

  return (
    <pre
      className={cn(
        "text-terminal-green text-[0.5rem] sm:text-xs md:text-sm leading-tight font-mono select-none",
        className
      )}
      aria-label="Rianne ASCII Art"
    >
      {art}
    </pre>
  );
}

export function SmallLogo({ className }: AsciiArtProps) {
  return (
    <span className={cn("text-terminal-green font-bold", className)}>
      {"<R/>"}
    </span>
  );
}
