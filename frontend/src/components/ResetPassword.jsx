import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function ResetPassword() {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const location = useLocation();
  const a = new URLSearchParams(location.search);
  const token = a.get("token");
  // console.log(token);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/reset-password",
        {
          token,
          password,
          confirmPassword,
        }
      );
    
      if (response) {
        toast.success(
          response?.data?.user?.message || "Password reset successfully "
        );
      }
      navigate("/login");
    } catch (error) {
      if(error.response && error.response.status== 400){
        toast.error(error.response.data.message);
      }
      console.error(error);
    }
  };
  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleResetPassword}>
        <div className="mb-2">
          <label
            htmlFor="text"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="email"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Confirm password"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
