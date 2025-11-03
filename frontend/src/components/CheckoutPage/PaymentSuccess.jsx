import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyPayment } from "../../libs/paymentService";
import { checkoutOrder } from "../../libs/orderService";
import { useCart } from "../../context/CartContext";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const [status, setStatus] = useState("Verifying payment...");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const processing = useRef(false);

  useEffect(() => {
    const processPayment = async () => {
      if (processing.current) {
        return;
      }
      processing.current = true;

      const sessionId = new URLSearchParams(location.search).get("session_id");

      if (!sessionId) {
        setError("Invalid session. Please try checking out again.");
        setLoading(false);
        return;
      }

      try {
        const paymentResult = await verifyPayment(sessionId);

        if (paymentResult.success) {
          setStatus("Payment verified. Creating your order...");

          const orderData = paymentResult.orderData;
          const orderResult = await checkoutOrder(orderData);

          if (orderResult) {
            refreshCart(); // Refresh the cart
            setStatus("Order created successfully! Redirecting...");
            setTimeout(() => {
              navigate("/profile", { state: { panel: "order" } });
            }, 3000);
          } else {
            throw new Error("Failed to create order.");
          }
        } else {
          throw new Error("Payment verification failed.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "An unknown error occurred."
        );
        setStatus(
          "An error occurred. Please contact support with your transaction details."
        );
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center p-8">
        {loading && (
          <div className="mb-4">
            <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">{status}</h1>
        {error && <p className="text-red-500 font-semibold">{error}</p>}
        {!loading && !error && (
          <div className="animate-pulse text-gray-600">
            <p>You will be redirected shortly...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;