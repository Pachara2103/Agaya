import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signin from "./components/LoginPage/Signin.jsx"
import Signup from "./components/LoginPage/Signup.jsx"
import Profile from "./components/ProfilePage/Profile.jsx";


import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
     path: "/signin",
    Component: Signin,
  },
  {
     path: "/signup",
    Component: Signup,
  },
  {
     path: "/profile",
    Component: Profile,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
