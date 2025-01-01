import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LoginActions } from "../store/loginSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Google from "./Google";
import Cookies from "js-cookie";
import { isAuth } from "../utils/helper";

export default function Login() {
  const emailElement = useRef();
  const passwordElement = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("token");
  console.log("Token from cookie:", token);

  const handleInput = async (e) => {
    e.preventDefault();
    const emailValue = emailElement.current.value;
    const passwordValue = passwordElement.current.value;

    // console.log("Email:", emailValue);
    // console.log("Password:", passwordValue);

    dispatch(
      LoginActions.inputs({
        email: emailValue,
        password: passwordValue,
      })
    );

    try {
      // Make the API call to save data to MongoDB
      const response = await axios.post("/api/v1/login", {
        email: emailValue,
        password: passwordValue,
        withCredentials: true, // This allows cookies to be sent/received
      });
      const token = response.data.token;
      const cookieExpires = 86400;
      document.cookie = `token=${token}; path=/; max-age=${cookieExpires}`;

      if (response.status === 200) {
        // Save email and token to localStorage
        setlocalStorage("email", emailValue);
        toast.success("Login successfully!");
        navigate("/generate");
      }
    } catch (error) {
      toast.error(
        `Login failed: ${error.response?.data?.message || error.message}`
      );
    }
  };
  function setlocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function informParent(response) {
    Cookies.set("token", response.data.token, {
      expires: 1,
    });
    setlocalStorage("user", response.data.user);
    toast.success(`Welcome ${response.data.user.username}`);
    if (isAuth()) {
      navigate("/generate");
    }
  }
  return (
    <>
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleInput}
          autoComplete="off"
          className="flex flex-col w-[300px] shadow-xl shadow-gray-700 md:w-[450px] my-20 sm:my-4"
          style={{
            backgroundColor: "#f0f0f0",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h1 className="flex items-center font-bold mb-4 text-3xl ">Login</h1>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label
            "
            >
              Enter your Email
            </label>
            <input
              ref={emailElement}
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              ref={passwordElement}
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex">
            <button type="submit" className="btn btn-primary px-7">
              Login
            </button>
            <p className=" text-sm ml-2 md:mx-7 md:mt-1 md:text-lg ">
              Don't have an account ? <span />
              <Link to="/signup" className="text-blue-700">
                Signup
              </Link>
            </p>
          </div>
          <div className=" mt-3 ">
            <Google informParent={informParent} />
          </div>
          <div>
            <Link
              to="/forgot-password"
              className="flex justify-center items-center pt-2 text-lg text-blue-700"
            >
              Forgot Password ?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
