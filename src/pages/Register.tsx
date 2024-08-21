import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from "../contexts/AuthContext";

const UserRegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companytitle , setcompanytitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // Yeni state

  const navigate = useNavigate();
  const { login } = useAuth();

  const addButtonClick = () => {
    

    const veri = { firstName, lastName, companytitle, email, password };

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
        login(email, password, () => navigate("/private"));
      })
      .catch((error) => console.error("Registration error:", error));
  };

  return (
    <div>
      <h2>Sign in</h2>
      <div>First Name :</div>
      <input value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />

      <div>Last Name :</div>
      <input value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} />

      <div>Company Title :</div>
      <input value={companytitle} onChange={(e) => setcompanytitle(e.currentTarget.value)} />

      <div>Email :</div>
      <input value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      <div></div>

      <div>Password :</div>
      <input value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" />
      <div></div>

      {/* Kullanım koşulları onay kutusu */}
      <div>
        <input 
          type="checkbox" 
          checked={termsAccepted} 
          onChange={(e) => setTermsAccepted(e.target.checked)} 
        />
        <label>
        By creating my account, I accept the terms of use.
        </label>
      </div>

      <button onClick={addButtonClick}>Add</button>
    </div>
  );
};

export default UserRegistrationPage;
