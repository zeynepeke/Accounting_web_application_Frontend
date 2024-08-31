import React, { createContext, useState, useContext } from "react";
import { API_BASE_URL } from "../pages/Services/config";

interface AuthContextType {
  isLoggedIn: boolean;
  Name: string;
  Surname: string;
  userId: number | null;

  login: (email: string, password: string, afterCall: VoidFunction) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth, AuthProvider içinde kullanılmalıdır.");
  }
  return context;
};

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const login = (email: string, password: string, afterCall: VoidFunction) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };

    fetch(`${API_BASE_URL}/Users/login`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(JSON.stringify(json, null, 2));
        console.log("Giriş yanıtı:", json);  // Yanıtı konsola yazdırın
        setName(json.name || "");         // Yanıttaki 'name' alanını kullanın
        setSurname(json.surname || "");       // Yanıttaki 'surname' alanını kullanın
        setUserId(json.userId || null);        // Yanıttaki 'userId' alanını kullanın
        console.log("UserID : ",json.userId )
        setIsLoggedIn(true);
        afterCall();
      })
      .catch((error) => {
        console.error("Giriş hatası:", error);
      });
  };

  const logout = () => {
    setName("");
    setSurname("");
    setUserId(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, Name, Surname, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
