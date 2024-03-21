import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";


const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.loginSignup.isAuthenticated);
  const location = useLocation();
  // const [loading,setLoading] = useState(true)

  
  // if (loading){
  //   return <div>loading...</div>
  // }
 
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children || <Outlet />; 
};

export default RequireAuth;