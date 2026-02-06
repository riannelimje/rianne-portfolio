"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Stock } from "./types";

interface TickerStripProps {
  stock: Stock;
}

export function TickerStrip({ stock }: TickerStripProps) {
  const isPositive = stock.changePercent24h >= 0;

  // Create multiple copies for infinite scroll effect
  const TickerItem = () => (
    <div className="flex items-center gap-8 px-8">
      <div className="flex items-center gap-3">
        <span className="font-bold text-foreground">{stock.ticker}</span>
        <span className="text-foreground">${stock.price.toFixed(2)}</span>
        <span
          className={`flex items-center gap-1 ${
            isPositive ? "text-terminal-green" : "text-terminal-red"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {isPositive ? "+" : ""}
          {stock.changePercent24h.toFixed(2)}%
        </span>
      </div>
      <span className="text-terminal-dim">•</span>
      <div className="flex items-center gap-3 text-muted-foreground text-sm">
        <span>Vol: {stock.volume}</span>
        <span>MCap: {stock.marketCap}</span>
      </div>
      <span className="text-terminal-dim">•</span>
    </div>
  );

  return (
    <div className="bg-card border-b border-border py-2 overflow-hidden">
      <div className="flex animate-scroll">
        {/* Repeat the ticker multiple times for seamless loop */}
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <TickerItem key={i} />
          ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
