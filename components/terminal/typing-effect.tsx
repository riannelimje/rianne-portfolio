"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

export function TypingEffect({
  text,
  speed = 50,
  delay = 0,
  className,
  onComplete,
  cursor = true,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={cn("", className)}>
      {displayedText}
      {showCursor && (
        <span
          className={cn(
            "text-terminal-green",
            isTyping ? "animate-pulse" : "animate-blink"
          )}
        >
          ▋
        </span>
      )}
    </span>
  );
}
