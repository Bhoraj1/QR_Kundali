import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.png";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";
import useLogout from "./Logout.jsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  // Check if the user is authenticated
  const isAuthenticated = !!Cookies.get("token");

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="mt-2 sticky top-0 z-50 bg-white">
        <div className="flex w-full justify-between items-center">
          <img className="h-16 w-52 mt-2" src={logo} alt="image" />
          <div className="hidden md:flex w-full justify-between items-center">
            <ul className="flex mx-2 gap-4">
              {/* Show Generate and Scan only if authenticated */}
              {isAuthenticated && (
                <>
                  <li>
                    <Link
                      to="/generate"
                      className={`text-xl nav-link ${
                        location.pathname == "/generate" ? "active" : ""
                      }`}
                    >
                      Generate
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/scan"
                      className={`text-xl nav-link ${
                        location.pathname == "/scan" ? "active" : ""
                      } `}
                    >
                      Scan
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="flex ml-auto list-none">
              {/* Show Login and Sign Up if not authenticated */}
              {!isAuthenticated ? (
                <>
                  <ul className="flex gap-4">
                    <button
                      onClick={handleLoginClick}
                      type="button"
                      className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleSignUpClick}
                      type="button"
                      className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
                    >
                      Sign Up
                    </button>
                  </ul>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-white text-center bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 mr-10 mb-2"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden m-2">
            {isMenuOpen ? (
              <IoMdClose
                className="text-3xl text-black cursor-pointer"
                onClick={handleMenuToggle}
              />
            ) : (
              <MdMenu
                className="text-3xl text-black cursor-pointer"
                onClick={handleMenuToggle}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden fixed inset-0 bg-gray-400 opacity-85  mr-52 mt-20">
            <ul className="flex flex-col gap-3 mx-7">
              {/* Show Generate and Scan only if authenticated */}
              {isAuthenticated && (
                <>
                  <li className="bg-blue-600 text-white px-7 py-1 rounded-xl mt-3 text-center">
                    <Link
                      to="/generate"
                      className="text-sm font-bold cursor-pointer hover:bg-slate-500 duration-200 rounded "
                    >
                      Generate
                    </Link>
                  </li>
                  <li className="bg-blue-600 text-white px-7 py-1 rounded-xl mt-3 text-center">
                    <Link
                      to="/scan"
                      className="text-sm font-bold cursor-pointer hover:bg-slate-500 duration-200"
                    >
                      Scan
                    </Link>
                  </li>
                </>
              )}
              {/* Show Login and Sign Up if not authenticated */}
              {!isAuthenticated ? (
                <>
                  <li
                    onClick={handleLoginClick}
                    className="text-sm font-bold cursor-pointer bg-blue-600 text-white px-7 py-1.5 rounded-xl mt-3 text-center hover:bg-gray-400 duration-200"
                  >
                    Login
                  </li>
                  <li
                    onClick={handleSignUpClick}
                    className="text-md font-bold cursor-pointer bg-blue-600 text-white px-7 py-1 rounded-xl mt-3 text-center hover:bg-gray-400"
                  >
                    Sign up
                  </li>
                </>
              ) : (
                <li
                  onClick={handleLogout}
                  className="focus:outline-none text-white text-center mt-2 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-7 py-2 me-2 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Logout
                </li>
              )}
              <button
                type="button"
                className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
              >
                Sign in with facebook
              </button>
            </ul>
          </div>
        )}
      </nav>
      <hr className="border-t-2 border-gray-400" />
    </>
  );
}
