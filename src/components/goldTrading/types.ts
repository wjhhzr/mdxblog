export interface GoldPosition {
  id: string;
  buyDate: Date;
  buyPrice: number;
  totalAmount: number;
  remainingAmount: number;
  avgPrice: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  date: Date;
  buyId?: string;
}

export interface FunnelData {
  name: string;
  value: number;
  color: string;
}

export interface ProfitData {
  date: string;
  profit: number;
  cumulativeProfit: number;
} 