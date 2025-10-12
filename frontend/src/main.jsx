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
import PasswordRecovery from "./components/LoginPage/PasswordRecovery.jsx";
import ApplyForm from "./components/SellerPage/ApplyForm.jsx";
import SellerPage from "./components/SellerPage/SellerPage.jsx";
import TestFetch from "./components/TestFetch.jsx";
import Profile from "./components/ProfilePage/ProfileContainer.jsx";
import Address from "./components/ProfilePage/Address.jsx";
import AddAddressForm from "./components/ProfilePage/AddAddressForm.jsx";
import ProductDetail from "./components/ProductDetailPage/ProductDetail.jsx";
import ResultSearch from "./components/ProductPage/ResultSearch.jsx";
import Cart from "./components/CartPage/Cart.jsx";


//test
import CategoryManagement from "./components/AdminPage/CategoryManagement.jsx";

import AdminPageContainer from "./components/AdminPage/AdminPageContainer.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GoogleAuthHandler from "./components/LoginPage/GoogleAuthHandler.jsx";

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
        path: "/password-recovery",
        element: <PasswordRecovery />,
      },
      {
        path: "/categorymanagement",
        element: <CategoryManagement />,
      },
      {
        path: "/auth/google/callback",
        element: <GoogleAuthHandler />
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/address",
        Component: Address,
      },
      {
        path: "/add-address-form",
        Component: AddAddressForm
      },
      {
        path: "/productdetail/:id",
        Component: ProductDetail,
      },
      {
        path: "/apply-for-seller",
        Component: ApplyForm,
      },
      {
        path: "/seller-page",
        Component: SellerPage,
      },
      {
        path: "/dashboard",
        Component: AdminPageContainer,
      },
      {
        path: "/result-search",
        Component: ResultSearch,
      },
      {
        path: "/cart",
        Component: Cart,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
