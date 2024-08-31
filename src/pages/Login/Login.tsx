import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import logo from "../../assets/images/yerinde-imza-on-muhasebe-cozumleri.png"; // Logoyu import ediyoruz
import "./Login.css";

const Login: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, userId } = useAuth();  // userId'yi kullanıma alıyoruz


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password, () => {
      console.log("Redirecting to /dashboard");
      console.log("Giriş yapan kullanıcı ID'si:", userId); // userId'yi burada alabilirsiniz
      console.log("Giriş yapan kullanıcı adı: ",email)
      navigate("/dashboard");
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <Col className="login-col">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="mb-4 logo" width="200" />
          </div>
          <h2 className="text-center">Giriş Yap</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 login-button">
              Giriş Yap
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <span>Hesabınız yok mu?</span>
            <Button variant="link" onClick={() => navigate("/register")}>
              Kayıt Ol
            </Button>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default Login;
