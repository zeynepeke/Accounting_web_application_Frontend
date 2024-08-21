import React from "react";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
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

      <main className="dashboard-main">
        <h1>Dashboard</h1>

        <div className="insights">
          <div className="sales">
            <span className="material-symbols-sharp">trending_up</span>
            <div className="middle">
              <div className="left">
                <h3>Total sales</h3>
                <h1>$25,023</h1>
              </div>
            </div>
            <small>last 24 hours</small>
          </div>

          <div className="expenses">
            <span className="material-symbols-sharp">local_mall</span>
            <div className="middle">
              <div className="left">
                <h3>Expenses</h3>
                <h1>$15,023</h1>
              </div>
            </div>
            <small>last 24 hours</small>
          </div>

          <div className="income">
            <span className="material-symbols-sharp">stacked_line_chart</span>
            <div className="middle">
              <div className="left">
                <h3>Income</h3>
                <h1>$30,023</h1>
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
                <th>Ürün numarası</th>
                <th>Ödeme şekli</th>
                <th>Stok durumu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Min Usb</td>
                <td>9347934</td>
                <td>Nakit</td>
                <td className="warning">32 adet ürün kaldı</td>
                <td className="primary">Detaylar</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Tablet</td>
                <td>93437934</td>
                <td>Nakit</td>
                <td className="warning">2 adet ürün kaldı</td>
                <td className="primary">Detaylar</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Telefon</td>
                <td>34934</td>
                <td>Nakit</td>
                <td className="warning">0 adet ürün kaldı</td>
                <td className="primary">Detaylar</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
