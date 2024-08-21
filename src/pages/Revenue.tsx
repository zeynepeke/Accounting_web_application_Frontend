import React from "react";
import "./Dashboard.css";
const Revenue: React.FC = () => {
  return (
    <div className="dahboard-container">
      <div className="product-page">
        <aside>
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
              <span className="material-symbols-sharp"> sell</span>
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
          <h1>Revenue</h1>
        </main>
      </div>
    </div>
  );
};

export default Revenue;
