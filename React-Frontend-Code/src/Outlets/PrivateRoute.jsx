import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const getUser = () => {
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
};

const PrivateRoute = ({ children, redirectTo }) => {
  const [loading, setLoading] = useState(true);
  const user = getUser(); 

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulating auth check delay
  }, []);

  if (loading) return <div>Loading...</div>; // ✅ Prevents flickering
  return user ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
