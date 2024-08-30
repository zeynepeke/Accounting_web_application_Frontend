import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from "../../contexts/AuthContext";

const UserRegistrationPage: React.FC = () => {
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const addButtonClick = () => {
    if (!termsAccepted) {
      alert("Please accept the terms of use to register.");
      return;
    }

    const veri = { Name, Surname, Username, email, Password };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(veri),
    };

    fetch("http://localhost:5105/api/Users/register", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Registration failed");
        }
      })
      .then(() => {
        login(email, Password, () => navigate("/dashboard"));
      })
      .catch((error) => console.error("Registration error:", error));
  };

  return (
    <div className="register">
      <div>
        <h2>Sign Up</h2>
        <div>First Name :</div>
        <input value={Name} onChange={(e) => setName(e.currentTarget.value)} />

        <div>Last Name :</div>
        <input value={Surname} onChange={(e) => setSurname(e.currentTarget.value)} />

        <div>Company Title :</div>
        <input value={Username} onChange={(e) => setUsername(e.currentTarget.value)} />

        <div>Email :</div>
        <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />

        <div>Password :</div>
        <input
          value={Password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          type="password"
        />

        <div>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label>By creating my account, I accept the terms of use.</label>
        </div>

        <button onClick={addButtonClick}>Register</button>
      </div>
    </div>
  );
};

export default UserRegistrationPage;
