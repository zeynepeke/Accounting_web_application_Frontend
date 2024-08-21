import React, { useState, useEffect } from 'react';

// Product Interface
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // useEffect to fetch products from the database
  useEffect(() => {
    // API call to fetch products
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // Burada bir API çağrısı yapmalısınız
    const response = await fetch('/api/products'); // API URL'nizi ekleyin
    const data = await response.json();
    setProducts(data);
  };

  const addProduct = async (product: Product) => {
    // API call to add product
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const newProduct = await response.json();
    setProducts([...products, newProduct]);
  };

  const updateProduct = async (product: Product) => {
    // API call to update product
    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const updatedProduct = await response.json();
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = async (id: number) => {
    // API call to delete product
    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="product-page">
      <aside>
      <div className="dashboard-sidebar">
          <a href="#">
            <span className="material-symbols-sharp">grid_view</span>
            <h3>Dashboard</h3>
          </a>
          <a href="#" className="active">
            <span className="material-symbols-sharp">person_outline</span>
            <h3>Customers</h3>
          </a>

          <a href="#">
            <span className="material-symbols-sharp">insights</span>
            <h3>Analytics</h3>
          </a>

          <a href="#">
            <span className="material-symbols-sharp">mail_outline</span>
            <h3>Messages</h3>
            <span className="msg_count">14</span>
          </a>

          <a href="#">
            <span className="material-symbols-sharp">receipt_long </span>
            <h3>Product</h3>
          </a>

          <a href="#">
            <span className="material-symbols-sharp">report_gmailerrorred</span>
            <h3>Reports</h3>
          </a>

          <a href="#">
            <span className="material-symbols-sharp">settings</span>
            <h3>Settings</h3>
          </a>

          <a href="#">
            <span className="material-symbols-sharp">add</span>
            <h3>Add product</h3>
          </a>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button onClick={() => setSelectedProduct(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>

        <div>
          {selectedProduct ? (
            <ProductForm product={selectedProduct} onSave={updateProduct} />
          ) : (
            <ProductForm onSave={addProduct} />
          )}
        </div>
      </main>
    </div>
  );
};
