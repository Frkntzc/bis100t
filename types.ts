export interface Stock {
  code: string;
  name: string;
  sector: string;
}

export enum TrendDirection {
  UP = 'UP',
  DOWN = 'DOWN',
  NEUTRAL = 'NEUTRAL'
}

export interface Prediction {
  period: 'Day' | 'Week' | 'Month';
  direction: TrendDirection;
  percentageChange: string; // e.g., "1.5-2.0%"
  reasoning: string;
}

export interface TechnicalIndicator {
  name: string;
  value: string;
  signal: 'Buy' | 'Sell' | 'Neutral';
}

export interface FundamentalData {
  price: string;
  peRatio: string;
  marketCap: string;
  volume: string;
}

export interface StockAnalysis {
  fundamentals: FundamentalData;
  technicals: TechnicalIndicator[];
  predictions: Prediction[];
  summary: string;
  lastUpdated: string;
}

export type ViewState = 'LIST' | 'DETAIL';
