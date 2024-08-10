import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";



const App: React.FC = () => {
  return (
    <div className="container">
    <AuthProvider>
      <Router>
        
      </Router>
    </AuthProvider>
    </div>
  );
};

export default App;