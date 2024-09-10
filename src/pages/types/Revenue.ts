// Revenue.ts

export interface Revenue {
  date: string;
  revenueId: number;
  source: string;
  amount: number;
}

// Örnek verilerle bir Revenue listesi oluşturulabilir
export const sampleRevenues: Revenue[] = [
  { date: '2024-01-15', revenueId: 1, source: 'Product Sales', amount: 1000 },
  { date: '2024-02-15', revenueId: 2, source: 'Service Income', amount: 500 },
];
