import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppHeader from "./pages/AppHeader";
import MainRoutes from "./components/MainRoutes";

const App: React.FC = () => {
  return (
   
    <AuthProvider>
      <Router>
        <AppHeader />
        <MainRoutes />
      </Router>
    </AuthProvider>

  );
};

export default App;

