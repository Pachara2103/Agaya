import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Homepage from "./components/HomePage/Home.jsx";
import Signin from "./components/LoginPage/Signin.jsx";
import Signup from "./components/LoginPage/Signup.jsx";
import ChangePasswordForm from "./components/ProfilePage/ChangePasswordForm.jsx";
import SetNewPassword from "./components/ProfilePage/SetNewPassword.jsx";
import ChangePasswordSuccess from "./components/ProfilePage/ChangePasswordSuccess.jsx";
import OTP from "./components/LoginPage/OTP.jsx";
import Profile from "./components/ProfilePage/Profile.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/change-password-form",
        element: <ChangePasswordForm />
      },
      {
        path: "/set-new-password",
        element: <SetNewPassword />
      },
      {
        path: "/change-password-success",
        element: <ChangePasswordSuccess />
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
