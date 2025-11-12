import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/HomePage/Home";
import Signin from "../pages/LoginPage/Signin";
import Signup from "../pages/LoginPage/Signup";
import ChangePasswordForm from "../pages/ProfilePage/ChangePasswordForm";
import SetNewPassword from "../pages/ProfilePage/SetNewPassword";
import ChangePasswordSuccess from "../pages/ProfilePage/ChangePasswordSuccess";
import PasswordRecovery from "../pages/LoginPage/PasswordRecovery";
import ApplyForm from "../pages/SellerPage/ApplyForm";
import SellerPage from "../pages/SellerPage/SellerPage";
import Profile from "../pages/ProfilePage/ProfileContainer";
import Address from "../pages/ProfilePage/Address";
import AddAddressForm from "../pages/ProfilePage/AddAddressForm";
import ProductDetailPage from "../pages/ProductPage/ProductDetailPage";
import ResultSearch from "../pages/ProductPage/ResultSearch";
import Cart from "../pages/CartPage/Cart";
import CheckoutPage from "../pages/CheckoutPage/Checkout";
import OrderConfirmation from "../pages/CheckoutPage/OrderConfirmation";
import PaymentSuccess from "../pages/CheckoutPage/PaymentSuccess";
import CategoryManagement from "../pages/AdminPage/CategoryManagement";
import AdminPageContainer from "../pages/AdminPage/AdminPageContainer";
import GoogleAuthHandler from "../pages/LoginPage/GoogleAuthHandler";
import NotFoundPage from "../pages/ErrorPage/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

/**
 * Role Definitions:
 * "customer": Basic authenticated user.
 * "vendor": A seller.
 * "admin": Full access.
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/productdetail/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/result-search",
        element: <ResultSearch />,
      },
      {
        path: "/auth/google/callback",
        element: <GoogleAuthHandler />,
      },

      // --- Public-Only Routes (Guests Only) ---
      // Users who are already logged in will be redirected from these pages
      {
        path: "/signin",
        element: (
          <PublicRoute>
            <Signin />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "/password-recovery",
        element: (
          <PublicRoute>
            <PasswordRecovery />
          </PublicRoute>
        ),
      },

      // --- Authenticated Routes (All logged-in users) ---
      // These routes require a user to be logged in, regardless of role.
      {
        path: "/profile",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/address",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <Address />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-address-form",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <AddAddressForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/confirm-order",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <OrderConfirmation />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment-success",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <PaymentSuccess />
          </ProtectedRoute>
        ),
      },
      {
        path: "/change-password-form",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <ChangePasswordForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/set-new-password",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <SetNewPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/change-password-success",
        element: (
          <ProtectedRoute roles={["customer", "vendor", "admin"]}>
            <ChangePasswordSuccess />
          </ProtectedRoute>
        ),
      },

      // --- Customer-Specific Routes ---
      // Example: Applying to be a seller (only user who is a "customer" can access)
      {
        path: "/apply-for-seller",
        element: (
          <ProtectedRoute roles={["customer"]}>
            <ApplyForm />
          </ProtectedRoute>
        ),
      },

      // --- Seller (Vendor) Routes ---
      // Accessible by "vendor" 
      {
        path: "/seller-page",
        element: (
          <ProtectedRoute roles={["vendor"]}>
            <SellerPage />
          </ProtectedRoute>
        ),
      },

      // --- Admin Routes ---
      // Only accessible by "admin"
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <AdminPageContainer />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categorymanagement",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <CategoryManagement />
          </ProtectedRoute>
        ),
      },

      // --- Catch-all for 404 ---
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;