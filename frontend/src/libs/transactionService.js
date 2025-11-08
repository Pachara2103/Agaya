import { API_URL } from "./api";
import Cookies from "js-cookie";

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

export const getTransactionByOrderId = async (orderId) => {
  try {
    const res = await fetch(`${API_URL}/transactions/${orderId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return await res.json();
  } catch (err) {
    console.error("Error: ", err);
    throw new Error("Server Error");
  }
};