import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";

import PrivatePage from "../pages/private/PrivatePage";
import ProfilePage from "../pages/private/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";

import Order from "../pages/Order";

import Dashboard from "../pages/Dashboard"; // Yeni bileşeni import edin

// product sayfası eklenince login ekranında sıkıntı çıkarıyor.

const MainRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Welcome />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} /> 
      
      
      <Route path="/private" element={<PrivateRoute />}>
        <Route index element={<PrivatePage />} />
      </Route>
      <Route path="/profile" element={<PrivateRoute />}>
        <Route index element={<ProfilePage />} />
      </Route>

      <Route path="/order" element={<Order />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
export default MainRoutes;
