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
            </ul>
            <div className="flex ml-auto list-none">
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    className="text-white bg-[#079ce6] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
                  >
                    <svg
                      className="w-4 h-4 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Sign in with Github
                  </button>
                  <li
                    onClick={handleLogout}
                    className="focus:outline-none text-white text-center bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Logout
                  </li>
                </>
              ) : (
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
              <li
                onClick={handleLogout}
                className="focus:outline-none text-white text-center mt-2 bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm px-7 py-2 me-2 dark:bg-red-700 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Logout
              </li>
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
