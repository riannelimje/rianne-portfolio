"use client";

import { useState } from "react";
import { ArrowLeft, Wallet, TrendingUp } from "lucide-react";
import { Stock, Portfolio, JPM_STOCK, INITIAL_PORTFOLIO } from "./types";
import { TickerStrip } from "./ticker-strip";
import { StockCard } from "./stock-card";
import { BuyModal } from "./buy-modal";
import { RoleDetailPanel } from "./role-detail-panel";
import { ThemeToggle } from "@/components/theme-toggle";

interface TradingDashboardProps {
  onExit: () => void;
}

export function TradingDashboard({ onExit }: TradingDashboardProps) {
  const [portfolio, setPortfolio] = useState<Portfolio>(INITIAL_PORTFOLIO);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showRoleDetail, setShowRoleDetail] = useState(false);
  const [selectedStock] = useState<Stock>(JPM_STOCK);

  // Calculate portfolio value
  const portfolioValue = Object.entries(portfolio.holdings).reduce(
    (total, [ticker, shares]) => {
      if (ticker === "JPM") {
        return total + shares * JPM_STOCK.price;
      }
      return total;
    },
    0
  );
  const netWorth = portfolio.cash + portfolioValue;

  const handleBuy = (shares: number) => {
    const cost = shares * selectedStock.price;
    if (cost <= portfolio.cash) {
      setPortfolio((prev) => ({
        cash: prev.cash - cost,
        holdings: {
          ...prev.holdings,
          [selectedStock.ticker]: (prev.holdings[selectedStock.ticker] || 0) + shares,
        },
      }));
      setShowBuyModal(false);
      // Show role detail after first purchase
      if (!portfolio.holdings[selectedStock.ticker]) {
        setTimeout(() => setShowRoleDetail(true), 300);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ticker Strip */}
      <TickerStrip stock={selectedStock} />

      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-muted-foreground hover:text-terminal-green transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">exit</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-terminal-green font-bold">MARKET</span>
              <span className="text-xs text-terminal-dim">PAPER TRADING</span>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Net Worth */}
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                Net Worth
              </div>
              <p className="font-bold text-terminal-green">
                ${netWorth.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Cash */}
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wallet className="w-3 h-3" />
                Cash
              </div>
              <p className="font-semibold">
                ${portfolio.cash.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Intro Text */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="text-terminal-green">{">"}</span> Experience Portfolio
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Buy shares in companies to unlock work experience and roles.
            Start with $1,000,000 in paper trading capital.
          </p>
        </div>

        {/* Stock Cards */}
        <div className="max-w-2xl mx-auto">
          <StockCard
            stock={selectedStock}
            portfolio={portfolio}
            onBuy={() => setShowBuyModal(true)}
            onViewRoles={() => setShowRoleDetail(true)}
          />
        </div>

        {/* Hint */}
        <p className="text-center text-terminal-dim text-sm mt-8">
          The share prices are fictional and for demonstration purposes only.
        </p>
      </main>

      {/* Buy Modal */}
      {showBuyModal && (
        <BuyModal
          stock={selectedStock}
          portfolio={portfolio}
          onClose={() => setShowBuyModal(false)}
          onBuy={handleBuy}
        />
      )}

      {/* Role Detail Panel */}
      {showRoleDetail && portfolio.holdings[selectedStock.ticker] && (
        <RoleDetailPanel
          stock={selectedStock}
          portfolio={portfolio}
          onClose={() => setShowRoleDetail(false)}
          onAddMore={() => {
            setShowRoleDetail(false);
            setShowBuyModal(true);
          }}
        />
      )}
    </div>
  );
}
