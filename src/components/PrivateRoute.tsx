import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ApplicationContainer from "./ApplicationContainer";



const PrivateRoute = () => {
  const { isLoggedIn } = useAuth(); 
 
  //return isLoggedIn ? <Route  element={props.element} /> : <Navigate to="/login" />;
  return isLoggedIn ? 
  
  <ApplicationContainer>
  <Outlet /> 
  </ApplicationContainer>
  
  
  
  
  
  : <Navigate to="/login" />;
  
};


export default PrivateRoute;