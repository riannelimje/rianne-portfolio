"use client";

import { ArrowLeft, Briefcase, Calendar } from "lucide-react";
import { Stock, Portfolio } from "./types";
import { Button } from "@/components/ui/button";

interface RoleDetailPanelProps {
  stock: Stock;
  portfolio: Portfolio;
  onClose: () => void;
  onAddMore: () => void;
}

export function RoleDetailPanel({
  stock,
  portfolio,
  onClose,
  onAddMore,
}: RoleDetailPanelProps) {
  const sharesOwned = portfolio.holdings[stock.ticker] || 0;
  const positionValue = sharesOwned * stock.price;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Header with Back Button */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-muted-foreground hover:text-terminal-green transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Market</span>
            </button>
            <Button
              onClick={onAddMore}
              variant="outline"
              size="sm"
              className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 bg-transparent"
            >
              Buy More Shares
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Company Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center border border-border">
              <span className="text-2xl font-bold text-terminal-cyan">
                {stock.ticker.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{stock.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="text-terminal-green font-mono">{stock.ticker}</span>
                <span className="text-terminal-dim">|</span>
                <span>{sharesOwned} shares owned</span>
                <span className="text-terminal-dim">|</span>
                <span className="text-terminal-green font-semibold">
                  ${positionValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Roles Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-5 h-5 text-terminal-green" />
            <h2 className="text-xl font-semibold">Work Experience</h2>
            <span className="text-sm text-terminal-dim bg-secondary px-2 py-0.5 rounded">
              {stock.roles.length} {stock.roles.length === 1 ? "Role" : "Roles"}
            </span>
          </div>

          <div className="space-y-4">
            {stock.roles.map((role, index) => (
              <div
                key={index}
                className="group relative bg-card border border-border rounded-xl p-6 hover:border-terminal-green/50 transition-all hover:shadow-lg hover:shadow-terminal-green/5"
              >
                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-terminal-green transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{role.timeline}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {role.oneLiner}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1.5 bg-secondary rounded-full text-terminal-cyan border border-transparent hover:border-terminal-cyan/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Decorative line */}
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-terminal-green/20 rounded-full group-hover:bg-terminal-green/50 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-center sm:text-left">
              Add more shares to your portfolio
            </p>
            <div className="flex items-center gap-3">
              <Button
                onClick={onClose}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                Back to Market
              </Button>
              <Button
                onClick={onAddMore}
                className="bg-terminal-green hover:bg-terminal-green/90 text-background"
              >
                Buy More {stock.ticker}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
