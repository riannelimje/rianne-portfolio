"use client";

import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Stock, Portfolio } from "./types";
import { Button } from "@/components/ui/button";

interface BuyModalProps {
  stock: Stock;
  portfolio: Portfolio;
  onClose: () => void;
  onBuy: (shares: number) => void;
}

export function BuyModal({ stock, portfolio, onClose, onBuy }: BuyModalProps) {
  const [quantity, setQuantity] = useState(1);

  const totalCost = quantity * stock.price;
  const maxShares = Math.floor(portfolio.cash / stock.price);
  const remainingCash = portfolio.cash - totalCost;
  const canBuy = quantity > 0 && totalCost <= portfolio.cash;

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(0, Math.min(value, maxShares)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold">Buy {stock.ticker}</h2>
            <p className="text-sm text-muted-foreground">{stock.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Current Price */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current Share Price</p>
            <p className="text-3xl font-bold text-terminal-green">
              ${stock.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 0}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="flex-1 text-center text-xl font-semibold bg-secondary border border-border rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-terminal-green"
                min={0}
                max={maxShares}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= maxShares}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => setQuantity(maxShares)}
                className="text-sm"
              >
                MAX
              </Button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-secondary rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost</span>
              <span className="font-semibold">
                ${totalCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Available Cash</span>
              <span>${portfolio.cash.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Remaining Cash</span>
              <span
                className={remainingCash >= 0 ? "text-terminal-green" : "text-terminal-red"}
              >
                ${Math.max(0, remainingCash).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            onClick={() => onBuy(quantity)}
            disabled={!canBuy}
            className="w-full bg-terminal-green hover:bg-terminal-green/90 text-background font-semibold"
          >
            EXECUTE BUY ORDER
          </Button>
          <p className="text-xs text-center text-terminal-dim mt-2">
            Paper trading - No real money involved
          </p>
        </div>
      </div>
    </div>
  );
}
