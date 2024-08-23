import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Page404 from "../pages/Page404";
import PrivatePage from "../pages/private/PrivatePage";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../pages/home/Welcome";
import Register from "../pages/Register/Register";
import Product from "../pages/Product/ProductPage";
import Order from "../pages/Order/Order";
import Dashboard from "../pages/Dashboard/Dashboard";
import Invoice from "../pages/Invoice/Invoice";
import Profile from "../pages/Profile/Profile";
import Revenue from "../pages/Revenue/Revenue";
import Expensive from "../pages/Expensive/Expensive";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/private" element={<PrivateRoute />}>
        <Route index element={<PrivatePage />} />
      </Route>

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route index element={<Dashboard />} />
      </Route>

      <Route path="/profile" element={<PrivateRoute />}>
        <Route index element={<Profile />} />
      </Route>
      <Route path="/invoice" element={<PrivateRoute />}>
        <Route index element={<Invoice />} />
      </Route>
      <Route path="/revenue" element={<PrivateRoute />}>
        <Route index element={<Revenue />} />
      </Route>
      <Route path="/expensive" element={<PrivateRoute />}>
        <Route index element={<Expensive />} />
      </Route>
      <Route path="/order" element={<PrivateRoute />}>
        <Route index element={<Order />} />
      </Route>
      <Route path="/product" element={<PrivateRoute />}>
        <Route index element={<Product />} />
      </Route>
      
      
      
      
      <Route path="/expensive" element={<PrivateRoute />}>
        <Route index element={<Expensive />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
export default MainRoutes;
