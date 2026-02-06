export interface Role {
  title: string;
  timeline: string;
  oneLiner: string;
  tags: string[];
  gain: string; // Fake % gain for the trading metaphor
}

export interface Stock {
  ticker: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume: string;
  marketCap: string;
  open: number;
  high: number;
  low: number;
  sparklineData: number[];
  candleData: CandleData[];
  roles: Role[];
}

export interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
}

export interface Portfolio {
  cash: number;
  holdings: {
    [ticker: string]: number; // number of shares owned
  };
}

// JPMorgan Chase stock data with Rianne's roles
export const JPM_STOCK: Stock = {
  ticker: "JPM",
  name: "JPMorgan Chase & Co.",
  price: 247.35,
  change24h: 3.42,
  changePercent24h: 1.40,
  volume: "8.2M",
  marketCap: "$712.4B",
  open: 244.12,
  high: 248.90,
  low: 243.85,
  sparklineData: generateSparklineData(60, 247.35),
  candleData: generateCandleData(28, 247.35),
  roles: [
    {
      title: "Software Engineer",
      timeline: "March 2026 - Present",
      oneLiner: "to be unlocked...",
      tags: [""],
      gain: "+18.3%",
    },
    {
      title: "Software Engineer Intern",
      timeline: "June 2025 - Aug 2025",
      oneLiner: "played with LLMs and RAG to translate natural language to SQL queries",
      tags: ["Python", "AWS Snowflake", "SQL"],
      gain: "+24.7%",
    },
    
  ],
};

// Generate realistic sparkline data
function generateSparklineData(points: number, currentPrice: number): number[] {
  const data: number[] = [];
  let price = currentPrice * 0.985; // Start slightly lower
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.48) * 2; // Slight upward bias
    price = price + change;
    price = Math.max(price, currentPrice * 0.95);
    price = Math.min(price, currentPrice * 1.05);
    data.push(Number(price.toFixed(2)));
  }
  
  // Ensure last point is close to current price
  data[data.length - 1] = currentPrice;
  return data;
}

// Generate realistic candle data
function generateCandleData(days: number, currentPrice: number): CandleData[] {
  const data: CandleData[] = [];
  let basePrice = currentPrice * 0.92;
  
  for (let i = 0; i < days; i++) {
    const volatility = basePrice * 0.02;
    const open = basePrice + (Math.random() - 0.5) * volatility;
    const close = open + (Math.random() - 0.45) * volatility * 2;
    const high = Math.max(open, close) + Math.random() * volatility;
    const low = Math.min(open, close) - Math.random() * volatility;
    
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    data.push({
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    });
    
    basePrice = close;
  }
  
  // Adjust last candle to match current price
  data[data.length - 1].close = currentPrice;
  data[data.length - 1].high = Math.max(data[data.length - 1].high, currentPrice);
  
  return data;
}

export const INITIAL_PORTFOLIO: Portfolio = {
  cash: 1000000,
  holdings: {},
};
