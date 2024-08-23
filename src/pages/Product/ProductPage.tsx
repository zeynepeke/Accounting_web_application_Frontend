import React, { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import "./ProductPage.css";
const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Example Product",
      price: 10.0,
      description: "This is an example product.",
      barcode: "123456789012",
      stockQuantity: 100,
    },
  ]);
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

    const intervalId = setInterval(() => {
      fetchProducts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSave = async () => {
    if (formState.id === 0) {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    } else {
      const response = await fetch(`/api/product/${formState.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
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
    handleSave();
  };

  return (
    <div className="product-page-container">
      <section className="add-product-section">
        <h1>Product Manager</h1>

        <form className="Product" onSubmit={handleFormSubmit}>
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
          <div className="button-container">
            <button
              type="button"
              className="add-product-button"
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
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
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
        <div className="button-group">
          <button
            className="edit-button"
            onClick={() => {
              setSelectedProduct(product);
              setFormState(product);
            }}
          >
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ))}
  
</tbody>

        </table>
      </section>
    </div>
  );
};

export default ProductPage;
