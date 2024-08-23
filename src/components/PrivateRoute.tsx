import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ApplicationContainer from "./ApplicationContainer";



const PrivateRoute = () => {
  // kirmizi div auth fonksiyonu 
  //const { isLoggedIn } = useAuth(); UNUTMA login için burayı sil 
  const isLoggedIn =true
  //return isLoggedIn ? <Route  element={props.element} /> : <Navigate to="/login" />;
  return isLoggedIn ? 
  
  <ApplicationContainer>
  <Outlet /> 
  </ApplicationContainer>
  
  
  
  
  
  : <Navigate to="/login" />;
  
};


export default PrivateRoute;