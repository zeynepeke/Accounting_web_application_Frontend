import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  //return isLoggedIn ? <Route  element={props.element} /> : <Navigate to="/login" />;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

};


export default PrivateRoute;