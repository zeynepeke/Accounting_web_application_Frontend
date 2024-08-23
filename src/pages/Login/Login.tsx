import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/images/yerinde-imza-on-muhasebe-cozumleri.png"; // Logoyu import ediyoruz
import "./Login.css";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform actual login logic
    login(userName, password, () => navigate("/private"));
  };

  return (
    <div className="login">
    <div className="login-container">
  <Col className="login-col">
    <div className="logo-container">
      <img src={logo} alt="Logo" className="mb-4 logo" width="200" />
    </div>
    <h2 className="text-center">Login</h2>
    <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 login-button">
              Login
            </Button>
           </Form>
    <div className="mt-3 text-center">
      <span>Don't you have an account?</span>
      <Button variant="link" onClick={() => navigate("/register")}>
        Register
      </Button>
    </div>
  </Col>
</div>
</div>
  );
};

export default Login;
