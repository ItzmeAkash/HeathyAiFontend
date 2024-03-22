import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setAuthenticated } from "./feature/loginSignupReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector(state => state.loginSignup.isAuthenticated);
  const dispatch = useDispatch();

  // Memoize the selector function to avoid unnecessary re-renders
  const isAuthenticatedMemoized = useMemo(() => isAuthenticated, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticatedMemoized) {
      dispatch(setAuthenticated(true));
    } else if (!token && isAuthenticatedMemoized) {
      dispatch(setAuthenticated(false));

    }
  }, [dispatch, isAuthenticatedMemoized]);

  if (!isAuthenticatedMemoized) {

    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

export default RequireAuth;
