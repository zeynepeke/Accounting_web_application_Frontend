import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/dashboard-data"); // Adjust API endpoint as necessary
        const data = await response.json();

        setProducts(data.products);

        setTotalSales(data.totalSales);
        setTotalExpenses(data.totalExpenses);
        setTotalIncome(data.totalIncome);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();

    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="insights">
          <div className="sales">
            <span className="material-symbols-sharp">trending_up</span>
            <div className="middle">
              <div className="left">
                <h3>Total sales</h3>
                <h1>${totalSales.toLocaleString()}</h1>
              </div>
            </div>
            <small>last 24 hours</small>
          </div>

          <div className="expenses">
            <span className="material-symbols-sharp">local_mall</span>
            <div className="middle">
              <div className="left">
                <h3>Expenses</h3>
                <h1>${totalExpenses.toLocaleString()}</h1>
              </div>
            </div>
            <small>last 24 hours</small>
          </div>

          <div className="income">
            <span className="material-symbols-sharp">stacked_line_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Income</h3>
                <h1>${totalIncome.toLocaleString()}</h1>
              </div>
            </div>
            <small>last 24 hours</small>
          </div>
        </div>

        <div className="recent_order">
          <h1>Son siparişler</h1>
          <table>
            <thead>
              <tr>
                <th>Ürün adı</th>
                <th>Barkod numarası</th>
                <th>Fiyat</th>
                <th>Stok durumu</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.barcode}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td className={product.stockQuantity > 0 ? "warning" : "danger"}>
                    {product.stockQuantity > 0
                      ? `${product.stockQuantity} adet ürün kaldı`
                      : "Stokta yok"}
                  </td>
                  <td className="primary">
                    <Link to={`/product/${product.id}`} className="details-link">
                      Detaylar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
