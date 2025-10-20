import { API_URL } from "./api";
import { getAuthHeaders } from "./authService";

/**
 * Fetches orders for a specific vendor with support for pagination.
 * @param {string} vendorId - The ID of the vendor whose orders are to be fetched.
 * @param {object} [queryParams] - Optional parameters for pagination.
 * @param {number} [queryParams.page=1] - The page number to retrieve.
 * @param {number} [queryParams.limit=10] - The number of items per page.
 * @returns {Promise<object>} A promise that resolves to the data object from the API, containing orders and pagination details.
 * @throws {Error} Throws a detailed error if the fetch operation fails or the API returns an error.
 */
const fetchOrdersByVendor = async (vendorId, queryParams = {}) => {
  try {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    const params = new URLSearchParams({
      page: queryParams.page || 1,
      limit: queryParams.limit || 10,
    });
    const url = `${API_URL}/orders/vendor/${vendorId}?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || `An error occurred: ${res.statusText}`);
    }

    return data.data;
  } catch (err) {
    console.error("Failed to fetch vendor orders:", err);
    throw new Error(err.message || "Could not get orders from the server.");
  }
};

/**
 * Updates the tracking status of a specific order.
 * This function now correctly uses the fetch API and targets the right backend endpoint.
 * @param {string} orderId - The ID of the order to update.
 * @param {object} trackingBody - The new tracking information.
 * @param {string} trackingBody.newStatus - The next status key (e.g., 'PICKED_UP').
 * @param {string} [trackingBody.description] - An optional description or tracking number.
 * @returns {Promise<object>} The updated order object.
 */
const updateOrderStatus = async (orderId, trackingBody) => {
  try {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
      throw new Error("Authentication token is missing. Please log in again.");
    }
    // Add Content-Type header for the PUT request body
    headers["Content-Type"] = "application/json";

    // The backend route is PUT /orders/:orderId
    const url = `${API_URL}/orders/${orderId}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(trackingBody),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `An error occurred: ${response.statusText}`
      );
    }

    // The backend wraps the updated order in a 'data' object
    return data.data;
  } catch (err) {
    console.error("Error updating order status:", err.message);
    throw new Error(err.message || "Failed to update order status");
  }
};

export { fetchOrdersByVendor, updateOrderStatus };
