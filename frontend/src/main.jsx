import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/SingUp.jsx";
import Generate from "./components/Generator.jsx";
import Scan from "./components/Scan.jsx";
import Layout from "./components/Layout.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Verification from "./components/Verfication.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "verify-email",
        element: <Verification />,
      },
      {
       path:"forgot-password",
       element: <ForgotPassword />,
      },
      {
        path:"reset-password",
        element: <ResetPassword />,
       },

      {
        path: "generate",
        element: <PrivateRoute element={<Generate />} />,
      },

      {
        path: "scan",
        element: <PrivateRoute element={<Scan />} />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
