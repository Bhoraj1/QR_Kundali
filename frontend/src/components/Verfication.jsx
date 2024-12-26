import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Verification() {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the email from the state passed during signup navigation
  const userEmail = location.state?.email;

  const handleVerification = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      toast.error("Please enter the verification code.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/verify-email",
        {
          email: userEmail, // Use the email extracted from location state
          otp: verificationCode, // Use the entered verification code
        }
      );

      if (response.status === 200) {
        toast.success("Email verified successfully!");
        navigate("/login"); // Redirect to login after successful verification
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Verification failed. Please check your code.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleVerification}
        className="w-[350px] shadow-xl shadow-gray-700 sm:w-[450px] mt-14 sm:mt-4 "
        style={{
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h1 className="flex items-center font-bold mb-4 text-3xl">
          Verify Email
        </h1>
        <p className="mb-4 text-gray-600">
          A verification code was sent to <strong>{userEmail}</strong>. Please
          enter the code below to verify your email.
        </p>
        <div className="mb-3">
          <label htmlFor="verificationCode" className="form-label">
            Verification Code
          </label>
          <input
            type="text"
            className="form-control"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary px-7 sm:px-4 text-md mt-3"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
