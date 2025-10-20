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
    // Early check to ensure the user is logged in.
    if (!headers.Authorization) {
      throw new Error("Authentication token is missing. Please log in again.");
    }

    // Construct URL with pagination parameters. Defaults to page 1, limit 10 if not provided.
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

    // Handle non-successful HTTP responses (like 401, 403, 500)
    if (!res.ok) {
      // Throw an error using the specific message from the backend.
      throw new Error(data.message || `An error occurred: ${res.statusText}`);
    }

    // The backend wraps the response in a 'data' object.
    // We return the inner object for easier use in the components.
    return data.data;
  } catch (err) {
    // Log the error for debugging purposes and re-throw it
    // so the calling component can handle it (e.g., display an error message).
    console.error("Failed to fetch vendor orders:", err);
    throw new Error(err.message || "Could not get orders from the server.");
  }
};

export { fetchOrdersByVendor };
