import { API_BASE_URL } from "./config";
import type { Product } from "../types/Product";

// Tüm ürünleri getir
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/product`);
    const data = await response.json(); // JSON olarak işleyin
    
    // Verilerin doğru şekilde işlendiğinden emin olun
    console.log(data); 

    return data.map((item: any) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      description: item.description,
      barcode: item.barcode,
      stockQuantity: item.stockquantity, // stockquantity'den stockQuantity'e dönüşüm
    }));
  } catch (error) {
    console.error("Failed to fetch or parse products", error);
    return []; // Hata durumunda boş bir dizi döndür
  }
};


// Yeni ürün kaydet veya mevcut ürünü güncelle
export const saveProduct = async (product: Product): Promise<Product> => {
  const method = product.productId === 0 ? "POST" : "PUT";
  const url = `${API_BASE_URL}/product${product.productId ? `/${product.productId}` : ""}`;
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  // Yanıtın içeriğini kontrol et
  const text = await response.text(); // Yanıtı metin olarak oku
  if (!text) {
    throw new Error('No data returned from server');
  }

  try {
    return JSON.parse(text) as Product; // JSON olarak parse et
  } catch (error) {
    throw new Error('Failed to parse JSON');
  }
};

// Ürünü sil
export const deleteProduct = async (id: number): Promise<void> => {
  console.log(`Deleting product with id: ${id}`); // id'yi konsola yazdır
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.error(`Error: ${response.statusText}`);
    throw new Error(`Error: ${response.statusText}`);
  }
};
