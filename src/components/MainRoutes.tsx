import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";

import PrivatePage from "../pages/private/PrivatePage";
import ProfilePage from "../pages/private/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard"; // Yeni bileşeni import edin
import ProductPage from '../pages/ProductPage';


const MainRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Welcome />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/products" element={<ProductPage />} />
      <Route path="/" element={<ProductPage />} />
      <Route path="/private" element={<PrivateRoute />}>
        <Route index element={<PrivatePage />} />
      </Route>
      <Route path="/profile" element={<PrivateRoute />}>
        <Route index element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
export default MainRoutes;
