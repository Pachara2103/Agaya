import { API_URL } from "./api";
import Cookies from "js-cookie";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("Authentication token not found");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


export const createCheckoutSession = async (orderData) => {
    const response = await fetch(`${API_URL}/payment/create-checkout-session`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderData })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
    }

    return response.json();
};

export const verifyPayment = async (sessionId) => {
    const response = await fetch(`${API_URL}/payment/verify-payment`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ sessionId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to verify payment');
    }

    return response.json();
};