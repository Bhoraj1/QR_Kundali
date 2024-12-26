import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

// Helper function to get a cookie by name
const getCookie = (name) => {
  const cookieArr = document.cookie.split("; ");
  for (let cookie of cookieArr) {
    const cookiePair = cookie.split("=");
    if (name === cookiePair[0]) {
      return cookiePair[1]; // Return the value of the cookie
    }
  }
  return null; // Return null if not found
};

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start as null to indicate checking

  useEffect(() => {
    const token = getCookie("token"); // Get token from cookies
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
