import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout API
      const response = await axios.get("/api/v1/logout", {
        withCredentials: true, // This allows cookies to be sent/received
      });

      if (response.status === 200) {
        // Clear the token from local storage and cookies
        Cookies.remove("jwt");
        Cookies.remove("token");
        localStorage.removeItem("email");
        localStorage.removeItem("user");
        navigate("/login");
        toast.success("Logout successfully!");
      }
    } catch (error) {
      toast.error(
        `Logout failed: ${error.response?.data?.message || error.message}`
      );
    }
  };
  return { handleLogout };
}
