import React, { useState, useEffect } from "react";
import type { Product } from "../types/Product";

import "./ProductPage.css";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formState, setFormState] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    barcode: "",
    stockQuantity: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSave = async (product: Product) => {
    if (product.id === 0) {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } else {
      const response = await fetch(`/api/product/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const updatedProduct = await response.json();
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    }
    setSelectedProduct(null);
    setFormState({
      id: 0,
      name: "",
      price: 0,
      description: "",
      barcode: "",
      stockQuantity: 0,
    });
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/product/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]:
        name === "price" || name === "stockQuantity" ? Number(value) : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(formState);
  };

  return (
    <div className="product-page-container">
      <aside className="sidebar">
        <div className="dashboard-sidebar">
          <a href="#">
            <span className="material-symbols-sharp">grid_view</span>
            <h3>Dashboard</h3>
          </a>
          <a href="#" className="active">
            <span className="material-symbols-sharp">person_outline</span>
            <h3>Profile</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">receipt_long</span>
            <h3>Invoice</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">sell</span>
            <h3>Revenue</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">payments</span>
            <h3>Expense</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">shopping_cart</span>
            <h3>Order</h3>
          </a>
          <a href="#">
            <span className="material-symbols-sharp">widgets</span>
            <h3>Product</h3>
          </a>
        </div>
      </aside>

      <main>
        <section className="add-product-section">
          <h1>Product Manager</h1>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setFormState({
                id: 0,
                name: "",
                price: 0,
                description: "",
                barcode: "",
                stockQuantity: 0,
              });
            }}
          >
            Add Product
          </button>

          <form onSubmit={handleFormSubmit} style={{ marginBottom: "1rem" }}>
            <label>
              Barcode:
              <input
                type="text"
                name="barcode"
                placeholder="barkod input"
                value={formState.barcode}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Product Name:
              <input
                type="text"
                name="name"
                placeholder="product input"
                value={formState.name}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                placeholder="price input"
                value={formState.price}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                placeholder="description input"
                value={formState.description}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Stock Quantity:
              <input
                type="number"
                name="stockQuantity"
                placeholder="stock quantity input"
                value={formState.stockQuantity}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        </section>

        <section className="product-list-section">
          <h3>Product List</h3>
          <table className="product-table">
            <thead>
              <tr>
                <th>Barcode</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Stock Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.barcode}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.description}</td>
                  <td>{product.stockQuantity}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setFormState(product);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* Example Products */}
              <tr>
                <td>123456789012</td>
                <td>Example Product 1</td>
                <td>$10.00</td>
                <td>Example description 1</td>
                <td>100</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>123456789013</td>
                <td>Example Product 2</td>
                <td>$20.00</td>
                <td>Example description 2</td>
                <td>200</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
              <tr>
                <td>123456789014</td>
                <td>Example Product 3</td>
                <td>$30.00</td>
                <td>Example description 3</td>
                <td>300</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;
