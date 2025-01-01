import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null to indicate checking

  useEffect(() => {
    const token = Cookies.get("token"); // Get token directly using js-cookie
    console.log("Token from cookie:", token);
    if (token) {
      setIsAuthenticated(true); // Set true if token is present
    } else {
      setIsAuthenticated(false); // Set false if token is missing
      toast.error("Please login to access this page", { id: "auth-toast" });
    }
  }, []);

  // Return null until the authentication check is complete (prevents flicker)
  if (isAuthenticated === null) {
    return null;
  }

  // Render the element if authenticated, otherwise redirect
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
