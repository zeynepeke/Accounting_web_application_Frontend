import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaHome, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import logo from "../assets/images/yerinde-imza-on-muhasebe-cozumleri.png";
import "./AppHeader.css";

const AppHeader = () => {
  const { isLoggedIn, firstName, lastName, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Perform actual logout logic
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-container">
        <Link to="/" className="menu-item">
          <FaHome /> Anasayfa
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/private" className="menu-item">
              <FaUser /> Private
            </Link>
            <Link to="/profile" className="menu-item">
              <FaUser /> Profile
            </Link>
            <Link to="/ideas" className="menu-item">
              <FaUser /> Paylaşımlar
            </Link>
          </>
        )}
      </div>
      <div className="auth-container">
        {isLoggedIn ? (
          <>
            <span className="welcome-message">Hoşgeldin {firstName} {lastName}</span>
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="menu-item">
            <FaSignInAlt /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default AppHeader;