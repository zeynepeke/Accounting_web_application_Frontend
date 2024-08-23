import { Link, useLocation } from "react-router-dom";
import "../assets/Styles/sidebar.css";

const SidebarDash = () => {
  const location = useLocation();
  
  // Function to determine if the current path matches the link path
  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar">
        <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
          <span className="material-symbols-sharp">grid_view</span>
          <h3>Dashboard</h3>
        </Link>
        <Link to="/profile" className={isActive("/profile") ? "active" : ""}>
          <span className="material-symbols-sharp">person_outline</span>
          <h3>Profile</h3>
        </Link>
        <Link to="/invoice" className={isActive("/invoice") ? "active" : ""}>
          <span className="material-symbols-sharp">receipt_long</span>
          <h3>Invoice</h3>
        </Link>
        <Link to="/revenue" className={isActive("/revenue") ? "active" : ""}>
          <span className="material-symbols-sharp">sell</span>
          <h3>Revenue</h3>
        </Link>
        <Link to="/expensive" className={isActive("/expensive") ? "active" : ""}>
          <span className="material-symbols-sharp">payments</span>
          <h3>Expense</h3>
        </Link>
        <Link to="/order" className={isActive("/order") ? "active" : ""}>
          <span className="material-symbols-sharp">shopping_cart</span>
          <h3>Order</h3>
        </Link>
        <Link to="/product" className={isActive("/product") ? "active" : ""}>
          <span className="material-symbols-sharp">widgets</span>
          <h3>Product</h3>
        </Link>
      </div>
    </aside>
  );
};

export default SidebarDash;
