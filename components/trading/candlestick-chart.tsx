"use client";

import { CandleData } from "./types";

interface CandlestickChartProps {
  data: CandleData[];
  width?: number;
  height?: number;
}

export function CandlestickChart({
  data,
  width = 600,
  height = 200,
}: CandlestickChartProps) {
  if (data.length === 0) return null;

  const allPrices = data.flatMap((d) => [d.high, d.low]);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice || 1;

  const padding = { top: 10, bottom: 30, left: 50, right: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const candleWidth = (chartWidth / data.length) * 0.6;
  const candleGap = (chartWidth / data.length) * 0.4;

  const getY = (price: number) => {
    return padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  // Generate Y axis labels
  const yLabels = [];
  const steps = 4;
  for (let i = 0; i <= steps; i++) {
    const price = minPrice + (priceRange * i) / steps;
    yLabels.push({ price, y: getY(price) });
  }

  return (
    <svg width={width} height={height} className="w-full h-auto">
      {/* Grid lines */}
      {yLabels.map(({ price, y }) => (
        <g key={price}>
          <line
            x1={padding.left}
            y1={y}
            x2={width - padding.right}
            y2={y}
            stroke="var(--border)"
            strokeDasharray="2,2"
          />
          <text
            x={padding.left - 8}
            y={y + 4}
            textAnchor="end"
            className="fill-muted-foreground text-[10px]"
          >
            ${price.toFixed(0)}
          </text>
        </g>
      ))}

      {/* Candles */}
      {data.map((candle, index) => {
        const x = padding.left + index * (candleWidth + candleGap) + candleGap / 2;
        const isGreen = candle.close >= candle.open;
        const color = isGreen ? "var(--terminal-green)" : "var(--terminal-red)";

        const bodyTop = getY(Math.max(candle.open, candle.close));
        const bodyBottom = getY(Math.min(candle.open, candle.close));
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1);

        return (
          <g key={index}>
            {/* Wick */}
            <line
              x1={x + candleWidth / 2}
              y1={getY(candle.high)}
              x2={x + candleWidth / 2}
              y2={getY(candle.low)}
              stroke={color}
              strokeWidth="1"
            />
            {/* Body */}
            <rect
              x={x}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={isGreen ? color : color}
              stroke={color}
              strokeWidth="1"
              rx="1"
            />
          </g>
        );
      })}

      {/* X axis labels (every 7 days) */}
      {data
        .filter((_, i) => i % 7 === 0 || i === data.length - 1)
        .map((candle, i, arr) => {
          const originalIndex = data.indexOf(candle);
          const x =
            padding.left +
            originalIndex * (candleWidth + candleGap) +
            candleWidth / 2;
          return (
            <text
              key={i}
              x={x}
              y={height - 8}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {candle.date}
            </text>
          );
        })}
    </svg>
  );
}
