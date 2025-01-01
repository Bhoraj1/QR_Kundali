import axios from "axios";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignupInputs, checkAuthentication } from "../store/signupSlice.js";

export default function Signup() {
  const UserNameElement = useRef();
  const EmailElement = useRef();
  const PasswordElement = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state from the Redux store
  const isAuthenticated = useSelector((state) => state.signup.isAuthenticated);

  // Check if the user is already logged in on component mount
  useEffect(() => {
    dispatch(checkAuthentication());
    if (isAuthenticated) {
      navigate("/generate");
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleInput = async (e) => {
    e.preventDefault();
    const UserNameValue = UserNameElement.current.value;
    const EmailValue = EmailElement.current.value;
    const PasswordValue = PasswordElement.current.value;

    // Check for spaces in the password
    if (/\s/.test(PasswordValue)) {
      toast.error("Spaces are not allowed in password.");
      return; // Stop the execution if spaces are found
    }

    // Check password length
    if (PasswordValue.length <= 5) {
      toast.error("Password must be at least 5 characters long.");
      return; // Block form submission
    }

    {
      /*
     // Dispatch input data to Redux for further processing
       dispatch(
      SignupInputs({
        username: UserNameValue,
        email: EmailValue,
        password: PasswordValue,
      })
    );
    */
    }
    try {
      const response = await axios.post(`/api/v1/signup`, {
        username: UserNameValue,
        email: EmailValue,
        password: PasswordValue,
        withCredentials: true,
      });
      if (response.status === 200) {
        // Save user details in localStorage
        const userDetails = {
          username: UserNameValue,
          email: EmailValue,
        };
        localStorage.setItem("user", JSON.stringify(userDetails)); // Save user data in localStorage
        toast.success(
          "Account Created Successfully! Please verify your email."
        );
        navigate("/verify-email", { state: { email: EmailValue } }); // Redirect to verification page
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 409) {
        toast.error(error.response.data.message);
        navigate("/verify-email", { state: { email: EmailValue } });
      } else if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleInput}
          className="w-[350px] shadow-xl shadow-gray-700 sm:w-[450px] mt-14 sm:mt-4 "
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h1 className="flex items-center font-bold mb-4 text-3xl ">
            Sign up
          </h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              ref={UserNameElement}
              name="username"
              type="text"
              className="form-control"
              id="username"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              ref={EmailElement}
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              ref={PasswordElement}
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              autoComplete="off"
            />
          </div>
          <div className="flex">
            <button
              type="submit"
              className="btn btn-primary px-7 sm:px-4 text-md "
            >
              Signup
            </button>
            <p className="ml-9 sm:ml-5 text-xl ">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
