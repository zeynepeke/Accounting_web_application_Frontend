import React, { createContext, useState, useContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  
  login: (email: string, password: string, afterCall: VoidFunction) => void;
  logout: () => void;
}

type loginResponseType = {
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
  

  // Implement your login logic here, e.g., API call
  const login = (email: string, password: string, afterCall: VoidFunction) => {
    const veri = { email, password };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(veri),
    };

    fetch("http://localhost:5105/api/Users/login", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //
        const veri: loginResponseType = json;
        //console.log("fetch işlemi sonrasında alınan veri");
        //console.log(json);
        setFirstName(veri.firstName);
        setLastName(veri.lastName);
       
        setIsLoggedIn(true);
        afterCall();
      });
  };

  const logout = () => {
    // Implement your logout logic here
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