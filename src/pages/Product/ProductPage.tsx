import React, { useState, useEffect } from "react";
import type { Product } from "../types/Product";
import {
  fetchProducts,
  saveProduct,
  deleteProduct,
} from "../Services/ProductService";
import "./ProductPage.css";

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formState, setFormState] = useState<Product>({
    productId: 0,
    name: "",
    price: 0,
    description: "",
    barcode: 0,
    stockQuantity: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log(data); // Burada gelen veriyi kontrol edin
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    loadProducts();

    const intervalId = setInterval(() => {
      loadProducts();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSave = async () => {
    try {
      if (formState.productId === 0) {
        // Yeni ürün oluştur
        const savedProduct = await saveProduct(formState);
        setProducts([...products, savedProduct]);
      } else {
        // Var olan ürünü güncelle
        const updatedProduct = await saveProduct(formState);
        setProducts(
          products.map((p) =>
            p.productId === updatedProduct.productId ? updatedProduct : p
          )
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Save operation failed", error.message);
      
      } else {
        console.error("Save operation failed", error);
        
      }
    } finally {
      setIsModalOpen(false);
      setSelectedProduct(null);
      setFormState({
        productId: 0,
        name: "",
        price: 0,
        description: "",
        barcode: 0,
        stockQuantity: 0,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      console.log("Silme işlemi için seçilen ürün ID'si:", id); // ID'yi kontrol edin
      await deleteProduct(id);
      setProducts(products.filter((p) => p.productId !== id));
      console.log("Silme işlemi başarılı:", id);
    } catch (error) {
      console.error("Delete operation failed", error);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]:
        name === "price" || name === "stockQuantity" || name === "barcode"
          ? Number(value) // Sayıya dönüştür
          : value,
    });
  };
  

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const name = product.name || "";
    const barcode = product.barcode.toString(); // Sayıyı string'e dönüştür
    const description = product.description || "";
  
    // searchTerm'in başlangıçta aranan değeri içerip içermediğini kontrol edin
    return (
      name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      barcode.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      description.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  });
  
  
  
  
  

  return (
    <div className="product-page-container">
      <section className="add-product-section">
        <h1>Product Manager</h1>

        <button
          type="button"
          className="add-product-button"
          onClick={() => {
            setSelectedProduct(null);
            setFormState({
              productId: 0,
              name: "",
              price: 0,
              description: "",
              barcode: 0,
              stockQuantity: 0,
            });
            setIsModalOpen(true);
          }}
        >
          Add Product
        </button>
      </section>

      <section className="product-list-section">
        <h3>Product List</h3>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
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
            {filteredProducts.map((product) => (
              <tr key={product.productId}>
                <td>{product.barcode}</td>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)}$</td>
                <td>{product.description}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <div className="button-group">
                    <button
                      className="edit-button"
                      onClick={() => {
                        setSelectedProduct(product);
                        setFormState(product);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(product.productId)}
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="material-symbols-sharp close-button"
              onClick={() => setIsModalOpen(false)}
            >
              close
            </span>
            <div className="Product">
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
                  <button type="submit" className="save-button">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
