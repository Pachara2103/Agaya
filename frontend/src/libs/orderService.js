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

// @desc    Fetch Orders By CustomerId and token
// @route   GET /api/v1/agaya/orders/customer/:cid
// @access  Private
export const getOrdersByCustomer = async (cid) => {
  try {
    // fetch from route
    const res = await fetch(`${API_URL}/orders/customer/${cid}`, {
      method: "GET",
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (err) {
    console.error("Error: ", err);
    throw new Error("Server Error");
  }
};

// @desc    Add Order Tracking Status to OrderTracking
// @route   PUT /api/v1/agaya/orders/:oid
// @access  Private (relative to customer, vendor, admin)
// for more detail please check in backend/services/order-service.js
export const addOrderTrackingEvent = async (oid, newStatus, description) => {
  try {
    const res = await fetch(`${API_URL}/orders/${oid}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        newStatus: newStatus,
        description: description
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Error: ", err);
    throw new Error("Server Error");
  }
}

// @desc    Cancel Order
// @route   PUT /api/v1/agaya/orders/:oid/cancel
// @access  Private
// for more detail please check in backend/services/order-service.js
export const cancelCustomerOrder = async (oid, description) => {
  try {
    // description not using yet modify later
    const res = await fetch(`${API_URL}/orders/${oid}/cancel`, {
      method: "POST",
      headers: getAuthHeaders()
    });
    return await res.json();
  } catch (err) {
    console.error("Error: ", err);
    throw new Error("Server Error");
  }
}

// @desc    Request Return/Refund
// @route   POST /api/v1/agaya/return/request
// @access  Private (customer)
// this will result order to be in status DISPUTED to be handle furthur
export const requestOrderReturn = async (orderId, products, reason) => {
    try {
        const res = await fetch(`${API_URL}/return/request`, { 
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({
                orderId,
                products, 
                reason
            })
        });

        if (!res.ok) {
            const errorBody = await res.json();
            throw new Error(errorBody.message || `HTTP error! Status: ${res.status}`);
        }

        return await res.json();
    } catch (err) {
        console.error("Error requesting return: ", err);
        throw new Error(err.message || "Server Error: Could not submit return request.");
    }
}