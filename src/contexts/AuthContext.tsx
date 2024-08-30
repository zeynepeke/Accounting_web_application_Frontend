import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  
  login: (email: string, password: string, afterCall: VoidFunction) => void;
  logout: () => void;
}

type LoginResponseType = {
  firstName: string;
  lastName: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const login = (email: string, password: string, afterCall: VoidFunction) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch("http://localhost:5105/api/Users/login", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      setFirstName(json.firstName);  // Sunucudan gelen firstName'yi kullan
      setLastName(json.lastName);    // Sunucudan gelen lastName'yi kullan
      setIsLoggedIn(true);
      afterCall();
    })
    .catch((error) => {
      console.error("Login error:", error);
    });
  
  
  };

  const logout = () => {
    // Çıkış işlemi sonrası temizleme
    setFirstName("");
    setLastName("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, firstName, lastName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
