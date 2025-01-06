import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const response = await axios.post(
            "/api/v1/valid-token",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log(response.data.valid)
          if (response.data.valid) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            Cookies.remove("token");
            toast.error(response.data.message);
          }
        } catch (error) { 
          setIsAuthenticated(false);
          Cookies.remove("token");
          const errorMessage =
            error.response?.data?.message || "failed. Please login again";
          toast.error(errorMessage);
        }
      } else {
        setIsAuthenticated(false);
        toast.error("Please login to access this page");
      }
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  // Render the element if authenticated, otherwise redirect
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
