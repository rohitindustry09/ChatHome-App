import { Navigate } from "react-router-dom";

const getUser = () => {
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
};

const PublicRoute = ({ children, redirectTo }) => {
  const user = getUser();

  return user ? <Navigate to={redirectTo} replace /> : children;
};

export default PublicRoute;
