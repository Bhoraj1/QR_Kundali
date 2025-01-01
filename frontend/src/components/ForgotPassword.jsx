import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const [isForget, setIsForget] = useState(true);
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/forgot-password", {
        email,
      });
      setIsForget(false);
      localStorage.removeItem("isForget");

      toast.success(response?.data?.message || "See your link");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {isForget ? (
        <form className="max-w-sm mx-auto" onSubmit={handleForgotPassword}>
          <div className="mb-2">
            <label className="block mt-4 text-2xl font-medium text-gray-900 dark:text-white">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 my-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      ) : (
        <h1 className="flex justify-center items-center ml-8 text-3xl mt-5 font-semibold ">
          Check your Gmail account for password reset link
        </h1>
      )}
    </>
  );
}
