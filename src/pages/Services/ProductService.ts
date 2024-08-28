import { API_BASE_URL } from "./config";
import type { Product } from "../types/Product";

// Tüm ürünleri getir
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/product`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

// Yeni ürün kaydet veya mevcut ürünü güncelle
export const saveProduct = async (product: Product): Promise<Product> => {
  const method = product.id === 0 ? "POST" : "PUT";
  const url = `${API_BASE_URL}/product${product.id ? `/${product.id}` : ""}`;
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
  return response.json();
};

// Ürünü sil
export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/product/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
};
