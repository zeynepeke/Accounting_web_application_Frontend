import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const PrivatePage: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = () => {
    logout(); // Perform actual logout logic
  };
  return (
    <div>
      <h2>Private Page</h2>
      {isLoggedIn ? (
        <div>
          <p>Welcome! You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You should not see this if not logged in (due to PrivateRoute)</p>
      )}
      <hr />
      <div>Admin menüsü</div>
      <Link to="/admin/university">Üniversite yönetimi</Link>
    </div>
  );
};
export default PrivatePage;