// Expensive.ts

export interface Expensive {
    date: string;
    expenseId: number;
    category: string;
    amount: number;
  }
  
  // Örnek verilerle bir Expense listesi oluşturulabilir
  export const sampleExpenses: Expensive[] = [
    { date: '2024-01-10', expenseId: 1, category: 'Office Supplies', amount: 150 },
    { date: '2024-02-05', expenseId: 2, category: 'Utilities', amount: 200 },
  ];
  