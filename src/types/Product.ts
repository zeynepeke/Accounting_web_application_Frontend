export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // İsteğe bağlı
    barcode: string;
    stockQuantity:number;
  } 