import { Navigate } from "react-router-dom";
import { useMemo } from "react";

const PrivateRoute = ({ children, redirectTo }) => {
  // Memoize user to prevent re-reading localStorage on every render
  const user = useMemo(() => {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  }, []);

  return user ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
