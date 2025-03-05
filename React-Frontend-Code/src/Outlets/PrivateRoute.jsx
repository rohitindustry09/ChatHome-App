import { Navigate } from "react-router-dom";

const getUser = () => {
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
};

const PrivateRoute = ({ children, redirectTo }) => {
  const user = getUser(); 

  return user ? children : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
