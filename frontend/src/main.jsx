import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import router from "./routes/router"; 

const el = document.getElementById("root");
if (el) {
  createRoot(el).render(
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}