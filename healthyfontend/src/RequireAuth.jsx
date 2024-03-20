import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.loginSignup.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children || <Outlet />; // Render children or nested routes within
};

export default RequireAuth;