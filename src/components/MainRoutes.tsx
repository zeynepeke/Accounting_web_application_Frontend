import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Page404 from "../pages/Page404";
//
import PrivatePage from "../pages/private/PrivatePage";
import ProfilePage from "../pages/private/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import Welcome from "../pages/Welcome";
import Register from "../pages/Register";
//import { UniversityList } from "../pages/private/University/UniversityList";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} /> Register sayfası

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