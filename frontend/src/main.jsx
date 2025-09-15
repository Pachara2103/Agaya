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
import TestFetch from "./components/TestFetch.jsx";
// import OTP from "./components/LoginPage/OTP.jsx";
import Profile from "./components/ProfilePage/ProfileContainer.jsx";
import ProductDetail from "./components/ProductDetailPage/ProductDetail.jsx";
//test
import CategoryManagement from "./components/CategoryManagementPage/CategoryManagement.jsx";


import AdminPageContainer from "./components/AdminPage/AdminPageContainer.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      // TEST
      {
        path: "/test",
        element: <TestFetch />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/change-password-form",
        element: <ChangePasswordForm />,
      },
      {
        path: "/set-new-password",
        element: <SetNewPassword />,
      },
      {
        path: "/change-password-success",
        element: <ChangePasswordSuccess />,
      },
      {
        path: "/test",
        element: <CategoryManagement />
      },  
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/productdetail/:id",
        Component: ProductDetail,
      },
      {
        path: "/dashboard",
        Component: AdminPageContainer,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
