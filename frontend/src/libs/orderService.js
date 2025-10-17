import { API_URL } from "./api";
import Cookies from "js-cookie";
import { getMe } from "./authService"

const getAuthHeaders = () => {
  const token = Cookies.get('token');
  if (!token) {
    return { "Content-Type": "application/json" };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// @desc    Fetch Orders By CustomerId and token
// @route   GET /api/v1/agaya/orders/customer/:cid
// @access  Private
export const getOrdersByCustomer= async (cid) => {
  try {
    // fetch from route
    const res = await fetch(`${API_URL}/orders/customer/${cid}`, {
      method: "GET",
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (err) {
    console.error("Login failed:", err);
    throw new Error("Login failed");
  }
};