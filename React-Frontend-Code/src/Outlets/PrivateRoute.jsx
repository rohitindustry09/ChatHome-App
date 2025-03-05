import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, redirectTo }) => {
  const [loading, setLoading] = useState(true);
  const user = getUser(); // Your auth check function

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulating auth check delay
  }, []);

  if (loading) return <div>Loading...</div>; // ✅ Show a loader to prevent flickering
  return user ? children : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
