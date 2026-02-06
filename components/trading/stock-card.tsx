"use client";

import { Lock, TrendingUp, TrendingDown, Eye } from "lucide-react";
import { Stock, Portfolio } from "./types";
import { Sparkline } from "./sparkline";
import { Button } from "@/components/ui/button";

interface StockCardProps {
  stock: Stock;
  portfolio: Portfolio;
  onBuy: () => void;
  onViewRoles: () => void;
}

export function StockCard({ stock, portfolio, onBuy, onViewRoles }: StockCardProps) {
  const sharesOwned = portfolio.holdings[stock.ticker] || 0;
  const hasPosition = sharesOwned > 0;
  const isPositive = stock.changePercent24h >= 0;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:border-terminal-green/50 transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-terminal-cyan">
              {stock.ticker.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{stock.ticker}</h3>
              <span
                className={`flex items-center gap-1 text-sm ${
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
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
            <p
              className={`text-sm ${
                isPositive ? "text-terminal-green" : "text-terminal-red"
              }`}
            >
              {isPositive ? "+" : ""}${stock.change24h.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="px-4 py-3 border-b border-border bg-secondary/30">
        <Sparkline
          data={stock.sparklineData}
          width={400}
          height={60}
          positive={isPositive}
          className="w-full"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-border text-center text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Volume</p>
          <p className="font-semibold">{stock.volume}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Market Cap</p>
          <p className="font-semibold">{stock.marketCap}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Open</p>
          <p className="font-semibold">${stock.open.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">High</p>
          <p className="font-semibold">${stock.high.toFixed(2)}</p>
        </div>
      </div>

      {/* Roles indicator & Actions */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hasPosition ? (
            <span className="text-terminal-green text-sm flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {stock.roles.length} Roles Unlocked
            </span>
          ) : (
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Lock className="w-4 h-4" />
              {stock.roles.length} Roles Locked
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasPosition ? (
            <>
              <Button
                onClick={onViewRoles}
                className="bg-terminal-green hover:bg-terminal-green/90 text-background"
              >
                View Roles
              </Button>
              <Button onClick={onBuy} variant="outline">
                Add More
              </Button>
            </>
          ) : (
            <Button
              onClick={onBuy}
              className="bg-terminal-green hover:bg-terminal-green/90 text-background"
            >
              BUY {stock.ticker}
            </Button>
          )}
        </div>
      </div>

      {/* Position Summary (if owned) */}
      {hasPosition && (
        <div className="px-4 pb-4">
          <div className="bg-terminal-green/10 rounded-lg p-3 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Your Position: </span>
              <span className="font-semibold text-terminal-green">
                {sharesOwned} shares
              </span>
            </div>
            <div className="text-sm font-semibold">
              ${(sharesOwned * stock.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
