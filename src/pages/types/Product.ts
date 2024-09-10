export interface Product {
  productId: number;
    name: string;
    price: number;
    description?: string; // İsteğe bağlı
    barcode: number;
    stockQuantity:number;
  } 