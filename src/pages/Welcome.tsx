import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css"; // CSS dosyasını ekliyoruz
import logo from "../assets/images/yerinde-imza-on-muhasebe-cozumleri.png"; // Logoyu import ediyoruz


const Welcome: React.FC = () => {
  return (
    <div className="welcome-container">
      <img src={logo} alt="Logo" className="mb-4" width="200" /> {/* Logo */}
      <h2>Hoşgeldin</h2>
      <p>Hoşgeldiniz fakirlerrr, oturum aç veya kayıt ol</p>
      <div className="button-group">
        <Link to="/login" className="button login-button">Oturum Aç</Link>
        <Link to="/register" className="button register-button">Yeni Kayıt</Link>
      </div>
    </div>
  );
};

export default Welcome;